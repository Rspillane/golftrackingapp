/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark
  }
};

// theme.ts
export const theme = {
  colors: {
    lightBg: "#D6DCDA",
    lightBgDark: "#C8D0CE",
    lightBgLight: "#F1F3F3",
    lightPrimary: "#00573eff",
    lightSecondary: "hsl(0, 0%, 100%)",
    semanticRed: "hsl(0, 98%, 32%)"
  },
  // colors: {
  //   lightBg: "hsl(0, 0%, 95%)",
  //   lightBgDark: "hsl(0, 0%, 90%)",
  //   lightBgLight: "hsl(0, 0%, 100%)",
  //   lightPrimary: "hsl(163, 100%, 17%)",
  //   lightSecondary: "hsl(0, 0%, 100%)",
  //   semanticRed: "hsl(0, 98%, 32%)"
  // },
  text: { bold: 700, muted: 0.6 }
}; // fontWeight // opacity

export const Tones = { muted: { color: "#666" } };
