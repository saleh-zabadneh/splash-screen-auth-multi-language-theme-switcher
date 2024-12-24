import React from "react";
import { Text, TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  type = "default",
  className,
  ...rest
}: ThemedTextProps & { className?: string }) {
  const typeStyles = {
    default: "text-base leading-6 text-text dark:text-text-dark",
    defaultSemiBold:
      "text-base leading-6 font-semibold text-text dark:text-text-dark",
    title: "text-3xl font-bold leading-8 text-text dark:text-text-dark",
    subtitle: "text-xl font-bold text-text dark:text-text-dark",
    link: "text-base leading-7 text-tint dark:text-tint-dark",
  };

  return (
    <Text
      className={`${typeStyles[type]} ${className || ""}`}
      style={style}
      {...rest}
    />
  );
}
