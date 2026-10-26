export interface ProductCategory {
  id: string;
  title: string;
  bannerTitle: string;
  tagline: string;
  description: string;
  cardImage: string;
  iconName: string;
  features: string[];
  specs: { label: string; value: string }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'installed' | 'wallpaper' | 'flooring' | 'blinds' | 'curtains' | 'screens';
  categoryLabel: string;
  image: string;
  isRealProject: boolean;
  location?: string;
  description: string;
}

export interface WallpaperPattern {
  id: string;
  name: string;
  style: string;
  color: string;
  textureThumb: string;
  wallColorHex: string;
  patternType: 'botanical' | 'geometric' | 'textured' | 'classic';
}

export interface FlooringFinish {
  id: string;
  name: string;
  tone: string;
  grain: string;
  colorHex: string;
  description: string;
}

export interface CurtainRodFinish {
  id: string;
  name: string;
  finish: string;
  colorHex: string;
  finialType: string;
  previewImage?: string;
}
