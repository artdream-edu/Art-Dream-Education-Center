
import React from 'react';
import { ViewMode, SiteConfig } from '../types';

interface NavbarProps {
  config: SiteConfig;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ config, viewMode, setViewMode }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass h-20 flex items-center justify-between px-6 md:px-12">
      <div 
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setViewMode('home')}
      >
        {config.logoImageUrl ? (
          <img 
            src={config.logoImageUrl} 
            alt={config.logoName} 
            className="h-10 w-auto object-contain"
            style={{ objectPosition: config.logoImagePosition || 'center' }}
          />
        ) : (
          <div className="text-2xl font-black tracking-tighter">
            <span style={{ color: config.primaryColor }}>{config.logoName.split(' ')[0]}</span>
            {config.logoName.split(' ')[1] || ''}
          </div>
        )}
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-400">
          <a href="#about" className="hover:text-white transition-colors">소개</a>
          <a href="#history" className="hover:text-white transition-colors">연혁</a>
          <a href="#programs" className="hover:text-white transition-colors">사업영역</a>
          <a href="#request" className="hover:text-white transition-colors">의뢰하기</a>
        </div>
        
        <button 
          onClick={() => setViewMode(viewMode === 'admin' ? 'home' : 'admin')}
          className="px-5 py-2 rounded-full border border-white/20 text-xs font-bold hover:bg-white hover:text-black transition-all"
        >
          {viewMode === 'admin' ? '사이트 보기' : '관리자'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
