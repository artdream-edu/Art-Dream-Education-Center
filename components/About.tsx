
import React from 'react';
import { SiteConfig } from '../types';

interface AboutProps {
  config: SiteConfig;
}

const About: React.FC<AboutProps> = ({ config }) => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-sm font-black tracking-widest uppercase mb-4" style={{ color: config.primaryColor }}>
            Philosophy
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            우리는 가장 예술적인 것이 가장 교육적이라고 믿습니다.
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-6 whitespace-pre-wrap">
            {config.aboutText}
          </p>
        </div>
        
        <div className="relative order-1 md:order-2">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-neutral-900 group">
            <img 
              src={config.aboutImageUrl} 
              alt="Nature and Children" 
              className="w-full h-full object-cover transition-all duration-1000 ease-in-out brightness-100 group-hover:brightness-110 group-hover:scale-105"
              style={{ objectPosition: config.aboutImagePosition || 'center' }}
              referrerPolicy="no-referrer"
            />
            {/* 활기찬 분위기를 위해 brightness 필터를 제거하고 선명한 상태로 유지 */}
          </div>
          <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 glass p-6 md:p-8 rounded-3xl max-w-xs border-l-4" style={{ borderColor: config.primaryColor }}>
            <p className="text-sm italic font-medium leading-relaxed mb-3">"연극은 교육과 예술의 교차점에 존재한다."</p>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">— Philip Taylor</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
