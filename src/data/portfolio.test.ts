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

  it('uses the V3.2 production media for projects and research covers', () => {
    expect(projects.map((item) => item.media)).toEqual([
      '/assets/v32/project-world-cup.webp',
      '/assets/v32/project-beauty.webp',
      '/assets/v32/project-city.webp',
    ])
    expect(reports.map((item) => item.cover)).toEqual([
      '/assets/v32/research-beauty.webp',
      '/assets/v32/research-world-cup.webp',
      '/assets/v32/research-aigc.webp',
    ])
  })
})
