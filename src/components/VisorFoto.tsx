// src/components/VisorFoto.tsx
// Lightbox con MUI Dialog. Las flechas recorren solo el arreglo `fotos` recibido.
import { Box, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { FotoNavidad } from "../data/navidad";
import { DORADO } from "../theme/navidad";

interface Props {
  fotos: FotoNavidad[];
  /** Índice abierto, o null si está cerrado */
  indice: number | null;
  onCambiar: (indice: number | null) => void;
}

const flecha = {
  position: "absolute",
  top: "50%",
  bgcolor: "rgba(255,255,255,0.8)",
  "&:hover": { bgcolor: "#fff" },
} as const;

export default function VisorFoto({ fotos, indice, onCambiar }: Props) {
  const foto = indice !== null ? fotos[indice] : null;
  const hayVarias = fotos.length > 1;
  const mover = (d: number) =>
    onCambiar(indice === null ? null : (indice + d + fotos.length) % fotos.length);

  return (
    <Dialog
      open={foto !== null}
      onClose={() => onCambiar(null)}
      maxWidth="lg"
      onKeyDown={(e) => {
        if (!hayVarias) return;
        if (e.key === "ArrowRight") mover(1);
        if (e.key === "ArrowLeft") mover(-1);
      }}
      slotProps={{
        paper: {
          sx: { bgcolor: "transparent", boxShadow: "none", m: 1, overflow: "visible" },
        },
      }}
    >
      {foto && (
        <Box sx={{ position: "relative", textAlign: "center" }}>
          <Box
            component="img"
            src={foto.src}
            alt={foto.alt}
            sx={{
              maxWidth: "100%",
              maxHeight: "85vh",
              borderRadius: 2,
              border: `3px solid ${DORADO}`,
              display: "block",
              mx: "auto",
            }}
          />
          <IconButton
            aria-label="Cerrar"
            onClick={() => onCambiar(null)}
            sx={{
              position: "absolute",
              top: -12,
              right: -12,
              bgcolor: DORADO,
              "&:hover": { bgcolor: "#f3cd72" },
            }}
          >
            <CloseIcon />
          </IconButton>
          {hayVarias && (
            <>
              <IconButton
                aria-label="Foto anterior"
                onClick={() => mover(-1)}
                sx={{ ...flecha, left: 4 }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                aria-label="Foto siguiente"
                onClick={() => mover(1)}
                sx={{ ...flecha, right: 4 }}
              >
                <ChevronRightIcon />
              </IconButton>
            </>
          )}
        </Box>
      )}
    </Dialog>
  );
}
