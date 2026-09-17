/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TransparencyConfigPage() {
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
      transparencySection: { ...prev.transparencySection, [key]: value }
    }));
  };

  const handleImageChange = (key: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      transparencySection: {
        ...prev.transparencySection,
        images: { ...prev.transparencySection.images, [key]: value }
      }
    }));
  };

  const handleStatChange = (index: number, key: 'value' | 'label', value: string) => {
    setData((prev: any) => {
      const newStats = [...prev.transparencySection.stats];
      newStats[index] = { ...newStats[index], [key]: value };
      return {
        ...prev,
        transparencySection: { ...prev.transparencySection, stats: newStats }
      };
    });
  };

  const addStat = () => {
    setData((prev: any) => ({
      ...prev,
      transparencySection: {
        ...prev.transparencySection,
        stats: [...prev.transparencySection.stats, { value: "0", label: "New Stat" }]
      }
    }));
  };

  const removeStat = (index: number) => {
    setData((prev: any) => {
      const newStats = [...prev.transparencySection.stats];
      newStats.splice(index, 1);
      return {
        ...prev,
        transparencySection: { ...prev.transparencySection, stats: newStats }
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
          <span className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">👁️</span>
          Operational Transparency Config
        </h1>
        <p className="text-gray-400 mt-2">Manage the "Real Dashboards. Real Data" section, including stats and images.</p>
      </div>

      {/* Copy section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <span className="text-yellow-400">📝</span>
          <h2 className="font-semibold text-white">Section Copy</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tagline (Small upper text)</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors font-mono" 
              value={data.transparencySection.tagline} onChange={(e) => handleStringChange('tagline', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Main Title (Supports HTML)</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
              value={data.transparencySection.title} onChange={(e) => handleStringChange('title', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description Paragraph 1</label>
            <textarea rows={2} className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
              value={data.transparencySection.descPara1} onChange={(e) => handleStringChange('descPara1', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description Paragraph 2 (Supports HTML)</label>
            <textarea rows={3} className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
              value={data.transparencySection.descPara2} onChange={(e) => handleStringChange('descPara2', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Images section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <span className="text-pink-400">🖼️</span>
          <h2 className="font-semibold text-white">Images Configuration</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Main Image Path</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors font-mono" 
              value={data.transparencySection.images.main} onChange={(e) => handleImageChange('main', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sub Image 1 Path</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors font-mono" 
              value={data.transparencySection.images.sub1} onChange={(e) => handleImageChange('sub1', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sub Image 2 Path</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors font-mono" 
              value={data.transparencySection.images.sub2} onChange={(e) => handleImageChange('sub2', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Stats Array section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-purple-400">📊</span>
            <h2 className="font-semibold text-white">Stats Grid Array</h2>
          </div>
          <button 
            onClick={addStat}
            className="px-4 py-2 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 hover:text-purple-300 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
          >
            <span>+</span> Add New Stat
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.transparencySection.stats.map((stat: any, idx: number) => (
            <div key={idx} className="bg-[#1a233a] p-4 rounded-xl border border-white/5 relative group flex flex-col gap-3">
              <button 
                onClick={() => removeStat(idx)}
                className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                title="Delete this stat"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
              
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Value (e.g. 5.1M+)</label>
                <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors font-heading" 
                  value={stat.value} onChange={(e) => handleStatChange(idx, 'value', e.target.value)} />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Label (e.g. Integrations Deployed)</label>
                <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
                  value={stat.label} onChange={(e) => handleStatChange(idx, 'label', e.target.value)} />
              </div>
            </div>
          ))}
          {data.transparencySection.stats.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500 text-sm">No stats configured. Click "Add New Stat" to create one.</div>
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


