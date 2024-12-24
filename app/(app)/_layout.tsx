import React from "react";
import { Text } from "react-native";
import { Stack } from "expo-router";
import { useSession } from "@/hooks/ctx";
import { useTheme } from "@/hooks/useTheme";

export default function AppLayout() {
  const { isLoading } = useSession();
  const { theme } = useTheme();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === "light" ? "white" : "rgb(21 23 24)",
        },
        headerTintColor:
          theme === "light" ? "rgb(17 24 28)" : "rgb(236 237 238)",
      }}
    />
  );
}
