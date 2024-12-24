import React from "react";
import { TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { ThemedText } from "./ThemedText";

export function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <TouchableOpacity
      className="px-4 py-2 rounded-full bg-tint dark:bg-tint-dark"
      onPress={toggleTheme}
    >
      <ThemedText className="text-background dark:text-background-dark">
        Switch to {colorScheme === "light" ? "Dark" : "Light"} Mode
      </ThemedText>
    </TouchableOpacity>
  );
}
