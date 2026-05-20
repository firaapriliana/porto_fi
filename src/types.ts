export type FilterPresetType = 
  | 'normal' 
  | 'vintage' 
  | 'grayscale' 
  | 'sepia' 
  | 'cyberpunk' 
  | 'warm' 
  | 'cool' 
  | 'cinematic' 
  | 'lofi';

export interface FilterControls {
  brightness: number; // 0 to 200, default 100
  contrast: number;   // 0 to 200, default 100
  saturation: number; // 0 to 200, default 100
  blur: number;       // 0 to 20, default 0
  hueRotate: number;  // 0 to 360, default 0
  grayscale: number;  // 0 to 100, default 0
  sepia: number;      // 0 to 100, default 0
}

export type FrameType = 
  | 'none' 
  | 'circle' 
  | 'squircle' 
  | 'glowing-neon' 
  | 'golden-classic' 
  | 'modern-border' 
  | 'dots-indicator' 
  | 'cyber-tech';

export type BadgeType = 
  | 'none' 
  | 'opentowork'  // LinkedIn style green bottom-left arc
  | 'hiring'      // purple standard bottom-right/left arc
  | 'remote'      // sleek badge
  | 'available'   // green online badge
  | 'custom';     // custom user-input text and color

export interface CustomBadgeConfig {
  text: string;
  color: string;
  bgColor: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'arc-bottom' | 'arc-top';
}

export interface ProfileDetails {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}

export type CardThemeType = 
  | 'slate-modern' 
  | 'warm-earth' 
  | 'cyber-neon' 
  | 'glass-blur' 
  | 'sunset-glow' 
  | 'royal-gold';

export interface EditorState {
  imageSrc: string | null;
  zoom: number;
  rotation: number; // in degrees: 0, 90, 180, 270
  position: { x: number; y: number };
  activeFilter: FilterPresetType;
  filters: FilterControls;
  activeFrame: FrameType;
  activeBadge: BadgeType;
  customBadge: CustomBadgeConfig;
  profile: ProfileDetails;
  theme: CardThemeType;
}

export const FILTER_PRESETS: Record<FilterPresetType, { name: string; filters: Partial<FilterControls> }> = {
  normal: { 
    name: 'Normal', 
    filters: { brightness: 100, contrast: 100, saturation: 100, blur: 0, hueRotate: 0, grayscale: 0, sepia: 0 } 
  },
  vintage: { 
    name: 'Vintage', 
    filters: { brightness: 95, contrast: 110, saturation: 80, blur: 0, hueRotate: 15, grayscale: 0, sepia: 30 } 
  },
  grayscale: { 
    name: 'Grayscale', 
    filters: { brightness: 100, contrast: 115, saturation: 0, blur: 0, hueRotate: 0, grayscale: 100, sepia: 0 } 
  },
  sepia: { 
    name: 'Sepia', 
    filters: { brightness: 100, contrast: 90, saturation: 90, blur: 0, hueRotate: 0, grayscale: 0, sepia: 80 } 
  },
  cyberpunk: { 
    name: 'Cyberpunk', 
    filters: { brightness: 110, contrast: 125, saturation: 150, blur: 0, hueRotate: 280, grayscale: 0, sepia: 0 } 
  },
  warm: { 
    name: 'Warm Sunset', 
    filters: { brightness: 105, contrast: 95, saturation: 115, blur: 0, hueRotate: 10, grayscale: 0, sepia: 15 } 
  },
  cool: { 
    name: 'Cool Breeze', 
    filters: { brightness: 100, contrast: 105, saturation: 85, blur: 0, hueRotate: 200, grayscale: 0, sepia: 0 } 
  },
  cinematic: { 
    name: 'Cinematic', 
    filters: { brightness: 90, contrast: 130, saturation: 110, blur: 0, hueRotate: 0, grayscale: 0, sepia: 5 } 
  },
  lofi: { 
    name: 'Lofi Glow', 
    filters: { brightness: 110, contrast: 100, saturation: 120, blur: 0.5, hueRotate: 340, grayscale: 0, sepia: 10 } 
  }
};
