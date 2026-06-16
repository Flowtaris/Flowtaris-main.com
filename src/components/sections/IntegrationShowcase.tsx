import React from 'react'
import { Link } from '@/components/ui/PageTransition'
import Image from 'next/image'
import { ArrowRight, ArrowDown, Activity, GitMerge, Database, Workflow, Server, Zap, Layers, Cpu } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

interface IntegrationShowcaseProps {
  hideViewAll?: boolean;
}

// Icon mapping based on system names
const getIconForSystem = (systemName: string) => {
  const name = systemName.toLowerCase();
  if (name.includes('coupa')) return <Activity className="w-6 h-6 text-white" />;
  if (name.includes('netsuite')) return <Database className="w-6 h-6 text-white" />;
  if (name.includes('workday')) return <GitMerge className="w-6 h-6 text-white" />;
  if (name.includes('sap')) return <Layers className="w-6 h-6 text-white" />;
  if (name.includes('ironclad')) return <Workflow className="w-6 h-6 text-white" />;
  if (name.includes('zylo')) return <Zap className="w-6 h-6 text-white" />;
  if (name.includes('erp')) return <Cpu className="w-6 h-6 text-white" />;
  return <Server className="w-6 h-6 text-white" />;
};

export async function IntegrationShowcase({ hideViewAll = false }: IntegrationShowcaseProps = {}) {
  const supabase = await createClient();
  
  const { data: dbIntegrations } = await supabase
    .from('integrations')
    .select('*')
    .eq('status', 'published')
    .order('priority');

  const integrations = dbIntegrations || [];

  const abstractImages = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
  ];

  return (
    <section className="bg-[#FAFAFA] py-24 font-sans border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0A1628] leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
              We connect the systems <span className="text-slate-500">your business depends on.</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-4 max-w-sm lg:pb-2">
             <p className="text-slate-500 text-base md:text-lg leading-relaxed font-light text-left lg:text-right">
                Seamless data flow across your entire enterprise architecture. We bridge the gap between procurement, finance, and operations.
             </p>
          </div>
        </div>

        {/* The Cinematic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {integrations.map((item, index) => (
            <Link
              key={index}
              href={`/integrations/${item.slug}`}
              className="group relative h-[450px] w-full block bg-[#020617] rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/5"
            >
              
              {/* === THE BACKGROUND ENVIRONMENT === */}
              <div className="absolute inset-0 bg-[#061024] opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms]">
                {/* Cyber Matrix Grid */}
                <div className="absolute inset-0 opacity-30 mix-blend-screen" style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              </div>

              {/* === THE IMPLODING PHOTO === */}
              {/* Default: Covers entire card. Hover: Violently collapses into a 64px circle at exactly x:60px y:120px */}
              <div 
                className="absolute inset-0 z-20 transition-all duration-[900ms] ease-[cubic-bezier(0.85,0,0.15,1)] [clip-path:circle(150%_at_60px_120px)] group-hover:[clip-path:circle(32px_at_60px_120px)]"
              >
                <Image 
                  src={abstractImages[index % abstractImages.length]!} 
                  alt={item.name} 
                  fill 
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-150" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1834] via-[#0A1834]/30 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                
                {/* The Initial Title (Disappears as photo implodes) */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-0">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 mb-3">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-white border border-white/20 uppercase tracking-widest">{item.source_system}</span>
                    <ArrowRight className="hidden md:block w-3 h-3 text-[#E8A020]" strokeWidth={3} />
                    <ArrowDown className="block md:hidden w-3 h-3 text-[#E8A020] ml-3" strokeWidth={3} />
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-white border border-white/20 uppercase tracking-widest">{item.target_system}</span>
                  </div>
                  <h3 className="text-base md:text-lg lg:text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>{item.name}</h3>
                </div>
              </div>


              {/* === THE DATA FLOW SEQUENCE (REVEALED ON HOVER) === */}
              
              {/* 1. SOURCE NODE (Coupa) - Forms over the imploded photo */}
              {/* Center is at 60px, 120px. Size is 64x64. Position = left: 60-32=28px, top: 120-32=88px */}
              <div className="absolute left-[28px] top-[88px] w-16 h-16 rounded-full flex items-center justify-center z-30">
                <div className="w-full h-full rounded-full bg-[#E8A020]/20 border-2 border-[#E8A020] flex items-center justify-center shadow-[0_0_30px_rgba(232,160,32,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[500ms] backdrop-blur-md">
                  {getIconForSystem(item.source_system || '')}
                </div>
                <span className="absolute -bottom-6 text-[10px] font-black text-[#E8A020] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[500ms] whitespace-nowrap">{item.source_system}</span>
              </div>

              {/* 2. TARGET NODE (NetSuite) - Flashes into existence on the right */}
              <div className="absolute right-[28px] top-[88px] w-16 h-16 rounded-full flex items-center justify-center z-30">
                <div className="w-full h-full rounded-full bg-[#00E5FF]/20 border-2 border-[#00E5FF] flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.5)] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-[1000ms] backdrop-blur-md">
                  {getIconForSystem(item.target_system || '')}
                </div>
                <span className="absolute -bottom-6 text-[10px] font-black text-[#00E5FF] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[1000ms] whitespace-nowrap">{item.target_system}</span>
              </div>

              {/* 3. THE CONNECTION BEAM & HIGHWAY */}
              <div className="absolute left-[92px] right-[92px] top-[120px] h-[2px] z-20">
                {/* The tracking rail */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[600ms]" />
                
                {/* The hyper-speed laser strike */}
                <div className="absolute inset-y-0 left-0 bg-[#E8A020] shadow-[0_0_15px_#E8A020] w-0 group-hover:w-full transition-all duration-[300ms] ease-linear delay-[700ms]" />

                {/* The Multi-lane Data Highway (SVG) */}
                <div className="absolute -inset-y-4 inset-x-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[1100ms] overflow-hidden">
                  <svg width="100%" height="100%" preserveAspectRatio="none">
                    <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#E8A020" strokeWidth="1" strokeDasharray="15 40">
                      <animate attributeName="stroke-dashoffset" values="100;0" dur="0.6s" repeatCount="indefinite" />
                    </line>
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#00E5FF" strokeWidth="2" strokeDasharray="40 100">
                      <animate attributeName="stroke-dashoffset" values="140;0" dur="0.4s" repeatCount="indefinite" />
                    </line>
                    <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#E8A020" strokeWidth="1" strokeDasharray="10 30">
                      <animate attributeName="stroke-dashoffset" values="80;0" dur="0.8s" repeatCount="indefinite" />
                    </line>
                  </svg>
                </div>
              </div>

              {/* === THE REVEALED TEXT === */}
              <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 z-30 pointer-events-none">
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[800ms] delay-[900ms]">
                  <h3 className="text-base md:text-lg lg:text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-sora)' }}>{item.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 line-clamp-2">
                    {item.meta_description}
                  </p>
                  <div className="flex md:inline-flex w-full md:w-auto justify-center md:justify-start items-center gap-2 px-5 py-3 bg-[#0A1834] border border-[#E8A020]/30 rounded-full text-[#E8A020] font-bold text-xs shadow-lg pointer-events-auto hover:bg-[#E8A020] hover:text-[#0A1834] transition-all duration-300">
                    Explore Architecture <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
