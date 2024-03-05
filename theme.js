import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    themeCustom: {
      50: "#e3f2ed",
      100: "#c1e5db",
      200: "#9dd8c8",
      300: "#78cab6",
      400: "#54bca3",
      500: "#2fae91",
      600: "#279d82",
      700: "#1f8c73",
      800: "#177b64",
      900: "#0f6a55",
    },
  },
  components: {
    Button: {
      baseStyle: {
        transition: "background 0.3s ease-in-out",
      },
      variants: {
        solid: {
          bgGradient: `linear(to-l, themeCustom.900, themeCustom.500)`,
          color: "white",
          _hover: {
            bgGradient: `linear(to-l, themeCustom.800, themeCustom.600)`,
          },
        },
      },
    },
  },
});

export default customTheme;
