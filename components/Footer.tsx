
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
          <div className="flex flex-col items-center text-sm font-medium text-gray-400 gap-2 text-center max-w-lg">
            <span>{config.footerAddress}</span>
          </div>
          
          <div className="flex gap-6 mt-4">
            {config.instagramUrl && (
              <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:scale-110 transition-transform text-white group">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            )}
            {config.youtubeUrl && (
              <a href={config.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:scale-110 transition-transform text-white group">
                <span className="sr-only">YouTube</span>
                <svg className="w-6 h-6 group-hover:text-red-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            )}
            {config.blogUrl && (
              <a href={config.blogUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:scale-110 transition-transform text-white group">
                <span className="sr-only">Blog</span>
                <div className="font-black text-[10px] tracking-tighter group-hover:text-green-400 transition-colors uppercase">Blog</div>
              </a>
            )}
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col items-center gap-4">
          <div className="text-[10px] font-black tracking-widest text-gray-700 uppercase">
            © 2025 {config.logoName.toUpperCase()}. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
