'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const icons = ['🪞', '🏝️', '🚀'];
  const labels = ['Mirror World', 'Number Island', 'Space Garden'];

  return (
    <div className="w-full relative py-6 md:py-8 px-4 flex flex-col gap-4">
      {/* Journey Path Container */}
      <div className="relative w-full h-4 flex items-center">
        {/* Track */}
        <div className="absolute h-2 w-full bg-white/10 rounded-full border border-white/20 overflow-hidden shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${(current / (total - 1)) * 100}%` }}
            transition={{ duration: 1.5, type: "spring", stiffness: 50 }}
          />
        </div>

        {/* Markers */}
        <div className="relative w-full flex justify-between items-center z-10 px-2">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <motion.div 
                className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 shadow-lg transition-all duration-700
                  ${i < current ? 'bg-rose-500 border-white' : i === current ? 'bg-white border-indigo-600' : 'bg-white/20 border-white/10 grayscale opacity-40'}
                `}
                animate={{
                  scale: i === current ? [1, 1.1, 1] : 1,
                }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                <span className="text-xl">
                  {i < current ? '✅' : icons[i]}
                </span>
              </motion.div>
              
              <div className="absolute -bottom-6 whitespace-nowrap">
                <span className={`text-[8px] font-bold uppercase tracking-widest ${i <= current ? 'text-white' : 'text-white/40'}`}>
                   {labels[i]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Moving Indicator (The Rocket) */}
        <motion.div 
          className="absolute z-20 pointer-events-none text-3xl flex items-center justify-center h-12 w-12"
          initial={{ left: 0 }}
          animate={{ left: `${(current / (total - 1)) * 100}%` }}
          transition={{ duration: 1.5, type: "spring", stiffness: 50 }}
          style={{ translateX: '-50%', top: '50%', translateY: '-50%' }}
        >
          <motion.div 
            animate={{ 
               y: [-4, 4, -4],
               rotate: [10, 20, 10] 
            }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            🚀
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
