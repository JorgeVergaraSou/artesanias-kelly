// src/components/Navbar.tsx
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: "'Style Script', cursive",
            fontSize: "2rem", // Podés ajustar el tamaño aquí
          }}
        >
          Artesanías Kelly
        </Typography>



        <Box>
          <Button  color="inherit" component={RouterLink} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={RouterLink} to="/nosotros">
            Nosotros
          </Button>
          <Button color="inherit" component={RouterLink} to="/contacto">
            Contacto
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}