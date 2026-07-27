import { describe, expect, it } from 'vitest'

import { projects, reports } from './portfolio'

describe('portfolio content', () => {
  it('keeps project identifiers unique and resume-backed metrics intact', () => {
    expect(new Set(projects.map((item) => item.id)).size).toBe(projects.length)
    expect(projects.map((item) => item.metric)).toEqual([
      '26 份热点日报',
      '独立站 PV +22%',
      '68 条商业短视频 · 23 部专题片',
    ])
  })

  it('provides three distinct research entries', () => {
    expect(new Set(reports.map((item) => item.id)).size).toBe(3)
    expect(reports).toHaveLength(3)
  })
})
