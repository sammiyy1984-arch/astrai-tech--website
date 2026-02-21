import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="group flex items-center gap-1.5 select-none no-underline">
      {/* Text Part */}
      <div className="relative">
        <span 
          className="font-mono text-2xl md:text-3xl font-extrabold tracking-tighter text-white glitch-hover" 
          data-text="astrai"
          style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}
        >
          astrai
        </span>
      </div>
      
      {/* Blinking Block Cursor */}
      <motion.div
        className="w-3 h-6 md:h-8 bg-green-500"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "steps(2)" }}
      />
    </Link>
  );
};

export default Logo;