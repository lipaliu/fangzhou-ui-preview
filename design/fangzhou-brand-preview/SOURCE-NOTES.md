# 代码与示例素材来源

## 实际代码来源

### BeatDesign / Apache-2.0
固定版本 https://github.com/BeatAPI/BeatDesign/tree/d2ef270174426da119574e9aa096e86edb777b5d

真实移植两个组件：
- 原 `src/components/beatcanvas/react-flow/beatcanvas-reference-edge.tsx` → `src/vendor/reference-edge.tsx`：保留贝塞尔连线计算、命中宽度与关系态，替换类型导入和浅色主题线色。
- 原 `src/components/beatcanvas/beatcanvas-context-toolbar.tsx` → `src/vendor/context-toolbar.tsx`：保留动作接口、条件显示和禁用处理，替换依赖与 CSS，以方舟 VI 重排。

许可证保留于 `licenses/BeatDesign-Apache-2.0.txt`。原仓库已在上一轮本地运行。此次不是整个 BeatDesign 的移植，生成、数据库与编辑器业务未搬入。

画布真实使用 React Flow 12.11.2 的拖动、连接、缩放、节点选择与可见节点渲染。React 19.2.1、lucide-react 0.511.0、esbuild 0.28.1 使用本机已经安装的依赖。正式集成需沿用方舟工程依赖和锁文件，不依赖本机符号链接。

### Onlook / 布局参考
固定版本 https://github.com/onlook-dev/onlook/tree/423e2e924366419e418ee049093872d535eea41a
已阅读 `apps/web/client/src/app/project/[id]/_components/main.tsx` 等文件。借鉴当前对象 + 浮动 EditorBar + 按需属性层的组织，未声称移植其 Next/Supabase 应用。

### Media Studio / 仅结构参考
https://github.com/gateway/media-studio/tree/8229c0071f573bc4a1796dcd3af7e4c7a7683dd4
只借鉴作品流与底部生成输入结构。仓库含非商业许可及附加条款；本次未复制其组件源码、品牌与图片。

## 示例素材

- `coast.jpg`、`building.jpg`、`desert.jpg` 沿用已有本地预览的 Unsplash 摄影：
  - https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1
  - https://images.unsplash.com/photo-1511818966892-d7d671e672a2
  - https://images.unsplash.com/photo-1509316785289-025f5b846b35
- 三张 `create-thumb-*.webp` 沿用 BeatDesign 仓库自带演示素材。
- 全部仅作本地示例，不表示方舟生成结果。正式发布前替换为产品自有素材并核验权利；不将代码许可延伸宣称为所有素材授权。


## 2026-10-03 正式Logo微调

本轮本地副本沿用原交接组件及许可。新增标识来自用户提供原图；独立图形使用CSS裁切，未改原图。样式微调由本轮独立编写，没有新增外部受限代码。原交接版本保持不变。

### 透明导航适配

当前左上角取消深色块，使用 `assets/fangzhou-logo-light-transparent-v1.png` 的真实 RGBA 透明底蓝银适配版；由内置 imagegen 基于用户 JPG 生成，原官方 JPG 保留。为浅底可读性将浅银适配为中蓝灰，AN 蓝银渐变保留。本资产用于界面评审，不冒充官方透明源；最终提示词及处理说明保存在 VI 包 `assets/transparent-logo-notes.md`。
