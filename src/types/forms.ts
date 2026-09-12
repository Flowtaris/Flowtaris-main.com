/** Form submission status */
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

/** Generic form field definition */
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'multiselect' | 'radio'
  placeholder?: string
  required?: boolean
  options?: Array<{ label: string; value: string }>
}

/** Form submission result */
export interface FormResult {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

/** Platform options for forms */
export const PLATFORM_OPTIONS = [
  { label: 'NetSuite', value: 'netsuite' },
  { label: 'Coupa', value: 'coupa' },
  { label: 'SAP', value: 'sap' },
  { label: 'Workday', value: 'workday' },
  { label: 'Ironclad', value: 'ironclad' },
  { label: 'Workato', value: 'workato' },
  { label: 'Make', value: 'make' },
  { label: 'Salesforce', value: 'salesforce' },
  { label: 'Zylo', value: 'zylo' },
  { label: 'Other', value: 'other' },
] as const

/** Service options for forms */
export const SERVICE_OPTIONS = [
  { label: 'ERP Implementation', value: 'erp-implementation' },
  { label: 'System Integration', value: 'system-integration' },
  { label: 'Process Automation', value: 'process-automation' },
  { label: 'Managed Support', value: 'managed-support' },
  { label: 'ERP Consulting', value: 'erp-consulting' },
  { label: 'Data Migration', value: 'data-migration' },
  { label: 'Custom Development', value: 'custom-development' },
  { label: 'Other', value: 'other' },
] as const

/** Timeline options for forms */
export const TIMELINE_OPTIONS = [
  { label: 'Immediate (< 1 month)', value: 'immediate' },
  { label: 'Short-term (13 months)', value: 'short-term' },
  { label: 'Medium-term (36 months)', value: 'medium-term' },
  { label: 'Long-term (6+ months)', value: 'long-term' },
  { label: 'Just exploring', value: 'exploring' },
] as const

/** Budget range options */
export const BUDGET_OPTIONS = [
  { label: 'Under $25,000', value: 'under-25k' },
  { label: '$25,000  $50,000', value: '25k-50k' },
  { label: '$50,000  $100,000', value: '50k-100k' },
  { label: '$100,000  $250,000', value: '100k-250k' },
  { label: '$250,000+', value: '250k-plus' },
  { label: 'Not sure yet', value: 'not-sure' },
] as const
