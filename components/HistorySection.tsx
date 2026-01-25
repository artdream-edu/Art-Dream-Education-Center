
import React from 'react';
import { HistoryItem } from '../types';

interface HistorySectionProps {
  history: HistoryItem[];
  primaryColor: string;
}

const HistorySection: React.FC<HistorySectionProps> = ({ history, primaryColor }) => {
  return (
    <section id="history" className="py-24 px-6 md:px-12 bg-black overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h2 className="text-sm font-black tracking-widest uppercase mb-4" style={{ color: primaryColor }}>
            History
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold">
            걸어온 길
          </h3>
        </div>

        <div className="relative pl-8 md:pl-12">
          {/* Vertical Line - Left Aligned */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-px bg-white/10"
          ></div>

          <div className="space-y-16">
            {history.map((item) => (
              <div 
                key={item.id} 
                className="relative"
              >
                {/* Connector Dot */}
                <div 
                  className="absolute -left-8 md:-left-12 top-4 w-3 h-3 rounded-full -translate-x-1/2 z-10"
                  style={{ backgroundColor: primaryColor, boxShadow: `0 0 15px ${primaryColor}` }}
                ></div>

                {/* Content Card */}
                <div className="group">
                  <div className="glass p-8 rounded-3xl border border-white/5 group-hover:border-white/20 transition-all duration-500 max-w-2xl">
                    <span className="text-3xl font-black mb-4 block" style={{ color: primaryColor }}>
                      {item.year}
                    </span>
                    <p className="text-sm md:text-base font-medium leading-relaxed text-gray-300 whitespace-pre-wrap">
                      {item.event}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {history.length === 0 && (
            <div className="py-10 text-gray-600 text-sm font-medium uppercase tracking-widest italic">
              등록된 연혁이 없습니다.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
