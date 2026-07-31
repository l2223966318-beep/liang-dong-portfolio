import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ContactFooter } from './ContactFooter'

describe('ContactFooter', () => {
  it('uses the approved real contact actions', () => {
    render(<ContactFooter />)

    expect(
      screen.getByRole('link', { name: /2223966318@qq.com/ }),
    ).toHaveAttribute('href', 'mailto:2223966318@qq.com')
    expect(screen.getByRole('link', { name: /189 9018 8659/ })).toHaveAttribute(
      'href',
      'tel:18990188659',
    )
    expect(screen.getByRole('link', { name: '下载简历' })).toHaveAttribute(
      'href',
      '/resume/梁栋简历-一周内到岗-可实习3-6月.pdf',
    )
    expect(screen.getByRole('link', { name: '下载简历' })).toHaveAttribute(
      'download',
      '梁栋简历-一周内到岗-可实习3-6月.pdf',
    )
  })

  it('shows the approved circular up-arrow without changing the link name', () => {
    render(<ContactFooter />)

    const backToTop = screen.getByRole('link', { name: '回到顶部' })
    expect(backToTop).toHaveAttribute('href', '#top')
    expect(
      backToTop.querySelector('.contact__back-top-icon'),
    ).toHaveAttribute('aria-hidden', 'true')
  })
})
