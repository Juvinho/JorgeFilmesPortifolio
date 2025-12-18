import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Theme } from '../types';

interface CinematicScrollProps {
  theme: Theme;
}

const CinematicScroll: React.FC<CinematicScrollProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const isDark = theme === 'dark';

  // Scale down the video/image to reveal content
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "20px"]);
  
  // Text Reveal Animations
  const textY = useTransform(scrollYProgress, [0.2, 0.8], [100, -100]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ scale, borderRadius }}
          className="relative w-full h-full shadow-2xl overflow-hidden"
        >
          {/* Placeholder for a High-Quality Video Loop */}
          <div className="absolute inset-0 bg-black">
             <img 
               src={isDark ? "/parallax.jpg" : "/wedding-cam.jpg"}
               alt="Cinematic Background" 
               className="w-full h-full object-cover"
             />
             <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${isDark ? 'to-black/60' : 'to-white/60'}`} />
          </div>

          {/* Floating Content */}
          <motion.div 
            style={{ y: textY, opacity: textOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4"
          >
            <h2 className="font-display text-6xl md:text-9xl text-white font-bold tracking-tighter mb-6 drop-shadow-lg">
              Cinema <span className="italic text-luxury-gold">Puro</span>
            </h2>
            <p className="font-sans text-xl md:text-2xl text-gray-200 max-w-2xl font-light tracking-wide">
              Cada frame é uma pintura. Cada movimento, uma emoção.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CinematicScroll;
