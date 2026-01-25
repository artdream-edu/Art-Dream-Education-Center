
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
  aboutText: "모든 사람은 태어날 때부터 자신만의 빛깔을 지닌 고유한 예술가입니다. 예술은 단순히 정답을 암기하는 것이 아니라, 스스로 세상에 질문을 던지며 내면의 목소리를 발견해 나가는 숭고한 과정입니다.\n\n예술꿈학교는 정형화된 교육의 틀을 깨고, 개인의 예술적 감각이 배움의 동력이 되는 경이로운 순간을 설계합니다. 우리는 모든 이가 자유로운 표현의 주체가 되어 마음껏 상상하고 경험하며, 예술 통해 삶의 깊이를 더해가는 '성장의 놀이터'를 꿈꿉니다."
};

const INITIAL_PROGRAMS: Program[] = [
  { id: 'p1', title: '학교문화예술교육', category: '공교육 연계', description: '예술과 공교육의 연계. 국가공인 문화예술교육사의 방문 교육을 통해 학생들의 문화적 감수성 및 인성·창의력을 향상시킵니다. (교과연계, 창체연계, 예술동아리 지원)', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800' },
  { id: 'p2', title: '사회문화예술교육', category: '지역사회 공헌', description: '지역아동센터, 노인복지관, 장애인시설 등 소외계층을 대상으로 문화예술의 접근성을 높이고 소통을 지원하는 맞춤형 프로그램을 운영합니다.', imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800' },
  { id: 'p3', title: '전문인력양성', category: '역량 강화', description: '예술강사, 교원, 기업 대상의 온·오프라인 연수 및 문화예술교육사 현장 역량강화 워크숍을 기획하여 전문가를 양성합니다.', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800' },
  { id: 'p4', title: '출판 & 교육콘텐츠 개발', category: 'R&D', description: "'상자가 없는 아이', '뚱뚱한 아이' 등 연극놀이 대본집과 그림책 등 독자적인 예술 교육 콘텐츠를 연구·개발합니다.", imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800' },
  { id: 'p5', title: '공연기획 및 제작', category: '공연 제작', description: '아동청소년극, 시민연극, 참여형 연극, 토크콘서트 등 관객과 긴밀하게 호흡하며 메시지를 전달하는 예술 무대를 제작합니다.', imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee8718a300a?auto=format&fit=crop&q=80&w=800' },
  { id: 'p6', title: '바이블플레이', category: '기독교 예술', description: '기독교 가치관을 담은 문화예술교육, 교회학교 교사 워크숍 등 신앙과 예술을 결합한 프로그램을 제공합니다.', imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800' }
];

const INITIAL_HISTORY: HistoryItem[] = [
  { id: 'h2025', year: '2025', event: '• 인천어린이연극잔치 심사/인천시교육청\n• 서울청소년연극제 심사/서울연극협회\n• 문화예술교육사 현장역량강화사업 컨설팅 및 워크숍 강사/인천문화재단\n• 꿈다락문화예술학교 <프로젝트 너머> 기획 및 교육 주강사' },
  { id: 'h2024', year: '2024', event: '• 문화다양성 공모 다이아프로젝트 <문화다양성 토크콘서트:미주알고주알>\n• 부평문화매개자 양성교육 <부평 뮤즈:ROCKET> 주관\n• 아르떼아카데미 <늘봄교실을 춤추게 하는 문화예술교육 실습> 주최' },
  { id: 'h2023', year: '2023', event: '• 전국 교육연극연수 <드라마를 통한 소통하기> 주최\n• 문화예술교육 현장의 기술 <첫 만남을 위한 예술놀이> 주최\n• 유아 문화예술교육 연수 <첫걸음> 주최' },
  { id: 'h2022', year: '2022', event: '• 예술꿈학교 사무실 이전 및 개인사업자 전환\n• 꿈다락토요문화학교 <서구아트플로깅> 기획 및 주관\n• 학교 온라인 문화예술교육 프로그램 <예술학교로 로딩 중> 주최' },
  { id: 'h2013', year: '2013', event: '• 예술꿈학교 설립 (2013.12.02)\n• 예술꿈학교 고유번호증 발급' }
];

// --- [SUB-COMPONENTS: DEFINED OUTSIDE TO PREVENT RE-RENDERING BUGS] ---

const Navbar = ({ config, setViewMode, viewMode }: { config: SiteConfig, setViewMode: (m: 'home' | 'admin') => void, viewMode: string }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass h-20 flex items-center justify-between px-6 md:px-12">
    <div className="text-2xl font-black tracking-tighter cursor-pointer" onClick={() => setViewMode('home')}>
      <span style={{ color: config.primaryColor }}>{config.logoName}</span>
    </div>
    <div className="flex items-center gap-4">
      <div className="hidden md:flex gap-8 text-sm font-bold text-gray-400 mr-4">
        <a href="#about" className="hover:text-white transition-colors">소개</a>
        <a href="#history" className="hover:text-white transition-colors">연혁</a>
        <a href="#programs" className="hover:text-white transition-colors">사업영역</a>
        <a href="#request" className="hover:text-white transition-colors font-bold text-white/80">의뢰하기</a>
      </div>
      <button 
        type="button"
        onClick={() => setViewMode(viewMode === 'admin' ? 'home' : 'admin')}
        className="px-5 py-2 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
      >
        {viewMode === 'admin' ? '사이트 보기' : '관리자'}
      </button>
    </div>
  </nav>
);

const RequestForm = ({ config, programs }: { config: SiteConfig, programs: Program[] }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', contact: '', email: '', category: '학교문화예술교육', content: '' });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch("https://formspree.io/f/xrepwrre", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', contact: '', email: '', category: '학교문화예술교육', content: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else { setStatus('error'); }
    } catch (err) { setStatus('error'); }
  };

  return (
    <section id="request" className="py-24 px-6 md:px-12 bg-black relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-black tracking-widest uppercase mb-4" style={{ color: config.primaryColor }}>Request</h2>
          <h3 className="text-4xl font-bold mb-4">강의 및 프로젝트 의뢰</h3>
          <p className="text-gray-500">담당자가 확인 후 개별 연락드립니다.</p>
        </div>
        <form onSubmit={handleFormSubmit} className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 space-y-6 relative overflow-hidden">
          {status === 'success' && (
            <div className="absolute inset-0 z-20 glass flex flex-col items-center justify-center text-center animate-in fade-in">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: config.primaryColor }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h4 className="text-2xl font-bold">전송 완료!</h4>
              <p className="text-gray-400 mt-2">입력하신 내용이 성공적으로 전달되었습니다.</p>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-purple-500 outline-none transition-all" placeholder="성함 / 단체명" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-purple-500 outline-none transition-all" placeholder="연락처" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-purple-500 outline-none transition-all" placeholder="이메일 주소" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              {programs.map(p => <option key={p.id} className="bg-neutral-900">{p.title}</option>)}
            </select>
          </div>
          <textarea required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-purple-500 outline-none transition-all h-32" placeholder="상세 의뢰 내용" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
          <button type="submit" disabled={status === 'submitting'} className="w-full py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.01] shadow-xl flex items-center justify-center gap-2" style={{ backgroundColor: config.primaryColor }}>
            {status === 'submitting' ? '제출 중...' : '의뢰 신청서 보내기'}
          </button>
        </form>
      </div>
    </section>
  );
};

const HomeView = ({ config, programs, history }: { config: SiteConfig, programs: Program[], history: HistoryItem[] }) => (
  <div className="animate-in fade-in duration-1000">
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] uppercase rounded-full border border-white/10 glass" style={{ color: config.primaryColor }}>Arts Dream School</span>
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">{config.heroTitle}</h1>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">{config.heroSubtitle}</p>
        <a href="#request" className="px-10 py-4 rounded-full font-bold text-sm inline-block transition-transform hover:scale-105" style={{ backgroundColor: config.primaryColor }}>지금 바로 의뢰하기</a>
      </div>
    </section>

    <section id="about" className="py-24 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-sm font-black tracking-widest uppercase mb-4" style={{ color: config.primaryColor }}>Philosophy</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">가장 예술적인 것이 가장 교육적입니다.</h3>
          <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap">{config.aboutText}</p>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-neutral-900">
            <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="예술 교육" />
          </div>
          <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl max-w-xs border-l-4" style={{ borderColor: config.primaryColor }}>
            <p className="text-sm italic mb-2">"연극은 교육과 예술의 교차점에 존재한다."</p>
            <p className="text-[10px] font-black uppercase opacity-40">— Philip Taylor</p>
          </div>
        </div>
      </div>
    </section>

    <section id="history" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-black tracking-widest uppercase mb-16" style={{ color: config.primaryColor }}>History</h2>
        <div className="space-y-12">
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

    <section id="programs" className="py-24 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-sm font-black tracking-widest uppercase mb-4" style={{ color: config.primaryColor }}>Business Areas</h2>
        <h3 className="text-4xl font-bold">주요 사업 영역</h3>
      </div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
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
    </section>

    <RequestForm config={config} programs={programs} />

    <footer className="py-24 px-6 border-t border-white/5 text-center bg-[#020202]">
      <div className="max-w-4xl mx-auto">
        <div className="text-3xl font-black mb-8 tracking-tighter" style={{ color: config.primaryColor }}>{config.logoName}</div>
        <div className="flex justify-center items-center gap-6 mb-12">
          <a href="https://www.instagram.com/artdream_edu?igsh=MWt0ajNtcWlmZXNhcw==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center glass hover:scale-110 transition-all group">
            <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://youtube.com/@artdream_edu?si=wkNCpA0cWUbmj10q" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center glass hover:scale-110 transition-all group">
            <svg className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://blog.naver.com/artdream_official" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center glass hover:scale-110 transition-all group">
            <div className="w-6 h-6 text-gray-400 group-hover:text-green-500 transition-colors font-black text-lg flex items-center justify-center">B</div>
          </a>
        </div>
        <div className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em] space-y-3">
          <p>© 2025 ART DREAM EDUCATION CENTER. ALL RIGHTS RESERVED.</p>
          <p className="opacity-50 font-medium leading-relaxed">경기도 하남시 미사강변한강로 135, 다동 9층 938호(망월동, 미사강변 스카이폴리스)</p>
        </div>
      </div>
    </footer>
  </div>
);

const AdminView = ({ config, setConfig, programs, setPrograms, history, setHistory, setViewMode }: { config: SiteConfig, setConfig: any, programs: Program[], setPrograms: any, history: HistoryItem[], setHistory: any, setViewMode: any }) => {
  const [tab, setTab] = useState<'info' | 'history' | 'programs'>('info');

  return (
    <div className="min-h-screen pt-32 px-6 max-w-4xl mx-auto pb-32">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Admin Dashboard</h2>
        <button type="button" onClick={() => setViewMode('home')} className="text-xs font-bold underline decoration-purple-500 underline-offset-4">나가기</button>
      </div>
      <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
        {['info', 'history', 'programs'].map(t => (
          <button key={t} type="button" onClick={() => setTab(t as any)} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${tab === t ? 'bg-white text-black' : 'border-white/10 text-gray-500'}`}>{t}</button>
        ))}
      </div>
      <div className="glass p-8 rounded-[2rem] border border-white/10">
        {tab === 'info' && (
          <div className="space-y-6">
            <div><label className="text-[10px] font-black uppercase text-gray-600 mb-2 block tracking-widest">Site Title</label><input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" value={config.heroTitle} onChange={e => setConfig({...config, heroTitle: e.target.value})} /></div>
            <div><label className="text-[10px] font-black uppercase text-gray-600 mb-2 block tracking-widest">About Philosophy</label><textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 h-40" value={config.aboutText} onChange={e => setConfig({...config, aboutText: e.target.value})} /></div>
          </div>
        )}
        {tab === 'history' && (
          <div className="space-y-4">
            <button type="button" onClick={() => setHistory([{id: Date.now().toString(), year: '2025', event: '내용 입력'}, ...history])} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-[10px] font-black text-gray-500 hover:text-white transition-colors uppercase">+ Add History</button>
            {history.map((h, i) => (
              <div key={h.id} className="flex gap-4 p-4 bg-white/5 rounded-2xl">
                <input className="bg-transparent font-black text-xl w-24 outline-none" value={h.year} onChange={e => { let n = [...history]; n[i].year = e.target.value; setHistory(n); }} />
                <textarea className="bg-transparent text-sm text-gray-400 flex-1 h-24 outline-none resize-none" value={h.event} onChange={e => { let n = [...history]; n[i].event = e.target.value; setHistory(n); }} />
                <button type="button" onClick={() => setHistory(history.filter(it => it.id !== h.id))} className="text-red-500 text-[10px] font-black uppercase self-start mt-2">Del</button>
              </div>
            ))}
          </div>
        )}
        {tab === 'programs' && (
          <div className="space-y-4">
            {programs.map((p, i) => (
              <div key={p.id} className="p-6 bg-white/5 rounded-3xl space-y-3">
                <input className="bg-transparent font-bold text-lg w-full outline-none" value={p.title} onChange={e => { let n = [...programs]; n[i].title = e.target.value; setPrograms(n); }} />
                <input className="bg-transparent text-[10px] font-black uppercase text-purple-400 w-full outline-none" value={p.category} onChange={e => { let n = [...programs]; n[i].category = e.target.value; setPrograms(n); }} />
                <textarea className="bg-transparent text-sm text-gray-500 w-full h-24 outline-none" value={p.description} onChange={e => { let n = [...programs]; n[i].description = e.target.value; setPrograms(n); }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- [MAIN APP] ---

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'home' | 'admin'>('home');
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [programs, setPrograms] = useState<Program[]>(INITIAL_PROGRAMS);
  const [history, setHistory] = useState<HistoryItem[]>(INITIAL_HISTORY);

  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('art_config');
      const savedPrograms = localStorage.getItem('art_programs');
      const savedHistory = localStorage.getItem('art_history');
      if (savedConfig) setConfig(JSON.parse(savedConfig));
      if (savedPrograms) setPrograms(JSON.parse(savedPrograms));
      if (savedHistory) setHistory(JSON.parse(savedHistory));
    } catch (e) { console.error("Restore failed:", e); }
  }, []);

  useEffect(() => {
    localStorage.setItem('art_config', JSON.stringify(config));
    localStorage.setItem('art_programs', JSON.stringify(programs));
    localStorage.setItem('art_history', JSON.stringify(history));
  }, [config, programs, history]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500">
      <Navbar config={config} setViewMode={setViewMode} viewMode={viewMode} />
      {viewMode === 'home' ? (
        <HomeView config={config} programs={programs} history={history} />
      ) : (
        <AdminView 
          config={config} 
          setConfig={setConfig} 
          programs={programs} 
          setPrograms={setPrograms} 
          history={history} 
          setHistory={setHistory} 
          setViewMode={setViewMode} 
        />
      )}
    </div>
  );
};

// Rendering
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
