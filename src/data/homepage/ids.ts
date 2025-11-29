// src/constants/ids.ts
export const HERO_IDS = {
  SECTION: "hero-section",

  // background images
  BG_DESKTOP: "hero-bg-desktop",
  BG_MOBILE: "hero-bg-mobile",

  // overlay & text
  OVERLAY: "hero-overlay",
  TITLE_SMALL: "hero-title-small",
  TITLE_LARGE: "hero-title-large",
  CTA_CONTAINER: "hero-cta-container",
  CTA_TEXT: "hero-cta-text",
  CTA_ARROW: "hero-cta-arrow",
  CTA_UNDERLINE: "hero-cta-underline",

  // statistik cards
  STAT_PELAJAR: "stat-pelajar",
  STAT_PENGAJAR: "stat-pengajar",
  STAT_RUANGAN: "stat-ruangan",
} as const;

export const HEADER_IDS = {
  MENU_MOBILE_BUTTON: "menu-mobile-button",
  BRAND_LOGO: "brand-logo",
} as const;

export type HeroIdKeys = typeof HERO_IDS[keyof typeof HERO_IDS];
export type HeaderIdKeys = typeof HEADER_IDS[keyof typeof HEADER_IDS];
