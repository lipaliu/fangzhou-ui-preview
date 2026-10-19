import React,{useState,useRef,useEffect} from 'react';
import{createRoot}from'react-dom/client';
import{ArrowUpRight,ArrowRight,ArrowLeft,X,Search,Heart,Grid2X2,Check,ChevronDown,ChevronLeft,ChevronRight}from'lucide-react';
import './editorial-30.css';
const sources=[
{name:'London',repo:'TryGhost/London',url:'https://london.ghost.io/',reason:'大幅图片与窄图缝的内容结构'},
{name:'Edition',repo:'TryGhost/Edition',url:'https://edition.ghost.io/',reason:'封面、导航与登录入口的层级'},
{name:'Source',repo:'TryGhost/Source',url:'https://source.ghost.io/',reason:'栏目导航、主编精选与文章分类'},
{name:'Casper',repo:'TryGhost/Casper',url:'https://demo.ghost.io/',reason:'主推内容与后续文章的阅读顺序'},
{name:'Ruby',repo:'TryGhost/Ruby',url:'https://ruby.ghost.io/',reason:'多列内容与卡片信息分层'},
{name:'Alto',repo:'TryGhost/Alto',url:'https://alto.ghost.io/',reason:'横向精选内容与下方故事列表'},
{name:'Revolve',repo:'themefisher/revolve-bootstrap',url:'research/fashion/revolve-preview/index.html',reason:'并列封面、分类标签与图文叠层'},
{name:'React Photo Album',repo:'igordanchenko/react-photo-album',url:'https://react-photo-album.com/examples/columns',reason:'按列组织照片与响应式图集'}];
const names=['全幅封面','双封面','三联大片','横刊封面','框内封面','主编对页','半页叙事','刊头与大片','双页画册','下一期预告','双列图集','三列 Lookbook','横幅专题','横向翻阅','四幅封面','侧刊目录','一主两副','影像之间','人物特刊','专题腰封','作品书架','固定目录','封面导览','上下双刊','整版目录','封面叠题','双面专题','三栏编辑','作品年鉴','方舟月刊'];
const reasons=['整幅图片进入首屏，品牌压在封面上，标题退到下沿。','两张等大封面占满屏幕，分别进入两个作品专题。','三幅等宽长图连续展开，标题放在每幅图底部。','刊头独立一行，横幅图片下留出整齐的摘要。','大片嵌在刊物内页中，边栏留给期号与栏目索引。','左侧主编文字与右侧大片形成对页，文字直接引导创作。','图片和文字各占半页，作品信息有完整的阅读空间。','主标题在图上方横向展开，再进入一幅全宽照片。','两张大图组成完整跨页，底部标题带统一讲述同一专题。','当前作品与下一组内容并列，右侧露出可继续探索的线索。','双列等宽图片直接进入首页，每张图下有简短信息。','三列长幅作品，分类工具条紧贴图库顶部。','一个横幅专题带出下一排双列作品，纵向阅读关系明确。','大幅作品以横向书页展开，用按钮和滑动继续翻阅。','四张等权的大图铺成两行，品牌和操作浮在独立顶栏。','左侧窄栏保持栏目定位，右侧作品占据大部分视野。','一张全高主图带两张横幅专题，适合突出当期封面。','两幅图片左右对开，中间窄栏放标题和编辑说明。','以一幅人物肖像为中心，两侧分别安排导读和作品信息。','双幅图片中穿过一条专题标题带，像打开一本杂志。','三幅大封面像刊物书架排开，图文标题各有完整位置。','固定左侧目录，右侧以两列大图滚动浏览。','封面保持大幅展示，右侧四条目录可直接切换当前作品。','两幅横向跨页上下衔接，适合不同主题的连续浏览。','图片占左侧，右侧用带编号的标题列表直接进入作品。','图片上方留出标题，图像进入字与字之间的阅读关系。','左侧为当期封面，右侧为专题文字与全宽辅助图。','三栏分别放封面、主编文字和第二作品，形成一屏编辑桌。','图集分组展示，章节标题先行，大图等宽排列。','中央刊头、封面导读和三幅大片形成完整一期首页。'];
const sm=[1,0,6,3,1,2,3,2,0,5,7,7,3,5,4,2,4,0,1,6,6,7,5,0,2,3,4,2,7,6];
const shortlist=[6,8,26,15];
const groups=['封面','编辑','图集','专题','目录','刊物'];
const choices=names.map((name,i)=>({id:i+1,name,group:groups[Math.floor(i/5)],reason:reasons[i],source:sm[i]}));
const works=[
{title:'城市，自有风格',en:'THE CITY ISSUE',cat:'时尚',file:'editorial/photo-1.jpg',pos:'50% 22%',desc:'以城市为背景，以人物为中心。让服装、建筑与光线，一起构成画面的叙事。'},
{title:'在目光停留处',en:'PORTRAITS OF NOW',cat:'人物',file:'editorial/photo-2.jpg',pos:'50% 28%',desc:'让细节回到画面中央。观察姿态、情绪与光线，寻找一次有温度的表达。'},
{title:'把日光穿在身上',en:'COLOUR IN MOTION',cat:'时尚',file:'editorial/photo-6.jpg',pos:'50% 15%',desc:'明亮的色彩、舒展的姿态。跟随自然光，把一个瞬间变成一组作品。'},
{title:'关于你的新视角',en:'A NEW PERSPECTIVE',cat:'人物',file:'editorial/photo-5.jpg',pos:'50% 28%',desc:'每一个新视角，都从重新观察开始。用影像记录个体的轮廓与表达。'},
{title:'风经过的地方',en:'BEYOND THE FRAME',cat:'场景',file:'desert.jpg',pos:'50% 50%',desc:'地貌、日光与时间的形状。让空间成为故事的一部分。'},
{title:'城市的另一种秩序',en:'LINES & SPACES',cat:'场景',file:'building.jpg',pos:'50% 40%',desc:'从建筑的线条与比例中，寻找新的视觉秩序。'}];
const num=(n:number)=>String(n).padStart(2,'0');
function Brand({white=false,large=false}:{white?:boolean;large?:boolean}){return <span className={'brand '+(white?'white ':'')+(large?'large':'')} aria-label="方舟 FANGZHOU"><span className="brand-symbol"><img src="assets/fangzhou-logo-light-transparent-v1.png" alt=""/></span><span className="brand-word"><img src="assets/fangzhou-logo-light-transparent-v1.png" alt="FANGZHOU"/></span></span>}
function App(){
 const qp=new URLSearchParams(location.search);const start=Number(qp.get('view'))||1;
 const[view,setView]=useState(start>=1&&start<=30?start:1),[board,setBoard]=useState(false),[group,setGroup]=useState('全部'),[favorites,setFavorites]=useState<number[]>(()=>{try{return JSON.parse(localStorage.getItem('fangzhou-editorial-picks')||'[]')}catch{return[]}}),[active,setActive]=useState(0),[cover,setCover]=useState(0),[filter,setFilter]=useState('全部'),[query,setQuery]=useState(''),[saved,setSaved]=useState<number[]>([]);
 const detail=useRef<HTMLDialogElement>(null),auth=useRef<HTMLDialogElement>(null),search=useRef<HTMLDialogElement>(null),boardRef=useRef<HTMLDialogElement>(null),rail=useRef<HTMLDivElement>(null),backFocus=useRef<HTMLElement|null>(null);
 const c=choices[view-1],src=sources[c.source],clean=qp.has('clean');
 useEffect(()=>{document.title=`方舟 ${num(view)} · ${c.name}`;history.replaceState(null,'',`?view=${num(view)}${clean?'&clean=1':''}`);setCover(0);setFilter('全部');window.scrollTo(0,0)},[view]);
 useEffect(()=>{localStorage.setItem('fangzhou-editorial-picks',JSON.stringify(favorites))},[favorites]);
 function togglePick(){setFavorites(a=>a.includes(view)?a.filter(x=>x!==view):[...a,view])}
 function choose(n:number){setView(n);boardRef.current?.close();setBoard(false)}
 function open(i:number){backFocus.current=document.activeElement as HTMLElement;setActive(i);detail.current?.showModal()}
 function login(){backFocus.current=document.activeElement as HTMLElement;auth.current?.showModal()}
 function Close({d}:{d:React.RefObject<HTMLDialogElement>}){return <button className="close" aria-label="关闭" onClick={()=>d.current?.close()}><X size={22}/></button>}
 function Photo({i=0,label=true,cls='',plain=false}:{i?:number;label?:boolean;cls?:string;plain?:boolean}){const w=works[i];return <button className={'photo '+cls+(plain?' plain':'')} onClick={()=>open(i)} aria-label={'查看作品 '+w.title}><img src={'assets/'+w.file} alt={w.title} style={{objectPosition:w.pos}}/><span className="photo-edge">{w.en} <ArrowUpRight size={18}/></span>{label&&<span className="photo-caption"><small>{w.cat} / EDITORIAL</small><strong>{w.title}</strong><span>探索作品 <ArrowUpRight size={16}/></span></span>}</button>}
 function Copy({title='让想象，成为作品。',i=0,kicker='FANGZHOU · THE NEW ISSUE',cls=''}:{title?:string;i?:number;kicker?:string;cls?:string}){return <div className={'copy '+cls}><span className="kicker">{kicker}</span><h1>{title.replaceAll('\\n','\n')}</h1><p>{works[i].desc}</p><button className="text-link" onClick={()=>open(i)}>探索本期作品 <ArrowUpRight size={22}/></button><span className="copy-foot">影像 / 人物 / 时尚 / 新视角</span></div>}
 function Index({interactive=false}:{interactive?:boolean}){return <div className="story-index"><span className="kicker">IN THIS ISSUE / 本期目录</span>{works.slice(0,4).map((w,i)=><button key={i} aria-pressed={interactive?cover===i:undefined} onClick={()=>interactive?setCover(i):open(i)}><span>{num(i+1)}</span><div><small>{w.en}</small><strong>{w.title}</strong></div><ArrowUpRight size={18}/></button>)}</div>}
 function Caption(){return <div className="edition-caption"><span>FANGZHOU / OCTOBER 2026</span><strong>让每一种想象，都有自己的表达。</strong><button onClick={login}>进入创作空间 <ArrowUpRight size={17}/></button></div>}
 function Headline({text='想象，自有风格。'}:{text?:string}){return <div className="headline"><span className="kicker">FANGZHOU / SELECTED WORKS</span><h1>{text}</h1><span>本期精选 / 2026.10</span></div>}
 function GalleryTools(){return <div className="gallery-tools"><span>作品精选 / THE EDIT</span><div>{['全部','时尚','人物','场景'].map(t=><button key={t} aria-pressed={filter===t} onClick={()=>setFilter(t)}>{t}</button>)}</div></div>}
 const filtered=works.map((w,i)=>({w,i})).filter(x=>filter==='全部'||x.w.cat===filter);
 let stage:React.ReactNode;
 switch(view){
 case 1:stage=<><Photo i={0} label={false}/><Copy title="让想象，\n走上封面。" cls="cover-copy"/><span className="cover-issue">THE OCTOBER ISSUE / 01</span></>;break;
 case 2:stage=<><Photo i={0}/><Photo i={2}/><div className="pair-title">一种灵感，<br/>不止一种表达。</div></>;break;
 case 3:stage=<>{[0,1,2].map(i=><Photo key={i} i={i}/>)}</>;break;
 case 4:stage=<><Headline text="看见新的可能。"/><Photo i={0} label={false}/><Caption/></>;break;
 case 5:stage=<><div className="vertical-note">FANGZHOU — A JOURNAL OF IMAGINATION</div><Photo i={0} label={false}/><Copy title="灵感，\n有了形状。"/><span className="frame-number">01 / THE COVER</span></>;break;
 case 6:stage=<><Copy title="下一种风格，\n由你定义。" i={2}/><Photo i={2}/></>;break;
 case 7:stage=<><Photo i={1} label={false}/><Copy title="每一个画面，\n都值得被看见。" i={1} kicker="THE PORTRAIT ISSUE / 人物特刊"/></>;break;
 case 8:stage=<><Headline text="用 AI，想象内容的下一种可能"/><Photo i={2} label={false}/><span className="floating-tag">COLOUR / 本期色彩</span></>;break;
 case 9:stage=<><div className="spread-images"><Photo i={0} label={false}/><Photo i={1} label={false}/></div><div className="spread-caption"><h1>风格，在对话中发生。</h1><p>两种视角，一个属于你的创作世界。</p><button className="text-link" onClick={()=>open(0)}>打开本期 <ArrowUpRight size={20}/></button></div></>;break;
 case 10:stage=<><Photo i={0}/><div className="next-issue"><span className="kicker">UP NEXT / 下一组作品</span><Photo i={2} label={false}/><h2>把日光穿在身上</h2><button className="text-link" onClick={()=>open(2)}>继续探索 <ArrowRight size={20}/></button></div></>;break;
 case 11:stage=<><GalleryTools/><div className="two-grid">{filtered.map(({i})=><div className="catalog-card" key={i}><Photo i={i} label={false}/><div><span>{works[i].cat}</span><h2>{works[i].title}</h2><ArrowUpRight size={18}/></div></div>)}</div></>;break;
 case 12:stage=<><GalleryTools/><div className="three-grid">{filtered.map(({i})=><Photo key={i} i={i}/>)}</div></>;break;
 case 13:stage=<><div className="wide-story"><Photo i={0} label={false}/><Copy title="城市，也是一座片场。"/></div><div className="two-grid"><Photo i={1}/><Photo i={2}/></div></>;break;
 case 14:stage=<><div className="rail-heading"><Headline text="翻开你的下一次灵感。"/><div><button aria-label="向左翻阅" onClick={()=>rail.current?.scrollBy({left:-600,behavior:'smooth'})}><ArrowLeft/></button><button aria-label="向右翻阅" onClick={()=>rail.current?.scrollBy({left:600,behavior:'smooth'})}><ArrowRight/></button></div></div><div className="reading-rail" ref={rail}>{[0,2,1,3,4].map(i=><Photo key={i} i={i}/>)}</div></>;break;
 case 15:stage=<>{[0,1,2,3].map(slot=><Photo key={slot} i={2}/>)}</>;break;
 case 16:stage=<><aside className="issue-rail"><span>FANGZHOU<br/>ISSUE 01</span><h1>本期<br/>精选。</h1><Index/></aside><Photo i={0}/></>;break;
 case 17:stage=<><Photo i={0}/><Photo i={1}/><Photo i={2}/></>;break;
 case 18:stage=<><Photo i={0} label={false}/><Copy title="光影之间，\n是新的自己。" i={1}/><Photo i={1} label={false}/></>;break;
 case 19:stage=<><Copy title="关于人物，\n关于表达。" i={1}/><Photo i={1} label={false}/><div className="person-notes"><span className="kicker">PORTRAIT / 01</span><h2>在目光<br/>停留处。</h2><p>姿态、细节与情绪，<br/>构成独一无二的画面。</p><button className="text-link" onClick={()=>open(1)}>进入专题 <ArrowUpRight/></button></div></>;break;
 case 20:stage=<><Photo i={0} label={false}/><Photo i={2} label={false}/><div className="belly-band"><span>THE STYLE ISSUE</span><h1>风格，从不只有一种。</h1><button onClick={()=>open(0)}>查看专题 ↗</button></div></>;break;
 case 21:stage=<><Headline text="你的灵感，正在上新。"/><div className="shelf">{[0,1,2].map(i=><div key={i}><Photo i={i} label={false}/><small>VOL. {num(i+1)} / {works[i].cat}</small><h2>{works[i].title}</h2></div>)}</div></>;break;
 case 22:stage=<><aside><Copy title="方舟\n作品目录。"/><div className="side-filters">{['全部','时尚','人物','场景'].map(t=><button aria-pressed={filter===t} key={t} onClick={()=>setFilter(t)}>{t}<ArrowUpRight size={17}/></button>)}</div></aside><div className="two-grid">{filtered.map(({i})=><Photo i={i} key={i}/>)}</div></>;break;
 case 23:stage=<><Photo i={cover}/><div className="cover-index"><h1>打开想象的<br/>每一个章节。</h1><Index interactive/></div></>;break;
 case 24:stage=<><div className="horizontal-issue"><Photo i={0} label={false}/><Copy title="城市的封面。"/></div><div className="horizontal-issue"><Copy title="日光的另一面。" i={2}/><Photo i={2} label={false}/></div></>;break;
 case 25:stage=<><Photo i={2} label={false}/><div className="list-cover"><Headline text="本期目录。"/><Index/></div></>;break;
 case 26:stage=<><div className="type-cover"><span>CREATE</span><h1>让想象<br/>有所发生。</h1><button onClick={login}>开始创作 <ArrowUpRight/></button></div><Photo i={2} label={false}/><div className="type-note">从看见，到创造。<br/>FANGZHOU / THE NEW ISSUE</div></>;break;
 case 27:stage=<><Photo i={1}/><div className="double-feature"><Copy title="记录此刻，\n想象下一刻。"/><Photo i={2} label={false}/></div></>;break;
 case 28:stage=<><Photo i={0}/><div className="editor-column"><span className="kicker">LETTER FROM THE EDITOR</span><h1>把灵感，<br/>交给<br/>想象力。</h1><p>发现画面，探索不同风格，<br/>在方舟开始你的下一件作品。</p><button className="text-link" onClick={login}>进入创作空间 <ArrowUpRight/></button><span>方舟 / 创作手记</span></div><Photo i={2}/></>;break;
 case 29:stage=<><Headline text="值得再看一次。"/><div className="archive-row"><div><span>CHAPTER 01</span><h2>时尚<br/>与人物</h2><button onClick={()=>open(0)}>探索章节 ↗</button></div><Photo i={0} label={false}/><Photo i={1} label={false}/></div><div className="archive-row"><div><span>CHAPTER 02</span><h2>色彩<br/>与空间</h2></div><Photo i={2}/><Photo i={4}/></div></>;break;
 case 30:stage=<><div className="monthly-title"><span>OCTOBER 2026 / VOL.01</span><h1>本月，在方舟。</h1><p>关于影像、风格，和每一次新的创造。</p></div><div className="monthly-covers"><Photo i={0}/><Photo i={2}/><Photo i={1}/></div><Caption/></>;break;
 }
 const overlay=[1,2,3,15,20,26].includes(view);
 return <div className={`edition v${view} ${overlay?'overlay-head':''} ${clean?'clean':''}`}>
 <header className="brand-header"><nav><a href="#collection">发现</a><button onClick={()=>{search.current?.showModal()}}>搜索 <Search size={14}/></button></nav><a href="#" aria-label="方舟首页"><Brand white={overlay}/></a><div><a className="studio-link" href="./?id=03">创作空间</a><button className="login-button" onClick={login}>登录 <ArrowUpRight size={14}/></button></div></header>
 <main><section className="composition" aria-label={c.name+'方舟首页'}>{stage}</section>
 <section className="collection" id="collection"><div className="section-heading"><span className="kicker">FANGZHOU / MORE TO EXPLORE</span><h2>继续，发现新的灵感。</h2><GalleryTools/></div><div className="collection-grid">{filtered.map(({i})=><article key={i}><Photo i={i} label={false}/><span>{works[i].cat} / EDITORIAL</span><h3>{works[i].title}</h3></article>)}</div></section>
 <section className="join"><Brand/><h2>下一张封面，来自你的想象。</h2><button onClick={login}>进入方舟创作空间 <ArrowUpRight size={18}/></button></section>
 </main>
 <footer className="product-footer"><span>FANGZHOU © 2026</span><span>首页设计预览 · 示例摄影，不代表方舟客户作品</span></footer>
 <section className="source-notes"><span className="kicker">方案 {num(view)} / {c.name} · 参考来源</span><h2>{c.reason}</h2><p>参考 {src.name} 的{src.reason}，为方舟独立编写此版 React 布局与交互。30 个方案由 8 个开源项目的结构启发延展，并非 30 个不同的原站，也未原样移植模板。</p><div><a href={src.url} target="_blank" rel="noreferrer">查看原版网站 ↗</a><a href={'https://github.com/'+src.repo} target="_blank" rel="noreferrer">GitHub / {src.repo} ↗</a><a href="EDITORIAL-30-NOTES.md" target="_blank">来源、素材与验证记录 ↗</a></div><small>参考项目代码许可：MIT。摄影与品牌素材独立于代码许可；示例摄影来自 Unsplash。账号服务未接入，可通过创作空间体验既有演示工作台。</small></section>
 {!clean&&<div className="review-dock"><button aria-label="上一方案" onClick={()=>choose(view===1?30:view-1)}><ChevronLeft size={17}/></button><span><b>{num(view)}</b> / 30 <strong>{c.name}</strong></span><button aria-label="下一方案" onClick={()=>choose(view===30?1:view+1)}><ChevronRight size={17}/></button><i/><button className="all-options" onClick={()=>{setBoard(true);boardRef.current?.showModal()}}><Grid2X2 size={15}/>30 版总览</button><button aria-label="收藏当前方案" aria-pressed={favorites.includes(view)} onClick={togglePick}><Heart size={17} fill={favorites.includes(view)?'currentColor':'none'}/></button></div>}
 <dialog ref={boardRef} className="options-dialog" onClose={()=>{setBoard(false)}} aria-labelledby="options-title"><div className="dialog-title"><div><span className="kicker">FANGZHOU / 30 EDITORIAL HOMEPAGES</span><h2 id="options-title">选一个你想走进去的方舟。</h2></div><Close d={boardRef}/></div><div className="board-filters">{['全部','已入围',...groups,'已收藏'].map(g=><button aria-pressed={group===g} key={g} onClick={()=>setGroup(g)}>{g}{g==='已收藏'?` ${favorites.length}`:''}</button>)}</div>{board&&<div className="options-grid">{choices.filter(x=>group==='全部'||group==='已入围'&&shortlist.includes(x.id)||group===x.group||group==='已收藏'&&favorites.includes(x.id)).map(x=><button key={x.id} className="option-card" aria-label={'选择方案 '+num(x.id)+' '+x.name} onClick={()=>choose(x.id)}><div className="option-preview"><img src={`screens/editorial-30/${num(x.id)}.png?rev=slogan-zh-20261009`} alt={'方舟 '+x.name+'实际页面截图'} loading="lazy"/></div><div><b>{num(x.id)}</b><strong>{x.name}</strong><span>{x.id===8?'已选定':shortlist.includes(x.id)?'已入围':x.group}</span>{favorites.includes(x.id)&&<Heart size={14} fill="currentColor"/>}</div></button>)}</div>}{group==='已收藏'&&!favorites.length&&<p className="empty">点击底部爱心，先收下喜欢的方案。</p>}</dialog>
 <dialog ref={detail} className="work-dialog" aria-labelledby="work-title" onClose={()=>backFocus.current?.focus()}><Close d={detail}/><div className="work-art"><img src={'assets/'+works[active].file} alt={works[active].title}/><div><button aria-label="上一作品" onClick={()=>setActive((active+5)%6)}><ArrowLeft/></button><span>{num(active+1)} / 06</span><button aria-label="下一作品" onClick={()=>setActive((active+1)%6)}><ArrowRight/></button></div></div><div className="work-copy"><Brand/><small>{works[active].en} / {works[active].cat}</small><h2 id="work-title">{works[active].title}</h2><p>{works[active].desc}</p><button className="black-button" onClick={()=>{detail.current?.close();login()}}>以此为灵感，开始创作 <ArrowUpRight size={17}/></button><button className="save-work" aria-pressed={saved.includes(active)} onClick={()=>setSaved(a=>a.includes(active)?a.filter(x=>x!==active):[...a,active])}>{saved.includes(active)?<Check size={17}/>:<Heart size={17}/>} {saved.includes(active)?'已收藏作品':'收藏作品'}</button><small>摄影素材仅用于方案预览</small></div></dialog>
 <dialog ref={auth} className="login-dialog" aria-labelledby="login-title" onClose={()=>backFocus.current?.focus()}><Close d={auth}/><Brand/><span className="kicker">WELCOME TO FANGZHOU</span><h2 id="login-title">回到你的创作空间。</h2><p>从灵感出发，让作品发生。</p><label>账号<input disabled placeholder="手机号或邮箱"/></label><label>密码<input disabled type="password" placeholder="输入密码"/></label><button disabled className="black-button">登录</button><small>账号服务待接入 · 当前为登录界面预览</small><a className="demo-workspace" href="./?id=03">直接体验工作台 <ArrowUpRight size={16}/></a></dialog>
 <dialog ref={search} className="search-dialog" aria-labelledby="search-title"><Close d={search}/><h2 id="search-title">寻找你的下一次灵感。</h2><label><Search size={20}/><input aria-label="搜索作品" value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索时尚、人物、场景或作品名称"/></label><div>{works.map((w,i)=>({w,i})).filter(({w})=>(w.title+w.cat).includes(query)).map(({w,i})=><button key={i} onClick={()=>{search.current?.close();open(i)}}><img src={'assets/'+w.file} alt=""/><span><small>{w.cat}</small>{w.title}</span><ArrowUpRight/></button>)}</div>{!works.some(w=>(w.title+w.cat).includes(query))&&<p>暂时没有相关作品，试试「时尚」或「人物」。</p>}</dialog>
 </div>
}
createRoot(document.getElementById('root')!).render(<App/>);
