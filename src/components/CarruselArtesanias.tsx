// src/components/CarruselArtesanias.tsx
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import CardArtesania from "./CardArtesania";
import { artesanias } from "../data/artesanias"; // <-- importas los datos
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CarruselArtesanias() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Nuestras Artesanías Destacadas
      </Typography>
      <Slider {...settings}>
        {artesanias.map((item, i) => (
          <div key={i}>
            <Box px={1}>
              <CardArtesania
                titulo={item.titulo}
                descripcion={item.descripcion}
                imagen={item.imagen}
              />
            </Box>
          </div>
        ))}
      </Slider>
    </Box>
  );
}
