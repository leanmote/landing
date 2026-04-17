import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../../ui/SectionTitle/SectionTitle.jsx';
import './SprintTrack.css';

const SPRINT_IDS = ['without', 'with'];

function SprintTrack() {
  const [activeId, setActiveId] = useState('without');
  const intervalRef = useRef(null);
  const hasInteractedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const { t } = useTranslation('landing');

  const isWithout = activeId === 'without';
  const illustrationSrc = isWithout ? '/illustrations/without.svg' : '/illustrations/with.svg';

  const stateData = isWithout
    ? { title: t('sprintTrack.without.title'), subtitle: t('sprintTrack.without.subtitle') }
    : { title: t('sprintTrack.with.title'), subtitle: t('sprintTrack.with.subtitle') };

  const toggleLabels = {
    without: t('sprintTrack.without.switchLabel'),
    with: t('sprintTrack.with.switchLabel'),
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (hasInteractedRef.current || isHoveredRef.current) return;
      setActiveId((prev) => (prev === 'without' ? 'with' : 'without'));
    }, 2500);
    return () => clearInterval(intervalRef.current);
  }, []);

  function handleToggle(id) {
    hasInteractedRef.current = true;
    clearInterval(intervalRef.current);
    setActiveId(id);
  }

  return (
    <section
      className={`sprint-track sprint-track--${activeId}`}
      id="sprint-track"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <div className="container">
        <div className="sprint-track__header">
          <SectionTitle as="h2" align="center">
            <span>{t('sprintTrack.title1')}</span>
            <br />
            <span className="sprint-track__headline-accent">{t('sprintTrack.titleAccent')}</span>
          </SectionTitle>
          <p className="sprint-track__subtitle">
            {t('sprintTrack.subtitle')}
          </p>
        </div>

        <div className="sprint-toggle" role="group" aria-label="Sprint state">
          {SPRINT_IDS.map((id) => (
            <button
              key={id}
              className={`sprint-toggle__btn sprint-toggle__btn--${id}${activeId === id ? ' sprint-toggle__btn--active' : ''}`}
              onClick={() => handleToggle(id)}
            >
              {toggleLabels[id]}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId + '-header'}
            className="sprint-track__state-header"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="sprint-track__state-title">{stateData.title}</h3>
            <p className="sprint-track__state-subtitle">{stateData.subtitle}</p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId + '-track'}
            className="sprint-track__illustration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={illustrationSrc}
              alt={stateData.title}
              className="sprint-track__image"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default SprintTrack;
