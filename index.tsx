
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- [TYPES] ---
interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

interface HistoryItem {
  id: string;
  year: string;
  event: string;
}

interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  logoName: string;
  aboutText: string;
}

// --- [INITIAL DATA] ---
const INITIAL_CONFIG: SiteConfig = {
  heroTitle: '예술로 꿈꾸는 배움터',
  heroSubtitle: "예술꿈학교는 '문화+예술+교육'을 통해 모든 존재의 고유한 가치를 발견하고 조화롭게 살아가는 것에 대해 함께 고민하며 아름다운 공존을 꿈꾸는 곳입니다.",
  primaryColor: '#8B5CF6',
  logoName: '예술꿈학교',
  aboutText: "모든 사람은 태어날 때부터 자신만의 빛깔을 지닌 고유한 예술가입니다. 예술은 단순히 정답을 암기하는 것이 아니라, 스스로 세상에 질문을 던지며 내면의 목소리를 발견해 나가는 숭고한 과정입니다.\n\n예술꿈학교는 정형화된 교육의 틀을 깨고, 개인의 예술적 감각이 배움의 동력이 되는 경이로운 순간을 설계합니다. 우리는 모든 이가 자유로운 표현의 주체가 되어 마음껏 상상하고 경험하며, 예술을 통해 삶의 깊이를 더해가는 '성장의 놀이터'를 꿈꿉니다."
};

const INITIAL_PROGRAMS: Program[] = [
  { id: 'p1', title: '학교문화예술교육', category: '공교육 연계', description: '예술과 공교육의 연계. 국가공인 문화예술교육사의 방문 교육을 통해 학생들의 문화적 감수성 및 인성·창의력을 향상시킵니다.', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800' },
  { id: 'p2', title: '사회문화예술교육', category: '지역사회 공헌', description: '지역아동센터, 노인복지관, 장애인시설 등 소외계층을 대상으로 문화예술의 접근성을 높이고 소통을 지원합니다.', imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800' },
  { id: 'p3', title: '전문인력양성', category: '역량 강화', description: '예술강사, 교원, 기업 대상의 워크숍을 기획하여 사회적 가치를 실현하는 전문가를 양성합니다.', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800' },
  { id: 'p4', title: '출판 & 콘텐츠 개발', category: 'R&D', description: "'상자가 없는 아이' 등 연극놀이 대본집과 그림책, 독자적인 예술 교육 콘텐츠를 연구·개발합니다.", imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800' },
  { id: 'p5', title: '공연기획 및 제작', category: '공연 제작', description: '아동청소년극, 참여형 연극 등 관객과 긴밀하게 호흡하며 메시지를 전달하는 예술 무대를 제작합니다.', imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee8718a300a?auto=format&fit=crop&q=80&w=800' },
  { id: 'p6', title: '바이블플레이', category: '기독교 예술', description: '기독교 가치관을 담은 통합예술교육 및 교회학교 교사 워크숍 등 신앙과 예술을 결합한 프로그램을 제공합니다.', imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800' }
];

const INITIAL_HISTORY: HistoryItem[] = [
  { id: 'h1', year: '2025', event: '• 인천어린이연극잔치 심사\n• 문화예술교육사 현장역량강화사업 컨설팅\n• 꿈다락문화예술학교 <프로젝트 너머> 기획' },
  { id: 'h2', year: '2024', event: '• 문화다양성 토크콘서트 <미주알고주알>\n• 부평문화매개자 양성교육 주관\n• 아르떼아카데미 교원직무연수' },
  { id: 'h3', year: '2023', event: '• 전국 교육연극연수 <드라마를 통한 소통>\n• 문화예술교육 현장의 기술 워크숍\n• 유아 문화예술교육 연수 <첫걸음>' }
];

// --- [MAIN APP] ---
const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'home' | 'admin'>('home');
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [programs, setPrograms] = useState<Program[]>(INITIAL_PROGRAMS);
  const [history, setHistory] = useState<HistoryItem[]>(INITIAL_HISTORY);

  // Persistence logic with error handling
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('school_config');
      const savedPrograms = localStorage.getItem('school_programs');
      const savedHistory = localStorage.getItem('school_history');
      
      if (savedConfig) setConfig(JSON.parse(savedConfig));
      if (savedPrograms) setPrograms(JSON.parse(savedPrograms));
      if (savedHistory) setHistory(JSON.parse(savedHistory));
    } catch (e) {
      console.error("LocalStorage restore error:", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('school_config', JSON.stringify(config));
    localStorage.setItem('school_programs', JSON.stringify(programs));
    localStorage.setItem('school_history', JSON.stringify(history));
  }, [config, programs, history]);

  // -- Components --
  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 glass h-20 flex items-center justify-between px-6 md:px-12">
      <div className="text-2xl font-black tracking-tighter cursor-pointer" onClick={() => setViewMode('home')}>
        <span style={{ color: config.primaryColor }}>{config.logoName}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex gap-8 text-sm font-bold text-gray-400 mr-4">
          <a href="#about" className="hover:text-white">소개</a>
          <a href="#history" className="hover:text-white">연혁</a>
          <a href="#programs" className="hover:text-white">사업영역</a>
        </div>
        <button 
          onClick={() => setViewMode(viewMode === 'admin' ? 'home' : 'admin')}
          className="px-5 py-2 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          {viewMode === 'admin' ? '사이트 보기' : '관리자'}
        </button>
      </div>
    </nav>
  );

  const HomeView = () => (
    <div className="animate-in fade-in duration-1000">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] uppercase rounded-full border border-white/10 glass" style={{ color: config.primaryColor }}>
            Arts Education Planning Group
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">{config.heroTitle}</h1>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">{config.heroSubtitle}</p>
          <a href="#programs" className="px-10 py-4 rounded-full font-bold text-sm inline-block transition-transform hover:scale-105" style={{ backgroundColor: config.primaryColor }}>사업 영역 보기</a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-black tracking-widest uppercase mb-4" style={{ color: config.primaryColor }}>Philosophy</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8">가장 예술적인 것이 가장 교육적입니다.</h3>
            <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap">{config.aboutText}</p>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="예술 교육" />
            </div>
            <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl max-w-xs border-l-4" style={{ borderColor: config.primaryColor }}>
              <p className="text-sm italic mb-2">"연극은 교육과 예술의 교차점에 존재한다."</p>
              <p className="text-[10px] font-black uppercase opacity-40">— Philip Taylor</p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section id="history" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-black tracking-widest uppercase mb-16" style={{ color: config.primaryColor }}>History</h2>
          <div className="space-y-16">
            {history.map(h => (
              <div key={h.id} className="flex flex-col md:flex-row gap-8 border-l border-white/10 pl-8 relative group">
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-white/20 -translate-x-1/2 group-hover:bg-purple-500 transition-colors" />
                <span className="text-4xl font-black min-w-[120px] transition-colors group-hover:text-purple-400">{h.year}</span>
                <p className="text-gray-400 whitespace-pre-wrap leading-relaxed flex-1">{h.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-24 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-black tracking-widest uppercase mb-16 text-center" style={{ color: config.primaryColor }}>Business Areas</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {programs.map(p => (
              <div key={p.id} className="group glass p-6 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all">
                <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-black">
                  <img src={p.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt={p.title} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest mb-2 block" style={{ color: config.primaryColor }}>{p.category}</span>
                <h4 className="text-xl font-bold mb-4">{p.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <div className="text-2xl font-black mb-6" style={{ color: config.primaryColor }}>{config.logoName}</div>
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">© 2024 Arts Dream School. All rights reserved.</p>
      </footer>
    </div>
  );

  const AdminView = () => {
    const [tab, setTab] = useState<'info' | 'history' | 'programs'>('info');
    
    return (
      <div className="min-h-screen pt-32 px-6 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tighter">Admin Dashboard</h2>
          <button onClick={() => setViewMode('home')} className="text-xs font-bold underline decoration-purple-500 underline-offset-4">나가기</button>
        </div>

        <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
          {['info', 'history', 'programs'].map(t => (
            <button key={t} onClick={() => setTab(t as any)} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${tab === t ? 'bg-white text-black' : 'border-white/10 text-gray-500'}`}>{t}</button>
          ))}
        </div>

        <div className="glass p-8 rounded-[2rem] border border-white/10 mb-20">
          {tab === 'info' && (
            <div className="space-y-6">
              <div><label className="text-[10px] font-black uppercase text-gray-600 mb-2 block">Site Title</label><input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" value={config.heroTitle} onChange={e => setConfig({...config, heroTitle: e.target.value})} /></div>
              <div><label className="text-[10px] font-black uppercase text-gray-600 mb-2 block">Logo Name</label><input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" value={config.logoName} onChange={e => setConfig({...config, logoName: e.target.value})} /></div>
              <div><label className="text-[10px] font-black uppercase text-gray-600 mb-2 block">About Text</label><textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 h-40" value={config.aboutText} onChange={e => setConfig({...config, aboutText: e.target.value})} /></div>
            </div>
          )}

          {tab === 'history' && (
            <div className="space-y-4">
              <button onClick={() => setHistory([{id: Date.now().toString(), year: '2025', event: '내용 입력'}, ...history])} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-[10px] font-black text-gray-500 hover:text-white transition-colors uppercase">+ Add History</button>
              {history.map((h, i) => (
                <div key={h.id} className="flex gap-4 p-4 bg-white/5 rounded-2xl">
                  <input className="bg-transparent font-black text-xl w-24" value={h.year} onChange={e => { let n = [...history]; n[i].year = e.target.value; setHistory(n); }} />
                  <textarea className="bg-transparent text-sm text-gray-400 flex-1 h-20" value={h.event} onChange={e => { let n = [...history]; n[i].event = e.target.value; setHistory(n); }} />
                  <button onClick={() => setHistory(history.filter(it => it.id !== h.id))} className="text-red-500 text-[10px] font-black uppercase self-start">Del</button>
                </div>
              ))}
            </div>
          )}

          {tab === 'programs' && (
            <div className="space-y-4">
              {programs.map((p, i) => (
                <div key={p.id} className="p-6 bg-white/5 rounded-3xl space-y-3">
                  <div className="flex justify-between"><input className="bg-transparent font-bold text-lg w-full" value={p.title} onChange={e => { let n = [...programs]; n[i].title = e.target.value; setPrograms(n); }} /></div>
                  <input className="bg-transparent text-[10px] font-black uppercase text-purple-400 w-full" value={p.category} onChange={e => { let n = [...programs]; n[i].category = e.target.value; setPrograms(n); }} />
                  <textarea className="bg-transparent text-sm text-gray-500 w-full h-24" value={p.description} onChange={e => { let n = [...programs]; n[i].description = e.target.value; setPrograms(n); }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500">
      <Navbar />
      {viewMode === 'home' ? <HomeView /> : <AdminView />}
    </div>
  );
};

// Rendering
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
