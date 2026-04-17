import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  BotIcon,
  ZapIcon,
  BrainIcon,
  ShieldIcon,
  SparklesIcon,
  ClockIcon,
  RefreshIcon,
  PlayIcon,
  ArrowRightIcon,
  AlertTriangleIcon,
  TargetIcon,
} from '../../ui/Icons/Icons';
import { ACTION_PLANS } from '../../../constants/productData';
import './ProductAgenticWorkflows.css';

const HIGHLIGHT_ICONS = [ZapIcon, BrainIcon, ShieldIcon];
const HIGHLIGHT_TONES = ['brand', 'blue', 'yellow'];

function PlanListItem({ plan, active, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={`aw-plan${active ? ' aw-plan--active' : ''}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
    >
      <header className="aw-plan__head">
        <span className={`aw-plan__icon aw-plan__icon--${plan.impact}`}>
          <AlertTriangleIcon size={14} />
        </span>
        <span className="aw-plan__title">{plan.title}</span>
        <span className={`aw-plan__status aw-plan__status--${plan.status}`}>{plan.status}</span>
      </header>
      <p className="aw-plan__desc">{plan.description}</p>
      <footer className="aw-plan__foot">
        <span className={`aw-chip aw-chip--${plan.impact}`}>{plan.impact} impact</span>
        <span className="aw-plan__time">
          <ClockIcon size={12} /> {plan.timeToResolve}
        </span>
      </footer>
    </motion.button>
  );
}

function PlanDetail({ plan, t }) {
  return (
    <>
      <header className="aw-detail__head">
        <div>
          <div className="aw-detail__agent">
            <span className="aw-detail__bot"><BotIcon size={16} /></span>
            <span className="aw-detail__agent-name">{t('agenticWorkflows.sheldonAgent')}</span>
            <span className="aw-detail__confidence">{plan.confidence}{t('agenticWorkflows.confidence')}</span>
          </div>
          <h3>{plan.title}</h3>
          <p>{plan.description}</p>
        </div>
        <span className={`aw-chip aw-chip--${plan.impact} aw-chip--lg`}>
          {plan.impact} impact
        </span>
      </header>

      <section className="aw-detail__teams">
        <span className="aw-label">{t('agenticWorkflows.affectedTeams')}</span>
        <div className="aw-detail__teams-list">
          {plan.affectedTeams.map((team) => (
            <span key={team} className="aw-team-chip">{team}</span>
          ))}
        </div>
      </section>

      <section className="aw-detail__steps">
        <header>
          <span className="aw-label">
            <SparklesIcon size={14} /> {t('agenticWorkflows.resolutionSteps')}
          </span>
          <span className="aw-detail__eta">Est. {plan.timeToResolve}</span>
        </header>
        <ol>
          {plan.suggestedActions.map((action, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="aw-step__num">{i + 1}</span>
              <span className="aw-step__text">{action}</span>
              <button type="button" className="aw-btn aw-btn--mini">{t('agenticWorkflows.applyBtn')}</button>
            </motion.li>
          ))}
        </ol>
      </section>

      <footer className="aw-detail__foot">
        <button type="button" className="aw-btn aw-btn--ghost">
          <RefreshIcon size={14} /> {t('agenticWorkflows.regenerateBtn')}
        </button>
        <div className="aw-detail__foot-actions">
          <button type="button" className="aw-btn aw-btn--outline">
            <PlayIcon size={12} /> {t('agenticWorkflows.simulateBtn')}
          </button>
          <button type="button" className="aw-btn aw-btn--primary">
            {t('agenticWorkflows.executeBtn')} <ArrowRightIcon size={12} />
          </button>
        </div>
      </footer>
    </>
  );
}

function ProductAgenticWorkflows() {
  const [selectedId, setSelectedId] = useState(ACTION_PLANS[0].id);
  const { t } = useTranslation('product');
  const selected = ACTION_PLANS.find((p) => p.id === selectedId) || ACTION_PLANS[0];
  const highlights = t('agenticWorkflows.highlights', { returnObjects: true });

  return (
    <section className="aw-section" aria-labelledby="aw-title">
      <div className="aw-glow aw-glow--left" aria-hidden="true" />
      <div className="aw-glow aw-glow--right" aria-hidden="true" />

      <div className="container">
        <header className="aw-header">
          <div className="aw-eyebrow-row">
            <span className="aw-eyebrow">
              <span className="aw-eyebrow__icon"><BotIcon size={14} /></span>
              {t('agenticWorkflows.eyebrow')}
            </span>
            <span className="aw-new-badge">{t('agenticWorkflows.newBadge')}</span>
          </div>
          <h2 id="aw-title" className="aw-title">
            {t('agenticWorkflows.title1')}<span>{t('agenticWorkflows.titleAccent')}</span>{t('agenticWorkflows.title2')}<em>{t('agenticWorkflows.titleItalic')}</em>
          </h2>
          <p className="aw-description">
            {t('agenticWorkflows.description')}
          </p>
        </header>

        <div className="aw-grid">
          <aside className="aw-plan-list">
            <span className="aw-label aw-label--section">{t('agenticWorkflows.plansLabel')}</span>
            {ACTION_PLANS.map((plan) => (
              <PlanListItem
                key={plan.id}
                plan={plan}
                active={plan.id === selectedId}
                onSelect={() => setSelectedId(plan.id)}
              />
            ))}
          </aside>

          <div className="aw-detail-wrap">
            <AnimatePresence mode="wait">
              <motion.article
                key={selected.id}
                className="aw-detail"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <PlanDetail plan={selected} t={t} />
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <div className="aw-highlights">
          {highlights.map((h, i) => {
            const Icon = HIGHLIGHT_ICONS[i];
            return (
              <motion.article
                key={i}
                className={`aw-highlight aw-highlight--${HIGHLIGHT_TONES[i]}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="aw-highlight__icon"><Icon size={20} /></span>
                <h3>{h.title}</h3>
                <p>{h.description}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="aw-stat-pill"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="aw-stat-pill__icon"><TargetIcon size={20} /></span>
          <strong>20%</strong>
          <span>{t('agenticWorkflows.statLabel')}</span>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductAgenticWorkflows;
