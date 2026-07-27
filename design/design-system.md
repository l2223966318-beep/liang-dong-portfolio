# Portfolio Design System

## Direction update

- Light-first palette: warm paper and silver occupy most of the page.
- Deep black is reserved for typography, navigation contrast, and the cinematic work sequence.
- Chrome forms should sit in bright ambient light rather than a dark void.

## Accepted visual references

- `design/concepts/hero.png` — navigation, first viewport, hero typography, hero media treatment, next-section preview.
- `design/concepts/selected-work.png` — work section hierarchy, media scale, list/grid controls, project rows.
- `design/concepts/aigc-lab.png` — silver background, headline scale, workflow anatomy, efficiency annotation.
- `design/concepts/research-profile.png` — report index, hover-cover behavior, signal-red contact finale.

## Above-the-fold copy lock

The first viewport may show only:

- `LD®`
- `WORK`
- `LAB`
- `RESEARCH`
- `PROFILE`
- `OPEN TO WORK`
- `MAKE`
- `SIGNALS`
- `MATTER.`
- `内容策略 × 品牌增长 × AIGC`
- `把复杂的信息，变成值得传播的作品。`
- `CHENGDU · 2026`

No hero CTA, badge, statistic, pretitle, extra introduction, or scroll instruction.

## Color lock

- Hero and Work background: true near-black `#070707`.
- Manifesto and Research background: warm paper `#F1F0EB`.
- AIGC background: cool silver `#C9CBCA`.
- Contact background: signal orange-red `#FF3B1F`.
- Hero and Work text: `#F1F0EB`.
- Light-section text: `#070707`.
- Muted text: `#969792`.
- Hairline on dark: `rgba(255,255,255,.22)`.
- Hairline on light: `rgba(7,7,7,.22)`.

Do not introduce blue, purple, beige, glow, or decorative gradients.

## Typography

- Display: `Arial Narrow`, `Roboto Condensed`, or a legal local condensed sans-serif fallback.
- Content and UI chrome: `Inter`, `Arial`, `Noto Sans SC`, sans-serif.
- Hero display: `clamp(5rem, 11vw, 11rem)`, weight 500–600, line-height `.72–.82`, tracking `-.07em`.
- Section display: `clamp(4rem, 8vw, 8rem)`, weight 500–600, line-height `.82–.9`, tracking `-.055em`.
- Project title: `clamp(1.8rem, 3.2vw, 3.8rem)`.
- UI chrome: `10–13px`, uppercase, tracking `.08–.14em`.
- Body: `15–18px`, line-height `1.55–1.75`, maximum width `720px`.

## Grid and spacing

- Desktop: 12 columns, outer gutter `clamp(20px, 4.5vw, 72px)`.
- Section vertical space: `clamp(88px, 11vw, 176px)`.
- Hairline-separated open bands and rows replace cards.
- Media corners remain square or use at most `4px`.
- Full-width media uses 16:9; portrait media uses 4:5.
- Mobile collapses to one column and removes pointer-follow behavior.

## Media inventory and treatment

- `hero-metal.webp`: hero right-side media, `object-fit: cover`, no color overlay. Use an edge mask only if needed to blend into `#070707`.
- `case-world-cup.webp`: first case full-width 16:9, no overlay.
- `case-overseas-growth.webp`: light case media, no tint or warm filter.
- `case-city-media.webp`: dark case media, no overlay.
- `aigc-metal.webp`: right-side 4:5 media on exact `#C9CBCA`; no tint.
- `report-covers.webp`: sprite sheet; crop each third through `object-position` or background positioning. Add code-native report title above the crop.

If media fails, use a typographic fallback with the same background color and project title.

## Component families

- Quiet header: brand, four anchors, availability status.
- Full-bleed hero and editorial bands.
- Work view switch: plain text `LIST / GRID`, no pill container.
- Project trigger: full-width native button with hairline, title, metric, and arrow.
- Full-screen case/report reader: flat full-viewport layer, no modal card.
- Workflow rail: five numbered nodes on one hairline.
- Research row: index, title, category, arrow; desktop pointer cover, mobile click.
- Contact rail: email, phone, location, resume download.

## Icon inventory

- Project/report arrow: custom SVG, 32×20 desktop and 24×16 mobile, 1.5px `currentColor` stroke, square line caps, no circular container.
- Close icon: custom SVG, 24×24, two 1.5px diagonal strokes, square line caps.
- No icon library is needed.

## Motion

- Smooth scroll: Lenis only when reduced motion is disabled.
- Hero title: clipped upward reveal on load.
- Section titles: restrained vertical offset tied to scroll.
- Media: clip-path reveal; no scale beyond `1.04`.
- Case transition: giant title-mask reveal, 900–1200ms.
- Hover: 180–320ms.
- Reduced motion: direct visibility changes, no smooth scroll or parallax.

## Responsive continuation

- At 1280×800, the hero still reveals the first line of the manifesto below the fold.
- At 390×844, navigation becomes a compact menu button while keeping all four anchors accessible.
- Hero media moves behind/below the title without covering Chinese copy.
- Work rows become stacked media-and-text blocks.
- AIGC workflow becomes a vertical ordered list.
- Report hover cover is removed; click opens the report reader.
