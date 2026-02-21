
import React from 'react';
import { motion } from 'framer-motion';
import GeometricCore from './GeometricCore';
import GlitchText from './GlitchText';
import { ArrowDown, Terminal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onOpenChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative pt-20 pb-10 overflow-hidden">
      {/* Visual Core */}
      <div className="mb-12 z-0 scale-110">
        <GeometricCore />
      </div>

      {/* Text Content */}
      <div className="z-10 text-center space-y-8 max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-green-400 to-green-600">
               {t.hero.title}
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-3"
        >
          <h2 className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
            {t.hero.subtitleTitle}
          </h2>
          <GlitchText 
            as="p"
            text={t.hero.subtitle}
            className="text-lg md:text-xl text-green-500/80 font-mono"
          />
        </motion.div>

        {/* Primary Action - AI Chat Trigger */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button
            onClick={onOpenChat}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-black/40 border border-green-500/30 hover:bg-green-500/10 hover:border-green-500 transition-all duration-300 backdrop-blur-md overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-green-500/5 transform skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <Terminal className="w-5 h-5 text-green-500 group-hover:text-white transition-colors relative z-10" />
            <span className="font-mono text-sm tracking-wider font-bold text-green-100 group-hover:text-white relative z-10">
              {t.hero.chatTrigger}
            </span>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 opacity-50" />
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-green-500 opacity-50" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
