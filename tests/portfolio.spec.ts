import { expect, test } from '@playwright/test'

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
  await expect(page.getByText('把复杂的信息，变成值得传播的作品。')).toBeVisible()
})
