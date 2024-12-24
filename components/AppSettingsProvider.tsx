import React, { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { I18nextProvider } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeI18n } from "@/i18n";
import { ActivityIndicator, View } from "react-native";

interface AppSettingsProviderProps {
  children: React.ReactNode;
}

export function AppSettingsProvider({ children }: AppSettingsProviderProps) {
  const { setDirection } = useTheme();
  const [i18n, setI18n] = useState<any>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const initializedI18n = await initializeI18n();
        setI18n(initializedI18n);

        const savedDirection = await AsyncStorage.getItem("isRTL");
        if (savedDirection !== null) {
          setDirection(JSON.parse(savedDirection) ? "rtl" : "ltr");
        }
      } catch (error) {
        console.error("Error loading app settings:", error);
      }
    };

    loadSettings();
  }, [setDirection]);

  if (!i18n) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
