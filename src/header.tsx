import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false); // Close menu after switching language
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure scrolling is restored if the component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between bg-transparent p-6 md:px-12 backdrop-saturate-125">
        <Link to="/" className="hover:opacity-80 transition-opacity p-1 rounded-md">
          <img
            src={"./imgs/logo.png"}
            alt="Tibet Airlines Virtual"
            className="h-20 md:h-20 w-auto"
          />
        </Link>

        <div className="flex items-center px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10 text-slate-50">
          {/* Desktop Nav */}
          <div className='hidden md:flex gap-4 items-center text-sm font-medium'>
            <button onClick={() => changeLanguage('zh')} className={`hover:opacity-100 transition-opacity ${i18n.language === 'zh' ? 'opacity-100' : 'opacity-50'}`}>中文</button>
            <span className="opacity-30">|</span>
            <button onClick={() => changeLanguage('en')} className={`hover:opacity-100 transition-opacity ${i18n.language === 'en' ? 'opacity-100' : 'opacity-50'}`}>EN</button>
            <span className="opacity-30">|</span>
            <button className="text-white opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => window.open("")}
            >{/* TODO */}
              {t("app.login")}
            </button>
          </div>

          {/* Burger Icon (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none"
          >
            {/* Animated Hamburger to X */}
            <span className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
            <span className={`block absolute h-0.5 w-6 bg-white transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-brand-white/95 backdrop-blur-xl transition-all duration-500 ease-in-out lg:hidden flex flex-col items-center justify-center ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center gap-8 text-white text-3xl font-bold tracking-tight">
          {/* Standard Links */}
          <a href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-red transition-colors">
            {t("Home") || "Home"}
          </a>
          <a href="/privacy" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-red transition-colors">
            {t("Privacy") || "Privacy"}
          </a>

          {/* Language Switch */}
          <div className="flex gap-4 items-center text-xl">
            <button onClick={() => { changeLanguage('zh'); }} className={`hover:opacity-100 transition-opacity ${i18n.language === 'zh' ? 'opacity-100' : 'opacity-60'}`}>中文</button>
            <span className="opacity-30">|</span>
            <button onClick={() => { changeLanguage('en'); }} className={`hover:opacity-100 transition-opacity ${i18n.language === 'en' ? 'opacity-100' : 'opacity-60'}`}>EN</button>
          </div>

          {/* Login / Action */}
          <button className="mt-4 px-6 py-2 rounded-full bg-white text-black font-semibold" onClick={() => { setIsMenuOpen(false); window.open(''); }}>
            {t("app.login")}
          </button>
        </nav>
      </div>

    </>
  );
};

export default Header;
