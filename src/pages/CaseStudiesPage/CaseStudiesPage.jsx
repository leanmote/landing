import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SubscribeCTA from '../../components/sections/SubscribeCTA/SubscribeCTA.jsx';
import vitaWalletLogo from '../../../public/logos/clients/vita-wallet.png';
import gaussLogo from '../../../public/logos/clients/gauss.png';
import teamcoreLogo from '../../../public/logos/clients/teamcore.png';
import './CaseStudiesPage.css';

const base = import.meta.env.BASE_URL;

const CASE_STUDY_META = [
<<<<<<< HEAD
  { company: 'Vita Wallet',     logoSrc: base + 'logos/clients/vita-wallet.png', industry: 'Fintech',                   teamSize: '15 engineers', metrics: ['24%', '+25%', '$125k'], tone: 'green',  role: 'Vita Wallet'     },
  { company: 'Gauss Control',   logoSrc: base + 'logos/clients/gauss.png',       industry: 'AI Safety Technology',      teamSize: '25+ engineers', metrics: ['37%', '+22%', '$270k'], tone: 'yellow', role: 'Gauss Control'   },
  { company: 'Holon Software',  logoSrc: base + 'logos/clients/teamcore.png',    industry: 'Retail Execution Software',  teamSize: '40+ engineers', metrics: ['55%', '+31%', '$340k'], tone: 'blue',   role: 'Holon Software'  },
=======
  { company: 'Vita Wallet',     logoSrc: vitaWalletLogo, industry: 'Fintech',                   teamSize: '15 engineers', metrics: ['24%', '+25%', '$125k'], tone: 'green',  role: 'Vita Wallet'     },
  { company: 'Gauss Control',   logoSrc: gaussLogo,      industry: 'AI Safety Technology',      teamSize: '25+ engineers', metrics: ['37%', '+22%', '$270k'], tone: 'yellow', role: 'Gauss Control'   },
  { company: 'Holon Software',  logoSrc: teamcoreLogo,   industry: 'Retail Execution Software',  teamSize: '40+ engineers', metrics: ['55%', '+31%', '$340k'], tone: 'blue',   role: 'Holon Software'  },
>>>>>>> 9f00185 (feat: set English as default language and import images as module assets)
];

function CaseStudiesPage() {
  const { t } = useTranslation('casestudies');
  const studies = t('studies', { returnObjects: true });

  return (
    <main className="case-studies-page">
      <section className="case-studies-hero" aria-labelledby="case-studies-title">
        <div className="case-studies-hero__glow case-studies-hero__glow--left" aria-hidden="true" />
        <div className="case-studies-hero__glow case-studies-hero__glow--right" aria-hidden="true" />

        <div className="container">
          <motion.div
            className="case-studies-hero__content"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <p className="eyebrow-pill">{t('hero.eyebrow')}</p>
            <h1 id="case-studies-title" className="case-studies-hero__title">
              {t('hero.title')}
            </h1>
            <p className="case-studies-hero__subtitle">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="case-studies-list" id="case-studies" aria-label="Case studies">
        <div className="container case-studies-list__stack">
          {studies.map((study, index) => {
            const meta = CASE_STUDY_META[index];
            return (
              <motion.article
                key={meta.company}
                className={`case-study-card case-study-card--${meta.tone}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
              >
                <div className="case-study-card__content">
                  <div className="case-study-card__company">
                    <div className="case-study-card__logo-wrap">
                      <img
                        src={meta.logoSrc}
                        alt={`${meta.company} logo`}
                        className="case-study-card__logo"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h2 className="case-study-card__company-name">{meta.company}</h2>
                      <p className="case-study-card__company-meta">
                        {meta.industry} | {meta.teamSize}
                      </p>
                    </div>
                  </div>

                  <h3 className="case-study-card__headline">{study.headline}</h3>
                  <p className="case-study-card__description">{study.description}</p>

                  <div className="case-study-card__metrics" role="list" aria-label={`${meta.company} metrics`}>
                    {study.metrics.map((metric, mIdx) => (
                      <div className="case-study-card__metric" key={mIdx} role="listitem">
                        <p className="case-study-card__metric-value">{meta.metrics[mIdx]}</p>
                        <p className="case-study-card__metric-label">{metric.label}</p>
                        <p className="case-study-card__metric-detail">{metric.detail}</p>
                      </div>
                    ))}
                  </div>

                  <Link to="/pricing" className="btn btn--secondary case-study-card__link">
                    {t('card.explorePricing')}
                  </Link>
                </div>

                <aside className="case-study-card__quote">
                  <p className="case-study-card__quote-text">&ldquo;{study.quote}&rdquo;</p>
                  <div className="case-study-card__author">
                    <span className="case-study-card__author-avatar" aria-hidden="true">
                      {study.author.charAt(0)}
                    </span>
                    <span>
                      <strong className="case-study-card__author-name">{study.author}</strong>
                      <span className="case-study-card__author-role">{meta.role}</span>
                    </span>
                  </div>
                </aside>
              </motion.article>
            );
          })}
        </div>
      </section>

      <SubscribeCTA />
    </main>
  );
}

export default CaseStudiesPage;
