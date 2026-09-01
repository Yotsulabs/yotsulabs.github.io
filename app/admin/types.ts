import { Timestamp } from "firebase/firestore";

export interface OrderDoc {
  id: string;
  fullName: string;
  companyName?: string;
  phone: string;
  email?: string;
  bidang: string;
  jasa: string;
  background?: string;
  goal?: string;
  targetTime: string;
  notes?: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  createdAt?: Timestamp | Date | null;
}

export interface PortfolioDoc {
  id: string;
  title: string;
  companyName?: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  metric?: string;
  metricSub?: string;
  description: string;
  createdAt?: Timestamp | Date | null;
}

export interface SubServiceItem {
  title: string;
  desc?: string;
}

export interface ServiceItemDoc {
  id: string;
  pillar: "technology" | "creative" | "marketing";
  title: string;
  description: string;
  items?: SubServiceItem[];
  item1Title?: string;
  item1Desc?: string;
  item2Title?: string;
  item2Desc?: string;
  item3Title?: string;
  item3Desc?: string;
  createdAt?: Timestamp | Date | null;
}
