// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A0522D", // Marrón tierra
    },
    secondary: {
      main: "#FFA07A", // Coral suave
    },
    background: {
      default: "#FFF8F0", // Fondo cálido
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export default theme;