export type GlobalHero = {
  id: string;
  main_description: string;
  small_description: string | null;
  created_at: string;
  updated_at: string;
};

export type GlobalHeroImage = {
  id: string;
  hero_id: string;
  image_url: string;
  topic: string;
  small_description: string | null;
  created_at: string;
  updated_at: string;
};

export type ModernTechnology = {
  id: string;
  logo_url: string;
  priority: number;
  created_at: string;
  updated_at: string;
};

export type ServicesHero = {
  id: string;
  hero_description: string;
  normal_description: string | null;
  created_at: string;
  updated_at: string;
};

export type ServicesWhyChoose = {
  id: string;
  main_description: string;
  small_description: string | null;
  created_at: string;
  updated_at: string;
};

export type ServicesBusinessSuiteMain = {
  id: string;
  small_description: string | null;
  created_at: string;
  updated_at: string;
};

export type ServicesBusinessSuiteItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type ServicesErpArchitectureMain = {
  id: string;
  small_description: string | null;
  created_at: string;
  updated_at: string;
};

export type ServicesErpArchitectureCard = {
  id: string;
  title: string;
  description: string | null;
  tags: string[];
  priority: number;
  created_at: string;
  updated_at: string;
};

export type ServicesDeepModule = {
  id: string;
  title: string;
  small_description: string | null;
  created_at: string;
  updated_at: string;
};

export type WhyChooseUsCard = {
  id: string;
  description: string;
  small_description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Integration = {
  id: string;
  name: string;
  svg_slot_1: string | null;
  svg_slot_2: string | null;
  created_at: string;
  updated_at: string;
};
