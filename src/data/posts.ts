export type PostTag = 'PLAYBOOK' | 'CASE_LOG' | 'SIGNAL_SCAN' | 'MINDSET';

export interface Post {
  slug: string;
  title: string;
  summary: string;
  tag: PostTag;
  readTime: string;
  date: string;
  featured?: boolean;
  relatedProduct?: string;
  relatedPhase?: string;
}

export const posts: Post[] = [
  {
    slug: 'ship-ai-saas-30-days',
    title: 'How to Ship an AI SaaS in 30 Days as a Solo Founder',
    summary: 'A step-by-step launch playbook from idea validation to first paying customers — no team required.',
    tag: 'PLAYBOOK',
    readTime: '6 min read',
    date: '2026-03-07',
    featured: true,
    relatedPhase: 'GENESIS',
  },
  {
    slug: 'inside-rfq-autopilot',
    title: 'Inside RFQ AutoPilot: Building AI for Manufacturing',
    summary: 'How a solo consultant automated an entire RFQ pipeline with an AI agent — from inbound request to pricing in minutes.',
    tag: 'CASE_LOG',
    readTime: '5 min read',
    date: '2026-03-05',
    relatedProduct: 'RFQ AutoPilot',
  },
  {
    slug: 'ai-trends-q1-2026',
    title: 'AI Trends Q1 2026: What Solo Operators Should Watch',
    summary: 'Key shifts in LLMs, automation tooling, and Industry 4.0 — and how to turn them into products instead of just noise.',
    tag: 'SIGNAL_SCAN',
    readTime: '4 min read',
    date: '2026-03-03',
    relatedPhase: 'EXPANSION',
  },
  {
    slug: 'rfq-inbox-to-ai-agent',
    title: 'Turn Your RFQ Inbox into an AI Agent (Without Hiring)',
    summary: 'Practical steps to go from email-based RFQs to a working RFQ AutoPilot-style agent in under 2 weeks.',
    tag: 'PLAYBOOK',
    readTime: '7 min read',
    date: '2026-02-28',
    relatedProduct: 'RFQ AutoPilot',
  },
  {
    slug: 'saas-dashboard-48-hours',
    title: 'SaaS Dashboard in 48 Hours: From Idea to 10 Paying Users',
    summary: 'Breaking down the CreatorDash story: stack, templates, and decisions that made revenue possible in a weekend.',
    tag: 'CASE_LOG',
    readTime: '5 min read',
    date: '2026-02-25',
    relatedProduct: 'CreatorDash',
  },
  {
    slug: 'ai-products-small-factories',
    title: 'Designing AI Products for Small Factories (Without Overbuilding)',
    summary: 'A field-tested approach to scoping predictive maintenance and IoT-style tools that small factories will actually buy.',
    tag: 'PLAYBOOK',
    readTime: '6 min read',
    date: '2026-02-20',
    relatedProduct: 'PredictiveOps',
  },
  {
    slug: 'solo-operators-win-ai-2026',
    title: 'Where Solo Operators Can Still Win in AI in 2026',
    summary: 'Market gaps in manufacturing, recruiting, and the creator economy that are still wide open for focused solopreneurs.',
    tag: 'SIGNAL_SCAN',
    readTime: '4 min read',
    date: '2026-02-15',
    relatedPhase: 'EXPANSION',
  },
  {
    slug: 'serious-vs-side-project',
    title: 'Serious vs Side-Project: How to Treat Your AI Product Like a Business',
    summary: 'Filters and questions to avoid building yet another toy and instead commit to a path from idea to revenue.',
    tag: 'MINDSET',
    readTime: '5 min read',
    date: '2026-02-10',
  },
];

export const tagStyles: Record<PostTag, string> = {
  PLAYBOOK: 'bg-primary/10 text-primary border-primary/30',
  CASE_LOG: 'bg-accent/10 text-accent border-accent/30',
  SIGNAL_SCAN: 'bg-secondary/15 text-secondary border-secondary/30',
  MINDSET: 'bg-muted text-muted-foreground border-border',
};

export const tagLabels: Record<PostTag, string> = {
  PLAYBOOK: 'PLAYBOOK',
  CASE_LOG: 'CASE LOG',
  SIGNAL_SCAN: 'SIGNAL SCAN',
  MINDSET: 'MINDSET',
};

export const filterCategories = [
  'All',
  'Manufacturing',
  'SaaS',
  'Automation',
  'Creator',
  'Industry 4.0',
  'Mindset',
  'Go-to-market',
] as const;
