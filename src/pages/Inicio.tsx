// src/pages/Inicio.tsx
import { Typography } from "@mui/material";
import CarruselArtesanias from "../components/CarruselArtesanias";
import GaleriaFotos from "../components/GaleriaFotos";

export default function Inicio() {
  return (
    <>
      <Typography variant="h4" gutterBottom textAlign="center">
        Bienvenido al mundo de las artesanías
      </Typography>
      <CarruselArtesanias />
      <GaleriaFotos />
    </>
  );
}

