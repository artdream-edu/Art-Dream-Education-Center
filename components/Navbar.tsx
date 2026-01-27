import React, { useState, useRef } from 'react';
import { ViewMode, SiteConfig } from '../types';

interface NavbarProps {
  config: SiteConfig;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ config, viewMode, setViewMode }) => {
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // 이미 관리자 모드라면 홈으로 이동
    if (viewMode === 'admin') {
      setViewMode('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 클릭 횟수 카운트 (3초 내 5회 클릭)
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      setClickCount(0);
    }, 3000);

    // 5번 클릭 시 관리자 인증
    if (newCount >= 5) {
      setClickCount(0);
      if (clickTimer.current) clearTimeout(clickTimer.current);
      
      const password = window.prompt('관리자 비밀번호를 입력해주세요.');
      const correctPassword = config.adminPassword || 'dPtnfRna153';
      
      if (password === correctPassword) {
        setViewMode('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (password !== null) {
        alert('비밀번호가 올바르지 않습니다.');
      }
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
        <div className="flex flex-col md:flex-row items-center justify-between py-4 md:h-20 gap-4 md:gap-0">
          
          {/* Logo with Hidden Admin Trigger */}
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={handleLogoClick}
            title={viewMode === 'admin' ? "홈으로 돌아가기" : ""}
          >
            {config.logoImageUrl ? (
              <img 
                src={config.logoImageUrl} 
                alt={config.logoName} 
                className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
                style={{ objectPosition: config.logoImagePosition || 'center' }}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-xl md:text-2xl font-black tracking-tighter">
                <span style={{ color: config.primaryColor }}>{config.logoName.split(' ')[0]}</span>
                <span className="text-white ml-1">{config.logoName.split(' ')[1] || ''}</span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-center gap-6 md:gap-10 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[11px] md:text-sm font-bold text-gray-400 hover:text-white transition-all whitespace-nowrap tracking-widest relative group py-1 uppercase"
              >
                {link.name}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: config.primaryColor }}
                ></span>
              </a>
            ))}
          </div>
          
          {/* Action Area (Admin exit only) */}
          <div className="flex items-center shrink-0 min-w-[100px] justify-end">
            {viewMode === 'admin' && (
              <button 
                onClick={() => {
                  setViewMode('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 md:px-6 py-2 rounded-full bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl"
              >
                편집 종료
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