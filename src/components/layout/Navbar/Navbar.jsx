import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../ui/Button/Button.jsx';
import LanguageSwitcher from '../../ui/LanguageSwitcher/LanguageSwitcher.jsx';
import leanmoteLogo from '../../../../public/logos/brand/leanmote-logo-white.svg';
import './Navbar.css';

function NavLink({ href, children, onClick }) {
  if (href.startsWith('/')) {
    return <Link to={href} onClick={onClick}>{children}</Link>;
  }
  return <a href={href} onClick={onClick}>{children}</a>;
}

function HamburgerIcon({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {open ? (
        <>
          <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = t('nav.links', { returnObjects: true });
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <Link className="navbar__brand" to="/" onClick={closeMenu}>
<<<<<<< HEAD
            <img src={import.meta.env.BASE_URL + 'logos/brand/leanmote-logo-white.svg'} alt="Leanmote" />
=======
            <img src={leanmoteLogo} alt="Leanmote" />
>>>>>>> 9f00185 (feat: set English as default language and import images as module assets)
          </Link>

          <nav className="navbar__links" aria-label="Primary">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__actions">
            <LanguageSwitcher />
            <Button as="a" href="#demo" variant="brand">
              {t('nav.requestDemo')}
            </Button>
            <Button as="a" href="#signup" variant="primary">
              {t('nav.signUp')}
            </Button>
          </div>

          <button
            className="navbar__hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="navbar__overlay" onClick={closeMenu} aria-hidden="true" />
      )}

      <div className={`navbar__drawer${menuOpen ? ' navbar__drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          <ul className="navbar__drawer-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} onClick={closeMenu}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="navbar__drawer-actions">
          <LanguageSwitcher />
          <Button as="a" href="#demo" variant="brand" onClick={closeMenu}>
            {t('nav.requestDemo')}
          </Button>
          <Button as="a" href="#signup" variant="primary" onClick={closeMenu}>
            {t('nav.signUp')}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
