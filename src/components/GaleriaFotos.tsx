import {
  Box,
  Grid,
  Typography,
  Dialog,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { galeriaFotos } from "../data/galeria";

export default function GaleriaFotos() {
  const [open, setOpen] = useState(false);
  const [categoriaTitulo, setCategoriaTitulo] = useState("");
  const [fotosCategoria, setFotosCategoria] = useState<
    { titulo: string; imagen: string }[]
  >([]);
  const [fotoIndex, setFotoIndex] = useState(0);

  const handleOpen = (
    titulo: string,
    fotos: { titulo: string; imagen: string }[]
  ) => {
    setCategoriaTitulo(titulo);
    setFotosCategoria(fotos);
    setFotoIndex(0);
    setOpen(true);
  };

  const handleNext = () => {
    setFotoIndex((prev) => (prev + 1) % fotosCategoria.length);
  };

  const handlePrev = () => {
    setFotoIndex((prev) =>
      prev === 0 ? fotosCategoria.length - 1 : prev - 1
    );
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Galería de Fotos
      </Typography>
      <Grid container spacing={2}>
        {galeriaFotos.map((categoria, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }}   key={index}>
            <Box
              component="img"
              src={categoria.fotos[0].imagen}
              alt={categoria.categoria}
              sx={{
                width: "100%",
                height: 300,
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: 2,
                boxShadow: 2,
                cursor: "pointer",
              }}
              onClick={() => handleOpen(categoria.categoria, categoria.fotos)}
            />
            <Typography variant="body2" textAlign="center" mt={1}>
              {categoria.categoria}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <Box p={2} position="relative" textAlign="center">
          {/* Botón cerrar */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" mb={2}>
            {categoriaTitulo}
          </Typography>

          {/* Imagen actual */}
          <Box
            component="img"
            src={fotosCategoria[fotoIndex]?.imagen}
            alt={fotosCategoria[fotoIndex]?.titulo}
            sx={{
              width: "100%",
              maxHeight: 400,
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 2,
              mb: 1,
            }}
          />

          {/* Título de la imagen actual */}
          <Typography variant="body2" mb={2}>
            {fotosCategoria[fotoIndex]?.titulo} ({fotoIndex + 1} / {fotosCategoria.length})
          </Typography>

          {/* Navegación */}
          <Stack direction="row" justifyContent="center" spacing={4}>
            <IconButton onClick={handlePrev}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton onClick={handleNext}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Stack>
        </Box>
      </Dialog>
    </Box>
  );
}
