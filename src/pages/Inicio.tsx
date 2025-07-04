import { Typography, Box } from "@mui/material";
import { keyframes } from "@emotion/react";
import CarruselArtesanias from "../components/CarruselArtesanias";
import GaleriaFotos from "../components/GaleriaFotos";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function Inicio() {
  return (
    <>
    <Box textAlign="center" mb={4}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Style Script', cursive",
          fontSize: "2.5rem",
          color: "primary.main", // usa el color principal del theme
          animation: `${fadeIn} 1s ease-out`,
        }}
      >
        Bienvenidos al mundo de las artesanías
      </Typography>
</Box>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Style Script', cursive",
            fontSize: "2.5rem",
            color: "primary.main", // usa el color principal del theme
            animation: `${fadeIn} 1s ease-out`,
          }}
        >
          El Arte de Reciclar
        </Typography>
        <Box
          sx={{
            width: "60px",
            height: "4px",
            backgroundColor: "secondary.main",
            margin: "8px auto 0",
            borderRadius: "4px",
          }}
        />
      </Box>

      <CarruselArtesanias />
      <GaleriaFotos />
    </>
  );
}
