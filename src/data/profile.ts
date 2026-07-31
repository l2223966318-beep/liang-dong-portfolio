import { publicPath } from './paths'

export type EvidenceItem = {
  index: string
  title: string
  description: string
  evidence: string
  tone: 'cobalt' | 'vermilion' | 'silver' | 'citron'
}

export const profileFacts = [
  { value: '3', label: '年媒体内容经验' },
  { value: '+38%', label: '足球区流量环比' },
  { value: '600+', label: '专项稿件评估' },
  { value: '3h → 1h', label: '日报工作流提效' },
] as const

export const capabilities: EvidenceItem[] = [
  {
    index: '01',
    title: '内容策略',
    description: '从事实核验、热度判断到平台化选题',
    evidence: '26 份日报 · 50+ 选题',
    tone: 'cobalt',
  },
  {
    index: '02',
    title: '品牌增长',
    description: '用投放复盘连接品牌 brief、达人和效果',
    evidence: '互动率 3.1% → 4.7%',
    tone: 'vermilion',
  },
  {
    index: '03',
    title: '影像与视觉',
    description: '覆盖策划、脚本、拍摄、剪辑与平面表达',
    evidence: '68 条品牌短视频 · 23 部专题片',
    tone: 'silver',
  },
  {
    index: '04',
    title: 'AIGC 工作流',
    description: '用插件与智能体重组可审核的内容流程',
    evidence: '效率 +60% · 日报 3h → 1h',
    tone: 'citron',
  },
]

export const methodSteps = ['发现信号', '组织叙事', '推动增长'] as const

export const contact = {
  email: '2223966318@qq.com',
  phone: '18990188659',
  phoneLabel: '189 9018 8659',
  resume: publicPath('/resume/梁栋简历-一周内到岗-可实习3-6月.pdf'),
  resumeFileName: '梁栋简历-一周内到岗-可实习3-6月.pdf',
} as const
