import React from 'react';
import { motion } from 'framer-motion';

const GeometricCore: React.FC = () => {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center pointer-events-none select-none">
      {/* Core Glow */}
      <div className="absolute inset-0 bg-white/5 rounded-full blur-[60px] animate-pulse" />

      <svg viewBox="0 0 200 200" className="w-full h-full text-white/80">
        {/* Outer Ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          strokeDasharray="10 10"
        />
        
        {/* Inner Octagon Construct (Simulated with path) */}
        <motion.path
          d="M100 20 L160 50 L160 150 L100 180 L40 150 L40 50 Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5, rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* The Breathing Core */}
        <motion.circle
          cx="100"
          cy="100"
          r="40"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Random Data Points */}
        <motion.circle cx="100" cy="20" r="2" fill="white" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
        <motion.circle cx="160" cy="150" r="2" fill="white" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
        <motion.circle cx="40" cy="50" r="2" fill="white" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0 }} />
      </svg>
      
      {/* Code fragments floating */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[10px] text-green-500 font-mono whitespace-nowrap opacity-50"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        :: INITIALIZING ::
      </motion.div>
    </div>
  );
};

export default GeometricCore;