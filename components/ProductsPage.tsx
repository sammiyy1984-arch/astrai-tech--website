
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import GlitchText from './GlitchText';
import { ArrowUpRight } from 'lucide-react';

// SVG Visual for Loom (Product 1)
const LoomVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-green-500/50">
    <motion.path
      d="M10 20 Q 50 10 90 20"
      stroke="currentColor" strokeWidth="1" fill="none"
      animate={{ d: "M10 20 Q 50 30 90 20" }}
      transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    />
    <motion.path
      d="M10 50 Q 50 40 90 50"
      stroke="currentColor" strokeWidth="1" fill="none"
      animate={{ d: "M10 50 Q 50 60 90 50" }}
      transition={{ duration: 4.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    />
    <motion.path
      d="M10 80 Q 50 70 90 80"
      stroke="currentColor" strokeWidth="1" fill="none"
      animate={{ d: "M10 80 Q 50 90 90 80" }}
      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    />
    {/* Vertical threads weaving */}
    <motion.line x1="30" y1="10" x2="30" y2="90" stroke="currentColor" strokeWidth="0.5" opacity="0.5" 
        animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
    <motion.line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" opacity="0.5" 
        animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
    <motion.line x1="70" y1="10" x2="70" y2="90" stroke="currentColor" strokeWidth="0.5" opacity="0.5" 
        animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }} />
  </svg>
);



// SVG Visual for YoutubeAuto
const YoutubeAutoVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-red-500/50">
    <motion.rect x="20" y="30" width="60" height="40" rx="10" stroke="currentColor" strokeWidth="1" fill="none"
      animate={{ strokeDasharray: ["0 200", "200 0"] }} transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.path d="M45 40 L60 50 L45 60 Z" fill="currentColor"
      animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.circle cx="80" cy="20" r="5" stroke="currentColor" strokeWidth="1" fill="none"
       animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
  </svg>
);

// SVG Visual for Shorts
const ShortsVisual = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-500/50">
    <motion.rect x="35" y="20" width="30" height="60" rx="5" stroke="currentColor" strokeWidth="1" fill="none"
       animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path d="M20 50 H80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4"
       animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path d="M50 20 V80" stroke="currentColor" strokeWidth="0.5"
       animate={{ pathLength: [0, 1] }} transition={{ duration: 3, repeat: Infinity }}
    />
  </svg>
);

const ProductsPage: React.FC = () => {
  const { t } = useLanguage();

  const getVisual = (index: number) => {
    switch (index) {
      case 0: return <LoomVisual />;
      case 1: return <YoutubeAutoVisual />;
      case 2: return <ShortsVisual />;
      default: return <LoomVisual />;
    }
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-16 border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
           <div className="text-xs text-green-500 font-mono mb-2">{`> /access_node: PRODUCTS`}</div>
           <GlitchText as="h1" text={t.productsPage.title} className="text-4xl md:text-5xl font-bold text-white" />
        </div>
        <p className="text-gray-500 text-sm md:text-base max-w-md text-right">
          {t.productsPage.subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {t.productsPage.items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="group relative bg-white/5 border border-white/10 hover:border-green-500/50 transition-colors duration-500 flex flex-col h-full overflow-hidden"
          >
             {/* ID Badge */}
             <div className="absolute top-0 right-0 bg-white/10 px-3 py-1 text-[10px] font-mono text-gray-400">
               {item.id}
             </div>

             {/* Visual Container */}
             <div className="h-48 w-full border-b border-white/5 flex items-center justify-center bg-black/20 p-8 group-hover:bg-black/40 transition-colors">
                <div className="w-24 h-24">
                  {getVisual(index)}
                </div>
             </div>

             {/* Content */}
             <div className="p-6 flex flex-col flex-grow">
               <div className="text-xs text-gray-500 font-mono mb-1">{item.type}</div>
               <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-500 transition-colors">
                 {item.name}
               </h3>
               
               <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                 {item.desc}
               </p>

               {/* Specs / Details */}
               <div className="bg-black/20 p-4 rounded border border-white/5 mb-6">
                 <h4 className="text-[10px] text-gray-600 uppercase tracking-widest mb-2 border-b border-white/5 pb-1">
                   {t.productsPage.specs}
                 </h4>
                 <ul className="space-y-1">
                   {item.details.map((detail, i) => (
                     <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                       <span className="text-green-500 mt-0.5">▹</span> {detail}
                     </li>
                   ))}
                 </ul>
               </div>

               {/* Action */}
               <a 
                 href={item.url} 
                 target={item.url.startsWith('http') ? "_blank" : undefined}
                 rel={item.url.startsWith('http') ? "noopener noreferrer" : undefined}
                 className="w-full py-3 border border-white/20 text-xs uppercase tracking-wider hover:bg-green-500 hover:text-black hover:border-green-500 transition-all flex items-center justify-center gap-2 group/btn"
               >
                  {t.productsPage.access}
                  <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
               </a>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
