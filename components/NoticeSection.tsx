
import React from 'react';
import { Notice } from '../types';

interface NoticeSectionProps {
  notices: Notice[];
  primaryColor: string;
}

const NoticeSection: React.FC<NoticeSectionProps> = ({ notices, primaryColor }) => {
  return (
    <section id="notices" className="py-24 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-black tracking-widest uppercase mb-4" style={{ color: primaryColor }}>
          Notice
        </h2>
        <div className="divide-y divide-white/10">
          {notices.map((notice) => (
            <div key={notice.id} className="py-8 group cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <span className="text-xs text-gray-600 mb-2 block font-medium tracking-widest">
                  {notice.date}
                </span>
                <h4 className="text-xl md:text-2xl font-bold group-hover:translate-x-2 transition-transform duration-300">
                  {notice.title}
                </h4>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                Read More
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoticeSection;
