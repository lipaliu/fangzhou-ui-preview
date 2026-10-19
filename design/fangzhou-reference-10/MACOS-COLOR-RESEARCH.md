> 最新反馈：M3 / Paper Shaders 方向已被用户排除。下文保留历史研究证据，不能作为当前采用结论。当前成品见 [三版预览](directions.html?view=a) 和 [交付记录](DIRECTIONS-NOTES.md)。

# 方舟：macOS 质感与开放配色研究

日期：2026-10-04。用户指出前稿陷入蓝银色限制，明确允许大胆配色，继续保留苹果/macOS 感，并要求从 GitHub 搜索参考。此反馈取代先前把蓝银色当成固定 VI 的约束；上一轮成稿不记为审美通过。

预览：http://127.0.0.1:8782/macos-research.html

## 交付范围

本轮交付四组经过实际原站查看的 GitHub 参考、一块可操作的方舟配色试验，以及外部展示 / 作品探索 / 登录后工作区的组合建议。它不是新一轮完整网站定稿。未覆盖已有 8774 工作台及 8782 的三个旧预览，未发布公网。

本地配色试验真实使用 Paper Shaders 运行库 0.0.81。三套颜色由本项目设定，不冒充作者预设，也未视为用户选择。展示中的方舟标志沿用现有透明栅格资产，以 CSS 反白显示，未改变轮廓；不是新制作的官方矢量标志。页面字体使用 Apple 系统字体栈和 PingFang SC。

## 参考与可迁移关系

| 编号 | 原站 | GitHub 与固定提交 | 主要用途 | 许可 |
| --- | --- | --- | --- | --- |
| M1 | https://macos-web.app/ | https://github.com/PuruVJ/macos-web/tree/14204808226d67fce14924d0b2ea889c807f12a9 | 鲜明背景、清楚内容窗、分组的操作层 | MIT |
| M2 | https://liquid-glass.maxrovensky.com/ | https://github.com/rdev/liquid-glass-react/tree/ac48eab18d1f7f444ae30002d240cae29c863a21 | 登录、分类、就近工具的透明材质 | MIT |
| M3 | https://shaders.paper.design/mesh-gradient | https://github.com/paper-design/shaders/tree/43cd68db79fa0b1759f72ffc941b3238e2a3954c | 首屏动态色彩与品牌背景 | Apache-2.0 |
| M4 | https://reactbits.dev/components/dome-gallery | https://github.com/DavidHDev/react-bits/tree/ca44b3f9ee180676a06d7de8ec6bea84cddff85b | 曲面图集、单张展开与空间关系 | MIT + Commons Clause |

M1 是 Web 桌面模拟项目，不是 AI 产品官网，不据此给方舟添加假系统窗口按钮。M2 / M3 / M4 是组件或视觉运行库，不冒充整站模板。M2 作者明确说明 Safari、Firefox 的边缘位移支持有限；当前只在 Codex 的 Chromium 浏览器查看，不声称完成跨浏览器验证。M4 许可含再销售、再分发组件的限制，原许可全文已保存。

在 research/macos-color/ 各项目目录中保存 README、LICENSE、package.json、metadata.json 和相关源码。读取了 M1 的 Dock.svelte、M2 的 src/index.tsx、M3 的 mesh-gradient.ts，以及 M4 的 DomeGallery.jsx / CSS。搜索结果、源码声明与浏览器实际观察分开记录；原站部署版本未逐项确认与当前仓库提交完全一致。

## 实际观察

- M1：打开原站，并通过 Dock 打开 Wallpapers 窗口。橙红背景与实底内容层可同时存在；Finder 点击未出现应用窗口，不将所有系统应用宣称为可用。
- M2：查看信息卡与 Log Out Button 两种原站演示状态，截图均保留。未执行真实登出或账号行为。
- M3：查看默认与 Beach 预设，页面参数和代码随选择改变。配色试验另用橙红、玫红、森林绿，不把这些定为产品 VI。
- M4：关闭 Grayscale 后显示彩色；选择前景作品后出现放大图，后面的图集模糊。原始 alt 文案与实际摄影内容不完全对应，研究描述按实际画面，不按 alt 编造艺术类型。

## 本地实现与验证

macos-research.html / CSS 是本项目的参考展示页；src/macos-research.js 管理原图状态切换、放大、配色和动态暂停。

Paper 运行库来自官方 npm 注册库。vendor/paper-shaders/SOURCE.json 记录版本、下载地址和 SHA-256；原包 LICENSE / NOTICE 保留。通过本地 esbuild 单独构建，未在共享 node_modules 中安装依赖，未运行第三方仓库的安装脚本。

已验证：

- 构建通过；本地浏览器日志未出现 error / warn。
- 实际 WebGL canvas 已挂载，三套配色可切换；手动暂停按钮更新状态。
- prefers-reduced-motion: reduce 时显示「已减少动态」并停止背景动画；通过运行库自身的 visibility / intersection 处理离屏暂停。
- 图集状态切至「单张展开」，放大后展示对应真实截图；Escape 关闭，焦点返回触发按钮。
- 390 × 844 手机视口无横向溢出，已加载图片无缺失；另查看 1440 × 1000 桌面状态。

不据静态截图或没有报错宣称帧率已优化；WebGL 失败时的静态回退已实现，但未模拟所有设备故障。图片资源来自对原站的浏览器截图，仅用于此次本地研究，不是可直接商用的方舟作品库。原站入口醒目保留，中文说明不替代原版。

## 后续组合建议（待用户评审）

对外展示采用 M3 或完整作品作为大背景，中央品牌、右上登录；工具层借 M2。探索作品保留用户认可的图集方向，可采用 M4 的空间浏览，同时提供普通列表/网格供精确筛选。进入创作后借 M1 的对象与工具分层，沿用方舟的真实业务控制。配色从内容和方向决定，不再默认全站冷蓝、低饱和或灰白。

运行：node build-macos-research.mjs。沿用当前目录 8782 本地服务器。
