# 方舟：满屏内容背景 / 瀑布流 GitHub 研究

研究日期：2026-10-05（Asia/Shanghai）。用户明确想继续查找全是内容展示、类似旧 Windows 背景的 GitHub 模板，并调用 lipa UI。

预览：http://127.0.0.1:8782/content-walls.html

## 解释与筛选

“Windows 以前那种做背景”暂按照片墙、动态照片磁贴、照片屏保理解，未声称识别到某一个确切 Windows 版本或官方模板。保留 Apple 字体与控制层次，不采用被否决的 M3 流动渐变。

优先 W1：图像铺成背景、局部轮换；优先 W3：标准密集瀑布流。W2 提供列间滚动层次，W4 是艺术探索对照。

## 固定代码来源与可见验证

### W1 Animated Responsive Image Grid / Demo 3

- Repo：https://github.com/codrops/AnimatedResponsiveImageGrid
- 原版：https://tympanus.net/Development/AnimatedResponsiveImageGrid/index3.html
- HEAD：60aa60b8871a2d822f7128e5f2157b8a477995c1
- 已读 README.md、index3.html、js/jquery.gridrotator.js。脚本头与 README 声明 MIT；根目录没有单独 LICENSE。
- 原版已加载照片墙；两次读取可见磁贴背景，33 个链接中背景图片发生变化，自动轮换可用。
- Demo 3 源码：4 行 8 列，interval 2000ms、maxStep 2，带多个窄屏列数配置。
- 2012 年 jQuery 实现；定位是视觉机制参考，不能直接当成现代生产级 React 模板。示例图版权独立于代码。

### W2 Elastic Grid Scroll / V01

- Repo：https://github.com/codrops/ElasticGridScroll
- 原版：https://tympanus.net/Tutorials/ElasticGridScroll/
- HEAD：40e474582ae72df26cd9d90b05d5b15fed423abd
- 已读 README.md、LICENSE（MIT）、index.html、js/demo1/index.js。
- 原站实际滚动并截图；图库占主要内容区域，列间形成不同延迟。
- 代码按计算出的列数分组，ScrollSmoother.effects 的 lag 按离中心距离调整；该固定版本含减少动效与重新分组清理。
- 这是一组等尺寸多列图库，不是 Masonry 填缝算法。GSAP 依赖许可单独适用。

### W3 React Photo Album / Masonry

- Repo：https://github.com/igordanchenko/react-photo-album
- 原版：https://react-photo-album.com/examples/masonry#LiveDemo
- HEAD：f26e7115df1823ab1a2f6ecab419ecb071375fd4
- 已读 README.md、LICENSE（MIT）、package.json、examples/masonry/src/App.tsx。
- 已实际打开 Masonry 示例、滚动到 Live Demo 并截图。混合横竖图片，保留各自比例，按等宽列排列。
- 示例 App 使用 MasonryPhotoAlbum 和 masonry.css；README 解释图片放入当前最短列。
- 文档站蓝色顶栏与侧栏不是图库组件必须的 UI。基础示例不含作品灯箱；官网另有 Lightbox 和 Infinite Scroll 示例，这轮未把它们记作已测试流程。

### W4 Infinite Canvas

- Repo：https://github.com/edoardolunardi/infinite-canvas
- 原版：https://tympanus.net/Tutorials/InfiniteCanvas/
- HEAD：528d811a39eafe574917ed45f697f51c62942758
- 已读 README.md、LICENSE（MIT）、package.json。框架为 React / React Three Fiber / Three.js。
- 已实际打开并拖动画布，前景图片位置变化，中央标题仍在中心；保存拖动后的截图。
- 只核验了公开演示和上述文件，未本地构建；源码目录 API 受 GitHub 限流影响，本轮未完整审计画布实现。
- 原版较多留白与纵深，是艺术方向对照，不称为标准瀑布流；移动端和性能未实测。

## 排除的近似项

ImageGridMotionEffect（codrops，固定 HEAD 210f9703661b0547d8c16c91fee5df942f816846）：已看三个原版变体，并读 README、LICENSE、package.json、src/index3.html、src/js/demo3/index.js。中心标题周围只有少数分散图片，留白较多；与这次“全是内容展示”相比匹配较弱，未放进四个主候选。

## 交付与边界

content-walls.html 是新建本地参考板，四张图均为真实原站截图。每项有直接原版、GitHub 与固定版本文件链接，中文描述分清原版观察和方舟适配建议。未安装这些仓库依赖、未运行仓库脚本、未复制示例原图用于方舟商业页面，未替换上一轮成品或原工作台。

固定源码 SHA 与线上 demo 的部署 SHA 未逐一建立一致性；不能将“原版可看”说成“当前仓库全部代码已验证”。截图与页面只证明已观察到的布局/交互，不证明生产性能与所有浏览器兼容性。


## 2026-10-05：扩展到十组，按满屏内容密度排序

保留 W1–W4 编号；新增 W5–W10。首页增加大图编号切换与动态预览入口。

|编号|GitHub|原版/运行|观察与边界|
|---|---|---|---|
|W5|https://github.com/htjun/horizontal-masonry-demo|https://horizontal-masonry-demo.vercel.app/|原版打开，3 行截图，实际切换 5 行；已读取 components/horizontal-masonry.tsx。未确认明确复用许可。|
|W6|https://github.com/codrops/codrops-sketches/tree/main/024-infinite-loop-scrolling|https://tympanus.net/Sketches/024-infinite-loop-scrolling/|已查看真实满屏大图；读取 index.js 确认 Lenis infinite 与复制六张图。README 标注 MIT；不是后台无限数据。|
|W7|https://github.com/muratdemirci/anim8-grid|research/content-walls/anim8-grid/fullscreen.html|作者 fullscreen.html 本地运行；只替换 import 路径，模块取 npm anim8-grid@1.0.0，未安装依赖或执行安装脚本。图片保持作者 Picsum 远程地址。README 与包标注 MIT。|
|W8|https://github.com/miromannino/Justified-Gallery|https://miromannino.github.io/Justified-Gallery/#liveDemo|已查看官网相册区域并截图；README/MIT；页头与外边距属于官网，需要方舟全宽容器配合。|
|W9|https://github.com/codrops/ImageGridEffects|https://tympanus.net/Development/ImageGridEffects/|原版滚动到图库段截图；大图转场机制据作者文章和 README。不可原样再发布许可，未复制完整 demo。|
|W10|https://github.com/bizarro/infinite-webl-gallery|https://codrops.com/Tutorials/InfiniteAutoScrollingGallery/index.html|原版已查看，README 标注 MIT；全窗口运动布局仍有图间空隙。|

补充评估但未纳入十组：GridZoom 与 InfiniteLayersGrid 留白较多；supuwoerc/masonry 首页只有文档，不把它冒充可见成品。十组中 W2、W4 延续上一轮作动效/艺术对照；不是十个全都零缝的模板。

原图与演示照片用于参考展示，不意味着获得品牌上线素材授权。未执行原项目完整构建、移动端性能与后端验证；本页仍为参考研究，不代表已替换方舟成品。


## 2026-10-05 用户修正：每张都是大图
用户选中 W10，明确“不是大小错落，是都很大图”。新增 large-image-walls.html，W11 为同一仓库 Demo 2，W12 为 nemutas/draggable，W13 为 codrops/ColumnScroll。均已查看原站截图，W12 实际拖动，W13 实际滚动。W10 保留对照。没有把散落小图、空白较多的 InfiniteScrollGSAPGallery、InfiniteLayersGrid 纳入本轮。

- W11 Infinite WebGL Scrolling Gallery / Demo 2
  - 原版：https://codrops.com/Tutorials/InfiniteAutoScrollingGallery/index2.html
  - GitHub：https://github.com/bizarro/infinite-webl-gallery
  - 与 W10 共用一个 GitHub 项目；README 标注 MIT。配色与照片只是原作者演示，不限定方舟。

- W12 Draggable / nemutas
  - 原版：https://nemutas.github.io/draggable/
  - GitHub：https://github.com/nemutas/draggable
  - 原版图幅仍比 W11 小一档。仓库未看到明确 LICENSE，当前作为视觉与交互参考。

- W13 Alternate Column Scroll / Codrops
  - 原版：https://tympanus.net/Development/ColumnScroll/
  - GitHub：https://github.com/codrops/ColumnScroll
  - MIT。作者说明它是交互概念稿，展开后的缩略图没有完整导航逻辑；完整作品详情需另做。

- W10 Infinite WebGL Scrolling Gallery / Demo 1
  - 原版：https://codrops.com/Tutorials/InfiniteAutoScrollingGallery/index.html
  - GitHub：https://github.com/bizarro/infinite-webl-gallery
  - 原版截图与链接保留；这是参考研究页，尚未替换方舟正式首页。


## 最新反馈：否决艺术画廊方向
用户否决 W10 及延伸的偏艺术方向，改为 BAZAAR / VOGUE 时尚杂志。不能将 W10 记为最终方案。大图、Apple 字体、透明 Logo、右上角登录要求延续。F1–F3 待评审。

### F1 The Fashion Enthusiast · 视觉最接近
https://github.com/sreerajsree/fashion-news-template
https://thefashionenthusiast.netlify.app/
已查看首屏与栏目段。这是风格对照；仓库无明确 LICENSE，不能当作已获授权的开源底座。

### F2 London · Ghost 官方 MIT 开源
https://github.com/TryGhost/London
https://london.ghost.io/
MIT 已核实；已查看官方运行站。提供大图结构，杂志气质仍需摄影与排版共同完成。未在本机部署 Ghost。

### F3 Revolve · Themefisher MIT 开源
https://github.com/themefisher/revolve-bootstrap
research/fashion/revolve-preview/index.html
代码 MIT；演示图片不随代码许可转授。基于 ac11e27 本地运行，移除了地图与 Instagram 外部脚本；未接入真实内容服务。
