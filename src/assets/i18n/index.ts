// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./languages/en.json";
import de from "./languages/de.json";
import it from "./languages/it.json";

i18n
  .use(LanguageDetector) // auto detect user language
  .use(initReactI18next) // passes i18n to react-i18next
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      it: { translation: it },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already escapes
    },
  });

export default i18n;
