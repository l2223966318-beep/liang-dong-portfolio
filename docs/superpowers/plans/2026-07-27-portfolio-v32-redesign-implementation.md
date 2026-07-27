# Portfolio V3.2 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing React portfolio so all five sections faithfully match the approved V3.2 concepts while preserving real resume content, working case/report details, accessibility, and responsive behavior.

**Architecture:** Keep the existing React + Vite + TypeScript application and its static data model. Replace the page composition with five focused sections, split the 1,073-line stylesheet by section responsibility, add a real video-with-fallback component for the Hero, and retain the existing full-screen case/report detail state in `App`. Production media is generated as standalone assets; approved concept screenshots are never shipped as UI.

**Tech Stack:** React 19, TypeScript 5.8, Vite 7, Vitest, Testing Library, Playwright, Lenis, GSAP, ImageGen production assets, HyperFrames hero loop.

## Global Constraints

- Implement directly in the current project; do not create a second scaffold or replace the React + Vite stack.
- Approved concept references are `design/concepts/v32/01-hero.png` through `05-contact.png`.
- Primary desktop design viewport is approximately `1700 × 1000`; also verify `1440 × 900`, `1280 × 800`, and `390 × 844`.
- Keep the site bright: `#FFFFFF`, `#F3F4F6`, `#0D0E11`, `#0628BD`, `#EF2B22`, `#00A985`, `#F3D900`, and silver neutrals.
- English display type must keep the original condensed personality: `"Arial Narrow", "Roboto Condensed", "Helvetica Neue", Arial, sans-serif`, weight `750–800`, tracking near `-0.08em`, line height `0.72–0.82`.
- Do not use a dark overall background, Didone/fashion serif display type, Bento templates, rounded card grids, skill percentages, fake clients, fake metrics, or whole concept screenshots as page backgrounds.
- Keep all visible UI text, navigation, controls, metrics, and contact links code-native.
- The Hero video must be muted, looping, inline, pausable, and have a static poster/failure fallback.
- Preserve `prefers-reduced-motion`, keyboard operation, visible focus, overlay focus restoration, image/video fallback, and mobile no-overflow behavior.
- Do not add new dependencies unless an existing dependency cannot satisfy a recorded requirement.

---

## File Structure

### Create

- `public/assets/v32/hero-loop.mp4` — muted eight-second prismatic Hero loop.
- `public/assets/v32/hero-poster.webp` — Hero video poster.
- `public/assets/v32/profile-bust.webp` — faceless prismatic identity sculpture.
- `public/assets/v32/project-world-cup.webp` — World Cup signal-system cover.
- `public/assets/v32/project-beauty.webp` — overseas beauty growth cover.
- `public/assets/v32/project-city.webp` — city media production cover.
- `public/assets/v32/research-beauty.webp` — beauty research cover.
- `public/assets/v32/research-world-cup.webp` — World Cup research cover.
- `public/assets/v32/research-aigc.webp` — AIGC workflow research cover.
- `public/assets/v32/capability-aigc.webp` — modular transparent cube artwork.
- `public/assets/v32/contact-ring.webp` — prismatic closing ring.
- `src/data/media.ts` — stable production-media path manifest.
- `src/data/media.test.ts` — verifies every manifest asset exists.
- `src/data/profile.ts` — profile facts, capabilities, methods, and contact data.
- `src/data/profile.test.ts` — verifies evidence-backed profile data.
- `src/components/VideoWithFallback.tsx` — real video playback and poster fallback.
- `src/components/VideoWithFallback.test.tsx` — media control tests.
- `src/components/Profile.tsx` — Profile section only.
- `src/components/Capabilities.tsx` — capability panels and method rail.
- `src/components/ProfileCapabilities.test.tsx` — profile/capability content tests.
- `src/components/ContactFooter.tsx` — final contact chapter.
- `src/components/ContactFooter.test.tsx` — real-link tests.
- `src/styles/base.css` — reset, base typography, focus, shared layout utilities.
- `src/styles/shell-hero.css` — header and Hero.
- `src/styles/profile-capabilities.css` — Profile and Capabilities.
- `src/styles/work-research.css` — selected projects and research rail.
- `src/styles/contact.css` — final contact chapter.
- `src/styles/overlays.css` — case/report full-screen detail layers.
- `docs/superpowers/verification/v32-fidelity-ledger.md` — final visual comparison evidence.

### Modify

- `src/styles/tokens.css` — V3.2 locked tokens and display font.
- `src/styles/global.css` — imports only; remove the previous monolithic section rules.
- `src/data/portfolio.ts` — point cases and reports to V3.2 production media.
- `src/data/portfolio.test.ts` — verify the approved case/report content remains intact.
- `src/components/AppShell.tsx` — Chinese navigation and contact action.
- `src/components/AppShell.test.tsx` — approved navigation contract.
- `src/components/Hero.tsx` — V3.2 full-screen Hero and video controls.
- `src/components/SelectedWork.tsx` — large project sequence plus report rail placement.
- `src/components/ResearchIndex.tsx` — compact report rail within Selected Work.
- `src/components/CaseStudyView.tsx` — preserve overlay behavior while applying V3.2 chrome.
- `src/components/ReportDetailView.tsx` — preserve overlay behavior while applying V3.2 chrome.
- `src/components/MotionProvider.tsx` — keep Lenis and expose reduced-motion-safe behavior.
- `src/app/App.tsx` — new five-section composition.
- `src/app/App.test.tsx` — approved copy, interaction, and section tests.
- `tests/portfolio.spec.ts` — desktop, mobile, media control, overlay, and contact E2E.

### Remove after replacements are wired

- `src/components/Manifesto.tsx` — its method content moves into `Capabilities`.
- `src/components/AigcLab.tsx` — its evidence moves into `Capabilities`.
- `src/components/ProfileContact.tsx` — replaced by `Profile` and `ContactFooter`.

---

### Task 1: Produce Standalone V3.2 Media and Lock the Media Manifest

**Files:**
- Create: `public/assets/v32/*`
- Create: `src/data/media.ts`
- Create: `src/data/media.test.ts`

**Interfaces:**
- Produces: `productionMedia`, a readonly object consumed by Hero, Profile, SelectedWork, ResearchIndex, Capabilities, and ContactFooter.
- Produces: `productionMedia.hero.video` and `.poster` as distinct paths.

- [ ] **Step 1: Write the failing media-manifest test**

```ts
// src/data/media.test.ts
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { productionMedia } from './media'

const flatten = (value: unknown): string[] =>
  typeof value === 'string'
    ? [value]
    : Object.values(value as Record<string, unknown>).flatMap(flatten)

describe('productionMedia', () => {
  it('keeps every project-bound media file inside public/assets/v32', () => {
    for (const path of flatten(productionMedia)) {
      expect(path).toMatch(/^\/assets\/v32\//)
      expect(existsSync(resolve('public', path.slice(1)))).toBe(true)
    }
  })
})
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
pnpm test -- src/data/media.test.ts
```

Expected: FAIL because `src/data/media.ts` does not exist.

- [ ] **Step 3: Generate the production assets from the accepted concepts**

Use the ImageGen skill with these exact concept references and outputs:

| Output | Reference | Required treatment |
|---|---|---|
| `hero-poster.webp` | `design/concepts/v32/01-hero.png` | transparent folded acrylic, optic-white field, cobalt/red/teal/citron refractions, no text |
| `profile-bust.webp` | `design/concepts/v32/02-profile.png` | faceless geometric bust, clearly artificial, no portrait identity |
| `project-world-cup.webp` | `design/concepts/v32/03-selected-work.png` | global signal sphere and creator nodes, no logos or real faces |
| `project-beauty.webp` | same | clear cosmetic vessel and red/silver prismatic material, no brand label |
| `project-city.webp` | same | city skyline plus editing timeline, no broadcaster logo |
| three `research-*.webp` files | same | distinct glass/signal/cube covers, no in-image UI text |
| `capability-aigc.webp` | `design/concepts/v32/04-capabilities.png` | modular transparent cubes on white |
| `contact-ring.webp` | `design/concepts/v32/05-contact.png` | prismatic ring, cobalt/red/yellow reflections |

Save every final asset under `public/assets/v32/`, use stable aspect ratios matching the concept, and inspect each output before acceptance.

- [ ] **Step 4: Create the Hero loop**

Use the HyperFrames skill to animate `hero-poster.webp` into an eight-second seamless loop:

- canvas: `1700 × 1000`
- duration: `8s`
- format: H.264 MP4
- subtle optional ambient texture with no speech, default muted by the page
- motion: slow refractive light sweep, 2–3° material rotation, subtle cobalt plane drift
- no moving text or UI inside the video
- final file: `public/assets/v32/hero-loop.mp4`
- target size: at most `8 MB`

Validate:

```powershell
Get-Item '.\public\assets\v32\hero-loop.mp4' | Select-Object Name,Length
```

Expected: file exists and `Length` is less than `8388608`.

- [ ] **Step 5: Implement the stable media manifest**

```ts
// src/data/media.ts
export const productionMedia = {
  hero: {
    video: '/assets/v32/hero-loop.mp4',
    poster: '/assets/v32/hero-poster.webp',
  },
  profile: '/assets/v32/profile-bust.webp',
  projects: {
    worldCup: '/assets/v32/project-world-cup.webp',
    beauty: '/assets/v32/project-beauty.webp',
    city: '/assets/v32/project-city.webp',
  },
  research: {
    beauty: '/assets/v32/research-beauty.webp',
    worldCup: '/assets/v32/research-world-cup.webp',
    aigc: '/assets/v32/research-aigc.webp',
  },
  capabilities: {
    aigc: '/assets/v32/capability-aigc.webp',
  },
  contact: '/assets/v32/contact-ring.webp',
} as const
```

- [ ] **Step 6: Run the media test**

Run:

```bash
pnpm test -- src/data/media.test.ts
```

Expected: PASS.

- [ ] **Step 7: Commit the production media**

```bash
git add public/assets/v32 src/data/media.ts src/data/media.test.ts
git commit -m "feat: add v3.2 production media"
```

---

### Task 2: Lock the V3.2 Data and Style Foundations

**Files:**
- Create: `src/data/profile.ts`
- Create: `src/data/profile.test.ts`
- Create: `src/styles/base.css`
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css`
- Modify: `src/data/portfolio.ts`
- Modify: `src/data/portfolio.test.ts`

**Interfaces:**
- Produces: `profileFacts`, `capabilities`, `methodSteps`, and `contact`.
- Produces: CSS tokens used by every later section.
- Consumes: `productionMedia` from Task 1.

- [ ] **Step 1: Write the failing profile-data test**

```ts
// src/data/profile.test.ts
import { describe, expect, it } from 'vitest'
import { capabilities, contact, methodSteps, profileFacts } from './profile'

describe('V3.2 profile data', () => {
  it('uses four evidence-backed facts and capabilities', () => {
    expect(profileFacts.map((item) => item.value)).toEqual([
      '3',
      '8,000+',
      '150+',
      '3h → 1h',
    ])
    expect(capabilities.map((item) => item.title)).toEqual([
      '内容策略',
      '品牌增长',
      '影像与视觉',
      'AIGC 工作流',
    ])
    expect(methodSteps).toEqual(['发现信号', '组织叙事', '推动增长'])
  })

  it('keeps the approved real contact values', () => {
    expect(contact.email).toBe('2223966318@qq.com')
    expect(contact.phone).toBe('18990188659')
    expect(contact.resume).toBe('/resume/liang-dong-resume.pdf')
  })
})
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
pnpm test -- src/data/profile.test.ts
```

Expected: FAIL because `src/data/profile.ts` does not exist.

- [ ] **Step 3: Implement the typed evidence data**

```ts
// src/data/profile.ts
export type EvidenceItem = {
  index: string
  title: string
  description: string
  evidence: string
  tone: 'cobalt' | 'vermilion' | 'silver' | 'citron'
}

export const profileFacts = [
  { value: '3', label: '年内容相关经验' },
  { value: '8,000+', label: '账号粉丝增长' },
  { value: '150+', label: '新闻与视频内容' },
  { value: '3h → 1h', label: 'AIGC 日报工作流' },
] as const

export const capabilities: EvidenceItem[] = [
  { index: '01', title: '内容策略', description: '从热点、人群与平台语境中发现信号', evidence: '26 份热点日报', tone: 'cobalt' },
  { index: '02', title: '品牌增长', description: '让内容、用户意图与落地体验对齐', evidence: '独立站 PV +22%', tone: 'vermilion' },
  { index: '03', title: '影像与视觉', description: '从脚本、拍摄到剪辑与平面表达', evidence: '150+ 新闻与视频内容', tone: 'silver' },
  { index: '04', title: 'AIGC 工作流', description: '以人工判断为核心重组内容生产流程', evidence: '3h → 1h', tone: 'citron' },
]

export const methodSteps = ['发现信号', '组织叙事', '推动增长'] as const

export const contact = {
  email: '2223966318@qq.com',
  phone: '18990188659',
  phoneLabel: '189 9018 8659',
  resume: '/resume/liang-dong-resume.pdf',
} as const
```

- [ ] **Step 4: Point portfolio entries to the V3.2 media manifest**

Import `productionMedia` in `src/data/portfolio.ts` and replace only the `media` paths and report cover paths. Keep titles, roles, metrics, actions, reflections, and organizations unchanged.

```ts
import { productionMedia } from './media'

// Example inside project 01:
media: productionMedia.projects.worldCup,
```

- [ ] **Step 5: Replace tokens with the locked V3.2 values**

```css
/* src/styles/tokens.css */
:root {
  --ink: #0d0e11;
  --paper: #ffffff;
  --paper-cool: #f3f4f6;
  --cobalt: #0628bd;
  --signal: #ef2b22;
  --teal: #00a985;
  --citron: #f3d900;
  --silver: #d8dce3;
  --hairline: rgb(13 14 17 / 18%);
  --page-gutter: clamp(1.5rem, 3.2vw, 3.5rem);
  --section-space: clamp(6rem, 10vw, 10rem);
  --font-display: "Arial Narrow", "Roboto Condensed", "Helvetica Neue", Arial, sans-serif;
  --font-ui: Inter, "Noto Sans SC", "Microsoft YaHei", sans-serif;
}
```

- [ ] **Step 6: Split the shared base styles**

Start `src/styles/global.css` with the files that exist in this task:

```css
@import './tokens.css';
@import './base.css';
```

Move only reset, body, shared `.section-index`, `.section-heading`, focus, selection, and reduced-motion rules into `src/styles/base.css`. Each later task appends its own stylesheet import when that file is created.

- [ ] **Step 7: Run data tests and build**

Run:

```bash
pnpm test -- src/data/profile.test.ts src/data/portfolio.test.ts
pnpm build
```

Expected: both test files PASS and build succeeds.

- [ ] **Step 8: Commit the foundation**

```bash
git add src/data src/styles/tokens.css src/styles/base.css src/styles/global.css
git commit -m "refactor: establish v3.2 portfolio foundations"
```

---

### Task 3: Implement the App Shell and Full-Screen Video Hero

**Files:**
- Create: `src/components/VideoWithFallback.tsx`
- Create: `src/components/VideoWithFallback.test.tsx`
- Create: `src/styles/shell-hero.css`
- Modify: `src/components/AppShell.tsx`
- Modify: `src/components/AppShell.test.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/app/App.test.tsx`

**Interfaces:**
- `VideoWithFallback({ src, poster, className, label })`.
- Hero consumes `productionMedia.hero`.
- AppShell exposes anchors `#work`, `#capabilities`, `#research`, `#profile`, and `#contact`.

- [ ] **Step 1: Write failing navigation and video-control tests**

```tsx
// src/components/VideoWithFallback.test.tsx
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { VideoWithFallback } from './VideoWithFallback'

describe('VideoWithFallback', () => {
  it('exposes accessible playback and sound controls', () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
    render(<VideoWithFallback src="/hero.mp4" poster="/hero.webp" label="首屏动态背景" />)

    fireEvent.click(screen.getByRole('button', { name: '暂停背景视频' }))
    expect(pause).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: '播放背景视频' }))
    expect(play).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: '开启背景声音' }))
    expect(screen.getByRole('button', { name: '静音背景视频' })).toBeInTheDocument()
  })
})
```

Replace the AppShell navigation assertion with:

```tsx
render(<AppShell><div /></AppShell>)

expect(screen.getByRole('link', { name: '项目' })).toHaveAttribute('href', '#work')
expect(screen.getByRole('link', { name: 'AIGC' })).toHaveAttribute('href', '#capabilities')
expect(screen.getByRole('link', { name: '研究' })).toHaveAttribute('href', '#research')
expect(screen.getByRole('link', { name: '关于' })).toHaveAttribute('href', '#profile')
expect(screen.getByRole('link', { name: '联系我' })).toHaveAttribute('href', '#contact')
expect(screen.getByRole('button', { name: '打开导航' })).toHaveAttribute(
  'aria-expanded',
  'false',
)
```

- [ ] **Step 2: Run the focused tests and verify they fail**

Run:

```bash
pnpm test -- src/components/VideoWithFallback.test.tsx src/components/AppShell.test.tsx
```

Expected: FAIL because the video component and approved Chinese navigation do not exist.

- [ ] **Step 3: Implement the video component**

```tsx
// src/components/VideoWithFallback.tsx
import { useRef, useState } from 'react'
import { useMotionPreference } from '../hooks/useMotionPreference'

type Props = {
  src: string
  poster: string
  label: string
  className?: string
}

export function VideoWithFallback({ src, poster, label, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const reducedMotion = useMotionPreference()
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(true)
  const [failed, setFailed] = useState(false)

  if (failed || reducedMotion) {
    return <img className={className} src={poster} alt={label} />
  }

  const toggle = async () => {
    const video = ref.current
    if (!video) return
    if (paused) await video.play()
    else video.pause()
    setPaused(!paused)
  }

  return (
    <div className={className}>
      <video ref={ref} src={src} poster={poster} muted={muted} loop playsInline autoPlay onError={() => setFailed(true)} aria-label={label} />
      <button type="button" onClick={toggle} aria-label={paused ? '播放背景视频' : '暂停背景视频'}>
        {paused ? 'PLAY' : 'PAUSE'}
      </button>
      <button
        type="button"
        onClick={() => setMuted((value) => !value)}
        aria-label={muted ? '开启背景声音' : '静音背景视频'}
      >
        {muted ? 'SOUND OFF' : 'SOUND ON'}
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Implement the approved shell, mobile navigation, and Hero copy**

In `AppShell.tsx`, keep the desktop links visible and add a real mobile menu button:

```tsx
const [menuOpen, setMenuOpen] = useState(false)
const navItems = [
  ['项目', '#work'],
  ['AIGC', '#capabilities'],
  ['研究', '#research'],
  ['关于', '#profile'],
] as const

<button
  className="site-menu"
  type="button"
  aria-expanded={menuOpen}
  aria-controls="primary-navigation"
  aria-label={menuOpen ? '关闭导航' : '打开导航'}
  onClick={() => setMenuOpen((value) => !value)}
>
  <span /><span />
</button>
<nav
  className={menuOpen ? 'site-nav is-open' : 'site-nav'}
  id="primary-navigation"
  aria-label="作品集主导航"
>
  {navItems.map(([label, href]) => (
    <a key={href} href={href} onClick={() => setMenuOpen(false)}>
      {label}
    </a>
  ))}
</nav>
<a className="site-contact" href="#contact">联系我</a>
```

Each mobile link closes the menu after activation. The `联系我` action remains a separate header link to `#contact`.

Use this Hero hierarchy:

```tsx
<section className="hero" id="top" aria-labelledby="hero-title">
  <VideoWithFallback
    className="hero__media"
    src={productionMedia.hero.video}
    poster={productionMedia.hero.poster}
    label="彩色透明材质动态背景"
  />
  <p className="hero__mark">LD / 26</p>
  <h1 id="hero-title" className="hero__title">
    <span>MAKE</span><span>SIGNALS</span><span>MATTER.</span>
  </h1>
  <div className="hero__position">
    <h2>让内容成为增长资产</h2>
    <p>内容策略 × 品牌增长 × AIGC</p>
    <a href="#work">查看项目</a>
  </div>
  <p className="hero__place">CHENGDU · 2026</p>
</section>
```

- [ ] **Step 5: Implement `shell-hero.css` against `01-hero.png`**

Required desktop checks:

- Hero height is at least `100svh`.
- Text occupies the left readable field.
- Video fills the right and center without a black rectangle.
- Display title uses the locked condensed type.
- Cobalt, vermilion, teal, and citron appear primarily through the media.
- Profile preview is visible at the fold.

Start from these locked layout rules and tune only against the concept:

```css
/* appended in src/styles/global.css */
@import './shell-hero.css';

.hero {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  padding: clamp(7rem, 11vh, 9rem) var(--page-gutter) 4rem;
  background: var(--paper);
}

.hero__title {
  position: relative;
  z-index: 2;
  width: min-content;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(6rem, 13.5vw, 14rem);
  font-weight: 800;
  letter-spacing: -0.08em;
  line-height: 0.72;
}

.hero__media {
  position: absolute;
  inset: 0 0 0 38%;
}

.hero__media video,
.hero__media > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.site-menu { display: none; }
```

- [ ] **Step 6: Run unit tests and capture the first viewport**

Run:

```bash
pnpm test -- src/components/VideoWithFallback.test.tsx src/components/AppShell.test.tsx src/app/App.test.tsx
pnpm dev --host 127.0.0.1 --port 5173
```

Use Browser/IAB at `1700 × 1000`, capture the Hero, and inspect it beside `design/concepts/v32/01-hero.png`. Fix type scale, video crop, header alignment, and fold preview before continuing.

- [ ] **Step 7: Commit the shell and Hero**

```bash
git add src/components/AppShell.tsx src/components/AppShell.test.tsx src/components/Hero.tsx src/components/VideoWithFallback.tsx src/components/VideoWithFallback.test.tsx src/styles/shell-hero.css src/app/App.test.tsx
git commit -m "feat: rebuild v3.2 video hero"
```

---

### Task 4: Implement Profile, Evidence-Backed Capabilities, and Contact

**Files:**
- Create: `src/components/Profile.tsx`
- Create: `src/components/Capabilities.tsx`
- Create: `src/components/ProfileCapabilities.test.tsx`
- Create: `src/components/ContactFooter.tsx`
- Create: `src/components/ContactFooter.test.tsx`
- Create: `src/styles/profile-capabilities.css`
- Create: `src/styles/contact.css`
- Modify: `src/app/App.tsx`
- Remove: `src/components/Manifesto.tsx`
- Remove: `src/components/AigcLab.tsx`
- Remove: `src/components/ProfileContact.tsx`

**Interfaces:**
- Profile consumes `profileFacts`, `contact`, and `productionMedia.profile`.
- Capabilities consumes `capabilities`, `methodSteps`, and `productionMedia.capabilities.aigc`.
- ContactFooter consumes `contact` and `productionMedia.contact`.
- Components expose stable section IDs: `profile`, `capabilities`, and `contact`.

- [ ] **Step 1: Write the failing content test**

```tsx
// src/components/ProfileCapabilities.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Capabilities } from './Capabilities'
import { Profile } from './Profile'

describe('Profile and Capabilities', () => {
  it('shows the approved profile evidence', () => {
    render(<Profile />)
    expect(screen.getByRole('heading', { name: '三年内容经验，从判断到落地。' })).toBeInTheDocument()
    for (const value of ['3', '8,000+', '150+', '3h → 1h']) {
      expect(screen.getByText(value)).toBeInTheDocument()
    }
  })

  it('connects every capability to evidence', () => {
    render(<Capabilities />)
    for (const label of ['内容策略', '品牌增长', '影像与视觉', 'AIGC 工作流']) {
      expect(screen.getByRole('heading', { name: label })).toBeInTheDocument()
    }
    expect(screen.getByText('发现信号')).toBeInTheDocument()
    expect(screen.getByText('组织叙事')).toBeInTheDocument()
    expect(screen.getByText('推动增长')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Write the failing contact-link test**

```tsx
// src/components/ContactFooter.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ContactFooter } from './ContactFooter'

describe('ContactFooter', () => {
  it('uses the approved real contact actions', () => {
    render(<ContactFooter />)
    expect(screen.getByRole('link', { name: /2223966318@qq.com/ })).toHaveAttribute(
      'href', 'mailto:2223966318@qq.com',
    )
    expect(screen.getByRole('link', { name: /189 9018 8659/ })).toHaveAttribute(
      'href', 'tel:18990188659',
    )
    expect(screen.getByRole('link', { name: '下载简历' })).toHaveAttribute(
      'href', '/resume/liang-dong-resume.pdf',
    )
  })
})
```

- [ ] **Step 3: Run the focused tests and verify they fail**

Run:

```bash
pnpm test -- src/components/ProfileCapabilities.test.tsx src/components/ContactFooter.test.tsx
```

Expected: FAIL because the three new components do not exist.

- [ ] **Step 4: Implement Profile**

Use a semantic section with one image, one intro region, three real contact links, and a four-item fact rail. The profile sculpture must have alt text identifying it as an abstract identity sculpture, not a portrait.

- [ ] **Step 5: Implement Capabilities**

Render four `<article>` elements with `data-tone` values from `profile.ts`, followed by an ordered method rail. Do not add icons, percentages, or software badges.

- [ ] **Step 6: Implement ContactFooter**

Render:

- `LET'S MAKE / IT MATTER.`
- the approved Chinese invitation
- `AVAILABLE NOW / 可尽快到岗`
- email, phone, and resume rows
- final site navigation
- copyright
- decorative contact ring with empty alt text

- [ ] **Step 7: Compose the complete five-chapter shell in App**

Replace `Manifesto`, `AigcLab`, and `ProfileContact` while keeping the current project and research interfaces until Task 5:

```tsx
<Hero />
<Profile />
<SelectedWork
  onOpen={(project, trigger) => {
    lastTrigger.current = trigger
    setActiveProject(project)
  }}
/>
<ResearchIndex
  onOpen={(report, trigger) => {
    lastTrigger.current = trigger
    setActiveReport(report)
  }}
/>
<Capabilities />
<ContactFooter />
```

Task 5 will move `ResearchIndex` inside `SelectedWork` and rename the project/report callbacks together.

- [ ] **Step 8: Style and compare the three sections**

Implement `profile-capabilities.css` against:

- `design/concepts/v32/02-profile.png`
- `design/concepts/v32/04-capabilities.png`

Implement `contact.css` against `design/concepts/v32/05-contact.png`.

Capture each section at `1700 × 1000`. Fix sculpture crop, headline scale, evidence-rail density, interlocking panel geometry, method-line alignment, cobalt contact field, contact-row density, and ring crop before continuing.

Use these section geometry anchors:

```css
/* appended in src/styles/global.css */
@import './profile-capabilities.css';
@import './contact.css';

.profile {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(28rem, 0.95fr);
  min-height: 100svh;
  background: var(--paper);
}

.profile__facts {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--signal);
}

.capabilities__grid {
  display: grid;
  grid-template-columns: 1.05fr 1.8fr 0.9fr;
  grid-template-rows: repeat(2, minmax(18rem, 1fr));
}

.contact {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  background: linear-gradient(to bottom, var(--cobalt) 0 64%, var(--paper) 64%);
}
```

- [ ] **Step 9: Run tests and commit**

Run:

```bash
pnpm test -- src/components/ProfileCapabilities.test.tsx src/components/ContactFooter.test.tsx src/app/App.test.tsx
pnpm build
```

Then:

```bash
git add src/components/Profile.tsx src/components/Capabilities.tsx src/components/ProfileCapabilities.test.tsx src/components/ContactFooter.tsx src/components/ContactFooter.test.tsx src/styles/profile-capabilities.css src/styles/contact.css src/app/App.tsx
git rm src/components/Manifesto.tsx src/components/AigcLab.tsx src/components/ProfileContact.tsx
git commit -m "feat: add profile capability and contact chapters"
```

---

### Task 5: Rebuild Selected Work and Integrate the Research Rail

**Files:**
- Modify: `src/components/SelectedWork.tsx`
- Modify: `src/components/ResearchIndex.tsx`
- Modify: `src/components/CaseStudyView.tsx`
- Modify: `src/components/ReportDetailView.tsx`
- Create: `src/styles/work-research.css`
- Create: `src/styles/overlays.css`
- Modify: `src/app/App.tsx`
- Modify: `src/app/App.test.tsx`

**Interfaces:**
- `SelectedWork({ onOpenProject, onOpenReport })`.
- `ResearchIndex({ onOpen })` renders as the rail inside SelectedWork.
- Existing `Project`, `Report`, case dialog, report dialog, scroll lock, and focus restoration remain.

- [ ] **Step 1: Update the failing app interaction test**

Add assertions to `App.test.tsx`:

```tsx
expect(screen.getByRole('heading', {
  name: '项目不是陈列，是问题与结果的连接。',
})).toBeInTheDocument()
expect(screen.getAllByRole('button', { name: /查看案例/ })).toHaveLength(3)
expect(screen.getAllByRole('button', { name: /查看报告/ })).toHaveLength(3)
```

Keep the existing focus-restoration test.

- [ ] **Step 2: Run the app test and verify it fails**

Run:

```bash
pnpm test -- src/app/App.test.tsx
```

Expected: FAIL because the new headline and integrated structure do not exist.

- [ ] **Step 3: Simplify SelectedWork to the approved large sequence**

Remove the LIST/GRID toggle. Render all three projects as large, fixed-order panels with:

- index
- title
- role
- metric
- media
- `查看案例`

Pass `onOpenReport` to a nested `ResearchIndex`.

Use this exact public prop contract:

```tsx
type SelectedWorkProps = {
  onOpenProject: (project: Project, trigger: HTMLButtonElement) => void
  onOpenReport: (report: Report, trigger: HTMLButtonElement) => void
}

export function SelectedWork({
  onOpenProject,
  onOpenReport,
}: SelectedWorkProps) {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <header className="section-heading">
        <p className="section-index">02 / SELECTED WORK</p>
        <h2 id="work-title">项目不是陈列，是问题与结果的连接。</h2>
      </header>
      <div className="work__projects">
        {projects.map((project) => (
          <article className="work-card" key={project.id}>
            <MediaWithFallback
              className="work-card__media"
              src={project.media}
              alt={project.mediaAlt}
              fallbackTitle={project.titleEn}
            />
            <span>{project.index}</span>
            <h3>{project.title}</h3>
            <p>{project.role}</p>
            <strong>{project.metric}</strong>
            <button
              type="button"
              aria-label={`查看案例：${project.title}`}
              onClick={(event) => onOpenProject(project, event.currentTarget)}
            >
              查看案例
            </button>
          </article>
        ))}
      </div>
      <ResearchIndex onOpen={onOpenReport} />
    </section>
  )
}
```

- [ ] **Step 4: Keep research as a compact rail**

Render the three reports in one numbered rail below the project sequence. Each button retains its current accessible name and opens `ReportDetailView`.

- [ ] **Step 5: Update App to the new combined callbacks**

Replace the standalone SelectedWork and ResearchIndex calls with:

```tsx
<SelectedWork
  onOpenProject={(project, trigger) => {
    lastTrigger.current = trigger
    setActiveProject(project)
  }}
  onOpenReport={(report, trigger) => {
    lastTrigger.current = trigger
    setActiveReport(report)
  }}
/>
```

- [ ] **Step 6: Apply V3.2 overlay chrome**

Move existing case/report overlay rules into `overlays.css`. Preserve dialog semantics, close button, Escape handling, scroll lock, and focus restoration. Only visual chrome changes.

- [ ] **Step 7: Style and compare the work section**

Implement `work-research.css` against `design/concepts/v32/03-selected-work.png`.

At `1700 × 1000`, verify:

- all three project panels are visible as a cinematic sequence
- project 02 is the dominant active panel
- metrics are large and code-native
- research rail is visible below
- no repeated rounded cards

Use these layout anchors:

```css
/* appended in src/styles/global.css */
@import './work-research.css';
@import './overlays.css';

.work__projects {
  display: grid;
  grid-template-columns: 1.05fr 1fr 0.68fr;
  gap: 0.5rem;
}

.work-card {
  position: relative;
  min-height: clamp(30rem, 56vw, 44rem);
  overflow: hidden;
  border: 1px solid var(--hairline);
}

.research__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--hairline);
}
```

- [ ] **Step 8: Run unit tests and commit**

Run:

```bash
pnpm test -- src/app/App.test.tsx src/data/portfolio.test.ts
pnpm build
```

Then:

```bash
git add src/components/SelectedWork.tsx src/components/ResearchIndex.tsx src/components/CaseStudyView.tsx src/components/ReportDetailView.tsx src/styles/work-research.css src/styles/overlays.css src/app/App.tsx src/app/App.test.tsx
git commit -m "feat: rebuild selected work and research rail"
```

---

### Task 6: Add Motion, Responsive Rules, and Accessibility Safeguards

**Files:**
- Modify: `src/components/MotionProvider.tsx`
- Modify: `src/hooks/useMotionPreference.ts`
- Modify: `src/styles/base.css`
- Modify: all section CSS files
- Modify: `tests/portfolio.spec.ts`

**Interfaces:**
- Existing `useMotionPreference(): boolean` remains the single reduced-motion source.
- CSS uses `.has-motion` only when MotionProvider enables enhanced motion.

- [ ] **Step 1: Add failing E2E coverage**

Extend `tests/portfolio.spec.ts`:

```ts
test('V3.2 sections, media controls and links remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 1700, height: 1000 })
  await page.goto('/')

  await expect(page.getByRole('heading', { name: /make signals matter/i })).toBeVisible()
  await expect(page.getByRole('button', { name: '暂停背景视频' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '三年内容经验，从判断到落地。' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '既能判断方向，也能把它做出来。' })).toBeVisible()
  await expect(page.getByRole('heading', { name: /let's make it matter/i })).toBeVisible()
})
```

Keep and update the mobile overflow test to look for `让内容成为增长资产`.

- [ ] **Step 2: Run E2E and record the failing assertions**

Run:

```bash
pnpm test:e2e
```

Expected before final responsive work: at least the new desktop or mobile assertions fail.

- [ ] **Step 3: Add restrained motion**

Use existing GSAP and Lenis only:

- Hero title: clipped translate reveal.
- Red tracking line: scroll progress scale.
- Profile sculpture: at most 3° parallax rotation.
- Project panels: controlled horizontal translation on wide screens.
- Capability panels: staggered vertical reveal.
- Contact ring: slow rotation.

All enhancements must be skipped when `useMotionPreference()` returns `true`.

Implement the global motion scope in `MotionProvider.tsx`:

```tsx
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const root = useRef<HTMLDivElement>(null)

useGSAP(() => {
  if (reducedMotion) return

  gsap.fromTo(
    '.hero__title span',
    { yPercent: 110 },
    { yPercent: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
  )
  gsap.to('.page-track__progress', {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: '.app', start: 'top top', end: 'bottom bottom', scrub: true },
  })
  gsap.to('.profile__figure img', {
    rotate: 3,
    yPercent: -4,
    ease: 'none',
    scrollTrigger: { trigger: '.profile', start: 'top bottom', end: 'bottom top', scrub: true },
  })
  gsap.to('.contact__ring', {
    rotate: 12,
    ease: 'none',
    scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: true },
  })
}, { scope: root, dependencies: [reducedMotion] })
```

Wrap the children in `<div ref={root} className={reducedMotion ? 'motion-root' : 'motion-root has-motion'}>`.

- [ ] **Step 4: Implement responsive collapse**

At `max-width: 760px`:

- header becomes compact but keeps navigation reachable
- Hero title stays three lines
- video uses poster when reduced motion is active
- Profile becomes one column
- evidence rail becomes two columns, then one where necessary
- Selected Work becomes a vertical list
- Research rail becomes stacked rows
- Capabilities become 01–04 vertical panels
- Contact rows remain full-width
- no element exceeds `100vw`

Use a single shared breakpoint contract across the section files:

```css
@media (max-width: 760px) {
  .site-menu { display: inline-flex; }
  .site-nav {
    position: fixed;
    inset: 4.5rem 0 auto;
    display: none;
    grid-template-columns: 1fr;
    padding: 1.5rem var(--page-gutter);
    background: var(--paper);
    border-bottom: 1px solid var(--hairline);
  }
  .site-nav.is-open { display: grid; }
  .hero { min-height: 100svh; padding-top: 6rem; }
  .hero__title { font-size: clamp(5rem, 24vw, 8rem); }
  .hero__media { inset: 36% -18% 0 28%; }
  .profile { grid-template-columns: 1fr; }
  .profile__facts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .work__projects,
  .research__list,
  .capabilities__grid { grid-template-columns: 1fr; grid-template-rows: auto; }
  .work-card { min-height: 34rem; }
  .contact { background: var(--cobalt); }
  .contact__links { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Verify keyboard and failure paths**

Manually and with Browser/IAB:

- Tab through header, Hero control, cases, reports, contact links.
- Open and close one case and one report with keyboard.
- Press Escape and confirm focus restoration.
- Temporarily replace the Hero video path in DevTools and confirm poster fallback.
- Emulate reduced motion and confirm content is immediately visible.

- [ ] **Step 6: Run all automated checks**

Run:

```bash
pnpm test
pnpm build
pnpm test:e2e
```

Expected: all pass.

- [ ] **Step 7: Commit motion and responsive behavior**

```bash
git add src/components/MotionProvider.tsx src/hooks/useMotionPreference.ts src/styles tests/portfolio.spec.ts
git commit -m "feat: add responsive v3.2 motion system"
```

---

### Task 7: Complete Agency-Signoff Fidelity Verification

**Files:**
- Create: `docs/superpowers/verification/v32-fidelity-ledger.md`
- Modify only files with observed mismatches.

**Interfaces:**
- Consumes all five accepted concepts and the final browser implementation.
- Produces a written ledger of concept evidence, render evidence, and fixes.

- [ ] **Step 1: Capture every section at the design viewport**

Use Browser/IAB at `1700 × 1000`. Capture:

- Hero
- Profile
- Selected Work
- Capabilities
- Contact

Also capture the page at `390 × 844`.

- [ ] **Step 2: Inspect concepts and renders in the same QA pass**

Use `view_image` on:

- each accepted concept in `design/concepts/v32/`
- each corresponding browser screenshot
- the final mobile screenshot

Compare at least:

1. visible copy
2. section composition
3. condensed type scale and line breaks
4. color-role fidelity
5. media treatment and crop
6. red tracking-line continuity
7. next-section visibility
8. responsive collapse

- [ ] **Step 3: Write the fidelity ledger**

Create `docs/superpowers/verification/v32-fidelity-ledger.md` with the heading `# V3.2 Fidelity Ledger` and a table whose columns are `Section`, `Concept evidence`, `Render evidence`, `Mismatch`, and `Fix`. Add exactly five initial rows: Hero, Profile, Selected Work, Capabilities, and Contact. Populate each row with the real screenshot path, the concrete difference observed during Step 2, and the concrete correction applied. Do not write “none” until that image pair has been inspected. Record intentional deviations only when a browser, accessibility, or media constraint makes the concept impractical.

- [ ] **Step 4: Fix every agency-review mismatch**

Prioritize:

- wrong display font or line breaks
- color drift
- default-looking controls
- incorrect media crop
- missing next-section preview
- unintended rounded containers
- desktop or mobile overflow
- inaccessible video/overlay controls

After each fix, recapture only the affected section and update the ledger.

- [ ] **Step 5: Run final checks**

Run:

```bash
pnpm test
pnpm build
pnpm test:e2e
git diff --check
git status --short
```

Expected: tests and build pass, no whitespace errors, and only the intended verification document or final fixes remain.

- [ ] **Step 6: Remove temporary QA artifacts**

Delete scratch screenshots and reports that are not referenced by the final ledger. Keep the five accepted concepts and final production media.

- [ ] **Step 7: Commit final verified fidelity**

```bash
git add src public/assets/v32 tests docs/superpowers/verification/v32-fidelity-ledger.md
git commit -m "fix: complete v3.2 fidelity verification"
```
