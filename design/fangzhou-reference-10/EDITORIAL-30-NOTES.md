# 方舟 · 30 个时尚编辑首页方案

2026-10-05，本地设计预览。

## 本轮范围

30 个独立排版方案，统一方舟 Logo、中文内容、Apple 系统字体与右上角登录入口。参考 BAZAAR / VOGUE 的大图刊物阅读方式；它们不是这两个品牌的官方网站或开源代码。30 个方案由下列 8 个真实开源项目的结构启发延展，并非 30 个不同的 GitHub 模板。React 与 CSS 为本轮独立实现，未直接运行或移植 Ghost 模板。

用户已授权先合成方舟预览，无需先选择原版。此前的艺术装置、漂浮画廊方向已被用户否定，不再作为当前选定方向。

## 预览与交互

入口：editorial-30.html?view=01。底部“30 版总览”显示每个方案的实际浏览器截图，支持分组、收藏和切换；点作品显示完整图片与详情，支持上一幅/下一幅；搜索、分类与目录切换可交互。页面底部保留原版与 GitHub 入口。

登录仅为界面预览，没有接入账号、短信、支付、上传或生成服务。创作空间链接到项目既有演示工作台。作品收藏仅在本次页面会话；方案收藏保存在本机浏览器。没有公网部署。

## 视觉约定

字体：-apple-system、BlinkMacSystemFont、SF Pro Display、PingFang SC、Helvetica Neue、sans-serif。图片以大幅等权展示和刊物对页为主，颜色跟随摄影；局部米白、浅绿与冷白不构成固定品牌色。导航保留现有方舟透明图标与英文标识，白底保留蓝色渐变，照片叠层使用白色版本。此处为首页方向探索，不宣称完整 VI 定稿。

## 方案与参考映射

| 编号 | 方舟方案 | GitHub 结构参考 |
|---|---|---|
| 01 | 全幅封面 | https://github.com/TryGhost/Edition |
| 02 | 双封面 | https://github.com/TryGhost/London |
| 03 | 三联大片 | https://github.com/themefisher/revolve-bootstrap |
| 04 | 横刊封面 | https://github.com/TryGhost/Casper |
| 05 | 框内封面 | https://github.com/TryGhost/Edition |
| 06 | 主编对页 | https://github.com/TryGhost/Source |
| 07 | 半页叙事 | https://github.com/TryGhost/Casper |
| 08 | 刊头与大片 | https://github.com/TryGhost/Source |
| 09 | 双页画册 | https://github.com/TryGhost/London |
| 10 | 下一期预告 | https://github.com/TryGhost/Alto |
| 11 | 双列图集 | https://github.com/igordanchenko/react-photo-album |
| 12 | 三列 Lookbook | https://github.com/igordanchenko/react-photo-album |
| 13 | 横幅专题 | https://github.com/TryGhost/Casper |
| 14 | 横向翻阅 | https://github.com/TryGhost/Alto |
| 15 | 四幅封面 | https://github.com/TryGhost/Ruby |
| 16 | 侧刊目录 | https://github.com/TryGhost/Source |
| 17 | 一主两副 | https://github.com/TryGhost/Ruby |
| 18 | 影像之间 | https://github.com/TryGhost/London |
| 19 | 人物特刊 | https://github.com/TryGhost/Edition |
| 20 | 专题腰封 | https://github.com/themefisher/revolve-bootstrap |
| 21 | 作品书架 | https://github.com/themefisher/revolve-bootstrap |
| 22 | 固定目录 | https://github.com/igordanchenko/react-photo-album |
| 23 | 封面导览 | https://github.com/TryGhost/Alto |
| 24 | 上下双刊 | https://github.com/TryGhost/London |
| 25 | 整版目录 | https://github.com/TryGhost/Source |
| 26 | 封面叠题 | https://github.com/TryGhost/Casper |
| 27 | 双面专题 | https://github.com/TryGhost/Ruby |
| 28 | 三栏编辑 | https://github.com/TryGhost/Source |
| 29 | 作品年鉴 | https://github.com/igordanchenko/react-photo-album |
| 30 | 方舟月刊 | https://github.com/themefisher/revolve-bootstrap |

## 来源与许可

上述项目代码许可均为 MIT；代码许可不覆盖品牌、照片与第三方素材。仓库 README / LICENSE 与 HEAD 调研记录存放 research/editorial-30/；Edition 本轮 HEAD 查询失败，沿用已核验的官方说明，不声称固定了其当前提交。

样例摄影：Unsplash，已用图为 photo-1、photo-2、photo-5、photo-6；URL 在 research/editorial-30/photos.json。photo-3 获取失败，未引用。其他新增照片未使用。desert.jpg、building.jpg 为项目原有示例图片。方舟 Logo 为用户提供并在现有项目中使用的透明素材。本页摄影仅用于本地排版参考，不代表方舟原创、合作客户、代言或已上线案例；正式上线需要替换为已授权的业务作品。

## 运行

使用 build-editorial-30.mjs 编译 src/editorial-30.tsx 与样式；沿用项目 8782 端口静态预览。截图在 screens/editorial-30/，30 个首页使用一致的桌面视口。

## 本轮验证结果

30 个方案在 1280px 桌面与 390px 窄屏逐版检查 DOM：首屏图片均加载，文档无水平溢出。浏览器截图保存 01.png—30.png，并以总览人工检查排版。手机端另目视检查双封面整页。

实际点击验证：总览切换第09版、作品详情与下一作品、详情进入登录预览、搜索“时尚”两项结果与无结果提示、方案收藏刷新保持、23版目录切换到第三项、11版人物分类、14版向右翻阅。登录按钮如预期禁用，未连接真实服务。36项页面/脚本/样式/说明/截图资源 HTTP 200。

## 用户最新选择

用户反馈：“6，8，26，15 比较适配”。按此顺序记录为入围方案；这不等同确认最终方案或组合。四版对照：editorial-shortlist.html。06、08、26适合进一步比较首页叙事；15适合直接以作品图集进入。上述用途为设计判断，用户仅确认相对适配。

用户追加：四个入围方向全部使用黄色衣服照片。06与26主视觉、15四幅图均替换为 photo-6.jpg，08沿用同图；06文案对应色彩主题。保留各自布局。

## 当前确定方向

用户反馈：“那还是08更好”。确定08「刊头与大片」为当前设计方向，保留黄色服装主视觉、中央方舟Logo、右上角登录与苹果系统字体。此前四版为候选，不再将06当作建议主结构。当前选择不等同公网发布或后端接入授权。

2026-10-09：用户确认继续采用08并要求换上Slogan。首页主标题更新为“Reimagining content with AI.”，对应“用AI，想象内容的下一种可能”。沿用黄色服装照片与苹果字体。

本轮预览环境恢复：8782静态服务重启。既有node_modules软链目标缺失，esbuild构建未完成；本次文案与标题字号已同步修改源文件及现有编译产物，并通过浏览器验证。后续结构性开发需恢复构建依赖。

2026-10-09 用户纠正：08首页主标题采用中文“用 AI，想象内容的下一种可能”，替换英文版；末尾引用符号不作为文案。

## 2026-10-19 内部界面参考

用户分享 PT老农图文《为什么苹果的卡片很高级？来看这套公式》，并表示“我觉得内部也是这种模式”。原始短链：https://v.douyin.com/QuFPHHauobI/ ，解析到 https://www.douyin.com/note/7697208800113069321 。网络读取无法获得正文，浏览器页面/截图读取反复超时，尚未看到图文，不能把具体排版公式归因给该帖。

确定反馈：内部工作台采用用户所指的苹果卡片呈现方向。外部首页仍为08和中文Slogan。待对原帖画面确认前，不凭标题批量改写现有内部功能。建议适配：内容大图卡用于项目/作品/功能入口；输入、模型和费用集中于创作区；点选卡片后展开详情或操作，保持返回位置。以上是方舟适配建议，不是原帖摘要。
