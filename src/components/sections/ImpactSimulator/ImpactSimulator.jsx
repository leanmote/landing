import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ImpactSimulator.css';

function IconBase({ children, className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function InfoIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </IconBase>
  );
}

function LinkIcon() {
  return (
    <IconBase>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </IconBase>
  );
}

function ZapIcon() {
  return (
    <IconBase>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </IconBase>
  );
}

function ActivityIcon() {
  return (
    <IconBase>
      <path d="M3 12h4l3-8 4 16 3-8h4" />
    </IconBase>
  );
}

function ImpactSimulator({ embedded = false }) {
  const [workVolume, setWorkVolume] = useState(5000);
  const { t } = useTranslation('pricing');

  const platformInvestment = 1500 + 0.5 * workVolume;
  const managementTimeReclaimed = (workVolume / 100) * 0.7;
  const accelerationIndex = Math.min(
    99,
    Math.round((workVolume / 5000) * 100 * 0.69 + 20),
  );

  const sectionClass = `impact-sim${embedded ? ' impact-sim--embedded' : ''}`;

  return (
    <section className={sectionClass} id="impact-sim">
      <div className="container">
        {!embedded && (
          <header className="impact-sim__header">
            <h2 className="impact-sim__title">
              {t('impactSimulator.title')}<span>{t('impactSimulator.titleAccent')}</span>
            </h2>
          </header>
        )}

        <div className="impact-sim__grid">
          <article className="impact-sim__control-card">
            <p className="impact-sim__control-label">
              {t('impactSimulator.volumeLabel')}
              <span className="impact-sim__control-icon">
                <InfoIcon />
              </span>
            </p>
            <p className="impact-sim__control-subtitle">{t('impactSimulator.volumeSubtitle')}</p>

            <div className="impact-sim__slider-wrap">
              <input
                type="range"
                min={50}
                max={5000}
                step={50}
                value={workVolume}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  setWorkVolume(next);
                  const pct = ((next - 50) / (5000 - 50)) * 100;
                  event.target.style.setProperty('--slider-progress', `${pct}%`);
                }}
                className="impact-sim__slider"
              />
              <div className="impact-sim__slider-scale">
                <span>50</span>
                <span>5,000</span>
              </div>
            </div>

            <div className="impact-sim__value-block">
              <p className="impact-sim__value">{workVolume.toLocaleString('en-US')}</p>
              <p className="impact-sim__unit">{t('impactSimulator.valueUnit')}</p>
            </div>
          </article>

          <div className="impact-sim__metrics">
            <article className="impact-sim__metric-card">
              <div>
                <p className="impact-sim__metric-label">{t('impactSimulator.platformInvestment')}</p>
                <p className="impact-sim__metric-value">
                  ${platformInvestment.toLocaleString('en-US')} <span>/mo</span>
                </p>
                <p className="impact-sim__metric-formula">
                  $1,500 base + $0.50 x {workVolume.toLocaleString('en-US')} units
                </p>
              </div>
              <span className="impact-sim__metric-icon">
                <LinkIcon />
              </span>
            </article>

            <article className="impact-sim__metric-card">
              <div>
                <p className="impact-sim__metric-label">{t('impactSimulator.managementTime')}</p>
                <p className="impact-sim__metric-value impact-sim__metric-value--brand">
                  {managementTimeReclaimed.toFixed(1)} <span>H / WEEK</span>
                </p>
                <p className="impact-sim__metric-formula">
                  ({workVolume.toLocaleString('en-US')} / 100) x 0.7
                </p>
              </div>
              <span className="impact-sim__metric-icon impact-sim__metric-icon--brand">
                <ZapIcon />
              </span>
            </article>

            <article className="impact-sim__metric-card">
              <div>
                <p className="impact-sim__metric-label">{t('impactSimulator.accelerationIndex')}</p>
                <p className="impact-sim__metric-value impact-sim__metric-value--cyan">
                  +{accelerationIndex}%
                </p>
                <p className="impact-sim__metric-formula">{t('impactSimulator.accelerationSubtitle')}</p>
              </div>
              <span className="impact-sim__metric-icon impact-sim__metric-icon--cyan">
                <ActivityIcon />
              </span>
            </article>

            <div className="impact-sim__status">
              <span className="impact-sim__status-dot" aria-hidden="true" />
              <span>{t('impactSimulator.scalingStatus')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImpactSimulator;
