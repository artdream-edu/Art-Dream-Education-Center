
export interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imagePosition?: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  content: string;
}

export interface HistoryItem {
  id: string;
  year: string;
  event: string;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  logoName: string;
  logoImageUrl?: string;
  logoImagePosition?: string;
  aboutText: string;
  aboutImageUrl: string;
  aboutImagePosition?: string;
  heroImageUrl?: string;
  heroImagePosition?: string;
  adminPassword?: string;
}

export type ViewMode = 'home' | 'admin';
