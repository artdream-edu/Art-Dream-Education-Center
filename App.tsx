
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

// 시스템 기본 연혁 데이터
const INITIAL_HISTORY: HistoryItem[] = [
  { id: 'h1', year: '2013', event: '• 예술꿈학교 설립(2013.12.02)\n• 지역아동센터 문화예술교육 프로그램 개발 및 실행\n• 생애주기별 문화예술교육 프로그램 개발 및 실행' },
  { id: 'h2', year: '2014', event: '• 문화예술교육사활용모델발굴지원사업 <숙성공정> / 주관:한국문화예술교육진흥원\n• 찾아가는민주시민토론극 <나... 할말있어> / 주최:경기도교육청\n• 꿈다락토요문화학교 <배우를꿈꾸다> / 주관:한국문화예술교육진흥원\n• 부처간협력문화예술교육(학교밖청소년) <우물쭈물넌참소중해> / 주최:문화체욕관광부, 여성가족부' },
  { id: 'h3', year: '2015', event: '• 가족나눔교육패밀리메이커 / 주최:홀트아동복지회\n• 청소년예술가프로젝트 <도도한연극단> / 주최:구로문화재단\n• 배움터지원사업 <네꿈을펼쳐라> / 주최:삼성꿈장학재단\n• 어르신문화예술교육 <내인생의풍년> / 주관:서초구민회관' },
  { id: 'h4', year: '2016', event: '• 예술인창작지원사업-가족참여극 <좋아요, 더좋아요> / 주최:한국예술인복지재단\n• 부처간협력문화예술교육(학교밖청소년) <별학교별별의별이야기> / 주최:문화체육관광부, 여성가족부\n• 부처간협력문화예술교육(비행청소년) <흔들바람, 소수풍경> / 주최:문화체육관광부, 법무부\n• 부처간협력문화예술교육(군부대) <청춘예찬> / 주최:문화체육관광부, 국방부\n• 쉼표형토요꿈의학교 <나를발견하는나발학교> / 경기도교육청\n• 배움터지원사업 <꽃들에게희망을> / 삼성꿈장학재단' },
  { id: 'h5', year: '2017', event: '• 부처간협력문화예술교육(학교밖청소년) <이야기연극에담다> / 주최:문화체육관광부, 여성가족부\n• 지역특성화문화예술교육 <우리동네작은극장프로젝트> / 주관:인천문화재단, 인천문화예술교육지원센터\n• 꿈다락토요문화학교 <청소년아키비스트> / 주관:영종도서관\n• 전국교직원노동조합 충북지부 진천지회 조합원 교육연극 연수 / 주최:전교조 진천지회' },
  { id: 'h6', year: '2018', event: '• 부처간협력문화예술교육(학교밖청소년) <창작뮤지컬-통.조.림:소통, 조화, 어울림> / 주최:문화체육관광부, 여성가족부\n• 꿈다락토요문화학교 <청소년거리예술프로젝트-자.유.몽.청.> / 주관:인천문화재단\n• 문화예술교육사역량강화및공모사업R&D / 주최:한국문화예술교육사연합회' },
  { id: 'h7', year: '2019', event: '• 경북오감백감지원사업강사역량강화연수 / 주최:경북문화예술교육지원센터\n• 행복학교 수업만들기 교원연수 / 주최:도담초등학교\n• 학교예술교육지원사업 철산초등학교 교육연극 / 주최:광명문화재단\n• 플러스케어링 참여연극 <개똥벌레> / 주최:서울신학대학교\n• 경남 누리과정 유아교사 직무연수 / 주최:경남문화예술진흥원\n• 창의융합프로젝트 스튜디오 "모두의 반쪽이 프로젝트" 멘토링 / 주최:국민대학교' },
  { id: 'h8', year: '2020', event: '• 지역문화예술교육 워크숍 <시간공간인간:사이를 노래하다> / 주최:한국문화예술교육사연합회인천지회\n• 지역연계 학교문화예술교육 연수프로그램 개발연구 / 주최:국민대학교 산학협력단' },
  { id: 'h9', year: '2021', event: '• 주제중심 학교문화예술교육 예술로 탐구생활 / 주최:한국문화예술교육진흥원\n• 인천문화포럼 청년분과위원 청알못시름X씨름 / 주최:인천문화재단\n• 아트 리부팅(Arts Re:booting) 학습동기 향상 프로그램 / 주최:서울예술대학교' },
  { id: 'h10', year: '2022', event: '• 예술꿈학교 사무실이전 및 개인사업자 전환(709-98-01587)\n• 꿈다락토요문화학교 "서구아트플로깅" 기획 / 주관:한국문화예술회관연합회 / 주최:인천서구문화재단\n• 기초지자체문화예술교육운영기반조성사업 / 주최:인천문화재단\n• 아르떼아카데미사회예술강사대상연수자문 / 주최:한국문화예술교육진흥원\n• 문화예술교육사 현장 역량강화 워크숍 / 주최:인천문화재단\n• 학교 온라인 문화예술교육 프로그램 예술학교로 로딩중 <친구를 두는 일> / 주최:한국문화예술교육진흥원' },
  { id: 'h11', year: '2023', event: '• 전국 교육연극연수 <드라마를 통한 소통하기> / 주최:한국교육연극학회\n• 문화예술교육사 현장 역량강화 워크숍 / 주최:인천문화재단\n• 문화예술교육 대상 유아 문화예술교육 연수 <첫걸음> / 주최:부산문화재단' },
  { id: 'h12', year: '2024', event: '• 문화다양성 공모 다이아프로젝트 <문화다양성 토크콘서트:미주알고주알> / 후원:경기문화재단\n• 문화예술교육 매개자 성장지원 워크숍 / 주최:대전문화재단\n• 문화예술교육사 현장역량강화사업 연합네트워크 <무지개 여락> / 주최:대구,제주,경남,전남,전북,광주,대전 7개 문화재단\n• 사회문화예술교육 역량강화 워크숍 <융합예술교육에 대처하는 우리들의 자세> / 주최:성남문화예술교육센터, 성남문화재단\n• 부평문화매개자 양성교육 <축제기획자 양성과정 부평뮤즈:ROCKET> / 주최:부평문화재단, 주관:인하대학교 문화예술교육원\n• 아르떼아카데미 원격 교원직무연수 <늘봄학교 교육대상 및 문화예술교육의 이해> / 주최:한국문화예술교육진흥원\n• 아르떼아카데미 <늘봄교실을 춤추게 하는 문화예술교육 실습> / 주최:한국문화예술교육진흥원\n• 아르떼아카데미 <예술수업브랜딩 연구소> / 주최:한국문화예술교육진흥원\n• 아르떼아카데미 <예술놀이를 통한 문화예술교육 현장의 이해> / 주최:한국문화예술교육진흥원' },
  { id: 'h13', year: '2025', event: '• 인천어린이연극잔치 심사/인천시교육청\n• 서울청소년연극제 심사/서울연극협회\n• 문화예술교육사 현장역량강화사업 컨설팅 및 워크숍/인천문화재단\n• 국립어린이박물관과 함께하는 늘봄학교 프로그램 교육가이드 개발 및 연수/한국문화예술교육진흥원\n• 꿈다락문화예술학교<프로젝트 너머> 기획 및 교육/한국문화예술교육진흥원\n• 청소년 문화예술교육 지원사업 방학일기<청소년 인생설계 프로젝트-플레이 스테이지> 기획 및 교육/제주문화예술재단' }
];

const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'p1',
    title: '학교문화예술교육',
    description: '예술과 공교육의 연계. 국가공인 문화예술교육사의 방문 교육을 통해 학생들의 문화적 감수성 및 인성·창의력을 향상시킵니다.',
    category: '공교육 연계',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop',
    imagePosition: 'center'
  },
  {
    id: 'p2',
    title: '사회문화예술교육',
    description: '지역아동센터, 노인복지관, 장애인시설 등 소외계층을 대상으로 문화예술의 접근성을 높이고 소통을 지원합니다.',
    category: '지역사회 공헌',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2000&auto=format&fit=crop',
    imagePosition: 'center'
  },
  {
    id: 'p3',
    title: '전문인력양성',
    description: '예술강사, 교원, 기업 대상의 온·오프라인 연수 및 문화예술교육사 현장 역량강화 워크숍을 기획합니다.',
    category: '역량 강화',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
    imagePosition: 'center'
  },
  {
    id: 'p4',
    title: '출판 & 교육콘텐츠 개발',
    description: '문화예술교육과 관련한 도서 및 교육콘텐츠를 연구, 개발, 보급합니다.',
    category: 'R&D',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2000&auto=format&fit=crop',
    imagePosition: 'center'
  },
  {
    id: 'p5',
    title: '공연기획 및 제작',
    description: '아동청소년극, 시민연극, 참여형 연극, 토크콘서트 등 관객과 긴밀하게 호흡하며 메시지를 전달하는 예술 무대를 제작합니다.',
    category: '공연 제작',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2000&auto=format&fit=crop',
    imagePosition: 'center'
  },
  {
    id: 'p6',
    title: '바이블플레이',
    description: `기독교 가치관을 담은 문화예술교육, 교회학교 교사 워크숍 등 신앙과 예술을 결합한 프로그램을 제공합니다.`,
    category: '기독교 예술교육',
    imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2000&auto=format&fit=crop',
    imagePosition: 'center'
  }
];

const NATURE_KIDS_IMAGE = "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2000&auto=format&fit=crop";

const INITIAL_CONFIG: SiteConfig = {
  heroTitle: '예술로\n꿈꾸는 배움터',
  heroSubtitle: "예술꿈학교는 '문화+예술+교육'을 통해 모든 존재의 고유한 가치를 발견하고 조화롭게 살아가는 것에 대해 함께 고민하며 아름다운 공존을 꿈꾸는 곳입니다.",
  primaryColor: '#8B5CF6',
  logoName: '예술꿈학교',
  logoImageUrl: '',
  logoImagePosition: 'center',
  aboutText: `모든 사람은 태어날 때부터 자신만의 빛깔을 지닌 고유한 예술가입니다. 예술교육은 스스로 세상에 질문을 던지며 내면의 목소리를 발견해 나가는 숭고한 과정입니다. 예술꿈학교는 정형화된 교육의 틀을 깨고, 개인의 예술적 감각이 배움의 동력이 되는 경이로운 순간을 설계합니다. 우리는 모든 이가 자유로운 표현의 주체가 되어 마음껏 상상하고 경험하며, 예술 통해 삶의 깊이를 더해가는 '성장의 놀이터'를 꿈꿉니다.`,
  aboutImageUrl: NATURE_KIDS_IMAGE, 
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
  const [history, setHistory] = useState<HistoryItem[]>(INITIAL_HISTORY);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);

  useEffect(() => {
    const savedPrograms = localStorage.getItem('art_programs');
    const savedConfig = localStorage.getItem('art_config');
    const savedHistory = localStorage.getItem('art_history');

    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig({
          ...INITIAL_CONFIG,
          ...parsed,
          adminPassword: 'dPtnfRna153'
        });
      } catch (e) {
        setConfig(INITIAL_CONFIG);
      }
    }

    if (savedPrograms) {
      try {
        const parsed = JSON.parse(savedPrograms);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPrograms(parsed);
        } else {
          setPrograms(INITIAL_PROGRAMS);
        }
      } catch (e) {
        setPrograms(INITIAL_PROGRAMS);
      }
    }
    
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHistory(parsed);
        } else {
          setHistory(INITIAL_HISTORY);
        }
      } catch (e) {
        setHistory(INITIAL_HISTORY);
      }
    }
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
          <RequestForm config={config} />
          <Footer config={config} />
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
