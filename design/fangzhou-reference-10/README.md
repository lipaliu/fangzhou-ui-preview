# 方舟 UI 设计成果与参考归档

更新：2026-10-19。当前外部首页已选 **08「刊头与大片」**，主视觉为黄色服装照片，主标题为 **用 AI，想象内容的下一种可能**。以下历史记录保留探索过程，不代表当前仍有30个待选方向。

## 当前入口

- `editorial-30.html?view=08`：已选首页，作品详情与登录界面演示。
- `internal-card-styles.html`：新增内部卡片风格 A / B / C，待用户选择。
- `editorial-shortlist.html`：06 / 08 / 26 / 15 对照，08已选定。
- `editorial-30-overview.html`：30版首页历史探索总览。
- `index.html`、`directions.html`、`macos-research.html`：此前内部与配色原型。
- `content-walls.html`、`large-image-walls.html`、`fashion-editorial.html`：内容墙和时尚编辑参考。

## 独立运行与构建

```sh
npm ci
npm run build
python3 -m http.server 8782 --bind 127.0.0.1
```

静态预览已包含编译产物，不修改代码时只需启动静态服务器。源码为React与CSS，锁文件及构建脚本已补齐，不再依赖其他本机目录。第三方库可能有自身构建警告，当前4项构建脚本均已执行。内部风格页为独立HTML/CSS/JS。

## 交付边界

登录、生成、报价、支付与权限均为原型或待接入；风格选择不等于后端完成。原站截图与研究代码保留在私有研究归档中，不应整体发布为生产站。第三方代码、素材、字体、商标按各自来源授权，未重新声明为本项目所有。源码许可与示例摄影许可独立。

## 历史说明

# Fangzhou · 10 个设计参考

本地总览：http://127.0.0.1:8782/

交互页面编号 01–10，例如：http://127.0.0.1:8782/?id=03

每项有真实原站截图、GitHub 仓库、固定提交、已读代码路径、许可、中文理解、布局与动效取舍。方舟适配是独立实现，与原版分开展示。

## 本地运行

在这个目录执行：

```sh
python3 -m http.server 8782 --bind 127.0.0.1
```

已生成 app.js 与 app.css，可直接作为静态页面运行。修改 TSX / CSS 后，以已授权的 esbuild 依赖执行 `node build.mjs`。node_modules 沿用本机既有方舟原型，不能把软链接当作外部交付依赖。

适配保持 Apple 系统字体与 PingFang 回退、透明 Logo 浅色稿、蓝银主视觉。照片为本地演示素材。模型与报价为演示配置，提交仅显示本地创作摘要。

07 是画布布局探索，无真实画布拖拽引擎；所有方案均无生成服务、扣费或生产权限。10 个方向等待用户选择，当前 8774 主版没有被覆盖。

详见 SOURCE-NOTES.md 与 references.json。上游代码仅作研究；打包或正式发布前不要把 research 中的上游组件源码和 originals 原版截图一起发布。


## 2026-10-04 选定参考适配

用户选定展示入口板 01（Comfy）、06（GridToSlider）、07（GridViewSwitch）。三版方舟可点击预览已完成；统一入口：http://127.0.0.1:8782/?selected=all 。实现、来源边界、许可与验证记录见 [SELECTED-PREVIEW-NOTES.md](SELECTED-PREVIEW-NOTES.md)。此前原站参考板仍保留，可从对比页直接打开。


## 最新反馈：放开配色，保留 macOS 感

2026-10-04：用户否决把蓝银色当作固定配色限制。新一轮 GitHub 参考与可操作配色试验：http://127.0.0.1:8782/macos-research.html 。来源和验证边界见 [MACOS-COLOR-RESEARCH.md](MACOS-COLOR-RESEARCH.md)。既有 01 / 06 / 07 预览保留为上一轮，未获审美通过。


## 2026-10-04 成品预览反馈
用户明确不接受 M3 / Paper Shaders 的视觉感觉，已从当前推荐和研究页试验区移除。新增 directions.html 三版可操作预览；配色仍开放，非最终 VI 定稿。
