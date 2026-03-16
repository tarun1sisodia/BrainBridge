'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FocusCatcherProps {
  onGameComplete: (stats: { attention_score: number; impulsive_click_rate: number; missed_targets: number; reaction_time: number }) => void;
}

const ROUNDS = 5;

// Star is target, Bug is distraction
type EntityType = 'star' | 'bug';
interface Entity {
  id: number;
  type: EntityType;
  x: number;
  y: number;
  duration: number;
}

export default function FocusCatcherGame({ onGameComplete }: FocusCatcherProps) {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [round, setRound] = useState(0);
  const [lastCaught, setLastCaught] = useState<{ x: number, y: number, type: EntityType } | null>(null);
  
  // Stats
  const [caughtTargets, setCaughtTargets] = useState(0);
  const [missedTargets, setMissedTargets] = useState(0);
  const [distractionClicks, setDistractionClicks] = useState(0);
  const [totalReactionTime, setTotalReactionTime] = useState(0);
  
  const [lastSpawnTime, setLastSpawnTime] = useState(Date.now());

  useEffect(() => {
    if (round >= ROUNDS * 3) {
      const impulsiveRate = distractionClicks / Math.max(1, (caughtTargets + distractionClicks));
      const attentionScore = caughtTargets / (ROUNDS * 3);
      onGameComplete({
        attention_score: attentionScore,
        impulsive_click_rate: impulsiveRate,
        missed_targets: missedTargets,
        reaction_time: totalReactionTime / Math.max(1, caughtTargets)
      });
      return;
    }

    const timer = setTimeout(() => {
      const isTarget = Math.random() > 0.4;
      const newEntity: Entity = {
        id: Date.now(),
        type: isTarget ? 'star' : 'bug',
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        duration: isTarget ? 1800 : 2200
      };
      
      setEntities(prev => [...prev, newEntity]);
      setLastSpawnTime(Date.now());
      setRound(prev => prev + 1);

      setTimeout(() => {
        setEntities(prev => {
          const stillExists = prev.find(e => e.id === newEntity.id);
          if (stillExists && newEntity.type === 'star') {
            setMissedTargets(m => m + 1);
          }
          return prev.filter(e => e.id !== newEntity.id);
        });
      }, newEntity.duration);

    }, Math.random() * 1200 + 600);

    return () => clearTimeout(timer);
  }, [round, caughtTargets, distractionClicks, missedTargets, onGameComplete, totalReactionTime]);

  const handleCatch = (id: number, type: EntityType, x: number, y: number) => {
    const reactionTime = (Date.now() - lastSpawnTime) / 1000;
    
    setLastCaught({ x, y, type });
    setTimeout(() => setLastCaught(null), 500);

    if (type === 'star') {
      setCaughtTargets(prev => prev + 1);
      setTotalReactionTime(prev => prev + reactionTime);
    } else {
      setDistractionClicks(prev => prev + 1);
    }
    
    setEntities(prev => prev.filter(e => e.id !== id));
  };

  if (round >= ROUNDS * 3 && entities.length === 0) return null;

  return (
    <div className="w-full h-full relative p-8 bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group cursor-crosshair">
      {/* Space Garden Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_70%)]" />
        
        {/* Glowing Blobs */}
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full" 
        />
        
        {/* Animated Planets/Stars */}
        <motion.div className="absolute top-10 left-10 text-6xl opacity-10">🪐</motion.div>
        
        {/* Starfield */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 bg-indigo-600 px-6 md:px-8 py-2 md:py-3 rounded-full border-2 border-indigo-400 shadow-xl shadow-indigo-500/20">
        <h3 className="text-white text-[10px] md:text-xs font-black tracking-widest uppercase">
          Capture the Cosmic Butterflies! 🦋✨
        </h3>
      </div>


      <AnimatePresence>
        {entities.map((entity) => (
          <motion.div
            key={entity.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleCatch(entity.id, entity.type, entity.x, entity.y)}
            className={`absolute flex items-center justify-center transition-all
              ${entity.type === 'star' ? 'z-20' : 'z-10'}
            `}
            style={{ 
              left: `${entity.x}%`, 
              top: `${entity.y}%`,
              transform: 'translate(-50%, -50%)' 
            }}
          >
            {entity.type === 'star' ? (
              <div className="relative cursor-pointer">
                <motion.div 
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl sm:text-7xl md:text-8xl drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                >
                   🦋
                </motion.div>
              </div>
            ) : (
              <div className="relative cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                 <span className="text-5xl sm:text-6xl md:text-7xl">🪨</span>
              </div>
            )}

          </motion.div>
        ))}
      </AnimatePresence>

      {/* Visual Feedback on Click */}
      <AnimatePresence>
        {lastCaught && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 1 }}
            exit={{ scale: 4, opacity: 0 }}
            className="absolute z-50 pointer-events-none text-7xl"
            style={{ left: `${lastCaught.x}%`, top: `${lastCaught.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            {lastCaught.type === 'star' ? '✨' : '❌'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Border Glow */}
      <div className="absolute inset-0 pointer-events-none border-4 border-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3.5rem] shadow-[inset_0_0_100px_rgba(255,255,255,0.05)]" />
    </div>
  );
}
