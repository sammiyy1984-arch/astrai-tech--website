import React from 'react';
import { motion } from 'framer-motion';
import { LogEntry } from '../types';
import BroadcastMatrix from './BroadcastMatrix';
import GlitchText from './GlitchText';
import { useLanguage } from '../contexts/LanguageContext';

const EvolutionLogs: React.FC = () => {
  const { t } = useLanguage();

  // Mapping logs from dictionary to component
  const logs: LogEntry[] = t.logs.list.map((log, index) => ({
    version: log.version,
    module: log.module,
    content: log.content,
    // Just reusing dates for both languages for simplicity, or could add to dictionary
    date: index === 0 ? '2025-10-24' : '2025-09-12' 
  }));

  return (
    <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
       <div className="mb-12 border-b border-white/10 pb-4">
        <GlitchText as="h1" text={t.logs.header} className="text-3xl font-bold text-white" />
       </div>

       <div className="space-y-12">
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="border-l-2 border-white/20 pl-6 py-2 relative"
          >
            <div className="absolute -left-[9px] top-2 w-4 h-4 bg-black border-2 border-white/20 rounded-full" />
            
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2 font-mono text-sm">
              <span className="text-green-500 font-bold">{log.version}</span>
              <span className="text-white bg-white/10 px-2 py-0.5 text-xs">{log.module}</span>
              <span className="text-gray-500 text-xs">{log.date}</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              {log.content}
            </p>
          </motion.div>
        ))}
       </div>

       <div className="mt-20">
         <BroadcastMatrix />
       </div>
    </div>
  );
};

export default EvolutionLogs;