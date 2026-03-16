'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isRunning: boolean;
}

export default function Timer({ duration, onTimeUp, isRunning }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onTimeUp]);

  const isLow = timeLeft <= 10;

  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center bg-white/5 backdrop-blur-sm transition-colors duration-500
          ${isLow ? 'border-rose-500 bg-rose-500/10' : 'border-white/20 bg-white/5'}
        `}
        animate={{ scale: isLow ? [1, 1.05, 1] : 1 }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="flex flex-col items-center leading-none">
          <span className={`text-2xl font-black ${isLow ? 'text-rose-500' : 'text-white'}`}>
            {timeLeft}
          </span>
          <span className="text-[8px] font-bold uppercase text-white/40 tracking-widest mt-1">Sec</span>
        </div>
        
        {/* Animated Rings */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="transparent"
            stroke={isLow ? '#f43f5e' : '#6366f1'}
            strokeWidth="4"
            strokeDasharray="226.2"
            initial={{ strokeDashoffset: 226.2 }}
            animate={{ strokeDashoffset: 226.2 * (1 - timeLeft / duration) }}
            transition={{ duration: 1, ease: "linear" }}
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
