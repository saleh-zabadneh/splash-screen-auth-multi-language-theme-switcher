import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";
import translationEn from "./locales/en/translation.json";
import translationAr from "./locales/ar/translation.json";

const resources = {
  en: { translation: translationEn },
  ar: { translation: translationAr },
};

async function setAppDirection(language: string) {
  const isRTL = language === "ar";
  if (isRTL !== I18nManager.isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    await AsyncStorage.setItem("isRTL", JSON.stringify(isRTL));
  }
}

export async function initializeI18n() {
  const savedLanguage = await AsyncStorage.getItem("language");
  const deviceLanguage = Localization.locale.split("-")[0];
  const initialLanguage =
    savedLanguage ||
    (Object.keys(resources).includes(deviceLanguage) ? deviceLanguage : "en");

  await setAppDirection(initialLanguage);

  await i18next.use(initReactI18next).init({
    compatibilityJSON: "v4",
    resources,
    lng: initialLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  return i18next;
}

export default i18next;
