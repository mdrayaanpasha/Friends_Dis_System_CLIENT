import React from 'react';
import { Github, ArrowRight, Zap, Database, Share2, Layers } from 'lucide-react';

const ProjectHomepage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 font-sans selection:bg-yellow-500/30 selection:text-black">
      
      {/* 🧊 STICKY DEMO TRIGGER */}
      <a href="/demo" className="fixed bottom-10 right-10 z-[100] flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 transition-all duration-300 shadow-2xl group">
        Try Demo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </a>

      {/* --- HERO: THE INTENT --- */}
      <section className="pt-32 pb-24 max-w-6xl mx-auto px-8">
        <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-white mb-10 leading-[0.9]">
          Central Perk <br />
          <span className="text-zinc-600 font-serif italic">Distributed.</span>
        </h1>
        
        <p className="max-w-xl text-lg text-zinc-500 leading-relaxed mb-12">
          An event-driven simulation of stateful microservices. Isolated agents (Node.js) 
          communicating via RabbitMQ, utilizing Prisma for persistent context.
        </p>

        <div className="flex gap-8 border-t border-white/10 pt-8 w-fit">
          <Stat label="Latency" value="~2ms" />
          <Stat label="Broker" value="RabbitMQ" />
          <Stat label="Persistence" value="PostgreSQL" />
        </div>
      </section>

      {/* --- ARCHITECTURE: THE BLUEPRINT --- */}
      <section className="py-24 max-w-6xl mx-auto px-8 border-t border-white/5">
        <div className="mb-16">
          <h2 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Technical Blueprint</h2>
          <p className="text-sm text-zinc-600 font-mono">Topological view of the messaging mesh</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center py-12">
          {/* Service Layer */}
          <div className="space-y-4">
             <div className="text-[10px] uppercase tracking-widest text-zinc-700 mb-4 font-bold">Character Services</div>
             <ServiceNode name="Ross_Service" port="3001" />
             <ServiceNode name="Rachel_Service" port="3003" />
             <ServiceNode name="Joey_Service" port="3002" />
          </div>

          {/* Bus Layer */}
          <div className="flex flex-col items-center justify-center relative py-20">
             {/* Simulated Wires */}
             <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />
             </div>
             
             <div className="bg-zinc-900 border border-yellow-500/20 p-8 rounded-full shadow-[0_0_50px_rgba(234,179,8,0.05)] text-center animate-pulse">
                <Share2 className="text-yellow-500 mx-auto mb-2" size={32} />
                <div className="text-white font-black text-[10px] uppercase tracking-tighter">RabbitMQ Exchange</div>
                <div className="text-zinc-600 text-[9px] font-mono">friends-direct</div>
             </div>
          </div>

          {/* Persistence Layer */}
          <div className="space-y-4">
             <div className="text-[10px] uppercase tracking-widest text-zinc-700 mb-4 font-bold">Data Plane</div>
             <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                <Database className="text-zinc-500" />
                <div>
                   <div className="text-white text-xs font-bold uppercase">PostgreSQL</div>
                   <div className="text-zinc-600 text-[10px]">Prisma Client / Logs</div>
                </div>
             </div>
             <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl flex items-center gap-4 opacity-40">
                <Layers className="text-zinc-500" />
                <div>
                   <div className="text-white text-xs font-bold uppercase">Redis</div>
                   <div className="text-zinc-600 text-[10px]">Pub/Sub (Future)</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- THE FIXES: DEEP DIVE --- */}
      <section className="py-24 max-w-6xl mx-auto px-8 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <h3 className="text-white font-bold mb-6 text-sm flex items-center gap-2 tracking-widest uppercase">
              <Zap size={14} className="text-yellow-500" /> Deadlock Management
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500 font-light">
               Infinite recursion is a risk in bidirectional messaging. 
               The system utilizes a <span className="text-zinc-300 font-mono italic">message-injected TTL</span>. Each packet carries a 
               step-count; upon reaching the threshold (10), the consumer forces an ACK 
               without re-publishing, preventing system-wide cascading failure.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6 text-sm flex items-center gap-2 tracking-widest uppercase">
              <Database size={14} className="text-yellow-500" /> Conversational State
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500 font-light">
               Consistency is maintained via <span className="text-zinc-300 font-mono italic">stateful logging</span>. 
               Services query the shared database before generating responses to ensure context is 
               synchronized across ephemeral microservice instances.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-32 text-center text-zinc-800 text-[10px] font-mono tracking-[0.5em] uppercase">
        Central Perk Cluster // Scalable Sarcasm Engine
      </footer>
    </div>
  );
};

// --- SUB COMPONENTS ---

const Stat = ({ label, value }) => (
  <div>
    <div className="text-[9px] uppercase tracking-widest text-zinc-600 mb-1">{label}</div>
    <div className="text-white text-xs font-bold font-mono">{value}</div>
  </div>
);

const ServiceNode = ({ name, port }) => (
  <div className="group bg-zinc-900 border border-white/5 p-5 rounded-2xl hover:border-yellow-500/30 transition-all transition-duration-500 cursor-default">
    <div className="flex justify-between items-center mb-1">
       <span className="text-white text-xs font-bold tracking-tight">{name}</span>
       <span className="text-zinc-700 text-[9px] font-mono">PORT: {port}</span>
    </div>
    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mt-3">
       <div className="w-1/3 h-full bg-yellow-500/20 group-hover:w-full transition-all duration-1000" />
    </div>
  </div>
);

export default ProjectHomepage;