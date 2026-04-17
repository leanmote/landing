import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SubscribeCTA from '../../components/sections/SubscribeCTA/SubscribeCTA.jsx';
import './WhoIsThisForPage.css';

function TrendingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="who-icon">
      <path d="M4 16h4l3-5 3 3 5-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 6h3v3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="who-icon">
      <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 20a6 6 0 0 1 12 0M14 20a5 5 0 0 1 8 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="who-icon">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="who-icon">
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13 4l-2 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="who-check-icon">
      <path d="M1.342 8.229 2.744 6.822l2.302 2.263 5.106-5.086 1.412 1.407-6.518 6.482-3.704-3.659Z" fill="currentColor" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="who-arrow-icon">
      <path d="M8 2 3.5 6.5l1.06 1.06L7.25 4.87V14h1.5V4.87l2.69 2.69L12.5 6.5 8 2Z" fill="currentColor" />
    </svg>
  );
}

const PERSONA_ICONS = [TrendingIcon, UsersIcon, TargetIcon, CodeIcon];
const PERSONA_ACCENTS = ['brand', 'cyan', 'brand', 'cyan'];
const PERSONA_METRICS = ['7.93x', '14H', '5x', '+135%'];
const FRAMEWORK_COLORS = ['green', 'blue-lm', 'blue-lm', 'yellow-lm', 'yellow-lm'];
const FRAMEWORK_LAYOUTS = ['two', 'three', 'five', 'three', 'three'];
const FRAMEWORK_NORTH_STAR = [true, false, false, false, false];
const FRAMEWORK_SHOW_ARROW = [false, false, true, false, false];

function PersonaCard({ persona, icon: Icon, accent, metric, index }) {
  return (
    <motion.article
      className={`persona-card persona-card--${accent}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
    >
      <header className="persona-card__header">
        <span className="persona-card__icon-wrap" aria-hidden="true">
          <Icon />
        </span>
        <h3 className="persona-card__role">{persona.role}</h3>
      </header>

      <h4 className="persona-card__headline">{persona.painHeadline}</h4>
      <p className="persona-card__description">{persona.description}</p>

      <ul className="persona-card__benefits">
        {persona.benefits.map((benefit, idx) => (
          <li key={idx}>
            <CheckIcon />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <footer className="persona-card__metric">
        <span className="persona-card__metric-value">{metric}</span>
        <span className="persona-card__metric-label">{persona.metricLabel}</span>
      </footer>
    </motion.article>
  );
}

function FrameworkLayer({ layer, color, layout, northStar, showArrow, index }) {
  return (
    <motion.article
      className="framework-layer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
    >
      <h3 className="framework-layer__title">{layer.title}</h3>
      <div className={`framework-layer__items framework-layer__items--${layout}`}>
        {layer.items.map((item, idx) => (
          <div
            key={idx}
            className={`framework-layer__item framework-layer__item--${color}${northStar ? ' framework-layer__item--north-star' : ''}`}
          >
            {showArrow ? <ArrowUpIcon /> : null}
            <span>{item}</span>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

function WhoIsThisForPage() {
  const { t } = useTranslation('whofor');
  const personas = t('personas', { returnObjects: true });
  const layers = t('framework.layers', { returnObjects: true });

  return (
    <main className="who-is-for-page">
      <section className="who-hero" aria-labelledby="who-title">
        <div className="who-hero__glow who-hero__glow--left" aria-hidden="true" />
        <div className="who-hero__glow who-hero__glow--right" aria-hidden="true" />

        <div className="container who-hero__content-wrap">
          <motion.div
            className="who-hero__content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <p className="eyebrow-pill">{t('hero.eyebrow')}</p>
            <h1 id="who-title" className="who-hero__title">
              {t('hero.title')}
            </h1>
            <p className="who-hero__subtitle">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="who-personas" aria-label="Role-based value">
        <div className="container">
          <div className="who-personas__grid">
            {personas.map((persona, index) => (
              <PersonaCard
                key={index}
                persona={persona}
                icon={PERSONA_ICONS[index]}
                accent={PERSONA_ACCENTS[index]}
                metric={PERSONA_METRICS[index]}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="who-framework" aria-labelledby="framework-title">
        <div className="container">
          <div className="who-framework__header">
            <h2 id="framework-title">
              {t('framework.title')}<em>{t('framework.titleItalic')}</em>{t('framework.titleEnd')}
            </h2>
            <p>{t('framework.subtitle')}</p>
          </div>

          <div className="who-framework__stack">
            {layers.map((layer, index) => (
              <FrameworkLayer
                key={index}
                layer={layer}
                color={FRAMEWORK_COLORS[index]}
                layout={FRAMEWORK_LAYOUTS[index]}
                northStar={FRAMEWORK_NORTH_STAR[index]}
                showArrow={FRAMEWORK_SHOW_ARROW[index]}
                index={index}
              />
            ))}

            <p className="who-framework__footnote">
              {t('framework.footnote')}
            </p>
          </div>
        </div>
      </section>

      <SubscribeCTA />
    </main>
  );
}

export default WhoIsThisForPage;
