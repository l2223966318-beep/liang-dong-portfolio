import { expect, test, type Page } from '@playwright/test'

async function getScrollTriggerCount(page: Page) {
  return page.evaluate(async () => {
    const resource = performance
      .getEntriesByType('resource')
      .map((entry) => entry.name)
      .find((name) => name.includes('gsap_ScrollTrigger'))

    if (!resource) throw new Error('ScrollTrigger module resource was not loaded')

    const loaded = await import(/* @vite-ignore */ resource)
    const scrollTrigger =
      loaded.ScrollTrigger ?? loaded.default?.ScrollTrigger ?? loaded.default

    return scrollTrigger.getAll().length as number
  })
}

test('recruiter can inspect a project and reach the resume', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: /make signals matter/i }),
  ).toBeVisible()

  const trigger = page.getByRole('button', {
    name: '查看案例：世界杯热点内容系统',
  })
  await trigger.click()
  await expect(
    page.getByRole('dialog', { name: '世界杯热点内容系统' }),
  ).toBeVisible()
  await expect(
    page.getByRole('link', {
      name: '下载热点日报：世界杯热点日报 · 07.20',
    }),
  ).toHaveAttribute('href', '/assets/documents/world-cup-daily-0720.docx')
  await expect(
    page.getByRole('link', {
      name: '下载热点日报：世界杯热点日报 · 06.10',
    }),
  ).toHaveAttribute('href', '/assets/documents/world-cup-daily-0610.docx')
  await expect(
    page.getByRole('link', {
      name: '下载总结：世界杯专项内容运营项目 · 数据与内容总结',
    }),
  ).toHaveAttribute('href', '/assets/documents/world-cup-content-summary.docx')
  await page.getByRole('button', { name: '关闭案例' }).click()
  await expect(trigger).toBeFocused()

  const brandTrigger = page.getByRole('button', {
    name: '查看案例：品牌内容营销与投放优化',
  })
  await brandTrigger.click()
  await expect(
    page.getByRole('link', {
      name: '下载总结：4 月湿巾舆情营销复盘文档',
    }),
  ).toHaveAttribute(
    'href',
    '/assets/documents/wet-wipes-sentiment-review-april.docx',
  )
  await page.getByRole('button', { name: '关闭案例' }).click()

  await expect(page.getByRole('link', { name: '下载简历' })).toHaveAttribute(
    'href',
    '/resume/liang-dong-resume.pdf',
  )
})

test('世界杯案例在手机端保留日报下载入口', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const trigger = page.getByRole('button', {
    name: '查看案例：世界杯热点内容系统',
  })
  await trigger.scrollIntoViewIfNeeded()
  await trigger.click()

  const dailyReport = page.getByRole('link', {
    name: '下载热点日报：世界杯热点日报 · 07.20',
  })
  await dailyReport.scrollIntoViewIfNeeded()
  await expect(dailyReport).toBeVisible()

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))
  expect(dimensions.scrollWidth).toBe(dimensions.clientWidth)
})

test('城市影像案例提供视频号作品入口', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const trigger = page.getByRole('button', {
    name: '查看案例：城市影像内容生产',
  })
  await trigger.scrollIntoViewIfNeeded()
  await trigger.click()

  const videoLink = page.getByRole('link', {
    name: '在微信视频号打开：成都在等你',
  })
  await videoLink.scrollIntoViewIfNeeded()
  await expect(videoLink).toBeVisible()
  await expect(videoLink).toHaveAttribute(
    'href',
    'https://weixin.qq.com/sph/Aksjjj047x',
  )
  await expect(videoLink).toHaveAttribute('target', '_blank')

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))
  expect(dimensions.scrollWidth).toBe(dimensions.clientWidth)
})

test('AI work opens a shareable showcase and browser Back returns to the portfolio', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const showcase = page.getByRole('link', {
    name: '查看AI案例：WorldCup Copilot',
  })
  await showcase.scrollIntoViewIfNeeded()
  await showcase.click()

  await expect(page).toHaveURL('/?showcase=worldcup-copilot')
  await expect(
    page.getByRole('heading', { name: 'WorldCup Copilot' }),
  ).toBeVisible()
  await expect(
    page.getByRole('img', { name: 'WorldCup Copilot 产品首页' }),
  ).toBeVisible()

  const detailDimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))
  expect(detailDimensions.scrollWidth).toBe(detailDimensions.clientWidth)

  await page.goBack()
  await expect(
    page.getByRole('heading', { name: '把 AI 变成可以工作的产品。' }),
  ).toBeVisible()
})

test('V3.2 sections, media controls and links remain usable', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1700, height: 1000 })
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: /make signals matter/i }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: '暂停背景动画' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: '三年内容经验，从判断到落地。' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: '既能判断方向，也能把它做出来。' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: /let's make it matter/i }),
  ).toBeVisible()

  const playback = page.getByRole('button', { name: '暂停背景动画' })
  await playback.click()
  await expect(
    page.getByRole('button', { name: '播放背景动画' }),
  ).toBeVisible()
  await expect(page.locator('.hero-signal')).toHaveAttribute(
    'data-paused',
    'true',
  )

  const caseTrigger = page.getByRole('button', {
    name: '查看案例：世界杯热点内容系统',
  })
  const initialBodyOverflow = await page.evaluate(
    () => document.body.style.overflow,
  )
  await caseTrigger.focus()
  await page.keyboard.press('Enter')
  await expect(
    page.getByRole('dialog', { name: '世界杯热点内容系统' }),
  ).toBeVisible()
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .toBe('hidden')
  const caseClose = page.getByRole('button', { name: '关闭案例' })
  await expect(caseClose).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(caseClose).toBeFocused()
  await page.keyboard.press('Escape')
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .toBe(initialBodyOverflow)
  await expect(caseTrigger).toBeFocused()

  await expect(page.getByRole('link', { name: '下载简历' }).last()).toHaveAttribute(
    'href',
    '/resume/liang-dong-resume.pdf',
  )
  await expect(page.locator('.motion-root')).toHaveClass(/\bhas-motion\b/)
})

test('mobile first viewport stays readable without horizontal overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))

  expect(dimensions.scrollWidth).toBe(dimensions.clientWidth)
  await expect(page.getByText('让内容成为增长资产')).toBeVisible()

  const menu = page.locator('.site-menu')
  await menu.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('navigation', { name: '作品集主导航' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'AIGC', exact: true }).first()).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('navigation', { name: '作品集主导航' })).toBeHidden()
  await expect(menu).toBeFocused()

  const footerNavigation = page.getByRole('navigation', { name: '页脚导航' })
  await footerNavigation.scrollIntoViewIfNeeded()
  for (const name of ['回到顶部', '项目', 'AIGC', '研究', '关于']) {
    await expect(
      footerNavigation.getByRole('link', { name, exact: true }),
    ).toBeVisible()
  }
})

test('Hero editorial block keeps its metadata and action aligned without overflow', async ({
  page,
}) => {
  for (const viewport of [
    { width: 1227, height: 624 },
    { width: 1700, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('/')

    const hero = page.locator('.hero')
    const place = hero.getByText('LIANG DONG · 2026', { exact: true })
    const action = hero.getByRole('link', { name: '查看项目', exact: true })
    await expect(place).toBeVisible()
    await expect(action).toBeVisible()

    const layout = await page.evaluate(() => {
      const position = document.querySelector('.hero__position')!
      const next = document.querySelector('.hero__next')
      const place = document.querySelector('.hero__place')!
      const action = position.querySelector('a[href="#work"]')!
      const positionRect = position.getBoundingClientRect()
      const nextRect = next?.getBoundingClientRect()
      const placeRect = place.getBoundingClientRect()
      const actionRect = action.getBoundingClientRect()

      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        positionRight: positionRect.right,
        positionBottom: positionRect.bottom,
        nextTop:
          nextRect && nextRect.height > 0 ? nextRect.top : window.innerHeight,
        footerCenterDelta: Math.abs(
          (placeRect.top + placeRect.bottom) / 2 -
            (actionRect.top + actionRect.bottom) / 2,
        ),
      }
    })

    expect(layout.scrollWidth, `${viewport.width}×${viewport.height}`).toBe(
      layout.clientWidth,
    )
    expect(
      layout.positionRight,
      `${viewport.width}×${viewport.height}`,
    ).toBeLessThanOrEqual(layout.clientWidth)
    expect(
      layout.positionBottom,
      `${viewport.width}×${viewport.height}`,
    ).toBeLessThanOrEqual(layout.nextTop)
    expect(
      layout.footerCenterDelta,
      `${viewport.width}×${viewport.height}`,
    ).toBeLessThanOrEqual(12)
  }
})

test('desktop profile fills the viewport without evidence cards', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1536, height: 624 })
  await page.goto('/#profile')

  await expect(
    page.getByText(/2027 届西南财经大学新闻与传播硕士/),
  ).toHaveCount(0)
  await expect(page.getByText('EDUCATION')).toBeVisible()
  await expect(
    page.locator('.profile__education'),
  ).toHaveAttribute('aria-label', /西南财经大学新闻与传播硕士/)
  await expect(
    page.getByText('西南财经大学', { exact: true }),
  ).toBeVisible()
  await expect(page.locator('.profile__facts')).toHaveCount(0)
  await expect(page.locator('.section-track--profile')).toHaveCount(0)

  const layout = await page.evaluate(() => {
    const profile = document.querySelector('.profile')!
    const content = document.querySelector('.profile__content')!
    const visual = document.querySelector('.profile__visual')!
    const profileRect = profile.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()
    const visualRect = visual.getBoundingClientRect()
    const visibleChildren = Array.from(content.children).filter(
      (element) => getComputedStyle(element).display !== 'none',
    )
    const gaps = visibleChildren.slice(1).map((element, index) => {
      const previous = visibleChildren[index]
      return (
        element.getBoundingClientRect().top -
        previous.getBoundingClientRect().bottom
      )
    })

    return {
      profileHeight: profileRect.height,
      contentHeight: contentRect.height,
      visualHeight: visualRect.height,
      smallestGap: Math.min(...gaps),
      largestGap: Math.max(...gaps),
    }
  })

  expect(layout.profileHeight).toBe(624)
  expect(layout.contentHeight).toBe(layout.profileHeight)
  expect(layout.visualHeight).toBe(layout.profileHeight)
  expect(layout.smallestGap).toBeGreaterThan(12)
  expect(layout.largestGap - layout.smallestGap).toBeLessThanOrEqual(1)
})

test('reduced motion freezes the signal background without controls', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect(page.locator('.motion-root')).not.toHaveClass(/\bhas-motion\b/)
  await expect(page.locator('.hero-signal__frame')).toHaveCount(5)
  await expect(page.locator('.hero-signal')).toHaveAttribute(
    'data-paused',
    'true',
  )
  await expect(
    page.getByRole('button', { name: '暂停背景动画' }),
  ).toHaveCount(0)

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.reload()

  await expect(page.locator('.hero-signal')).toHaveAttribute(
    'data-paused',
    'false',
  )
  await expect(
    page.getByRole('button', { name: '暂停背景动画' }),
  ).toBeVisible()
})

test('runtime motion preference changes clean up and rebuild enhancements', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')

  const motionRoot = page.locator('.motion-root')
  const heroLine = page.locator('.hero__title span').first()
  const profileImage = page.locator('.profile__visual img')
  const progress = page.locator('.page-track__progress')

  await expect(motionRoot).toHaveClass(/\bhas-motion\b/)
  await expect(heroLine).toHaveAttribute('style', /transform/)
  await expect(profileImage).toHaveAttribute('style', /transform/)
  const initialTriggerCount = await getScrollTriggerCount(page)
  expect(initialTriggerCount).toBeGreaterThan(0)

  await page.emulateMedia({ reducedMotion: 'reduce' })

  await expect(motionRoot).not.toHaveClass(/\bhas-motion\b/)
  await expect(page.locator('.hero-signal')).toHaveAttribute(
    'data-paused',
    'true',
  )
  await expect(
    page.getByRole('button', { name: '暂停背景动画' }),
  ).toHaveCount(0)
  await expect(heroLine).not.toHaveAttribute('style', /transform/)
  await expect(profileImage).not.toHaveAttribute('style', /transform/)
  await expect(progress).not.toHaveAttribute('style', /transform/)
  await expect.poll(() => getScrollTriggerCount(page)).toBe(0)

  await page.emulateMedia({ reducedMotion: 'no-preference' })

  await expect(motionRoot).toHaveClass(/\bhas-motion\b/)
  await expect(
    page.getByRole('button', { name: '暂停背景动画' }),
  ).toBeVisible()
  await expect(heroLine).toHaveAttribute('style', /transform/)
  await expect(profileImage).toHaveAttribute('style', /transform/)
  await expect(progress).toHaveAttribute('style', /transform/)
  await expect.poll(() => getScrollTriggerCount(page)).toBe(initialTriggerCount)
})

test('browser Back closes project overlays without losing scroll or focus', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')

  const projectTrigger = page.getByRole('button', {
    name: '查看案例：世界杯热点内容系统',
  })
  await projectTrigger.scrollIntoViewIfNeeded()
  const projectScroll = await page.evaluate(() => window.scrollY)
  await projectTrigger.focus()
  await page.keyboard.press('Enter')
  await expect(
    page.getByRole('dialog', { name: '世界杯热点内容系统' }),
  ).toBeVisible()
  await page.goBack()
  await expect(
    page.getByRole('dialog', { name: '世界杯热点内容系统' }),
  ).toHaveCount(0)
  await expect(projectTrigger).toBeFocused()
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBe(projectScroll)

})

test('mobile menu isolates focus and restores scroll after Escape', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('heading', {
    name: '项目不是陈列，是问题与结果的连接。',
  }).scrollIntoViewIfNeeded()
  const scrollBeforeMenu = await page.evaluate(() => window.scrollY)

  const menu = page.locator('.site-menu')
  await menu.click()
  await expect(page.getByRole('link', { name: '项目', exact: true }).first()).toBeFocused()
  await expect
    .poll(() =>
      page.evaluate(() => ({
        overflow: document.body.style.overflow,
        position: document.body.style.position,
      })),
    )
    .toEqual({ overflow: 'hidden', position: 'fixed' })
  await expect(page.locator('.site-content')).toHaveAttribute('inert', '')

  await page.keyboard.press('Shift+Tab')
  await expect(menu).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: '项目', exact: true }).first()).toBeFocused()
  await page.keyboard.press('Escape')

  await expect(menu).toBeFocused()
  await expect(page.locator('.site-content')).not.toHaveAttribute('inert')
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBe(scrollBeforeMenu)
})

test('profile and project media failures show code-native covers', async ({
  page,
}) => {
  const failedAssets = new Set([
    'profile-bust.webp',
    'project-beauty.webp',
  ])
  await page.route('**/assets/v32/*.webp', async (route) => {
    const fileName = new URL(route.request().url()).pathname.split('/').at(-1)
    if (fileName && failedAssets.has(fileName)) await route.abort()
    else await route.continue()
  })
  await page.goto('/')

  const profileFallback = page.locator('.profile .media-fallback')
  await profileFallback.scrollIntoViewIfNeeded()
  await expect(profileFallback).toBeVisible()
  await expect(profileFallback).toHaveAttribute(
    'aria-label',
    '由透明晶体切面构成的抽象身份雕塑',
  )

  const projectFallback = page.locator('.work-card .media-fallback').first()
  await projectFallback.scrollIntoViewIfNeeded()
  await expect(projectFallback).toBeVisible()
  await expect(projectFallback).toHaveAttribute(
    'aria-label',
    '银灰与橙红色美妆增长抽象视觉',
  )
})

test('Selected Work controls update active project without hiding the sequence', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1700, height: 1000 })
  await page.goto('/')

  const projects = page.locator('.work-card')
  await expect(projects).toHaveCount(3)
  await expect(projects.nth(1)).toHaveAttribute('aria-current', 'true')
  await expect(page.getByText('02 / 03')).toBeVisible()

  await page.getByRole('button', { name: '下一个项目' }).click()
  await expect(projects.nth(2)).toHaveAttribute('aria-current', 'true')
  await expect(projects).toHaveCount(3)

  const sequence = page.getByRole('group', { name: '项目选择' })
  await sequence.focus()
  await page.keyboard.press('ArrowLeft')
  await expect(projects.nth(1)).toHaveAttribute('aria-current', 'true')
})

test('approved viewports have no console errors, broken images or horizontal overflow', async ({
  page,
}) => {
  const consoleErrors: string[] = []
  const pageErrors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))

  for (const viewport of [
    { width: 1700, height: 1000 },
    { width: 1440, height: 900 },
    { width: 1280, height: 800 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const health = await page.evaluate(() => ({
      brokenImages: Array.from(document.images)
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src),
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }))

    expect(health.brokenImages, `${viewport.width}×${viewport.height}`).toEqual([])
    expect(health.scrollWidth, `${viewport.width}×${viewport.height}`).toBeLessThanOrEqual(
      health.clientWidth,
    )
  }

  expect(consoleErrors).toEqual([])
  expect(pageErrors).toEqual([])
})
