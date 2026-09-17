/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/no-unescaped-entities */
import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f1523] text-gray-100 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
          <div>
            <Link href="/admin/net" className="text-2xl font-black tracking-tight text-white hover:text-blue-400 transition-colors">
              Admin Dashboard
            </Link>
          </div>
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}


