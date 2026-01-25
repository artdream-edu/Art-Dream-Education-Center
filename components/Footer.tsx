
import React from 'react';
import { SiteConfig } from '../types';

interface FooterProps {
  config: SiteConfig;
}

const Footer: React.FC<FooterProps> = ({ config }) => {
  return (
    <footer className="py-24 px-6 md:px-12 border-t border-white/5 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-col items-center mb-12">
          <div className="text-3xl font-black tracking-tighter">
            <span style={{ color: config.primaryColor }}>{config.logoName.split(' ')[0]}</span>
            {config.logoName.split(' ')[1] || ''}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="flex flex-col items-center text-sm font-medium text-gray-400 gap-2">
            <span>경기도 하남시 미사강변한강로 135, 다동 9층 938호 (미사강변 스카이폴리스)</span>
          </div>
          
          <div className="flex gap-6 mt-4">
            <a href="https://www.instagram.com/artdream_edu?igsh=MWt0ajNtcWlmZXNhcw==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:scale-110 transition-transform">
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259 0 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://youtube.com/@artdream_edu?si=wkNCpA0cWUbmj10q" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:scale-110 transition-transform">
              <span className="sr-only">YouTube</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
            <a href="https://blog.naver.com/artdream_official" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:scale-110 transition-transform">
              <span className="sr-only">Blog</span>
              <div className="w-5 h-5 text-gray-400 font-black text-xs flex items-center justify-center">B</div>
            </a>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col items-center gap-4">
          <div className="text-[10px] font-black tracking-widest text-gray-700 uppercase">
            © 2025 ART DREAM EDUCATION CENTER. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
