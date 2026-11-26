// src/components/Layout.tsx
import { Container, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { ReactNode } from "react";
import WhatsAppButton from "./WhatsAppButton";
import { fondoNavidad } from "../theme/navidad";

export default function Layout({ children }: { children: ReactNode }) {
  // Solo las rutas /navidad/* usan el fondo navideño de borde a borde.
  const { pathname } = useLocation();
  const esNavidad = pathname === "/navidad" || pathname.startsWith("/navidad/");

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box
        component="main"
        flex={1}
        sx={
          esNavidad
            ? {
                position: "relative",
                background: fondoNavidad,
                // Recorta la nieve (fixed) al área de <main>, sin invadir barra ni pie.
                clipPath: "inset(0)",
              }
            : undefined
        }
      >
        {esNavidad ? children : <Container sx={{ py: 4 }}>{children}</Container>}
      </Box>
      <WhatsAppButton />
      <Footer />

    </Box>
  );
}
