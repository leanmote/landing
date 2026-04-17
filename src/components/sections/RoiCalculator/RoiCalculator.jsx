import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../../ui/SectionTitle/SectionTitle.jsx';
import Button from '../../ui/Button/Button.jsx';
import './RoiCalculator.css';

const HOURS_PER_YEAR = 2080;

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function formatCurrency(value) {
  return currencyFormatter.format(Math.max(0, value));
}

function ICON(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

function InfoIcon() {
  return (
    <ICON>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v5h1" />
    </ICON>
  );
}
function ClockIcon() {
  return (
    <ICON>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </ICON>
  );
}
function ZapIcon() {
  return (
    <ICON>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </ICON>
  );
}
function DollarIcon() {
  return (
    <ICON>
      <path d="M12 3v18" />
      <path d="M16 8a3 3 0 0 0-3-2h-2a3 3 0 0 0 0 6h2a3 3 0 0 1 0 6h-2a3 3 0 0 1-3-2" />
    </ICON>
  );
}
function ActivityIcon() {
  return (
    <ICON>
      <path d="M3 12h4l3-8 4 16 3-8h4" />
    </ICON>
  );
}
function TrendingUpIcon() {
  return (
    <ICON>
      <path d="M3 17 10 10l4 4 7-7" />
      <path d="M14 7h7v7" />
    </ICON>
  );
}
function CalendarIcon() {
  return (
    <ICON>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </ICON>
  );
}

function Tooltip({ title, children, open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="roi__tooltip"
          role="tooltip"
        >
          <p className="roi__tooltip-title">{title}</p>
          <p className="roi__tooltip-body">{children}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoTrigger({ onEnter, onLeave, onClick, expanded }) {
  return (
    <button
      type="button"
      className="roi__info-btn"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onClick}
      aria-expanded={expanded}
      aria-label="More info"
    >
      <InfoIcon />
    </button>
  );
}

function Slider({ min, max, step, value, onChange, ariaLabel }) {
  return (
    <input
      type="range"
      className="roi__slider"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      aria-label={ariaLabel}
    />
  );
}

function RoiCalculator() {
  const [engineers, setEngineers] = useState(50);
  const [impactVolume, setImpactVolume] = useState(2000);
  const [avgCost, setAvgCost] = useState(60000);
  const [manualDrag, setManualDrag] = useState(4);

  const [volumeTip, setVolumeTip] = useState(false);
  const [costTip, setCostTip] = useState(false);
  const [outputTip, setOutputTip] = useState(false);

  const [leadEmail, setLeadEmail] = useState('');
  const { t } = useTranslation('landing');

  const calc = useMemo(() => {
    const monthlyPlatformCost = 1500 + 0.7 * impactVolume;
    const annualPlatformCost = monthlyPlatformCost * 12;
    const hourlyRate = avgCost / HOURS_PER_YEAR;
    const managersCount = Math.max(1, Math.ceil(engineers / 9));
    const annualMgmtReclaimed = managersCount * manualDrag * 52 * hourlyRate;
    const totalPayroll = engineers * avgCost;
    const annualThroughputYield = totalPayroll * 0.08;
    const totalAnnualGain =
      annualMgmtReclaimed + annualThroughputYield - annualPlatformCost;
    const roiMultiplier =
      annualPlatformCost > 0
        ? (annualMgmtReclaimed + annualThroughputYield) / annualPlatformCost
        : 0;
    const costPerWorkItem =
      impactVolume > 0 ? annualPlatformCost / (impactVolume * 12) : 0;

    return {
      monthlyPlatformCost,
      annualPlatformCost,
      managersCount,
      annualMgmtReclaimed,
      totalPayroll,
      annualThroughputYield,
      totalAnnualGain,
      roiMultiplier,
      costPerWorkItem,
    };
  }, [engineers, impactVolume, avgCost, manualDrag]);

  const isHighROI = calc.roiMultiplier > 5;

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="roi" id="roi-calculator">
      <div className="container">
        <div className="roi__header">
          <p className="roi__eyebrow">{t('roiCalculator.eyebrow')}</p>
          <SectionTitle as="h2" align="center">
            <span>{t('roiCalculator.title1')}</span>
            <span className="roi__title-highlight">{t('roiCalculator.titleHighlight')}</span>
            <span>{t('roiCalculator.title2')}</span>
          </SectionTitle>
          <p className="roi__subtitle">
            {t('roiCalculator.subtitle')}
          </p>
        </div>

        <div className="roi__grid">
          <aside className="roi__inputs">
            <h3 className="roi__inputs-title">{t('roiCalculator.inputsTitle')}</h3>

            <div className="roi__field">
              <div className="roi__field-row">
                <label htmlFor="roi-engineers" className="roi__field-label">
                  {t('roiCalculator.engineersLabel')}
                </label>
                <span className="roi__field-value">{engineers}</span>
              </div>
              <Slider
                min={5}
                max={500}
                step={5}
                value={engineers}
                onChange={setEngineers}
                ariaLabel={t('roiCalculator.engineersLabel')}
              />
              <div className="roi__field-scale">
                <span>5</span>
                <span>500</span>
              </div>
            </div>

            <div className="roi__field">
              <div className="roi__field-row">
                <div className="roi__field-label-wrap">
                  <span className="roi__field-label">{t('roiCalculator.volumeLabel')}</span>
                  <div className="roi__info">
                    <InfoTrigger
                      onEnter={() => setVolumeTip(true)}
                      onLeave={() => setVolumeTip(false)}
                      onClick={() => setVolumeTip((v) => !v)}
                      expanded={volumeTip}
                    />
                    <Tooltip open={volumeTip} title={t('roiCalculator.volumeTooltipTitle')}>
                      {t('roiCalculator.volumeTooltipBody')}
                    </Tooltip>
                  </div>
                </div>
                <span className="roi__field-value">
                  {impactVolume.toLocaleString()}
                </span>
              </div>
              <Slider
                min={100}
                max={10000}
                step={50}
                value={impactVolume}
                onChange={setImpactVolume}
                ariaLabel={t('roiCalculator.volumeLabel')}
              />
              <p className="roi__field-help">{t('roiCalculator.volumeHelp')}</p>
            </div>

            <div className="roi__field">
              <div className="roi__field-row">
                <div className="roi__field-label-wrap">
                  <span className="roi__field-label">{t('roiCalculator.costLabel')}</span>
                  <div className="roi__info">
                    <InfoTrigger
                      onEnter={() => setCostTip(true)}
                      onLeave={() => setCostTip(false)}
                      onClick={() => setCostTip((v) => !v)}
                      expanded={costTip}
                    />
                    <Tooltip open={costTip} title={t('roiCalculator.costTooltipTitle')}>
                      {t('roiCalculator.costTooltipBody')}
                    </Tooltip>
                  </div>
                </div>
                <span className="roi__field-value">
                  ${(avgCost / 1000).toFixed(0)}k
                </span>
              </div>
              <Slider
                min={30000}
                max={250000}
                step={5000}
                value={avgCost}
                onChange={setAvgCost}
                ariaLabel={t('roiCalculator.costLabel')}
              />
              <div className="roi__field-scale">
                <span>$30k</span>
                <span>$250k</span>
              </div>
            </div>

            <div className="roi__field">
              <div className="roi__field-row">
                <label htmlFor="roi-drag" className="roi__field-label">
                  {t('roiCalculator.dragLabel')}
                </label>
                <span className="roi__field-value">{manualDrag}h</span>
              </div>
              <Slider
                min={1}
                max={20}
                step={0.5}
                value={manualDrag}
                onChange={setManualDrag}
                ariaLabel={t('roiCalculator.dragLabel')}
              />
              <p className="roi__field-help">{t('roiCalculator.dragHelp')}</p>
            </div>
          </aside>

          <div className="roi__output">
            <article
              className={`roi__card roi__card--hero${
                isHighROI ? ' roi__card--glow' : ''
              }`}
            >
              <div className="roi__card-bg-icon" aria-hidden="true">
                <TrendingUpIcon />
              </div>

              <header className="roi__card-header">
                <h4 className="roi__card-label">{t('roiCalculator.outputLabel')}</h4>
                <div className="roi__info">
                  <InfoTrigger
                    onEnter={() => setOutputTip(true)}
                    onLeave={() => setOutputTip(false)}
                    onClick={() => setOutputTip((v) => !v)}
                    expanded={outputTip}
                  />
                  <Tooltip open={outputTip} title={t('roiCalculator.outputTooltipTitle')}>
                    {t('roiCalculator.outputTooltipBody')}
                  </Tooltip>
                </div>
              </header>

              <div className="roi__hero-row">
                <span className="roi__hero-value">
                  {formatCurrency(calc.totalAnnualGain)}
                </span>
                <span
                  className={`roi__roi-chip${
                    isHighROI ? ' roi__roi-chip--active' : ''
                  }`}
                >
                  POTENTIAL_ROI: {calc.roiMultiplier.toFixed(2)}x
                </span>
              </div>

              <p className="roi__hero-note">
                {t('roiCalculator.totalNote')}
              </p>
            </article>

            <article className="roi__card">
              <h4 className="roi__card-label roi__card-label--divider">
                {t('roiCalculator.breakdownLabel')}
              </h4>

              <ul className="roi__breakdown">
                <li className="roi__breakdown-row">
                  <div className="roi__breakdown-info">
                    <span className="roi__breakdown-icon roi__breakdown-icon--cyan">
                      <ClockIcon />
                    </span>
                    <div>
                      <p className="roi__breakdown-title">{t('roiCalculator.mttdLabel')}</p>
                      <p className="roi__breakdown-meta">
                        {calc.managersCount} managers &times; {manualDrag}h &times; 52
                        weeks
                      </p>
                    </div>
                  </div>
                  <span className="roi__breakdown-value roi__breakdown-value--cyan">
                    {formatCurrency(calc.annualMgmtReclaimed)}
                  </span>
                </li>

                <li className="roi__breakdown-row">
                  <div className="roi__breakdown-info">
                    <span className="roi__breakdown-icon roi__breakdown-icon--brand">
                      <ZapIcon />
                    </span>
                    <div>
                      <p className="roi__breakdown-title">{t('roiCalculator.agenticLabel')}</p>
                      <p className="roi__breakdown-meta">
                        8% lift on ${(calc.totalPayroll / 1_000_000).toFixed(1)}M
                        payroll
                      </p>
                    </div>
                  </div>
                  <span className="roi__breakdown-value roi__breakdown-value--brand">
                    {formatCurrency(calc.annualThroughputYield)}
                  </span>
                </li>

                <li className="roi__breakdown-row roi__breakdown-row--cost">
                  <div className="roi__breakdown-info">
                    <span className="roi__breakdown-icon roi__breakdown-icon--danger">
                      <DollarIcon />
                    </span>
                    <div>
                      <p className="roi__breakdown-title">{t('roiCalculator.platformLabel')}</p>
                      <p className="roi__breakdown-meta">
                        $1,500/mo + $0.70 &times; {impactVolume.toLocaleString()} units
                      </p>
                    </div>
                  </div>
                  <span className="roi__breakdown-value roi__breakdown-value--danger">
                    -{formatCurrency(calc.annualPlatformCost)}
                  </span>
                </li>
              </ul>
            </article>

            <article className="roi__card roi__card--accent-left">
              <div className="roi__velocity">
                <span className="roi__velocity-icon">
                  <ActivityIcon />
                </span>
                <div className="roi__velocity-body">
                  <p className="roi__velocity-text">
                    {t('roiCalculator.velocityText')}{' '}
                    <span className="roi__velocity-strong">
                      ${calc.costPerWorkItem.toFixed(2)}
                    </span>
                    .
                  </p>
                  <div className="roi__velocity-tags">
                    <span className="roi__velocity-chip">{t('roiCalculator.mttdChip')}</span>
                    <span className="roi__velocity-meta">
                      {t('roiCalculator.mttdVs')}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <form className="roi__lead" onSubmit={handleSubmit}>
          <div className="roi__lead-inner">
            <h3 className="roi__lead-title">{t('roiCalculator.leadTitle')}</h3>
            <p className="roi__lead-sub">
              {t('roiCalculator.leadSub')}
            </p>
            <input
              type="email"
              className="roi__lead-input"
              placeholder={t('roiCalculator.leadPlaceholder')}
              value={leadEmail}
              onChange={(event) => setLeadEmail(event.target.value)}
              required
            />
            <Button variant="primary" type="submit" className="roi__lead-cta">
              {t('roiCalculator.leadCta')}
              <CalendarIcon />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RoiCalculator;
