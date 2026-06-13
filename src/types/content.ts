export type BlogPost = any;
export type CaseStudy = any;
export type Resource = any;
export type FAQ = any;

/** Blog post with computed fields */
export interface BlogPostWithMeta extends BlogPost {
  author?: {
    full_name: string | null
    avatar_url: string | null
  }
}

/** Case study metric structure */
export interface CaseStudyMetric {
  label: string
  value: string
  suffix?: string
  description?: string
}

/** Case study with parsed metrics */
export interface CaseStudyWithMetrics extends CaseStudy {
  parsedMetrics?: CaseStudyMetric[]
}

/** Topic cluster for blog filtering */
export type TopicCluster =
  | 'NetSuite'
  | 'Coupa'
  | 'SAP'
  | 'Workday'
  | 'Integrations'
  | 'Automation'
  | 'Strategy'
  | 'Governance'

/** Platform identifiers */
export type Platform =
  | 'NetSuite'
  | 'Coupa'
  | 'SAP'
  | 'Workday'
  | 'Ironclad'
  | 'Workato'
  | 'Make'
  | 'Salesforce'
  | 'Zylo'

/** Industry identifiers */
export type Industry =
  | 'Technology & SaaS'
  | 'Healthcare'
  | 'Manufacturing'
  | 'Financial Services'
  | 'Professional Services'

/** Service identifiers */
export type ServiceType =
  | 'NetSuite Consulting'
  | 'Coupa Consulting'
  | 'ERP Integrations'
  | 'Managed Support'
  | 'AI & Automation'
  | 'SAP & Workday'

/** Navigation item structure */
export interface NavItem {
  label: string
  href: string
  description?: string
  children?: NavItem[]
  isExternal?: boolean
}
