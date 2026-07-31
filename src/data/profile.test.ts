import { describe, expect, it } from 'vitest'

import { capabilities, contact, methodSteps, profileFacts } from './profile'

describe('V3.2 profile data', () => {
  it('uses four resume-backed headline facts', () => {
    expect(profileFacts.map((item) => item.value)).toEqual([
      '3',
      '+38%',
      '600+',
      '3h → 1h',
    ])
  })

  it('connects every capability to a verified outcome', () => {
    expect(capabilities.map((item) => item.title)).toEqual([
      '内容策略',
      '品牌增长',
      '影像与视觉',
      'AIGC 工作流',
    ])
    expect(capabilities.map((item) => item.evidence)).toEqual([
      '26 份日报 · 50+ 选题',
      '互动率 3.1% → 4.7%',
      '68 条品牌短视频 · 23 部专题片',
      '效率 +60% · 日报 3h → 1h',
    ])
    expect(methodSteps).toEqual(['发现信号', '组织叙事', '推动增长'])
  })

  it('keeps the approved real contact values', () => {
    expect(contact.email).toBe('2223966318@qq.com')
    expect(contact.phone).toBe('18990188659')
    expect(contact.resume).toBe('/resume/梁栋简历-一周内到岗-可实习3-6月.pdf')
    expect(contact.resumeFileName).toBe('梁栋简历-一周内到岗-可实习3-6月.pdf')
  })
})
