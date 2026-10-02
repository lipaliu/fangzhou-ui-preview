# 方舟智创 · UI 交互预览

基于 Lipa UI 的方舟创作工具改版原型。当前版将个人生成入口收敛为一个输入框，保留描述、模型、参考素材、输出规格与费用位置；修正了原生下拉菜单与界面视觉不一致的问题。

这是独立的前端评审原型，尚未连接方舟生产接口，不调用生成服务或扣费。

## 本地运行

需要 Node.js 和 npm；静态预览命令使用 Python 3。

```sh
npm ci
npm run build
python3 -m http.server 8774 --bind 127.0.0.1
```

浏览器打开 http://127.0.0.1:8774/ 。仓库同时保留已构建的 `app.js` 和 `app.css`，可以直接静态预览。

## 当前交互

- 快速生成：描述、图片/视频、模型、输出摘要、参考上传/选择与费用集中；图片/视频分别保留当前页面会话内的模型和规格。
- 选择控件：生成类型、模型、参考用途和画布参数使用统一的 Radix Select；输出参数通过 Radix Popover 中的选项按钮修改。
- 素材库：示例作品浏览、选择、预览、引用到生成区、加入画布。
- 镜头画布：React Flow 节点拖动、缩放、连线与上下文工具。
- 任务列表：本地演示任务记录模型与输出规格，支持个人/管理员演示视角。演示切换不代表真实权限。

## VI

蓝色 `#0071E3` 用于主操作，紫色 `#5E5CE6` 用于模型和引用，橙色 `#FF9500` 用于费用提示。银白内容区与有限的半透明浮层；菜单展开态与触发控件统一设计。

## 最新展开态

![生成类型菜单](menu-type-desktop.png)

更多截图：[模型](menu-model-desktop.png) · [输出规格](menu-output-desktop.png) · [手机模型](menu-model-mobile.png) · [手机输出规格](menu-output-mobile.png)

## 实现与来源

- [源码与素材来源](SOURCE-NOTES.md)：BeatDesign 实际移植组件、Onlook 布局参考、Media Studio 仅结构参考；BeatDesign 的 Apache-2.0 许可证位于 `licenses/`。
- [即梦对照与方舟字段核验](jimeng-composer-review.md)：观察与方案推导、模型命名来源及服务边界。
- 菜单基础：[Radix Select](https://www.radix-ui.com/primitives/docs/components/select) / [Radix Popover](https://www.radix-ui.com/primitives/docs/components/popover)。
- 原始选向记录：[SELECTION.md](SELECTION.md)。选择参考方向不等于用户认可最终视觉。

## 验证与限制

构建通过。已在浏览器检查桌面 1440px 与手机 390px 的相关菜单展开状态；检查方向键选择、Enter 确认、Escape 关闭并回焦；检查输出摘要更新及模型/参数切换保留。

本地任务仅保留在本次页面会话，刷新清空；上传文件只建立浏览器对象 URL，不发送服务器。报价显示“待获取报价”。模型名称是从方舟原站菜单观察到的子集，代码 ID 为原型内部键，不能直接作为生产 API 标识；正式接入需按服务端能力表约束规格。

尚未实现真实生成、计费、管理员鉴权或剪辑服务；未完成大规模画布性能验证。示例素材不代表方舟生成结果，正式上线前需核验素材权利并替换为产品自有素材。

旧版代码与旧截图留在本地 `revisions/` 和输出目录，不纳入本次同步。
