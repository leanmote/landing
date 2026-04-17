import { useTranslation } from 'react-i18next';
import SectionTitle from '../../ui/SectionTitle/SectionTitle.jsx';
import './Faq.css';

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Faq() {
  const { t } = useTranslation('pricing');
  const items = t('faq.items', { returnObjects: true });

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="faq__header">
          <p className="faq__eyebrow">{t('faq.eyebrow')}</p>
          <SectionTitle as="h2" align="center">
            <span>{t('faq.title1')}</span>
            <span className="faq__title-highlight">{t('faq.titleHighlight')}</span>
          </SectionTitle>
          <p className="faq__subtitle">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="faq__list">
          {items.map((item, i) => (
            <details key={i} className="faq__item">
              <summary className="faq__question">
                <span>{item.question}</span>
                <span className="faq__chevron" aria-hidden="true">
                  <ChevronIcon />
                </span>
              </summary>
              <p className="faq__answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
