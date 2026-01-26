
import React, { useRef, useState } from 'react';
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
  const [saveMessage, setSaveMessage] = useState('');
  
  const fileRefs = {
    logo: useRef<HTMLInputElement>(null),
    hero: useRef<HTMLInputElement>(null),
    about: useRef<HTMLInputElement>(null),
    import: useRef<HTMLInputElement>(null),
  };
  const progFileRefs = useRef<{[key: string]: HTMLInputElement | null}>({});

  const showFeedback = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(''), 2000);
  };

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
      showFeedback('이미지 업로드 완료');
    }
  };

  const handleProgImageUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setPrograms(programs.map(p => p.id === id ? {...p, imageUrl: base64} : p));
      showFeedback('이미지 수정 완료');
    }
  };

  const exportData = () => {
    const data = { config, programs, history };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `artdream_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showFeedback('백업 파일 다운로드됨');
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (data.config) setConfig(data.config);
          if (data.programs) setPrograms(data.programs);
          if (data.history) setHistory(data.history);
          showFeedback('데이터를 성공적으로 불러왔습니다');
        } catch (err) {
          alert('올바르지 않은 백업 파일입니다.');
        }
      };
      reader.readAsText(e.target.files[0]);
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

  const InputField = ({ label, value, onChange, type = "text", placeholder = "" }: any) => (
    <div className="space-y-2">
      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">{label}</label>
      <input 
        type={type} 
        value={value || ''} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition-all font-bold text-white shadow-inner"
      />
    </div>
  );

  const ImageControl = ({ label, imageUrl, positionValue, onImageClick, onPositionChange, aspect = "aspect-video" }: any) => (
    <div className="space-y-4 p-6 rounded-3xl bg-white/5 border border-white/10 group transition-all hover:bg-white/[0.08] shadow-2xl">
      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{label}</label>
      <div className="flex flex-col md:flex-row gap-8">
        <div className={`w-full md:w-64 ${aspect} rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 group cursor-pointer relative shadow-2xl`} onClick={onImageClick}>
          {imageUrl ? (
            <img src={imageUrl} className="w-full h-full object-cover transition-opacity group-hover:opacity-40" style={{ objectPosition: positionValue || 'center' }} alt="Preview" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-700 text-[10px] font-bold uppercase tracking-widest">No Image</div>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl scale-90 group-hover:scale-100 transition-transform">변경하기</span>
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
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-32 px-6 md:px-12 bg-neutral-950">
      {saveMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-purple-600 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl animate-in slide-in-from-top-4">
          {saveMessage}
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Editor Mode</h2>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">실시간 사이트 관리자</p>
          </div>
          <div className="flex gap-4">
            <button onClick={exportData} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">백업 저장</button>
            <button onClick={() => fileRefs.import.current?.click()} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">백업 불러오기</button>
            <button onClick={onExit} className="px-8 py-3 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl active:scale-95">편집 종료</button>
            <input type="file" ref={fileRefs.import} className="hidden" accept=".json" onChange={importData} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/10 pb-4">
          {(['config', 'programs', 'history'] as const).map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`text-[11px] font-black uppercase tracking-widest px-8 py-4 transition-all rounded-t-2xl ${activeTab === tab ? 'text-white bg-white/10' : 'text-gray-500 hover:text-white'}`}
            >
              {tab === 'config' ? '브랜드' : tab === 'programs' ? '사업 영역' : '연혁'}
            </button>
          ))}
        </div>

        <div className="space-y-16 animate-in fade-in duration-500">
          {activeTab === 'config' && (
            <div className="grid gap-20">
              <section className="space-y-10">
                <h3 className="text-xl font-black uppercase tracking-widest border-l-4 border-purple-500 pl-5">브랜드 아이덴티티</h3>
                <div className="grid md:grid-cols-2 gap-10">
                  <InputField label="단체명 (로고 텍스트)" value={config.logoName} onChange={(val: string) => updateConfig('logoName', val)} />
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">브랜드 포인트 색상</label>
                    <div className="flex gap-4 items-center">
                      <input type="color" value={config.primaryColor} onChange={(e) => updateConfig('primaryColor', e.target.value)} className="w-14 h-14 bg-transparent border-none cursor-pointer rounded-xl overflow-hidden" />
                      <input type="text" value={config.primaryColor} onChange={(e) => updateConfig('primaryColor', e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 font-mono text-xs uppercase" />
                    </div>
                  </div>
                  <InputField label="관리자 비밀번호" type="text" value={config.adminPassword} onChange={(val: string) => updateConfig('adminPassword', val)} />
                  <ImageControl label="상단 로고 이미지" imageUrl={config.logoImageUrl} positionValue={config.logoImagePosition} onImageClick={() => fileRefs.logo.current?.click()} onPositionChange={(val: any) => updateConfig('logoImagePosition', val)} aspect="aspect-square" />
                  <input type="file" ref={fileRefs.logo} className="hidden" accept="image/*" onChange={(e) => handleImageUpload('logoImageUrl', e)} />
                </div>
              </section>

              <section className="space-y-10 pt-10 border-t border-white/5">
                <h3 className="text-xl font-black uppercase tracking-widest border-l-4 border-purple-500 pl-5">메인 및 하단 정보</h3>
                <div className="grid gap-10">
                  <InputField label="메인 타이틀" value={config.heroTitle} onChange={(val: string) => updateConfig('heroTitle', val)} />
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">메인 설명 (부제목)</label>
                    <textarea value={config.heroSubtitle} onChange={(e) => updateConfig('heroSubtitle', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 h-32 outline-none focus:border-purple-500 transition-all font-medium text-gray-300 leading-relaxed" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-10">
                    <InputField label="하단 주소" value={config.footerAddress} onChange={(val: string) => updateConfig('footerAddress', val)} />
                    <InputField label="인스타그램 링크" value={config.instagramUrl} onChange={(val: string) => updateConfig('instagramUrl', val)} />
                    <InputField label="유튜브 링크" value={config.youtubeUrl} onChange={(val: string) => updateConfig('youtubeUrl', val)} />
                    <InputField label="블로그 링크" value={config.blogUrl} onChange={(val: string) => updateConfig('blogUrl', val)} />
                  </div>
                  <ImageControl label="메인 배경 이미지" imageUrl={config.heroImageUrl} positionValue={config.heroImagePosition} onImageClick={() => fileRefs.hero.current?.click()} onPositionChange={(val: any) => updateConfig('heroImagePosition', val)} />
                  <input type="file" ref={fileRefs.hero} className="hidden" accept="image/*" onChange={(e) => handleImageUpload('heroImageUrl', e)} />
                </div>
              </section>
            </div>
          )}

          {activeTab === 'programs' && (
            <div className="space-y-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black uppercase tracking-widest">사업 영역 목록</h3>
                <button onClick={() => { setPrograms([{ id: Date.now().toString(), title: '새로운 사업', description: '내용을 입력해주세요.', category: '카테고리', imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee8718a300a?auto=format&fit=crop&q=80&w=800', imagePosition: 'center' }, ...programs]); }} className="px-8 py-3 rounded-full bg-purple-600 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-purple-900/30">+ 항목 추가</button>
              </div>
              <div className="grid gap-12">
                {programs.map((program, idx) => (
                  <div key={program.id} className="p-8 md:p-10 bg-white/5 rounded-[2.5rem] border border-white/10 relative group hover:border-white/20 transition-all shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-10">
                      <div className="w-full md:w-64 shrink-0">
                        <ImageControl 
                          label="사업 이미지" 
                          imageUrl={program.imageUrl} 
                          positionValue={program.imagePosition} 
                          onImageClick={() => progFileRefs.current[program.id]?.click()} 
                          onPositionChange={(val: any) => { const n = [...programs]; n[idx].imagePosition = val; setPrograms(n); }} 
                          aspect="aspect-[4/3]" 
                        />
                        <input type="file" ref={el => { progFileRefs.current[program.id] = el; }} className="hidden" accept="image/*" onChange={(e) => handleProgImageUpload(program.id, e)} />
                      </div>
                      <div className="flex-1 space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                          <input className="bg-transparent font-black text-3xl w-full outline-none border-b border-white/10 pb-2 focus:border-purple-500 transition-all" placeholder="사업 명칭" value={program.title} onChange={(e) => { const n = [...programs]; n[idx].title = e.target.value; setPrograms(n); }} />
                          <input className="bg-transparent text-xs font-black uppercase text-purple-400 w-full outline-none border-b border-white/10 pb-2 focus:border-purple-400 transition-all" placeholder="분류 카테고리" value={program.category} onChange={(e) => { const n = [...programs]; n[idx].category = e.target.value; setPrograms(n); }} />
                        </div>
                        <textarea className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm text-gray-400 w-full h-32 outline-none focus:border-purple-500 transition-all leading-relaxed" placeholder="사업 상세 설명을 입력하세요." value={program.description} onChange={(e) => { const n = [...programs]; n[idx].description = e.target.value; setPrograms(n); }} />
                      </div>
                      <button onClick={() => { if(window.confirm('이 사업을 삭제하시겠습니까?')) setPrograms(programs.filter(p => p.id !== program.id)) }} className="absolute top-8 right-10 text-red-500/30 hover:text-red-500 text-[10px] font-black uppercase transition-all">삭제</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black uppercase tracking-widest">단체 연혁 관리</h3>
                <button 
                  onClick={() => setHistory([{id: Date.now().toString(), year: new Date().getFullYear().toString(), event: ''}, ...history])} 
                  className="px-8 py-3 rounded-full bg-purple-600 text-[10px] font-black uppercase tracking-widest shadow-xl"
                >
                  + 연혁 추가
                </button>
              </div>

              <div className="grid gap-6">
                {history.map((h, i) => (
                  <div key={h.id} className="flex flex-col md:flex-row gap-10 p-10 bg-white/5 rounded-[2rem] border border-white/5 group hover:border-white/10 transition-all relative shadow-2xl">
                    <div className="shrink-0">
                      <input className="bg-transparent font-black text-5xl w-32 outline-none border-b border-white/10 group-focus-within:border-purple-500 transition-all" value={h.year} onChange={e => { let n = [...history]; n[i].year = e.target.value; setHistory(n); }} />
                    </div>
                    <textarea className="bg-transparent text-gray-300 flex-1 min-h-[100px] outline-none resize-none leading-relaxed border-b border-transparent focus:border-white/10 transition-all text-lg font-medium" placeholder="활동 내용을 입력하세요..." value={h.event} onChange={e => { let n = [...history]; n[i].event = e.target.value; setHistory(n); }} />
                    <button type="button" onClick={() => setHistory(history.filter(it => it.id !== h.id))} className="absolute top-10 right-10 text-red-500/40 hover:text-red-500 text-[10px] font-black uppercase transition-all">삭제</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
