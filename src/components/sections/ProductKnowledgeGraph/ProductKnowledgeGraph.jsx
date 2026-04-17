import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  NetworkIcon,
  BellIcon,
  AlertTriangleIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LightbulbIcon,
  PlusIcon,
  MinusIcon,
  RefreshIcon,
  ArrowRightIcon,
} from '../../ui/Icons/Icons';
import { GRAPH_NODES, GRAPH_LINKS, GRAPH_ALERTS } from '../../../constants/productData';
import './ProductKnowledgeGraph.css';

function getCSSVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function getNodeTypes() {
  return {
    team:       { color: getCSSVar('--color-node-team'),       label: 'Teams' },
    repo:       { color: getCSSVar('--color-node-repo'),       label: 'Repos' },
    bottleneck: { color: getCSSVar('--color-node-bottleneck'), label: 'Bottlenecks' },
    warning:    { color: getCSSVar('--color-node-warning'),    label: 'Warnings' },
    'ai-tool':  { color: getCSSVar('--color-node-ai'),         label: 'AI Tools' },
  };
}

const SOURCE_COLORS = {
  jira: 'accent',
  git: 'warning',
  slack: 'purple',
  calendar: 'brand',
};

function GraphCanvas({ zoom }) {
  const nodeById = Object.fromEntries(GRAPH_NODES.map((n) => [n.id, n]));
  const NODE_TYPES = getNodeTypes();
  const COLOR_DANGER = NODE_TYPES.bottleneck.color;
  const COLOR_BRAND = NODE_TYPES.repo.color;
  return (
    <div
      className="kg-canvas"
      ref={(el) => { if (el) el.style.setProperty('--pkg-zoom', zoom); }}
    >
      <svg className="kg-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="kg-glow">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {GRAPH_LINKS.map((link, i) => {
          const a = nodeById[link.start];
          const b = nodeById[link.end];
          if (!a || !b) return null;
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const stroke = link.bottleneck ? COLOR_DANGER : getCSSVar('--color-edge-default');
          return (
            <g key={`${link.start}-${link.end}-${i}`}>
              <motion.line
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={stroke}
                strokeWidth={link.bottleneck ? 0.35 : 0.2}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.85 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.05 }}
              />
              {link.time && (
                <g transform={`translate(${midX - 3.2}, ${midY - 1.4})`}>
                  <rect width="6.4" height="2.8" rx="0.6" fill={getCSSVar('--color-node-fill')} stroke={stroke} strokeWidth="0.14" />
                  <text x="3.2" y="1.95" fill={link.bottleneck ? COLOR_DANGER : getCSSVar('--color-edge-particle')} fontSize="1.6" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
                    {link.time}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {GRAPH_NODES.map((node, i) => {
          const color = NODE_TYPES[node.type].color;
          return (
            <g key={node.id}>
              {node.type === 'bottleneck' && (
                <motion.circle
                  cx={node.x} cy={node.y} r="4"
                  fill="none" stroke={COLOR_DANGER} strokeWidth="0.2"
                  initial={{ scale: 1, opacity: 0.75 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <motion.circle
                cx={node.x} cy={node.y} r="3.4"
                fill={getCSSVar('--color-node-fill')} stroke={color} strokeWidth="0.4"
                filter="url(#kg-glow)"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: i * 0.04, stiffness: 200 }}
              />
              <circle cx={node.x} cy={node.y} r="2.8" fill={color} fillOpacity="0.18" />
              {node.percentage != null && (
                <text
                  x={node.x} y={node.y - 4.8}
                  fill={node.type === 'bottleneck' || node.type === 'warning' ? color : COLOR_BRAND}
                  fontSize="1.9" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace"
                >
                  {node.percentage}%
                </text>
              )}
              <text
                x={node.x} y={node.y + 6.2}
                fill={getCSSVar('--color-node-label')}
                fontSize="2.1" textAnchor="middle" fontFamily="JetBrains Mono, monospace"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function AlertCard({ alert, index, resolveLabel }) {
  return (
    <motion.article
      className={`kg-alert kg-alert--${alert.impact}`}
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08 }}
    >
      <header className="kg-alert__head">
        <span className={`kg-alert__icon kg-alert__icon--${alert.impact}`}>
          <AlertTriangleIcon size={14} />
        </span>
        <h4>{alert.title}</h4>
        <span className="kg-alert__time">
          <ClockIcon size={12} /> {alert.time}
        </span>
      </header>
      <p>{alert.description}</p>
      <footer className="kg-alert__foot">
        <div className="kg-alert__tags">
          <span className={`kg-chip kg-chip--${alert.impact}`}>{alert.impact} impact</span>
          <span className={`kg-chip kg-chip--source-${SOURCE_COLORS[alert.source]}`}>{alert.source}</span>
          {alert.actionsTaken ? (
            <span className="kg-alert__actions-count">{alert.actionsTaken} actions taken</span>
          ) : null}
        </div>
        <button type="button" className="kg-alert__cta">
          {resolveLabel} <ArrowRightIcon size={12} />
        </button>
      </footer>
    </motion.article>
  );
}

function ProductKnowledgeGraph() {
  const [zoom, setZoom] = useState(1);
  const [insightsOpen, setInsightsOpen] = useState(true);
  const { t } = useTranslation('product');

  const critical = GRAPH_ALERTS.filter((a) => a.impact === 'high').length;
  const warnings = GRAPH_ALERTS.filter((a) => a.impact === 'medium').length;
  const info = GRAPH_ALERTS.filter((a) => a.impact === 'low').length;
  const actions = GRAPH_ALERTS.reduce((sum, a) => sum + (a.actionsTaken || 0), 0);

  return (
    <section className="kg-section" aria-labelledby="kg-title">
      <div className="container">
        <header className="kg-header">
          <span className="kg-eyebrow">
            <span className="kg-eyebrow__icon"><NetworkIcon size={14} /></span>
            {t('knowledgeGraph.eyebrow')}
          </span>
          <h2 id="kg-title" className="kg-title">
            {t('knowledgeGraph.title1')}<span>{t('knowledgeGraph.titleAccent')}</span>{t('knowledgeGraph.title2')}<em>{t('knowledgeGraph.titleItalic')}</em>
          </h2>
          <p className="kg-description">
            {t('knowledgeGraph.description')}
          </p>
        </header>

        <div className="kg-grid">
          <article className="kg-graph-card">
            <div className="kg-legend" aria-hidden="true">
              {Object.entries(getNodeTypes()).map(([key, info]) => (
                <span key={key} className="kg-legend__item">
                  <i ref={(el) => { if (el) el.style.setProperty('--legend-color', info.color); }} />
                  {info.label}
                </span>
              ))}
            </div>

            <div className="kg-toolbar">
              <div className="kg-zoom">
                <button type="button" onClick={() => setZoom((z) => Math.min(z + 0.1, 1.8))} aria-label="Zoom in"><PlusIcon size={14} /></button>
                <button type="button" onClick={() => setZoom((z) => Math.max(z - 0.1, 0.6))} aria-label="Zoom out"><MinusIcon size={14} /></button>
                <button type="button" onClick={() => setZoom(1)} aria-label="Reset zoom"><RefreshIcon size={14} /></button>
              </div>
              <span className="kg-live">
                <i className="kg-live__dot" /> LIVE
              </span>
            </div>

            <GraphCanvas zoom={zoom} />
          </article>

          <aside className="kg-sidebar">
            <article className="kg-alerts-panel">
              <header className="kg-alerts-panel__head">
                <div className="kg-alerts-panel__title">
                  <BellIcon size={16} />
                  <h3>{t('knowledgeGraph.alertsTitle')}</h3>
                  <span className="kg-chip kg-chip--high">● {critical} {t('knowledgeGraph.critical')}</span>
                </div>
              </header>

              <div className="kg-stats">
                <div className="kg-stat kg-stat--danger">
                  <strong>{critical}</strong>
                  <span>{t('knowledgeGraph.statCritical')}</span>
                </div>
                <div className="kg-stat kg-stat--warning">
                  <strong>{warnings}</strong>
                  <span>{t('knowledgeGraph.statWarnings')}</span>
                </div>
                <div className="kg-stat kg-stat--info">
                  <strong>{info}</strong>
                  <span>{t('knowledgeGraph.statInfo')}</span>
                </div>
                <div className="kg-stat kg-stat--brand">
                  <strong>{actions}</strong>
                  <span>{t('knowledgeGraph.statActions')}</span>
                </div>
              </div>

              <div className="kg-alerts-list">
                {GRAPH_ALERTS.map((alert, i) => (
                  <AlertCard key={alert.id} alert={alert} index={i} resolveLabel={t('knowledgeGraph.resolveBtn')} />
                ))}
              </div>
            </article>

            <article className="kg-insights">
              <header>
                <span className="kg-insights__icon"><LightbulbIcon size={14} /></span>
                <h4>{t('knowledgeGraph.aiInsightsTitle')}</h4>
                <button
                  type="button"
                  onClick={() => setInsightsOpen((v) => !v)}
                  aria-label={insightsOpen ? t('knowledgeGraph.collapse') : t('knowledgeGraph.expand')}
                >
                  {insightsOpen ? <ChevronUpIcon size={14} /> : <ChevronDownIcon size={14} />}
                </button>
              </header>
              <AnimatePresence initial={false}>
                {insightsOpen && (
                  <motion.div
                    className="kg-insights__body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="kg-insights__inner">
                      <p>{t('knowledgeGraph.aiInsightsBody')}</p>
                      <div className="kg-insights__actions">
                        <button type="button" className="kg-btn kg-btn--ghost">{t('knowledgeGraph.viewAnalysis')}</button>
                        <button type="button" className="kg-btn kg-btn--brand">{t('knowledgeGraph.applyFix')}</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ProductKnowledgeGraph;
