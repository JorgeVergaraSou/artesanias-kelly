// src/pages/Navidad.tsx
import { useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Box, Button, Container, Dialog, IconButton, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PlaceIcon from "@mui/icons-material/Place";
import {
  buscarEdicion,
  edicionMasReciente,
  type EdicionNavidad,
} from "../data/navidad";
import { buildWhatsAppLink } from "../data/whatsapp";
import { DORADO, CREMA } from "../theme/navidad";

const caer = keyframes`
  0%   { transform: translate3d(0, -10vh, 0); }
  100% { transform: translate3d(var(--deriva), 110vh, 0); }
`;

const brillo = keyframes`
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.55; }
`;

// Copos con valores fijos (derivados del índice) para que el render sea estable.
const COPOS = Array.from({ length: 24 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  size: 4 + ((i * 5) % 7),
  duracion: 9 + ((i * 7) % 11),
  retraso: -((i * 3) % 14),
  deriva: `${((i % 5) - 2) * 18}px`,
  opacidad: 0.4 + (i % 4) * 0.15,
}));

function Nieve() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: -1, // detrás del contenido, encima del fondo de <main>
        "@media (prefers-reduced-motion: reduce)": { display: "none" },
      }}
    >
      {COPOS.map((c, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: 0,
            left: c.left,
            width: c.size,
            height: c.size,
            borderRadius: "50%",
            bgcolor: "#fff",
            opacity: c.opacidad,
            "--deriva": c.deriva,
            animation: `${caer} ${c.duracion}s linear ${c.retraso}s infinite`,
          }}
        />
      ))}
    </Box>
  );
}

function Guirnalda() {
  const bombillas = ["#E53935", DORADO, "#2E8B57", DORADO];
  const fondo = bombillas
    .map(
      (color, i) =>
        `radial-gradient(circle at ${12 + i * 25}% 70%, ${color} 0 7px, transparent 8px)`
    )
    .join(", ");
  return (
    <Box aria-hidden sx={{ position: "relative", height: 30, zIndex: 2 }}>
      <Box
        sx={{
          position: "absolute",
          top: 4,
          left: 0,
          right: 0,
          height: 3,
          bgcolor: "#1f5e3f",
          borderRadius: 2,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: fondo,
          backgroundSize: "120px 100%",
          filter: `drop-shadow(0 0 4px ${DORADO})`,
          animation: `${brillo} 2.4s ease-in-out infinite`,
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      />
    </Box>
  );
}

function BloqueInvitacion({
  invitacion,
  lugar,
  onAmpliar,
}: {
  invitacion: NonNullable<EdicionNavidad["invitacion"]>;
  lugar: NonNullable<EdicionNavidad["lugar"]>;
  onAmpliar: () => void;
}) {
  const direccion = encodeURIComponent(lugar.direccion);
  return (
    <Box sx={{ pt: { xs: 1, md: 3 }, pb: { xs: 2, md: 4 } }}>
      <Box textAlign="center" mb={3}>
        <TituloDorado>Te invitamos a celebrar con nosotros</TituloDorado>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(260px, 5fr) 6fr" },
          gap: { xs: 3, md: 5 },
          alignItems: "start",
        }}
      >
        <Box
          component="button"
          type="button"
          onClick={onAmpliar}
          aria-label="Ampliar la invitación"
          sx={{
            p: 0,
            border: `4px solid ${DORADO}`,
            borderRadius: 3,
            overflow: "hidden",
            cursor: "zoom-in",
            bgcolor: "transparent",
            display: "block",
            width: "100%",
            maxWidth: { xs: 420, md: "none" },
            mx: "auto",
            boxShadow: `0 0 28px rgba(230,184,76,0.35), 0 12px 28px rgba(0,0,0,0.45)`,
            transition: "transform .25s ease",
            "&:hover, &:focus-visible": { transform: "scale(1.02)", outline: "none" },
          }}
        >
          <Box
            component="img"
            src={invitacion.src}
            alt={invitacion.alt}
            sx={{ display: "block", width: "100%", height: "auto" }}
          />
        </Box>

        <Box>
          <Box
            component="iframe"
            src={`https://www.google.com/maps?q=${direccion}&output=embed`}
            title={`Mapa de ${lugar.nombre}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            sx={{
              display: "block",
              width: "100%",
              height: { xs: 280, md: 420 },
              border: `3px solid ${DORADO}`,
              borderRadius: 3,
              boxShadow: "0 8px 22px rgba(0,0,0,0.45)",
            }}
          />
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: { xs: "center", md: "space-between" },
              gap: 2,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 700, color: DORADO, fontSize: "1.1rem" }}>
                {lugar.nombre}
              </Typography>
              <Typography>{lugar.direccion}</Typography>
            </Box>
            <Button
              variant="contained"
              color="warning"
              href={`https://www.google.com/maps/search/?api=1&query=${direccion}`}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<PlaceIcon />}
              sx={{ borderRadius: 8, px: 3, fontWeight: 700 }}
            >
              Cómo llegar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function TituloDorado({ children, size = "3rem" }: { children: string; size?: string }) {
  return (
    <Typography
      component="h2"
      sx={{
        fontFamily: "'Style Script', cursive",
        fontSize: { xs: `calc(${size} * 0.8)`, md: size },
        color: DORADO,
        textShadow: "0 2px 6px rgba(0,0,0,0.4)",
        lineHeight: 1.15,
      }}
    >
      {children}
    </Typography>
  );
}

export default function Navidad() {
  const { anio } = useParams();
  const edicion = buscarEdicion(anio);
  // Visor: índice de la galería, "invitacion", o null (cerrado).
  const [abierta, setAbierta] = useState<number | "invitacion" | null>(null);

  if (!edicion) {
    return (
      <Container sx={{ textAlign: "center", py: 8, color: CREMA }}>
        <Typography variant="h5" gutterBottom sx={{ color: DORADO }}>
          No encontramos esa edición de Navidad
        </Typography>
        <Typography mb={3}>
          Puede que aún no esté disponible. Mira la más reciente:
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to={`/navidad/${edicionMasReciente.anio}`}
        >
          Ver {edicionMasReciente.titulo}
        </Button>
      </Container>
    );
  }

  const { fotos, invitacion, lugar } = edicion;
  const esInvitacion = abierta === "invitacion";
  const foto =
    abierta === null ? null : esInvitacion ? (invitacion ?? null) : fotos[abierta];
  const mover = (d: number) =>
    setAbierta((i) =>
      typeof i === "number" ? (i + d + fotos.length) % fotos.length : i
    );

  const mensaje = `Hola, quiero encargar un regalo de Navidad ${edicion.anio}.`;

  return (
    <>
      <Nieve />
      <Guirnalda />

      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 1, color: CREMA, pt: 2, pb: 8 }}
      >
        {invitacion && lugar && (
          <BloqueInvitacion
            invitacion={invitacion}
            lugar={lugar}
            onAmpliar={() => setAbierta("invitacion")}
          />
        )}

        {/* HERO */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(280px, 5fr) 6fr" },
            gap: { xs: 3, md: 6 },
            alignItems: "center",
            py: { xs: 2, md: 4 },
          }}
        >
          <Box
            component="img"
            src={edicion.portada.src}
            alt={edicion.portada.alt}
            sx={{
              width: "100%",
              maxHeight: { xs: 460, md: 640 },
              objectFit: "cover",
              borderRadius: 3,
              border: `4px solid ${DORADO}`,
              boxShadow: `0 0 28px rgba(230,184,76,0.35), 0 12px 28px rgba(0,0,0,0.45)`,
            }}
          />
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography
              component="h1"
              sx={{
                fontFamily: "'Style Script', cursive",
                fontSize: { xs: "3.2rem", md: "5rem" },
                color: DORADO,
                textShadow: "0 3px 10px rgba(0,0,0,0.5)",
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              {edicion.titulo}
            </Typography>
            {edicion.introduccion.map((p, i) => (
              <Typography
                key={i}
                sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.7, mb: 1.5 }}
              >
                {p}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* GALERÍA */}
        <Box textAlign="center" mt={4} mb={3}>
          <TituloDorado>Nuestras creaciones</TituloDorado>
        </Box>
        <Box
          sx={{
            // Flex en lugar de grid para que la última fila incompleta quede centrada.
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            "--cols": { xs: 2, sm: 3, md: 4 },
            "--gap": { xs: "12px", md: "16px" },
            gap: "var(--gap)",
          }}
        >
          {fotos.map((f, i) => (
            <Box
              key={f.src}
              component="button"
              type="button"
              onClick={() => setAbierta(i)}
              aria-label={`Ampliar: ${f.alt}`}
              sx={{
                display: "block",
                flex: "0 0 calc((100% - (var(--cols) - 1) * var(--gap)) / var(--cols))",
                aspectRatio: "3 / 4",
                p: 0,
                border: "none",
                cursor: "zoom-in",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "transparent",
                boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
                transition: "transform .25s ease, box-shadow .25s ease",
                "&:hover, &:focus-visible": {
                  transform: "translateY(-4px) scale(1.02)",
                  boxShadow: `0 8px 20px rgba(0,0,0,0.5), 0 0 0 2px ${DORADO}`,
                  outline: "none",
                },
              }}
            >
              <Box
                component="img"
                src={f.src}
                alt={f.alt}
                loading="lazy"
                sx={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ))}
        </Box>

        {/* LLAMADO A LA ACCIÓN */}
        <Box textAlign="center" mt={6}>
          <TituloDorado size="2.6rem">Encarga tu regalo de Navidad</TituloDorado>
          <Typography sx={{ mt: 1, mb: 3 }}>
            Escríbenos por WhatsApp y cuéntanos qué te gustaría regalar.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="success"
            href={buildWhatsAppLink(mensaje)}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<WhatsAppIcon />}
            sx={{ borderRadius: 8, px: 4, fontWeight: 700 }}
          >
            Escribir por WhatsApp
          </Button>
        </Box>
      </Container>

      {/* LIGHTBOX */}
      <Dialog
        open={foto !== null}
        onClose={() => setAbierta(null)}
        maxWidth="lg"
        onKeyDown={(e) => {
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
              onClick={() => setAbierta(null)}
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
            {!esInvitacion && (
              <>
            <IconButton
              aria-label="Foto anterior"
              onClick={() => mover(-1)}
              sx={{
                position: "absolute",
                top: "50%",
                left: 4,
                bgcolor: "rgba(255,255,255,0.8)",
                "&:hover": { bgcolor: "#fff" },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              aria-label="Foto siguiente"
              onClick={() => mover(1)}
              sx={{
                position: "absolute",
                top: "50%",
                right: 4,
                bgcolor: "rgba(255,255,255,0.8)",
                "&:hover": { bgcolor: "#fff" },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
              </>
            )}
          </Box>
        )}
      </Dialog>
    </>
  );
}
