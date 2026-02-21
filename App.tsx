
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Modules from './components/Modules';
import SystemSpecs from './components/SystemSpecs';
import EvolutionLogs from './components/EvolutionLogs';
import ProductsPage from './components/ProductsPage';
import NotFound from './components/NotFound';
import BootSequence from './components/BootSequence';
import AIChatTerminal from './components/AIChatTerminal';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Terminal } from 'lucide-react';

interface HomePageProps {
  onOpenChat: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenChat }) => {
  const { t } = useLanguage();
  return (
    <>
      <Hero onOpenChat={onOpenChat} />
      <Manifesto />
      <Modules />
      <SystemSpecs />
      
      {/* Link to Evolution Logs from Home */}
      <div className="max-w-6xl mx-auto px-8 pb-24 text-right">
        <Link to="/evolution" className="text-sm text-gray-500 hover:text-green-500 transition-colors font-mono">
           {t.logs.homeLink}
        </Link>
      </div>
    </>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem('astrai_booted');
    if (hasBooted) {
      setLoading(false);
    }
  }, []);

  const handleBootComplete = () => {
    setLoading(false);
    sessionStorage.setItem('astrai_booted', 'true');
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  useEffect(() => {
    console.clear();
    const asciiArt = `
      .       .        .      .
    .   _  .    _   .    _  .   _
    _  / /  _  / /  _  / /  _  / /
    / / / / / / / / / / / / / / / 
    / / / / / / / / / / / / / / /  
    /_/ /_/ /_/ /_/ /_/ /_/ /_/   
      A S T R A I . T E C H
    `;
    console.log(`%c${asciiArt}`, 'color: #22c55e; font-family: monospace; font-weight: bold;');
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>
      
      {!loading && (
        <HashRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage onOpenChat={() => setIsChatOpen(true)} />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/evolution" element={<EvolutionLogs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            <AIChatTerminal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            
            {/* Floating Mobile Trigger if closed */}
            {!isChatOpen && (
              <button 
                onClick={toggleChat}
                className="fixed bottom-4 right-4 z-40 p-3 bg-black/80 border border-green-500/50 rounded-full text-green-500 hover:bg-green-500 hover:text-black transition-all shadow-lg shadow-green-900/20 backdrop-blur-md md:hidden"
              >
                <Terminal className="w-5 h-5" />
              </button>
            )}

          </Layout>
        </HashRouter>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
