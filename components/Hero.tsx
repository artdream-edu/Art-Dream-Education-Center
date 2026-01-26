
import React from 'react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
}

const Hero: React.FC<HeroProps> = ({ config }) => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center px-6 pt-20 overflow-hidden bg-black">
      {/* Background Image Layer */}
      {config.heroImageUrl && (
        <div className="absolute inset-0 z-0">
          <img 
            src={config.heroImageUrl} 
            className="w-full h-full object-cover opacity-40 grayscale"
            style={{ objectPosition: config.heroImagePosition || 'center' }}
            alt="Hero Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black"></div>
        </div>
      )}

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <span 
          className="inline-block px-5 py-2 mb-8 text-[10px] font-black tracking-[0.4em] uppercase rounded-full border border-white/10 glass shadow-2xl"
          style={{ color: config.primaryColor }}
        >
          Art Dream Education Center
        </span>
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight drop-shadow-2xl whitespace-pre-wrap">
          {config.heroTitle}
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium whitespace-pre-wrap">
          {config.heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#request" 
            className="px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl"
            style={{ backgroundColor: config.primaryColor }}
          >
            지금 바로 의뢰하기
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
