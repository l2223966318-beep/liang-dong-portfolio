export function ProfileContact() {
  return (
    <>
      <section className="profile" id="profile" aria-labelledby="profile-title">
        <p className="section-kicker">PROFILE / LIANG DONG</p>
        <div className="profile__grid">
          <h2 id="profile-title">
            三年内容经验，
            <br />
            从判断到落地。
          </h2>
          <div className="profile__intro">
            <p>
              我关注内容为什么有效：如何发现信号、组织叙事、适配平台，并把创意转化成可衡量的增长。
            </p>
            <p>
              能力覆盖内容策略、新媒体运营、影像制作、品牌研究与 AIGC
              工作流，适合需要“既能想，也能做”的内容与品牌岗位。
            </p>
          </div>
        </div>
        <div className="profile__facts">
          <div><strong>3</strong><span>年内容相关经验</span></div>
          <div><strong>8,000+</strong><span>账号粉丝增长</span></div>
          <div><strong>150+</strong><span>新闻与视频内容</span></div>
          <div><strong>3h→1h</strong><span>AIGC 日报工作流</span></div>
        </div>
      </section>

      <footer className="contact">
        <p className="section-kicker section-kicker--light">CONTACT / AVAILABLE NOW</p>
        <h2>LET&apos;S MAKE<br />IT MATTER.</h2>
        <div className="contact__links">
          <a href="mailto:2223966318@qq.com" aria-label="发送邮件">
            2223966318@qq.com <span>↗</span>
          </a>
          <a href="tel:18990188659">
            189 9018 8659 <span>↗</span>
          </a>
          <a
            href="/resume/liang-dong-resume.pdf"
            aria-label="下载简历"
            download
          >
            下载简历 <span>↓</span>
          </a>
        </div>
        <p className="contact__footer">LIANG DONG © 2026 · CONTENT / BRAND / AIGC</p>
      </footer>
    </>
  )
}
