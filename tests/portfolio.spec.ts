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
  await page.getByRole('button', { name: '关闭案例' }).click()
  await expect(trigger).toBeFocused()

  await expect(page.getByRole('link', { name: '下载简历' })).toHaveAttribute(
    'href',
    '/resume/liang-dong-resume.pdf',
  )
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
    page.getByRole('button', { name: '暂停背景视频' }),
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

  const playback = page.getByRole('button', { name: '暂停背景视频' })
  await playback.click()
  await expect(
    page.getByRole('button', { name: '播放背景视频' }),
  ).toBeVisible()

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

  const reportTrigger = page.getByRole('button', {
    name: /查看报告：/,
  }).first()
  await reportTrigger.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .toBe('hidden')
  const reportClose = page.getByRole('button', { name: '关闭报告' })
  await expect(reportClose).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(reportClose).toBeFocused()
  await page.keyboard.press('Escape')
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .toBe(initialBodyOverflow)
  await expect(reportTrigger).toBeFocused()

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

test('reduced motion and video failure expose the poster without controls', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect(page.locator('.motion-root')).not.toHaveClass(/\bhas-motion\b/)
  await expect(
    page.getByRole('img', { name: '彩色透明材质动态背景' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: '暂停背景视频' }),
  ).toHaveCount(0)

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.route('**/hero-loop.mp4', (route) => route.abort())
  await page.reload()

  await expect(
    page.getByRole('img', { name: '彩色透明材质动态背景' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: '暂停背景视频' }),
  ).toHaveCount(0)
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
  await expect(
    page.getByRole('img', { name: '彩色透明材质动态背景' }),
  ).toBeVisible()
  await expect(heroLine).not.toHaveAttribute('style', /transform/)
  await expect(profileImage).not.toHaveAttribute('style', /transform/)
  await expect(progress).not.toHaveAttribute('style', /transform/)
  await expect.poll(() => getScrollTriggerCount(page)).toBe(0)

  await page.emulateMedia({ reducedMotion: 'no-preference' })

  await expect(motionRoot).toHaveClass(/\bhas-motion\b/)
  await expect(
    page.getByRole('button', { name: '暂停背景视频' }),
  ).toBeVisible()
  await expect(heroLine).toHaveAttribute('style', /transform/)
  await expect(profileImage).toHaveAttribute('style', /transform/)
  await expect(progress).toHaveAttribute('style', /transform/)
  await expect.poll(() => getScrollTriggerCount(page)).toBe(initialTriggerCount)
})

test('browser Back closes project and report overlays without losing scroll or focus', async ({
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

  const reportTrigger = page.getByRole('button', {
    name: '查看报告：海外美妆人群洞察',
  })
  await reportTrigger.scrollIntoViewIfNeeded()
  const reportScroll = await page.evaluate(() => window.scrollY)
  await reportTrigger.focus()
  await page.keyboard.press('Enter')
  await expect(
    page.getByRole('dialog', { name: '海外美妆人群洞察' }),
  ).toBeVisible()
  await page.goBack()
  await expect(
    page.getByRole('dialog', { name: '海外美妆人群洞察' }),
  ).toHaveCount(0)
  await expect(reportTrigger).toBeFocused()
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBe(reportScroll)
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

test('profile, project and research media failures show code-native covers', async ({
  page,
}) => {
  const failedAssets = new Set([
    'profile-bust.webp',
    'project-world-cup.webp',
    'research-beauty.webp',
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
    '红银色全球信号抽象视觉',
  )

  const researchFallback = page.locator('.research .media-fallback').first()
  await researchFallback.scrollIntoViewIfNeeded()
  await expect(researchFallback).toBeVisible()
  await expect(researchFallback).toHaveAttribute('aria-hidden', 'true')
  await expect(researchFallback).not.toHaveAttribute('role')
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
