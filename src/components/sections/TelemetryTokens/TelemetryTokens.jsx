import { useTranslation } from 'react-i18next';
import Button from '../../ui/Button/Button.jsx';
import './TelemetryTokens.css';

const TOKEN_AMOUNTS = [100, 500, 1000];
const TOKEN_PRICES = [49, 199, 349];

function TelemetryTokens({ embedded = false }) {
  const { t } = useTranslation('pricing');
  const packages = t('telemetryTokens.packages', { returnObjects: true });
  const sectionClass = `telemetry${embedded ? ' telemetry--embedded' : ''}`;

  return (
    <section className={sectionClass} id="telemetry-tokens">
      <div className="container">
        {!embedded && (
          <div className="telemetry__header">
            <p className="telemetry__eyebrow">{t('telemetryTokens.eyebrow')}</p>
            <h2 className="telemetry__title">
              {t('telemetryTokens.title')}<span>{t('telemetryTokens.titleAccent')}</span>
            </h2>
            <p className="telemetry__subtitle">
              {t('telemetryTokens.subtitle')}
            </p>
          </div>
        )}

        <div className="telemetry__grid">
          {packages.map((pkg, i) => (
            <article key={TOKEN_AMOUNTS[i]} className="telemetry__card">
              {pkg.badge && <span className="telemetry__badge">{pkg.badge}</span>}

              <p className="telemetry__tokens">{TOKEN_AMOUNTS[i]}</p>
              <p className="telemetry__tokens-label">{t('telemetryTokens.tokensLabel')}</p>

              <p className="telemetry__price">${TOKEN_PRICES[i]}</p>
              <p className="telemetry__description">{pkg.description}</p>

              <Button variant="secondary" className="telemetry__cta">
                {t('telemetryTokens.acquireBtn')}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TelemetryTokens;
