export type EvidenceItem = {
  index: string
  title: string
  description: string
  evidence: string
  tone: 'cobalt' | 'vermilion' | 'silver' | 'citron'
}

export const profileFacts = [
  { value: '3', label: '年内容相关经验' },
  { value: '8,000+', label: '账号粉丝增长' },
  { value: '150+', label: '新闻与视频内容' },
  { value: '3h → 1h', label: 'AIGC 日报工作流' },
] as const

export const capabilities: EvidenceItem[] = [
  {
    index: '01',
    title: '内容策略',
    description: '从热点、人群与平台语境中发现信号',
    evidence: '26 份热点日报',
    tone: 'cobalt',
  },
  {
    index: '02',
    title: '品牌增长',
    description: '让内容、用户意图与落地体验对齐',
    evidence: '独立站 PV +22%',
    tone: 'vermilion',
  },
  {
    index: '03',
    title: '影像与视觉',
    description: '从脚本、拍摄到剪辑与平面表达',
    evidence: '150+ 新闻与视频内容',
    tone: 'silver',
  },
  {
    index: '04',
    title: 'AIGC 工作流',
    description: '以人工判断为核心重组内容生产流程',
    evidence: '3h → 1h',
    tone: 'citron',
  },
]

export const methodSteps = ['发现信号', '组织叙事', '推动增长'] as const

export const contact = {
  email: '2223966318@qq.com',
  phone: '18990188659',
  phoneLabel: '189 9018 8659',
  resume: '/resume/liang-dong-resume.pdf',
} as const
