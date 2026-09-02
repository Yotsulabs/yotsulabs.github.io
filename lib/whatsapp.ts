export function cleanPhoneNumber(phone: string): string {
  if (!phone) return "";
  let digits = phone.replace(/[^0-9]/g, "");
  if (digits.startsWith("0")) {
    digits = "62" + digits.slice(1);
  }
  return digits;
}

export function getWhatsAppLink(phone: string, message?: string): string {
  const cleaned = cleanPhoneNumber(phone);
  const encodedMsg = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${cleaned}${encodedMsg}`;
}
