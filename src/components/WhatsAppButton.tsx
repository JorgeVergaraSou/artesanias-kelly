// components/WhatsAppButton.tsx
import { Fab } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppButton = () => {
  const phoneNumber = "56954957090"; // cambia este número
  const message = "Hola, estoy interesado en tus productos...";
  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Fab
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      color="success"
      aria-label="WhatsApp"
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9999,
      }}
    >
      <WhatsAppIcon />
    </Fab>
  );
};

export default WhatsAppButton;
