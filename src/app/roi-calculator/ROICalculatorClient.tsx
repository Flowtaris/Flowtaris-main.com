// Stub: exports only the DEFAULT_ROI_CONFIG used by admin/ai/roi-config
export const DEFAULT_ROI_CONFIG = {
  shutdown: false,
  tickerPrefix: 'Live Market Benchmarks',
  tickerItems: [
    'Avg AP Cost: $14.20/invoice',
    'Flowtaris Target: $1.15/invoice',
    'Industry Error Rate: 4.8%',
    'Flowtaris Confidence Score: 99.4%',
  ],
  platforms: ['NetSuite', 'SAP', 'Coupa', 'Workday', 'Salesforce'],
  useCases: [
    { id: 'ap-automation', label: 'AP Automation & Invoicing' },
    { id: 'po-matching', label: 'PO Reconciliation' },
    { id: 'expense-audit', label: 'Expense & Audit' },
  ],
  dropdownLabels: { platform: 'Enterprise Platform', useCase: 'Primary Focus', scale: 'Scale (Volume & Headcount)' },
  breakdownLabels: { title: 'Cost of Inaction Breakdown', subtitle: '', manual: 'Manual Labor', error: 'Error Rework', attrition: 'Team Attrition', compliance: 'Compliance Risk' },
  projectionLabels: { title: '3-Year Projection', subtitle: '', tas: 'Total Addressable Spend', y1: 'Year 1', y2: 'Year 2', y3: 'Year 3' },
  metricLabels: { savings: 'Net Annual Savings', payback: 'Payback Period', capacity: 'FTE Capacity Freed', ctaText: 'Export Business Case', ctaLoading: 'Generating Report...', success: 'Report Sent to Inbox!' },
}