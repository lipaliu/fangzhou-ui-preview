import os
import gradio as gr
import json
import logging
import torch
from PIL import Image
import spaces
from diffusers import DiffusionPipeline, AutoencoderTiny, AutoencoderKL, AutoPipelineForImage2Image
from live_preview_helpers import calculate_shift, retrieve_timesteps, flux_pipe_call_that_returns_an_iterable_of_images
from diffusers.utils import load_image
from huggingface_hub import hf_hub_download, HfFileSystem, ModelCard, snapshot_download
import copy
import random
import time
import re

# Load LoRAs from JSON file
with open('loras.json', 'r') as f:
    loras = json.load(f)

# Initialize the base model
dtype = torch.bfloat16
device = "cuda" if torch.cuda.is_available() else "cpu"
base_model = "black-forest-labs/FLUX.1-dev"

taef1 = AutoencoderTiny.from_pretrained("madebyollin/taef1", torch_dtype=dtype).to(device)
good_vae = AutoencoderKL.from_pretrained(base_model, subfolder="vae", torch_dtype=dtype).to(device)
pipe = DiffusionPipeline.from_pretrained(base_model, torch_dtype=dtype, vae=taef1).to(device)
pipe_i2i = AutoPipelineForImage2Image.from_pretrained(base_model,
                                                      vae=good_vae,
                                                      transformer=pipe.transformer,
                                                      text_encoder=pipe.text_encoder,
                                                      tokenizer=pipe.tokenizer,
                                                      text_encoder_2=pipe.text_encoder_2,
                                                      tokenizer_2=pipe.tokenizer_2,
                                                      torch_dtype=dtype
                                                     )

MAX_SEED = 2**32-1

pipe.flux_pipe_call_that_returns_an_iterable_of_images = flux_pipe_call_that_returns_an_iterable_of_images.__get__(pipe)

class calculateDuration:
    def __init__(self, activity_name=""):
        self.activity_name = activity_name

    def __enter__(self):
        self.start_time = time.time()
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        self.end_time = time.time()
        self.elapsed_time = self.end_time - self.start_time
        if self.activity_name:
            print(f"Elapsed time for {self.activity_name}: {self.elapsed_time:.6f} seconds")
        else:
            print(f"Elapsed time: {self.elapsed_time:.6f} seconds")

def update_selection(evt: gr.SelectData, width, height):
    selected_lora = loras[evt.index]
    new_placeholder = f"Type a prompt for {selected_lora['title']}"
    lora_repo = selected_lora["repo"]
    updated_text = f"### Selected: [{lora_repo}](https://huggingface.co/{lora_repo}) ✨"
    if "aspect" in selected_lora:
        if selected_lora["aspect"] == "portrait":
            width = 768
            height = 1024
        elif selected_lora["aspect"] == "landscape":
            width = 1024
            height = 768
        else:
            width = 1024
            height = 1024
    return (
        gr.update(placeholder=new_placeholder),
        updated_text,
        evt.index,
        width,
        height,
    )

@spaces.GPU(duration=70)
def generate_image(prompt_mash, steps, seed, cfg_scale, width, height, lora_scale, progress):
    pipe.to("cuda")
    generator = torch.Generator(device="cuda").manual_seed(seed)
    with calculateDuration("Generating image"):
        # Generate image
        for img in pipe.flux_pipe_call_that_returns_an_iterable_of_images(
            prompt=prompt_mash,
            num_inference_steps=steps,
            guidance_scale=cfg_scale,
            width=width,
            height=height,
            generator=generator,
            joint_attention_kwargs={"scale": lora_scale},
            output_type="pil",
            good_vae=good_vae,
        ):
            yield img

def generate_image_to_image(prompt_mash, image_input_path, image_strength, steps, cfg_scale, width, height, lora_scale, seed):
    generator = torch.Generator(device="cuda").manual_seed(seed)
    pipe_i2i.to("cuda")
    image_input = load_image(image_input_path)
    final_image = pipe_i2i(
        prompt=prompt_mash,
        image=image_input,
        strength=image_strength,
        num_inference_steps=steps,
        guidance_scale=cfg_scale,
        width=width,
        height=height,
        generator=generator,
        joint_attention_kwargs={"scale": lora_scale},
        output_type="pil",
    ).images[0]
    return final_image 

@spaces.GPU(duration=70)
def run_lora(prompt, image_input, image_strength, cfg_scale, steps, selected_index, randomize_seed, seed, width, height, lora_scale, progress=gr.Progress(track_tqdm=True)):
    if selected_index is None:
        raise gr.Error("You must select a LoRA before proceeding.")
    selected_lora = loras[selected_index]
    lora_path = selected_lora["repo"]
    trigger_word = selected_lora["trigger_word"]
    if(trigger_word):
        if "trigger_position" in selected_lora:
            if selected_lora["trigger_position"] == "prepend":
                prompt_mash = f"{trigger_word} {prompt}"
            else:
                prompt_mash = f"{prompt} {trigger_word}"
        else:
            prompt_mash = f"{trigger_word} {prompt}"
    else:
        prompt_mash = prompt

    with calculateDuration("Unloading LoRA"):
        pipe.unload_lora_weights()
        pipe_i2i.unload_lora_weights()
        
    # Load LoRA weights
    with calculateDuration(f"Loading LoRA weights for {selected_lora['title']}"):
        pipe_to_use = pipe_i2i if image_input is not None else pipe
        weight_name = selected_lora.get("weights", None)
        
        pipe_to_use.load_lora_weights(
            lora_path, 
            weight_name=weight_name, 
            low_cpu_mem_usage=True
        )
                
    # Set random seed for reproducibility
    with calculateDuration("Randomizing seed"):
        if randomize_seed:
            seed = random.randint(0, MAX_SEED)
            
    if(image_input is not None):
        
        final_image = generate_image_to_image(prompt_mash, image_input, image_strength, steps, cfg_scale, width, height, lora_scale, seed)
        yield final_image, seed, gr.update(visible=False)
    else:
        image_generator = generate_image(prompt_mash, steps, seed, cfg_scale, width, height, lora_scale, progress)
    
        # Consume the generator to get the final image
        final_image = None
        step_counter = 0
        for image in image_generator:
            step_counter+=1
            final_image = image
            progress_bar = f'<div class="progress-container"><div class="progress-bar" style="--current: {step_counter}; --total: {steps};"></div></div>'
            yield image, seed, gr.update(value=progress_bar, visible=True)
            
        yield final_image, seed, gr.update(value=progress_bar, visible=False)
        
def get_huggingface_safetensors(link):
    split_link = link.split("/")
    if len(split_link) != 2:
        raise Exception("Invalid Hugging Face repository link format.")

    print(f"Repository attempted: {split_link}")
    
    # Load model card
    model_card = ModelCard.load(link)
    base_model = model_card.data.get("base_model")
    print(f"Base model: {base_model}")

    # Validate model type
    acceptable_models = {"black-forest-labs/FLUX.1-dev", "black-forest-labs/FLUX.1-schnell"}
    
    models_to_check = base_model if isinstance(base_model, list) else [base_model]
    
    if not any(model in acceptable_models for model in models_to_check):
        raise Exception("Not a FLUX LoRA!")
        
    # Extract image and trigger word
    print("Before trying to get image")
    image_path = model_card.data.get("widget", [{}])[0].get("output", {}).get("url", None)
    print(f"Image path {image_path}")
    trigger_word = model_card.data.get("instance_prompt", "")
    print(f"Image path {trigger_word}")
    image_url = f"https://huggingface.co/{link}/resolve/main/{image_path}" if image_path else None
    print(f"Image URL {image_url}")

        
    # Initialize Hugging Face file system
    fs = HfFileSystem()
    try:
        list_of_files = fs.ls(link, detail=False)
        
        # Initialize variables for safetensors selection
        safetensors_name = None
        highest_trained_file = None
        highest_steps = -1
        last_safetensors_file = None
        step_pattern = re.compile(r"_0{3,}\d+")  # Detects step count `_000...`

        for file in list_of_files:
            filename = file.split("/")[-1]

            # Select safetensors file
            if filename.endswith(".safetensors"):
                last_safetensors_file = filename  # Track last encountered file
                
                match = step_pattern.search(filename)
                if not match:
                    # Found a full model without step numbers, return immediately
                    safetensors_name = filename
                    break
                else:
                    # Extract step count and track highest
                    steps = int(match.group().lstrip("_"))
                    if steps > highest_steps:
                        highest_trained_file = filename
                        highest_steps = steps

            # Select an image file if not found in model card
            if not image_url and filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                image_url = f"https://huggingface.co/{link}/resolve/main/{filename}"

        # If no full model found, fall back to the most trained safetensors file
        if not safetensors_name:
            safetensors_name = highest_trained_file if highest_trained_file else last_safetensors_file

        # If still no safetensors file found, raise an exception
        if not safetensors_name:
            raise Exception("No valid *.safetensors file found in the repository.")

    except Exception as e:
        print(e)
        raise Exception("You didn't include a valid Hugging Face repository with a *.safetensors LoRA")
    
    return split_link[1], link, safetensors_name, trigger_word, image_url


def check_custom_model(link):
    print(f"Checking a custom model on: {link}")
    if(link.startswith("https://")):
        if(link.startswith("https://huggingface.co") or link.startswith("https://www.huggingface.co")):
            link_split = link.split("huggingface.co/")
            return get_huggingface_safetensors(link_split[1])
    else: 
        return get_huggingface_safetensors(link)

def add_custom_lora(custom_lora):
    global loras
    if(custom_lora):
        try:
            title, repo, path, trigger_word, image = check_custom_model(custom_lora)
            print(f"Loaded custom LoRA: {repo}")
            card = f'''
            <div class="custom_lora_card">
              <span>Loaded custom LoRA:</span>
              <div class="card_internal">
                <img src="{image}" />
                <div>
                    <h3>{title}</h3>
                    <small>{"Using: <code><b>"+trigger_word+"</code></b> as the trigger word" if trigger_word else "No trigger word found. If there's a trigger word, include it in your prompt"}<br></small>
                </div>
              </div>
            </div>
            '''
            existing_item_index = next((index for (index, item) in enumerate(loras) if item['repo'] == repo), None)
            if(not existing_item_index):
                new_item = {
                    "image": image,
                    "title": title,
                    "repo": repo,
                    "weights": path,
                    "trigger_word": trigger_word
                }
                print(new_item)
                existing_item_index = len(loras)
                loras.append(new_item)
        
            return gr.update(visible=True, value=card), gr.update(visible=True), gr.Gallery(selected_index=None), f"Custom: {path}", existing_item_index, trigger_word
        except Exception as e:
            gr.Warning(f"Invalid LoRA: either you entered an invalid link, or a non-FLUX LoRA, this was the issue: {e}")
            return gr.update(visible=True, value=f"Invalid LoRA: either you entered an invalid link, a non-FLUX LoRA"), gr.update(visible=True), gr.update(), "", None, ""
    else:
        return gr.update(visible=False), gr.update(visible=False), gr.update(), "", None, ""

def remove_custom_lora():
    return gr.update(visible=False), gr.update(visible=False), gr.update(), "", None, ""

run_lora.zerogpu = True

css = '''
#gen_btn{height: 100%}
#gen_column{align-self: stretch}
#title{text-align: center}
#title h1{font-size: 3em; display:inline-flex; align-items:center}
#title img{width: 100px; margin-right: 0.5em}
#gallery .grid-wrap{height: 10vh}
#lora_list{background: var(--block-background-fill);padding: 0 1em .3em; font-size: 90%}
.card_internal{display: flex;height: 100px;margin-top: .5em}
.card_internal img{margin-right: 1em}
.styler{--form-gap-width: 0px !important}
#progress{height:30px}
#progress .generating{display:none}
.progress-container {width: 100%;height: 30px;background-color: #f0f0f0;border-radius: 15px;overflow: hidden;margin-bottom: 20px}
.progress-bar {height: 100%;background-color: #4f46e5;width: calc(var(--current) / var(--total) * 100%);transition: width 0.5s ease-in-out}
'''
font=[gr.themes.GoogleFont("Source Sans Pro"), "Arial", "sans-serif"]
with gr.Blocks(theme=gr.themes.Soft(font=font), css=css, delete_cache=(60, 60)) as app:
    title = gr.HTML(
        """<h1><img src="https://huggingface.co/spaces/multimodalart/flux-lora-the-explorer/resolve/main/flux_lora.png" alt="LoRA"> FLUX LoRA the Explorer</h1>""",
        elem_id="title",
    )
    selected_index = gr.State(None)
    with gr.Row():
        with gr.Column(scale=3):
            prompt = gr.Textbox(label="Prompt", lines=1, placeholder="Type a prompt after selecting a LoRA")
        with gr.Column(scale=1, elem_id="gen_column"):
            generate_button = gr.Button("Generate", variant="primary", elem_id="gen_btn")
    with gr.Row():
        with gr.Column():
            selected_info = gr.Markdown("")
            gallery = gr.Gallery(
                [(item["image"], item["title"]) for item in loras],
                label="LoRA Gallery",
                allow_preview=False,
                columns=3,
                elem_id="gallery",
                show_share_button=False
            )
            with gr.Group():
                custom_lora = gr.Textbox(label="Custom LoRA", info="LoRA Hugging Face path", placeholder="multimodalart/vintage-ads-flux")
                gr.Markdown("[Check the list of FLUX LoRas](https://huggingface.co/models?other=base_model:adapter:black-forest-labs/FLUX.1-dev)", elem_id="lora_list")
            custom_lora_info = gr.HTML(visible=False)
            custom_lora_button = gr.Button("Remove custom LoRA", visible=False)
        with gr.Column():
            progress_bar = gr.Markdown(elem_id="progress",visible=False)
            result = gr.Image(label="Generated Image")

    with gr.Row():
        with gr.Accordion("Advanced Settings", open=False):
            with gr.Row():
                input_image = gr.Image(label="Input image", type="filepath")
                image_strength = gr.Slider(label="Denoise Strength", info="Lower means more image influence", minimum=0.1, maximum=1.0, step=0.01, value=0.75)
            with gr.Column():
                with gr.Row():
                    cfg_scale = gr.Slider(label="CFG Scale", minimum=1, maximum=20, step=0.5, value=3.5)
                    steps = gr.Slider(label="Steps", minimum=1, maximum=50, step=1, value=28)
                
                with gr.Row():
                    width = gr.Slider(label="Width", minimum=256, maximum=1536, step=64, value=1024)
                    height = gr.Slider(label="Height", minimum=256, maximum=1536, step=64, value=1024)
                
                with gr.Row():
                    randomize_seed = gr.Checkbox(True, label="Randomize seed")
                    seed = gr.Slider(label="Seed", minimum=0, maximum=MAX_SEED, step=1, value=0, randomize=True)
                    lora_scale = gr.Slider(label="LoRA Scale", minimum=0, maximum=3, step=0.01, value=0.95)

    gallery.select(
        update_selection,
        inputs=[width, height],
        outputs=[prompt, selected_info, selected_index, width, height]
    )
    custom_lora.input(
        add_custom_lora,
        inputs=[custom_lora],
        outputs=[custom_lora_info, custom_lora_button, gallery, selected_info, selected_index, prompt]
    )
    custom_lora_button.click(
        remove_custom_lora,
        outputs=[custom_lora_info, custom_lora_button, gallery, selected_info, selected_index, custom_lora]
    )
    gr.on(
        triggers=[generate_button.click, prompt.submit],
        fn=run_lora,
        inputs=[prompt, input_image, image_strength, cfg_scale, steps, selected_index, randomize_seed, seed, width, height, lora_scale],
        outputs=[result, seed, progress_bar]
    )

app.queue()
app.launch()