import { productionMedia } from '../data/media'
import { contact } from '../data/profile'

const footerNavigation = [
  ['回到顶部', '#top'],
  ['项目', '#work'],
  ['AIGC', '#capabilities'],
  ['研究', '#research'],
  ['关于', '#profile'],
] as const

function ArrowIcon() {
  return (
    <svg viewBox="0 0 48 20" aria-hidden="true">
      <path d="M0 10h43M36 3l7 7-7 7" />
    </svg>
  )
}

export function ContactFooter() {
  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <header className="contact__hero">
        <div className="chapter-heading chapter-heading--contact">
          <strong>04<span>.</span></strong>
          <p>/ CONTACT</p>
        </div>
        <h2 id="contact-title">
          <span>LET&apos;S MAKE</span>
          <span>IT MATTER.</span>
        </h2>
        <p className="contact__invitation">
          如果你需要一个既能判断方向，也能推动落地的人，我们可以聊聊。
        </p>
        <p className="contact__availability">AVAILABLE NOW / 可尽快到岗</p>
      </header>

      <img
        className="contact__ring"
        src={productionMedia.contact}
        alt=""
        aria-hidden="true"
      />

      <div className="contact__links">
        <a href={`mailto:${contact.email}`}>
          <span>{contact.email}</span>
          <ArrowIcon />
        </a>
        <a href={`tel:${contact.phone}`}>
          <span>{contact.phoneLabel}</span>
          <ArrowIcon />
        </a>
        <a href={contact.resume} download>
          <span>下载简历</span>
          <ArrowIcon />
        </a>
      </div>

      <div className="contact__footer">
        <nav aria-label="页脚导航">
          {footerNavigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <p>LIANG DONG © 2026 · CONTENT / BRAND / AIGC</p>
      </div>
    </footer>
  )
}
