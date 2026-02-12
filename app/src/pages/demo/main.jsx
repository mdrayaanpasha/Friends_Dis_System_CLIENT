import React, { useState, useEffect, useRef } from 'react';
import { Coffee, Play, Zap, CupSoda, Info, X, Server, Share2, Database, Eye } from 'lucide-react';
import { Github, ArrowLeft } from 'lucide-react';

const BackButton = () => (
    <a 
      href="/" 
      className="fixed top-8 left-8 z-[100] flex items-center gap-2 px-4 py-2 rounded-xl
                 bg-white/5 backdrop-blur-md border border-white/10 text-zinc-400 text-[10px] font-black uppercase tracking-widest
                 hover:bg-white/10 hover:text-white transition-all duration-300 group shadow-2xl"
    >
      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
      Back to Home
    </a>
  );

const Home = () => {
  const [logs, setLogs] = useState([]);
  const [activeMsg, setActiveMsg] = useState(null);
  const [isLaunching, setIsLaunching] = useState(null);
  const [selectedPacket, setSelectedPacket] = useState(null); // Packet Inspector State
  const seenIds = useRef(new Set());

  const avatars = {
    Ross: "https://ik.imagekit.io/yylpuqff5/Portfolio/GIFS/Friends/Ross-Geller.gif", 
    Rachel: "https://ik.imagekit.io/yylpuqff5/Portfolio/GIFS/Friends/rachel-green.gif?updatedAt=1763040146895",
    Joey: "https://ik.imagekit.io/yylpuqff5/Portfolio/GIFS/Friends/Joey.gif",
  };

  const serviceConfig = {
    Ross: "http://friends-dis-system.duckdns.org:3001",
    Joey: "http://friends-dis-system.duckdns.org:3002",
    Rachel: "http://friends-dis-system.duckdns.org:3003",
  };

  const fetchAndSync = async () => {
    try {
      const res = await fetch(`${serviceConfig.Ross}/api/sync`);
      const data = await res.json();
      const sorted = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      const freshMessages = sorted.filter(m => !seenIds.current.has(m.id));

      if (freshMessages.length > 0) {
        const nextMsg = freshMessages[0];
        seenIds.current.add(nextMsg.id);
        setActiveMsg(nextMsg);
        setLogs(prev => [nextMsg, ...prev].slice(0, 10));
        setTimeout(() => setActiveMsg(null), 4500);
      }
    } catch (e) { console.error("Sync Error"); }
  };

  useEffect(() => {
    const interval = setInterval(fetchAndSync, 3000);
    return () => clearInterval(interval);
  }, []);

  const trigger = async (name) => {
    setIsLaunching(name);
    try { await fetch(`${serviceConfig[name]}/start-convo-bro`); } 
    finally { setIsLaunching(null); }
  };

  return (
    <div className="min-h-screen bg-[#1a0f0a] text-amber-50 font-sans flex flex-col items-center p-4 md:p-8 relative">
      
      {/* ☕ The Logo Header */}
      <BackButton/>
      <header className="w-full max-w-5xl flex flex-col items-center mb-10">
        <div className="flex items-center gap-4 bg-[#2d1b14] px-8 py-3 rounded-full border-2 border-green-800 shadow-[0_0_30px_rgba(22,101,52,0.2)]">
          <Coffee className="text-green-600" size={32} />
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-amber-100">
            CENTRAL <span className="text-green-700">PERK</span>
          </h1>
          <Coffee className="text-green-600 scale-x-[-1]" size={32} />
        </div>
        <p className="mt-3 text-[10px] uppercase tracking-[0.4em] text-amber-700 font-bold">Distributed Node.js Simulation</p>
      </header>

      {/* 🛋️ The Stage Area */}
      <main className="relative w-full max-w-5xl h-[500px] bg-[#2d1b14] rounded-[50px] border-b-8 border-amber-900 shadow-2xl overflow-hidden flex items-end justify-center pb-12 px-10">
        <div className="absolute inset-0 opacity-10 bg-[url('https://ik.imagekit.io/yylpuqff5/Portfolio/GIFS/Friends/central-perk.webp')] pointer-events-none" />
        <div className="absolute bottom-0 w-4/5 h-32 bg-[#5c1a1a] rounded-t-full blur-2xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-8 w-3/4 h-24 bg-orange-700 rounded-3xl border-b-4 border-orange-900 opacity-90 shadow-2xl" />

        <div className="relative z-10 w-full flex justify-between items-end max-w-3xl">
          {['Rachel', 'Ross', 'Joey'].map((name) => {
            const isSpeaking = activeMsg?.characterFrom === name;
            return (
              <div key={name} className="relative flex flex-col items-center group">
                {isSpeaking && (
                  <div className="absolute -top-40 w-64 bg-[#fff9f2] text-stone-800 p-5 rounded-[2.5rem] rounded-bl-none shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-in zoom-in-75 duration-300 z-50 border-2 border-amber-100">
                    <p className="text-sm font-serif italic leading-relaxed">"{activeMsg.message}"</p>
                    <div className="mt-3 flex items-center gap-2">
                        <CupSoda size={12} className="text-green-700" />
                        <span className="text-[9px] font-black uppercase text-stone-400">Talking to {activeMsg.characterTo}</span>
                    </div>
                    <div className="absolute -bottom-3 left-6 w-6 h-6 bg-[#fff9f2] rotate-45 border-r-2 border-b-2 border-amber-100" />
                  </div>
                )}
                <div className={`transition-all duration-700 flex flex-col items-center ${isSpeaking ? 'scale-110 -translate-y-6' : 'scale-90 opacity-40 blur-[0.5px]'}`}>
                  <div className={`p-1.5 rounded-full border-4 transition-all duration-500 ${isSpeaking ? 'border-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.4)]' : 'border-stone-800 overflow-hidden'}`}>
                    <img src={avatars[name]} className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#1a0f0a] object-cover" alt={name} />
                  </div>
                  <div className={`mt-4 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${isSpeaking ? 'bg-amber-400 text-stone-900' : 'bg-stone-800 text-stone-500'}`}>
                    {name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 🔘 Control Panel */}
      <section className="mt-8 flex gap-3">
        {['Ross', 'Rachel', 'Joey'].map(name => (
          <button 
            key={name}
            onClick={() => trigger(name)}
            className="flex items-center gap-2 px-6 py-3 bg-[#2d1b14] border-2 border-stone-800 rounded-2xl text-xs font-bold uppercase tracking-widest hover:border-green-700 hover:text-green-500 transition-all shadow-lg active:scale-95"
          >
            <Play size={14} fill="currentColor" /> Ping {name}
          </button>
        ))}
      </section>

      {/* 📜 Footer with Packet Inspector Trigger */}
      <footer className="w-full max-w-4xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
        {logs.slice(1, 5).map((log) => (
          <div 
            key={log.id} 
            onClick={() => setSelectedPacket(log)}
            className="bg-[#2d1b14]/40 border border-stone-800 p-4 rounded-2xl flex items-center justify-between gap-4 opacity-50 hover:opacity-100 transition-all cursor-pointer hover:border-amber-900/50 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-700 shadow-[0_0_8px_rgba(21,128,61,0.8)]" />
              <div className="flex flex-col">
                <span className="text-[8px] font-mono text-stone-500 uppercase tracking-[0.2em]">{log.characterFrom} → {log.characterTo}</span>
                <p className="text-xs text-stone-300 italic truncate w-48 md:w-64">"{log.message}"</p>
              </div>
            </div>
            <Eye size={14} className="text-stone-600 group-hover:text-amber-500 transition-colors" />
          </div>
        ))}
      </footer>

      {/* 🔍 Packet Inspector Modal */}
      {selectedPacket && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#1a0f0a] border-2 border-amber-900/30 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <Database className="text-amber-500" size={18} />
                <h3 className="text-xs font-black uppercase tracking-[0.2em]">Packet Inspector</h3>
              </div>
              <button onClick={() => setSelectedPacket(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-black/40 rounded-xl p-4 font-mono text-[11px] text-green-500/90 leading-relaxed overflow-x-auto">
                <pre>{JSON.stringify(selectedPacket, null, 2)}</pre>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-900/20 border border-green-800/30 rounded-full text-[9px] font-bold text-green-500 uppercase">Status: Delivered</span>
                <span className="px-3 py-1 bg-blue-900/20 border border-blue-800/30 rounded-full text-[9px] font-bold text-blue-500 uppercase">Type: Broadcast</span>
                <span className="px-3 py-1 bg-amber-900/20 border border-amber-800/30 rounded-full text-[9px] font-bold text-amber-500 uppercase">Node: {selectedPacket.characterFrom}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <a
        href="https://github.com/mdrayaanpasha/Friends_Distributed_Simulation"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] group flex items-center gap-3 px-6 py-4 rounded-2xl
                   bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]
                   hover:bg-white/20 hover:border-white/40 transition-all duration-500 ease-out 
                   hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] active:scale-95"
      >
        <div className="relative">
          <Github size={20} className="text-white group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-white blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
          View on GitHub
        </span>
      </a>

    </div>
  );
};

export default Home;