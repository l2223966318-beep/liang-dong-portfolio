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
