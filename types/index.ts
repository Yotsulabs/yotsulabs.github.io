import { Timestamp } from "firebase/firestore";

// Order Types
export interface OrderDoc {
  id: string;
  fullName: string;
  companyName?: string;
  phone: string;
  email?: string;
  bidang: string;
  bidangKey?: string;
  jasa: string;
  jasaKey?: string;
  background?: string;
  goal?: string;
  targetTime: string;
  targetTimeKey?: string;
  notes?: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  createdAt?: Timestamp | Date;
}

// Portfolio Types
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
  createdAt?: Timestamp | Date;
}

// Service Types
export interface SubServiceItem {
  title: string;
}

export interface ServiceItemDoc {
  id: string;
  pillar: "technology" | "creative" | "marketing";
  title: string;
  description: string;
  items?: SubServiceItem[];
  item1Title?: string;
  item2Title?: string;
  item3Title?: string;
  createdAt?: Timestamp | Date;
}

// Landing Page Service Item Model
export interface ServiceItem {
  id: string;
  category: "tech" | "creative" | "marketing";
  title: string;
  description: string;
  features: string[];
}

// Navigation & Links Model
export interface NavLinkItem {
  name: string;
  href: string;
  sub?: string;
  icon?: React.ElementType;
}

export interface SocialLinkItem {
  name: string;
  href: string;
  icon: React.ElementType;
}
