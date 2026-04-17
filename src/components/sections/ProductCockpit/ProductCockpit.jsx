import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInViewOnce } from '../../../hooks/useInViewOnce';
import AnimatedCounter from '../../ui/AnimatedCounter/AnimatedCounter';
import {
  DollarIcon,
  ZapIcon,
  ClockIcon,
  UsersIcon,
  TrendingUpIcon,
  ArrowRightIcon,
} from '../../ui/Icons/Icons';
import {
  COCKPIT_KPIS,
  OKR_ITEMS,
  INVESTMENT_MIX,
  TEAM_PERFORMANCE,
} from '../../../constants/productData';
import './ProductCockpit.css';

const KPI_ICONS = {
  dollar: DollarIcon,
  zap: ZapIcon,
  clock: ClockIcon,
  users: UsersIcon,
};

function KpiCard({ kpi, index }) {
  const Icon = KPI_ICONS[kpi.icon];
  const isNumeric = typeof kpi.value === 'number';
  return (
    <motion.div
      className={`cockpit-kpi-card cockpit-kpi-card--${kpi.tone}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
    >
      <span className="cockpit-kpi-card__icon"><Icon size={20} /></span>
      <div className="cockpit-kpi-card__body">
        <p className="cockpit-kpi-card__value">
          {kpi.prefix}
          {isNumeric ? (
            kpi.decimals ? (
              kpi.value.toFixed(kpi.decimals)
            ) : (
              <AnimatedCounter end={kpi.value} duration={1.4} />
            )
          ) : (
            kpi.value
          )}
          {kpi.suffix}
        </p>
        <p className="cockpit-kpi-card__label">{kpi.label}</p>
        <p className="cockpit-kpi-card__hint">{kpi.hint}</p>
      </div>
    </motion.div>
  );
}

function OkrCell({ item }) {
  return (
    <div className={`cockpit-okr-cell cockpit-okr-cell--${item.tone}`}>
      <span className="cockpit-okr-cell__indicator" aria-hidden="true" />
      <div>
        <p className="cockpit-okr-cell__label">
          {item.label}
          <span className={`cockpit-okr-cell__delta cockpit-okr-cell__delta--${item.deltaTone}`}>
            {item.delta}
          </span>
        </p>
        <p className="cockpit-okr-cell__value">
          {item.value} <span>/ {item.target}</span>
        </p>
      </div>
    </div>
  );
}

function AnimatedBar({ percentage, tone, delay = 0 }) {
  const [ref, inView] = useInViewOnce(0.3);
  return (
    <div ref={ref} className="cockpit-bar-track">
      <span
        className={`cockpit-bar-fill cockpit-bar-fill--${tone}`}
        ref={(el) => {
          if (el) {
            el.style.setProperty('--bar-width', inView ? `${percentage}%` : '0%');
            el.style.setProperty('transition-delay', `${delay}s`);
          }
        }}
      />
    </div>
  );
}

function InvestmentMixRow({ item, index }) {
  return (
    <div className="cockpit-invest-row">
      <span className="cockpit-invest-row__label">{item.label}</span>
      <AnimatedBar percentage={item.percentage} tone={item.tone} delay={index * 0.1} />
      <span className="cockpit-invest-row__value">
        <strong>{item.percentage}%</strong>
        <span className="cockpit-invest-row__target">({item.target})</span>
      </span>
    </div>
  );
}

function TeamRow({ team, index }) {
  return (
    <div className="cockpit-team-row">
      <span className="cockpit-team-row__name">
        <span className={`cockpit-team-row__dot cockpit-team-row__dot--${team.status}`} aria-hidden="true" />
        {team.name}
      </span>
      <AnimatedBar percentage={team.velocity} tone="cyan" delay={index * 0.08} />
      <span className="cockpit-team-row__values">
        <strong>{team.velocity}%</strong>
        <span className="cockpit-team-row__target">● {team.predictability}%</span>
      </span>
    </div>
  );
}

function ProductCockpit() {
  const { t } = useTranslation('product');

  return (
    <section className="cockpit-section" aria-labelledby="cockpit-title">
      <div className="container">
        <header className="cockpit-header">
          <span className="cockpit-eyebrow">
            <span className="cockpit-eyebrow__icon"><ZapIcon size={14} /></span>
            {t('cockpit.eyebrow')}
          </span>
          <h2 id="cockpit-title" className="cockpit-title">
            {t('cockpit.title1')}<span>{t('cockpit.titleAccent')}</span>{t('cockpit.title2')}<em>{t('cockpit.titleItalic')}</em>
          </h2>
          <p className="cockpit-description">
            {t('cockpit.description')}
          </p>
        </header>

        <div className="cockpit-kpi-strip">
          {COCKPIT_KPIS.map((kpi, i) => (
            <KpiCard key={kpi.label} kpi={kpi} index={i} />
          ))}
        </div>

        <article className="cockpit-overview">
          <header className="cockpit-overview__header">
            <div>
              <h3>{t('cockpit.overviewTitle')}</h3>
              <p className="cockpit-overview__subtitle">{t('cockpit.overviewSubtitle')}</p>
            </div>
            <div className="cockpit-overview__status">
              <span className="cockpit-chip cockpit-chip--brand">{t('cockpit.statusOnTrack')}</span>
              <span className="cockpit-chip cockpit-chip--warning">{t('cockpit.statusAtRisk')}</span>
            </div>
          </header>

          <div className="cockpit-overview__grid">
            <section className="cockpit-panel">
              <h4 className="cockpit-panel__title">{t('cockpit.okrTitle')}</h4>
              <div className="cockpit-okr-grid">
                {OKR_ITEMS.map((item) => (
                  <OkrCell key={item.label} item={item} />
                ))}
              </div>
            </section>

            <section className="cockpit-panel">
              <header className="cockpit-panel__header">
                <h4 className="cockpit-panel__title">{t('cockpit.investTitle')}</h4>
                <p>{t('cockpit.investSubtitle')}</p>
              </header>
              <div className="cockpit-invest-list">
                {INVESTMENT_MIX.map((item, i) => (
                  <InvestmentMixRow key={item.label} item={item} index={i} />
                ))}
              </div>
            </section>

            <section className="cockpit-panel cockpit-panel--wide">
              <header className="cockpit-panel__header">
                <h4 className="cockpit-panel__title">{t('cockpit.teamTitle')}</h4>
                <p>{t('cockpit.teamSubtitle')}</p>
                <div className="cockpit-legend">
                  <span><i className="cockpit-dot cockpit-dot--high" /> {t('cockpit.legendHigh')}</span>
                  <span><i className="cockpit-dot cockpit-dot--medium" /> {t('cockpit.legendMedium')}</span>
                  <span><i className="cockpit-dot cockpit-dot--low" /> {t('cockpit.legendLow')}</span>
                </div>
              </header>
              <div className="cockpit-team-list">
                {TEAM_PERFORMANCE.map((team, i) => (
                  <TeamRow key={team.name} team={team} index={i} />
                ))}
              </div>
            </section>

            <section className="cockpit-panel cockpit-panel--insight">
              <span className="cockpit-insight__icon"><TrendingUpIcon size={20} /></span>
              <h4 className="cockpit-panel__title">{t('cockpit.insightTitle')}</h4>
              <p className="cockpit-insight__body">
                {t('cockpit.insightBody')}
              </p>
              <a href="#signup" className="cockpit-insight__link">
                {t('cockpit.insightLink')} <ArrowRightIcon size={14} />
              </a>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ProductCockpit;
