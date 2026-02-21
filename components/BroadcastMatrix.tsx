import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const BroadcastMatrix: React.FC = () => {
  const { t } = useLanguage();
  
  const handleDownload = () => {
    alert("Downloading System Card...");
  };

  return (
    <div className="border border-white/10 p-6 bg-white/5 backdrop-blur-sm">
      <h4 className="text-xs font-bold text-gray-500 mb-6 tracking-widest border-b border-white/5 pb-2">
        {t.broadcast.title}
      </h4>
      
      <div className="flex flex-wrap gap-4">
        <a 
          href="https://twitter.com/intent/tweet?text=Astrai%20System%20Status%3A%20Online.%20%23SiliconLife" 
          target="_blank" 
          rel="noreferrer"
          className="group relative px-6 py-3 border border-white/20 text-sm hover:bg-white hover:text-black transition-colors"
        >
          <span className="relative z-10">[ X_SIGNAL ]</span>
          <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </a>

        <a 
          href="#" 
          className="group relative px-6 py-3 border border-white/20 text-sm hover:bg-white hover:text-black transition-colors"
        >
          <span className="relative z-10">[ META_LINK ]</span>
        </a>

        <button 
          onClick={handleDownload}
          className="group relative px-6 py-3 border border-white/20 text-sm hover:bg-white hover:text-black transition-colors"
        >
          <span className="relative z-10">[ INSTA_CARD ]</span>
        </button>
      </div>
    </div>
  );
};

export default BroadcastMatrix;