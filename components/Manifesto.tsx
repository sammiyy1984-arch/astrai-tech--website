import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Manifesto: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="manifesto-section" className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-l border-white/10 ml-6 md:ml-auto md:mr-auto">
      <div className="mb-8 font-mono text-sm text-gray-600 flex items-center gap-2">
        <span className="w-2 h-2 bg-white/50" /> 
        {t.manifesto.header}
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
          {t.manifesto.title} <br/>
          <span className="text-gray-600">{t.manifesto.subTitle}</span>
        </h3>

        <div className="space-y-6 text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-3xl">
          <p>
            {t.manifesto.p1_1}
            <br />
            {t.manifesto.p1_2} <strong className="text-white">{t.manifesto.p1_3}</strong>.
          </p>
          <p>
            {t.manifesto.p2}
          </p>
          <p>
            {t.manifesto.p3}
          </p>
          <p className="pt-4 text-green-500 font-bold tracking-widest uppercase">
            {t.manifesto.keepers}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Manifesto;