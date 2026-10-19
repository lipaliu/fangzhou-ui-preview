# 方舟智创 · 正式Logo微调与VI评审包

日期：2026-10-03。整套视觉待用户评审。

- `index.html`：13个界面/状态预览，点击放大；VI的12章规则与互动材质样张。
- `overview.html`：6个主要版面总览。
- `board.html`：VI视觉总板。
- `方舟智创-VI规范-v1.md`：完整文字规范。
- `tokens.css` / `tokens.json`：设计与工程变量。
- `contrast-check.json`：14组不透明色对计算结果。
- `assets/fangzhou-logo-original.jpg`：用户提供logo，未修改原图。
- `screenshots/`：正式logo微调后的新版实际截图。
- `before-logo/`：本轮先截取的原交接版本，保留对照。

本地静态服务：在本目录运行 `python3 -m http.server 8780 --bind 127.0.0.1`。
浏览器打开 `http://127.0.0.1:8780/`。网页没有远端依赖，也可直接打开index.html。

微调后的可操作原型在 `../fangzhou-brand-preview/`，在该目录运行 `npm ci && npm run build`，再静态服务端口8781。

本轮只修改本地副本。生成、报价、计费、鉴权、持久化仍未接入，画布生产性能待复现。官方SVG和透明源文件未提供；裁切示例保留原几何，不作为源矢量交付。

### 2026-10-03 字体统一

按用户要求统一 Apple 系统字体感：中文苹方，英文与数字使用 Apple 系统字体，其他平台采用本机无衬线后备。标题 600、控件 500、正文 400；中文正常字距。UI、VI、设计变量同步。

### 透明导航适配

当前左上角取消深色块，使用 `assets/fangzhou-logo-light-transparent-v1.png` 的真实 RGBA 透明底蓝银适配版；由内置 imagegen 基于用户 JPG 生成，原官方 JPG 保留。为浅底可读性将浅银适配为中蓝灰，AN 蓝银渐变保留。本资产用于界面评审，不冒充官方透明源；最终提示词及处理说明保存在 VI 包 `assets/transparent-logo-notes.md`。

### 2026-10-04 原本地页面整合

用户确认目标为当前本地方舟预览。透明 logo、Apple 系统字体和明亮蓝白样式已合入原入口 http://127.0.0.1:8774/?revision=bright-20261004 。8781 为同步副本。新增 src/bright-refinement.css 调整底色/文字/菜单/画布/任务的颜色，保留蓝紫橙角色。两处构建通过，原代码及上一轮颜色已备份。当前13个版面截图来自原入口。
