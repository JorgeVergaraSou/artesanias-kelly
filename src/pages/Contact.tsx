// src/pages/Contacto.tsx
import { Box, Typography, Stack, Link } from "@mui/material";

export default function Contacto() {
  const whatsappURL = "https://wa.me/56954957090"; // tu número con código de país
  const instagramURL = "https://instagram.com/artesaniaskelly"; // tu usuario

  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
           <Typography
        variant="h6"
        sx={{
          fontFamily: "'Style Script', cursive",
          fontSize: "3rem",
          textAlign: "center", // centra el texto horizontalmente
        }}
      >
        ¡Contactanos!
      </Typography>

            <Typography
        variant="body1"
        sx={{
          fontFamily: "'Style Script', cursive",
          fontSize: "2rem",
          textAlign: "center", // centra el texto horizontalmente
        }}
      >
        Escribinos por WhatsApp o seguinos en Instagram
      </Typography>

      {/* Redes sociales con imágenes */}
      <Stack direction="row" spacing={4} justifyContent="center" mt={3}>
        <Link href={whatsappURL} target="_blank" rel="noopener">
          <Box
            component="img"
            src="/img/redes/whatsap.png"
            alt="WhatsApp"
            sx={{ width: 48, height: 48 }}
          />
        </Link>

        <Link href={instagramURL} target="_blank" rel="noopener">
          <Box
            component="img"
            src="/img/redes/insta.png"
            alt="Instagram"
            sx={{ width: 48, height: 48 }}
          />
        </Link>
      </Stack>


    </Box>
  );
}
