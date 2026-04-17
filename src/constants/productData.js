export const COCKPIT_KPIS = [
  { icon: 'dollar', value: 47, prefix: '$', suffix: 'k', label: 'Saved', hint: 'This quarter', tone: 'brand' },
  { icon: 'zap', value: 23, prefix: '+', suffix: '%', label: 'Velocity', hint: 'vs last quarter', tone: 'yellow' },
  { icon: 'clock', value: 3.2, suffix: 'd', label: 'Lead Time', hint: '↓ from 4.8d', tone: 'blue', decimals: 1 },
  { icon: 'users', value: 87, suffix: '%', label: 'Capacity', hint: 'Utilization', tone: 'red' },
];

export const OKR_ITEMS = [
  { label: 'Deployment Frequency', value: '4.2/day', target: '5/day target', delta: '+18%', deltaTone: 'brand', tone: 'brand' },
  { label: 'Lead Time', value: '3.2 days', target: '3 days target', delta: '-12%', deltaTone: 'brand', tone: 'brand' },
  { label: 'Change Failure Rate', value: '8.5%', target: '10% target', delta: '-22%', deltaTone: 'brand', tone: 'brand' },
  { label: 'Sprint Predictability', value: '72%', target: '85% target', delta: '+5%', deltaTone: 'yellow', tone: 'yellow' },
];

export const INVESTMENT_MIX = [
  { label: 'Roadmap', percentage: 45, target: '50% target', tone: 'brand' },
  { label: 'Tech Debt', percentage: 25, target: '20% target', tone: 'blue' },
  { label: 'Maintenance', percentage: 20, target: '20% target', tone: 'yellow' },
  { label: 'Unplanned', percentage: 10, target: '10% target', tone: 'red' },
];

export const TEAM_PERFORMANCE = [
  { name: 'Platform', velocity: 92, predictability: 88, status: 'high' },
  { name: 'Frontend', velocity: 78, predictability: 72, status: 'medium' },
  { name: 'Backend', velocity: 85, predictability: 91, status: 'high' },
  { name: 'Mobile', velocity: 65, predictability: 58, status: 'low' },
  { name: 'Data', velocity: 88, predictability: 82, status: 'high' },
];

export const GRAPH_NODES = [
  { id: 'frontend', x: 22, y: 38, type: 'team', label: 'Frontend', percentage: 72 },
  { id: 'web-ui', x: 38, y: 22, type: 'repo', label: 'Web UI', percentage: 90 },
  { id: 'platform', x: 10, y: 60, type: 'team', label: 'Platform', percentage: 85 },
  { id: 'api-gateway', x: 22, y: 78, type: 'repo', label: 'API Gateway', percentage: 85 },
  { id: 'backend', x: 48, y: 82, type: 'team', label: 'Backend', percentage: 92 },
  { id: 'api-endpoint', x: 38, y: 55, type: 'bottleneck', label: 'API Endpoint', percentage: 58 },
  { id: 'ci-pipeline', x: 58, y: 38, type: 'bottleneck', label: 'CI Pipeline', percentage: 45 },
  { id: 'test-suite', x: 72, y: 22, type: 'warning', label: 'Test Suite', percentage: 35 },
  { id: 'mobile', x: 82, y: 48, type: 'team', label: 'Mobile', percentage: 65 },
  { id: 'code-review', x: 58, y: 62, type: 'bottleneck', label: 'Code Review', percentage: 25 },
  { id: 'cursor', x: 8, y: 82, type: 'ai-tool', label: 'Cursor', percentage: 95 },
  { id: 'claude', x: 70, y: 92, type: 'ai-tool', label: 'Claude', percentage: 93 },
  { id: 'mobile-app', x: 86, y: 80, type: 'repo', label: 'Mobile App', percentage: 82 },
];

export const GRAPH_LINKS = [
  { start: 'frontend', end: 'web-ui', time: '+2.5h' },
  { start: 'web-ui', end: 'ci-pipeline' },
  { start: 'ci-pipeline', end: 'test-suite', time: '+8h', bottleneck: true },
  { start: 'frontend', end: 'api-endpoint', time: '+3h' },
  { start: 'api-endpoint', end: 'backend', time: '+14h', bottleneck: true },
  { start: 'platform', end: 'frontend' },
  { start: 'platform', end: 'api-gateway' },
  { start: 'api-gateway', end: 'backend' },
  { start: 'backend', end: 'code-review', time: '+8h' },
  { start: 'code-review', end: 'ci-pipeline', bottleneck: true },
  { start: 'ci-pipeline', end: 'mobile', time: '+1.2h' },
  { start: 'cursor', end: 'api-gateway' },
  { start: 'claude', end: 'code-review' },
  { start: 'mobile', end: 'mobile-app' },
];

export const GRAPH_ALERTS = [
  {
    id: '1',
    title: 'Review Bottleneck',
    description: 'David Kim has 7 pending PR reviews blocking 3 team members.',
    time: '2 days',
    impact: 'high',
    team: 'engineering',
    source: 'git',
  },
  {
    id: '2',
    title: 'Cross-team Delay',
    description: 'Product → Design response time increased by 35% this sprint.',
    time: '1 day',
    impact: 'medium',
    team: 'product',
    source: 'slack',
    actionsTaken: 1,
  },
  {
    id: '3',
    title: 'Deploy Frequency Dropped',
    description: 'Backend team deploy frequency down 20% — investigate CI health.',
    time: '3 days',
    impact: 'high',
    team: 'backend',
    source: 'jira',
  },
  {
    id: '4',
    title: 'Team Isolation',
    description: 'Backend had minimal cross-team collaboration this sprint.',
    time: '1 week',
    impact: 'low',
    team: 'backend',
    source: 'calendar',
  },
];

export const ACTION_PLANS = [
  {
    id: '1',
    title: 'Code Review Bottleneck Detected',
    description:
      'David Kim has 7 pending PR reviews blocking 3 team members. Average wait time: 2.3 days.',
    impact: 'high',
    timeToResolve: '~2 hours',
    affectedTeams: ['Frontend', 'Backend'],
    suggestedActions: [
      'Redistribute 4 PRs to Sarah Chen (similar domain expertise)',
      'Auto-assign future auth-related PRs to expanded reviewer pool',
      'Schedule 30-min review sprint for remaining critical PRs',
    ],
    status: 'pending',
    confidence: 94,
  },
  {
    id: '2',
    title: 'CI Pipeline Optimization',
    description:
      'Test suite running 40% slower than baseline. Parallel execution could save 18 min/build.',
    impact: 'medium',
    timeToResolve: '~1 day',
    affectedTeams: ['Platform', 'All Teams'],
    suggestedActions: [
      'Enable parallel test execution for unit tests',
      'Cache node_modules between builds',
      'Split integration tests into a separate workflow',
    ],
    status: 'in-progress',
    confidence: 87,
  },
  {
    id: '3',
    title: 'Early Burnout Warning: Mobile',
    description:
      'After-hours commits up 65% this sprint. 3 engineers showing overload signals.',
    impact: 'high',
    timeToResolve: '~1 week',
    affectedTeams: ['Mobile'],
    suggestedActions: [
      'Redistribute 2 non-critical tickets to Backend team',
      'Suggest scope reduction for next sprint planning',
      'Flag for 1:1 discussion with the team lead',
    ],
    status: 'pending',
    confidence: 91,
  },
];

export const IMPACT_KPIS = [
  { icon: 'dollar', value: 2.4, prefix: '$', suffix: 'M', label: 'Annual Savings', delta: '+12.5%', deltaTone: 'brand', hint: 'vs last quarter', tone: 'brand', decimals: 1 },
  { icon: 'zap', value: 55, suffix: '%', label: 'Velocity Lift', delta: '+6%', deltaTone: 'yellow', hint: 'faster PRs', tone: 'yellow' },
  { icon: 'bot', value: 82, suffix: '%', label: 'AI Adoption', delta: '+18 seats', deltaTone: 'blue', hint: 'active users', tone: 'blue' },
  { icon: 'shield', value: 'LOW', label: 'Burnout Risk', delta: '-23%', deltaTone: 'brand', hint: 'after-hours commits', tone: 'red', static: true },
];

export const BENCHMARK_ROWS = [
  { label: 'Deployment Frequency', yourValue: '4.2/day', yourPct: 84, eliteValue: '5/day', eliteTarget: 'Elite target', tone: 'brand' },
  { label: 'Lead Time', yourValue: '3.2d', yourPct: 68, eliteValue: '< 1d', eliteTarget: 'Elite target', tone: 'blue' },
  { label: 'Change Failure Rate', yourValue: '8.5%', yourPct: 72, eliteValue: '< 15%', eliteTarget: 'Elite target', tone: 'yellow' },
  { label: 'MTTR', yourValue: '2.1h', yourPct: 62, eliteValue: '< 1h', eliteTarget: 'Elite target', tone: 'red' },
];

export const SPARKLINE_POINTS = [
  42, 44, 43, 45, 47, 48, 46, 49, 52, 53, 54, 53, 56, 58, 57, 60, 62, 61, 64, 66, 68, 67, 70, 72, 74, 73, 76, 78, 80, 82,
];
