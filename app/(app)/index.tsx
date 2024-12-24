import React from "react";
import { Text, View, Button } from "react-native";
import { useSession } from "@/hooks/ctx";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemedView } from "@/components/ThemedView";

export default function Index() {
  const { signOut, session } = useSession();

  console.log("Home Page - Session:", session);

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Welcome, {session?.name}!</Text>
      <Text>Email: {session?.email}</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          console.log("Sign out button pressed");
          signOut();
        }}
      />
      <ThemeSwitcher />
      <LanguageSwitcher />
    </ThemedView>
  );
}
