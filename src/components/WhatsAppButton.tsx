// components/WhatsAppButton.tsx
import { Fab } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { buildWhatsAppLink } from "../data/whatsapp";

const WhatsAppButton = () => {
  const link = buildWhatsAppLink("Hola, estoy interesado en tus productos...");

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
