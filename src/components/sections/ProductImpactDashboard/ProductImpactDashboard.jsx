import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInViewOnce } from '../../../hooks/useInViewOnce';
import AnimatedCounter from '../../ui/AnimatedCounter/AnimatedCounter';
import {
  TargetIcon,
  DollarIcon,
  ZapIcon,
  BotIcon,
  ShieldIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CheckCircleIcon,
} from '../../ui/Icons/Icons';
import { IMPACT_KPIS, BENCHMARK_ROWS, SPARKLINE_POINTS } from '../../../constants/productData';
import './ProductImpactDashboard.css';

const KPI_ICONS = {
  dollar: DollarIcon,
  zap: ZapIcon,
  bot: BotIcon,
  shield: ShieldIcon,
};

function ImpactKpi({ kpi, index }) {
  const Icon = KPI_ICONS[kpi.icon] || DollarIcon;
  const isNumeric = typeof kpi.value === 'number';
  const isNegativeDelta = kpi.delta && kpi.delta.startsWith('-');
  return (
    <motion.div
      className={`im-kpi im-kpi--${kpi.tone}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
    >
      <header>
        <span className="im-kpi__icon"><Icon size={16} /></span>
        <span className="im-kpi__label">{kpi.label}</span>
      </header>
      <p className="im-kpi__value">
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
      <footer>
        <span className={`im-kpi__delta im-kpi__delta--${kpi.deltaTone}`}>
          {isNegativeDelta ? <TrendingDownIcon size={12} /> : <TrendingUpIcon size={12} />}
          {kpi.delta}
        </span>
        <span className="im-kpi__hint">{kpi.hint}</span>
      </footer>
    </motion.div>
  );
}

function BenchmarkRow({ row, index, eliteTargetLabel }) {
  const [ref, inView] = useInViewOnce(0.3);
  return (
    <div ref={ref} className="im-bench-row">
      <span className="im-bench-row__label">{row.label}</span>
      <div className="im-bench-row__track">
        <span
          className={`im-bench-row__fill im-bench-row__fill--${row.tone}`}
          ref={(el) => {
            if (el) {
              el.style.setProperty('--bar-width', inView ? `${row.yourPct}%` : '0%');
              el.style.setProperty('transition-delay', `${index * 0.1}s`);
            }
          }}
        />
        <span className="im-bench-row__notch" aria-hidden="true" />
      </div>
      <span className="im-bench-row__values">
        <strong>{row.yourValue}</strong>
        <span>{row.eliteValue} {eliteTargetLabel}</span>
      </span>
    </div>
  );
}

function TrendSparkline({ t }) {
  const [ref, inView] = useInViewOnce(0.3);
  const w = 600;
  const h = 120;
  const max = Math.max(...SPARKLINE_POINTS);
  const min = Math.min(...SPARKLINE_POINTS);
  const range = max - min || 1;
  const step = w / (SPARKLINE_POINTS.length - 1);
  const points = SPARKLINE_POINTS.map((p, i) => {
    const x = i * step;
    const y = h - ((p - min) / range) * (h - 20) - 10;
    return [x, y];
  });
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const area = `${line} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div ref={ref} className="im-sparkline">
      <header>
        <h4>{t('impactDashboard.productivityIndex')}</h4>
        <span className="im-sparkline__tag">{t('impactDashboard.last30Days')}</span>
      </header>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="im-sparkline__svg">
        <defs>
          <linearGradient id="im-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill="url(#im-area)"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      </svg>
    </div>
  );
}

function ProductImpactDashboard() {
  const { t } = useTranslation('product');

  return (
    <section className="im-section" aria-labelledby="im-title">
      <div className="container">
        <header className="im-header">
          <span className="im-eyebrow">
            <span className="im-eyebrow__icon"><TargetIcon size={14} /></span>
            {t('impactDashboard.eyebrow')}
          </span>
          <h2 id="im-title" className="im-title">
            {t('impactDashboard.title')}<em>{t('impactDashboard.titleItalic')}</em>
          </h2>
          <p className="im-description">
            {t('impactDashboard.description')}
          </p>
        </header>

        <article className="im-dashboard">
          <div className="im-chrome">
            <div className="im-chrome__dots" aria-hidden="true">
              <i /><i /><i />
            </div>
            <div className="im-chrome__url">
              <i className="im-chrome__url-dot" />
              <span>app.leanmote.com/dashboard</span>
            </div>
            <span className="im-chrome__live">LIVE</span>
          </div>

          <div className="im-body">
            <header className="im-body__head">
              <div>
                <h3>{t('impactDashboard.dashboardTitle')}</h3>
                <p className="im-body__subtitle">{t('impactDashboard.lastUpdated')}</p>
              </div>
              <span className="im-body__status">
                <CheckCircleIcon size={14} /> {t('impactDashboard.allHealthy')}
              </span>
            </header>

            <div className="im-kpis">
              {IMPACT_KPIS.map((kpi, i) => (
                <ImpactKpi key={kpi.label} kpi={kpi} index={i} />
              ))}
            </div>

            <div className="im-benchmarks">
              <header>
                <h4>{t('impactDashboard.benchmarksTitle')}</h4>
                <span>{t('impactDashboard.benchmarksSubtitle')}</span>
              </header>
              <div className="im-bench-list">
                {BENCHMARK_ROWS.map((row, i) => (
                  <BenchmarkRow key={row.label} row={row} index={i} eliteTargetLabel={t('impactDashboard.eliteTarget')} />
                ))}
              </div>
            </div>

            <TrendSparkline t={t} />
          </div>
        </article>
      </div>
    </section>
  );
}

export default ProductImpactDashboard;
