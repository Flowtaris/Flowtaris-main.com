export interface Industry {
  slug:            string
  name:            string
  label:           string
  title:           string
  titleHighlight:  string
  description:     string
  answerParagraph: string
  challenges:      string[]
  howWeHelp:       string[]
  platforms:       string[]
  metaTitle:       string
  metaDescription: string
}

export const INDUSTRIES: Industry[] = [
  {
    slug:  'technology-saas',
    name:  'Technology & SaaS',
    label: 'Technology & SaaS',
    title: 'ERP and Integration Consulting for',
    titleHighlight: 'Technology Companies.',
    description: 'NetSuite, Coupa and enterprise integrations for high-growth technology and SaaS organizations.',
    answerParagraph: 'Flowtaris helps technology and SaaS companies implement, integrate and optimize the ERP and procurement systems that support rapid growth — from Series B startups scaling their finance operations to enterprise software companies running multi-entity NetSuite environments. We deliver NetSuite implementations, Coupa procurement automation, Workday integrations and finance automation built for the pace and complexity of technology businesses.',
    challenges: [
      'Multi-entity NetSuite environments across subsidiaries',
      'Coupa procurement scaling with headcount growth',
      'Workday to NetSuite payroll journal automation',
      'Revenue recognition complexity in NetSuite',
      'SaaS license and vendor management automation',
      'Fast-moving release cycles requiring agile support',
    ],
    howWeHelp: [
      'NetSuite multi-entity implementation and optimization',
      'Coupa procurement deployment and integration',
      'Workday to NetSuite and Coupa integrations',
      'Finance automation and close acceleration',
      'Ongoing managed ERP support for lean finance teams',
    ],
    platforms: ['NetSuite', 'Coupa', 'Workday', 'Zylo', 'Workato'],
    metaTitle: 'ERP Consulting for Technology & SaaS Companies | Flowtaris',
    metaDescription: 'Flowtaris delivers NetSuite, Coupa and enterprise integration consulting for technology and SaaS companies. From Series B to enterprise scale.',
  },
  {
    slug:  'healthcare',
    name:  'Healthcare',
    label: 'Healthcare',
    title: 'Secure ERP Consulting for',
    titleHighlight: 'Healthcare Organizations.',
    description: 'Audit-ready ERP implementations and integrations for healthcare organizations with strict compliance requirements.',
    answerParagraph: 'Flowtaris delivers ERP consulting and integration services for healthcare organizations that require secure, audit-ready implementations with strict data governance. We implement NetSuite for healthcare finance teams, configure Coupa for healthcare procurement and supply chain workflows, and build integrations that meet the compliance standards healthcare environments demand.',
    challenges: [
      'Compliance-driven ERP configuration requirements',
      'Procurement controls for medical supplies and vendors',
      'Audit-ready finance operations and reporting',
      'Integration between clinical and financial systems',
      'User access governance and data security',
      'Multi-location finance consolidation in NetSuite',
    ],
    howWeHelp: [
      'NetSuite implementation with healthcare compliance controls',
      'Coupa procurement configuration for healthcare supply chains',
      'Audit-ready integration design with full logging',
      'SOX-compliant finance process automation',
      'Managed support for healthcare ERP environments',
    ],
    platforms: ['NetSuite', 'Coupa', 'Workday'],
    metaTitle: 'ERP Consulting for Healthcare Organizations | Flowtaris',
    metaDescription: 'Flowtaris provides secure, audit-ready ERP consulting and integrations for healthcare organizations. NetSuite, Coupa and compliance-first delivery.',
  },
  {
    slug:  'manufacturing',
    name:  'Manufacturing',
    label: 'Manufacturing',
    title: 'ERP and Procurement Consulting for',
    titleHighlight: 'Manufacturing Companies.',
    description: 'NetSuite and Coupa consulting for manufacturing organizations with complex procurement, inventory and finance requirements.',
    answerParagraph: 'Flowtaris delivers ERP and procurement consulting for manufacturing companies managing complex supply chains, multi-site operations and procurement workflows. We implement and optimize NetSuite for manufacturing finance and inventory operations, configure Coupa for procurement and supplier management, and build integrations that connect manufacturing ERP with procurement, HR and finance systems.',
    challenges: [
      'Complex procurement workflows across multiple suppliers',
      'Inventory and cost accounting in NetSuite',
      'Coupa purchase order and goods receipt processes',
      'Multi-site finance consolidation and reporting',
      'ERP and MES system integration requirements',
      'Release management for manufacturing ERP environments',
    ],
    howWeHelp: [
      'NetSuite manufacturing module implementation',
      'Coupa procurement and supplier management setup',
      'Supply chain and ERP integration design',
      'Multi-entity finance consolidation',
      'Ongoing ERP support for manufacturing operations',
    ],
    platforms: ['NetSuite', 'Coupa', 'SAP'],
    metaTitle: 'ERP Consulting for Manufacturing Companies | Flowtaris',
    metaDescription: 'Flowtaris delivers NetSuite and Coupa consulting for manufacturing companies. Complex procurement, inventory and multi-site finance expertise.',
  },
  {
    slug:  'financial-services',
    name:  'Financial Services',
    label: 'Financial Services',
    title: 'Audit-Ready ERP Consulting for',
    titleHighlight: 'Financial Services Firms.',
    description: 'SOX-ready ERP implementations and integrations for private equity, asset management and financial services organizations.',
    answerParagraph: 'Flowtaris provides ERP consulting for financial services organizations — including private equity portfolio companies, asset management firms and financial services businesses — that require SOX-compliant, audit-ready ERP and procurement environments. We implement NetSuite with strong financial controls, configure Coupa for compliant procurement, and deliver integrations that satisfy internal audit and regulatory requirements.',
    challenges: [
      'SOX compliance requirements across ERP and procurement',
      'Multi-entity financial consolidation in NetSuite',
      'Audit trail and controls documentation',
      'Private equity portfolio company ERP standardization',
      'Procurement controls and spend visibility',
      'Integration between portfolio company finance systems',
    ],
    howWeHelp: [
      'SOX-ready NetSuite implementation with audit controls',
      'Coupa procurement with compliance governance',
      'Multi-entity consolidation and intercompany transactions',
      'PE portfolio ERP standardization programs',
      'Audit-ready integration design and documentation',
    ],
    platforms: ['NetSuite', 'Coupa', 'Workday'],
    metaTitle: 'ERP Consulting for Financial Services | Flowtaris',
    metaDescription: 'Flowtaris delivers SOX-ready ERP consulting and integrations for financial services, private equity and asset management organizations.',
  },
  {
    slug:  'professional-services',
    name:  'Professional Services',
    label: 'Professional Services',
    title: 'ERP Consulting for',
    titleHighlight: 'Professional Services Firms.',
    description: 'NetSuite and Coupa consulting for consulting firms, law firms, staffing companies and professional services organizations.',
    answerParagraph: 'Flowtaris delivers ERP and procurement consulting for professional services firms — including management consulting firms, law firms, staffing companies and IT services businesses. We implement NetSuite for project-based billing and finance, configure Coupa for professional services procurement, and build the integrations that connect HR, finance and procurement systems for services businesses.',
    challenges: [
      'Project-based revenue recognition in NetSuite',
      'Contractor and vendor procurement in Coupa',
      'Workforce and finance system integration',
      'Multi-partner or multi-practice finance consolidation',
      'Engagement profitability reporting',
      'Ironclad contract lifecycle management integration',
    ],
    howWeHelp: [
      'NetSuite project accounting and revenue recognition',
      'Coupa procurement for professional services',
      'Ironclad to Coupa contract integration',
      'Workday to NetSuite workforce cost integration',
      'Finance reporting and dashboard customization',
    ],
    platforms: ['NetSuite', 'Coupa', 'Ironclad', 'Workday'],
    metaTitle: 'ERP Consulting for Professional Services Firms | Flowtaris',
    metaDescription: 'Flowtaris delivers NetSuite, Coupa and Ironclad consulting for professional services firms. Project accounting, procurement and workforce integrations.',
  },
]
