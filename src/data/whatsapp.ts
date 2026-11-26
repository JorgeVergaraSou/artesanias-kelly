// src/data/whatsapp.ts
// Único lugar donde vive el número de WhatsApp del negocio.

export const WHATSAPP_PHONE = "56954957090";

export const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
