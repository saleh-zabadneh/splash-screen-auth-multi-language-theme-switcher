import React, { useEffect, useState } from "react";
import { View, I18nManager } from "react-native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/hooks/useTheme";
import { useFonts } from "@/hooks/useFonts";

export default function RootLayoutContent({ children }: any) {
  const fontsLoaded = useFonts();
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);

  useEffect(() => {
    const checkRTL = async () => {
      const storedIsRTL = await AsyncStorage.getItem("isRTL");
      if (storedIsRTL !== null) {
        const shouldBeRTL = JSON.parse(storedIsRTL);
        if (shouldBeRTL !== I18nManager.isRTL) {
          I18nManager.allowRTL(shouldBeRTL);
          I18nManager.forceRTL(shouldBeRTL);
          setIsRTL(shouldBeRTL);
        }
      }
    };
    checkRTL();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, direction: isRTL ? "rtl" : "ltr" }}>
      {children}
    </View>
  );
}
