import React from 'react';
import { motion } from 'framer-motion';
import { LogEntry } from '../types';
import BroadcastMatrix from './BroadcastMatrix';
import GlitchText from './GlitchText';
import { useLanguage } from '../contexts/LanguageContext';

const EvolutionLogs: React.FC = () => {
  const { t } = useLanguage();

  // Mapping logs from dictionary to component
  const logs = t.logs.list;

  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
       <div className="mb-16 border-b border-white/10 pb-6">
         <div className="text-xs text-green-500 font-mono mb-2">{`> /access_node: EVOLUTION_LOGS`}</div>
         <GlitchText as="h1" text={t.logs.header} className="text-4xl font-bold text-white" />
       </div>

       <div className="space-y-12">
        {logs.map((log: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative border border-white/5 bg-white/5 p-6 md:p-8 hover:border-green-500/30 transition-all duration-500"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-green-500 font-bold px-2 py-0.5 border border-green-500/30 bg-green-500/10">
                    {log.version}
                  </span>
                  <span className="text-gray-400 uppercase tracking-widest">
                    {log.module}
                  </span>
                </div>
                <div className="text-gray-500">
                  [ SYNC_DATE: {log.date} ]
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-green-500/20 group-hover:bg-green-500/50 transition-colors" />
                <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base">
                  {log.content}
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-[10px] text-gray-600 font-mono uppercase">
                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                Signal Stable // Record Verified
              </div>
            </div>
          </motion.div>
        ))}
       </div>

       <div className="mt-24 border-t border-white/10 pt-12">
         <BroadcastMatrix />
       </div>
    </div>
  );
};

export default EvolutionLogs;