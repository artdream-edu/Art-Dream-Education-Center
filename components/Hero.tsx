
import React from 'react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
}

const Hero: React.FC<HeroProps> = ({ config }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <span 
          className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase rounded-full border border-white/10 glass"
          style={{ color: config.primaryColor }}
        >
          Cultural Arts Education Group
        </span>
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
          {config.heroTitle}
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          {config.heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#programs" 
            className="px-10 py-4 rounded-full font-bold text-sm transition-transform hover:scale-105"
            style={{ backgroundColor: config.primaryColor }}
          >
            프로그램 탐색하기
          </a>
          <a 
            href="#about" 
            className="px-10 py-4 rounded-full font-bold text-sm border border-white/20 hover:bg-white/5 transition-all"
          >
            우리의 철학
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
