
import React from 'react';
import { HistoryItem } from '../types';

interface HistorySectionProps {
  history: HistoryItem[];
  primaryColor: string;
}

const HistorySection: React.FC<HistorySectionProps> = ({ history, primaryColor }) => {
  return (
    <section id="history" className="py-24 px-6 md:px-12 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-sm font-black tracking-widest uppercase mb-4" style={{ color: primaryColor }}>
            History
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold">
            걸어온 길
          </h3>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"
          ></div>

          <div className="space-y-12 md:space-y-24">
            {history.map((item, index) => (
              <div 
                key={item.id} 
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Connector Dot */}
                <div 
                  className="absolute left-0 md:left-1/2 top-2 md:top-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block"
                  style={{ backgroundColor: primaryColor, boxShadow: `0 0 15px ${primaryColor}` }}
                ></div>

                {/* Content Card */}
                <div className="w-full md:w-[42%] group">
                  <div className="glass p-8 rounded-3xl border border-white/5 group-hover:border-white/20 transition-all duration-500">
                    <span className="text-3xl font-black mb-4 block" style={{ color: primaryColor }}>
                      {item.year}
                    </span>
                    <p className="text-sm md:text-base font-medium leading-relaxed text-gray-300 whitespace-pre-wrap">
                      {item.event}
                    </p>
                  </div>
                </div>

                {/* Spacer for Mobile Alignment */}
                <div className="hidden md:block w-[42%]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
