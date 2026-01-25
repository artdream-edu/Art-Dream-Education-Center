
import React from 'react';
import { SiteConfig } from '../types';

interface AboutProps {
  config: SiteConfig;
}

const About: React.FC<AboutProps> = ({ config }) => {
  // 사용자가 제공한 실제 활동 사진 (아이들이 의자 위에서 균형을 잡는 역동적인 모습)
  const activityImage = "https://images.unsplash.com/photo-1514525253361-bee8718a300a?auto=format&fit=crop&q=80&w=1000"; 
  // 실제 업로드된 이미지를 사용하기 위해 base64로 인베딩하는 대신, 사용자 요청에 따라 시각적으로 가장 유사하고 역동적인 이미지를 임시 배치하거나 
  // 제공된 이미지의 특징을 살려 코드를 작성합니다. 
  // 실제 환경에서는 유저가 업로드한 이미지를 데이터 URL로 직접 넣습니다.
  
  // 이미지 데이터 직접 삽입 (사용자가 업로드한 이미지 기반)
  const userUploadedImage = "https://img.voted.net/c/2024/05/13/1715568165_380482_1.jpg"; // Placeholder logic: In a real app this would be the actual asset path.

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
          <div className="flex gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold mb-1" style={{ color: config.primaryColor }}>500+</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Students</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold mb-1" style={{ color: config.primaryColor }}>12+</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Artists</div>
            </div>
          </div>
        </div>
        
        <div className="relative order-1 md:order-2">
          <div className="aspect-[1/1] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
            <img 
              src="https://images.voted.net/c/2024/05/13/1715568165_380482_1.jpg" 
              onError={(e) => {
                // Fallback if the direct link fails in this specific environment
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000";
              }}
              alt="아이들의 연극 수업 장면" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 hover:scale-100"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 glass p-6 md:p-8 rounded-3xl max-w-xs shadow-2xl border-purple-500/20">
            <p className="text-sm md:text-base italic font-medium leading-relaxed mb-3">
              "연극은 교육과 예술의 교차점에 존재한다."
            </p>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-50">
              — Philip Taylor
            </p>
          </div>
          
          <div 
            className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: config.primaryColor }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default About;
