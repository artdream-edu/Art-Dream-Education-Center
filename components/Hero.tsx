
import React from 'react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
}

const Hero: React.FC<HeroProps> = ({ config }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Background Image */}
      {config.heroImageUrl && (
        <div className="absolute inset-0 z-0">
          <img 
            src={config.heroImageUrl} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
            style={{ objectPosition: config.heroImagePosition || 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black"></div>
        </div>
      )}
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <span 
          className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase rounded-full border border-white/10 glass shadow-2xl"
          style={{ color: config.primaryColor }}
        >
          Cultural Arts Education Group
        </span>
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
          {config.heroTitle}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          {config.heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#programs" 
            className="px-10 py-4 rounded-full font-bold text-sm transition-transform hover:scale-105 shadow-xl"
            style={{ backgroundColor: config.primaryColor }}
          >
            프로그램 탐색하기
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
