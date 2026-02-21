
import React from 'react';
import { motion } from 'framer-motion';
import { ModuleData } from '../types';
import GlitchText from './GlitchText';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const Modules: React.FC = () => {
  const { t } = useLanguage();

  const modules: ModuleData[] = [
    {
      id: '01',
      code: 'MODULE_01 :: NARRATIVE',
      name: t.modules.m1.name,
      slogan: t.modules.m1.slogan,
      description: t.modules.m1.desc,
      features: t.modules.m1.features,
      status: 'ONLINE',
      action: t.modules.m1.action
    },
    {
      id: '02',
      code: 'MODULE_02 :: RENDER',
      name: t.modules.m2.name,
      slogan: t.modules.m2.slogan,
      description: t.modules.m2.desc,
      features: t.modules.m2.features,
      status: 'ONLINE',
      action: t.modules.m2.action
    },
    {
      id: '03',
      code: 'MODULE_03 :: EXPERIMENT',
      name: t.modules.m3.name,
      slogan: t.modules.m3.slogan,
      description: t.modules.m3.desc,
      features: t.modules.m3.features,
      status: 'INCUBATING',
      action: t.modules.m3.action
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {modules.map((mod, index) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative bg-white/5 border border-white/10 p-6 md:p-8 hover:border-white/30 transition-all duration-300 backdrop-blur-sm overflow-hidden"
          >
            {/* Background Matrix Rain Effect (Simulated) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[linear-gradient(0deg,transparent_20%,#22c55e_50%,transparent_80%)] bg-[length:100%_200%] transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="text-xs text-green-500 mb-4 tracking-widest font-bold">
                {mod.code}
              </div>
              
              <GlitchText 
                as="h3" 
                text={mod.name} 
                className="text-2xl font-bold text-white mb-2" 
              />
              
              <p className="text-sm text-gray-400 italic mb-6 border-l-2 border-green-500/50 pl-3">
                "{mod.slogan}"
              </p>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                {mod.description}
              </p>

              <div className="space-y-2 mb-8">
                {mod.features.map((feature, i) => (
                   <div key={i} className="text-xs text-gray-500 flex items-center gap-2">
                     <span className="w-1 h-1 bg-white/40 rounded-full" />
                     {feature}
                   </div>
                ))}
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className={`text-xs font-bold flex items-center gap-2 ${mod.status === 'ONLINE' ? 'text-green-500' : 'text-yellow-500'}`}>
                  <span className={`w-2 h-2 rounded-full ${mod.status === 'ONLINE' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                  {mod.status}
                </span>
                
                {/* Link to Products Page instead of generic button */}
                <Link 
                  to="/products"
                  className="text-xs border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors uppercase flex items-center gap-2"
                >
                  {mod.action}
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Modules;
