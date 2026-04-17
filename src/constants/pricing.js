export const PLAN_NAMES = ['Free', 'Growth', 'Performance', 'Elite'];

export const PRICING_TIERS = [
  {
    name: 'Free',
    monthlyRate: 0,
    annualRate: 0,
    price: '$0',
    period: '/mo',
    description: 'For individuals and small teams exploring DORA metrics.',
    credits: '10 credits / month',
    creditsOptions: [
      '10 credits / month',
      '25 credits / month',
      '50 credits / month',
    ],
    featuresHeader: "What's included",
    features: [
      'Up to 5 contributors',
      'DORA Metrics',
      'Pull Request Insights',
      'Team Performance Insights',
      'Work Log',
      'Slack Alerts',
      'Up to 5 Repos',
      '3 months data history',
      'Email/Chat support',
    ],
    cta: 'Get Started Free',
    ctaVariant: 'secondary',
  },
  {
    name: 'Growth',
    monthlyRate: 39,
    annualRate: 31,
    price: '$31',
    period: '/contributor/mo',
    description: 'Deep insights for high-velocity teams.',
    credits: '100 credits / month',
    creditsOptions: [
      '50 credits / month',
      '100 credits / month',
      '250 credits / month',
      '500 credits / month',
    ],
    featuresHeader: 'Everything in Free, plus',
    features: [
      'Sprint Insights',
      'Contributor-level Insights',
      'Deployment Insights',
      'Automated Goals',
      'Investment Distribution',
      'Dev Experience/Burnout Insights',
      'Custom Configurations',
      'Unlimited Repos',
      '6 months data history',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaVariant: 'secondary',
  },
  {
    name: 'Scale',
    monthlyRate: 99,
    annualRate: 79,
    price: '$79',
    period: '/contributor/mo',
    description: 'AI-powered analytics at scale.',
    credits: '1,000 credits / month',
    creditsOptions: [
      '500 credits / month',
      '1,000 credits / month',
      '2,500 credits / month',
      '5,000 credits / month',
    ],
    featuresHeader: 'Everything in Growth, plus',
    features: [
      'Code Health Analysis',
      'Automated PR Reviews',
      'AI PR Summary',
      'AI Code Fixes',
      'Code Coverage',
      'Rules Configurations',
      'Unlimited data history',
      'Dedicated Success Manager',
    ],
    cta: 'Start Free Trial',
    ctaVariant: 'primary',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    monthlyRate: null,
    annualRate: null,
    price: 'Custom',
    period: '',
    description: 'Custom solutions for global teams.',
    annualBox: {
      note: 'Contact us for volume pricing',
    },
    credits: 'Unlimited on-demand analyses',
    featuresHeader: 'Everything in Scale, plus',
    features: [
      'On-prem support',
      'Multiple Git Org support',
      'Software Capitalization',
      'Custom Integrations',
      'SSO / SAML',
      'Audit logs & compliance',
      'SLA guarantee (99.9%)',
      '& more...',
    ],
    cta: 'Contact Sales',
    ctaVariant: 'secondary',
  },
];

export const COMPARISON_GROUPS = [
  {
    title: 'CORE METRICS',
    rows: [
      {
        label: 'DORA Metrics Dashboard',
        values: [true, true, true, true],
      },
      {
        label: 'Deployment Frequency',
        values: [true, true, true, true],
      },
      {
        label: 'Lead Time for Changes',
        values: [true, true, true, true],
      },
      {
        label: 'Mean Time to Recovery',
        values: ['Basic', true, true, true],
      },
      {
        label: 'Change Failure Rate',
        values: ['Basic', true, true, true],
      },
      {
        label: 'Custom Metrics',
        values: [false, false, true, true],
      },
    ],
  },
  {
    title: 'INTEGRATIONS',
    rows: [
      { label: 'GitHub', values: [true, true, true, true] },
      { label: 'GitLab', values: [false, true, true, true] },
      { label: 'Bitbucket', values: [false, true, true, true] },
      { label: 'Jira', values: [false, true, true, true] },
      { label: 'Linear', values: [false, true, true, true] },
      { label: 'Slack Notifications', values: [false, true, true, true] },
      { label: 'Custom Integrations', values: [false, false, false, true] },
    ],
  },
  {
    title: 'ANALYTICS & AI',
    rows: [
      {
        label: 'Team Velocity Reports',
        values: ['Weekly', 'Daily', 'Real-time', 'Real-time'],
      },
      {
        label: 'Knowledge Graph Analysis',
        values: [false, '5 credits/mo', '50 credits/mo', 'Unlimited'],
      },
      {
        label: 'AI-Powered Insights (Sheldon)',
        values: [false, false, true, true],
      },
      {
        label: 'Bottleneck Detection',
        values: [false, 'Basic', 'Advanced', 'Advanced'],
      },
      {
        label: 'Predictability Scores',
        values: [false, false, true, true],
      },
      {
        label: 'Custom Dashboards',
        values: [false, false, true, true],
      },
    ],
  },
  {
    title: 'DATA & SECURITY',
    rows: [
      {
        label: 'Data Retention',
        values: ['3 months', '6 months', 'Unlimited', 'Unlimited'],
      },
      {
        label: 'Contributors',
        values: ['Up to 5', 'Unlimited', 'Unlimited', 'Unlimited'],
      },
      { label: 'SSO / SAML', values: [false, false, true, true] },
      { label: 'API Access', values: [false, false, true, true] },
      { label: 'Audit Logs', values: [false, false, true, true] },
      { label: 'On-Premise Deployment', values: [false, false, false, true] },
      { label: 'SOC2 Type II Certified', values: [true, true, true, true] },
    ],
  },
  {
    title: 'SUPPORT',
    rows: [
      { label: 'Community Support', values: [true, true, true, true] },
      { label: 'Email Support', values: [false, true, true, true] },
      { label: 'Priority Support', values: [false, false, true, true] },
      {
        label: 'Dedicated Success Manager',
        values: [false, false, false, true],
      },
      { label: 'Custom Training', values: [false, false, false, true] },
      { label: 'SLA Guarantee', values: [false, false, '99.9%', '99.99%'] },
    ],
  },
];

export const ADDONS = [
  {
    id: 'credits',
    accent: 'green',
    icon: 'zap',
    title: 'Credit Top-ups',
    description: 'Need more analyses? Top up anytime. Credits never expire.',
    badge: 'Popular',
    packs: [
      { amount: '50 Credits', price: '$19' },
      { amount: '200 Credits', price: '$59', save: 'Save 25%' },
      { amount: '500 Credits', price: '$119', save: 'Save 40%' },
    ],
    cta: 'Buy Credits',
  },
  {
    id: 'ai-analytics',
    accent: 'blue',
    icon: 'chart',
    title: 'AI Impact Analytics',
    description:
      'Executive-level insights to measure AI investment ROI and engineering velocity.',
    price: '$12',
    priceUnit: '/user/mo',
    cta: 'Add to Plan',
  },
  {
    id: 'integration',
    accent: 'yellow',
    icon: 'link',
    title: 'Custom Integration',
    description: 'Connect your internal tools with a bespoke integration built for you.',
    price: '$2,499',
    priceUnit: 'one-time',
    cta: 'Request Quote',
  },
  {
    id: 'training',
    accent: 'red',
    icon: 'sparkle',
    title: 'Team Training',
    description:
      'Live onboarding sessions and best practices workshops for your team.',
    price: '$499',
    priceUnit: '/session',
    cta: 'Book Session',
  },
];

export const FAQS = [
  {
    question: 'What counts as a contributor?',
    answer:
      "A contributor is anyone who commits code to your connected repositories within the billing period. Inactive contributors (no commits in 30 days) don't count toward your limit.",
  },
  {
    question: 'Can I change plans at any time?',
    answer:
      'Absolutely. You can upgrade or downgrade your plan at any time. Upgrades are immediate, and downgrades take effect at the next billing cycle.',
  },
  {
    question: 'What happens if I exceed my contributor limit?',
    answer:
      "We'll notify you when you're close to the limit. You can upgrade your plan or add more seats, and we provide a grace period before any service interruption.",
  },
  {
    question: 'How does the Knowledge Graph analysis work?',
    answer:
      'Our engine maps relationships between code, people, and processes across your tools. It identifies hidden dependencies and bottlenecks that simple metrics miss.',
  },
  {
    question: 'Is my code and data secure?',
    answer:
      'We are SOC2 Type II certified. We never store source code, only metadata needed for analysis. Enterprise plans also offer on-premise options.',
  },
  {
    question: 'Do you offer discounts for startups or non-profits?',
    answer:
      'Yes. We support early-stage startups and non-profits with special pricing programs through our sales team.',
  },
  {
    question: 'What integrations do you support?',
    answer:
      'We integrate with GitHub, GitLab, Bitbucket, Jira, Linear, Slack, and major CI/CD platforms. Enterprise plans support custom integrations.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes. All paid plans include a 14-day free trial with no credit card required. You can also use the Free plan indefinitely for up to 5 contributors.',
  },
  {
    question: 'How quickly can I get started?',
    answer:
      'You can connect repositories and see your first metrics in under 5 minutes. Historical data import usually completes within about an hour.',
  },
  {
    question: 'Can I export my data?',
    answer:
      'Yes. You can export metrics and reports as CSV or PDF. Enterprise plans also include API access for programmatic exports.',
  },
];
