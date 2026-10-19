# 方舟：选定的 01、06、07

用户于 2026-10-04 选定展示入口参考板中的 01、06、07。这里的编号与早期「10 个创作工作区参考」编号不同。

## 预览入口

- 三版对比：http://127.0.0.1:8782/?selected=all
- 01 产品与作品展示：http://127.0.0.1:8782/?selected=01
- 06 中央品牌与环绕图集：http://127.0.0.1:8782/?selected=06
- 07 沉浸图集与单张观看：http://127.0.0.1:8782/?selected=07

三版统一使用方舟透明 Logo 的现有浅色适配资产、蓝银色、Apple 系统字体栈；左上角是作品入口，右上角是登录。展示页面不放创作输入框。作品展开后可以切换上一张、下一张，也可以带入参考到工作空间演示。

## 来源与实现边界

### 01 / Comfy

官网：https://comfy.org/
关联产品仓库：https://github.com/Comfy-Org/ComfyUI_frontend

参考「展示产品与案例 → 登录进入创作」的结构，独立实现方舟页面。关联产品仓库为 GPL-3.0；尚未核实其与 Comfy 营销官网源码的对应关系。本版没有复制 Comfy 源码、官方图片、商标或登录服务，也不声称是 Comfy 官网运行副本。

### 06 / Codrops GridToSlider

仓库：https://github.com/codrops/GridToSlider
原版：https://tympanus.net/Development/GridToSlider/
参考提交：1d8b2abb52ba9207459d1b2ee6ac372f429ef8de
相关代码：research/entrance/codrops--GridToSlider/js/demo1/index.js

沿用中央品牌与分散图片的布局关系、从图集进入单张观看的交互，以及 Flip.getState → 布局切换 → Flip.from 保持图片位置连续的实现思路。方舟版本在 React 与原生 dialog 中重新实现，增加中文作品说明、参考传递、登录预览；不是原版脚本完整移植。MIT 许可及版权声明保留在 research/entrance/codrops--GridToSlider/LICENSE。

### 07 / Codrops GridViewSwitch

仓库：https://github.com/codrops/GridViewSwitch
原版：https://tympanus.net/Development/GridViewSwitch/
参考提交：530cc792a07daec6ce84c7988c02ee5a12aa9ebd
相关代码：research/entrance/codrops--GridViewSwitch/js/index.js

沿用多列作品图集与单张模式切换、Flip 图片位置连续的实现思路。方舟版本改为带品牌中心面板的作品墙，并共用单张查看与参考传递逻辑。原版的列反向退出、相邻画面位移没有完整移植，不声称动效与原版完全一致。MIT 许可及版权声明保留在 research/entrance/codrops--GridViewSwitch/LICENSE。

### 运行库

GSAP 3.15.0 从官方 npm 注册库取得，Flip 插件在本地打包，没有外部运行时 CDN。原始源码头部版权与许可链接保留。获取地址、版本和校验值记录在 vendor/gsap/SOURCE.json。GSAP 标准许可：https://gsap.com/standard-license/ 。构建时有官方 package.json 导出条件顺序的警告；构建完成，浏览器检查未发现 error/warn。

## 已验证

- 1440 × 1000 桌面首屏与作品展开；390 × 844 三版手机布局，没有横向溢出或缺失图片。
- 01 切换人物 / 场景 / 材质示例；作品分类为「场景」时显示 3 张，切回全部显示 6 张。
- 06 点击作品进入全屏单张；Escape 返回图集。
- 07 图集 / 单张切换、返回后焦点恢复至触发控件。
- 详情切换作品，带入所选参考到登录区，再进入工作空间演示，参考图片与索引正确。
- prefers-reduced-motion: reduce 时停止展开位移动效，仍可直接打开、关闭及传递参考。
- 登录页有明确的账号服务尚未接入说明；账号、密码和真实登录按钮禁用。

实拍浏览器截图位于 screens/selected-*.jpg；对比页使用这三版的实际首屏截图，不使用概念图。

## 限制

当前是本地前端交互预览。尚未接入身份认证、真实生成、收费或业务作品库。图集使用现有 6 张本地演示素材；07 重复铺图仅用于查看布局。已有浅色透明 Logo 是栅格适配资产，不是官方矢量原稿。没有覆盖 8774 现有工作台，没有部署公网，也没有声称修复原工作台的性能问题。

## 维护

新增实现：src/selected-previews.tsx、src/selected-previews.css；路由在 src/app.tsx。
构建：node build.mjs。预览服务器仍沿用此目录已有的 8782 本地服务。
