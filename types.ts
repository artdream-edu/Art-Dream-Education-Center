
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

// Added ChatMessage interface to fix "Module '"../types"' has no exported member 'ChatMessage'" error
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
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
  footerAddress?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  blogUrl?: string;
}

export type ViewMode = 'home' | 'admin';
