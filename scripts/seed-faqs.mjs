import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const faqs = [
  // Coupa to NetSuite FAQs
  {
    page_slug: '/services/erp-integrations/coupa-to-netsuite',
    question: 'What data flows from Coupa to NetSuite?',
    answer: 'The Coupa to NetSuite integration typically flows approved purchase orders, vendor bills, invoice data, supplier information, cost center allocations and GL coding from Coupa into NetSuite as vendor bills and journal entries.',
    include_in_schema: true,
    display_order: 1,
    is_published: true
  },
  {
    page_slug: '/services/erp-integrations/coupa-to-netsuite',
    question: 'How long does the Coupa to NetSuite integration take to implement?',
    answer: 'A standard Coupa to NetSuite integration typically takes 4 to 6 weeks from discovery to production. Timeline depends on the complexity of GL mapping, multi-entity requirements and approval workflow design.',
    include_in_schema: true,
    display_order: 2,
    is_published: true
  },
  {
    page_slug: '/services/erp-integrations/coupa-to-netsuite',
    question: 'Is the Coupa to NetSuite integration SOX compliant?',
    answer: 'Yes. Flowtaris designs the Coupa to NetSuite integration with SOX compliance in mind, including audit trail logging, data validation controls, error records and documentation that satisfies internal audit requirements.',
    include_in_schema: true,
    display_order: 3,
    is_published: true
  },
  
  // Workday to NetSuite FAQs
  {
    page_slug: '/services/erp-integrations/workday-to-netsuite',
    question: 'What does the Workday to NetSuite payroll integration do?',
    answer: 'The Workday to NetSuite integration extracts payroll run data from Workday after each pay cycle and automatically creates structured journal entries in NetSuite with cost center allocation, department mapping and currency handling.',
    include_in_schema: true,
    display_order: 1,
    is_published: true
  },
  {
    page_slug: '/services/erp-integrations/workday-to-netsuite',
    question: 'How much manual effort does this integration eliminate?',
    answer: 'Organizations typically eliminate 3 to 6 hours of manual payroll journal entry work per pay cycle, along with the reconciliation effort required to verify manually entered data.',
    include_in_schema: true,
    display_order: 2,
    is_published: true
  },
  {
    page_slug: '/services/erp-integrations/workday-to-netsuite',
    question: 'Does Flowtaris support multi-entity or multi-currency payroll journals?',
    answer: 'Yes. The Workday to NetSuite integration supports multi-entity environments and multi-currency payroll runs, with proper NetSuite subsidiary and currency handling built into the integration architecture.',
    include_in_schema: true,
    display_order: 3,
    is_published: true
  },

  // Coupa to SAP FAQs
  {
    page_slug: '/services/erp-integrations/coupa-to-sap',
    question: 'What does the Coupa to SAP S/4HANA integration cover?',
    answer: 'The Coupa to SAP integration synchronizes purchase orders, invoice data, vendor master records, cost objects and GL account assignments between Coupa and SAP S/4HANA, automating the procurement-to-pay process.',
    include_in_schema: true,
    display_order: 1,
    is_published: true
  },
  {
    page_slug: '/services/erp-integrations/coupa-to-sap',
    question: 'How does Flowtaris handle SAP IDocs in the integration?',
    answer: 'Flowtaris builds the integration to generate and process SAP IDocs correctly for PO creation, invoice posting and goods receipt matching, with full error handling for IDoc failures and reprocessing workflows.',
    include_in_schema: true,
    display_order: 2,
    is_published: true
  },
  {
    page_slug: '/services/erp-integrations/coupa-to-sap',
    question: 'Can this integration support multi-company code SAP environments?',
    answer: 'Yes. The Coupa to SAP integration can be designed to support multiple SAP company codes with appropriate routing logic, cost object mapping and entity-specific GL configuration.',
    include_in_schema: true,
    display_order: 3,
    is_published: true
  },

  // Ironclad to Coupa FAQs
  {
    page_slug: '/services/erp-integrations/ironclad-to-coupa',
    question: 'What triggers the Ironclad to Coupa integration?',
    answer: 'The integration is typically triggered by contract execution events in Ironclad \u2014 when a contract reaches a specific workflow stage, it automatically initiates supplier onboarding or procurement record creation in Coupa.',
    include_in_schema: true,
    display_order: 1,
    is_published: true
  },
  {
    page_slug: '/services/erp-integrations/ironclad-to-coupa',
    question: 'What data flows between Ironclad and Coupa?',
    answer: 'Contract metadata, supplier information, executed contract attachments, contract value, effective dates and approval status flow from Ironclad into Coupa procurement records, eliminating manual data re-entry.',
    include_in_schema: true,
    display_order: 2,
    is_published: true
  },
  {
    page_slug: '/services/erp-integrations/ironclad-to-coupa',
    question: 'How does this integration reduce supplier onboarding time?',
    answer: 'By automating the handoff from signed contract in Ironclad to supplier setup in Coupa, organizations eliminate the manual steps that previously delayed supplier activation by days or weeks after contract execution.',
    include_in_schema: true,
    display_order: 3,
    is_published: true
  }
]

async function run() {
  const { error } = await supabase.from('faqs').insert(faqs)
  if (error) {
    console.error('Error inserting FAQs:', error)
  } else {
    console.log('FAQs successfully inserted.')
  }
}

run()
