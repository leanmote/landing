import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../../ui/SectionTitle/SectionTitle.jsx';
import Button from '../../ui/Button/Button.jsx';
import { PRICING_TIERS } from '../../../constants/pricing.js';
import './Pricing.css';

const MIN_CONTRIBUTORS = 5;
const MAX_CONTRIBUTORS = 200;

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 5 5 9-11" />
    </svg>
  );
}

function SparkleIcon() {
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
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
    </svg>
  );
}

function AnnualBox({ tier, isAnnual, contributors, t }) {
  if (tier.monthlyTotal == null || tier.annualTotal == null) {
    if (tier.annualBoxNote) {
      return (
        <div className="pricing__annual pricing__annual--note">
          <p className="pricing__annual-note">{tier.annualBoxNote}</p>
        </div>
      );
    }
    return null;
  }

  const billableContributors =
    tier.isFree ? Math.min(contributors, MIN_CONTRIBUTORS) : contributors;

  const total = tier.isFree ? 0 : isAnnual ? tier.annualTotal : tier.monthlyTotal;
  const totalDisplay = total === 0 ? '$0' : `$${total.toLocaleString('en-US')}`;

  return (
    <div className="pricing__annual">
      <p className="pricing__annual-headline">
        {isAnnual ? t('pricing.annualTotal') : t('pricing.monthlyTotal')} {t('pricing.for')} {billableContributors} {t('pricing.contributorsSuffix')}
      </p>
      <p className="pricing__annual-total">
        <span className="pricing__annual-amount">{totalDisplay}</span>
        <span className="pricing__annual-unit">USD {isAnnual ? '/ year' : '/ month'}</span>
      </p>
      {!tier.isFree && isAnnual && (
        <p className="pricing__annual-badge">{t('pricing.annualBilled')}</p>
      )}
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CreditsSelector({ tier, t }) {
  const [value, setValue] = useState(tier.credits);

  return (
    <div className="pricing__credits">
      <span className="pricing__credits-label">
        <SparkleIcon />
        <span>{t('pricing.creditsLabel')}</span>
      </span>
      {tier.creditsOptions ? (
        <label className="pricing__credits-select-wrap">
          <select
            className="pricing__credits-select"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            aria-label={`${tier.name} monthly credits`}
          >
            {tier.creditsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="pricing__credits-chevron" aria-hidden="true">
            <ChevronIcon />
          </span>
        </label>
      ) : (
        <span className="pricing__credits-value">{tier.credits}</span>
      )}
    </div>
  );
}

function TierCard({ tier, isAnnual, contributors, t }) {
  const modifier = tier.highlighted ? ' pricing__card--highlighted' : '';

  return (
    <article className={`pricing__card${modifier}`}>
      {tier.badge && <span className="pricing__card-badge">{tier.badge}</span>}

      <header className="pricing__card-header">
        <h3 className="pricing__card-name">{tier.name}</h3>
        <div className="pricing__card-price">
          <span className="pricing__card-amount">{tier.displayPrice}</span>
          {tier.displayPeriod && (
            <span className="pricing__card-period">{tier.displayPeriod}</span>
          )}
        </div>
        <p className="pricing__card-description">{tier.description}</p>
      </header>

      <AnnualBox tier={tier} isAnnual={isAnnual} contributors={contributors} t={t} />
      <CreditsSelector tier={tier} t={t} />

      <div className="pricing__features">
        {tier.featuresHeader && (
          <p className="pricing__features-header">{tier.featuresHeader}</p>
        )}
        <ul className="pricing__feature-list">
          {tier.features.map((feature) => (
            <li key={feature} className="pricing__feature">
              <span className="pricing__feature-icon">
                <CheckIcon />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button variant={tier.ctaVariant} className="pricing__card-cta">
        {tier.cta}
      </Button>
    </article>
  );
}

function Pricing({ showHeader = true }) {
  const [isAnnual, setIsAnnual] = useState(true);
  const [contributors, setContributors] = useState(MIN_CONTRIBUTORS);
  const sliderRef = useRef(null);
  const { t } = useTranslation('pricing');
  const tierTexts = t('pricing.tiers', { returnObjects: true });

  const tiers = useMemo(() => {
    return PRICING_TIERS.map((tier, i) => {
      const text = tierTexts[i] || {};
      const merged = { ...tier, ...text };

      if (typeof tier.monthlyRate !== 'number' || typeof tier.annualRate !== 'number') {
        return {
          ...merged,
          isFree: false,
          displayPrice: tier.price,
          displayPeriod: tier.period,
          monthlyTotal: null,
          annualTotal: null,
        };
      }

      const perContributor = isAnnual ? tier.annualRate : tier.monthlyRate;
      const billableContributors =
        tier.name === 'Free'
          ? Math.min(contributors, MIN_CONTRIBUTORS)
          : contributors;

      const monthlyTotal = perContributor * billableContributors;
      const annualTotal = monthlyTotal * 12;
      const isFree = tier.name === 'Free';
      const displayPrice = isFree ? '$0' : `$${perContributor}`;
      const displayPeriod = isFree ? '/mo' : '/contributor/mo';

      return {
        ...merged,
        isFree,
        perContributor,
        monthlyTotal,
        annualTotal,
        displayPrice,
        displayPeriod,
      };
    });
  }, [isAnnual, contributors, tierTexts]);

  function handleContributorInput(rawValue) {
    const nextValue = Number.parseInt(rawValue, 10);

    if (Number.isNaN(nextValue)) {
      setContributors(MIN_CONTRIBUTORS);
      return;
    }

    setContributors(
      Math.min(MAX_CONTRIBUTORS, Math.max(MIN_CONTRIBUTORS, nextValue)),
    );
  }

  const sliderProgress =
    ((contributors - MIN_CONTRIBUTORS) /
      (MAX_CONTRIBUTORS - MIN_CONTRIBUTORS)) *
    100;

  return (
    <section className={`pricing${showHeader ? '' : ' pricing--embedded'}`} id="pricing">
      <div className="container">
        {showHeader && (
          <div className="pricing__header">
            <p className="pricing__eyebrow">{t('pricing.eyebrow')}</p>
            <SectionTitle as="h2" align="center">
              <span>{t('pricing.title1')}</span>
              <span className="pricing__title-highlight">{t('pricing.titleHighlight')}</span>
              <span>{t('pricing.title2')}</span>
            </SectionTitle>
            <p className="pricing__subtitle">
              {t('pricing.subtitle')}
            </p>
          </div>
        )}

        <div className="pricing__controls" aria-label="Pricing controls">
          <div className="pricing__billing">
            <span
              className={`pricing__billing-label${!isAnnual ? ' pricing__billing-label--active' : ''}`}
            >
              {t('pricing.billingMonthly')}
            </span>
            <button
              type="button"
              className={`pricing__billing-toggle${isAnnual ? ' pricing__billing-toggle--annual' : ''}`}
              onClick={() => setIsAnnual((current) => !current)}
              aria-label="Toggle annual billing"
              aria-pressed={isAnnual}
            >
              <span className="pricing__billing-thumb" aria-hidden="true" />
            </button>
            <span
              className={`pricing__billing-label${isAnnual ? ' pricing__billing-label--active' : ''}`}
            >
              {t('pricing.billingAnnual')}
            </span>
            {isAnnual && <span className="pricing__billing-save">{t('pricing.savePct')}</span>}
          </div>

          <div className="pricing__contributors">
            <div className="pricing__contributors-row">
              <span className="pricing__contributors-label">{t('pricing.contributorsLabel')}</span>
              <label className="pricing__contributors-input-wrap">
                <span className="visually-hidden">{t('pricing.contributorsSuffix')}</span>
                <input
                  type="number"
                  min={MIN_CONTRIBUTORS}
                  max={MAX_CONTRIBUTORS}
                  value={contributors}
                  onChange={(event) => handleContributorInput(event.target.value)}
                  className="pricing__contributors-input"
                />
                <span className="pricing__contributors-suffix">{t('pricing.contributorsSuffix')}</span>
              </label>
            </div>

            <input
              ref={sliderRef}
              type="range"
              className="pricing__contributors-slider"
              min={MIN_CONTRIBUTORS}
              max={MAX_CONTRIBUTORS}
              value={contributors}
              onChange={(event) => {
                const next = Number(event.target.value);
                setContributors(next);
                const pct = ((next - MIN_CONTRIBUTORS) / (MAX_CONTRIBUTORS - MIN_CONTRIBUTORS)) * 100;
                event.target.style.setProperty('--slider-progress', `${pct}%`);
              }}
            />

            <div className="pricing__contributors-scale">
              <span className="pricing__contributors-current">{contributors} {t('pricing.contributorsSelected')}</span>
              <span className="pricing__contributors-max">{t('pricing.contributorsMax')}</span>
            </div>
          </div>
        </div>

        <div className="pricing__grid">
          {tiers.map((tier) => (
            <TierCard
              key={tier.name}
              tier={tier}
              isAnnual={isAnnual}
              contributors={contributors}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
