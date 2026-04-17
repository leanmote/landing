const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

function base(props) {
  return {
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    width: props.size || 18,
    height: props.size || 18,
    className: props.className,
  };
}

export function ShieldIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} d="M12 3 4.5 6v5.9c0 4.4 2.8 8.6 7.5 9.9 4.7-1.3 7.5-5.5 7.5-9.9V6L12 3Z" />
    </svg>
  );
}

export function PlayIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M8 6v12l10-6-10-6Z" fill="currentColor" />
    </svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} strokeWidth="2" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function DownloadIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} strokeWidth="2" d="M12 4v10m0 0 4-4m-4 4-4-4M5 18h14" />
    </svg>
  );
}

export function BarChartIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} strokeWidth="2" d="M5 20V9m7 11V5m7 15v-7M3 20h18" />
    </svg>
  );
}

export function NetworkIcon(props) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="4.5" r="2" {...S} />
      <circle cx="5" cy="19" r="2" {...S} />
      <circle cx="19" cy="19" r="2" {...S} />
      <path {...S} d="M10.9 6.1 6.3 17M13.1 6.1 17.7 17M7 19h10" />
    </svg>
  );
}

export function BrainIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} d="M9.5 4.5a2.8 2.8 0 0 1 5.3 0 2.8 2.8 0 0 1 3 4.1 3.1 3.1 0 0 1 0 6.8 2.9 2.9 0 0 1-3 4.1 2.8 2.8 0 0 1-5.3 0 2.8 2.8 0 0 1-3-4.1 3.1 3.1 0 0 1 0-6.8 2.9 2.9 0 0 1 3-4.1Z" />
      <path {...S} d="M9.5 9.5c.8.8 1.8 1.2 2.5 2 .7.7.8 1.5.8 2.5" />
    </svg>
  );
}

export function ZapIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} strokeWidth="2" d="M13 2 4 13h6l-1 9 9-11h-6l1-9Z" />
    </svg>
  );
}

export function TargetIcon(props) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8" {...S} />
      <circle cx="12" cy="12" r="4" {...S} />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg {...base(props)} viewBox="0 0 16 16">
      <path d="M1.342 8.229 2.744 6.822l2.302 2.263 5.106-5.086 1.412 1.407-6.518 6.482-3.704-3.659Z" fill="currentColor" />
    </svg>
  );
}

export function CheckCircleIcon(props) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" {...S} />
      <path {...S} d="m8 12 3 3 5-6" />
    </svg>
  );
}

export function DollarIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} d="M12 3v18M16 7.5A3.5 3.5 0 0 0 12.5 4h-1a3.5 3.5 0 0 0 0 7h1a3.5 3.5 0 0 1 0 7h-1A3.5 3.5 0 0 1 8 14.5" />
    </svg>
  );
}

export function ClockIcon(props) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" {...S} />
      <path {...S} d="M12 7v5l3 2" />
    </svg>
  );
}

export function UsersIcon(props) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="8" r="3.5" {...S} />
      <path {...S} d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path {...S} d="M15 8a3 3 0 0 1 0 6M21 20c0-2.5-1.7-4.7-4-5.6" />
    </svg>
  );
}

export function TrendingUpIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} strokeWidth="2" d="m3 17 6-6 4 4 8-8M14 7h7v7" />
    </svg>
  );
}

export function TrendingDownIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} strokeWidth="2" d="m3 7 6 6 4-4 8 8M14 17h7v-7" />
    </svg>
  );
}

export function AlertTriangleIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0ZM12 9v5M12 17.5v.1" />
    </svg>
  );
}

export function BotIcon(props) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="8" width="16" height="12" rx="3" {...S} />
      <path {...S} d="M12 8V4M8 4h8" />
      <circle cx="9" cy="14" r="1.2" fill="currentColor" />
      <circle cx="15" cy="14" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function SparklesIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} d="m12 3 1.8 4.5L18.5 9l-4.7 1.5L12 15l-1.8-4.5L5.5 9l4.7-1.5L12 3ZM18 15l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9.9-2ZM5 15l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7L5 15Z" />
    </svg>
  );
}

export function LightbulbIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.7 1 1.5 1 2.5h6c0-1 .2-1.8 1-2.5A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

export function BellIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9ZM10 21a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function ChevronDownIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} strokeWidth="2" d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronUpIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} strokeWidth="2" d="m6 15 6-6 6 6" />
    </svg>
  );
}

export function RefreshIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} d="M4 4v6h6M20 20v-6h-6" />
      <path {...S} d="M20 10a8 8 0 0 0-14.9-3M4 14a8 8 0 0 0 14.9 3" />
    </svg>
  );
}

export function PlusIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} strokeWidth="2" d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon(props) {
  return (
    <svg {...base(props)}>
      <path {...S} strokeWidth="2" d="M5 12h14" />
    </svg>
  );
}

export function GitPullRequestIcon(props) {
  return (
    <svg {...base(props)}>
      <circle cx="6" cy="5" r="2" {...S} />
      <circle cx="6" cy="19" r="2" {...S} />
      <circle cx="18" cy="19" r="2" {...S} />
      <path {...S} d="M6 7v10M18 17V9l-3 3M15 12l3-3" />
    </svg>
  );
}

export function GraphIcon(props) {
  return (
    <svg {...base(props)}>
      <circle cx="6" cy="6" r="2" {...S} />
      <circle cx="18" cy="6" r="2" {...S} />
      <circle cx="12" cy="18" r="2" {...S} />
      <path {...S} d="m7.5 7.5 3.5 9M16.5 7.5 13 16.5M8 6h8" />
    </svg>
  );
}
