import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useTheme } from "@/hooks/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";

const flags = [
  { text: "🇺🇸", lang: "en", name: "English" },
  { text: "🇸🇦", lang: "ar", name: "Arabic" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { setDirection } = useTheme();

  const changeLanguage = async (lang: string) => {
    const isRTL = lang === "ar";
    await i18n.changeLanguage(lang);
    setDirection(isRTL ? "rtl" : "ltr");
    await AsyncStorage.setItem("language", lang);
    await AsyncStorage.setItem("isRTL", JSON.stringify(isRTL));

    // Force RTL layout change
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);

    Alert.alert(
      "Language Changed",
      "Please restart the app for the changes to take full effect.",
      [{ text: "OK" }]
    );
  };

  return (
    <ThemedView className="flex-row mt-4">
      {flags.map(({ text, lang, name }) => (
        <TouchableOpacity
          key={name}
          onPress={() => changeLanguage(lang)}
          className={`p-2.5 mx-1 rounded ${
            i18n.language === lang
              ? "bg-blue-200 dark:bg-blue-800"
              : "bg-transparent"
          }`}
        >
          <ThemedText className="text-2xl">{text}</ThemedText>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
}
