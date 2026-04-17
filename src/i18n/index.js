import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enLanding from './locales/en/landing.json';
import enProduct from './locales/en/product.json';
import enPricing from './locales/en/pricing.json';
import enCasestudies from './locales/en/casestudies.json';
import enWhofor from './locales/en/whofor.json';

import esCommon from './locales/es/common.json';
import esLanding from './locales/es/landing.json';
import esProduct from './locales/es/product.json';
import esPricing from './locales/es/pricing.json';
import esCasestudies from './locales/es/casestudies.json';
import esWhofor from './locales/es/whofor.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        landing: enLanding,
        product: enProduct,
        pricing: enPricing,
        casestudies: enCasestudies,
        whofor: enWhofor,
      },
      es: {
        common: esCommon,
        landing: esLanding,
        product: esProduct,
        pricing: esPricing,
        casestudies: esCasestudies,
        whofor: esWhofor,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
