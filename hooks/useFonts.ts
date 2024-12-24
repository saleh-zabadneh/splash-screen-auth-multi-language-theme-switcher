import { useEffect, useState } from "react";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fontFiles = {
  "Roboto-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  "Roboto-Bold": require("../assets/fonts/SpaceMono-Regular.ttf"),
  "Cairo-Regular": require("../assets/fonts/Dubai-Medium.ttf"),
  "Cairo-Bold": require("../assets/fonts/Dubai-Medium.ttf"),
};

export function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadFonts() {
      try {
        const cachedFonts = await AsyncStorage.getItem("fontsLoaded");
        if (cachedFonts === "true") {
          if (isMounted) setFontsLoaded(true);
          return;
        }

        await Font.loadAsync(fontFiles);
        await AsyncStorage.setItem("fontsLoaded", "true");

        if (isMounted) setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
        // Do not set fontsLoaded to true on error
      }
    }

    loadFonts();

    return () => {
      isMounted = false;
    };
  }, []);

  return fontsLoaded;
}

// Test
// if (process.env.NODE_ENV === "development") {
//   (async () => {
//     const testUseFonts = () => {
//       let fontsLoaded;
//       const TestComponent = () => {
//         fontsLoaded = useFonts();
//         return null;
//       };
//       const { unmount } = render(<TestComponent />);

//       // Wait for fonts to load
//       await waitFor(() => expect(fontsLoaded).toBe(true), { timeout: 5000 });

//       // Test caching
//       AsyncStorage.getItem.mockImplementationOnce(() =>
//         Promise.resolve("true")
//       );
//       unmount();
//       render(<TestComponent />);
//       expect(fontsLoaded).toBe(true);
//     };

//     await testUseFonts();
//     console.log("useFonts test passed");
//   })();
// }
