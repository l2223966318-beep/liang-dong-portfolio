import { productionMedia } from './media'

export type Project = {
  id: 'world-cup' | 'brand-marketing' | 'city-media'
  index: string
  title: string
  titleEn: string
  organization: string
  period: string
  role: string
  challenge: string
  actions: string[]
  metric: string
  supportingMetrics: string[]
  reflection: string
  reflectionDocument?: {
    title: string
    description: string
    href: string
  }
  cover?: string
  coverAlt?: string
  media: string
  mediaAlt: string
  documents?: {
    title: string
    description: string
    href: string
  }[]
  videos?: {
    title: string
    description: string
    cover: string
    href: string
  }[]
}

export type Report = {
  id: 'beauty-audience' | 'world-cup-opportunity' | 'aigc-workflow'
  index: string
  title: string
  category: string
  source: string
  summary: string
  highlights: string[]
  cover: string
  coverPosition: string
}

export const projects: Project[] = [
  {
    id: 'world-cup',
    index: '01',
    title: '世界杯热点内容系统',
    titleEn: 'World Cup Content System',
    organization: '哔哩哔哩（B站）',
    period: '2026.05—至今',
    role: '内容运营 / 热点策划 / 创作者运营 / AIGC',
    challenge:
      '面向 2026 世界杯专项，在高频赛事节奏中同时完成热点判断、创作者协同、稿件评估与推荐跟进。',
    actions: [
      '累计产出 26 份《世界杯热点日报》，建立“事实核验—热度判断—平台适配—跟进动作”的研判流程。',
      '沉淀 50+ 个选题及标题、封面切口，运营 53 位优质 UP 主并评估 600+ 条专项稿件。',
      '搭建 WorldCup Copilot 原型，将单份日报整理时间从 3 小时压缩至 1 小时。',
    ],
    metric: '足球区流量环比 +38%',
    supportingMetrics: [
      '26 份热点日报',
      '600+ 条稿件评估',
      '53 位优质 UP 主',
      '推荐稿件获千万级流量扶持',
    ],
    reflection:
      '热点运营的价值不止是追快，而是把事实、热度和平台语境转译成创作者可执行、推荐机制可承接的内容机会。',
    reflectionDocument: {
      title: '世界杯专项内容运营项目 · 数据与内容总结',
      description: '2,475 条有效记录 · 2,358 篇去重稿件 · DOCX',
      href: '/assets/documents/world-cup-content-summary.docx',
    },
    cover: productionMedia.hero.floatingPosters.worldCup,
    coverAlt: '2026 世界杯足球赛事海报',
    media: productionMedia.projects.worldCup,
    mediaAlt: '红银色全球信号抽象视觉',
    documents: [
      {
        title: '世界杯热点日报 · 07.20',
        description: '决赛日热点直击 · DOCX',
        href: '/assets/documents/world-cup-daily-0720.docx',
      },
      {
        title: '世界杯热点日报 · 06.10',
        description: '开赛前平台监测 · DOCX',
        href: '/assets/documents/world-cup-daily-0610.docx',
      },
    ],
  },
  {
    id: 'brand-marketing',
    index: '02',
    title: '品牌内容营销与投放优化',
    titleEn: 'Brand Content & Performance',
    organization: '新榜 NewRank',
    period: '2026.02—2026.05',
    role: '舆情内容策略 / KOL 投放 / 内容审核 / 数据复盘',
    challenge:
      '面对“Babycare 湿巾含锑”争议，需在极短周期内完成达人投放与内容上线；既要回应母婴用户的安全焦虑，也要保证国标、检测数据与品牌口径经得起逐字核对。',
    actions: [
      '在 4 月 18—23 日完成 20 位达人紧急投放，以“抢时间、抢流量”的节奏承接突发舆情。',
      '将官方声明、第三方检测报告和国标信息转译成可读内容，以“科普辟谣 + 产品种草”双轨回应争议、安抚焦虑。',
      '复盘投放表现与品类声量，并提出差异化人设、母婴用户活跃时段和评论区互动的后续优化方向。',
    ],
    metric: 'CPE 10 → 3.60',
    supportingMetrics: [
      '20 位达人完成投放',
      '80.2 万总曝光',
      '13,700 总互动',
      '4 篇 A 级优质内容',
    ],
    reflection:
      '危机内容的核心不是重复辟谣，而是用可信证据降低焦虑：以权威背书建立信任，再把专业信息翻译成用户能快速理解、愿意讨论的日常决策。',
    reflectionDocument: {
      title: '4 月湿巾舆情营销复盘文档',
      description: '20 位达人 · 80.2 万曝光 · 13,700 互动 · DOCX',
      href: '/assets/documents/wet-wipes-sentiment-review-april.docx',
    },
    media: productionMedia.projects.beauty,
    mediaAlt: '银灰与橙红色美妆增长抽象视觉',
  },
  {
    id: 'city-media',
    index: '03',
    title: '城市影像内容生产',
    titleEn: 'City Media Production',
    organization: '德阳广播电视台',
    period: '2023.04—2025.04',
    role: '内容运营 / 新闻记者 / 编导 / 影像制作',
    challenge:
      '在新闻时效、文旅账号增长、商业传播和城市叙事之间，建立稳定的内容与影像生产方法。',
    actions: [
      '从 0 搭建“旌城文旅”账号并运营至 8,000+ 粉丝，完成 90+ 篇图文新闻和 150+ 条短视频。',
      '独立或协作交付 68 条品牌短视频与 23 部专题片，覆盖策划、脚本、拍摄、剪辑和发布。',
      '参与央视大型晚会品牌宣传支持，在高频生产中沉淀选题与协作流程。',
    ],
    metric: '账号从 0 到 8,000+ 粉丝',
    supportingMetrics: [
      '90+ 篇图文 · 150+ 条短视频',
      '68 条品牌短视频 · 23 部专题片',
      '全流程影像制作',
    ],
    reflection:
      '稳定产出来自结构化判断：先定义传播目标与受众，再决定叙事节奏、画面信息和平台版本。',
    videos: [
      {
        title: '成都在等你',
        description: '城市文旅形象短片 · 视频号',
        cover: '/assets/video-covers/city-video-01.png',
        href: 'https://weixin.qq.com/sph/Aksjjj047x',
      },
      {
        title: '夜游城市叙事',
        description: '夜间文旅氛围短片 · 视频号',
        cover: '/assets/video-covers/city-video-02.png',
        href: 'https://weixin.qq.com/sph/Anw8ed4CII',
      },
      {
        title: '文旅互动现场',
        description: '活动现场内容记录 · 视频号',
        cover: '/assets/video-covers/city-video-03.png',
        href: 'https://weixin.qq.com/sph/AY7V7J1mGY',
      },
      {
        title: 'Wedding Dress Show',
        description: '品牌活动影像 · 视频号',
        cover: '/assets/video-covers/city-video-04.png',
        href: 'https://weixin.qq.com/sph/Ag1I0qR6qp',
      },
      {
        title: '川菜人物短片',
        description: '城市美食内容 · 视频号',
        cover: '/assets/video-covers/city-video-05.png',
        href: 'https://weixin.qq.com/sph/AnK4NwAoh1',
      },
    ],
    media: productionMedia.projects.city,
    mediaAlt: '城市影像与剪辑时间线抽象视觉',
  },
]

export const reports: Report[] = [
  {
    id: 'beauty-audience',
    index: 'R.01',
    title: '海外美妆人群洞察',
    category: 'Audience / Brand',
    source: '深圳易威行 · 海外增长运营',
    summary:
      '基于海外美妆品类竞品、用户画像与社媒内容表现，梳理品牌定位、内容触点和独立站承接之间的关系。',
    highlights: [
      '独立站落地页 PV +22%',
      '海外社媒互动量 +15%',
      '合作内容覆盖 12 万+',
      '带来新增 UV 3,000+',
    ],
    cover: productionMedia.research.beauty,
    coverPosition: '0% 0%',
  },
  {
    id: 'world-cup-opportunity',
    index: 'R.02',
    title: '世界杯内容机会图谱',
    category: 'Trend / Platform',
    source: '哔哩哔哩 · 世界杯专项',
    summary:
      '把事实核验、赛事热点、社区情绪、创作者供给和推荐反馈放进同一套判断框架，辅助选题与协同。',
    highlights: [
      '26 份世界杯热点日报',
      '50+ 个选题与包装切口',
      '53 位优质 UP 主',
      '600+ 条专项稿件评估',
    ],
    cover: productionMedia.research.worldCup,
    coverPosition: '50% 50%',
  },
  {
    id: 'aigc-workflow',
    index: 'R.03',
    title: 'AIGC 内容工作流',
    category: 'AI / Workflow',
    source: 'B站 × 新榜 · AI 工作流实践',
    summary:
      '以人工判断为核心，把热点聚合、选题生成、平台化改写、内容审核和日报整理连接成可追溯流程。',
    highlights: [
      'WorldCup Copilot 原型',
      '单份日报 3 小时 → 1 小时',
      '浏览器插件与智能体',
      '内容工作效率提升 60%',
    ],
    cover: productionMedia.research.aigc,
    coverPosition: '100% 100%',
  },
]
