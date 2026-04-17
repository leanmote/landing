import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ShieldIcon,
  PlayIcon,
  ArrowRightIcon,
} from '../../components/ui/Icons/Icons';
import ProductCockpit from '../../components/sections/ProductCockpit/ProductCockpit';
import ProductKnowledgeGraph from '../../components/sections/ProductKnowledgeGraph/ProductKnowledgeGraph';
import ProductAgenticWorkflows from '../../components/sections/ProductAgenticWorkflows/ProductAgenticWorkflows';
import ProductImpactDashboard from '../../components/sections/ProductImpactDashboard/ProductImpactDashboard';
import SubscribeCTA from '../../components/sections/SubscribeCTA/SubscribeCTA';
import './ProductPage.css';

function ProductPage() {
  const { t } = useTranslation('product');

  return (
    <main className="product-page">
      <section className="product-hero" aria-labelledby="product-title">
        <div className="product-hero__glow product-hero__glow--left" aria-hidden="true" />
        <div className="product-hero__glow product-hero__glow--right" aria-hidden="true" />

        <div className="container product-hero__container">
          <motion.div
            className="product-hero__content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <p className="eyebrow-pill product-hero__eyebrow">
              <ShieldIcon size={14} />
              <span>{t('hero.eyebrow')}</span>
            </p>

            <h1 id="product-title" className="product-hero__title">
              {t('hero.title')}<span>{t('hero.titleAccent')}</span>
            </h1>

            <p className="product-hero__description">
              <strong>{t('hero.description')}</strong>{t('hero.descriptionRest')}
              <em>{t('hero.descriptionItalic')}</em>
            </p>

            <div className="product-hero__actions">
              <a href="/#signup" className="btn btn--primary product-hero__action">
                {t('hero.ctaPrimary')}
                <ArrowRightIcon size={16} />
              </a>
              <button type="button" className="btn btn--secondary product-hero__action">
                <PlayIcon size={16} />
                {t('hero.ctaSecondary')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <ProductCockpit />
      <ProductKnowledgeGraph />
      <ProductAgenticWorkflows />
      <ProductImpactDashboard />
      <SubscribeCTA />
    </main>
  );
}

export default ProductPage;
