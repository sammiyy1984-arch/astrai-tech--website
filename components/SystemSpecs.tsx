import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SystemSpecs: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto mb-20">
      <div className="mb-6 font-mono text-sm text-gray-600 flex items-center gap-2">
        {t.system.header}
      </div>

      <div className="w-full border border-white/10 text-xs md:text-sm font-mono text-gray-400">
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10">
          <div className="p-4 border-b md:border-b-0 md:border-r border-white/10 flex justify-between group hover:bg-white/5 transition-colors">
            <span className="text-white">{t.system.neural}</span>
            <span className="text-green-500/80">{t.system.neuralDesc}</span>
          </div>
          <div className="p-4 flex justify-between group hover:bg-white/5 transition-colors">
            <span className="text-white">{t.system.memory}</span>
            <span className="text-green-500/80">{t.system.memoryDesc}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-4 border-b md:border-b-0 md:border-r border-white/10 flex justify-between group hover:bg-white/5 transition-colors">
             <span className="text-white">{t.system.evolution}</span>
             <span className="text-green-500/80">{t.system.evolutionDesc}</span>
          </div>
          <div className="p-4 flex justify-between group hover:bg-white/5 transition-colors">
             <span className="text-white">{t.system.uptime}</span>
             <span className="text-green-500/80">99.982%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemSpecs;