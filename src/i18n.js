import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n.use(Backend)
 .use(LanguageDetector)
 .use(initReactI18next)
 .init({
  backend: {
   // translation file path
   loadPath: "i18next/{{ns}}/{{lng}}.json",
  },
  fallbackLng: "en",
  // please disable debug in production
  debug: false,
  //ns means namespace. It is used to group translations into different files.
  // can have multiple namespaces, in case you want to divide a huge
  // translation into smaller pieces and load them on demand
  ns: ["Translations"],
  interpolation: {
   espaceValue: false,
   formatSeparator: ",",
  },
  react: {
   wait: true,
  },
 });
export default i18n;