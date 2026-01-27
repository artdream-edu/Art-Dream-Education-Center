
import React, { useState } from 'react';
import { ViewMode, SiteConfig } from '../types';

interface NavbarProps {
  config: SiteConfig;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ config, viewMode, setViewMode }) => {
  const [logoClickCount, setLogoClickCount] = useState(0);

  const handleAdminAccess = () => {
    const password = window.prompt('관리자 비밀번호를 입력해주세요.');
    const correctPassword = config.adminPassword || '000000';
    
    if (password === correctPassword) {
      setViewMode('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setLogoClickCount(0);
    } else if (password !== null) {
      alert('비밀번호가 올바르지 않습니다.');
      setLogoClickCount(0);
    }
  };

  const handleLogoClick = () => {
    // 5번 연속 클릭 시 관리자 모드 진입 (숨겨진 기능)
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    if (newCount >= 5) {
      handleAdminAccess();
    } else {
      // 일반적인 로고 클릭 기능: 홈으로 이동
      setViewMode('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // 3초 후 클릭 카운트 초기화 (연속 클릭 방지)
      setTimeout(() => setLogoClickCount(0), 3000);
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
          
          {/* Logo - Hidden Admin Entry via 5 Clicks */}
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={handleLogoClick}
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
          
          {/* Action Button removed for cleaner UI */}
          <div className="hidden md:block w-20"></div> 
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
