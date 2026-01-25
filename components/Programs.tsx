
import React from 'react';
import { Program } from '../types';

interface ProgramsProps {
  programs: Program[];
  primaryColor: string;
}

const Programs: React.FC<ProgramsProps> = ({ programs, primaryColor }) => {
  return (
    <section id="programs" className="py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-black tracking-widest uppercase mb-4" style={{ color: primaryColor }}>
              Business Areas
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold">
              주요 사업 영역
            </h3>
          </div>
          <div className="text-gray-500 text-sm font-medium tracking-wide">
            EXPLORE OUR MISSION & PROJECTS
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((program) => (
            <div key={program.id} className="group relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-neutral-900 border border-white/5 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-15px_rgba(139,92,246,0.4)]">
                <img 
                  src={program.imageUrl} 
                  alt={program.title} 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 bg-white/10 backdrop-blur-md"
                    style={{ color: primaryColor }}
                  >
                    {program.category}
                  </span>
                  <h4 className="text-2xl font-bold text-white group-hover:text-white transition-colors">
                    {program.title}
                  </h4>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed px-1">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
