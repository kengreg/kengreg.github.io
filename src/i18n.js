import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, jp } from "./assets/languages";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      // en: en,
      jp: jp,
    },
    lng: "jp",
    interpolation: {
      formatSeparator: ",",
      escapeValue: false, // react already safes from xss
    },
    react: {
      wait: true,
    },
  });

export default i18n;
