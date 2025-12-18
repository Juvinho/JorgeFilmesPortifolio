import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  // We keep the component name to avoid breaking imports, but the effect is now "Luxury Shimmer"
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-luxury-gold via-white to-luxury-gold animate-shimmer bg-[length:200%_auto]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-luxury-gold/20 blur-sm">
        {text}
      </span>
    </div>
  );
};

export default GlitchText;