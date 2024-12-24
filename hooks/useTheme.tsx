import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
import { Colors, ColorName } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";

type Theme = "light" | "dark";
type Direction = "ltr" | "rtl";

interface ThemeContextType {
  theme: Theme;
  direction: Direction;
  toggleTheme: () => void;
  setDirection: (dir: Direction) => void;
  getColor: (colorName: ColorName) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [direction, setDirection] = useState<Direction>("ltr");

  useEffect(() => {
    // Load the saved direction from AsyncStorage
    AsyncStorage.getItem("isRTL").then((isRTL) => {
      if (isRTL !== null) {
        setDirection(JSON.parse(isRTL) ? "rtl" : "ltr");
      }
    });
  }, []);

  const getColor = (colorName: ColorName) => {
    return Colors[colorScheme][colorName];
  };

  const contextValue: ThemeContextType = {
    theme: colorScheme,
    direction,
    toggleTheme: toggleColorScheme,
    setDirection: (dir: Direction) => {
      setDirection(dir);
      I18nManager.forceRTL(dir === "rtl");
      AsyncStorage.setItem("isRTL", JSON.stringify(dir === "rtl"));
    },
    getColor,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
