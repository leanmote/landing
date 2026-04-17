export const WITHOUT_LEANMOTE = {
  variant: 'danger',
  icon: 'clock',
  title: 'The Old Way',
  subtitle: 'SEQUENTIAL & MANUAL',
  items: [
    {
      icon: 'x',
      title: 'The Meeting Trap',
      description: 'CTOs spend hours in "status update" loops trying to find bottlenecks manually.',
      metric: { label: 'Avg', value: '60-min sync / week' },
    },
    {
      icon: 'search',
      title: '7-Day Root Cause Search',
      description: 'By the time you find the blocker, the sprint is already derailed.',
      metric: { label: 'Latency', value: 'High' },
    },
    {
      icon: 'warning',
      title: 'AI Investment Blindness',
      description: 'Buying Copilot seats without knowing if they actually speed up delivery.',
      metric: { label: 'ROI', value: 'Unknown' },
    },
  ],
};

export const WITH_LEANMOTE = {
  variant: 'success',
  icon: 'bolt',
  title: 'The F1 Way',
  subtitle: 'AGENTIC & SYSTEMIC',
  items: [
    {
      icon: 'bot',
      title: 'Instant Bottleneck ID',
      description: 'Leanmote identifies the exact blocker in seconds, not hours.',
      metric: { label: 'Meeting time reclaimed', value: '100%' },
      badge: 'SOLVED < 2s',
    },
    {
      icon: 'graph',
      title: 'GraphRAG Context',
      description: 'Understand the full dependency chain. Fix the system, not just the symptom.',
      metric: { label: 'Resolution', value: 'System-Level' },
    },
    {
      icon: 'check',
      title: 'Agentic Resolution',
      description: 'Autonomous re-routing of work to clear gridlocks without human intervention.',
      metric: { label: 'Action', value: 'Automated' },
    },
  ],
};

export const SPRINT_STATE_WITHOUT = {
  id: 'without',
  switchLabel: 'Without Leanmote',
  title: 'The Bottleneck Cycle',
  subtitle: 'Manual syncs. Invisible friction. Telemetry arrives after the damage is done.',
  stops: [
    {
      id: 'inefficient-task-assignment',
      label: 'Bottleneck',
      title: 'Inefficient Task Assignment',
      description: 'Manual sync required between devs and agents.',
      position: { top: '10%', left: '3%' },
    },
    {
      id: 'rework-loop',
      label: 'Bottleneck',
      title: 'Rework Loop',
      description: 'Re-prompting AI code + manual PR review.',
      position: { bottom: '6%', left: '3%' },
    },
    {
      id: 'telemetry-gap',
      label: 'Bottleneck',
      title: 'Telemetry Gap',
      description: 'Waiting 7 days for reprioritization data.',
      position: { top: '42%', right: '2%' },
    },
  ],
  checkpoints: [
    { label: 'SPRINT PLANNING', sub: 'Day 1',  x: 18,  y: 45 },
    { label: 'REFINEMENT',      sub: 'Day 0',  x: 46,  y: 10 },
    { label: 'RETRO',           sub: 'Day 5',  x: 64,  y: 18 },
    { label: 'DEVELOPMENT',     sub: 'Day 1-4', x: 50, y: 72 },
    { label: 'SPRINT REVIEW',   sub: '',       x: 85,  y: 46 },
  ],
};

export const SPRINT_STATE_WITH = {
  id: 'with',
  switchLabel: 'With Leanmote',
  title: 'F1 Precision',
  subtitle: 'Agentic orchestration end-to-end. Live telemetry. The pit wall is in.',
  stops: [
    {
      id: 'agentic-prioritization',
      label: 'Agentic Win',
      title: 'Agentic Prioritization',
      description: 'Stories assigned via GraphRAG context.',
      position: { top: '10%', left: '3%' },
    },
    {
      id: 'auto-review',
      label: 'Agentic Win',
      title: 'Auto-Review',
      description: 'AI automates first-pass testing & docs.',
      position: { bottom: '6%', left: '3%' },
    },
    {
      id: 'live-telemetry',
      label: 'Agentic Win',
      title: 'Live Telemetry',
      description: 'PMs plan new features 5× faster.',
      position: { top: '42%', right: '2%' },
    },
  ],
  checkpoints: [
    { label: 'SPRINT PLANNING', sub: 'Day 1',  x: 18,  y: 45 },
    { label: 'REFINEMENT',      sub: 'Day 0',  x: 46,  y: 10 },
    { label: 'RETRO',           sub: 'Day 5',  x: 64,  y: 18 },
    { label: 'DEVELOPMENT',     sub: 'Day 1-4', x: 50, y: 72 },
    { label: 'SPRINT REVIEW',   sub: '',       x: 85,  y: 46 },
  ],
};

export const SPRINT_STATES = [SPRINT_STATE_WITHOUT, SPRINT_STATE_WITH];

export const F1_DASHBOARD_DATA = {
  with: {
    statusLeft: '◉ AGENTIC_INTERVENTION_ACTIVE',
    statusRight: 'DELIVERY: ORCHESTRATED',
    title: 'F1 PRECISION',
    accent: 'brand',
    nodes: [
      { icon: 'box', label: 'AGENT STORY ASSIGNMENT', sub: 'AUTOMATED BACKLOG' },
      { icon: 'cpu', label: 'GRAPHRAG ENGINE', sub: 'CONTEXT-AWARE', hero: true },
      { icon: 'bolt', label: 'AGENTIC PR ROUTING', sub: 'AUTO-REDISTRIBUTION' },
    ],
    metrics: [
      { label: 'IMPACT EVALUATION', value: '+135%', unit: 'THROUGHPUT' },
      { label: 'STRATEGIC OUTCOME', value: '14H', unit: '/WEEK REDEEMED' },
    ],
    footer: 'TIME TO INSIGHT: LIVE',
  },
  without: {
    statusLeft: '⚠ BOTTLENECKS: UNDETECTED',
    statusRight: 'DELIVERY: FRAGMENTED',
    title: 'BOTTLENECK CYCLE',
    accent: 'danger',
    nodes: [
      { icon: 'clock', label: 'WAIT TIME: HIGH', sub: '7-DAY INSIGHT LAG' },
      { icon: 'loop', label: 'REWORK LOOP', sub: 'MANUAL PR REVIEWS', hero: true },
      { icon: 'warning', label: 'INVISIBLE FRICTION', sub: 'STATUS UPDATE SYNCS' },
    ],
    metrics: [
      { label: 'IMPACT EVALUATION', value: '−60%', unit: 'THROUGHPUT' },
      { label: 'STRATEGIC OUTCOME', value: '14H', unit: '/WEEK LOST' },
    ],
    footer: 'TIME TO INSIGHT: 7 DAYS',
  },
};

export const SECURITY_CARDS = [
  {
    badge: 'SOC2',
    title: 'SOC2 Type II Certified',
    description: 'Independently audited security controls. We hold data the way your audit team needs.',
  },
  {
    badge: 'READ',
    title: 'Read-Only Access',
    description: 'We pull metadata we need. We never write to your repos or tooling.',
  },
  {
    badge: 'ZERO',
    title: 'Zero-Retention Policy',
    description: 'Your source code is processed, never stored. Only the insights leave the tunnel.',
  },
];
