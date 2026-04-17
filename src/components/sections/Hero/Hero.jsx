import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../../ui/Button/Button.jsx';
import './Hero.css';

const GRID_VERTICAL = 24;
const GRID_HORIZONTAL = 16;
const PARTICLE_COUNT = 30;

function HeroGrid() {
  return (
    <svg
      className="hero__grid"
      preserveAspectRatio="none"
      viewBox="0 0 24 16"
      aria-hidden="true"
    >
      {Array.from({ length: GRID_VERTICAL }).map((_, i) => (
        <motion.line
          key={`v-${i}`}
          className="hero__grid-line"
          x1={i}
          y1={0}
          x2={i}
          y2={16}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.02 }}
        />
      ))}
      {Array.from({ length: GRID_HORIZONTAL }).map((_, i) => (
        <motion.line
          key={`h-${i}`}
          className="hero__grid-line"
          x1={0}
          y1={i}
          x2={24}
          y2={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.02 }}
        />
      ))}
    </svg>
  );
}

function HeroParticles() {
  return (
    <div className="hero__particles" aria-hidden="true">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <span key={i} className="hero__particle" />
      ))}
    </div>
  );
}

function Hero() {
  const { t } = useTranslation('landing');

  return (
    <section className="hero" id="hero">
      <div className="hero__glow hero__glow--top" aria-hidden="true" />
      <div className="hero__glow hero__glow--corner" aria-hidden="true" />

      <HeroGrid />
      <HeroParticles />

      <div className="container hero__inner">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero__badge-dot" aria-hidden="true" />
          <span className="hero__badge-text">{t('hero.badge')}</span>
        </motion.div>

        <div className="hero__headlines">
          <motion.h1
            className="hero__headline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="hero__headline-prefix">{t('hero.headlinePrefix1')}</span>
            <span className="hero__headline-highlight">{t('hero.headlineHighlight1')}</span>
          </motion.h1>
          <motion.h1
            className="hero__headline hero__headline--accent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="hero__headline-prefix">{t('hero.headlinePrefix2')}</span>
            <span className="hero__headline-highlight">{t('hero.headlineHighlight2')}</span>
          </motion.h1>
        </div>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {t('hero.subtitleLine1')}
          <br />
          {t('hero.subtitleLine2')}{' '}
          <span className="hero__subtitle-emphasis">
            {t('hero.subtitleEmphasis')}
          </span>
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button variant="outline-yellow" as="a" href="#command-center" className="hero__cta">
            {t('hero.ctaCommandCenter')}
          </Button>
          <Button variant="blue" as="a" href="#audit" className="hero__cta">
            {t('hero.ctaAudit')}
          </Button>
        </motion.div>
      </div>

      <div className="hero__fade-bottom" aria-hidden="true" />
    </section>
  );
}

export default Hero;
