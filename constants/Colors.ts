export const Colors = {
  light: {
    text: "rgb(17 24 28)",
    background: "rgb(255 255 255)",
    tint: "rgb(10 126 164)",
    icon: "rgb(104 112 118)",
  },
  dark: {
    text: "rgb(236 237 238)",
    background: "rgb(21 23 24)",
    tint: "rgb(255 255 255)",
    icon: "rgb(155 161 166)",
  },
} as const;

export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;
