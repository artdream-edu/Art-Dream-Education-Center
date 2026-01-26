
import React from 'react';
import { HistoryItem } from '../types';

interface HistorySectionProps {
  history: HistoryItem[];
  primaryColor: string;
}

const HistorySection: React.FC<HistorySectionProps> = ({ history, primaryColor }) => {
  // Sort history chronologically (ascending) for "과거순"
  const sortedHistory = [...history].sort((a, b) => parseInt(a.year) - parseInt(b.year));

  return (
    <section id="history" className="py-32 px-6 md:px-12 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-20">
          <h2 className="text-sm font-black tracking-[0.3em] uppercase mb-4" style={{ color: primaryColor }}>
            History
          </h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
            걸어온 길
          </h3>
          <div className="w-12 h-1.5 mt-6 rounded-full" style={{ backgroundColor: primaryColor }}></div>
        </div>

        <div className="space-y-12">
          {sortedHistory.map((item) => (
            <div 
              key={item.id} 
              className="group animate-in"
            >
              <div className="pb-8 border-b border-white/10 group-last:border-none">
                <div className="flex flex-col md:flex-row gap-6 md:gap-20">
                  <div className="shrink-0">
                    <span className="text-4xl md:text-5xl font-black tracking-tighter transition-all duration-300 group-hover:opacity-100 opacity-80" style={{ color: primaryColor }}>
                      {item.year}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="text-base md:text-lg font-medium leading-[1.8] text-gray-300 whitespace-pre-wrap tracking-tight">
                      {item.event}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {history.length === 0 && (
            <div className="py-20 text-gray-600 text-sm font-black uppercase tracking-widest italic text-center border border-dashed border-white/10 rounded-3xl">
              등록된 연혁이 없습니다.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
