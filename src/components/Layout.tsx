// src/components/Layout.tsx
import { Container, Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { ReactNode } from "react";
import WhatsAppButton from "./WhatsAppButton";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" flex={1}>
        <Container sx={{ py: 4 }}>{children}</Container>
      </Box>
      <WhatsAppButton />
      <Footer />

    </Box>
  );
}
