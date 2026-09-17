/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/no-unescaped-entities */
import Link from 'next/link';

export default function AdminDashboard() {
  const cards = [
    {
      title: "Header Config",
      desc: "Manage logo text, status chip, and top navigation links",
      href: "/admin/net/header",
      icon: "⚙️"
    },
    {
      title: "Hero Config",
      desc: "Manage the main landing text, typography, stats, and primary buttons",
      href: "/admin/net/hero",
      icon: "🖼️"
    },
    {
      title: "Footer Config",
      desc: "Manage footer link arrays, contact button, and ecosystem links",
      href: "/admin/net/footer",
      icon: "📑"
    },
    {
      title: "Performance Config",
      desc: "Manage the telemetry section, DORA metrics arrays, and uptime highlights",
      href: "/admin/net/performance",
      icon: "⚡"
    },
    {
      title: "FAQ Config",
      desc: "Manage the Technical Knowledge Base questions and answers",
      href: "/admin/net/faq",
      icon: "❓"
    },
    {
      title: "Transparency Config",
      desc: "Manage the 'Real Dashboards. Real Data.' section, images, and stats",
      href: "/admin/net/transparency",
      icon: "👁️"
    },
    {
      title: "Standard Config",
      desc: "Manage the 'Engineering Over Marketing' section and feature cards",
      href: "/admin/net/standard",
      icon: "⚙️"
    },
    {
      title: "Bottom CTA Config",
      desc: "Manage the final 'Ready to Build' Call to Action section",
      href: "/admin/net/cta",
      icon: "🎯"
    },
    {
      title: "Compliance Config",
      desc: "Manage the Compliance Vault: Hero, Philosophy, Hard Facts, FAQs, and Live Telemetry",
      href: "/admin/net/compliance-vault",
      icon: "🛡️"
    },
    {
      title: "ROI Ledger Config",
      desc: "Manage the CFO Financial Narrative, TCO Metrics, and Procurement FAQs",
      href: "/admin/net/roi-ledger",
      icon: "📈"
    },
    {
      title: "Delivery Config",
      desc: "Manage the Enforcement Pipeline, Manifesto, and SLA Guarantees",
      href: "/admin/net/delivery-standards",
      icon: "⚙️"
    },
    {
      title: "Observatory Config",
      desc: "Manage the Telemetry Grid, Metrics, and Tracing FAQs",
      href: "/admin/net/integration-observatory",
      icon: "📡"
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold mb-6 text-white/90">Site Configuration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link href={card.href} key={card.title} className="group block">
            <div className="bg-[#151c2f] border border-white/5 rounded-2xl p-6 h-full transition-all duration-300 hover:bg-[#1a233a] hover:border-white/10 hover:shadow-lg hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-100 group-hover:text-blue-400 transition-colors">{card.title}</h3>
                <span className="text-xl opacity-60 grayscale group-hover:grayscale-0 transition-all">{card.icon}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {card.desc}
              </p>
              <div className="mt-6 flex items-center">
                <div className="w-6 h-4 flex items-center justify-start opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-400"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


