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
      '/resume/liang-dong-resume.pdf',
    )
  })
})
