import React from 'react';
import * as Select from '@radix-ui/react-select';
import * as Popover from '@radix-ui/react-popover';
import {Check,ChevronDown,Image as ImageIcon,Video,SlidersHorizontal,X} from 'lucide-react';
import './ui-select.css';

type Option={value:string;label:string;icon?:React.ReactNode};
export function UISelect({label,value,onChange,options,icon,className=''}:{label:string;value:string;onChange:(s:string)=>void;options:(Option|string)[];icon?:React.ReactNode;className?:string}){
 const items=options.map(o=>typeof o==='string'?{value:o,label:o}:o);
 return <Select.Root value={value} onValueChange={onChange}><Select.Trigger className={'ui-select-trigger '+className} aria-label={label}>{icon}<Select.Value/><Select.Icon className="ui-chevron"><ChevronDown size={13}/></Select.Icon></Select.Trigger><Select.Portal><Select.Content className="ui-select-panel" position="popper" side="bottom" align="start" sideOffset={8} collisionPadding={12}><Select.Viewport><Select.Group><Select.Label className="ui-menu-label">{label}</Select.Label>{items.map(o=><Select.Item value={o.value} key={o.value} className="ui-select-option">{o.icon&&<span className="ui-option-icon">{o.icon}</span>}<Select.ItemText>{o.label}</Select.ItemText><Select.ItemIndicator className="ui-check"><Check size={15}/></Select.ItemIndicator></Select.Item>)}</Select.Group></Select.Viewport></Select.Content></Select.Portal></Select.Root>
}
export const generationTypes=[{value:'image',label:'图片',icon:<ImageIcon size={17}/>},{value:'video',label:'视频',icon:<Video size={17}/>}];
function Choices({label,value,options,onChange}:{label:string;value:string;options:string[];onChange:(v:string)=>void}){
 return <fieldset className="output-choice"><legend>{label}</legend><div>{options.map(v=><button type="button" key={v} aria-label={`${label} ${v}`} aria-pressed={v===value} onClick={()=>onChange(v)}>{v}{v===value&&<Check size={12}/>}</button>)}</div></fieldset>
}
export function OutputSettings({mode,ratio,setRatio,quality,setQuality,count,setCount,duration,setDuration}:any){
 const summary=mode==='image'?`${ratio} · ${quality} · ${count} 张`:`${ratio} · ${quality} · ${duration} 秒`;
 return <Popover.Root><Popover.Trigger className="output-summary" aria-label="输出设置">{summary}<ChevronDown size={13}/></Popover.Trigger><Popover.Portal><Popover.Content className="ui-output-panel" sideOffset={8} align="start" collisionPadding={12} aria-label="输出参数"><div className="ui-output-heading"><span><SlidersHorizontal size={15}/>输出设置</span><Popover.Close aria-label="关闭输出设置"><X size={16}/></Popover.Close></div><Choices label="画面比例" value={ratio} onChange={setRatio} options={mode==='image'?['3:2','16:9','9:16','1:1','4:3','3:4','2:3','21:9']:['16:9','9:16','1:1','4:3','3:4','21:9']}/><Choices label="清晰度" value={quality} onChange={setQuality} options={mode==='image'?['2K','4K']:['720p','1080p']}/>{mode==='image'?<Choices label="出图数量" value={count+' 张'} onChange={v=>setCount(v.split(' ')[0])} options={['1 张','2 张','3 张','4 张']}/>:<Choices label="时长" value={duration+' 秒'} onChange={v=>setDuration(v.split(' ')[0])} options={['5 秒','10 秒','15 秒']}/>}<p className="ui-output-footnote">规格选择用于预览，报价以服务返回为准。</p></Popover.Content></Popover.Portal></Popover.Root>
}
