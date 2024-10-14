export const getBrowserLanguage = () => {
  const lang = navigator.language.slice(0, 2);
  return lang === "ja" || lang === "en" ? lang : "en";
};

export const translate = (siteData, lang) => {
  lang = lang || getBrowserLanguage();

  const translateObject = (obj) => {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(translateObject);
    }

    const translated = {};
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === "object") {
        translated[key] = translateObject(obj[key]);
      } else if (key === lang) {
        return obj[key];
      }
    }
    return translated;
  };

  return translateObject(siteData);
};

export const toggleLanguage = (currentLang) => {
  return currentLang === "en" ? "ja" : "en";
};
