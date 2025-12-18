import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds loading
    const steps = 100;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration + 800); // Wait a bit after 100%

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] text-[#D4AF37]"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative flex flex-col items-center">
        {/* Counter */}
        <motion.div 
          className="text-8xl md:text-9xl font-display font-light tracking-tighter"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {count}
          <span className="text-4xl md:text-5xl align-top opacity-50">%</span>
        </motion.div>
        
        {/* Loading Bar */}
        <div className="mt-8 h-[2px] w-64 overflow-hidden bg-white/10 rounded-full">
          <motion.div 
            className="h-full bg-[#D4AF37]"
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Text */}
        <motion.div 
          className="mt-4 text-xs tracking-[0.4em] uppercase text-white/40 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Carregando Experiência
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
