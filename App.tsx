
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Programs from './components/Programs';
import About from './components/About';
import HistorySection from './components/HistorySection';
import RequestForm from './components/RequestForm';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AiAssistant from './components/AiAssistant';
import { Program, SiteConfig, ViewMode, HistoryItem } from './types';

const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'p1',
    title: '학교문화예술교육',
    description: '예술과 공교육의 연계. 국가공인 문화예술교육사의 방문 교육을 통해 학생들의 문화적 감수성 및 인성·창의력을 향상시킵니다.',
    category: '공교육 연계',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    imagePosition: 'center'
  },
  {
    id: 'p2',
    title: '사회문화예술교육',
    description: '지역아동센터, 노인복지관, 장애인시설 등 소외계층을 대상으로 문화예술의 접근성을 높이고 소통을 지원합니다.',
    category: '지역사회 공헌',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
    imagePosition: 'center'
  },
  {
    id: 'p3',
    title: '전문인력양성',
    description: '예술강사, 교원, 기업 대상의 온·오프라인 연수 및 문화예술교육사 현장 역량강화 워크숍을 기획합니다.',
    category: '역량 강화',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    imagePosition: 'center'
  },
  {
    id: 'p4',
    title: '출판 & 교육콘텐츠 개발',
    description: '문화예술교육과 관련한 도서 및 교육콘텐츠를 연구, 개발, 보급합니다.',
    category: 'R&D',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    imagePosition: 'center'
  },
  {
    id: 'p5',
    title: '공연기획 및 제작',
    description: '아동청소년극, 시민연극, 참여형 연극, 토크콘서트 등 관객과 긴밀하게 호흡하며 메시지를 전달하는 예술 무대를 제작합니다.',
    category: '공연 제작',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    imagePosition: 'center'
  },
  {
    id: 'p6',
    title: '바이블플레이',
    description: `기독교 가치관을 담은 문화예술교육, 교회학교 교사 워크숍 등 신앙과 예술을 결합한 프로그램을 제공합니다.`,
    category: '기독교 예술교육',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    imagePosition: 'center'
  }
];

const INITIAL_CONFIG: SiteConfig = {
  heroTitle: '예술로 꿈꾸는 배움터',
  heroSubtitle: "예술꿈학교는 '문화+예술+교육'을 통해 모든 존재의 고유한 가치를 발견하고 조화롭게 살아가는 것에 대해 함께 고민하며 아름다운 공존을 꿈꾸는 곳입니다.",
  primaryColor: '#8B5CF6',
  logoName: '예술꿈학교',
  logoImageUrl: '',
  logoImagePosition: 'center',
  aboutText: `모든 사람은 태어날 때부터 자신만의 빛깔을 지닌 고유한 예술가입니다. 예술교육은 스스로 세상에 질문을 던지며 내면의 목소리를 발견해 나가는 숭고한 과정입니다. 예술꿈학교는 정형화된 교육의 틀을 깨고, 개인의 예술적 감각이 배움의 동력이 되는 경이로운 순간을 설계합니다. 우리는 모든 이가 자유로운 표현의 주체가 되어 마음껏 상상하고 경험하며, 예술 통해 삶의 깊이를 더해가는 '성장의 놀이터'를 꿈꿉니다.`,
  aboutImageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000',
  aboutImagePosition: 'center',
  heroImageUrl: '',
  heroImagePosition: 'center',
  adminPassword: 'dPtnfRna153',
  footerAddress: '경기도 하남시 미사강변한강로 135, 다동 9층 938호 (미사강변 스카이폴리스)',
  instagramUrl: 'https://www.instagram.com/artdream_edu',
  youtubeUrl: 'https://youtube.com/@artdream_edu',
  blogUrl: 'https://blog.naver.com/artdream_official'
};

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [programs, setPrograms] = useState<Program[]>(INITIAL_PROGRAMS);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);

  useEffect(() => {
    const savedPrograms = localStorage.getItem('art_programs');
    const savedConfig = localStorage.getItem('art_config');
    const savedHistory = localStorage.getItem('art_history');

    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      // Ensure the admin password is updated if changed
      setConfig({ ...INITIAL_CONFIG, ...parsedConfig, adminPassword: 'dPtnfRna153' });
    }
    if (savedPrograms) setPrograms(JSON.parse(savedPrograms));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem('art_programs', JSON.stringify(programs));
    localStorage.setItem('art_config', JSON.stringify(config));
    localStorage.setItem('art_history', JSON.stringify(history));
  }, [programs, config, history]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500">
      <Navbar config={config} viewMode={viewMode} setViewMode={setViewMode} />
      
      {viewMode === 'home' ? (
        <main className="animate-in">
          <Hero config={config} />
          <About config={config} />
          <HistorySection history={history} primaryColor={config.primaryColor} />
          <Programs programs={programs} primaryColor={config.primaryColor} />
          {/* 의뢰하기 섹션 복구 확인 */}
          <RequestForm config={config} />
          <Footer config={config} />
          {/* Floating AI Assistant Component */}
          <AiAssistant config={config} />
        </main>
      ) : (
        <div className="animate-in fade-in duration-500">
          <AdminDashboard 
            config={config} setConfig={setConfig}
            programs={programs} setPrograms={setPrograms}
            history={history} setHistory={setHistory}
            onExit={() => {
              setViewMode('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
