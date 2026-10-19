# 方舟 · Hugging Face 20 个对标

2026-10-19。外部08保留；内部C已选定。

本轮按20个不同公开Space计数，包含完整产品入口与二级功能流程，不宣称20套完整网站。API均报告RUNNING，但未执行推理；原站浏览器加载超时，未获得20站实际截图。已读固定commit的界面源码。预览均为方舟独立适配结构示意，非原站截图、非原站风格复刻、非已接入能力。未将研究加入共享Skill主库。

优先组合：01作品发现 + 02/C启动创作 + 04风格库 + 09机位 + 11分镜。其余按任务逐步进入二级页。

## HF01 内容展厅 · DeepSite Gallery

[原站](https://huggingface.co/spaces/victor/deepsite-gallery) · [固定源码](https://huggingface.co/spaces/victor/deepsite-gallery/blob/be441feedd93afef2a209af62eb279bb21281fbb/index.html)

- 作者/维护者：victor
- 源码可核实：作品截图组成链接网格；图像承担入口，悬停提高亮度。
- 方舟提案：把08首页延展为大幅作品展厅，作品点开再呈现项目与创作信息。
- 取舍：借内容入口关系；不照搬深灰背景和小图密度。
- Space元数据许可：Space元数据未声明；另行核实。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF02 一句话启动项目 · DeepSite v4

[原站](https://huggingface.co/spaces/enzostvs/deepsite) · [固定源码](https://huggingface.co/spaces/enzostvs/deepsite/blob/d4c8bedc29019597fa5dd25cd8a73e875f1ea8b9/components/ask-ai/ask-ai-landing.tsx)

- 作者/维护者：enzostvs
- 源码可核实：输入区带模型选择与提交箭头；有内容后进入新项目路径。
- 方舟提案：外部作品页旁保留“从想法开始”，登录后接入已选C输入区。
- 取舍：适合降低首次操作门槛；不能把建站产品的功能当方舟已支持。
- Space元数据许可：mit。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF03 按创作任务找能力 · The Essential AI Toolkit

[原站](https://huggingface.co/spaces/JournalistsonHF/ai-toolkit) · [固定源码](https://huggingface.co/spaces/JournalistsonHF/ai-toolkit/blob/79cb80e67b1c0f1f0afceb205af8a232e795e969/index.html)

- 作者/维护者：JournalistsonHF
- 源码可核实：顶部搜索按任务、示例和工具匹配；每个任务卡列用途、示例与入口。
- 方舟提案：将工具按“构思、拍摄、后期、交付”组织，用户先选要完成的事。
- 取舍：借任务语言；不把工具目录堆成首页主视觉。
- Space元数据许可：Space元数据未声明；另行核实。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF04 可视化风格库 · FLUX LoRa the Explorer

[原站](https://huggingface.co/spaces/multimodalart/flux-lora-the-explorer) · [固定源码](https://huggingface.co/spaces/multimodalart/flux-lora-the-explorer/blob/154a8f60a348bf4a62df23a512aa4032305741c1/app.py)

- 作者/维护者：multimodalart
- 源码可核实：左侧LoRA图库、右侧结果；选择风格会改变提示占位和触发词，进阶设置折叠。
- 方舟提案：让风格样片直接进入C的已选参考区，先看样片再决定风格。
- 取舍：需说明模型兼容性与许可；样片不是稳定效果保证。
- Space元数据许可：mit。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF05 轻量生成入口 · FLUX.1 [Schnell]

[原站](https://huggingface.co/spaces/black-forest-labs/FLUX.1-schnell) · [固定源码](https://huggingface.co/spaces/black-forest-labs/FLUX.1-schnell/blob/2569ee41266dd6d3a5e84c2a5ea3f4ad6e4ff25e/app.py)

- 作者/维护者：black-forest-labs
- 源码可核实：提示词与Run同排，下方结果；种子、尺寸与步数放进折叠设置。
- 方舟提案：保留C的描述、参考、模型、比例和报价，把低频参数收进展开层。
- 取舍：最接近C的核心顺序；结果出现后需要历史版本与任务状态。
- Space元数据许可：mit。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF06 原图与指令编辑 · Qwen Image Edit

[原站](https://huggingface.co/spaces/Qwen/Qwen-Image-Edit) · [固定源码](https://huggingface.co/spaces/Qwen/Qwen-Image-Edit/blob/96113f30318d916d82a070a0c852b781b0ff911e/app.py)

- 作者/维护者：Qwen
- 源码可核实：输入图与结果并置，编辑指令和Edit按钮相邻；高级设置默认折叠。
- 方舟提案：作品详情可直接带图进入编辑，保留原图与修改说明的对应关系。
- 取舍：适合逐轮改图；图示仅布局示意，未调用编辑模型。
- Space元数据许可：Space元数据未声明；另行核实。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF07 人物参考管理 · PhotoMaker V2

[原站](https://huggingface.co/spaces/TencentARC/PhotoMaker-V2) · [固定源码](https://huggingface.co/spaces/TencentARC/PhotoMaker-V2/blob/2989a2401c1554a5d0513cc72ce98a6705b65d54/app.py)

- 作者/维护者：TencentARC
- 源码可核实：多张人脸上传后进入参考图库；风格、比例与生成结果分区。
- 方舟提案：C中的参考条允许归为同一人物，人物参考与风格参考分别标注。
- 取舍：多图归组有价值；不把名人示例或模型人像许可照搬。
- Space元数据许可：apache-2.0。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF08 布光工作台 · IC Light

[原站](https://huggingface.co/spaces/lllyasviel/IC-Light) · [固定源码](https://huggingface.co/spaces/lllyasviel/IC-Light/blob/607696fa4cad6dffb31e9f455a6b0e0f5636f24d/app.py)

- 作者/维护者：lllyasviel
- 源码可核实：输入图和预处理前景并排，提供光照偏好与快捷提示；右侧输出图库。
- 方舟提案：将光线方向、气氛与参考图做成摄影语言的控件，结果侧保留多版比较。
- 取舍：作为专业二级工具；不要把所有参数塞进C首页。
- Space元数据许可：creativeml-openrail-m。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF09 镜头角度控制 · Qwen Image Multiple Angles 3D Camera

[原站](https://huggingface.co/spaces/multimodalart/qwen-image-multiple-angles-3d-camera) · [固定源码](https://huggingface.co/spaces/multimodalart/qwen-image-multiple-angles-3d-camera/blob/3a95a450b7b4d8a1bc85ee2ab16a616335f208b2/app.py)

- 作者/维护者：multimodalart
- 源码可核实：自定义3D相机组件配水平、俯仰、距离滑杆，提示预览与结果图相邻。
- 方舟提案：用可视化机位替代冗长镜头提示词，保留参数到文字的可读映射。
- 取舍：适合视听语言优势；拖动示意不代表相机一致性已验证。
- Space元数据许可：Space元数据未声明；另行核实。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF10 图文双入口视频 · LTX Video Fast

[原站](https://huggingface.co/spaces/Lightricks/ltx-video-distilled) · [固定源码](https://huggingface.co/spaces/Lightricks/ltx-video-distilled/blob/8a42e93469c66b62d794b83a4233f5fc8439e2b5/app.py)

- 作者/维护者：Lightricks
- 源码可核实：图生视频与文生视频通过标签切换；时长就近设置，右侧输出视频。
- 方舟提案：C切换到视频时沿用同一输入区，展开首帧、时长和运动描述。
- 取舍：此版本视频转视频标签被隐藏，不把隐藏能力列成可用。
- Space元数据许可：Space元数据未声明；另行核实。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF11 分镜版面组织 · AI Comic Factory

[原站](https://huggingface.co/spaces/jbilcke-hf/ai-comic-factory) · [固定源码](https://huggingface.co/spaces/jbilcke-hf/ai-comic-factory/blob/c5dc3c7dafeb593efa3b7c95431ee982965bb524/src/app/interface/top-menu/index.tsx)

- 作者/维护者：jbilcke-hf
- 源码可核实：顶部工具含风格、布局、故事与风格文本；页面以分格承载画面。
- 方舟提案：在C之后进入分镜板，以镜号和镜头说明组织连续画面。
- 取舍：借分格与编辑关系；方舟不照搬漫画气泡和漫画风格。
- Space元数据许可：Space元数据未声明；另行核实。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF12 连续角色叙事 · StoryDiffusion

[原站](https://huggingface.co/spaces/YupengZhou/StoryDiffusion) · [固定源码](https://huggingface.co/spaces/YupengZhou/StoryDiffusion/blob/960e7e25f28b6a8d2ee1f87bfa54c2626d65a009/app.py)

- 作者/维护者：YupengZhou
- 源码可核实：人物描述独立于分帧文本；每行对应一帧，结果用图库与排版类型呈现。
- 方舟提案：先锁人物设定，再写每个镜头的行动，形成角色与镜头两层结构。
- 取舍：Space声明CC-BY-NC-4.0；仅参考组织方式，不作商业代码移植。
- Space元数据许可：cc-by-nc-4.0。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF13 表演驱动关系 · Live Portrait

[原站](https://huggingface.co/spaces/KlingTeam/LivePortrait) · [固定源码](https://huggingface.co/spaces/KlingTeam/LivePortrait/blob/a531730891f3ddcd5a30bc32a24a2f387cf3ae61/app.py)

- 作者/维护者：KlingTeam
- 源码可核实：来源肖像与驱动视频分别输入；输出含动画与贴回版本，眼唇重定向另组。
- 方舟提案：人物卡、表演参考和输出预览保持三者关系，参数命名用表演语言。
- 取舍：人脸、动作参考要分清；无需在首页展示底层驱动参数。
- Space元数据许可：Space元数据未声明；另行核实。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF14 时装影像工作流 · OOTDiffusion

[原站](https://huggingface.co/spaces/levihsu/OOTDiffusion) · [固定源码](https://huggingface.co/spaces/levihsu/OOTDiffusion/blob/6ead2c44c878d68767d655cdb51a4848d35c26e1/run/gradio_ootd.py)

- 作者/维护者：levihsu
- 源码可核实：人物、服装和结果为三个独立区域；服装类别与采样参数集中控制。
- 方舟提案：适合方舟时尚案例：人物与服装各自引用，结果作为独立版本展示。
- 取舍：声明CC-BY-NC-SA-4.0；研究流程，不视为可直接商用组件。
- Space元数据许可：cc-by-nc-sa-4.0。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF15 空间资产预览 · TRELLIS.2

[原站](https://huggingface.co/spaces/microsoft/TRELLIS.2) · [固定源码](https://huggingface.co/spaces/microsoft/TRELLIS.2/blob/ebf60b20fc5a4607f90a1c11c0aab0ceeda5429d/app.py)

- 作者/维护者：microsoft
- 源码可核实：左侧图像输入与参数，大区域预览3D资产，另有GLB提取下载和示例区。
- 方舟提案：美术场景与道具页优先显示当前资产，再开放材质、视角和导出。
- 取舍：属于后续专业能力；本次仅空间布局示意，不含3D模型引擎。
- Space元数据许可：mit。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF16 抠图前后比较 · Background Removal

[原站](https://huggingface.co/spaces/not-lain/background-removal) · [固定源码](https://huggingface.co/spaces/not-lain/background-removal/blob/448a02eff7df7ee3f7ab6026d7882561f895911a/app.py)

- 作者/维护者：not-lain
- 源码可核实：上传、URL与文件流程分标签；处理图通过ImageSlider比较，输出PNG。
- 方舟提案：素材详情中内嵌前后对照，透明底与导出格式在同处明确。
- 取舍：可借比较与导出关系；本预览不伪造真实抠图结果。
- Space元数据许可：mit。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF17 修复强度与保真 · CodeFormer

[原站](https://huggingface.co/spaces/sczhou/CodeFormer) · [固定源码](https://huggingface.co/spaces/sczhou/CodeFormer/blob/13b06b1d0a6c35aaadbce8b2a9c7132f8ff53d86/app.py)

- 作者/维护者：sczhou
- 源码可核实：输入与输出分列，修复保真度滑杆与背景增强、放大选项同处。
- 方舟提案：旧素材修复页把“更清晰”和“更忠于原图”作为可读取舍。
- 取舍：不能只承诺变清晰；脸部细节可能变化，需保留原版复核。
- Space元数据许可：Space元数据未声明；另行核实。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF18 画面局部选择 · SAM2 Image Predictor

[原站](https://huggingface.co/spaces/fffiloni/SAM2-Image-Predictor) · [固定源码](https://huggingface.co/spaces/fffiloni/SAM2-Image-Predictor/blob/3737bd915f9cf0fa84cd42cfe332a5f2d7f1b832/app.py)

- 作者/维护者：fffiloni
- 源码可核实：点位图使用include/exclude选择；清除点位、模型选择与图像/遮罩输出分区。
- 方舟提案：在大图上点选局部，再把选中区域传给编辑任务，减少反复上传。
- 取舍：本示意不执行分割；选择区与编辑结果必须分开。
- Space元数据许可：Space元数据未声明；另行核实。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF19 视听语言编排 · FLUX Prompt Generator

[原站](https://huggingface.co/spaces/gokaygokay/FLUX-Prompt-Generator) · [固定源码](https://huggingface.co/spaces/gokaygokay/FLUX-Prompt-Generator/blob/2cd53cb71730a78bee99a9a74c2effb9927710c7/ui_components.py)

- 作者/维护者：gokaygokay
- 源码可核实：界面把分类选项组合为提示文本，并提供图像分析相关入口。
- 方舟提案：把主体、场景、光线、构图做成可编辑短语，帮助创作者表达意图。
- 取舍：作为C的辅助浮层；不能强迫专业用户逐项填表。
- Space元数据许可：apache-2.0。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。

## HF20 声音也是内容 · MusicGen

[原站](https://huggingface.co/spaces/facebook/MusicGen) · [固定源码](https://huggingface.co/spaces/facebook/MusicGen/blob/39609d0bd7d857f5876e4e445359a5f2fd75df84/demos/musicgen_app.py)

- 作者/维护者：facebook
- 源码可核实：简洁入口用音乐描述和可选旋律输入，右侧是音频结果与示例。
- 方舟提案：声音任务沿用C结构：情绪描述、参考旋律、时长、结果试听与版本。
- 取舍：模型权重声明非商业限制；仅作为产品结构参考，未试听生成效果。
- Space元数据许可：cc-by-nc-4.0。代码、权重与素材需分别核实。
- 边界：公开源码结构；未完成原站视觉验收；未安装第三方源码、未跑模型。
