import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

function FooterLink({ href, children }) {
  if (href.startsWith('/')) {
    return <Link to={href}>{children}</Link>;
  }
  return <a href={href}>{children}</a>;
}

function Footer() {
  const { t } = useTranslation('common');
  const columns = t('footer.columns', { returnObjects: true });

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/logos/brand/leanmote-logo-white.svg" alt="Leanmote" />
          <p className="footer__tagline">{t('footer.tagline')}</p>
        </div>

        <div className="footer__columns">
          {columns.map((column) => (
            <div className="footer__column" key={column.title}>
              <h4 className="footer__column-title">{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container footer__bottom">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
}

export default Footer;
