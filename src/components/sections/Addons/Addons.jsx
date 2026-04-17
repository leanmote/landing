import { useTranslation } from 'react-i18next';
import SectionTitle from '../../ui/SectionTitle/SectionTitle.jsx';
import Button from '../../ui/Button/Button.jsx';
import { ADDONS } from '../../../constants/pricing.js';
import './Addons.css';

const ICON_PATHS = {
  zap: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
  chart: (
    <>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-8" />
      <path d="M3 20h18" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

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

function CreditPacks({ packs }) {
  return (
    <ul className="addon__packs">
      {packs.map((pack) => (
        <li key={pack.amount} className="addon__pack">
          <div className="addon__pack-info">
            <span className="addon__pack-amount">{pack.amount}</span>
            {pack.save && <span className="addon__pack-save">{pack.save}</span>}
          </div>
          <span className="addon__pack-price">{pack.price}</span>
        </li>
      ))}
    </ul>
  );
}

function PriceTag({ price, unit }) {
  return (
    <div className="addon__price">
      <span className="addon__price-amount">{price}</span>
      {unit && <span className="addon__price-unit">{unit}</span>}
    </div>
  );
}

function AddonCard({ addon }) {
  return (
    <article className={`addon addon--${addon.accent}`}>
      <span className="addon__accent" aria-hidden="true" />
      <header className="addon__header">
        <span className="addon__icon">
          <Icon name={addon.icon} />
        </span>
        {addon.badge && <span className="addon__badge">{addon.badge}</span>}
      </header>

      <h3 className="addon__title">{addon.title}</h3>
      <p className="addon__description">{addon.description}</p>

      <div className="addon__body">
        {addon.packs ? <CreditPacks packs={addon.packs} /> : null}
      </div>

      <div className="addon__footer">
        {addon.price && <PriceTag price={addon.price} unit={addon.priceUnit} />}
        <Button variant="secondary" className="addon__cta">
          {addon.cta}
        </Button>
      </div>
    </article>
  );
}

function Addons() {
  const { t } = useTranslation('pricing');
  const addonTexts = t('addons.items', { returnObjects: true });

  const addons = ADDONS.map((addon, i) => ({
    ...addon,
    ...(addonTexts[i] || {}),
    packs: addon.packs
      ? addon.packs.map((pack, j) => ({
          ...pack,
          ...(addonTexts[i]?.packs?.[j] || {}),
        }))
      : undefined,
  }));

  return (
    <section className="addons" id="addons">
      <div className="container">
        <div className="addons__header">
          <span className="addons__chip">{t('addons.chip')}</span>
          <SectionTitle as="h2" align="center">
            <span className="addons__title-highlight">{t('addons.titleHighlight')}</span>
            <span>{t('addons.titleEnd')}</span>
          </SectionTitle>
        </div>

        <div className="addons__grid">
          {addons.map((addon) => (
            <AddonCard key={addon.id} addon={addon} />
          ))}
        </div>

        <p className="addons__footer">
          <a href="https://be.leanmote.com/book-a-demo-0" className="addons__footer-link">
            {t('addons.salesLink')}
            <Icon name="arrow" />
          </a>
        </p>
      </div>
    </section>
  );
}

export default Addons;
