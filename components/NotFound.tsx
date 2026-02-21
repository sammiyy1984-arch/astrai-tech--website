import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const NotFound: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-4">
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-6xl md:text-9xl font-bold text-red-600 mb-4 font-mono glitch-hover"
        data-text={t.notfound.title}
      >
        {t.notfound.title}
      </motion.h1>
      <div className="text-red-500/80 text-xl font-mono border border-red-900/50 p-4 bg-red-900/10">
        {t.notfound.desc}
      </div>
      <a href="#/" className="mt-8 text-gray-500 hover:text-white underline decoration-dotted">
        {t.notfound.return}
      </a>
    </div>
  );
};

export default NotFound;