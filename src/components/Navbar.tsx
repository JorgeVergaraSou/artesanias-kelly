// src/components/Navbar.tsx
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link as RouterLink } from "react-router-dom";
import { edicionesOrdenadas } from "../data/navidad";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const cerrar = () => setAnchorEl(null);

  return (
    <AppBar position="static" color="primary">
      <Toolbar
        sx={{
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
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
          <Button color="inherit" component={RouterLink} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={RouterLink} to="/nosotros">
            Nosotros
          </Button>
          <Button
            color="inherit"
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
            endIcon={<ArrowDropDownIcon />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Navidad
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={cerrar}>
            {edicionesOrdenadas.map((e) => (
              <MenuItem
                key={e.anio}
                component={RouterLink}
                to={`/navidad/${e.anio}`}
                onClick={cerrar}
              >
                {e.anio}
              </MenuItem>
            ))}
          </Menu>
          <Button color="inherit" component={RouterLink} to="/contacto">
            Contacto
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
