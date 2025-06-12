// src/components/CardArtesania.tsx
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

type Props = {
  titulo: string;
  descripcion: string;
  imagen: string;
};

export default function CardArtesania({ titulo, descripcion, imagen }: Props) {
  return (
    <Card sx={{ maxWidth: 345, m: "auto" }}>
      <CardMedia component="img" height="200" image={imagen} alt={titulo} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {descripcion}
        </Typography>
      </CardContent>
    </Card>
  );
}