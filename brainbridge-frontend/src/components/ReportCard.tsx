'use client';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../stores/languageStore';

interface ReportCardProps {
  results: {
    adhd_risk: number;
    dyslexia_risk: number;
    dyscalculia_risk: number;
  };
  onRestart: () => void;
}



import InteractiveMascot from './InteractiveMascot';

interface ReportCardProps {
  results: {
    adhd_risk: number;
    dyslexia_risk: number;
    dyscalculia_risk: number;
  };
  onRestart: () => void;
}

const getRiskInfo = (score: number) => {
  if (score < 0.3) return { color: 'text-emerald-500', bg: 'bg-emerald-50', icon: '🌟', label: 'Amazing Explorer!' };
  if (score < 0.6) return { color: 'text-amber-500', bg: 'bg-amber-50', icon: '🔍', label: 'Curious Learner' };
  return { color: 'text-rose-500', bg: 'bg-rose-50', icon: '🎨', label: 'Creative Thinker' };
};

export default function ReportCard({ results, onRestart }: ReportCardProps) {
  const { t } = useLanguageStore();

  const metrics = [
    { key: 'adhd_risk', label: t('report.adhd_risk'), score: results.adhd_risk },
    { key: 'dyslexia_risk', label: t('report.dyslexia_risk'), score: results.dyslexia_risk },
    { key: 'dyscalculia_risk', label: t('report.dyscalculia_risk'), score: results.dyscalculia_risk },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="glass-panel w-full max-w-4xl p-12 md:p-16 relative overflow-hidden shadow-2xl border-white/80"
      >
        <div className="relative z-10 flex flex-col items-center">
          <motion.div variants={item} className="mb-6">
            <div className="w-24 h-24">
              <InteractiveMascot />
            </div>
          </motion.div>

          <motion.h2 
            variants={item}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-4 text-center tracking-tight"
          >
            Mission Complete!
          </motion.h2>
          <motion.p variants={item} className="text-xl text-slate-500 font-semibold mb-12 text-center max-w-xl">
            You&apos;ve explored all the adventure worlds! Here&apos;s your journey report.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            {metrics.map((m) => {
              const info = getRiskInfo(m.score);
              return (
                <motion.div 
                   key={m.key}
                   variants={item}
                   className="glass-card p-10 flex flex-col items-center gap-6 border border-white/60"
                >
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="56" cy="56" r="48" fill="transparent" stroke="rgba(0,0,0,0.03)" strokeWidth="6" />
                      <motion.circle 
                        cx="56" cy="56" r="48" 
                        fill="transparent" 
                        stroke="currentColor" 
                        className={info.color}
                        strokeWidth="8" 
                        strokeDasharray="301.6"
                        initial={{ strokeDashoffset: 301.6 }}
                        animate={{ strokeDashoffset: 301.6 * (1 - m.score) }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-4xl">{info.icon}</span>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-black text-slate-900 mb-1">{m.label}</h4>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${info.color}`}>
                      {info.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={item} className="w-full">
            <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 flex flex-col items-center gap-6">
               <h3 className="text-2xl font-black text-slate-800">Adventure Badges</h3>
               <div className="flex flex-wrap justify-center gap-4">
                  <div className="px-5 py-2 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
                     <span className="text-xl">🏆</span>
                     <span className="font-bold text-slate-600 text-sm">Quick Thinker</span>
                  </div>
                  <div className="px-5 py-2 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
                     <span className="text-xl">🎨</span>
                     <span className="font-bold text-slate-600 text-sm">Explorer Spirit</span>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-10">
            <button className="btn-amber flex items-center justify-center gap-4 py-8 text-2xl group rounded-[2rem]">
              <span className="group-hover:scale-110 transition-transform">📄</span>
              Print Certificate
            </button>
            <button 
              onClick={onRestart}
              className="btn-primary flex items-center justify-center gap-4 py-8 text-2xl group rounded-[2rem]"
            >
              <span className="group-hover:rotate-12 transition-transform">🚀</span>
              Play Again
            </button>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-[10px] text-slate-400 font-bold uppercase tracking-[.3em] text-center max-w-xl"
      >
        {t('report.disclaimer')}
      </motion.p>
    </div>
  );
}
