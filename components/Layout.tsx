import React from 'react';
import Logo from './Logo';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh-TW' : 'en');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col relative text-gray-300 selection:bg-white selection:text-black">
      
      {/* Global Header / Logo */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-8">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-xs font-mono tracking-wider">
             <Link 
               to="/products" 
               className={`hover:text-green-500 transition-colors ${isActive('/products') ? 'text-green-500 decoration-green-500 underline underline-offset-4' : 'text-gray-500'}`}
             >
               {`[ ${t.nav.products} ]`}
             </Link>
             <Link 
               to="/insights" 
               className={`hover:text-green-500 transition-colors ${isActive('/insights') ? 'text-green-500 decoration-green-500 underline underline-offset-4' : 'text-gray-500'}`}
             >
               {`[ INSIGHTS ]`}
             </Link>
             <Link 
               to="/evolution" 
               className={`hover:text-green-500 transition-colors ${isActive('/evolution') ? 'text-green-500 decoration-green-500 underline underline-offset-4' : 'text-gray-500'}`}
             >
               {`[ ${t.nav.logs} ]`}
             </Link>
          </nav>
        </div>
        
        <div className="pointer-events-auto flex items-center gap-4">
          {/* Mobile Nav Link (Simplified) */}
           <Link 
             to="/products" 
             className="md:hidden text-xs text-gray-400 hover:text-white"
           >
             {t.nav.products}
           </Link>
           <Link 
             to="/insights" 
             className="md:hidden text-xs text-gray-400 hover:text-white"
           >
             INSIGHTS
           </Link>

          <button 
            onClick={toggleLanguage}
            className="text-xs font-mono border border-white/20 bg-black/50 backdrop-blur-sm px-3 py-1.5 hover:bg-white/10 hover:border-green-500 transition-all text-gray-400 hover:text-green-500"
          >
            [{language === 'en' ? 'EN' : '繁'}]
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col z-10">
        {children}
      </main>

      {/* Footer / Server Status Bar */}
      <footer className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-md border-t border-white/10 text-xs py-2 px-4 z-50 flex justify-between items-center font-mono tracking-wider">
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-2 text-green-500">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             {t.footer.lifeSigns}
          </span>
          <span className="hidden md:inline text-gray-500">{t.footer.load}</span>
        </div>
        
        <div className="hidden md:block text-gray-500">
          {t.footer.location}
        </div>

        <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-6">
          <div className="text-gray-500 text-[10px] md:text-xs text-right md:text-left max-w-[200px] md:max-w-none">
            {t.footer.address}
          </div>
          <a href="mailto:sammiyang@astrai.tech" className="text-gray-500 hover:text-green-500 transition-colors">
            {t.footer.contact}
          </a>
          <div className="text-gray-600">
            {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;