import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Motion values for raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the main cursor
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Slightly delayed springs for a trailing effect (optional, but adds fluidity)
  const trailSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const trailX = useSpring(mouseX, trailSpringConfig);
  const trailY = useSpring(mouseY, trailSpringConfig);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the element or its parents are clickable
      const isClickable = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('input') || 
        target.closest('[role="button"]') ||
        target.classList.contains('clickable');
        
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Trailing Dot/Glow (Subtle fluid follow) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[90] mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div 
           animate={{
             scale: isHovering ? 1.5 : 0.5,
             opacity: isHovering ? 0.4 : 0.2
           }}
           className="w-8 h-8 rounded-full bg-luxury-gold blur-md"
        />
      </motion.div>

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <div className="relative">
          {/* Default State: Sharp Arrow */}
          <motion.div
            animate={{ 
              opacity: isHovering ? 0 : 1,
              scale: isHovering ? 0 : 1,
              rotate: isHovering ? -45 : 0
            }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 -translate-x-1 -translate-y-1"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            >
              <path 
                d="M3.5 3.5L11 21.5L13.5 13.5L21.5 11L3.5 3.5Z" 
                fill="#D4AF37" 
                stroke="white" 
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          {/* Hover State: Magnetic Ring */}
          <motion.div
            animate={{ 
              opacity: isHovering ? 1 : 0,
              scale: isHovering ? 1 : 0.5
            }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          >
            <div className="relative flex items-center justify-center w-12 h-12">
              {/* Outer Ring */}
              <motion.div 
                className="absolute inset-0 rounded-full border border-luxury-gold bg-luxury-gold/5 backdrop-blur-[1px]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              {/* Inner Dot */}
              <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;