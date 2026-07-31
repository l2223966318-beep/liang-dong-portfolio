import { publicPath } from './paths'

export const productionMedia = {
  hero: {
    video: publicPath('/assets/v32/hero-loop.mp4'),
    poster: publicPath('/assets/v32/hero-poster.webp'),
    floatingPosters: {
      worldCup: publicPath('/assets/aigc/poster-worldcup.webp'),
      opera: publicPath('/assets/aigc/design-opera.webp'),
      jewelry: publicPath('/assets/aigc/design-jewelry.webp'),
      food: publicPath('/assets/aigc/design-food.webp'),
      space: publicPath('/assets/aigc/design-space.webp'),
    },
  },
  profile: publicPath('/assets/v32/profile-bust.webp'),
  projects: {
    worldCup: publicPath('/assets/v32/project-world-cup.webp'),
    beauty: publicPath('/assets/v32/project-beauty.webp'),
    city: publicPath('/assets/v32/project-city.webp'),
  },
  research: {
    beauty: publicPath('/assets/v32/research-beauty.webp'),
    worldCup: publicPath('/assets/v32/research-world-cup.webp'),
    aigc: publicPath('/assets/v32/research-aigc.webp'),
  },
  capabilities: {
    aigc: publicPath('/assets/v32/capability-aigc.webp'),
  },
  contact: publicPath('/assets/v32/contact-ring.webp'),
} as const
