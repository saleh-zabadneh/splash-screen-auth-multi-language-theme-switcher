import { Slot, useRouter, useSegments } from "expo-router";
import { useCallback, useEffect } from "react";
import { SessionProvider, useSession } from "@/hooks/ctx";
import { ThemeProvider } from "@/hooks/useTheme";
import { AppSettingsProvider } from "@/components/AppSettingsProvider";
import RootLayoutContent from "./RootLayoutContent";
import "@/global.css";

function RootLayoutNav() {
  const { session, isLoading, isFirstTimeUser } = useSession();
  const segments = useSegments();
  const router = useRouter();

  const checkAuth = useCallback(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(app)";
    const inWelcomeGroup = segments[0] === "(hello)";
    const isAuthRoute = segments[0] === "sign-up" || segments[0] === "sign-in";

    console.log("Checking auth:", {
      session,
      isFirstTimeUser,
      segments: segments[0],
    });

    if (session && !inAuthGroup) {
      console.log("Authenticated, redirecting to home");
      router.replace("/");
    } else if (!session) {
      if (isFirstTimeUser && !inWelcomeGroup) {
        console.log("First time user, redirecting to welcome");
        router.replace("/(hello)/welcome");
      } else if (!isFirstTimeUser && !isAuthRoute) {
        console.log("Returning user, redirecting to sign in");
        router.replace("/sign-in");
      }
    }
  }, [isLoading, segments, session, isFirstTimeUser, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SessionProvider>
        <AppSettingsProvider>
          <RootLayoutContent>
            <RootLayoutNav />
          </RootLayoutContent>
        </AppSettingsProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
