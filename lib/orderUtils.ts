import {
  BIDANG_LIST,
  JASA_BY_BIDANG,
  TARGET_TIME_OPTIONS,
  BidangKey,
} from "./orderData";

export function getBidangTitle(bidangKey: BidangKey): string {
  return BIDANG_LIST.find((b) => b.key === bidangKey)?.title || "Technology";
}

export function getJasaName(bidangKey: BidangKey, jasaKey: string): string {
  const list = JASA_BY_BIDANG[bidangKey] || [];
  return list.find((j) => j.id === jasaKey)?.name || "";
}

export function getTargetTimeLabel(targetTimeKey: string): string {
  return TARGET_TIME_OPTIONS.find((t) => t.value === targetTimeKey)?.label || "";
}

export interface OrderFormValues {
  fullName: string;
  companyName?: string;
  phone: string;
  email?: string;
  bidang: BidangKey;
  jasa: string;
  background?: string;
  goal?: string;
  targetTime: string;
  notes?: string;
}

export function generateWhatsAppMessage(values: OrderFormValues): string {
  const bidangTitle = getBidangTitle(values.bidang);
  const jasaName = getJasaName(values.bidang, values.jasa);
  const targetTimeLabel = getTargetTimeLabel(values.targetTime);

  const messageLines = [
    `*FORM PEMESANAN PROYEK - YOTSULABS*`,
    ``,
    `*Informasi Client:*`,
    `- Nama Lengkap: ${values.fullName.trim()}`,
    values.companyName?.trim() ? `- Nama Usaha/Organisasi: ${values.companyName.trim()}` : null,
    `- Nomor WhatsApp: ${values.phone.trim()}`,
    values.email?.trim() ? `- Email: ${values.email.trim()}` : null,
    ``,
    `*Kebutuhan Proyek:*`,
    `- Bidang: ${bidangTitle}`,
    `- Jasa: ${jasaName}`,
    values.background?.trim() ? `- Latar Belakang: ${values.background.trim()}` : null,
    values.goal?.trim() ? `- Tujuan Project: ${values.goal.trim()}` : null,
    ``,
    `*Detail Project:*`,
    `- Target Waktu: ${targetTimeLabel}`,
    values.notes?.trim() ? `- Referensi/Catatan Tambahan: ${values.notes.trim()}` : null,
    ``,
    `Mohon bantuan diskusi teknis dan penawaran resmi. Terima kasih!`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return messageLines;
}
