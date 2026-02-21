import React from 'react';
import { motion } from 'framer-motion';

const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="w-full py-12 border-t border-white/5 bg-black/40">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-xs font-mono text-green-500 mb-8 tracking-widest text-center">
          SYSTEM_ARCHITECTURE // DATA_FLOW
        </h3>
        
        <div className="relative h-64 md:h-80 w-full flex items-center justify-center">
          {/* Core */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute z-10 w-24 h-24 rounded-full border-2 border-green-500/50 bg-green-900/20 flex items-center justify-center backdrop-blur-sm"
          >
            <div className="text-[10px] font-mono text-green-400 text-center">
              ASTRAI<br/>CORE
            </div>
            <div className="absolute inset-0 rounded-full border border-green-500/20 animate-ping opacity-20" />
          </motion.div>

          {/* Orbit 1: Loom */}
          <motion.div 
            className="absolute w-48 h-48 rounded-full border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-black border border-white/30 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </motion.div>

          {/* Orbit 2: YoutubeAuto */}
          <motion.div 
            className="absolute w-72 h-72 rounded-full border border-white/5"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-black border border-red-500/30 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            </div>
          </motion.div>
          
          {/* Connecting Lines (Static for simplicity, could be animated SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
             <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="currentColor" strokeWidth="1" className="text-green-500" />
             <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="currentColor" strokeWidth="1" className="text-green-500" />
             <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="currentColor" strokeWidth="1" className="text-green-500" />
          </svg>
          
          {/* Labels */}
          <div className="absolute top-4 left-4 md:left-20 text-[10px] text-gray-500 font-mono">
            INPUT: RAW_DATA
          </div>
          <div className="absolute top-4 right-4 md:right-20 text-[10px] text-gray-500 font-mono text-right">
            OUTPUT: CINEMA
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 font-mono">
            FEEDBACK_LOOP: RLHF
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
