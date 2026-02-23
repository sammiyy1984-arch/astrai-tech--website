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
               to="/blog" 
               className={`hover:text-green-500 transition-colors ${isActive('/blog') ? 'text-green-500 decoration-green-500 underline underline-offset-4' : 'text-gray-500'}`}
             >
               {`[ ${t.nav.blog} ]`}
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
             to="/blog" 
             className="md:hidden text-xs text-gray-400 hover:text-white"
           >
             {t.nav.blog}
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
      <footer className="w-full bg-black/90 backdrop-blur-md border-t border-white/10 text-xs z-50 font-mono tracking-wider relative md:fixed md:bottom-0 md:left-0 flex flex-col md:flex-row justify-between items-start md:items-center p-8 md:py-2 md:px-4 gap-6 md:gap-0">
        
        {/* Left Section: Status */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center w-full md:w-auto">
          <div className="flex items-center justify-between w-full md:w-auto">
            <span className="flex items-center gap-2 text-green-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {t.footer.lifeSigns}
            </span>
          </div>
          <span className="text-gray-500">{t.footer.load}</span>
        </div>
        
        {/* Right Section: Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full md:w-auto">
          <div className="flex flex-row items-center gap-6 w-full md:w-auto justify-between md:justify-start border-t border-white/10 pt-4 md:border-0 md:pt-0 mt-2 md:mt-0">
            <a href="mailto:sammiyang@astrai.tech" className="text-gray-500 hover:text-green-500 transition-colors">
              {t.footer.contact}
            </a>
            <div className="text-gray-600 whitespace-nowrap">
              {t.footer.copyright}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;