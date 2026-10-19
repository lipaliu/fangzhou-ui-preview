# 方舟 · 10 个 GitHub 参考与预览

研究日期：2026-10-04。已调用 Lipa UI 与 Lipa Web Motion。用户误发的影视截图已忽略。

## 已定约束

透明 Logo 浅色适配稿（原图 JPG 不是可直接使用的透明源文件）；顶栏仅图形 + FANGZHOU 字标；系统 Apple / PingFang 字体；蓝银色主视觉；描述、类型、模型、参考来源和用途、规格、费用和提交均保留。沿用本地既有演示素材，未引入竞品图片、视频、字体。

## 使用

- 总览：http://127.0.0.1:8782/
- 每案：http://127.0.0.1:8782/?id=01（01–10）
- 比较板：http://127.0.0.1:8782/overview.html
- 当前本地旧版保留：http://127.0.0.1:8774/?revision=bright-20261004

三个完整科技网站/产品、四个界面/组件来源、三个艺术动效源码。网站与组件在总览中明确区分。原版页面与仓库固定版本不保证是同一发布版本；尤其 Onlook 官网页面已介绍新产品，仓库含既有开源编辑器。

## 实现范围

10 个方案是独立 React + CSS 适配，参考原站内容组织和已读取的代码结构，不是安装并运行全部上游仓库。使用已有 React / Radix / Lucide / esbuild 依赖，没有新增执行上游安装脚本。研究源文件保存在 research，仅供本地核对，不属于运行时导入。若未来发布或打包，排除未使用的研究源码与第三方原版截图，重新核对采用部分的许可。

素材弹窗采用原生 dialog 的模态焦点与 Escape 关闭，进入短淡入；没有引入 Motion Primitives 的完整共享布局实现。07 是固定节点与工具条布局探索，无生产画布引擎，不代表拖拽性能修复。09 原生 CSS 阵列入场，10 原生滚动 + CSS 尺寸变化；没有引入 GSAP。

## 候选

### 01 科技品牌入口

- 作者 / 原版：[PowerAI · Sitepins](https://powerai-astro.pages.dev/)
- 仓库：https://github.com/sitepins/powerai-astro
- 固定版本：a1176bf882bf0b1af98115f3280c2a6928e69261
- 代码路径：src/layouts/components/Hero.astro
- 依赖：Astro / React / Tailwind / Motion
- 许可：MIT。代码许可不自动覆盖原版图片、字体和商标。预览使用方舟已有本地演示素材。
- 适用：官网 / 登录前入口
- 中文理解：上方导航、居中标题、下方产品截图，先解释平台再引导开始。方舟版将创作输入直接放进首屏，取消未经证实的用户量和营销指标。
- 动效：首屏内容短距离上移淡入；输入与按钮立即可操作。
- 代价：首屏留白较多，适合介绍与首次进入。

### 02 AI 创作双栏

- 作者 / 原版：[Onlook · Onlook team](https://www.onlook.com/)
- 仓库：https://github.com/onlook-dev/onlook
- 固定版本：423e2e924366419e418ee049093872d535eea41a
- 代码路径：apps/web/client/src/app/_components/hero/index.tsx, apps/web/client/src/app/_components/hero/create.tsx
- 依赖：Next.js / React / Tailwind / Motion
- 许可：Apache-2.0。代码许可不自动覆盖原版图片、字体和商标。预览使用方舟已有本地演示素材。
- 适用：创作首页 / 首次使用
- 中文理解：原站用大标题与编辑器画面解释 AI 设计工具；代码中的 Create 支持文字与图片上下文。方舟版拆成左侧任务引导、右侧一体输入，参考素材跟随描述。
- 动效：参考卡片从素材区加入输入，使用短淡入反馈；保留上下文。
- 代价：窄屏上下重排，效率不如熟练用户紧凑布局。

### 03 对话式创作台

- 作者 / 原版：[AI Chatbot · Vercel](https://chatbot.ai-sdk.dev/demo)
- 仓库：https://github.com/vercel/ai-chatbot
- 固定版本：c2f8235e1f3ea903ad8b7f61447c4f74164b5c58
- 代码路径：components/chat/multimodal-input.tsx
- 依赖：Next.js / AI SDK / Radix / Motion
- 许可：Apache-2.0。代码许可不自动覆盖原版图片、字体和商标。预览使用方舟已有本地演示素材。
- 适用：快速生成 / 连续创作
- 中文理解：原版侧边历史、底部多模态输入与建议问题构成连续对话。方舟版把示例放到起步区，模型、输出和费用留在输入底部。
- 动效：选示例填入描述；本地提交后摘要出现，形成下一步提示。
- 代价：不适合大量素材的同时比较，可搭配 06。

### 04 模块化工作台

- 作者 / 原版：[Magic UI · Magic UI team](https://magicui.design/)
- 仓库：https://github.com/magicuidesign/magicui
- 固定版本：d7207e5692d14c00dceafa8488d6d01f197fa0e4
- 代码路径：apps/www/registry/magicui/bento-grid.tsx
- 依赖：React / Tailwind / Radix
- 许可：MIT。代码许可不自动覆盖原版图片、字体和商标。预览使用方舟已有本地演示素材。
- 适用：团队工作台 / 功能导航
- 中文理解：参考 BentoGrid 的不同跨度、独立功能入口和悬停 CTA。方舟版由创作输入承担主块，素材与模型成为次块，避免所有卡片同样重要。
- 动效：指针或键盘聚焦入口，卡片轻抬升并强调 CTA；触屏 CTA 常驻。
- 代价：卡片过多会分散注意，应限制到真实高频任务。

### 05 专业项目空间

- 作者 / 原版：[shadcn/ui · shadcn](https://ui.shadcn.com/)
- 仓库：https://github.com/shadcn-ui/ui
- 固定版本：295a1f114a138f23b5dfee0e0c6812394dfeb90c
- 代码路径：apps/v4/registry/new-york-v4/ui/sidebar.tsx
- 依赖：React / Radix / Tailwind
- 许可：MIT。代码许可不自动覆盖原版图片、字体和商标。预览使用方舟已有本地演示素材。
- 适用：项目 / 任务 / 资产管理
- 中文理解：可折叠导航把项目身份与编辑内容分开。方舟版左侧导航、中央创作、右侧已选参考，让多人项目有明确的当前对象。
- 动效：折叠侧栏宽度改变；选中参考边框高亮。动画不改动工作对象位置。
- 代价：密度较高，更适合团队管理与已有项目。

### 06 素材展开工作台

- 作者 / 原版：[Motion Primitives · ibelick](https://motion-primitives.com/)
- 仓库：https://github.com/ibelick/motion-primitives
- 固定版本：120f64f6ca60348e251f929e9c81f11ccbe45eda
- 代码路径：LICENCE.md, components/core/morphing-dialog.tsx
- 依赖：React / Motion / Tailwind
- 许可：MIT。代码许可不自动覆盖原版图片、字体和商标。预览使用方舟已有本地演示素材。
- 适用：素材库 / 参考选择
- 中文理解：原站素材卡片点击后展开为详情；MorphingDialog 用共同 layoutId 表达同一对象。方舟版先浏览素材，再查看来源和用途，确认后带入创作区。
- 动效：点击素材卡展开详情；关闭回到卡片焦点，添加后输入区显示来源与用途。
- 代价：素材优先，纯文字生成多一步，可与 03 组合。

### 07 浮动工具画布

- 作者 / 原版：[React Bits · David Haz](https://reactbits.dev/)
- 仓库：https://github.com/DavidHDev/react-bits
- 固定版本：ca44b3f9ee180676a06d7de8ec6bea84cddff85b
- 代码路径：src/content/Components/Dock/Dock.jsx, src/ts-default/Components/Dock/Dock.tsx
- 依赖：React / Motion（Dock）
- 许可：MIT + Commons Clause。原版允许作为网站/产品的一部分使用，禁止出售、转售或重新分发组件本身；本页为独立 CSS 工具条。
- 适用：画布 / 多对象编辑
- 中文理解：Dock 代码根据指针距离调整工具尺寸。方舟版仅把轻放大用于底部工具，画布对象和输入保持稳定；此处是静态节点布局探索，不代表修好了生产拖拽。
- 动效：底部工具悬停 / 聚焦轻放大，点击切换选择、参考、连线工具；触屏保持等尺寸。
- 代价：移动端改为纵向，真正画布性能要另测。

### 08 作品目录揭示

- 作者 / 原版：[HoverGrid · Codrops](https://tympanus.net/Development/HoverGrid/)
- 仓库：https://github.com/codrops/HoverGrid
- 固定版本：0a59474715182c0d0bc2219c48f9cdd4f570cf9b
- 代码路径：js/index.js
- 依赖：原生 JS / GSAP
- 许可：MIT（演示源码）。Codrops 演示源码为 MIT；GSAP 是独立许可，图片与字体另计。本适配以原生 CSS / 浏览器 API 独立实现，未引入 GSAP。
- 适用：作品集 / 案例目录
- 中文理解：原版项目名称在左、图片以方向裁切方式揭示。方舟版将名称点击切换作品，保留常驻图片与明确按钮，作品浏览能直接转为参考。
- 动效：点击左侧项目，右侧图片以裁切揭示切换；触屏按钮与键盘均可进入。
- 代价：艺术表现较强，适合作品页，不建议直接作为日常生成主界面。

### 09 灵感网格入口

- 作者 / 原版：[Intro Grid · Codrops](https://tympanus.net/Development/IntroGridMotionTransition/)
- 仓库：https://github.com/codrops/IntroGridMotionTransition
- 固定版本：07ec3988e873e1710fb65b9d921c3aa6c05b16eb
- 代码路径：js/index.js
- 依赖：原生 JS / GSAP Flip
- 许可：MIT（演示源码）。Codrops 演示源码为 MIT；GSAP 是独立许可，图片与字体另计。本适配以原生 CSS / 浏览器 API 独立实现，未引入 GSAP。
- 适用：灵感库 / 发现入口
- 中文理解：原版用倾斜图片阵列和 Explore 进入全屏画面，依赖 GSAP Flip。方舟版改成平直灵感网格，点击进入创作，不把倾斜与游动套进精确操作区。
- 动效：图片阵列依次淡入；点击「开始创作」平滑滚动到输入区。减少动效时立即到达。
- 代价：入场更醒目，日常操作不宜反复播放。

### 10 图像叙事首页

- 作者 / 原版：[Image Expansion · Codrops](https://tympanus.net/Development/ImageExpansionTypography/)
- 仓库：https://github.com/codrops/ImageExpansionTypography
- 固定版本：0d614791f94198bcab655762b26a3cb85da851f4
- 代码路径：js/index.js
- 依赖：原生 JS / GSAP ScrollTrigger / Flip
- 许可：MIT（演示源码）。Codrops 演示源码为 MIT；GSAP 是独立许可，图片与字体另计。本适配以原生 CSS / 浏览器 API 独立实现，未引入 GSAP。
- 适用：品牌首页 / 案例叙事
- 中文理解：原版图像嵌入文字并随滚动展开，依赖 ScrollTrigger 与 Flip。方舟版以真实中文短句和作品图讲清创作流程，创作入口常驻且无需看完整动画。
- 动效：向下滚动时中央图像从小窗展开；减少动效时保持完整静态图，标题和按钮仍可读。
- 代价：页面较长，适合介绍品牌；工具页应保持简洁。

## 验证与待评审

10 个桌面方案已逐个查看；1440×1000 与 390×844 检查，横向溢出为 0，素材加载正常。已实际展开素材详情、模型、输出设置；加入第三张参考、改变模型、9:16、2 张输出及费用反馈、提交本地摘要、关闭恢复焦点。检查 10 的滚动图像宽度由约 570 px 到 1120 px，以及 reduced-motion 静态完整图。移动输出设置已实际展开。原版 Motion Primitives 卡片展开、Codrops 项目切换、图像滚动均已查看，不声称逐个组件或全部动效均做了性能测试。

用户选型：待评审。工程建议：03 创作输入 + 06 素材展开；08–10 用于作品/品牌发现页。未改主版本，未上线、推送或接入生成服务。
