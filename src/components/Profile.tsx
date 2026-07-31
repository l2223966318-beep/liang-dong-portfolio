import { productionMedia } from '../data/media'
import { contact } from '../data/profile'
import { MediaWithFallback } from './MediaWithFallback'

function ContactIcon({ type }: { type: 'email' | 'phone' | 'resume' }) {
  if (type === 'email') {
    return (
      <svg viewBox="0 0 32 24" aria-hidden="true">
        <rect x="1" y="1" width="30" height="22" />
        <path d="m2 3 14 11L30 3" />
      </svg>
    )
  }

  if (type === 'phone') {
    return (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M6.4 2.5 11 8.1 8.2 11c1.8 3.8 4.8 6.8 8.6 8.6l2.9-2.8 5.7 4.6-2.4 3.8c-.8 1.2-2.3 1.7-3.7 1.2C10 23.3 3.1 16.4.1 7.2-.4 5.8.1 4.3 1.3 3.5Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 28 32" aria-hidden="true">
      <path d="M14 1v20M8 15l6 6 6-6M3 25v5h22v-5" />
    </svg>
  )
}

export function Profile() {
  return (
    <section className="profile" id="profile" aria-labelledby="profile-title">
      <div className="profile__content">
        <header className="chapter-heading chapter-heading--profile">
          <strong>01<span>.</span></strong>
          <p>/ PROFILE</p>
        </header>

        <div
          className="profile__education"
          aria-label="学历：西南财经大学新闻与传播硕士，GPA 3.6/4，2027届，广告学学士"
        >
          <strong className="profile__education-label">EDUCATION</strong>
          <div className="profile__education-body">
            <p className="profile__education-degree">
              <strong>西南财经大学</strong>
              <span>新闻与传播硕士</span>
            </p>
            <p className="profile__education-meta">
              <span>GPA 3.6/4</span>
              <i aria-hidden="true" />
              <span>2027届</span>
              <i aria-hidden="true" />
              <span>广告学学士</span>
            </p>
          </div>
        </div>

        <h2 id="profile-title" aria-label="三年内容经验，从判断到落地。">
          <span>三年内容经验，</span>
          <span>从判断到落地。</span>
        </h2>
        <p className="profile__statement">
          THINK <span>/</span> MAKE <span>/</span> GROW
        </p>
        <p className="profile__scope">
          B站专项 <i>·</i> 品牌营销 <i>·</i> 海外增长 <i>·</i> 影像制作{' '}
          <i>·</i> AIGC
        </p>

        <div className="profile__contact" aria-label="联系梁栋">
          <a href={`mailto:${contact.email}`} aria-label="发送邮件">
            <ContactIcon type="email" />
            <span>
              <small>EMAIL</small>
              {contact.email}
            </span>
          </a>
          <a href={`tel:${contact.phone}`} aria-label={`致电 ${contact.phoneLabel}`}>
            <ContactIcon type="phone" />
            <span>
              <small>PHONE</small>
              {contact.phoneLabel}
            </span>
          </a>
          <a
            href={contact.resume}
            download={contact.resumeFileName}
            aria-label="下载 PDF 简历"
          >
            <ContactIcon type="resume" />
            <span>下载简历</span>
          </a>
        </div>
      </div>

      <div className="profile__visual">
        <MediaWithFallback
          src={productionMedia.profile}
          alt="由透明晶体切面构成的抽象身份雕塑"
          fallbackTitle="LIANG DONG"
          fallbackMark="PROFILE / 01"
          tone="cobalt"
          variant="identity"
        />
        <p aria-hidden="true">
          <span>CHENGDU</span> · <span>2026</span>
        </p>
      </div>
    </section>
  )
}
