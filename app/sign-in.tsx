import React, { useState } from "react";
import { router } from "expo-router";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useSession } from "@/hooks/ctx";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLoading } = useSession();

  const handleSignIn = async () => {
    console.log("Attempting to sign in with:", email);
    try {
      await signIn({ email, password });
      console.log("Sign in successful, navigating to home");
      router.replace("/");
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };
  return (
    <View style={styles.container}>
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
      <Button title="Sign In" onPress={handleSignIn} disabled={isLoading} />
      <Text style={styles.link} onPress={() => router.push("/sign-up")}>
        Don't have an account? Sign Up
      </Text>
    </View>
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
