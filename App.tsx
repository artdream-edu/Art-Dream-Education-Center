
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Programs from './components/Programs';
import About from './components/About';
import HistorySection from './components/HistorySection';
import RequestForm from './components/RequestForm';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
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
  }
];

const INITIAL_CONFIG: SiteConfig = {
  heroTitle: '예술로 꿈꾸는 배움터',
  heroSubtitle: "예술꿈학교는 '문화+예술+교육'을 통해 모든 존재의 고유한 가치를 발견하고 조화롭게 살아가는 것에 대해 함께 고민하며 아름다운 공존을 꿈꾸는 곳입니다.",
  primaryColor: '#8B5CF6',
  logoName: '예술꿈학교',
  logoImageUrl: '',
  logoImagePosition: 'center',
  aboutText: "모든 사람은 태어날 때부터 자신만의 빛깔을 지닌 고유한 예술가입니다. 예술은 단순히 정답을 암기하는 것이 아니라, 스스로 세상에 질문을 던지며 내면의 목소리를 발견해 나가는 숭고한 과정입니다.",
  aboutImageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000',
  aboutImagePosition: 'center',
  heroImageUrl: '',
  heroImagePosition: 'center',
  adminPassword: '000000'
};

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [programs, setPrograms] = useState<Program[]>(INITIAL_PROGRAMS);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [isAdminModeEnabled, setIsAdminModeEnabled] = useState(false);

  useEffect(() => {
    // URL 파라미터 체크 (?admin=true)
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdminModeEnabled(true);
    }

    const savedPrograms = localStorage.getItem('art_programs');
    const savedConfig = localStorage.getItem('art_config');
    const savedHistory = localStorage.getItem('art_history');

    if (savedPrograms) setPrograms(JSON.parse(savedPrograms));
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      // 기존 저장된 데이터에 비밀번호가 없는 경우를 대비해 병합
      setConfig({ ...INITIAL_CONFIG, ...parsedConfig });
    }
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem('art_programs', JSON.stringify(programs));
    localStorage.setItem('art_config', JSON.stringify(config));
    localStorage.setItem('art_history', JSON.stringify(history));
  }, [programs, config, history]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500">
      <Navbar 
        config={config} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        isAdminModeEnabled={isAdminModeEnabled}
      />
      {viewMode === 'home' ? (
        <main className="animate-in">
          <Hero config={config} />
          <About config={config} />
          <HistorySection history={history} primaryColor={config.primaryColor} />
          <Programs programs={programs} primaryColor={config.primaryColor} />
          <RequestForm config={config} />
          <Footer config={config} />
        </main>
      ) : (
        <AdminDashboard 
          config={config} setConfig={setConfig}
          programs={programs} setPrograms={setPrograms}
          history={history} setHistory={setHistory}
          onExit={() => setViewMode('home')}
        />
      )}
    </div>
  );
};

export default App;
