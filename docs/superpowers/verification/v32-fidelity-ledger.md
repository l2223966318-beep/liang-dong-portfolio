# V3.2 Fidelity Ledger

| Section | Concept evidence | Render evidence | Mismatch | Fix |
| --- | --- | --- | --- | --- |
| Hero | `design/concepts/v32/01-hero.png` | `docs/superpowers/verification/v32-renders/hero-1700x1000.png` | Concept 在 1700×1000 首屏底部露出约 150px 的 Profile 章节入口与三张媒体预览；首轮 render 的 Hero 独占整屏，完全没有 next-section visibility，且媒体分界较 concept 右移。 | 将主媒体收至上方 82.5%，补回 17.5% 的 `01 / PROFILE / 关于我` 预览带与三张真实研究媒体，并把桌面媒体起点从 38% 校至 26%；最终首屏层级、文案和下章可见性与 concept 一致。 |
| Profile | `design/concepts/v32/02-profile.png` | `docs/superpowers/verification/v32-renders/profile-1700x1000.png` | 首轮 render 左栏比 concept 更宽、标题与正文更大更低；右侧人像明显放大并右移，使头部和肩部裁切、事实栏可见密度均不同。 | 恢复 50/50 分栏，重建标题、`THINK / MAKE / GROW`、正文、联系方式与事实栏的纵向节奏，并用 130% 水平定位保留 concept 的右侧留白和人物裁切。 |
| Selected Work | `design/concepts/v32/03-selected-work.png` | `docs/superpowers/verification/v32-renders/selected-work-1700x1000.png` | Concept 的 `02 / SELECTED WORK` 与中文标题上下排列；首轮 render 把编号、英文标签和中文标题挤在同一横排，改变章节节奏，并压缩 Research 条目的媒体与说明密度。 | 将章节标题恢复为上下两层，校正首屏顶部/卡片间距和卡片高度，并提高 Research 媒体列占比；保留现有真实项目数据，不补 concept mock 中未被数据支持的额外数字。 |
| Capabilities | `design/concepts/v32/04-capabilities.png` | `docs/superpowers/verification/v32-renders/capabilities-1700x1000.png` | Concept 的 01/02/03 卡分别以地球网络、香水瓶和视频时间线为核心媒体；首轮 render 仅显示雷达圆、红色多边形和黑色条带，媒体语义与裁切处理明显失真。 | 复用现有真实 world-cup、beauty、city 与 AIGC 生产媒体，恢复四卡媒体语义、斜切网格和 crop；同时重建 `独立站 PV / +22%` 的两级指标排版。 |
| Contact | `design/concepts/v32/05-contact.png` | `docs/superpowers/verification/v32-renders/contact-1700x1000.png` | 首轮 render 的白色主标题比 concept 更宽，戒指整体下移放大并在底部被截断；三条联系入口缺少 concept 中的邮件、电话、简历图标。 | 以 14.2vw × 0.82 横向缩放锁定 condensed 标题断行，精确对齐戒指 top/right/size，补齐黄色右上切角及三枚可访问的线性图标，并保持原链接与焦点行为。 |

Final QA used `view_image` on every concept/render pair in the same pass, plus `mobile-390x844.png`. The pass checked visible copy, composition, condensed type and line breaks, palette, media crop/treatment, the continuous red page track, next-section visibility, and responsive collapse.
