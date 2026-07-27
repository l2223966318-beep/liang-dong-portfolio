# Task 1 实施报告：V3.2 独立媒体与媒体清单

## 状态

DONE

Task 1 范围已完成：10 张独立 WebP 视觉素材、1 支 8 秒 Hero H.264 循环视频、稳定的 `productionMedia` 清单、媒体存在性测试，以及为 Node 内置模块测试补齐的最小 TypeScript 类型依赖。

## 实现内容

### 静态媒体

使用内置 ImageGen 工具逐张生成，概念图只作为材质、配色、光线和构图语言参考；没有直接把整张概念截图作为页面素材。所有生成结果先保留在 Codex 默认生成目录，再通过本地 `ffmpeg-static` 转码/裁切为项目内 WebP。

最终提示词集合的核心约束如下：

1. `hero-poster.webp`：17:10 光学白场；右置透明折叠亚克力；钴蓝、信号红、青绿、柠檬黄折射；无文字/UI。
2. `profile-bust.webp`：光学白场与钴蓝几何底板；无五官、无皮肤、无身份的人工低多边形透明胸像。
3. `project-world-cup.webp`：深钴蓝全球信号球、轨道与无脸几何创作者节点；无赛事/平台标识。
4. `project-beauty.webp`：无标签透明化妆品容器、银色盖、红/银棱镜场景；无品牌。
5. `project-city.webp`：城市天际线与抽象编辑时间线；无台标、软件品牌或可读 UI 文案。
6. `research-beauty.webp`：透明玻璃球与同心玻璃环，独立的 glass 母题。
7. `research-world-cup.webp`：透明/银色面板信号球与轨道节点，独立的 signal 母题。
8. `research-aigc.webp`：单体互锁透明立方体雕塑，独立的 cube 母题。
9. `capability-aigc.webp`：透明模块立方体从散件到聚合系统的几何 progression。
10. `contact-ring.webp`：大型透明棱镜环，钴蓝/信号红/柠檬黄反射同时可见。

### Hero 循环

使用 HyperFrames `motion-graphics` 工作流完成：

- 临时工程：`C:\Users\dell\.codex\generated_hyperframes\v32-hero-loop-motion`
- 画布：1700 × 1000
- 帧率：30fps
- 时长：8.000000s / 240 帧
- 编码：H.264 MP4
- 音轨：无（简报中的环境纹理为可选；保持无语音、默认静音的最稳实现）
- 动作：2.5° 往返材质旋转、慢速双向折射光扫、钴蓝平面轻微漂移
- 循环：所有动画通道在 8 秒返回初始数值；实际末帧 7.9667s 对首帧 SSIM 0.999878
- 最终体积：7,491,848 bytes，小于 8,388,608 bytes

光扫复用了 HyperFrames Registry 的 `shimmer-sweep` 组件语言；主动画使用单个暂停 GSAP 时间轴，注册为 `window.__timelines["v32-hero-loop"]`，无计时器、无限循环或运行时随机数。

### 媒体清单

新增 `src/data/media.ts`，导出简报指定的只读 `productionMedia` 对象。Hero 的 `.video` 和 `.poster` 为两个不同路径，所有路径均稳定指向 `/assets/v32/`。

### TypeScript Node 类型

简报指定测试必须直接引用 `node:fs` 与 `node:path`。项目此前没有 `@types/node`，导致 `pnpm build` 报 TS2307。为保留原测试代码并恢复生产构建，新增最小 devDependency：

```json
"@types/node": "^22.20.1"
```

并同步更新 `pnpm-lock.yaml`。没有改 tsconfig，也没有降低类型检查。

## 素材逐项检查结论

| 文件 | 最终尺寸 | 检查结论 |
|---|---:|---|
| `hero-poster.webp` | 1700×1000 | 透明折叠材质清楚，右侧视觉重心与左侧留白符合概念；四色折射齐全；无文字/UI。 |
| `profile-bust.webp` | 1600×1000 | 无五官、无皮肤、无肖像身份；人工几何结构明确；无真实人物。 |
| `project-world-cup.webp` | 1200×900 | 全球信号球与 creator nodes 清楚；节点均为无脸几何图形；无 logo/真实人脸。 |
| `project-beauty.webp` | 1200×900 | 透明容器与红/银棱镜材质清楚；瓶身无标签、无品牌。 |
| `project-city.webp` | 1200×900 | 天际线与编辑时间线同时可读；无 broadcaster logo 或软件品牌。 |
| `research-beauty.webp` | 800×800 | glass 母题明确；无 UI 文字。 |
| `research-world-cup.webp` | 800×800 | signal 母题明确；无赛事标识、旗帜或 UI 文字。 |
| `research-aigc.webp` | 800×800 | 单体 cube 母题明确；与另两张研究封面充分区分；无 UI 文字。 |
| `capability-aigc.webp` | 1600×900 | 模块透明 cubes 从散到聚的工作流含义清楚；无文字/箭头/UI。 |
| `contact-ring.webp` | 1600×1000 | 环形开口、透明棱面、钴蓝/红/黄反射清楚；无页面截图内容。 |
| `hero-loop.mp4` | 1700×1000 | 8 秒 H.264、30fps、240 帧、无音轨；无黑帧/文字/UI；动作克制且循环接缝通过。 |

静态素材最终联系表已人工检查：

`C:\Users\dell\.codex\task-1-v32-assets-contact-sheet.jpg`

Hero proof 联系表与 HyperFrames 快照保留在：

`C:\Users\dell\.codex\generated_hyperframes\v32-hero-loop-motion\snapshots\contact-sheet.jpg`

## TDD RED / GREEN 证据

### RED

先新增 `src/data/media.test.ts`，未创建 `src/data/media.ts`，运行：

```powershell
& 'C:\Program Files\nodejs\corepack.cmd' pnpm test -- src/data/media.test.ts
```

预期失败已观察到：

```text
FAIL  src/data/media.test.ts
Error: Failed to resolve import "./media" from "src/data/media.test.ts". Does the file exist?
File: src/data/media.test.ts:4:32
```

失败原因正是实现缺失，不是断言写错。

### GREEN

素材、清单与类型依赖完成后，再运行同一指定命令：

```text
Test Files  4 passed (4)
Tests       8 passed (8)
src/data/media.test.ts (1 test) PASS
exit code 0
```

项目脚本会把传入参数保留为 `-- src/data/media.test.ts`，Vitest 因此执行了完整测试集；目标 media test 包含在内并通过。

## 验证命令与输出

### HyperFrames lint

```powershell
npx hyperframes@0.7.76 lint . --json
```

```text
ok: true
errorCount: 0
warningCount: 0
filesScanned: 1
```

### HyperFrames check + snapshots

```powershell
npx hyperframes@0.7.76 check . --snapshots --at 0,2,4,6,8 --json
```

```text
ok: true
runtime: 0 errors / 0 warnings
layout: 0 errors / 0 warnings
motion: 0 errors / 0 warnings
contrast: 0 errors / 0 warnings
duration: 8
motion samples: 161
```

随后按真实 30fps 末帧重拍：

```powershell
npx hyperframes@0.7.76 snapshot . --at 0,2,4,6,7.9667 --json
```

首帧与实际末帧 SSIM：

```text
SSIM R:0.999887 G:0.999888 B:0.999859 All:0.999878
```

### Render

```powershell
npx hyperframes@0.7.76 render . --skill=motion-graphics -q high -o .\renders\hero-loop.mp4
```

```text
Render complete
7.1 MB · 8.0s video
240/240 frames captured
```

### 视频探测

```text
codec_name: h264
width: 1700
height: 1000
r_frame_rate: 30/1
nb_frames: 240
duration: 8.000000
size: 7491848
audio streams: 0
```

简报指定体积检查：

```powershell
Get-Item '.\public\assets\v32\hero-loop.mp4' | Select-Object Name,Length
```

```text
Name           Length
hero-loop.mp4  7491848
```

### Production build

```powershell
& 'C:\Program Files\nodejs\corepack.cmd' pnpm build
```

```text
tsc -b && vite build
✓ 45 modules transformed
✓ built in 1.55s
exit code 0
```

### Diff hygiene

```text
git diff --check
exit code 0
```

## 文件清单

新增：

- `public/assets/v32/hero-loop.mp4`
- `public/assets/v32/hero-poster.webp`
- `public/assets/v32/profile-bust.webp`
- `public/assets/v32/project-world-cup.webp`
- `public/assets/v32/project-beauty.webp`
- `public/assets/v32/project-city.webp`
- `public/assets/v32/research-beauty.webp`
- `public/assets/v32/research-world-cup.webp`
- `public/assets/v32/research-aigc.webp`
- `public/assets/v32/capability-aigc.webp`
- `public/assets/v32/contact-ring.webp`
- `src/data/media.ts`
- `src/data/media.test.ts`
- `.superpowers/sdd/2026-07-27-portfolio-v32-redesign-implementation/task-1-report.md`

修改：

- `package.json`：新增 `@types/node` devDependency。
- `pnpm-lock.yaml`：锁定 `@types/node@22.20.1` 与 `undici-types@6.21.0`，更新 Vite/Vitest 的可选 Node 类型 peer 快照。

## 自检

- [x] 只实现 Task 1，没有提前修改 Hero/Profile/SelectedWork 等后续页面组件。
- [x] 概念图只作为生成参考，没有整张复用。
- [x] 10 张最终静态素材全部位于 `public/assets/v32/` 且非零。
- [x] 三张 research cover 的 glass / signal / cube 母题互相可辨。
- [x] Hero video 与 poster 是两个不同路径。
- [x] Hero 视频为 1700×1000、8 秒、H.264、30fps、240 帧、无音轨。
- [x] Hero 视频小于 8MB。
- [x] Hero 真实末帧到首帧 SSIM 0.999878。
- [x] `productionMedia` 全部路径以 `/assets/v32/` 开头。
- [x] media test RED 和 GREEN 都有真实命令输出。
- [x] HyperFrames lint/check/snapshots 通过并人工检查。
- [x] production build 通过。
- [x] `git diff --check` 通过。

## 问题 / 顾虑

1. PowerShell 禁止执行 `pnpm.ps1` / `npx.ps1`，因此测试使用 `corepack.cmd`，HyperFrames 使用 `npx.cmd`；不影响产物。
2. 系统 PATH 没有 FFmpeg/FFprobe，复用了 npm 临时缓存中的 `ffmpeg-static` / `ffprobe-static`，并仅在命令进程中临时加入 PATH；没有修改系统配置。
3. 现有 `node_modules` 实际由 pnpm 11.9.0 关联到 v11 store，而 `package.json` 声明 pnpm 10.13.1。安装 `@types/node` 时临时用相同的 pnpm 11.9.0 完成依赖更新，随后保持 `packageManager` 原值不变。最终 build/test 均由项目声明的 Corepack pnpm 10.13.1 执行并通过。
4. ImageGen 产物属于生成式视觉，已按简报逐项人工验收，但后续组件落地时仍建议在真实页面裁切和响应式环境中做一次整体视觉回看。
5. Hero 环境音属于可选项，本实现选择无音轨，避免自动播放、静音策略与额外体积风险。
