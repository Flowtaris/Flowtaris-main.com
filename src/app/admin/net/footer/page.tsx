/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FooterConfigPage() {
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
      footer: { ...prev.footer, [key]: value }
    }));
  };

  const handleLinkChange = (arrayName: 'platformLinks' | 'companyLinks' | 'ecosystemLinks', index: number, key: 'label' | 'href', value: string) => {
    setData((prev: any) => {
      const newLinks = [...prev.footer[arrayName]];
      newLinks[index] = { ...newLinks[index], [key]: value };
      return {
        ...prev,
        footer: { ...prev.footer, [arrayName]: newLinks }
      };
    });
  };

  const addLink = (arrayName: 'platformLinks' | 'companyLinks' | 'ecosystemLinks') => {
    setData((prev: any) => ({
      ...prev,
      footer: {
        ...prev.footer,
        [arrayName]: [...prev.footer[arrayName], { label: "New Link", href: "#" }]
      }
    }));
  };

  const removeLink = (arrayName: 'platformLinks' | 'companyLinks' | 'ecosystemLinks', index: number) => {
    setData((prev: any) => {
      const newLinks = [...prev.footer[arrayName]];
      newLinks.splice(index, 1);
      return {
        ...prev,
        footer: { ...prev.footer, [arrayName]: newLinks }
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
          <span className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">📑</span>
          Footer Configuration
        </h1>
        <p className="text-gray-400 mt-2">Manage the footer links, contact buttons, and ecosystem domains.</p>
      </div>

      {/* Contact Button section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <span className="text-orange-400">🏷️</span>
          <h2 className="font-semibold text-white">Contact Button</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Button Text</label>
            <input 
              type="text" 
              className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
              value={data.footer.contactBtnText} 
              onChange={(e) => handleStringChange('contactBtnText', e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Button Link URL</label>
            <input 
              type="text" 
              className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" 
              value={data.footer.contactBtnLink} 
              onChange={(e) => handleStringChange('contactBtnLink', e.target.value)} 
            />
          </div>
        </div>
      </div>

      {/* Links Arrays section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <span className="text-purple-400">🔗</span>
          <h2 className="font-semibold text-white">Footer Link Columns</h2>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Platform Links */}
          <div className="bg-[#1a233a] p-4 rounded-xl border border-white/5">
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Platform Links</label>
              <button onClick={() => addLink('platformLinks')} className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded hover:bg-blue-500/30">+ Add</button>
            </div>
            <div className="space-y-3">
              {data.footer.platformLinks.map((link: any, idx: number) => (
                <div key={idx} className="flex gap-2 items-center group">
                  <div className="flex-1 space-y-1">
                    <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-blue-500 outline-none" value={link.label} onChange={(e) => handleLinkChange('platformLinks', idx, 'label', e.target.value)} placeholder="Label" />
                    <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-blue-500 outline-none font-mono" value={link.href} onChange={(e) => handleLinkChange('platformLinks', idx, 'href', e.target.value)} placeholder="URL" />
                  </div>
                  <button onClick={() => removeLink('platformLinks', idx)} className="p-1.5 bg-red-500/10 text-red-400 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
              ))}
              {data.footer.platformLinks.length === 0 && <div className="text-[10px] text-gray-500 text-center py-2">No links</div>}
            </div>
          </div>

          {/* Company Links */}
          <div className="bg-[#1a233a] p-4 rounded-xl border border-white/5">
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company Links</label>
              <button onClick={() => addLink('companyLinks')} className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded hover:bg-blue-500/30">+ Add</button>
            </div>
            <div className="space-y-3">
              {data.footer.companyLinks.map((link: any, idx: number) => (
                <div key={idx} className="flex gap-2 items-center group">
                  <div className="flex-1 space-y-1">
                    <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-blue-500 outline-none" value={link.label} onChange={(e) => handleLinkChange('companyLinks', idx, 'label', e.target.value)} placeholder="Label" />
                    <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-blue-500 outline-none font-mono" value={link.href} onChange={(e) => handleLinkChange('companyLinks', idx, 'href', e.target.value)} placeholder="URL" />
                  </div>
                  <button onClick={() => removeLink('companyLinks', idx)} className="p-1.5 bg-red-500/10 text-red-400 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
              ))}
              {data.footer.companyLinks.length === 0 && <div className="text-[10px] text-gray-500 text-center py-2">No links</div>}
            </div>
          </div>

          {/* Ecosystem Links */}
          <div className="bg-[#1a233a] p-4 rounded-xl border border-white/5">
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ecosystem Links</label>
              <button onClick={() => addLink('ecosystemLinks')} className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded hover:bg-blue-500/30">+ Add</button>
            </div>
            <div className="space-y-3">
              {data.footer.ecosystemLinks.map((link: any, idx: number) => (
                <div key={idx} className="flex gap-2 items-center group">
                  <div className="flex-1 space-y-1">
                    <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-blue-500 outline-none" value={link.label} onChange={(e) => handleLinkChange('ecosystemLinks', idx, 'label', e.target.value)} placeholder="Label" />
                    <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-blue-500 outline-none font-mono" value={link.href} onChange={(e) => handleLinkChange('ecosystemLinks', idx, 'href', e.target.value)} placeholder="URL" />
                  </div>
                  <button onClick={() => removeLink('ecosystemLinks', idx)} className="p-1.5 bg-red-500/10 text-red-400 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
              ))}
              {data.footer.ecosystemLinks.length === 0 && <div className="text-[10px] text-gray-500 text-center py-2">No links</div>}
            </div>
          </div>

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


