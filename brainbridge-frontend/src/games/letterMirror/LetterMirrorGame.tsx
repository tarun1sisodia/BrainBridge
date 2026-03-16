'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LetterMirrorProps {
  onGameComplete: (stats: { errors: number; reaction_time: number; attempts: number; mirror_error_rate: number }) => void;
}

const ROUNDS = 5;

// Letters commonly confused (b/d, p/q)
const PAIRS = [
  { correct: 'b', incorrect: 'd' },
  { correct: 'd', incorrect: 'b' },
  { correct: 'p', incorrect: 'q' },
  { correct: 'q', incorrect: 'p' },
];

export default function LetterMirrorGame({ onGameComplete }: LetterMirrorProps) {
  const [round, setRound] = useState(0);
  const [targetPair, setTargetPair] = useState(PAIRS[0]);
  const [options, setOptions] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Stats
  const [startTime, setStartTime] = useState(Date.now());
  const [errors, setErrors] = useState(0);
  const [mirrorErrors, setMirrorErrors] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [totalReactionTime, setTotalReactionTime] = useState(0);

  // Initialize round
  useEffect(() => {
    if (round < ROUNDS) {
      const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
      setTargetPair(pair);
      
      const newOptions = [pair.correct, pair.incorrect, pair.incorrect, pair.correct === 'b' ? 'q' : 'p'];
      setOptions(newOptions.sort(() => Math.random() - 0.5));
      setStartTime(Date.now());
    } else {
      onGameComplete({
        errors,
        reaction_time: totalReactionTime / ROUNDS,
        attempts,
        mirror_error_rate: mirrorErrors / Math.max(1, errors)
      });
    }
  }, [round, onGameComplete]);

  const handleSelection = (selected: string) => {
    setAttempts(prev => prev + 1);
    const reactionTime = (Date.now() - startTime) / 1000;

    if (selected === targetPair.correct) {
      setTotalReactionTime(prev => prev + reactionTime);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setRound(prev => prev + 1);
      }, 800);
    } else {
      setErrors(prev => prev + 1);
      if (selected === targetPair.incorrect) {
        setMirrorErrors(prev => prev + 1);
      }
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  if (round >= ROUNDS) return null;

  return (
    <div className="flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Magical Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 blur-[100px] rounded-full" 
        />
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-10 right-10 text-9xl opacity-10"
        >
          🪄
        </motion.div>
      </div>

      <motion.div 
        animate={{ x: shake ? [-10, 10, -10, 10, 0] : 0 }}
        className="relative z-10 w-full flex flex-col items-center gap-10"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-10 flex flex-col items-center border border-white/20 shadow-xl">
          <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">
            Find the Magic Letter! ✨
          </h3>
          <motion.div 
            className="text-[10rem] font-black text-white p-12 bg-white/10 rounded-[2.5rem] shadow-inner relative group border border-white/20"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
             <span className="relative z-10">{targetPair.correct}</span>
             <div className="absolute inset-0 bg-indigo-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full animate-pulse" />
          </motion.div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 w-full max-w-xl">
          <AnimatePresence mode="wait">
            {!showSuccess && options.map((option, idx) => (
              <motion.button
                key={`${round}-${idx}`}
                initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelection(option)}
                className="bg-white/10 backdrop-blur-md border border-white/30 shadow-lg rounded-[2.5rem] h-48 text-[8rem] font-black text-white hover:bg-white/20 transition-all flex items-center justify-center relative group overflow-hidden"
              >
                {/* Mirror Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 opacity-30 pointer-events-none" />
                <span className="relative z-10">{option}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="text-[20rem] animate-bounce-soft">🎉</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
