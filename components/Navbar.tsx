
import React from 'react';
import { ViewMode, SiteConfig } from '../types';

interface NavbarProps {
  config: SiteConfig;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ config, viewMode, setViewMode }) => {
  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const password = window.prompt('관리자 비밀번호를 입력해주세요.');
    const correctPassword = config.adminPassword || '000000';
    
    if (password === correctPassword) {
      setViewMode('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (password !== null) {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  const navLinks = [
    { name: '소개', href: '#about' },
    { name: '연혁', href: '#history' },
    { name: '사업영역', href: '#programs' },
    { name: '의뢰하기', href: '#request' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] glass border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Desktop & Tablet Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between py-4 md:h-20 gap-4 md:gap-0">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setViewMode('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {config.logoImageUrl ? (
              <img 
                src={config.logoImageUrl} 
                alt={config.logoName} 
                className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
                style={{ objectPosition: config.logoImagePosition || 'center' }}
              />
            ) : (
              <div className="text-xl md:text-2xl font-black tracking-tighter">
                <span style={{ color: config.primaryColor }}>{config.logoName.split(' ')[0]}</span>
                <span className="text-white ml-1">{config.logoName.split(' ')[1] || ''}</span>
              </div>
            )}
          </div>

          {/* Navigation Links - Always Visible */}
          <div className="flex items-center justify-center gap-4 md:gap-10 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[11px] md:text-sm font-bold text-gray-400 hover:text-white transition-all whitespace-nowrap tracking-tighter md:tracking-normal relative group py-1"
              >
                {link.name}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: config.primaryColor }}
                ></span>
              </a>
            ))}
          </div>
          
          {/* Action Button */}
          <div className="flex items-center shrink-0">
            {viewMode === 'admin' ? (
              <button 
                onClick={() => {
                  setViewMode('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 md:px-6 py-2 rounded-full bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl"
              >
                사이트 보기
              </button>
            ) : (
              <button 
                onClick={handleAdminClick}
                className="px-4 md:px-6 py-2 rounded-full bg-white/10 border border-white/20 text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all text-white shadow-lg active:scale-95"
              >
                관리자
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
