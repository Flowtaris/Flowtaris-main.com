// Stub: exports only the DEFAULT_COI_CONFIG used by admin/ai/coi-config
export const DEFAULT_COI_CONFIG = {
  shutdown: false,
  defaultValues: {
    platform: 'NetSuite',
    useCase: 'ap-automation',
    annualVolume: 60000,
    avgManualHours: 15,
    hourlyCost: 45,
    errorRate: 3,
    competitivePressure: 'medium' as 'low' | 'medium' | 'high',
    complianceRequirements: 'basic' as 'none' | 'basic' | 'strict',
    monthsDelay: 6,
  },
  platforms: [
    { value: 'NetSuite', label: 'NetSuite' },
    { value: 'Coupa', label: 'Coupa' },
    { value: 'SAP', label: 'SAP' },
    { value: 'Workday', label: 'Workday' },
    { value: 'Default', label: 'Other ERP' },
  ],
  rightSide: {
    executiveSynthesis: { heading: 'Executive Synthesis', badge: 'Diagnostic Projection Engine', template: '' },
    mainHeader: { eyebrow: 'Projected 3-Year Financial Leakage', subtext: '', disclaimer: '' },
    breakdown: {
      heading: 'Component Breakdown',
      monthlyLeakage: { title: 'Monthly Leakage', subtitle: '', description: '' },
      annualRisk: { title: 'Annual Risk', subtitle: '', description: '' },
      competitiveGap: { title: 'Competitive Gap', subtitle: '', description: '' },
    },
    costOfDelay: { heading: 'Scenario: The Cost of Delay', subtext: '', sunkCostLabel: '', sunkCostSubtext: '' },
    cta: { heading: 'Transition from Projection to Execution', subtext: '', buttonText: 'Book Technical Review' },
  },
}