/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeaderConfigPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/net-cms")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  const handleStringChange = (key: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      header: { ...prev.header, [key]: value }
    }));
  };

  const handleNavLinkChange = (index: number, key: 'label' | 'href', value: string) => {
    setData((prev: any) => {
      const newLinks = [...prev.header.navLinks];
      newLinks[index] = { ...newLinks[index], [key]: value };
      return {
        ...prev,
        header: { ...prev.header, navLinks: newLinks }
      };
    });
  };

  const addNavLink = () => {
    setData((prev: any) => ({
      ...prev,
      header: {
        ...prev.header,
        navLinks: [...prev.header.navLinks, { label: "New Link", href: "#" }]
      }
    }));
  };

  const removeNavLink = (index: number) => {
    setData((prev: any) => {
      const newLinks = [...prev.header.navLinks];
      newLinks.splice(index, 1);
      return {
        ...prev,
        header: { ...prev.header, navLinks: newLinks }
      };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/net-cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (e) {
      alert("Failed to save.");
    }
    setSaving(false);
  };

  if (loading || !data) return <div className="text-gray-400">Loading configuration...</div>;

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="mb-8">
        <Link href="/admin/net" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 mb-4">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <span className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">⚙️</span>
          Header Configuration
        </h1>
        <p className="text-gray-400 mt-2">Manage the top navigation bar, logo text, and primary engagement button.</p>
      </div>

      {/* Brand Identity section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <span className="text-yellow-400">✨</span>
          <h2 className="font-semibold text-white">Brand Identity</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Main Logo Text</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
              value={data.header.logoText} onChange={(e) => handleStringChange('logoText', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sub Logo Text</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
              value={data.header.logoSubText} onChange={(e) => handleStringChange('logoSubText', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Logo Tagline</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
              value={data.header.logoTagline} onChange={(e) => handleStringChange('logoTagline', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Nav & Action section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <span className="text-emerald-400">🚀</span>
          <h2 className="font-semibold text-white">Navigation & Actions</h2>
        </div>
        <div className="p-6">
          
          <div className="space-y-6 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Status Chip Label</label>
              <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
                value={data.header.statusChip} onChange={(e) => handleStringChange('statusChip', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">CTA Button Text</label>
              <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
                value={data.header.ctaText} onChange={(e) => handleStringChange('ctaText', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">CTA Button Link</label>
              <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
                value={data.header.ctaLink} onChange={(e) => handleStringChange('ctaLink', e.target.value)} />
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Links section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">🔗</span>
            <h2 className="font-semibold text-white">Navigation Links</h2>
          </div>
          <button 
            onClick={addNavLink}
            className="px-4 py-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 hover:text-emerald-300 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
          >
            <span>+</span> Add New Link
          </button>
        </div>
        <div className="p-6 space-y-4">
          {data.header.navLinks.map((link: any, idx: number) => (
            <div key={idx} className="bg-[#1a233a] p-4 rounded-xl border border-white/5 relative group flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Label</label>
                <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
                  value={link.label} onChange={(e) => handleNavLinkChange(idx, 'label', e.target.value)} />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">URL (href)</label>
                <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors font-mono" 
                  value={link.href} onChange={(e) => handleNavLinkChange(idx, 'href', e.target.value)} />
              </div>
              <button 
                onClick={() => removeNavLink(idx)}
                className="mt-4 md:mt-5 p-2 bg-red-500/10 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                title="Delete this link"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          ))}
          {data.header.navLinks.length === 0 && (
            <div className="text-center py-6 text-gray-500 text-sm">No navigation links configured.</div>
          )}
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a1128]/80 backdrop-blur-xl border-t border-white/10 p-4 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-2">
          <p className="text-sm text-gray-400">Changes take effect on the live site immediately after saving.</p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? "Saving..." : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                Save Configuration
              </>
            )}
          </button>
        </div>
      </div>
      
    </div>
  );
}


