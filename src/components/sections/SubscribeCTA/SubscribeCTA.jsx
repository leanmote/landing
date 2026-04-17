import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../ui/Button/Button.jsx';
import './SubscribeCTA.css';

function CheckIcon() {
  return (
    <svg
      className="subscribe-cta__check"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1.342 8.229 2.744 6.822l2.302 2.263 5.106-5.086 1.412 1.407-6.518 6.482-3.704-3.659Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SubscribeCTA() {
  const [email, setEmail] = useState('');
  const { t } = useTranslation('landing');

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="subscribe-cta" id="signup">
      <div className="container subscribe-cta__inner">
        <div className="subscribe-cta__text">
          <h2 className="subscribe-cta__heading">
            {t('subscribeCta.heading')}
          </h2>
          <p className="subscribe-cta__desc">
            {t('subscribeCta.desc')}
          </p>

          <ul className="subscribe-cta__perks">
            <li>
              <CheckIcon />
              <span>{t('subscribeCta.perk1')}</span>
            </li>
            <li>
              <CheckIcon />
              <span>{t('subscribeCta.perk2')}</span>
            </li>
            <li>
              <CheckIcon />
              <span>{t('subscribeCta.perk3')}</span>
            </li>
          </ul>
        </div>

        <div className="subscribe-cta__form-wrap">
          <form className="subscribe-cta__form" onSubmit={handleSubmit}>
            <label className="subscribe-cta__field">
              <span className="visually-hidden">{t('subscribeCta.emailLabel')}</span>
              <input
                type="email"
                name="email"
                placeholder={t('subscribeCta.emailPlaceholder')}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <Button variant="primary" type="submit" className="subscribe-cta__btn-primary">
              {t('subscribeCta.submitBtn')}
            </Button>
          </form>
          <p className="subscribe-cta__fine-print">
            {t('subscribeCta.finePrint')}
          </p>
        </div>
      </div>
    </section>
  );
}

export default SubscribeCTA;
