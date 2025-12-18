import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = "", onClick, href }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Content = (
    <motion.div
      className={`relative z-10 ${className}`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
        <div 
            ref={ref} 
            onMouseMove={handleMouse} 
            onMouseLeave={reset}
            className="inline-block"
        >
            <a href={href} className="block" onClick={onClick}>
                {Content}
            </a>
        </div>
    );
  }

  return (
    <div 
        ref={ref} 
        onMouseMove={handleMouse} 
        onMouseLeave={reset}
        onClick={onClick}
        className="inline-block cursor-pointer"
    >
        {Content}
    </div>
  );
};

export default MagneticButton;
