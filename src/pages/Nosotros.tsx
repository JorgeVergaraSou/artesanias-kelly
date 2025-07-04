import { Typography } from "@mui/material";



// src/pages/Nosotros.tsx
export default function Nosotros() {
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Style Script', cursive",
          fontSize: "3rem",
          textAlign: "center", // centra el texto horizontalmente
        }}
      >
        Artesanias Kelly El Arte de Reciclar.
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Style Script', cursive",
          fontSize: "2rem",
          textAlign: "center", // centra el texto horizontalmente
        }}
      >
        Soy una mujer emprendedora que a través del reciclaje hace artesanias,  creando piezas únicas  de decoración y útiles
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Style Script', cursive",
          fontSize: "2rem",
          textAlign: "center", // centra el texto horizontalmente
        }}
      >
        Diferentes trabajos con reciclaje como flores,  macetas, cuadros con bandejas de huevo, lámparas de botellas,
        decoupage en madera y frascos de vidrio, organizadores con jeans y también bolsos, monederos, llaveros, separadores de páginas en  crochet.
      </Typography>
    </>
  )

}