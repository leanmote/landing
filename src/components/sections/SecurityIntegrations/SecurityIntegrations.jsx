import { useTranslation } from 'react-i18next';
import SectionTitle from '../../ui/SectionTitle/SectionTitle.jsx';
import { INTEGRATION_LOGOS } from '../../../constants/integrations.js';
import './SecurityIntegrations.css';

function SecurityIntegrations() {
  const { t } = useTranslation('landing');
  const cards = t('security.cards', { returnObjects: true });

  return (
    <section className="security-integrations" id="security">
      <div className="container security-integrations__grid">
        <div className="security-integrations__pane">
          <p className="security-integrations__eyebrow">{t('security.eyebrow1')}</p>
          <SectionTitle as="h2">
            <span>{t('security.title1')}</span>
            <span className="accent">{t('security.titleAccent1')}</span>
          </SectionTitle>
          <p className="security-integrations__desc">
            {t('security.desc1')}
          </p>

          <ul className="security-integrations__cards">
            {cards.map((card, idx) => (
              <li key={idx} className="security-card">
                <div className="security-card__badge">{['SOC2', 'READ', 'ZERO'][idx]}</div>
                <div className="security-card__body">
                  <h4 className="security-card__title">{card.title}</h4>
                  <p className="security-card__desc">{card.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="security-integrations__pane">
          <p className="security-integrations__eyebrow">{t('security.eyebrow2')}</p>
          <SectionTitle as="h2">
            <span>{t('security.title2')}</span>
            <span className="accent">{t('security.titleAccent2')}</span>
          </SectionTitle>
          <p className="security-integrations__desc">
            {t('security.desc2')}
          </p>

          <ul className="security-integrations__logos" id="integrations">
            {INTEGRATION_LOGOS.map((logo) => (
              <li key={logo.name} className="integration-logo">
                <img src={logo.src} alt={logo.name} loading="lazy" />
                <span>{logo.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SecurityIntegrations;
