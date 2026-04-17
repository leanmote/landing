import { useTranslation } from 'react-i18next';
import './Benchmarks.css';

const BENCHMARK_TIERS = [
  { tier: 'ELITE_PERFORMERS', cost: '$0.10 - $0.30' },
  { tier: 'HIGH_VELOCITY',    cost: '$0.40 - $0.90' },
  { tier: 'ESTABLISHED',      cost: '$1.00 - $1.60' },
];

function Benchmarks({ embedded = false }) {
  const { t } = useTranslation('landing');
  const rows = t('benchmarks.rows', { returnObjects: true });
  const sectionClass = `benchmarks${embedded ? ' benchmarks--embedded' : ''}`;

  return (
    <section className={sectionClass} id="benchmarks">
      <div className="container">
        {!embedded && (
          <div className="benchmarks__header">
            <p className="benchmarks__eyebrow">{t('benchmarks.eyebrow')}</p>
            <h2 className="benchmarks__title">
              {t('benchmarks.title')}<span>{t('benchmarks.titleAccent')}</span>
            </h2>
          </div>
        )}

        <div className="benchmarks__table" role="table" aria-label={t('benchmarks.title') + t('benchmarks.titleAccent')}>
          <div className="benchmarks__row benchmarks__row--head" role="row">
            <div className="benchmarks__cell" role="columnheader">{t('benchmarks.colTier')}</div>
            <div className="benchmarks__cell" role="columnheader">{t('benchmarks.colCost')}</div>
            <div className="benchmarks__cell" role="columnheader">{t('benchmarks.colCharacteristics')}</div>
          </div>

          {BENCHMARK_TIERS.map((row, idx) => (
            <div key={row.tier} className="benchmarks__row" role="row">
              <div className="benchmarks__cell benchmarks__tier" role="cell">
                {row.tier}
              </div>
              <div className="benchmarks__cell benchmarks__cost" role="cell">
                {row.cost}
              </div>
              <div className="benchmarks__cell benchmarks__desc" role="cell">
                {rows[idx]?.characteristics}
              </div>
            </div>
          ))}
        </div>

        <p className="benchmarks__note">{t('benchmarks.note')}</p>
      </div>
    </section>
  );
}

export default Benchmarks;
