import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    pinkCustom: {
      50: "#ffe4e6",
      100: "#fbb8c0",
      200: "#f78c9b",
      300: "#f36075",
      400: "#ef3350",
      500: "#d61a3c",
      600: "#a71330",
      700: "#780d24",
      800: "#4a0617",
      900: "#1d000b",
    },
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          bg: "pinkCustom.100",
        },
      },
      variants: {
        solid: (props) => ({
          bg: props.colorMode === "dark" ? "pinkCustom.600" : "pinkCustom.400",
          color: "white",
        }),
      },
    },
    // You can customize other components in a similar manner
  },
  // You can also add custom styles for other parts of the theme (e.g., fonts, sizes)
});

export default customTheme;
