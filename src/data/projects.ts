// Internal projects are hosted under /projects/<slug> on the same Netlify site.
// External projects open in a new tab.

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  /** Internal path (e.g. /projects/chatgpt-dashboard) or external URL */
  href: string
  /** If true, opens in new tab and href is full URL */
  external?: boolean
  /** Optional: path to thumbnail under public/ */
  thumbnail?: string
}

export const projects: Project[] = [
  // —— Internal (hosted alongside this site at /projects/...) ——
  {
    id: 'chatgpt-dashboard',
    title: 'ChatGPT Enablement Dashboard',
    description: 'Executive dashboard for adoption, engagement, and Office Hours analytics. KPIs, opportunity finder, topic extraction, presentation mode.',
    tech: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Recharts'],
    href: '/projects/chatgpt-dashboard/',
  },
  {
    id: 'github-copilot-dashboard',
    title: 'GitHub Copilot Metrics Dashboard',
    description: 'Copilot usage and adoption metrics across teams. License utilization, activity trends, and adoption analytics.',
    tech: ['React', 'Vite', 'TypeScript', 'Recharts', 'Zustand'],
    href: '/projects/github-copilot-dashboard/',
  },
  {
    id: 'dev-agents-dashboard',
    title: 'Developer Agent Competitive Analysis',
    description: 'Executive-level comparison of Google Antigravity, Claude Code, GitHub Copilot, OpenAI Codex, and Cursor. Scorecards and recommendations.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    href: '/projects/dev-agents-dashboard/',
  },
  {
    id: 'executive-ai-dashboard',
    title: 'AI Usage Dashboard',
    description: 'Tracking AI tool usage (Slack AI, ChatGPT, Firefly, Copilot) with KPIs, license allocation, and utilization by segment.',
    tech: ['React', 'Vite', 'TypeScript', 'Recharts'],
    href: '/projects/executive-ai-dashboard/',
  },
  {
    id: 'ai-data-hub',
    title: 'AI Data Hub',
    description: 'Data catalog for AI and analytics datasets: browse, search, filter, and detailed dataset pages. Static, responsive.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    href: '/projects/ai-data-hub/',
  },
  {
    id: 'cfr-dashboard-bugz',
    title: 'CFR Dashboard',
    description: 'Change Failure Rate and deployment metrics. DORA-style KPIs, trend chart, and bug counts.',
    tech: ['HTML', 'Chart.js', 'JavaScript'],
    href: '/projects/cfr-dashboard-bugz/',
  },
  // —— External (live sites) — at bottom ———
  {
    id: 'dianachelaru',
    title: 'Diana Chelaru',
    description: 'Portfolio and presence for artist Diana Chelaru.',
    tech: ['Web', 'Design'],
    href: 'https://dianachelaru.com',
    external: true,
  },
  {
    id: 'mattshadecooks',
    title: 'Matt Shade Cooks',
    description: 'Recipes and cooking notes.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    href: 'https://mattshadecooks.com',
    external: true,
  },
]
