import { describe, expect, it } from 'vitest'

import { projects, reports } from './portfolio'

describe('portfolio content', () => {
  it('keeps project identifiers unique and resume-backed metrics intact', () => {
    expect(new Set(projects.map((item) => item.id)).size).toBe(projects.length)
    expect(projects.map((item) => item.organization)).toEqual([
      '哔哩哔哩（B站）',
      '新榜 NewRank',
      '德阳广播电视台',
    ])
    expect(projects.map((item) => item.period)).toEqual([
      '2026.05—至今',
      '2026.02—2026.05',
      '2023.04—2025.04',
    ])
    expect(projects.map((item) => item.metric)).toEqual([
      '足球区流量环比 +38%',
      'CPE 10 → 3.60',
      '账号从 0 到 8,000+ 粉丝',
    ])
  })

  it('provides three distinct research entries with source experience', () => {
    expect(new Set(reports.map((item) => item.id)).size).toBe(3)
    expect(reports).toHaveLength(3)
    expect(reports.map((item) => item.source)).toEqual([
      '深圳易威行 · 海外增长运营',
      '哔哩哔哩 · 世界杯专项',
      'B站 × 新榜 · AI 工作流实践',
    ])
    expect(reports.every((item) => item.highlights.length >= 3)).toBe(true)
  })

  it('uses the V3.2 production media for projects and research covers', () => {
    expect(projects.map((item) => item.media)).toEqual([
      '/assets/v32/project-world-cup.webp',
      '/assets/v32/project-beauty.webp',
      '/assets/v32/project-city.webp',
    ])
    expect(projects[0].cover).toBe('/assets/aigc/poster-worldcup.webp')
    expect(reports.map((item) => item.cover)).toEqual([
      '/assets/v32/research-beauty.webp',
      '/assets/v32/research-world-cup.webp',
      '/assets/v32/research-aigc.webp',
    ])
  })
})
