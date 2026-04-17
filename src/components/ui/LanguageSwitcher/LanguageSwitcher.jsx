import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

function FlagUS() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" aria-hidden="true" className="lang-flag">
      <rect width="60" height="30" fill="#B22234" />
      <rect y="2.31" width="60" height="2.31" fill="#fff" />
      <rect y="6.92" width="60" height="2.31" fill="#fff" />
      <rect y="11.54" width="60" height="2.31" fill="#fff" />
      <rect y="16.15" width="60" height="2.31" fill="#fff" />
      <rect y="20.77" width="60" height="2.31" fill="#fff" />
      <rect y="25.38" width="60" height="2.31" fill="#fff" />
      <rect width="24" height="16.15" fill="#3C3B6E" />
    </svg>
  );
}

function FlagES() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" aria-hidden="true" className="lang-flag">
      <rect width="60" height="30" fill="#c60b1e" />
      <rect y="7.5" width="60" height="15" fill="#ffc400" />
    </svg>
  );
}

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith('es') ? 'es' : 'en';

  function switchTo(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <div className="lang-switcher" role="group" aria-label="Language selector">
      <button
        type="button"
        className={`lang-switcher__btn${current === 'en' ? ' lang-switcher__btn--active' : ''}`}
        onClick={() => switchTo('en')}
        aria-label="English"
        aria-pressed={current === 'en'}
      >
        <FlagUS />
        <span>EN</span>
      </button>
      <span className="lang-switcher__sep" aria-hidden="true" />
      <button
        type="button"
        className={`lang-switcher__btn${current === 'es' ? ' lang-switcher__btn--active' : ''}`}
        onClick={() => switchTo('es')}
        aria-label="Español"
        aria-pressed={current === 'es'}
      >
        <FlagES />
        <span>ES</span>
      </button>
    </div>
  );
}

export default LanguageSwitcher;
