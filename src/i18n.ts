import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { parse as parseToml } from "smol-toml"; // Import TOML parser

i18n
  .use(HttpBackend) // load translations from public/locales
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass i18n instance to react-i18next
  .init({
    fallbackLng: "zh",
    supportedLngs: ['en', 'zh'],
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    backend: {
      loadPath: "locales/{{lng}}/{{ns}}.toml",
      parse: (data: string) => {
        try {
          return parseToml(data);
        } catch (e) {
          console.error("TOML Parsing Error:", e);
          return {};
        }
      },
    },
  });
export default i18n;
