export type Service = {
  id: string;
  name: string;
  slug: string;
  priority: number;
  created_at: string;
  updated_at: string;
};

export type SiteSetting = {
  key: string;
  value: string;
  updated_at: string;
};

export type SocialLink = {
  id: string;
  platform_name: string;
  url: string;
  priority: number;
  created_at: string;
  updated_at: string;
};

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
  created_at: string;
  updated_at: string;
};

export type ModernTechnology = {
  id: string;
  name?: string;
  logo_url: string;
  priority: number;
  created_at: string;
  updated_at: string;
};

export type ServicesHero = {
  id: string;
  service_id: string;
  hero_description: string;
  normal_description: string | null;
  color: string;
  created_at: string;
  updated_at: string;
};

export type ServicesWhyChoose = {
  id: string;
  service_id: string;
  main_description: string;
  small_description: string | null;
  created_at: string;
  updated_at: string;
};

export type ServicesBusinessSuiteMain = {
  id: string;
  service_id: string;
  small_description: string | null;
  created_at: string;
  updated_at: string;
};

export type ServicesBusinessSuiteItem = {
  id: string;
  service_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type ServicesErpArchitectureMain = {
  id: string;
  service_id: string;
  small_description: string | null;
  created_at: string;
  updated_at: string;
};

export type ServicesErpArchitectureCard = {
  id: string;
  service_id: string;
  title: string;
  description: string | null;
  tags: string[];
  priority: number;
  created_at: string;
  updated_at: string;
};

export type ServicesDeepModule = {
  id: string;
  service_id: string;
  title: string;
  small_description: string | null;
  created_at: string;
  updated_at: string;
};

export type WhyChooseUsSector = {
  id: string;
  name: string;
  priority: number;
  created_at: string;
  updated_at: string;
};

export type WhyChooseUsCard = {
  id: string;
  sector_id: string | null;
  description: string;
  small_description: string | null;
  image_url: string | null;
  priority: number;
  created_at: string;
  updated_at: string;
};

export type Integration = {
  id: string;
  name: string;
  slug: string;
  svg_slot_1: string | null;
  svg_slot_2: string | null;
  priority: number;
  created_at: string;
  updated_at: string;
};

export type IntegrationsHero = {
  id: string;
  integration_id: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type IntegrationsSecurityPrecisionMain = {
  id: string;
  integration_id: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type IntegrationsSecurityPrecisionCard = {
  id: string;
  integration_id: string;
  svg: string | null;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type IntegrationsExecutionTrace = {
  id: string;
  integration_id: string;
  description: string | null;
  card_title: string | null;
  code_snippet: string | null;
  created_at: string;
  updated_at: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type CaseStudiesHero = {
  id: string;
  case_study_id: string;
  hero_title: string;
  hero_description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type CaseStudiesIndustry = {
  id: string;
  case_study_id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type CaseStudiesSolution = {
  id: string;
  case_study_id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type CaseStudiesTechStack = {
  id: string;
  case_study_id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type CaseStudiesTopic = {
  id: string;
  case_study_id: string;
  topic: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type AboutHero = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type AboutTopic = {
  id: string;
  topic: string;
  descriptions: string[];
  created_at: string;
  updated_at: string;
};

export type Blog = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type BlogHero = {
  id: string;
  blog_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  publication_date: string | null;
  author_name: string | null;
  author_designation: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogTopic = {
  id: string;
  blog_id: string;
  title: string;
  description: string | null;
  sub_descriptions: string[] | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type BlogFaq = {
  id: string;
  blog_id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  form_type: string;
  name: string;
  company: string | null;
  work_email: string;
  platform: string | null;
  service_needed: string | null;
  project_timeline: string | null;
  team_size: string | null;
  business_challenge: string | null;
  current_challenge: string | null;
  desired_outcome: string | null;
  question: string | null;
  preferred_contact: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};
