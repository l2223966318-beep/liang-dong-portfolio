export type Project = {
  id: 'world-cup' | 'overseas-growth' | 'city-media'
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
  media: string
  mediaAlt: string
}

export type Report = {
  id: 'beauty-audience' | 'world-cup-opportunity' | 'aigc-workflow'
  index: string
  title: string
  category: string
  summary: string
  coverPosition: string
}

export const projects: Project[] = [
  {
    id: 'world-cup',
    index: '01',
    title: '世界杯热点内容系统',
    titleEn: 'World Cup Content System',
    organization: '哔哩哔哩',
    period: '2022',
    role: '内容运营 / 热点策划 / 创作者协同',
    challenge:
      '在高频赛事节奏中，把实时热点、平台语境和创作者供给组织成可持续的内容机制。',
    actions: [
      '搭建赛事热点追踪与日报机制，持续沉淀选题信号。',
      '结合社区语境拆解内容方向，协调 53 位 UP 主参与。',
      '以日报和复盘连接热点判断、创作沟通与内容反馈。',
    ],
    metric: '26 份热点日报',
    supportingMetrics: ['53 位 UP 主协同', '赛事热点内容运营'],
    reflection:
      '热点不只是速度竞争，更重要的是把分散信号转译成创作者能执行、用户愿意参与的内容语言。',
    media: '/assets/case-world-cup.webp',
    mediaAlt: '红银色全球信号抽象视觉',
  },
  {
    id: 'overseas-growth',
    index: '02',
    title: '海外美妆内容增长',
    titleEn: 'Overseas Beauty Growth',
    organization: '海外美妆项目',
    period: '2023',
    role: '内容策略 / 独立站增长 / 用户研究',
    challenge:
      '在跨文化内容场景中，找到品牌信息、目标人群和转化页面之间更清晰的表达路径。',
    actions: [
      '拆解目标人群、内容主题与站内承接关系。',
      '围绕搜索与社媒语境调整内容选题和页面表达。',
      '持续观察访问数据，用结果反推内容优先级。',
    ],
    metric: '独立站 PV +22%',
    supportingMetrics: ['海外用户内容研究', '内容与站点协同'],
    reflection:
      '增长不是堆叠内容数量，而是让内容信号、用户意图与落地体验在同一条链路上对齐。',
    media: '/assets/case-overseas-growth.webp',
    mediaAlt: '银灰与橙红色美妆增长抽象视觉',
  },
  {
    id: 'city-media',
    index: '03',
    title: '城市影像内容生产',
    titleEn: 'City Media Production',
    organization: '德阳广播电视台',
    period: '2021—2022',
    role: '编导 / 新媒体内容 / 影像制作',
    challenge:
      '在新闻时效、商业传播和城市叙事之间建立稳定的影像生产方法。',
    actions: [
      '参与选题、脚本、拍摄、剪辑与多平台发布。',
      '根据不同内容目标组织短视频与专题片叙事。',
      '在高频生产中沉淀可复用的策划与协作流程。',
    ],
    metric: '68 条商业短视频 · 23 部专题片',
    supportingMetrics: ['150+ 新闻与视频', '全流程影像制作'],
    reflection:
      '稳定产出来自结构化判断：先定义传播目标，再决定叙事节奏、画面信息和平台版本。',
    media: '/assets/case-city-media.webp',
    mediaAlt: '城市影像与剪辑时间线抽象视觉',
  },
]

export const reports: Report[] = [
  {
    id: 'beauty-audience',
    index: 'R.01',
    title: '海外美妆人群洞察',
    category: 'Audience / Brand',
    summary:
      '从目标人群、内容触点和购买语境出发，梳理海外美妆内容应该回答的核心问题。',
    coverPosition: '0% 0%',
  },
  {
    id: 'world-cup-opportunity',
    index: 'R.02',
    title: '世界杯内容机会图谱',
    category: 'Trend / Platform',
    summary:
      '把赛事热点、社区情绪与创作者供给放进同一张判断框架，辅助日常选题和协同。',
    coverPosition: '50% 50%',
  },
  {
    id: 'aigc-workflow',
    index: 'R.03',
    title: 'AIGC 内容工作流',
    category: 'AI / Workflow',
    summary:
      '以人工判断为核心，把热点聚合、选题生成、平台化改写和日报整理连接成可审核流程。',
    coverPosition: '100% 100%',
  },
]
