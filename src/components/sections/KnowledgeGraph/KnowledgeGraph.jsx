import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../../ui/SectionTitle/SectionTitle.jsx';
import './KnowledgeGraph.css';

function getCSSVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function getNodeColors() {
  return {
    team:       getCSSVar('--color-node-team'),
    repo:       getCSSVar('--color-node-repo'),
    bottleneck: getCSSVar('--color-node-bottleneck'),
    warning:    getCSSVar('--color-node-warning'),
    'ai-tool':  getCSSVar('--color-node-ai'),
    edge:       getCSSVar('--color-edge-default'),
    particle:   getCSSVar('--color-edge-particle'),
    fill:       getCSSVar('--color-node-fill'),
    label:      getCSSVar('--color-node-label'),
  };
}

const NODES = [
  { id: 'frontend',     x: 20, y: 40, type: 'team',       label: 'Frontend',     percentage: 72, aiPercentage: 72 },
  { id: 'web-ui',       x: 35, y: 30, type: 'repo',       label: 'Web UI',       percentage: 90 },
  { id: 'platform',     x: 10, y: 60, type: 'team',       label: 'Platform',     percentage: 85, aiPercentage: 100 },
  { id: 'api-gateway',  x: 25, y: 70, type: 'repo',       label: 'API Gateway',  percentage: 85 },
  { id: 'backend',      x: 50, y: 80, type: 'team',       label: 'Backend',      percentage: 92 },
  { id: 'api-endpoint', x: 35, y: 55, type: 'bottleneck', label: 'API Endpoint', percentage: 58 },
  { id: 'ci-pipeline',  x: 55, y: 35, type: 'bottleneck', label: 'CI Pipeline',  percentage: 45 },
  { id: 'test-suite',   x: 70, y: 25, type: 'bottleneck', label: 'Test Suite',   percentage: 35 },
  { id: 'mobile',       x: 85, y: 45, type: 'team',       label: 'Mobile',       percentage: 65 },
  { id: 'code-review',  x: 60, y: 60, type: 'bottleneck', label: 'Code Review',  percentage: 25 },
  { id: 'cursor',       x: 5,  y: 80, type: 'ai-tool',    label: 'Cursor',       percentage: 95 },
  { id: 'core-lib',     x: 20, y: 90, type: 'repo',       label: 'Core Lib',     percentage: 88, aiPercentage: 100 },
  { id: 'claude',       x: 70, y: 95, type: 'ai-tool',    label: 'Claude',       percentage: 93 },
  { id: 'mobile-app',   x: 85, y: 80, type: 'repo',       label: 'Mobile App',   percentage: 82 },
];

const CONNECTIONS = [
  { start: 'frontend',     end: 'web-ui',       time: '+2.5h' },
  { start: 'web-ui',       end: 'ci-pipeline' },
  { start: 'ci-pipeline',  end: 'test-suite',   time: '+8h',  bottleneck: true },
  { start: 'frontend',     end: 'api-endpoint', time: '+3h' },
  { start: 'api-endpoint', end: 'backend',      time: '+14h', bottleneck: true },
  { start: 'platform',     end: 'frontend' },
  { start: 'platform',     end: 'api-gateway' },
  { start: 'api-gateway',  end: 'backend' },
  { start: 'backend',      end: 'code-review',  time: '+8h' },
  { start: 'code-review',  end: 'ci-pipeline',  bottleneck: true },
  { start: 'ci-pipeline',  end: 'mobile',       time: '+1.2h' },
  { start: 'cursor',       end: 'core-lib' },
  { start: 'core-lib',     end: 'backend',      time: '+3h' },
  { start: 'claude',       end: 'code-review' },
  { start: 'mobile',       end: 'mobile-app' },
  { start: 'backend',      end: 'claude' },
];

const LEGEND_TYPE_KEYS = ['team', 'repo', 'bottleneck', 'warning', 'ai-tool'];

const FEATURE_ICONS_KEYS = ['branch', 'chip', 'people'];

function PlusIcon()    { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>); }
function MinusIcon()   { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /></svg>); }
function ResetIcon()   { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>); }
function WarningIcon() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>); }
function BranchIcon()  { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>); }
function ChipIcon()    { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>); }
function PeopleIcon()  { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>); }

const FEATURE_ICON_COMPONENTS = { branch: BranchIcon, chip: ChipIcon, people: PeopleIcon };

function KnowledgeGraph() {
  const [zoom, setZoom] = useState(1);
  const [alertIndex, setAlertIndex] = useState(0);
  const canvasRef = useRef(null);
  const { t } = useTranslation('landing');

  const NODE_COLORS = getNodeColors();
  const legendItems = t('knowledgeGraph.legend', { returnObjects: true });
  const LEGEND = LEGEND_TYPE_KEYS.map((key, idx) => ({ label: legendItems[idx]?.label || key, color: NODE_COLORS[key] }));

  const features = t('knowledgeGraph.features', { returnObjects: true });
  const alerts = t('knowledgeGraph.alerts', { returnObjects: true });

  const nodeById = (id) => NODES.find((n) => n.id === id);

  useEffect(() => {
    const id = setInterval(() => {
      setAlertIndex((i) => (i + 1) % alerts.length);
    }, 3000);
    return () => clearInterval(id);
  }, [alerts.length]);

  const currentAlert = alerts[alertIndex];

  return (
    <section className="kgraph" id="knowledge-graph">
      <div className="container">
        <div className="kgraph__header">
          <p className="kgraph__eyebrow">{t('knowledgeGraph.eyebrow')}</p>
          <SectionTitle as="h2" align="center">
            <span>{t('knowledgeGraph.titlePart1')}</span>
            <span className="kgraph__title-accent">{t('knowledgeGraph.titleAccent')}</span>
          </SectionTitle>
          <p className="kgraph__subtitle">
            {t('knowledgeGraph.subtitle')}
          </p>
        </div>

        <ul className="kgraph__features">
          {features.map((f, idx) => {
            const Icon = FEATURE_ICON_COMPONENTS[FEATURE_ICONS_KEYS[idx]];
            return (
              <li key={idx} className="kgraph__feature">
                <span className="kgraph__feature-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div className="kgraph__feature-body">
                  <h4 className="kgraph__feature-title">{f.title}</h4>
                  <p className="kgraph__feature-desc">{f.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="kgraph__card">
          <div className="kgraph__toolbar">
            <div className="kgraph__zoom-group">
              <button
                type="button"
                className="kgraph__zoom-btn"
                aria-label="Zoom in"
                onClick={() => {
                  const next = Math.min(zoom + 0.1, 2);
                  setZoom(next);
                  canvasRef.current?.style.setProperty('--kg-zoom', next);
                }}
              >
                <PlusIcon />
              </button>
              <button
                type="button"
                className="kgraph__zoom-btn"
                aria-label="Zoom out"
                onClick={() => {
                  const next = Math.max(zoom - 0.1, 0.5);
                  setZoom(next);
                  canvasRef.current?.style.setProperty('--kg-zoom', next);
                }}
              >
                <MinusIcon />
              </button>
              <button
                type="button"
                className="kgraph__zoom-btn"
                aria-label="Reset zoom"
                onClick={() => {
                  setZoom(1);
                  canvasRef.current?.style.setProperty('--kg-zoom', 1);
                }}
              >
                <ResetIcon />
              </button>
            </div>
            <button type="button" className="kgraph__live-btn">
              <span className="kgraph__live-dot" aria-hidden="true" />
              {t('knowledgeGraph.liveBtn')}
            </button>
          </div>

          <div className="kgraph__legend" role="list">
            {LEGEND.map((item) => (
              <div key={item.label} className="kgraph__legend-item" role="listitem">
                <span
                  className="kgraph__legend-dot"
                  ref={(el) => { if (el) el.style.setProperty('--legend-color', item.color); }}
                />
                <span className="kgraph__legend-label">{item.label}</span>
              </div>
            ))}
          </div>

          <div
            className="kgraph__canvas"
            ref={(el) => {
              canvasRef.current = el;
              if (el) el.style.setProperty('--kg-zoom', zoom);
            }}
          >
            <svg className="kgraph__svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="kgraph-glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {CONNECTIONS.map((conn, i) => {
                const start = nodeById(conn.start);
                const end = nodeById(conn.end);
                if (!start || !end) return null;
                return (
                  <g key={`${conn.start}-${conn.end}`}>
                    <motion.line
                      x1={`${start.x}%`}
                      y1={`${start.y}%`}
                      x2={`${end.x}%`}
                      y2={`${end.y}%`}
                      stroke={conn.bottleneck ? NODE_COLORS.warning : NODE_COLORS.edge}
                      strokeWidth={conn.bottleneck ? 2 : 1}
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.6 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1.4, delay: 0.3 + i * 0.05 }}
                    />
                    <circle r="2.5" fill={conn.bottleneck ? NODE_COLORS.warning : NODE_COLORS.particle}>
                      <animateMotion
                        dur={conn.bottleneck ? '3s' : '6s'}
                        repeatCount="indefinite"
                        path={`M ${start.x * 10},${start.y * 7} L ${end.x * 10},${end.y * 7}`}
                      />
                    </circle>
                    {conn.time && (
                      <foreignObject
                        x={`${(start.x + end.x) / 2 - 3}%`}
                        y={`${(start.y + end.y) / 2 - 1.8}%`}
                        width="72"
                        height="24"
                      >
                        <div className="kgraph__time-badge">{conn.time}</div>
                      </foreignObject>
                    )}
                  </g>
                );
              })}

              {NODES.map((node, i) => {
                const color = NODE_COLORS[node.type];
                const pctClass = node.type === 'bottleneck' ? 'kgraph__pct-badge--bottleneck' : 'kgraph__pct-badge--healthy';
                return (
                  <g key={node.id}>
                    <motion.circle
                      cx={`${node.x}%`}
                      cy={`${node.y}%`}
                      r="20"
                      fill={NODE_COLORS.fill}
                      stroke={color}
                      strokeWidth="2"
                      filter="url(#kgraph-glow)"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ type: 'spring', stiffness: 140, damping: 14, delay: i * 0.04 }}
                    />
                    <circle cx={`${node.x}%`} cy={`${node.y}%`} r="16" fill={color} fillOpacity="0.2" />
                    {node.percentage !== undefined && (
                      <foreignObject x={`${node.x - 3}%`} y={`${node.y - 5}%`} width="52" height="20">
                        <div className={`kgraph__pct-badge ${pctClass}`}>{node.percentage}%</div>
                      </foreignObject>
                    )}
                    {node.aiPercentage !== undefined && (
                      <foreignObject x={`${node.x + 2.5}%`} y={`${node.y - 2.8}%`} width="72" height="20">
                        <div className="kgraph__ai-badge">{node.aiPercentage}% AI</div>
                      </foreignObject>
                    )}
                    <text
                      x={`${node.x}%`}
                      y={`${node.y + 5}%`}
                      fill={NODE_COLORS.label}
                      fontSize="10"
                      fontWeight="700"
                      textAnchor="middle"
                      fontFamily="var(--font-family-mono)"
                    >
                      {node.label}
                    </text>
                    {node.type === 'bottleneck' && (
                      <motion.circle
                        cx={`${node.x}%`}
                        cy={`${node.y}%`}
                        r="20"
                        fill="none"
                        stroke={NODE_COLORS.bottleneck}
                        strokeWidth="1"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentAlert.title + alertIndex}
              className="kgraph__alert"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <span className="kgraph__alert-icon" aria-hidden="true">
                <WarningIcon />
              </span>
              <div className="kgraph__alert-body">
                <h4 className="kgraph__alert-title">{currentAlert.title}</h4>
                <p className="kgraph__alert-desc">{currentAlert.desc}</p>
                <button type="button" className="kgraph__alert-btn">
                  {t('knowledgeGraph.alertBtn')}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default KnowledgeGraph;
