import React from "react";
import { View, ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  className?: string;
};

export function ThemedView({
  style,
  className,
  ...otherProps
}: ThemedViewProps) {
  return (
    <View
      className={`bg-background dark:bg-background-dark ${className || ""}`}
      style={style}
      {...otherProps}
    />
  );
}
