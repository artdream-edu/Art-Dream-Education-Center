
import React, { useRef } from 'react';
import { Program, SiteConfig, HistoryItem } from '../types';

interface AdminDashboardProps {
  config: SiteConfig;
  setConfig: (config: SiteConfig) => void;
  programs: Program[];
  setPrograms: (programs: Program[]) => void;
  history: HistoryItem[];
  setHistory: (history: HistoryItem[]) => void;
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  config, setConfig, programs, setPrograms, history, setHistory, onExit 
}) => {
  const [activeTab, setActiveTab] = React.useState<'config' | 'programs' | 'history'>('config');
  
  const fileRefs = {
    logo: useRef<HTMLInputElement>(null),
    hero: useRef<HTMLInputElement>(null),
    about: useRef<HTMLInputElement>(null),
  };
  const progFileRefs = useRef<{[key: string]: HTMLInputElement | null}>({});

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (key: keyof SiteConfig, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setConfig({...config, [key]: base64});
    }
  };

  const handleProgImageUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setPrograms(programs.map(p => p.id === id ? {...p, imageUrl: base64} : p));
    }
  };

  const updateConfig = (key: keyof SiteConfig, value: string) => {
    setConfig({ ...config, [key]: value });
  };

  const POSITION_OPTIONS = [
    { label: 'Center (중앙)', value: 'center' },
    { label: 'Top (상단)', value: 'top' },
    { label: 'Bottom (하단)', value: 'bottom' },
    { label: 'Left (좌측)', value: 'left' },
    { label: 'Right (우측)', value: 'right' },
  ];

  const ImageControl = ({ label, imageUrl, positionValue, onImageClick, onPositionChange, aspect = "aspect-video" }: any) => (
    <div className="space-y-4 p-5 rounded-3xl bg-white/5 border border-white/10 group transition-all hover:bg-white/[0.07]">
      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{label}</label>
      <div className="flex flex-col md:flex-row gap-6">
        <div className={`w-full md:w-56 ${aspect} rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 group cursor-pointer relative shadow-xl`} onClick={onImageClick}>
          {imageUrl ? (
            <img src={imageUrl} className="w-full h-full object-cover transition-opacity group-hover:opacity-40" style={{ objectPosition: positionValue || 'center' }} alt="Preview" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-700 text-[10px] font-bold uppercase tracking-widest">No Image</div>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-white text-black px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl scale-90 group-hover:scale-100 transition-transform">파일 업로드</span>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-[9px] font-black uppercase tracking-widest text-gray-600 mb-2">이미지 초점 정렬</label>
            <select 
              value={positionValue || 'center'} 
              onChange={(e) => onPositionChange(e.target.value)}
              className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:border-purple-500 transition-all appearance-none cursor-pointer"
            >
              {POSITION_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <p className="text-[10px] text-gray-600 leading-relaxed">이미지가 프레임보다 클 경우, 보여질 핵심 부위를 설정합니다.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-32 px-6 md:px-12 bg-neutral-950">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Admin Dashboard</h2>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">예술꿈학교 웹사이트 관리 시스템</p>
          </div>
          <button onClick={onExit} className="px-8 py-3 rounded-full glass border border-white/20 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl">대시보드 나가기</button>
        </div>

        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/10 pb-4 overflow-x-auto whitespace-nowrap">
          {(['config', 'programs', 'history'] as const).map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`text-[11px] font-black uppercase tracking-widest px-6 py-3 transition-all rounded-t-xl ${activeTab === tab ? 'text-white bg-white/10' : 'text-gray-500 hover:text-white'}`}
            >
              {tab === 'config' ? '기본 설정' : tab === 'programs' ? '사업 영역' : '연혁'}
            </button>
          ))}
        </div>

        <div className="space-y-12 animate-in fade-in">
          {activeTab === 'config' && (
            <div className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="p-2 border-b border-white/10 pb-4">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-purple-500 mb-2">Identity (단체명)</label>
                    <input type="text" value={config.logoName} onChange={(e) => updateConfig('logoName', e.target.value)} className="w-full bg-transparent text-xl font-bold outline-none placeholder:text-gray-700" />
                  </div>
                  <div className="p-2 border-b border-white/10 pb-4">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-purple-500 mb-2">Admin Password (관리자 비밀번호)</label>
                    <input type="password" value={config.adminPassword || ''} onChange={(e) => updateConfig('adminPassword', e.target.value)} className="w-full bg-transparent text-xl font-bold outline-none placeholder:text-gray-700" placeholder="비밀번호 설정" />
                    <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-tighter">관리자 모드 진입 시 사용되는 비밀번호입니다.</p>
                  </div>
                  <ImageControl label="상단 내비게이션 로고 이미지" imageUrl={config.logoImageUrl} positionValue={config.logoImagePosition} onImageClick={() => fileRefs.logo.current?.click()} onPositionChange={(val: any) => updateConfig('logoImagePosition', val)} aspect="aspect-square" />
                  <input type="file" ref={fileRefs.logo} className="hidden" accept="image/*" onChange={(e) => handleImageUpload('logoImageUrl', e)} />
                </div>
                <div className="space-y-8">
                   <div className="p-2 border-b border-white/10 pb-4">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-purple-500 mb-2">Hero Section Title</label>
                    <input type="text" value={config.heroTitle} onChange={(e) => updateConfig('heroTitle', e.target.value)} className="w-full bg-transparent text-xl font-bold outline-none placeholder:text-gray-700" />
                  </div>
                  <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Hero Background</p>
                    <p className="text-xs text-gray-400">현재 요청에 의해 Pure Black 배경으로 설정되어 있습니다.</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/5 pt-12">
                <h3 className="text-xl font-black mb-10 uppercase tracking-widest">About Section (철학 소개)</h3>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">본문 텍스트</label>
                    <textarea value={config.aboutText} onChange={(e) => updateConfig('aboutText', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-6 h-64 outline-none focus:border-purple-500 text-gray-300 leading-relaxed" />
                  </div>
                  <div className="space-y-4">
                    <ImageControl label="소개 섹션 대표 사진" imageUrl={config.aboutImageUrl} positionValue={config.aboutImagePosition} onImageClick={() => fileRefs.about.current?.click()} onPositionChange={(val: any) => updateConfig('aboutImagePosition', val)} aspect="aspect-[4/5]" />
                    <input type="file" ref={fileRefs.about} className="hidden" accept="image/*" onChange={(e) => handleImageUpload('aboutImageUrl', e)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'programs' && (
            <div className="space-y-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black uppercase tracking-widest">사업 영역 및 프로그램 관리</h3>
                <button onClick={() => { setPrograms([{ id: Date.now().toString(), title: '새 프로그램', description: '', category: '카테고리', imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee8718a300a?auto=format&fit=crop&q=80&w=800', imagePosition: 'center' }, ...programs]); }} className="px-8 py-3 rounded-full bg-purple-600 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-purple-900/20">+ 항목 추가</button>
              </div>
              <div className="grid gap-10">
                {programs.map((program, idx) => (
                  <div key={program.id} className="p-8 bg-white/5 rounded-[2rem] border border-white/10 space-y-8 relative group hover:border-white/20 transition-all shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="w-full md:w-64">
                        <ImageControl 
                          label="프로그램 이미지" 
                          imageUrl={program.imageUrl} 
                          positionValue={program.imagePosition} 
                          onImageClick={() => progFileRefs.current[program.id]?.click()} 
                          onPositionChange={(val: any) => { const n = [...programs]; n[idx].imagePosition = val; setPrograms(n); }} 
                          aspect="aspect-[4/3]" 
                        />
                        <input 
                          type="file" 
                          ref={el => { progFileRefs.current[program.id] = el; }} 
                          className="hidden" 
                          accept="image/*" 
                          onChange={(e) => handleProgImageUpload(program.id, e)} 
                        />
                      </div>
                      <div className="flex-1 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <input className="bg-transparent font-bold text-2xl w-full outline-none border-b border-white/10 pb-2 focus:border-purple-500 transition-all" placeholder="사업명" value={program.title} onChange={(e) => { const n = [...programs]; n[idx].title = e.target.value; setPrograms(n); }} />
                          <input className="bg-transparent text-xs font-black uppercase text-purple-400 w-full outline-none border-b border-white/10 pb-2 focus:border-purple-400 transition-all" placeholder="분류" value={program.category} onChange={(e) => { const n = [...programs]; n[idx].category = e.target.value; setPrograms(n); }} />
                        </div>
                        <textarea className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-gray-400 w-full h-32 outline-none focus:border-purple-500 transition-all" placeholder="설명" value={program.description} onChange={(e) => { const n = [...programs]; n[idx].description = e.target.value; setPrograms(n); }} />
                      </div>
                      <button onClick={() => setPrograms(programs.filter(p => p.id !== program.id))} className="absolute top-6 right-8 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all">삭제</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black uppercase tracking-widest">연혁 관리</h3>
                <button onClick={() => setHistory([{id: Date.now().toString(), year: '2025', event: ''}, ...history])} className="px-8 py-3 rounded-full bg-purple-600 text-[10px] font-black uppercase tracking-widest">+ 추가</button>
              </div>
              {history.map((h, i) => (
                <div key={h.id} className="flex gap-8 p-8 bg-white/5 rounded-3xl border border-white/5 group hover:border-white/20 transition-all">
                  <input className="bg-transparent font-black text-4xl w-24 outline-none border-b border-white/10 group-focus-within:border-purple-500 transition-all" value={h.year} onChange={e => { let n = [...history]; n[i].year = e.target.value; setHistory(n); }} />
                  <textarea className="bg-transparent text-gray-300 flex-1 h-32 outline-none resize-none leading-relaxed" placeholder="내용..." value={h.event} onChange={e => { let n = [...history]; n[i].event = e.target.value; setHistory(n); }} />
                  <button type="button" onClick={() => setHistory(history.filter(it => it.id !== h.id))} className="text-red-500 text-[10px] font-black uppercase self-start mt-4 opacity-50 hover:opacity-100">삭제</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
