import { useTranslation } from 'react-i18next';
import SectionTitle from '../../ui/SectionTitle/SectionTitle.jsx';
import './F1Engine.css';

const ICON_PATHS = {
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
  x: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.35-4.35" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3 2.5 20h19L12 3z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  bot: (
    <>
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <path d="M12 3v4" />
      <circle cx="9" cy="13" r="1" />
      <circle cx="15" cy="13" r="1" />
      <path d="M9 17h6" />
    </>
  ),
  graph: (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="M12 7v4M12 11l-6 6M12 11l6 6" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
};

const WITHOUT_ICONS = ['x', 'search', 'warning'];
const WITH_ICONS = ['bot', 'graph', 'check'];

function Icon({ name }) {
  const paths = ICON_PATHS[name];
  if (!paths) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths}
    </svg>
  );
}

function ComparisonCard({ variant, cardIcon, title, subtitle, items, itemIcons }) {
  return (
    <article className={`f1-engine__card f1-engine__card--${variant}`}>
      <header className="f1-engine__card-header">
        <span className="f1-engine__card-icon">
          <Icon name={cardIcon} />
        </span>
        <div className="f1-engine__card-heading">
          <h3 className="f1-engine__card-title">{title}</h3>
          <p className="f1-engine__card-eyebrow">{subtitle}</p>
        </div>
      </header>
      <ul className="f1-engine__item-list">
        {items.map((item, idx) => (
          <li key={idx} className="f1-engine__item">
            <span className="f1-engine__item-icon">
              <Icon name={itemIcons[idx]} />
            </span>
            <div className="f1-engine__item-body">
              {item.badge && (
                <span className="f1-engine__item-badge">{item.badge}</span>
              )}
              <h4 className="f1-engine__item-title">{item.title}</h4>
              <p className="f1-engine__item-description">{item.description}</p>
              <p className="f1-engine__item-metric">
                <span className="f1-engine__item-metric-label">
                  {item.metricLabel}:
                </span>{' '}
                <span className="f1-engine__item-metric-value">
                  {item.metricValue}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

function F1Engine() {
  const { t } = useTranslation('landing');

  const withoutItems = t('f1Engine.without.items', { returnObjects: true });
  const withItems = t('f1Engine.with.items', { returnObjects: true });

  return (
    <section className="f1-engine" id="f1-engine">
      <div className="container">
        <div className="f1-engine__header">
          <p className="f1-engine__eyebrow">{t('f1Engine.eyebrow')}</p>
          <SectionTitle as="h2" align="center">
            <span>{t('f1Engine.title1')}</span>
            <br />
            <span>{t('f1Engine.title2')}</span>
            <span className="accent">{t('f1Engine.titleAccent')}</span>
          </SectionTitle>
          <p className="f1-engine__subtitle">
            {t('f1Engine.subtitle')}
          </p>
        </div>

        <div className="f1-engine__grid">
          <ComparisonCard
            variant="danger"
            cardIcon="clock"
            title={t('f1Engine.without.title')}
            subtitle={t('f1Engine.without.subtitle')}
            items={withoutItems}
            itemIcons={WITHOUT_ICONS}
          />
          <ComparisonCard
            variant="success"
            cardIcon="bolt"
            title={t('f1Engine.with.title')}
            subtitle={t('f1Engine.with.subtitle')}
            items={withItems}
            itemIcons={WITH_ICONS}
          />
          <span className="f1-engine__connector" aria-hidden="true">
            <Icon name="arrow-right" />
          </span>
        </div>
      </div>
    </section>
  );
}

export default F1Engine;
