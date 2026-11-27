// src/components/TituloDorado.tsx
import { Typography } from "@mui/material";
import { DORADO } from "../theme/navidad";

export default function TituloDorado({
  children,
  size = "3rem",
}: {
  children: string;
  size?: string;
}) {
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
