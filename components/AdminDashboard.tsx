
import React, { useState } from 'react';
import { Program, Notice, SiteConfig, HistoryItem } from '../types';

interface AdminDashboardProps {
  config: SiteConfig;
  setConfig: (config: SiteConfig) => void;
  programs: Program[];
  setPrograms: (programs: Program[]) => void;
  notices: Notice[];
  setNotices: (notices: Notice[]) => void;
  history: HistoryItem[];
  setHistory: (history: HistoryItem[]) => void;
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  config, setConfig, programs, setPrograms, notices, setNotices, history, setHistory, onExit 
}) => {
  const [activeTab, setActiveTab] = useState<'config' | 'programs' | 'history' | 'notices'>('config');

  const updateConfig = (key: keyof SiteConfig, value: string) => {
    setConfig({ ...config, [key]: value });
  };

  const addProgram = () => {
    const newProg: Program = {
      id: Date.now().toString(),
      title: '새 프로그램',
      description: '프로그램 설명을 입력해주세요.',
      category: '분류',
      imageUrl: 'https://picsum.photos/seed/' + Math.random() + '/800/600'
    };
    setPrograms([newProg, ...programs]);
  };

  const addHistory = () => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      year: new Date().getFullYear().toString(),
      event: '새로운 연혁 내용을 입력하세요.'
    };
    setHistory([newItem, ...history]);
  };

  const addNotice = () => {
    const newNotice: Notice = {
      id: Date.now().toString(),
      title: '새 공지사항',
      date: new Date().toISOString().split('T')[0],
      content: ''
    };
    setNotices([newNotice, ...notices]);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-neutral-950">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <button 
            onClick={onExit}
            className="px-6 py-2 rounded-full glass border border-white/20 text-xs font-bold hover:bg-white hover:text-black transition-all"
          >
            대시보드 나가기
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 border-b border-white/10 pb-4">
          {(['config', 'history', 'programs', 'notices'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-bold uppercase tracking-widest px-4 py-2 transition-colors ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-white'}`}
            >
              {tab === 'config' ? '기본 설정' : tab === 'programs' ? '프로그램' : tab === 'history' ? '연혁 관리' : '공지사항'}
            </button>
          ))}
        </div>

        <div className="glass p-8 rounded-3xl">
          {activeTab === 'config' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Logo Name</label>
                <input 
                  type="text" 
                  value={config.logoName}
                  onChange={(e) => updateConfig('logoName', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Hero Title</label>
                <input 
                  type="text" 
                  value={config.heroTitle}
                  onChange={(e) => updateConfig('heroTitle', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Hero Subtitle</label>
                <textarea 
                  value={config.heroSubtitle}
                  onChange={(e) => updateConfig('heroSubtitle', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors h-24"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Primary Theme Color</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="color" 
                    value={config.primaryColor}
                    onChange={(e) => updateConfig('primaryColor', e.target.value)}
                    className="w-12 h-12 rounded-xl bg-transparent border-none cursor-pointer"
                  />
                  <span className="text-sm font-mono text-gray-400">{config.primaryColor}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <button 
                onClick={addHistory}
                className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-500 hover:text-white hover:border-white/30 transition-all font-bold text-sm"
              >
                + 새 연혁 추가
              </button>
              {history.map((item, idx) => (
                <div key={item.id} className="p-6 bg-white/5 rounded-2xl flex flex-col md:flex-row gap-4 items-start">
                  <input 
                    className="bg-transparent font-black text-2xl w-24 focus:outline-none"
                    value={item.year}
                    onChange={(e) => {
                      const newHistory = [...history];
                      newHistory[idx].year = e.target.value;
                      setHistory(newHistory);
                    }}
                  />
                  <textarea 
                    className="bg-transparent text-lg text-gray-300 w-full focus:outline-none h-auto min-h-[50px]"
                    value={item.event}
                    onChange={(e) => {
                      const newHistory = [...history];
                      newHistory[idx].event = e.target.value;
                      setHistory(newHistory);
                    }}
                  />
                  <button 
                    onClick={() => setHistory(history.filter(h => h.id !== item.id))}
                    className="text-red-500 text-xs font-bold whitespace-nowrap"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'programs' && (
            <div className="space-y-4">
              <button 
                onClick={addProgram}
                className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-500 hover:text-white hover:border-white/30 transition-all font-bold text-sm"
              >
                + 새 프로그램 추가
              </button>
              {programs.map((program, idx) => (
                <div key={program.id} className="p-4 bg-white/5 rounded-2xl flex items-start gap-4">
                  <img src={program.imageUrl} className="w-20 h-20 object-cover rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <input 
                      className="bg-transparent font-bold w-full focus:outline-none"
                      value={program.title}
                      onChange={(e) => {
                        const newProgs = [...programs];
                        newProgs[idx].title = e.target.value;
                        setPrograms(newProgs);
                      }}
                    />
                    <textarea 
                      className="bg-transparent text-sm text-gray-400 w-full focus:outline-none h-12"
                      value={program.description}
                      onChange={(e) => {
                        const newProgs = [...programs];
                        newProgs[idx].description = e.target.value;
                        setPrograms(newProgs);
                      }}
                    />
                  </div>
                  <button 
                    onClick={() => setPrograms(programs.filter(p => p.id !== program.id))}
                    className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notices' && (
            <div className="space-y-4">
              <button 
                onClick={addNotice}
                className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-500 hover:text-white hover:border-white/30 transition-all font-bold text-sm"
              >
                + 새 공지사항 작성
              </button>
              {notices.map((notice, idx) => (
                <div key={notice.id} className="p-4 bg-white/5 rounded-2xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <input 
                      className="bg-transparent font-bold flex-1 focus:outline-none"
                      value={notice.title}
                      onChange={(e) => {
                        const newNotices = [...notices];
                        newNotices[idx].title = e.target.value;
                        setNotices(newNotices);
                      }}
                    />
                    <input 
                      type="date"
                      className="bg-transparent text-xs text-gray-500 focus:outline-none"
                      value={notice.date}
                      onChange={(e) => {
                        const newNotices = [...notices];
                        newNotices[idx].date = e.target.value;
                        setNotices(newNotices);
                      }}
                    />
                  </div>
                  <button 
                    onClick={() => setNotices(notices.filter(n => n.id !== notice.id))}
                    className="text-xs text-red-500 self-end"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center text-gray-600 text-xs font-bold uppercase tracking-widest">
          Changes are saved automatically to local storage
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
