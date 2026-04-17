<<<<<<< HEAD
const base = import.meta.env.BASE_URL;

export const CLIENT_LOGOS = [
  { name: 'Vita Wallet', src: base + 'logos/clients/vita-wallet.png' },
  { name: 'MapVX', src: base + 'logos/clients/mapvx.png' },
  { name: 'Gauss Control', src: base + 'logos/clients/gauss.png' },
  { name: 'Gatblac', src: base + 'logos/clients/gatblac.png' },
  { name: 'Teamcore', src: base + 'logos/clients/teamcore.png' },
=======
import vitaWallet from '../../public/logos/clients/vita-wallet.png';
import mapvx from '../../public/logos/clients/mapvx.png';
import gauss from '../../public/logos/clients/gauss.png';
import gatblac from '../../public/logos/clients/gatblac.png';
import teamcore from '../../public/logos/clients/teamcore.png';

export const CLIENT_LOGOS = [
  { name: 'Vita Wallet', src: vitaWallet },
  { name: 'MapVX', src: mapvx },
  { name: 'Gauss Control', src: gauss },
  { name: 'Gatblac', src: gatblac },
  { name: 'Teamcore', src: teamcore },
>>>>>>> 9f00185 (feat: set English as default language and import images as module assets)
];
