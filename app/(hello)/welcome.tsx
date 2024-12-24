import { router } from "expo-router";
import { useRef, useState, useEffect } from "react";
import { TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useSession } from "@/hooks/ctx";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { isFirstTimeUser, setIsFirstTimeUser } = useSession();

  const isLastSlide = activeIndex === onboarding.length - 1;

  useEffect(() => {
    console.log("Welcome - isFirstTimeUser:", isFirstTimeUser);
  }, [isFirstTimeUser]);

  const handleFinishOnboarding = () => {
    setIsFirstTimeUser(false);
    router.replace("/sign-up");
  };

  if (!isFirstTimeUser) {
    return null;
  }

  return (
    <SafeAreaView className="flex h-full items-center justify-between ">
      <TouchableOpacity
        onPress={handleFinishOnboarding}
        className="w-full flex justify-end items-end p-5"
        accessibilityLabel="Skip onboarding"
        accessibilityHint="Navigates to sign up page"
      >
        <ThemedText>Skip</ThemedText>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<ThemedView className="  mx-1  " />}
        activeDot={<ThemedView className="  mx-1 bg-[#0286FF] " />}
        onIndexChanged={(index) => setActiveIndex(index)}
        className="  mx-1  "
      >
        {onboarding.map((item) => (
          <ThemedView
            key={item.id}
            className="flex items-center justify-center p-5"
          >
            <Image
              source={item.image}
              className="w-full  h-[300px]"
              resizeMode="contain"
              accessibilityLabel={`Onboarding image ${item.id}`}
            />
            <ThemedText className="flex flex-row items-center justify-center w-full mt-10">
              {item.title}
            </ThemedText>
            <ThemedText className="text-black text-3xl font-bold mx-10 text-center">
              {item.description}
            </ThemedText>
          </ThemedView>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? handleFinishOnboarding()
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-10 mb-5"
        accessibilityLabel={isLastSlide ? "Get Started" : "Next slide"}
        accessibilityHint={
          isLastSlide
            ? "Navigates to sign up page"
            : "Shows the next onboarding slide"
        }
      />
    </SafeAreaView>
  );
};

export default Welcome;
