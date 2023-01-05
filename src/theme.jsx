// 1. Import the extendTheme function
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config: {
    ...config,
    colors: {
      black: "#000000", // "#131416",
      white: "#F5F5F5",
    },
  },
});

export default theme;