// src/components/GaleriaNavidad.tsx
// Galería "foto grande + miniaturas" reutilizable. Recibe una galería de src/data/navidad.ts.
import { useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { GaleriaNavidad as Galeria } from "../data/navidad";
import { DORADO } from "../theme/navidad";
import TituloDorado from "./TituloDorado";
import VisorFoto from "./VisorFoto";

const UMBRAL_SWIPE = 40; // px

const flechaSx = {
  bgcolor: "rgba(0,0,0,0.5)",
  color: "#fff",
  "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
} as const;

export default function GaleriaNavidad({ galeria }: { galeria: Galeria }) {
  // La portada va primero, luego las demás fotos.
  const fotos = [galeria.portada, ...galeria.fotos];
  const [actual, setActual] = useState(0);
  const [visor, setVisor] = useState<number | null>(null);
  const tira = useRef<HTMLDivElement>(null);
  const miniaturas = useRef<(HTMLButtonElement | null)[]>([]);
  const toqueX = useRef<number | null>(null);

  const ir = (i: number) => setActual((i + fotos.length) % fotos.length);

  // Mantiene la miniatura seleccionada visible y centrada en la tira.
  useEffect(() => {
    const cont = tira.current;
    const el = miniaturas.current[actual];
    if (!cont || !el) return;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cont.scrollTo({
      left: el.offsetLeft - (cont.clientWidth - el.clientWidth) / 2,
      behavior: reducir ? "auto" : "smooth",
    });
  }, [actual]);

  const desplazarTira = (dir: number) =>
    tira.current?.scrollBy({
      left: dir * tira.current.clientWidth * 0.8,
      behavior: "smooth",
    });

  const foto = fotos[actual];

  return (
    <Box component="section" aria-label={galeria.titulo} sx={{ mt: { xs: 5, md: 7 } }}>
      <Box textAlign="center" mb={3}>
        <TituloDorado>{galeria.titulo}</TituloDorado>
      </Box>

      <Box sx={{ maxWidth: 640, mx: "auto" }}>
        {/* FOTO GRANDE */}
        <Box
          role="group"
          aria-roledescription="carrusel"
          aria-label={`${galeria.titulo}: foto ${actual + 1} de ${fotos.length}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") ir(actual + 1);
            if (e.key === "ArrowLeft") ir(actual - 1);
          }}
          onTouchStart={(e) => {
            toqueX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (toqueX.current === null) return;
            const dx = e.changedTouches[0].clientX - toqueX.current;
            toqueX.current = null;
            if (Math.abs(dx) > UMBRAL_SWIPE) ir(actual + (dx < 0 ? 1 : -1));
          }}
          sx={{
            position: "relative",
            aspectRatio: "4 / 5", // altura estable al cambiar de foto
            borderRadius: 3,
            overflow: "hidden",
            border: `4px solid ${DORADO}`,
            bgcolor: "rgba(0,0,0,0.35)",
            boxShadow: `0 0 28px rgba(230,184,76,0.3), 0 12px 28px rgba(0,0,0,0.45)`,
            "&:focus-visible": { outline: `3px solid ${DORADO}`, outlineOffset: 3 },
          }}
        >
          <Box
            component="button"
            type="button"
            onClick={() => setVisor(actual)}
            aria-label="Ampliar foto"
            sx={{
              position: "absolute",
              inset: 0,
              p: 0,
              border: "none",
              bgcolor: "transparent",
              cursor: "zoom-in",
            }}
          >
            <Box
              component="img"
              key={foto.src}
              src={foto.src}
              alt={foto.alt}
              sx={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          </Box>
          <IconButton
            aria-label="Foto anterior"
            onClick={() => ir(actual - 1)}
            sx={{
              ...flechaSx,
              position: "absolute",
              top: "50%",
              left: 8,
              transform: "translateY(-50%)",
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            aria-label="Foto siguiente"
            onClick={() => ir(actual + 1)}
            sx={{
              ...flechaSx,
              position: "absolute",
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* MINIATURAS */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <IconButton
            aria-label="Desplazar miniaturas a la izquierda"
            onClick={() => desplazarTira(-1)}
            sx={{ ...flechaSx, display: { xs: "none", md: "inline-flex" } }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Box
            ref={tira}
            sx={{
              position: "relative", // para calcular offsetLeft de las miniaturas
              flex: 1,
              minWidth: 0,
              display: "flex",
              gap: 1,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              py: 1,
              px: 0.5,
              scrollbarWidth: "thin",
            }}
          >
            {fotos.map((f, i) => (
              <Box
                key={f.src}
                ref={(el: HTMLButtonElement | null) => {
                  miniaturas.current[i] = el;
                }}
                component="button"
                type="button"
                onClick={() => setActual(i)}
                aria-label={`Ver foto ${i + 1} de ${fotos.length}`}
                aria-current={i === actual}
                sx={{
                  flex: "none",
                  width: { xs: 64, md: 80 },
                  aspectRatio: "1 / 1",
                  p: 0,
                  scrollSnapAlign: "center",
                  borderRadius: 1.5,
                  overflow: "hidden",
                  cursor: "pointer",
                  bgcolor: "transparent",
                  border: `3px solid ${i === actual ? DORADO : "transparent"}`,
                  opacity: i === actual ? 1 : 0.7,
                  transition: "opacity .2s, border-color .2s",
                  "&:hover, &:focus-visible": {
                    opacity: 1,
                    outline: "none",
                    borderColor: i === actual ? DORADO : "rgba(230,184,76,0.6)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={f.src}
                  alt={f.alt}
                  loading="lazy"
                  sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </Box>
            ))}
          </Box>
          <IconButton
            aria-label="Desplazar miniaturas a la derecha"
            onClick={() => desplazarTira(1)}
            sx={{ ...flechaSx, display: { xs: "none", md: "inline-flex" } }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      <VisorFoto
        fotos={fotos}
        indice={visor}
        onCambiar={(i) => {
          setVisor(i);
          if (i !== null) setActual(i);
        }}
      />
    </Box>
  );
}
