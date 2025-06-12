// src/components/Footer.tsx
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ py: 2, textAlign: "center", backgroundColor: "primary.main", color: "white" }}>
      <Typography variant="body2">© 2025 - {new Date().getFullYear()} Artesanías Kelly</Typography>
    </Box>
  );
}