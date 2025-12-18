import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface LogoProps {
  className?: string;
  theme: Theme;
}

const Logo: React.FC<LogoProps> = ({ className = "", theme }) => {
  const isDark = theme === 'dark';

  return (
    <motion.div 
      className={`relative ${className} flex items-center justify-center`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-[22%] z-20 pointer-events-none"
        initial={{ borderWidth: "2px", borderColor: "transparent" }}
        animate={{
          borderColor: isDark ? '#D4AF37' : '#CD7F32',
          boxShadow: isDark ? '0 0 10px rgba(212, 175, 55, 0.2)' : '0 0 10px rgba(205, 127, 50, 0.2)'
        }}
        transition={{ duration: 0.5 }}
      />
      
      <img 
        src="/logo.png" 
        alt="Logo"
        className="w-full h-full rounded-[22%] object-cover shadow-2xl relative z-10"
      />
      
      {/* Glow Effect on Hover */}
      <div className={`absolute inset-0 rounded-[22%] opacity-50 hover:opacity-100 transition-opacity duration-500 blur-md -z-10 ${isDark ? 'bg-luxury-gold/40' : 'bg-luxury-bronze/40'}`} />
    </motion.div>
  );
};

export default Logo;