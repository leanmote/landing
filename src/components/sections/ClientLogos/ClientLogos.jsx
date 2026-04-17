import { CLIENT_LOGOS } from '../../../constants/clientLogos.js';
import './ClientLogos.css';

function ClientLogos() {
  return (
    <section className="client-logos" aria-label="Trusted by">
      <div className="container">
        <ul className="client-logos__list">
          {CLIENT_LOGOS.map((logo) => (
            <li key={logo.name} className="client-logos__item">
              <img src={logo.src} alt={logo.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ClientLogos;
