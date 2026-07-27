# 梁栋求职作品集网站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一套适合梁栋履历的高级编辑型求职作品集，用代表案例、AIGC 工作流和研究报告证明内容策略与品牌增长能力。

**Architecture:** 使用 React + Vite + TypeScript 构建静态单页作品集。项目与报告数据集中在一个强类型数据模块中，页面组件只负责呈现；案例详情由顶层状态控制，以全屏阅读层呈现。Lenis 负责原生语义上的平滑滚动，GSAP ScrollTrigger 只负责滚动文字、媒体裁切和案例转场。

**Tech Stack:** React 19、Vite、TypeScript、CSS Modules/全局设计令牌、GSAP、Lenis、Vitest、Testing Library、Playwright。

## Global Constraints

- 主色固定为 Ink `#070707`、Warm paper `#F1F0EB`、Silver `#C9CBCA`、Signal red `#FF3B1F`。
- 首屏只允许出现设计说明中列出的品牌标记、标题、定位、状态、地点年份和四个导航项。
- 不使用玻璃拟态、Bento 卡片、技能进度条、模板式时间线和满屏 WebGL/Three.js。
- 未提供真实项目图片前，使用原创抽象视觉、排版图形和数据图形，不伪装成客户交付物。
- 项目表述只使用简历中可以证明的信息，不新增客户、奖项和业务结果。
- `prefers-reduced-motion` 下关闭平滑滚动、视差和复杂页面转场。
- 桌面验收尺寸：1440×900、1280×800；移动端验收尺寸：390×844。
- 手机、邮箱只出现在联系区；网页不新增或推断个人隐私信息。

---

## File Structure

```text
.
├─ public/
│  ├─ assets/
│  │  ├─ hero-metal.webp
│  │  ├─ case-world-cup.webp
│  │  ├─ case-overseas-growth.webp
│  │  ├─ case-city-media.webp
│  │  ├─ aigc-metal.webp
│  │  └─ report-covers.webp
│  └─ resume/
│     └─ liang-dong-resume.pdf
├─ src/
│  ├─ app/
│  │  ├─ App.tsx
│  │  └─ App.test.tsx
│  ├─ components/
│  │  ├─ AppShell.tsx
│  │  ├─ AppShell.test.tsx
│  │  ├─ MotionProvider.tsx
│  │  ├─ Hero.tsx
│  │  ├─ Manifesto.tsx
│  │  ├─ SelectedWork.tsx
│  │  ├─ SelectedWork.test.tsx
│  │  ├─ CaseStudyView.tsx
│  │  ├─ CaseStudyView.test.tsx
│  │  ├─ AigcLab.tsx
│  │  ├─ ResearchIndex.tsx
│  │  ├─ ResearchIndex.test.tsx
│  │  ├─ ReportDetailView.tsx
│  │  ├─ ProfileContact.tsx
│  │  └─ MediaWithFallback.tsx
│  ├─ data/
│  │  ├─ portfolio.ts
│  │  └─ portfolio.test.ts
│  ├─ hooks/
│  │  ├─ useMotionPreference.ts
│  │  └─ useScrollLock.ts
│  ├─ styles/
│  │  ├─ tokens.css
│  │  └─ global.css
│  ├─ test/
│  │  └─ setup.ts
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ tests/
│  └─ portfolio.spec.ts
├─ index.html
├─ package.json
├─ playwright.config.ts
├─ tsconfig.json
├─ vite.config.ts
└─ vitest.config.ts
```

---

### Task 1: 生成并确认完整视觉概念与原创媒体资产

**Files:**
- Create: `design/concepts/hero.png`
- Create: `design/concepts/selected-work.png`
- Create: `design/concepts/aigc-lab.png`
- Create: `design/concepts/research-profile.png`
- Create: `public/assets/hero-metal.webp`
- Create: `public/assets/case-world-cup.webp`
- Create: `public/assets/case-overseas-growth.webp`
- Create: `public/assets/case-city-media.webp`
- Create: `public/assets/aigc-metal.webp`
- Create: `public/assets/report-covers.webp`

**Interfaces:**
- Consumes: `docs/superpowers/specs/2026-07-27-portfolio-design.md`
- Produces: 六个可直接用于网页的原创媒体文件，以及四个用于视觉比对的分段概念图。

- [ ] **Step 1: 生成四张协调一致的分段概念图**

使用 Image Gen，四张图共享以下设计约束：

```text
为梁栋的求职作品集设计高保真网页截图。职业定位是内容策略、品牌增长、影视制作与 AIGC 工作流。风格结合高定时尚画册、瑞士编辑排版与 Apple 产品页的克制。使用黑 #070707、暖白 #F1F0EB、银灰 #C9CBCA、信号橙红 #FF3B1F。超大无衬线字体、紧字距、强留白、非对称构图、全幅媒体。禁止玻璃拟态、Bento 卡片、蓝紫发光渐变、技能进度条、模板时间线、满屏 3D。所有导航、标题、按钮和正文由网页代码实现，概念图只提供布局、材质、影像与排版关系。
```

分别生成首屏、代表项目、AIGC Lab、研究与联系四张 1440px 宽截图。首屏必须包含银灰金属抽象物；代表项目使用三个不同但同系统的编辑型封面；AIGC 使用银灰机械材质；研究区使用杂志目录。

- [ ] **Step 2: 逐张检查概念图**

使用 `view_image` 检查：

```text
文字层级清楚；没有普通卡片网格；黑银红配色一致；每张图能在 HTML/CSS 中实现；
媒体画面不包含客户商标；首页首屏不出现未经批准的额外文案。
```

- [ ] **Step 3: 从批准概念生成六个独立媒体资产**

生成时要求无界面文字、无商标、无客户包装、无虚构数据。导出为 WebP；首屏和 AIGC 资产使用 4:5，三个案例使用 16:9，报告封面合集使用 4:5。

- [ ] **Step 4: 验证资产尺寸与可读性**

Run:

```powershell
Get-ChildItem public/assets/*.webp | Select-Object Name,Length
```

Expected: 六个文件均存在，每个文件大于 20KB，且没有临时 PNG 留在 `public/assets/`。

- [ ] **Step 5: Commit**

```powershell
git add design/concepts public/assets
git commit -m "design: add approved portfolio concepts and media"
```

---

### Task 2: 建立 React 项目、测试工具和设计令牌

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `tsconfig.json`
- Create: `src/main.tsx`
- Create: `src/vite-env.d.ts`
- Create: `src/test/setup.ts`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/app/App.tsx`
- Create: `src/app/App.test.tsx`

**Interfaces:**
- Consumes: Task 1 的媒体路径。
- Produces: `npm run dev`、`npm run build`、`npm run test`、`npm run test:e2e`，以及可供所有组件使用的 CSS 令牌。

- [ ] **Step 1: 写入最小应用测试**

```tsx
import { render, screen } from '@testing-library/react'
import { App } from './App'

it('renders the approved portfolio statement', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /make signals matter/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `npm run test -- src/app/App.test.tsx`

Expected: FAIL，因为项目依赖与 `App` 尚未建立。

- [ ] **Step 3: 建立项目配置与依赖**

`package.json` 使用：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "gsap": "^3.13.0",
    "lenis": "^1.3.25",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.54.0",
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.3.0",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "@vitejs/plugin-react": "^4.6.0",
    "jsdom": "^26.1.0",
    "typescript": "^5.8.0",
    "vite": "^7.0.0",
    "vitest": "^3.2.0"
  }
}
```

- [ ] **Step 4: 写入设计令牌与最小 App**

```css
:root {
  --ink: #070707;
  --paper: #f1f0eb;
  --silver: #c9cbca;
  --muted: #969792;
  --signal: #ff3b1f;
  --page-gutter: clamp(20px, 4.5vw, 72px);
  --display-leading: 0.82;
}
```

```tsx
export function App() {
  return <main><h1>MAKE SIGNALS MATTER.</h1></main>
}
```

- [ ] **Step 5: 安装依赖并运行测试**

Run: `pnpm install && pnpm test`

Expected: PASS，标题测试通过。

- [ ] **Step 6: Commit**

```powershell
git add package.json pnpm-lock.yaml index.html vite.config.ts vitest.config.ts playwright.config.ts tsconfig.json src
git commit -m "chore: scaffold portfolio application"
```

---

### Task 3: 建立强类型作品数据与媒体降级

**Files:**
- Create: `src/data/portfolio.ts`
- Create: `src/data/portfolio.test.ts`
- Create: `src/components/MediaWithFallback.tsx`

**Interfaces:**
- Produces: `Project`, `Report`, `projects`, `reports`；`MediaWithFallback({src, fallbackTitle, alt})`。
- Consumers: Tasks 5–7 的案例、AIGC、研究与联系组件。

- [ ] **Step 1: 写数据完整性测试**

```ts
import { projects, reports } from './portfolio'

it('keeps portfolio ids unique and claims evidence-based', () => {
  expect(new Set(projects.map((item) => item.id)).size).toBe(projects.length)
  expect(projects.map((item) => item.metric)).toEqual([
    '26 份热点日报',
    '独立站 PV +22%',
    '68 条商业短视频 · 23 部专题片',
  ])
  expect(reports).toHaveLength(3)
})
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `pnpm test -- src/data/portfolio.test.ts`

Expected: FAIL，因为 `portfolio.ts` 不存在。

- [ ] **Step 3: 写入数据类型与履历内容**

```ts
export type Project = {
  id: 'world-cup' | 'overseas-growth' | 'city-media'
  index: string
  title: string
  titleEn: string
  organization: string
  period: string
  role: string
  challenge: string
  actions: string[]
  metric: string
  reflection: string
  media: string
}

export type Report = {
  id: 'beauty-audience' | 'world-cup-opportunity' | 'aigc-workflow'
  index: string
  title: string
  category: string
  summary: string
  coverPosition: string
}
```

填入设计说明中的三个案例和三个报告，不增加简历之外的结果。

- [ ] **Step 4: 实现媒体加载失败降级**

```tsx
type Props = { src: string; alt: string; fallbackTitle: string; className?: string }

export function MediaWithFallback({ src, alt, fallbackTitle, className }: Props) {
  const [failed, setFailed] = useState(false)
  return failed
    ? <div className={className} role="img" aria-label={alt}>{fallbackTitle}</div>
    : <img className={className} src={src} alt={alt} onError={() => setFailed(true)} />
}
```

- [ ] **Step 5: 运行测试**

Run: `pnpm test -- src/data/portfolio.test.ts`

Expected: PASS。

- [ ] **Step 6: Commit**

```powershell
git add src/data src/components/MediaWithFallback.tsx
git commit -m "feat: add evidence-based portfolio content"
```

---

### Task 4: 实现应用外壳、导航和平滑滚动

**Files:**
- Create: `src/components/AppShell.tsx`
- Create: `src/components/AppShell.test.tsx`
- Create: `src/components/MotionProvider.tsx`
- Create: `src/hooks/useMotionPreference.ts`
- Create: `src/hooks/useScrollLock.ts`
- Modify: `src/app/App.tsx`

**Interfaces:**
- Produces: `AppShell({children})`、`MotionProvider({children})`、`useMotionPreference(): boolean`、`useScrollLock(locked: boolean): void`。
- Consumers: 所有页面区域与案例详情层。

- [ ] **Step 1: 写导航与减少动效测试**

```tsx
it('renders the approved navigation labels', () => {
  render(<AppShell><div /></AppShell>)
  for (const label of ['WORK', 'LAB', 'RESEARCH', 'PROFILE']) {
    expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
  }
})
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `pnpm test -- src/components/AppShell.test.tsx`

Expected: FAIL，因为 `AppShell` 不存在。

- [ ] **Step 3: 实现外壳和导航**

导航锚点固定为：

```tsx
const navItems = [
  ['WORK', '#work'],
  ['LAB', '#lab'],
  ['RESEARCH', '#research'],
  ['PROFILE', '#profile'],
] as const
```

`useMotionPreference` 通过 `matchMedia('(prefers-reduced-motion: reduce)')` 返回布尔值。`MotionProvider` 仅在返回 `false` 时初始化 `<ReactLenis root />`，否则原样返回 `children`。`AppShell` 在导航与页面内容外层使用 `MotionProvider`。

- [ ] **Step 4: 运行测试与构建**

Run: `pnpm test -- src/components/AppShell.test.tsx && pnpm build`

Expected: PASS，构建无类型错误。

- [ ] **Step 5: Commit**

```powershell
git add src/components/AppShell* src/components/MotionProvider.tsx src/hooks src/app/App.tsx
git commit -m "feat: add accessible portfolio shell"
```

---

### Task 5: 实现首屏、方法论和滚动文字

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/Manifesto.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: `public/assets/hero-metal.webp`、`useMotionPreference()`。
- Produces: `Hero` 与 `Manifesto` 两个静态语义章节。

- [ ] **Step 1: 扩充首页文案测试**

```tsx
it('keeps the first viewport copy within the approved list', () => {
  render(<App />)
  expect(screen.getByText('内容策略 × 品牌增长 × AIGC')).toBeInTheDocument()
  expect(screen.getByText('把复杂的信息，变成值得传播的作品。')).toBeInTheDocument()
  expect(screen.queryByText(/welcome|你好，我是/i)).not.toBeInTheDocument()
})
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `pnpm test -- src/app/App.test.tsx`

Expected: FAIL，因为中文定位与说明尚未实现。

- [ ] **Step 3: 实现 Hero 与 Manifesto**

Hero 使用语义结构：

```tsx
<section className="hero" aria-labelledby="hero-title">
  <p className="hero__role">内容策略 × 品牌增长 × AIGC</p>
  <h1 id="hero-title"><span>MAKE</span><span>SIGNALS</span><span>MATTER.</span></h1>
  <p>把复杂的信息，变成值得传播的作品。</p>
  <MediaWithFallback src="/assets/hero-metal.webp" alt="银灰色抽象金属形态" fallbackTitle="LD / 2026" />
</section>
```

Manifesto 使用批准的中文宣言与方法链。只在允许动效时通过 `useGSAP` 为每一行设置 `yPercent` 与 `clipPath` 滚动过渡。

- [ ] **Step 4: 运行测试与构建**

Run: `pnpm test -- src/app/App.test.tsx && pnpm build`

Expected: PASS。

- [ ] **Step 5: 浏览器验证首屏**

在 1440×900 和 390×844 检查：

```text
标题不裁切；银灰媒体不遮挡定位文字；移动端三行标题完整；
首屏没有额外按钮、标签、卡片或未经批准的说明。
```

- [ ] **Step 6: Commit**

```powershell
git add src/components/Hero.tsx src/components/Manifesto.tsx src/app/App.tsx src/styles/global.css
git commit -m "feat: build editorial hero and manifesto"
```

---

### Task 6: 实现代表案例与全屏案例详情

**Files:**
- Create: `src/components/SelectedWork.tsx`
- Create: `src/components/SelectedWork.test.tsx`
- Create: `src/components/CaseStudyView.tsx`
- Create: `src/components/CaseStudyView.test.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: `Project`, `projects`, `useScrollLock`。
- Produces: `SelectedWork({onOpen})`、`CaseStudyView({project, onClose})`。

- [ ] **Step 1: 写打开、关闭和焦点恢复测试**

```tsx
it('opens a case study and restores focus when closed', async () => {
  const user = userEvent.setup()
  render(<App />)
  const trigger = screen.getByRole('button', { name: /世界杯热点内容系统/ })
  await user.click(trigger)
  expect(screen.getByRole('dialog', { name: /世界杯热点内容系统/ })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: '关闭案例' }))
  expect(trigger).toHaveFocus()
})
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `pnpm test -- src/components/SelectedWork.test.tsx src/components/CaseStudyView.test.tsx`

Expected: FAIL，因为案例组件尚未实现。

- [ ] **Step 3: 实现代表项目列表**

第一个项目使用全幅 16:9 媒体，另外两个使用细线分隔的大字号列表。每个触发器使用原生 `<button>`，名称包含项目标题。

作品区顶部提供 `LIST` 与 `GRID` 两个按钮，状态类型固定为：

```ts
type WorkView = 'list' | 'grid'
```

列表模式用于招聘方快速扫描；画廊模式使用 16:9、4:5、1:1 三种固定比例展示同一组项目。切换只改变布局，不改变项目顺序和可访问名称。

- [ ] **Step 4: 实现详情层与滚动锁定**

详情层结构固定为：

```tsx
<div role="dialog" aria-modal="true" aria-labelledby={`case-${project.id}`}>
  <button aria-label="关闭案例" onClick={onClose}>...</button>
  <h2 id={`case-${project.id}`}>{project.title}</h2>
  <section aria-labelledby="context">项目背景</section>
  <section aria-labelledby="role">我的角色</section>
  <section aria-labelledby="challenge">核心挑战</section>
  <section aria-labelledby="process">策略与过程</section>
  <section aria-labelledby="output">关键产出</section>
  <section aria-labelledby="result">可量化结果</section>
  <section aria-labelledby="reflection">复盘</section>
</div>
```

打开时保存触发按钮引用与 `window.scrollY`；关闭时恢复滚动位置和焦点。按 Escape 关闭。

- [ ] **Step 5: 加入巨型文字遮罩转场**

转场只使用 `transform`、`opacity` 和 `clip-path`。减少动效时直接显示/隐藏详情层。

- [ ] **Step 6: 运行测试与构建**

Run: `pnpm test -- src/components/SelectedWork.test.tsx src/components/CaseStudyView.test.tsx && pnpm build`

Expected: PASS。

- [ ] **Step 7: Commit**

```powershell
git add src/components/SelectedWork* src/components/CaseStudyView* src/app/App.tsx src/styles/global.css
git commit -m "feat: add immersive portfolio case studies"
```

---

### Task 7: 实现 AIGC 工作流与研究目录

**Files:**
- Create: `src/components/AigcLab.tsx`
- Create: `src/components/ResearchIndex.tsx`
- Create: `src/components/ResearchIndex.test.tsx`
- Create: `src/components/ReportDetailView.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: `Report`、`reports`、`public/assets/aigc-metal.webp`、`public/assets/report-covers.webp`。
- Produces: `ResearchIndex`、`ReportDetailView({report, onClose})`、AIGC 流程线、桌面悬停预览和移动端可点击报告目录。

- [ ] **Step 1: 写报告与工作流测试**

```tsx
it('renders three evidence-based reports and the AIGC efficiency result', () => {
  render(<App />)
  expect(screen.getAllByRole('button', { name: /查看报告/ })).toHaveLength(3)
  expect(screen.getByText('3h → 1h')).toBeInTheDocument()
  for (const step of ['热点聚合', '选题生成', '平台化改写', '风险审核', '日报整理']) {
    expect(screen.getByText(step)).toBeInTheDocument()
  }
})
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `pnpm test -- src/components/ResearchIndex.test.tsx`

Expected: FAIL，因为 AIGC 与报告组件尚未实现。

- [ ] **Step 3: 实现 AIGC 流程线**

使用有序列表表达五个步骤。桌面端随滚动逐步强调当前步骤；移动端全部静态显示。媒体失败时显示银灰排版封面。

- [ ] **Step 4: 实现研究目录**

桌面端指针进入报告行时显示跟随指针的封面裁切；触屏与键盘设备点击报告行后使用独立的 `ReportDetailView` 展示标题、类别和 `summary`。悬停效果不得成为读取报告标题的前提。报告详情使用 `role="dialog"`、Escape 关闭、滚动锁定和焦点恢复，与案例详情保持一致，但不复用 `Project` 类型。

- [ ] **Step 5: 运行测试与构建**

Run: `pnpm test -- src/components/ResearchIndex.test.tsx && pnpm build`

Expected: PASS。

- [ ] **Step 6: Commit**

```powershell
git add src/components/AigcLab.tsx src/components/ResearchIndex* src/components/ReportDetailView.tsx src/app/App.tsx src/styles/global.css
git commit -m "feat: add AIGC workflow and research index"
```

---

### Task 8: 实现 Profile、联系方式和简历下载

**Files:**
- Create: `src/components/ProfileContact.tsx`
- Copy: `D:/Desktop/梁栋简历-可尽快到岗-可实习3-6月.pdf` → `public/resume/liang-dong-resume.pdf`
- Modify: `src/app/App.tsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces: `ProfileContact` 与有效的简历下载链接。

- [ ] **Step 1: 写联系区测试**

```tsx
it('provides direct contact and resume download actions', () => {
  render(<App />)
  expect(screen.getByRole('link', { name: '下载简历' })).toHaveAttribute(
    'href',
    '/resume/liang-dong-resume.pdf',
  )
  expect(screen.getByRole('link', { name: /发送邮件/ })).toHaveAttribute(
    'href',
    'mailto:2223966318@qq.com',
  )
})
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `pnpm test -- src/app/App.test.tsx`

Expected: FAIL，因为联系区尚未实现。

- [ ] **Step 3: 复制简历并实现联系区**

联系区使用信号橙红背景和 `LET'S MAKE IT MATTER.`。手机号使用简历中的 `18990188659`，邮箱使用 `2223966318@qq.com`。

- [ ] **Step 4: 验证简历文件存在**

Run:

```powershell
Test-Path public/resume/liang-dong-resume.pdf
```

Expected: `True`。

- [ ] **Step 5: 运行测试与构建**

Run: `pnpm test && pnpm build`

Expected: 所有单元测试通过，生产构建成功。

- [ ] **Step 6: Commit**

```powershell
git add public/resume src/components/ProfileContact.tsx src/app/App.tsx src/styles/global.css
git commit -m "feat: complete profile and contact section"
```

---

### Task 9: 浏览器端到端验证与视觉一致性修复

**Files:**
- Create: `tests/portfolio.spec.ts`
- Modify: `playwright.config.ts`
- Modify as needed: `src/**/*.tsx`
- Modify as needed: `src/styles/*.css`

**Interfaces:**
- Consumes: 完整网站与四张批准概念图。
- Produces: 自动化交互测试、桌面与移动截图、视觉一致性清单。

- [ ] **Step 1: 写端到端核心路径测试**

```ts
import { test, expect } from '@playwright/test'

test('recruiter can inspect a project and download the resume', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /make signals matter/i })).toBeVisible()
  await page.getByRole('button', { name: /世界杯热点内容系统/ }).click()
  await expect(page.getByRole('dialog', { name: /世界杯热点内容系统/ })).toBeVisible()
  await page.getByRole('button', { name: '关闭案例' }).click()
  await expect(page.getByRole('link', { name: '下载简历' })).toHaveAttribute(
    'href',
    '/resume/liang-dong-resume.pdf',
  )
})
```

- [ ] **Step 2: 运行端到端测试并修复功能问题**

Run: `pnpm test:e2e`

Expected: Chromium 中通过。

- [ ] **Step 3: 在浏览器中验证三个尺寸**

使用内置浏览器检查 1440×900、1280×800、390×844：

```text
首屏标题与媒体不裁切；导航可用；三个案例可打开关闭；
AIGC 流程完整；报告在鼠标与触屏设备上都可打开；
联系信息与简历下载有效；没有横向溢出。
```

- [ ] **Step 4: 验证减少动效和媒体失败**

Playwright 中模拟 `reducedMotion: 'reduce'`，确认页面仍完整可读。拦截一个 WebP 请求返回 404，确认出现排版封面且没有破图图标。

- [ ] **Step 5: 捕获并检查最终截图**

分别保存：

```text
output/screenshots/portfolio-1440.png
output/screenshots/portfolio-1280.png
output/screenshots/portfolio-mobile.png
```

使用 `view_image` 同时检查批准概念图和最终实现截图。至少比较：

1. 首屏文案与层级
2. 黑银红色彩
3. 字体比例与留白
4. 案例媒体构图
5. AIGC 银灰材质
6. 研究目录与橙红联系区
7. 移动端折行与触控区域

- [ ] **Step 6: 运行完整验证**

Run:

```powershell
pnpm test
pnpm build
pnpm test:e2e
```

Expected: 所有命令退出码为 0。

- [ ] **Step 7: Commit**

```powershell
git add tests playwright.config.ts src output/screenshots
git commit -m "test: verify portfolio experience across viewports"
```
