import { createClient } from '@supabase/supabase-js'

process.loadEnvFile('.env.local')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Needs service role to bypass RLS

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const posts = [
  {
    title: 'The Future of NetSuite Automations in Enterprise Workflows',
    slug: 'future-netsuite-automations',
    content: 'Discover how modern ERP systems like NetSuite are evolving. Integration patterns, AI driven workflows, and how you can optimize your back-office today.',
    excerpt: 'Explore the next generation of NetSuite capabilities designed to automate the enterprise back-office.',
    topic_cluster: 'Engineering Insights',
    status: 'published',
    tags: ['ERP', 'NetSuite', 'Automation'],
    published_at: new Date().toISOString(),
  },
  {
    title: 'Coupa and SAP: Bridging the Gap for Global Procurement',
    slug: 'coupa-sap-bridging-the-gap',
    content: 'A deep dive into integrating Coupa with SAP S/4HANA for global procurement. Why standard connectors fail and how to build resilient middleware architectures.',
    excerpt: 'How to build resilient integration architectures between Coupa and SAP S/4HANA.',
    topic_cluster: 'Architecture Patterns',
    status: 'published',
    tags: ['Procurement', 'Coupa', 'SAP', 'Integrations'],
    published_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    title: 'Achieving SOX Compliance in Automated FinOps',
    slug: 'sox-compliance-automated-finops',
    content: 'How to maintain strong financial controls and SOX compliance while automating your order-to-cash and procure-to-pay processes.',
    excerpt: 'Maintain financial controls while aggressively automating FinOps processes.',
    topic_cluster: 'Strategy & Compliance',
    status: 'published',
    tags: ['FinOps', 'Compliance', 'Strategy'],
    published_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    title: 'Workday to NetSuite: Payroll Journal Automation',
    slug: 'workday-netsuite-payroll-automation',
    content: 'A technical walkthrough of syncing Workday payroll summaries to NetSuite general ledger via automated middleware, reducing month-end close by days.',
    excerpt: 'Reduce your month-end close by automating payroll journals from Workday to NetSuite.',
    topic_cluster: 'Engineering Insights',
    status: 'published',
    tags: ['Workday', 'NetSuite', 'Integrations'],
    published_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    title: 'Building Resilient Enterprise Architectures',
    slug: 'building-resilient-architectures',
    content: 'Why point-to-point integrations are dead. Implementing hub-and-spoke models using Workato and Make to secure and scale your enterprise data flow.',
    excerpt: 'Move away from point-to-point chaos to scalable hub-and-spoke integration models.',
    topic_cluster: 'Architecture Patterns',
    status: 'published',
    tags: ['Integrations', 'Architecture', 'Strategy'],
    published_at: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
]

async function seed() {
  console.log('Fetching first user to use as author...')
  const { data: users, error: userError } = await supabase.auth.admin.listUsers()
  
  if (userError) {
    console.error('Error fetching users:', userError)
  }
  
  let authorId = null
  if (users && users.users.length > 0) {
    authorId = users.users[0].id
  }

  const postsWithAuthor = posts.map(p => ({
    ...p,
    author_id: authorId
  }))

  console.log('Seeding blog posts...')
  const { error } = await supabase
    .from('blog_posts')
    .upsert(postsWithAuthor, { onConflict: 'slug' })

  if (error) {
    console.error('Error seeding blog posts:', error)
  } else {
    console.log('✅ Successfully seeded 5 blog posts!')
  }
}

seed()
