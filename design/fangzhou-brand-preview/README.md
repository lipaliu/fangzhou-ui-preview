# 方舟智创 · 正式Logo微调预览

从原交接前端原型建立本地副本，原版保留。

已调整正式logo、FANGZHOU辅助名称、冷银蓝底色、统一圆角、字号、通透控制层、按钮、菜单、任务状态与窄屏参数重排。主要新增样式 `src/brand-refinement.css`，标识替换位于 `src/app.tsx`。

运行：`npm ci`，`npm run build`，`python3 -m http.server 8781 --bind 127.0.0.1`。现有本机依赖通过符号链接复用；跨机器运行请npm ci安装锁文件依赖。

完整VI和截图在 `../fangzhou-vi-v1/`。尚未接入真实生成、报价、计费、权限及持久化。画布性能没有生产修复结论，视觉待用户评审。

BeatDesign等代码与示例素材来源见 SOURCE-NOTES.md，许可证保留在licenses目录。

### 2026-10-03 字体统一

按用户要求统一 Apple 系统字体感：中文苹方，英文与数字使用 Apple 系统字体，其他平台采用本机无衬线后备。标题 600、控件 500、正文 400；中文正常字距。UI、VI、设计变量同步。

### 透明导航适配

当前左上角取消深色块，使用 `assets/fangzhou-logo-light-transparent-v1.png` 的真实 RGBA 透明底蓝银适配版；由内置 imagegen 基于用户 JPG 生成，原官方 JPG 保留。为浅底可读性将浅银适配为中蓝灰，AN 蓝银渐变保留。本资产用于界面评审，不冒充官方透明源；最终提示词及处理说明保存在 VI 包 `assets/transparent-logo-notes.md`。

### 2026-10-04 原本地页面整合

用户确认目标为当前本地方舟预览。透明 logo、Apple 系统字体和明亮蓝白样式已合入原入口 http://127.0.0.1:8774/?revision=bright-20261004 。8781 为同步副本。新增 src/bright-refinement.css 调整底色/文字/菜单/画布/任务的颜色，保留蓝紫橙角色。两处构建通过，原代码及上一轮颜色已备份。当前13个版面截图来自原入口。
