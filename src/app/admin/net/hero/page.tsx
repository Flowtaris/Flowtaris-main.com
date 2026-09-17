/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroConfigPage() {
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
      hero: { ...prev.hero, [key]: value }
    }));
  };

  const handleStatChange = (index: number, key: 'val' | 'lbl', value: string) => {
    setData((prev: any) => {
      const newStats = [...prev.hero.stats];
      newStats[index] = { ...newStats[index], [key]: value };
      return {
        ...prev,
        hero: {
          ...prev.hero,
          stats: newStats
        }
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
          <span className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">🖼️</span>
          Hero Configuration
        </h1>
        <p className="text-gray-400 mt-2">Manage the main homepage messaging, statistics, and primary call-to-actions.</p>
      </div>

      {/* Typography section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <span className="text-blue-400">📝</span>
          <h2 className="font-semibold text-white">Hero Messaging</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">H1 Line 1 (Solid Navy)</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
              value={data.hero.h1Line1} onChange={(e) => handleStringChange('h1Line1', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">H1 Line 2 (Gold Italic)</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
              value={data.hero.h1Line2} onChange={(e) => handleStringChange('h1Line2', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">H1 Line 3 (Outlined Stroke)</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
              value={data.hero.h1Line3} onChange={(e) => handleStringChange('h1Line3', e.target.value)} />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Body Text</label>
            <textarea rows={3} className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
              value={data.hero.bodyText} onChange={(e) => handleStringChange('bodyText', e.target.value)} />
          </div>

        </div>
      </div>

      {/* Buttons section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <span className="text-emerald-400">🖱️</span>
          <h2 className="font-semibold text-white">Call To Action Buttons</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-[#1a233a] p-4 rounded-xl border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Primary Button (Navy)</h3>
            <div>
              <label className="block text-[10px] text-gray-500 uppercase mb-1">Text</label>
              <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" 
                value={data.hero.ctaPrimaryText} onChange={(e) => handleStringChange('ctaPrimaryText', e.target.value)} />
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 uppercase mb-1">Link URL</label>
              <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" 
                value={data.hero.ctaPrimaryLink} onChange={(e) => handleStringChange('ctaPrimaryLink', e.target.value)} />
            </div>
          </div>

          <div className="bg-[#1a233a] p-4 rounded-xl border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Secondary Button (White)</h3>
            <div>
              <label className="block text-[10px] text-gray-500 uppercase mb-1">Text</label>
              <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" 
                value={data.hero.ctaSecondaryText} onChange={(e) => handleStringChange('ctaSecondaryText', e.target.value)} />
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 uppercase mb-1">Link URL</label>
              <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" 
                value={data.hero.ctaSecondaryLink} onChange={(e) => handleStringChange('ctaSecondaryLink', e.target.value)} />
            </div>
          </div>

        </div>
      </div>

      {/* Stats section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <span className="text-purple-400">📊</span>
          <h2 className="font-semibold text-white">Hero Statistics</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.hero.stats.map((stat: any, index: number) => (
            <div key={index} className="bg-[#1a233a] p-4 rounded-xl border border-white/5 space-y-3">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Metric Value</label>
                <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-bold focus:border-blue-500 outline-none" 
                  value={stat.val} onChange={(e) => handleStatChange(index, 'val', e.target.value)} />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Metric Label</label>
                <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" 
                  value={stat.lbl} onChange={(e) => handleStatChange(index, 'lbl', e.target.value)} />
              </div>
            </div>
          ))}
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


