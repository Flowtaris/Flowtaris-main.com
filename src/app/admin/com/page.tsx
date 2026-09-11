import Link from "next/link"

const sections = [
  { label: "Hero", href: "/admin/com/hero", desc: "Main hero banner" },
  { label: "About", href: "/admin/com/about", desc: "About page content" },
  { label: "Services", href: "/admin/com/services", desc: "Service listings" },
  { label: "Blog", href: "/admin/com/blog", desc: "Blog posts" },
  { label: "Blog Categories", href: "/admin/com/blog-categories", desc: "Blog categories" },
  { label: "Case Studies", href: "/admin/com/case-studies", desc: "Case study entries" },
  { label: "Testimonials", href: "/admin/com/testimonials", desc: "Client testimonials" },
  { label: "FAQs", href: "/admin/com/faqs", desc: "Frequently asked questions" },
  { label: "Careers", href: "/admin/com/careers", desc: "Job openings" },
  { label: "Job Applications", href: "/admin/com/job-applications", desc: "View applicants" },
  { label: "Leads", href: "/admin/com/leads", desc: "Contact form leads" },
  { label: "Integrations", href: "/admin/com/integrations", desc: "Third-party integrations" },
  { label: "Technologies", href: "/admin/com/technologies", desc: "Tech stack display" },
  { label: "Management Capabilities", href: "/admin/com/management-capabilities", desc: "Capability matrix" },
  { label: "Why Choose Us", href: "/admin/com/why-choose-us", desc: "Value propositions" },
  { label: "Settings", href: "/admin/com/settings", desc: "Site settings" },
]

export default function ComDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", padding: "40px 32px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <Link href="/admin" style={{ fontSize: 13, color: "#2563EB", textDecoration: "none", fontWeight: 500 }}>
            ? Back to Hub
          </Link>
        </div>
        <div style={{ marginBottom: 32 }}>
          <span style={{ background: "#DBEAFE", color: "#1D4ED8", fontSize: 11, fontWeight: 700, borderRadius: 4, padding: "4px 10px", letterSpacing: "0.1em" }}>PRIMARY</span>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: "#0F172A", marginTop: 8, marginBottom: 6 }}>Flowtaris.com Admin</h1>
          <p style={{ color: "#64748B", fontSize: 14 }}>Edit all sections of the main Flowtaris commercial website.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {sections.map(s => (
            <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
              <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #E2E8F0", padding: "20px 22px", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div style={{ fontWeight: 600, color: "#0F172A", fontSize: 15, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: "#94A3B8" }}>{s.desc}</div>
                <div style={{ marginTop: 12, fontSize: 12, fontWeight: 600, color: "#2563EB" }}>Edit ?</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
