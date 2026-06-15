export const FALLBACK_STUDIES = [
  {
    slug: 'global-retailer-netsuite-migration',
    title: 'Global Retailer Achieves 40% Faster Financial Close with NetSuite',
    platforms: ['NetSuite', 'Celigo'],
    services: ['NetSuite Consulting'],
    industries: ['Retail'],
    outcome_summary:
      'Seamlessly migrated legacy financial data to NetSuite, implementing automated reconciliation pipelines that cut financial close time by 40%.',
    client_situation:
      'A global retail group operating across 14 markets was running a legacy on-premise ERP that required 22 days to close its books each month. Manual reconciliation between the legacy system and multiple regional ledgers caused significant audit risk and data discrepancies.',
    solution_approach:
      'Flowtaris led a full NetSuite implementation with custom SuiteScript 2.0 reconciliation automation. We designed a Celigo integration hub to synchronise regional POS systems in real-time, eliminating manual journal entry for inter-company eliminations.',
    metrics: [
      { label: 'Reduction in Close Time', value: '40', unit: '%' },
      { label: 'Manual Journal Entries Eliminated', value: '1,200', unit: '/mo' },
      { label: 'Audit Findings Reduced', value: '0', unit: ' critical' },
    ],
    is_featured: true,
    cover_image_url: null,
    published_at: '2024-01-15',
    meta_title: 'Global Retailer Achieves 40% Faster Financial Close | Flowtaris Case Study',
    meta_description: 'How Flowtaris helped a global retailer cut financial close time by 40% with a full NetSuite migration and Celigo integration.',
  },
  {
    slug: 'fintech-sap-integration',
    title: 'FinTech Unicorn Scales Operations with SAP & Workday Integration',
    platforms: ['SAP', 'Workday'],
    services: ['ERP Integrations', 'SAP & Workday'],
    industries: ['Financial Services'],
    outcome_summary:
      'Architected a bi-directional, event-driven integration ensuring sub-second data consistency across global teams.',
    client_situation:
      'A high-growth FinTech unicorn with 3,000 employees across 8 countries was managing payroll and headcount data manually between Workday HCM and SAP S/4HANA. Month-end reconciliation took 5 days and was error-prone, creating payroll audit risk.',
    solution_approach:
      'Flowtaris designed and deployed a MuleSoft-based event-driven integration layer that streams Workday headcount events to SAP in real-time. Cost centre provisioning, payroll journal posting and headcount reporting are now fully automated.',
    metrics: [
      { label: 'Data Accuracy Improved', value: '99.9', unit: '%' },
      { label: 'Payroll Reconciliation Time', value: '5 days', unit: ' → 2 hrs' },
      { label: 'Manual Interventions/Month', value: '0', unit: '' },
    ],
    is_featured: true,
    cover_image_url: null,
    published_at: '2024-03-22',
    meta_title: 'FinTech Unicorn Scales with SAP & Workday Integration | Flowtaris Case Study',
    meta_description: 'How Flowtaris architected a bi-directional SAP and Workday integration achieving 99.9% data accuracy for a FinTech unicorn.',
  },
  {
    slug: 'manufacturing-coupa-deployment',
    title: 'Enterprise Manufacturing Streamlines Procurement via Coupa',
    platforms: ['Coupa', 'Oracle ERP'],
    services: ['Coupa Consulting'],
    industries: ['Manufacturing'],
    outcome_summary:
      'Deployed a comprehensive Procure-to-Pay solution with automated approval workflows and spend analytics.',
    client_situation:
      'A $1.5B enterprise manufacturer operated procurement across 6 plants using spreadsheet-based PO approvals and paper invoices. Maverick spend was uncontrolled and supplier onboarding took an average of 45 days.',
    solution_approach:
      'Flowtaris executed a full Coupa Procure-to-Pay deployment, building customised approval chains per business unit, automated three-way matching, and a self-service supplier portal. The Oracle ERP integration was built using Coupa Open Business Network connectors.',
    metrics: [
      { label: 'Cost Savings Identified', value: '$12', unit: 'M' },
      { label: 'Supplier Onboarding Time', value: '45 days', unit: ' → 3 days' },
      { label: 'Invoice Processing Cost', value: '70', unit: '% reduction' },
    ],
    is_featured: false,
    cover_image_url: null,
    published_at: '2024-05-10',
    meta_title: 'Enterprise Manufacturing Streamlines Procurement via Coupa | Flowtaris Case Study',
    meta_description: 'How Flowtaris deployed a full Coupa Procure-to-Pay solution for an enterprise manufacturer, identifying $12M in savings.',
  },
]
