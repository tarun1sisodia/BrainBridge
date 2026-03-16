'use client';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Mail, Award, ArrowRight, Filter } from 'lucide-react';
import { useState } from 'react';

const specialists = [
  { id: 1, name: 'Dr. Sarah Johnson', role: 'Pediatric Neuropsychologist', rating: 4.9, distance: '1.2 miles', address: '123 Medical Plaza, Suite 405', phone: '(555) 123-4567', email: 's.johnson@example.com', specializations: ['ADHD', 'Learning Disorders'] },
  { id: 2, name: 'Prof. Michael Chen', role: 'Speech & Language Pathologist', rating: 4.8, distance: '2.5 miles', address: '456 Wellness Way', phone: '(555) 987-6543', email: 'm.chen@example.com', specializations: ['Dyslexia', 'Communication'] },
  { id: 3, name: 'Dr. Emily Brown', role: 'Child Psychiatrist', rating: 5.0, distance: '3.1 miles', address: '789 Care Crescent', phone: '(555) 246-8135', email: 'e.brown@example.com', specializations: ['Anxiety', 'Neurology'] },
];

export default function SpecialistFinder() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-hidden py-16 px-4 md:px-8">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full animate-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-500/10 blur-[120px] rounded-full animate-blob [animation-delay:3s]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="mb-20 flex flex-col items-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="px-5 py-2 bg-indigo-500/10 text-indigo-600 rounded-full font-bold text-[10px] uppercase tracking-widest mb-6 border border-indigo-200"
          >
            Specialist Network
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8 text-center leading-tight">
             Find Expert Support <br/>Near You
          </h1>
          
          <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md p-2 flex gap-2 border border-white/60 rounded-[2rem] shadow-xl">
             <div className="flex-1 flex items-center gap-4 bg-white/70 rounded-[1.5rem] px-6 py-3 border border-white">
                <Search className="text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by name, specialty..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-slate-800 font-bold placeholder-slate-400"
                />
             </div>
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-[1.2rem] font-bold transition-all shadow-lg flex items-center gap-2">
                <Filter size={18} />
                Filters
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Specialist List */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3 mb-2 px-4">
               Recommended Specialists <span className="text-[10px] px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full uppercase tracking-widest">3 Matches</span>
            </h3>
            {specialists.map((sp, i) => (
              <motion.div 
                key={sp.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-100 p-8 flex flex-col md:flex-row gap-6 hover:shadow-2xl hover:-translate-y-1 transition-all rounded-[2rem] group"
              >
                <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl font-black text-indigo-400 border-2 border-white shadow-sm">
                  {sp.name[4]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                     <div>
                        <h4 className="text-xl font-black text-slate-900 leading-none mb-1">{sp.name}</h4>
                        <p className="text-indigo-600 font-bold text-xs uppercase tracking-tight opacity-70">{sp.role}</p>
                     </div>
                     <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-bold text-xs">
                        ⭐ {sp.rating}
                     </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                       <MapPin size={14} className="text-indigo-400" /> <span>{sp.distance} away</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                       <Award size={14} className="text-indigo-400" /> <span>{sp.specializations[0]}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="bg-slate-900 text-white py-3 px-8 text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-indigo-600 transition-colors">
                       Book Consult <ArrowRight size={14} />
                    </button>
                    <button className="w-10 h-10 bg-slate-50 flex items-center justify-center rounded-xl hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-all border border-slate-100">
                       <Phone size={18} />
                    </button>
                    <button className="w-10 h-10 bg-slate-50 flex items-center justify-center rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all border border-slate-100">
                       <Mail size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map Mockup */}
          <div className="hidden lg:block relative h-full min-h-[500px] bg-slate-100 border border-slate-200 rounded-[2.5rem] overflow-hidden">
             <div className="absolute inset-0 bg-slate-200/50 [background-image:radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]" />
             
             {/* Map Pins */}
             <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-[30%] left-[40%] group cursor-pointer">
                <div className="w-10 h-10 bg-indigo-600 rounded-full shadow-2xl border-4 border-white flex items-center justify-center text-white text-xs font-bold">SJ</div>
             </motion.div>

             <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }} className="absolute top-[60%] left-[25%] group cursor-pointer">
                <div className="w-10 h-10 bg-indigo-400 rounded-full shadow-2xl border-4 border-white flex items-center justify-center text-white text-xs font-bold">MC</div>
             </motion.div>

             <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} className="absolute top-[45%] right-[25%] group cursor-pointer">
                <div className="w-10 h-10 bg-rose-500 rounded-full shadow-2xl border-4 border-white flex items-center justify-center text-white text-xs font-bold">EB</div>
             </motion.div>

             <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md p-5 border border-white rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Current Area</p>
                   <p className="text-lg font-black text-slate-800">New York City Area</p>
                </div>
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />)}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
