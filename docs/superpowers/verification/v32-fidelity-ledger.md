# V3.2 Fidelity Ledger

| Section | Concept evidence | Render evidence | Mismatch | Fix |
| --- | --- | --- | --- | --- |
| Hero | `design/concepts/v32/01-hero.png` | `docs/superpowers/verification/v32-renders/hero-1700x1000.png` | 首轮 Hero 独占整屏、媒体分界右移；第一次补预览时又错误复用了三张 Research 封面，与 concept 的黄色折射材质、透明青环和蓝色透明立方体不符。 | 将主媒体收至上方 82.5%，恢复 17.5% 的 `01 / PROFILE / 关于我` 预览带；用 ImageGen 分别生成三张无文字独立素材并压为 82–123KB WebP，经 `productionMedia.hero.teaser` 接入。最终三格的颜色、材质、顺序和裁切均与 concept 对应。 |
| Profile | `design/concepts/v32/02-profile.png` | `docs/superpowers/verification/v32-renders/profile-1700x1000.png` | 首轮左栏过宽、标题与正文更大更低，人像裁切不同；复核又发现红色追踪语言只剩普通分隔边框，缺少 concept 的内部中轴、节点和末端箭头。 | 恢复 50/50 分栏、type scale、纵向节奏和人物 crop；加入共用 `SectionTrack` 的中轴、facts 横轨、4 个真圆节点及接向右侧固定 page progress 的箭头，全部 `aria-hidden`、不可交互。 |
| Selected Work | `design/concepts/v32/03-selected-work.png` | `docs/superpowers/verification/v32-renders/selected-work-1700x1000.png` | 首轮章节标题横向挤压且 Research 密度不足；复核发现真实数据中的 `53 位 UP 主协同` 没有呈现在 01 卡，内部中轴、底部节点轨和箭头也被简化。 | 恢复上下标题、卡片节奏和 Research 图文比例；从 `projects[0].supportingMetrics[0]` 渲染 `53 位 UP 主协同`，与 `26 份热点日报` 同卡，并由单测锁定；加入中轴、底轨、节点及右向箭头。 |
| Capabilities | `design/concepts/v32/04-capabilities.png` | `docs/superpowers/verification/v32-renders/capabilities-1700x1000.png` | Concept 的 01/02/03 卡分别以地球网络、香水瓶和视频时间线为核心媒体；首轮 render 仅显示雷达圆、红色多边形和黑色条带，媒体语义与裁切处理明显失真。 | 复用现有真实 world-cup、beauty、city 与 AIGC 生产媒体，恢复四卡媒体语义、斜切网格和 crop；同时重建 `独立站 PV / +22%` 的两级指标排版。 |
| Contact | `design/concepts/v32/05-contact.png` | `docs/superpowers/verification/v32-renders/contact-1700x1000.png` | 首轮标题过宽、戒指位置错误且入口图标缺失；复核发现 availability 节点、三行联系轨与包络折线没有实现，无法延续固定 page progress 的红色导航语言。 | 锁定 condensed 标题断行与 ring crop，补齐 citron corner 和三枚线性图标；加入 availability 节点、三行轨道/箭头及接到右侧固定 progress 的包络路径。复杂桌面轨迹在窄屏隐藏，移动端保留原红色边框/箭头并将 links 提到 ring 上方，避免变形和文字遮挡。 |

Final QA 在修复后重拍全部 6 张 durable evidence，并在同一 pass 用 `view_image(detail: original)` 逐对检查 5 张 concept/render，再检查 `mobile-390x844.png`。检查覆盖 visible copy、composition、condensed type/line breaks、palette、三张 teaser 的 media crop/treatment、`53 位 UP 主协同`、Profile/Work/Contact 内部 red track 与固定 page progress 的连接、next-section visibility 和 responsive collapse。

Edge 四视口量测：`1700×1000`、`1440×900`、`1280×800`、`390×844` 均满足 `clientWidth === scrollWidth`，五章节存在、无 broken image、无 console/page error。

## Final fix wave · 2026-07-28

最终整体验收的五项 Important 已完成，并在最终源状态重拍以上 6 张 durable render：

- Hero 保持 concept 的 50/50 分界、下方 Profile 预览与右下媒体控制；新混入的 8 秒环境音默认静音，画面与布局不变。
- Selected Work 保留三张固定项目面板，同时用真实前后按钮、`02 / 03` 进度和键盘左右键控制中间主强调态。
- Profile、项目和 Research 的图片失败状态改为继承 V3.2 色板、直角几何和 condensed type 的 code-native cover；正常媒体不受影响，失败路径由单测和路由中断 E2E 覆盖。
- Contact 回到顶部补齐 concept 的圆形上箭头；联系行在 hover / focus-visible 时红色轨道延伸且箭头位移，reduced-motion 下无动画。
- 旧 token aliases 与 Capabilities 硬编码 off-palette 色已移除，浏览器 theme color 与纸白画布一致。

同一最终 QA pass 再次以 `view_image` 对照五张 concept 与 Hero、Profile、Selected Work、Capabilities、Contact render，并检查 `mobile-390x844.png`；未发现需要继续修改的结构、排版、颜色、媒体裁切或响应式偏差。Playwright 回归再次确认四视口均为零横向溢出、零 broken image、零 console error、零 page error。
