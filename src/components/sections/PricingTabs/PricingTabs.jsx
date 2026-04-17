import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Pricing from '../Pricing/Pricing.jsx';
import Benchmarks from '../Benchmarks/Benchmarks.jsx';
import ImpactSimulator from '../ImpactSimulator/ImpactSimulator.jsx';
import TelemetryTokens from '../TelemetryTokens/TelemetryTokens.jsx';
import './PricingTabs.css';

function PricingTabs() {
  const [activeTab, setActiveTab] = useState('hybrid');
  const { t } = useTranslation('pricing');
  const tabs = t('pricingTabs.tabs', { returnObjects: true });

  return (
    <section className="pricing-tabs" aria-label="Pricing tabs">
      <div className="pricing-tabs__intro">
        <div className="container">
          <div className="pricing-tabs__header">
            <p className="eyebrow-pill">{t('pricingTabs.eyebrow')}</p>
            <h2 className="pricing-tabs__title">
              {t('pricingTabs.title')}<em>{t('pricingTabs.titleItalic')}</em>{t('pricingTabs.titleEnd')}
            </h2>
            <p className="pricing-tabs__subtitle">
              {t('pricingTabs.subtitle')}
            </p>
          </div>

          <div className="pricing-tabs__bar">
            <div className="pricing-tabs__list" role="tablist" aria-label="Pricing views">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`pricing-tabs__tab${isActive ? ' pricing-tabs__tab--active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="pricing-tabs__panel"
        >
          {activeTab === 'hybrid' && <Pricing showHeader={false} />}
          {activeTab === 'benchmarks' && <Benchmarks embedded />}
          {activeTab === 'impact' && <ImpactSimulator embedded />}
          {activeTab === 'telemetry' && <TelemetryTokens embedded />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default PricingTabs;
