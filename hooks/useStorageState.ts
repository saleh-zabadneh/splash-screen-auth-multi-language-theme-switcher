import { useEffect, useCallback, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  console.log(`Setting storage item: ${key}`);
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
  console.log(`Storage item set: ${key}`);
}

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  useEffect(() => {
    console.log(`Initializing storage state for: ${key}`);
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        setState(value);
      });
    }
    console.log(`Storage state initialized for: ${key}`);
  }, [key]);

  const setValue = useCallback(
    (value: string | null) => {
      console.log(`Setting value for: ${key}`);
      setState(value);
      setStorageItemAsync(key, value);
      console.log(`Value set for: ${key}`);
    },
    [key]
  );

  return [state, setValue];
}
