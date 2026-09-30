import { publicPath } from './paths'

export type AigcMedia = {
  kind: 'image' | 'video'
  src: string
  alt: string
  caption: string
  label?: string
}

export type AigcDeliverable = {
  title: string
  format: string
  description: string
}

export type AigcProject = {
  id:
    | 'worldcup-copilot'
    | 'hanfu-mirror'
    | 'creator-data-tool'
    | 'ai-history-video'
    | 'football-mbti'
    | 'creative-ai-suite'
    | 'xgimi-aigc-shorts'
  index: string
  title: string
  subtitle: string
  category: string
  summary: string
  problem: string
  workflow: string[]
  collaboration: string
  tools: string[]
  outcomes: string[]
  tone: 'cobalt' | 'signal' | 'teal' | 'citron' | 'ink' | 'silver'
  cover: AigcMedia
  gallery: AigcMedia[]
  deliverables?: AigcDeliverable[]
}

const image = (src: string, alt: string, caption: string): AigcMedia => ({
  kind: 'image',
  src: publicPath(src),
  alt,
  caption,
})

const video = (
  src: string,
  alt: string,
  caption: string,
  label: string,
): AigcMedia => ({
  kind: 'video',
  src: publicPath(src),
  alt,
  caption,
  label,
})

export const aigcProjects: AigcProject[] = [
  {
    id: 'worldcup-copilot',
    index: 'AI.01',
    title: 'WorldCup Copilot',
    subtitle: '体育赛事智能传播助手',
    category: 'AI PRODUCT / CONTENT OPS',
    summary:
      '把赛后查数据、做分析、制图、跨平台改写和风险审核串成一套内容生产工作台，并应用到世界杯内容运营工作流。',
    problem:
      '赛事窗口短，运营需要在多个页面间查数据、判断热点、整理事件、制作图表，再适配 B站、小红书和微博。交接越多，时效、事实与表达风险越容易被放大。',
    workflow: [
      '选择比赛并聚合比赛数据',
      '生成赛后分析与可视化图表',
      '适配 B站专栏、小红书卡片与微博长图',
      '完成事实核验、风险审核与热点提醒',
    ],
    collaboration:
      'AI 负责检索、归纳、初稿和多平台转译；人负责数据复核、热点判断、表达边界和最终发布。',
    tools: [
      'ChatGPT',
      'Claude',
      'Codex',
      'DeepSeek',
      'API-FOOTBALL',
      'Tavily',
    ],
    outcomes: [
      '单份热点日报整理时间由 3 小时压缩至 1 小时',
      '支撑 26 份世界杯热点日报与 50+ 个选题切口',
      '让数据、内容、分发和审核在同一工作台内完成',
    ],
    tone: 'cobalt',
    cover: image(
      '/assets/aigc/worldcup-dashboard.webp',
      'WorldCup Copilot 产品首页',
      '比赛选择、实时数据与赛后内容入口',
    ),
    gallery: [
      image(
        '/assets/aigc/worldcup-analysis.webp',
        'WorldCup Copilot 赛后分析界面',
        '关键事件、技术统计与分析图表',
      ),
      image(
        '/assets/aigc/worldcup-risk.webp',
        'WorldCup Copilot 事实与风险审核界面',
        '事实、表述与平台风险的发布前检查',
      ),
      image(
        '/assets/aigc/worldcup-distribution.webp',
        'WorldCup Copilot 多平台分发界面',
        '同一事实在不同平台中的内容转译',
      ),
    ],
  },
  {
    id: 'hanfu-mirror',
    index: 'AI.02',
    title: '华服镜界 Hanfu Mirror',
    subtitle: '面向海外用户的 AI 汉服影像产品',
    category: 'AI PRODUCT / CULTURE',
    summary:
      '把 AI 汉服写真、文化解释与社交分发连成完整体验，让海外用户不只获得一张东方审美照片，也能理解服饰背后的文化语境。',
    problem:
      '汉服生成容易停留在视觉滤镜：形制不准确、文化信息缺失，生成结果也难以直接变成适合不同海外平台的内容。',
    workflow: [
      '上传照片并选择汉服形制与文化场景',
      '调整姿态、手部、景别与光线',
      '生成结构化提示词与纪实感人物影像',
      '输出中英日文化卡片及社交平台文案',
    ],
    collaboration:
      'AI 负责提示词规划、图像生成、文化信息与平台初稿；人负责文化事实、审美选择、人物一致性和异常结果回退。',
    tools: [
      'DeepSeek',
      'Doubao Seedream 4.5',
      'Codex',
      'Next.js',
      'React',
      'TypeScript',
    ],
    outcomes: [
      '完成从照片上传到海外平台发布的一体化产品原型',
      '支持中、英、日三语文化说明',
      '把审美生成、文化科普和社交传播放进同一条用户路径',
    ],
    tone: 'signal',
    cover: video(
      '/assets/aigc/hanfu-mirror-demo.mp4',
      '华服镜界产品操作演示',
      '从照片、服饰与场景选择到生成结果',
      '华服镜界产品演示视频',
    ),
    gallery: [],
  },
  {
    id: 'creator-data-tool',
    index: 'AI.03',
    title: '达人数据自动提取工具',
    subtitle: '蒲公英及星图创作者数据工作流',
    category: 'AUTOMATION / DATA',
    summary:
      '把达人页面中 10+ 个字段的人工复制，改造成自动识别、批量提取与表格写入的轻量工作流。',
    problem:
      '品牌项目筛选达人时，需要反复记录曝光、互动、粉丝、报价和代表作品。手工复制耗时，也容易出现漏填、错位和口径不一致。',
    workflow: [
      '定义字段清单与目标表格',
      '识别蒲公英及星图页面信息',
      '抽取字段并写入统一数据结构',
      '人工抽检后进入达人筛选与执行表',
    ],
    collaboration:
      '自动化负责识别页面和批量写表；人负责字段口径、异常处理、数据抽检与最终达人判断。',
    tools: ['Codex', '浏览器插件', '表格自动化', '结构化数据'],
    outcomes: [
      '减少跨页面重复复制与整理动作',
      '统一不同达人平台的数据字段',
      '为筛选、比价与项目执行保留可复核的数据底稿',
    ],
    tone: 'teal',
    cover: video(
      '/assets/aigc/creator-data-demo.mp4',
      '达人数据自动提取工具操作演示',
      '页面识别、字段提取与表格写入',
      '达人数据自动提取工具演示视频',
    ),
    gallery: [],
  },
  {
    id: 'ai-history-video',
    index: 'AI.04',
    title: 'AI 历史影像实践',
    subtitle: '《法国真是“42天就投降”吗？》',
    category: 'AI VIDEO / EDITORIAL',
    summary:
      '围绕争议性历史问题，完成从资料核验、脚本与分镜，到地图、数据、字幕、配音和版权记录的可追溯视频生产。',
    problem:
      '历史内容既需要抓住讨论度，也不能牺牲事实。AI 能加快视觉和文案生产，但史料出处、素材授权与叙事判断必须被完整记录。',
    workflow: [
      '从争议问题切入并完成资料核验',
      '拆解 35 个视觉槽位与旁白节奏',
      '制作地图、数据、字幕和动效画面',
      '完成授权、字幕、画面出现与成片验收',
    ],
    collaboration:
      'AI 辅助资料整理、分镜草案、视觉与配音初稿；人负责史实判断、叙事逻辑、素材授权和最终剪辑验收。',
    tools: ['Codex', 'HyperFrames', 'HeyGen', '影像检索', '字幕与音频工具'],
    outcomes: [
      '交付 3分24秒、1920×1080、25fps 的完整视频',
      '完成 35 条字幕与约 -16 LUFS 的响度控制',
      '建立 14 份授权素材记录与画面出现追踪',
    ],
    tone: 'ink',
    cover: image(
      '/assets/aigc/france-contact-sheet.webp',
      '法国战役历史视频画面总览',
      '历史影像、地图、数据与字幕的叙事组合',
    ),
    gallery: [
      image(
        '/assets/aigc/france-motion-graphics.webp',
        '法国战役历史视频动效设计',
        '围绕关键问题设计的信息图与地图动效',
      ),
    ],
  },
  {
    id: 'football-mbti',
    index: 'AI.05',
    title: '球星 MBTI',
    subtitle: '足球人格互动内容',
    category: 'INTERACTIVE / AIGC',
    summary:
      '把球星、球队与比赛角色转译成 16 种足球人格，通过 30 道题、3 个场景和结果卡片，构建可分享的互动内容。',
    problem:
      '球迷互动内容常常只有短期话题性。项目需要同时建立清晰的人格逻辑、答题体验与可被社交传播的视觉结果。',
    workflow: [
      '提炼球员特质与 16 种足球人格',
      '设计 30 道问题和 3 个比赛场景',
      '生成、筛选并统一人物结果卡',
      '实现网页答题、匹配与分享结果',
    ],
    collaboration:
      'AI 辅助人格文案、题目草案与卡片图像；人负责足球语境、人格差异、题目权重和视觉一致性。',
    tools: ['Codex', 'HTML', 'CSS', 'JavaScript', 'AI 图像生成', '图像编辑'],
    outcomes: [
      '完成 16 种足球人格与完整结果体系',
      '形成 30 道问题、3 个场景的互动路径',
      '输出适合社交分享的统一视觉卡片',
    ],
    tone: 'citron',
    cover: image(
      '/assets/aigc/mbti-cards.webp',
      '球星 MBTI 人格卡片',
      '16 种足球人格的角色视觉系统',
    ),
    gallery: [
      image(
        '/assets/aigc/mbti-experience.webp',
        '球星 MBTI 答题体验',
        '问题、场景和选择交互',
      ),
      image(
        '/assets/aigc/mbti-results.webp',
        '球星 MBTI 结果页面',
        '人格匹配、解释与结果分享',
      ),
    ],
  },
  {
    id: 'creative-ai-suite',
    index: 'AI.06',
    title: 'AI 视觉实验室',
    subtitle: '微短剧、平面设计与概念海报',
    category: 'VISUAL / EXPERIMENT',
    summary:
      '围绕角色连续性、风格控制和传播主题，持续测试 AI 在微短剧分镜、平面视觉与世界杯概念海报中的应用边界。',
    problem:
      '单张图像生成不难，真正困难的是让角色、场景、光线、品牌语气和系列画面保持同一套视觉逻辑。',
    workflow: [
      '确定主题、角色与视觉基准',
      '生成场景、构图与分镜方向',
      '筛选并修正人物和风格一致性',
      '按微短剧、平面和海报场景输出',
    ],
    collaboration:
      'AI 负责大量视觉探索与变体生成；人负责创意方向、系列一致性、画面筛选与最终传播语境。',
    tools: ['ChatGPT', 'Midjourney', 'AI 图像生成', '图像编辑', '分镜设计'],
    outcomes: [
      '形成角色设定、场景和连续分镜的微短剧视觉',
      '完成珠宝、戏曲、食物与太空主题平面实验',
      '输出世界杯主题概念海报系列',
    ],
    tone: 'silver',
    cover: image(
      '/assets/aigc/microdrama-storyboard.webp',
      'AI 微短剧连续分镜',
      '角色、场景与镜头连续性实验',
    ),
    gallery: [
      image(
        '/assets/aigc/microdrama-character.webp',
        'AI 微短剧角色设定',
        '人物设定与造型方向',
      ),
      image(
        '/assets/aigc/microdrama-scenes.webp',
        'AI 微短剧场景设计',
        '场景、光线与气氛探索',
      ),
      image(
        '/assets/aigc/design-jewelry.webp',
        'AI 珠宝平面设计',
        '珠宝主题平面视觉实验',
      ),
      image(
        '/assets/aigc/design-opera.webp',
        'AI 戏曲平面设计',
        '传统文化主题视觉实验',
      ),
      image(
        '/assets/aigc/design-food.webp',
        'AI 食物平面设计',
        '食物主题视觉实验',
      ),
      image(
        '/assets/aigc/design-space.webp',
        'AI 太空平面设计',
        '太空主题视觉实验',
      ),
      image(
        '/assets/aigc/poster-worldcup.webp',
        '世界杯主题 AI 概念海报',
        '世界杯主题概念视觉',
      ),
      image(
        '/assets/aigc/poster-football.webp',
        '足球主题 AI 概念海报',
        '足球文化主题概念视觉',
      ),
      image(
        '/assets/aigc/poster-stars.webp',
        '球星主题 AI 概念海报',
        '球星主题概念视觉',
      ),
    ],
  },
  {
    id: 'xgimi-aigc-shorts',
    index: 'AI.07',
    title: 'AIGC 商业短视频实验',
    subtitle: '极米品牌内容场景下的 AI 创意生产实践',
    category: 'AI VIDEO / BRAND CONTENT',
    summary:
      '围绕品牌社媒内容生产，尝试把 AIGC 从“生成画面”推进到“完成可发布成片”：从选题、脚本、角色与镜头设计，到配音、音乐、剪辑与产品信息整合，验证不同内容类型在品牌传播中的适配方式。',
    problem:
      '品牌使用 AIGC 的核心问题并不是“能不能生成”，而是生成内容能否同时满足三个要求：用户愿意看、产品信息能自然进入、最终成片具备稳定的视觉与叙事质量。单纯追求技术效果，往往会让内容失去传播价值。',
    workflow: [
      '从产品卖点与平台内容语境出发，确定选题和传播钩子',
      '把创意拆解为脚本、角色、场景、镜头和信息露出节点',
      '使用 AI 完成视觉与声音素材生产，并针对角色一致性、动作和画面逻辑反复修正',
      '通过人工剪辑、字幕、节奏和信息取舍，将素材收束为可传播的短视频成片',
    ],
    collaboration:
      'AI 更适合承担高频试错和素材生成，人负责决定“什么值得做、什么应该删、产品应该在哪里出现”。项目中我的主要工作不是单次生成，而是持续控制选题方向、叙事节奏、角色一致性与品牌信息密度。',
    tools: ['AI 视频生成', 'AI 图像生成', 'ChatGPT', '剪辑工具', 'AI 音频'],
    outcomes: [
      '完成 4 支不同内容模型的竖版 AIGC 短视频成片',
      '覆盖反差剧情、知识科普、角色视觉和音乐内容，形成可比较的内容样本',
      '完成 1 条品牌主题音频 Demo，打通从声音创意到视频成片的生产链路',
      '沉淀出一套适用于品牌短视频的 AIGC 工作方式：AI 扩大素材供给，人负责策略、筛选与最终表达',
    ],
    deliverables: [
      {
        title: '都末日了，我不装了',
        format: 'STORY-DRIVEN AI SHORT',
        description:
          '以末日反差设定制造强开场，通过剧情推进测试 AI 场景连续性、角色稳定性与短视频叙事节奏。',
      },
      {
        title: '狗狗靠什么认出主人？',
        format: 'KNOWLEDGE-DRIVEN AI SHORT',
        description:
          '从高兴趣科普问题切入，把知识信息转译成视觉化短内容，探索“有用信息 + 轻叙事”在社媒中的表达方式。',
      },
      {
        title: '精彩登场',
        format: 'CHARACTER & VISUAL FILM',
        description:
          '围绕角色登场、动作、景别与氛围建立连续镜头，重点处理 AI 视频中人物一致性与镜头衔接问题。',
      },
      {
        title: '极米投影 · 猫咪音乐短片',
        format: 'BRAND AI MUSIC VIDEO',
        description:
          '把拟人角色、音乐改编与投影产品卖点组合成娱乐化内容，尝试降低品牌信息的硬广感。',
      },
      {
        title: '极米投影 · 音乐 Demo',
        format: 'BRAND AUDIO PROTOTYPE',
        description:
          '围绕产品观看体验与核心卖点制作品牌主题音频，为后续音乐短片提供节奏、歌词和声音方向。',
      },
    ],
    tone: 'signal',
    cover: image(
      '/assets/aigc/xgimi-aigc-shorts.svg',
      'AIGC 商业短视频实验封面',
      '4 支 AI 短视频与 1 条品牌主题音频',
    ),
    gallery: [
      image(
        '/assets/aigc/xgimi-apocalypse.jpg',
        '《都末日了，我不装了》关键帧',
        '反差剧情实验｜用强设定建立短视频开场钩子',
      ),
      image(
        '/assets/aigc/xgimi-dog-recognition.jpg',
        '《狗狗靠什么认出主人？》关键帧',
        '知识内容实验｜把科普信息转译成轻量视觉叙事',
      ),
      image(
        '/assets/aigc/xgimi-grand-entrance.jpg',
        '《精彩登场》关键帧',
        '角色一致性实验｜处理人物、动作与镜头连续性',
      ),
      image(
        '/assets/aigc/xgimi-singing-cats.jpg',
        '极米投影猫咪音乐短片关键帧',
        '品牌音乐内容实验｜将娱乐表达与产品卖点结合',
      ),
      image(
        '/assets/aigc/xgimi-audio-waveform.svg',
        '极米投影音乐 Demo 波形',
        '声音原型｜从品牌卖点到歌词、节奏与音乐表达',
      ),
    ],
  },
]

export function getAigcProject(id: string | null) {
  return aigcProjects.find((project) => project.id === id) ?? null
}

export function getAigcShowcaseUrl(id: AigcProject['id']) {
  return publicPath(`?showcase=${id}`)
}
