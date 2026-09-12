import type { Metadata } from 'next'
import { organizationSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Our Team  Flowtaris ERP Consultants',
  description: 'Meet the certified ERP architects and Big 4 alumni driving Flowtaris implementations across NetSuite, Coupa, SAP, and Workday.'
}

export default function TeamPage() {
  const employees = [
    { name: 'Sarah Jenkins', role: 'Principal NetSuite Architect', bio: 'Former Big 4 Director with 15+ years of SuiteScript 2.x experience.' },
    { name: 'David Chen', role: 'Lead Coupa Integration Specialist', bio: 'Specializes in complex BSM deployments and cXML supplier enablement.' },
    { name: 'Marcus Adebayo', role: 'Head of Data Architecture', bio: 'Expert in Boomi and Celigo iPaaS pipelines across Fortune 500 ecosystems.' }
  ]

  const schema = {
    ...organizationSchema(),
    employee: employees.map(emp => ({
      "@type": "Person",
      "name": emp.name,
      "jobTitle": emp.role
    }))
  }

  return (
    <main className="bg-[#FAFAFA] min-h-screen font-sans text-slate-800 pb-20 pt-32 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>Our Team</h1>
        <p className="text-xl text-slate-600 mb-16 font-light max-w-2xl">Meet the certified ERP architects and Big 4 alumni driving Flowtaris implementations across NetSuite, Coupa, SAP, and Workday.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {employees.map((emp, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-slate-200 rounded-full mb-6"></div>
              <h3 className="text-2xl font-bold text-[#0A1628] mb-2">{emp.name}</h3>
              <p className="text-[#E8A020] font-semibold mb-4">{emp.role}</p>
              <p className="text-slate-600 font-light leading-relaxed">{emp.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
