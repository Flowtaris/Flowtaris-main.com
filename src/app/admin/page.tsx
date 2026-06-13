import Link from 'next/link'
import { LayoutDashboard, Users, Link as LinkIcon, Database } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
          Dashboard Overview
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your Flowtaris web presence content from here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Integrations Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center mb-4">
            <LinkIcon className="w-6 h-6 text-navy-600" />
          </div>
          <h3 className="font-semibold text-navy-900 text-lg mb-2">Integrations</h3>
          <p className="text-slate-500 text-sm mb-6 flex-1">
            Manage the integrations shown on the platform. Edit names and SVG icons.
          </p>
          <Link href="/admin/integrations" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Manage Integrations →
          </Link>
        </div>

        {/* Services Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center mb-4">
            <Database className="w-6 h-6 text-navy-600" />
          </div>
          <h3 className="font-semibold text-navy-900 text-lg mb-2">Services Content</h3>
          <p className="text-slate-500 text-sm mb-6 flex-1">
            Update Services sections, including the ERP Architecture and Deep Module cards.
          </p>
          <Link href="/admin/services" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Manage Services →
          </Link>
        </div>

        {/* Home & General Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center mb-4">
            <LayoutDashboard className="w-6 h-6 text-navy-600" />
          </div>
          <h3 className="font-semibold text-navy-900 text-lg mb-2">Homepage & Hero</h3>
          <p className="text-slate-500 text-sm mb-6 flex-1">
            Edit the global hero text, images, and modern technologies priority.
          </p>
          <div className="flex gap-4">
            <Link href="/admin/hero" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Manage Hero →
            </Link>
            <Link href="/admin/technologies" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Manage Tech →
            </Link>
          </div>
        </div>

        {/* Why Choose Us Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-navy-600" />
          </div>
          <h3 className="font-semibold text-navy-900 text-lg mb-2">Why Choose Us</h3>
          <p className="text-slate-500 text-sm mb-6 flex-1">
            Add or edit the dynamic cards in the Why Choose Us section.
          </p>
          <Link href="/admin/why-choose-us" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Manage Cards →
          </Link>
        </div>
      </div>
    </div>
  )
}
