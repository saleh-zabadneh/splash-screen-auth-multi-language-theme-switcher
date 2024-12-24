import React, {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
} from "react";
import { useStorageState } from "./useStorageState";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
  UseMutateAsyncFunction,
} from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  signIn: UseMutateAsyncFunction<
    User,
    Error,
    { email: string; password: string }
  >;
  signUp: UseMutateAsyncFunction<
    User,
    Error,
    { name: string; email: string; password: string }
  >;
  signOut: () => void;
  session: User | null;
  isLoading: boolean;
  isFirstTimeUser: boolean;
  setIsFirstTimeUser: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  signIn: async () => {
    throw new Error("signIn function must be overridden");
  },
  signUp: async () => {
    throw new Error("signUp function must be overridden");
  },
  signOut: () => {},
  session: null,
  isLoading: false,
  isFirstTimeUser: true,
  setIsFirstTimeUser: () => {},
});

export function useSession() {
  return useContext(AuthContext);
}

const queryClient = new QueryClient();

function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("user");
  const [
    [isFirstTimeUserLoading, isFirstTimeUserValue],
    setIsFirstTimeUserValue,
  ] = useStorageState("isFirstTimeUser");
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("isFirstTimeUserValue:", isFirstTimeUserValue);
    if (isFirstTimeUserValue === null) {
      setIsFirstTimeUserValue("true");
    }
  }, [isFirstTimeUserValue, setIsFirstTimeUserValue]);

  const signInMutation = useMutation<
    User,
    Error,
    { email: string; password: string }
  >({
    mutationFn: async (credentials) => {
      console.log("Signing in...", credentials.email);
      const response = await axios.get<User>(`${API_URL}/users/1`);
      console.log("Sign in response:", response.data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Sign in successful");
      setSession(JSON.stringify(data));
      setIsFirstTimeUserValue("false");
      queryClient.setQueryData(["user"], data);
    },
    onError: (error) => {
      console.error("Sign in failed:", error);
    },
  });

  const signUpMutation = useMutation<
    User,
    Error,
    { name: string; email: string; password: string }
  >({
    mutationFn: async (userData) => {
      console.log("Signing up...", userData.email);
      const response = await axios.post<User>(`${API_URL}/users`, userData);
      console.log("Sign up response:", response.data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Sign up successful");
      setSession(JSON.stringify(data));
      setIsFirstTimeUserValue("false");
      queryClient.setQueryData(["user"], data);
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
    },
  });

  const signOut = () => {
    console.log("Signing out...");
    setSession(null);
    queryClient.setQueryData(["user"], null);
    console.log("Sign out complete");
  };

  const setIsFirstTimeUser = (value: boolean) => {
    console.log("Setting isFirstTimeUser:", value);
    setIsFirstTimeUserValue(value ? "true" : "false");
  };

  const value: AuthContextType = {
    signIn: signInMutation.mutateAsync,
    signUp: signUpMutation.mutateAsync,
    signOut,
    session: session ? JSON.parse(session) : null,
    isLoading:
      isLoading ||
      signInMutation.isPending ||
      signUpMutation.isPending ||
      isFirstTimeUserLoading,
    isFirstTimeUser: isFirstTimeUserValue === "true",
    setIsFirstTimeUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function SessionProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
