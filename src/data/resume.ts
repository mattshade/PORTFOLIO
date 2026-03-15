// Edit this file to match your resume. You can paste from your PDF or type in your details.

export interface ExperienceItem {
  role: string
  company: string
  period: string
  location?: string | null
  description?: string
  highlights?: string[]
}

export const resume = {
  name: 'Matt Shade',
  title: 'Engineering & Design',
  tagline: 'Creating and leading teams that craft AI-powered tools and interfaces to turn data into clarity and action.',
  email: 'hello@mattshade.com',
  /** Netlify Forms: used when deployed (no config needed). Formspree: set if you prefer it over Netlify. */
  contactFormEndpoint: '', // e.g. https://formspree.io/f/yourformid for Formspree
  contactFormName: 'contact', // Must match the hidden form in index.html for Netlify
  linkedin: '', // e.g. https://linkedin.com/in/mattshade
  github: '',   // e.g. https://github.com/mattshade
  resumePdf: '/Matt_Shade.pdf',

  experience: [
    {
      role: 'Director of AI Engineering',
      company: 'NBCUniversal',
      period: 'Jul 2025 – Present',
      location: 'New York NY',
      description: 'Lead teams building AI-powered discovery, personalization, and internal dashboards that turn data into decisions.',
      highlights: [
        'Ship tools executives use: ChatGPT Enablement Dashboard (adoption, feature depth, Office Hours intelligence), Executive AI Usage Dashboard (licensing, utilization across Slack AI, Firefly, Copilot), and Developer Agent Competitive Analysis (Cursor, Copilot, Claude, Codex) for informed AI tool selection.',
        'Designed and shipped the AI Data Hub—an interactive data catalog with 8 AI/analytics datasets (audience, commerce, content, editorial, social, streaming, podcast, ad performance), Chart.js visualizations, search, filters, and SharePoint-deployable architecture.',
        'Drive technical direction across React, Node.js, and cloud-native systems with rapid experimentation. Partner with design, research, product, and news teams on adaptive interfaces inspired by interaction design and gameplay patterns.',
        'Champion responsible adoption of agentic tools across NBC News to improve workflows, experimentation velocity, and editorial support.',
      ],
    },
    {
      role: 'Director of Engineering, NBC News Group Digital',
      company: 'NBCUniversal',
      period: 'Oct 2021 – 2025',
      location: 'New York NY',
      description: 'Scaled engineering teams across NBC News, TODAY, MSNBC, and CNBC.',
      highlights: [
        'Modernized web and mobile stacks using React and TypeScript. Collaborated with design, product, and news teams to validate concepts through coded prototypes and user research.',
        'Championed inclusive hiring, onboarding, and coaching programs. Built teams with high trust, strong autonomy, and low attrition.',
        'Integrated modern front-end technologies, AI-assisted workflows, and prototyping practices across product lines. Delivered prototypes that shaped strategic decision-making.',
      ],
    },
    {
      role: 'Tech Lead, CNBC.com Engagement',
      company: 'CNBC',
      period: 'Sep 2015 – Oct 2021',
      location: null,
      description: 'Directed interactive and personalization features powered by real-time data visualization.',
      highlights: [
        'Owned subscription workflows and the stock quotes page—rendering financial market data at scale. Brought rigor to UX and data: clarity, accuracy, and speed.',
        'Partnered with design and product to create prototypes that shaped engagement strategy. Mentored engineers in technical architecture, experimentation, and creative problem-solving.',
      ],
    },
    {
      role: 'Senior Interactive Designer and Designer',
      company: 'CNBC',
      period: '2007 – 2015',
      location: null,
      description: 'Created interactive experiences and prototype-driven concepts for web and iOS.',
      highlights: [
        'Developed foundations in interaction design, animation, and rapid iteration that continue to shape leadership approach—ship fast, learn from users, refine in code.',
        'Built the muscle for turning ideas into working software that people can touch and respond to.',
      ],
    },
  ] as ExperienceItem[],

  skills: [
    'React',
    'TypeScript',
    'Next.js',
    'Vite',
    'Tailwind CSS',
    'Node.js',
    'REST APIs',
    'Data visualization',
    'Antigravity',
    'Claude',
    'Figma Make',
    'Runway Ai',
    'ElevenLabs',
    'ChatGPT',
    'Gemini',
    'GitHub Copilot',
    'Cursor',
    'Microsoft Copilot Studio',
    'Power Automate',
    'M365',
  ],
}
