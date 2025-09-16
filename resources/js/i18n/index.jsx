import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入 user 命名空间的翻译
import enUser from './locales/en/user.json';
import zhUser from './locales/zh/user.json';
import msUser from './locales/ms/user.json';

// 导入 admin 命名空间的翻译
import enAdmin from './locales/en/admin.json';
import zhAdmin from './locales/zh/admin.json';
import msAdmin from './locales/ms/admin.json';

const resources = {
  en: {
    user: enUser,
    admin: enAdmin,
  },
  zh: {
    user: zhUser,
    admin: zhAdmin,
  },
  ms: {
    user: msUser,
    admin: msAdmin,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    // 定义命名空间
    ns: ['user', 'admin'],
    defaultNS: 'user',

    interpolation: {
      escapeValue: false, // React 已经安全地转义了
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;