import React, { useState } from "react";
import { router } from "expo-router";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TextInputComponent,
} from "react-native";
import { useSession } from "@/hooks/ctx";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isLoading } = useSession();
  const { theme } = useTheme();
  console.log(theme);
  const handleSignUp = async () => {
    console.log("Attempting to sign up with:", email);
    try {
      await signUp({ name, email, password });
      console.log("Sign up successful, navigating to home");
      router.replace("/");
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Hello</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} disabled={isLoading} />
      <Text style={styles.link} onPress={() => router.push("/sign-in")}>
        Already have an account? Sign In
      </Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  link: {
    marginTop: 15,
    color: "blue",
    textAlign: "center",
  },
});
