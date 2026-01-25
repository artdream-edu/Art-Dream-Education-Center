
import React, { useState } from 'react';
import { SiteConfig } from '../types';

interface RequestFormProps {
  config: SiteConfig;
}

interface FormErrors {
  name?: string;
  contact?: string;
  email?: string;
  date?: string;
  content?: string;
}

const RequestForm: React.FC<RequestFormProps> = ({ config }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    date: '',
    category: '학교문화예술교육',
    content: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const today = new Date().toISOString().split('T')[0];

  const validate = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (value.trim().length < 2) error = '성함 또는 단체명을 2자 이상 입력해주세요.';
        break;
      case 'contact':
        const phoneRegex = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
        if (!phoneRegex.test(value)) error = '올바른 연락처 형식을 입력해주세요.';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) error = '유효한 이메일 주소를 입력해주세요.';
        break;
      case 'date':
        if (!value) error = '희망 일정을 선택해주세요.';
        break;
      case 'content':
        if (value.trim().length < 10) error = '상세 의뢰 내용을 10자 이상 작성해주세요.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validate(name, (formData as any)[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validate(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const isFormValid = () => {
    const currentErrors: FormErrors = {
      name: validate('name', formData.name),
      contact: validate('contact', formData.contact),
      email: validate('email', formData.email),
      date: validate('date', formData.date),
      content: validate('content', formData.content),
    };
    return !Object.values(currentErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    if (!isFormValid()) {
      setStatus('error');
      const newErrors: FormErrors = {
        name: validate('name', formData.name),
        contact: validate('contact', formData.contact),
        email: validate('email', formData.email),
        date: validate('date', formData.date),
        content: validate('content', formData.content),
      };
      setErrors(newErrors);
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch("https://formspree.io/f/xrepwrre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          _subject: `[강의의뢰] ${formData.name}님의 신청서`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', contact: '', email: '', date: '', category: '학교문화예술교육', content: '' });
        setTouched({});
        setErrors({});
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  const inputClasses = (name: keyof FormErrors) => `
    w-full bg-white/5 border rounded-2xl px-5 py-4 focus:outline-none transition-all placeholder:text-gray-700 text-sm font-medium
    ${touched[name] && errors[name] 
      ? 'border-red-500/50 focus:border-red-500 ring-1 ring-red-500/20' 
      : 'border-white/10 focus:border-purple-500'}
  `;

  return (
    <section id="request" className="py-24 px-6 md:px-12 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-black tracking-widest uppercase mb-4" style={{ color: config.primaryColor }}>
            Request
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">강의 및 프로젝트 의뢰</h3>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed font-medium">
            예술을 통해 삶의 가치를 발견하는 여정에 예술꿈학교가 함께합니다.<br />
            의뢰 내용을 남겨주시면 담당 예술가가 확인 후 연락드리겠습니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 space-y-8 relative overflow-hidden shadow-2xl">
          {status === 'success' && (
            <div className="absolute inset-0 z-30 glass flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: config.primaryColor }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold mb-2">접수가 완료되었습니다!</h4>
              <p className="text-gray-400 font-medium">보내주신 소중한 의뢰 내용을 확인 후 빠른 시일 내에 연락드리겠습니다.</p>
              <button 
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-8 text-sm font-black uppercase tracking-widest underline decoration-purple-500 underline-offset-8 hover:text-purple-400 transition-colors"
              >
                추가 신청하기
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">성함 / 단체명</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                placeholder="예: 예술초등학교"
                className={inputClasses('name')}
              />
              {touched.name && errors.name && (
                <p className="text-[11px] text-red-400 ml-1 font-bold">{errors.name}</p>
              )}
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">연락처</label>
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                onBlur={() => handleBlur('contact')}
                placeholder="예: 010-0000-0000"
                className={inputClasses('contact')}
              />
              {touched.contact && errors.contact && (
                <p className="text-[11px] text-red-400 ml-1 font-bold">{errors.contact}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">이메일 주소</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder="example@email.com"
                className={inputClasses('email')}
              />
              {touched.email && errors.email && (
                <p className="text-[11px] text-red-400 ml-1 font-bold">{errors.email}</p>
              )}
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">희망 일정</label>
              <input
                type="date"
                name="date"
                min={today}
                value={formData.date}
                onChange={handleChange}
                onBlur={() => handleBlur('date')}
                className={inputClasses('date')}
              />
              {touched.date && errors.date && (
                <p className="text-[11px] text-red-400 ml-1 font-bold">{errors.date}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">강의 분야</label>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500 transition-all appearance-none cursor-pointer text-sm font-medium"
              >
                <option value="학교문화예술교육" className="bg-neutral-900">학교문화예술교육</option>
                <option value="사회문화예술교육" className="bg-neutral-900">사회문화예술교육</option>
                <option value="전문인력양성" className="bg-neutral-900">전문인력양성</option>
                <option value="공연기획제작" className="bg-neutral-900">공연기획 및 제작</option>
                <option value="바이블플레이" className="bg-neutral-900">바이블플레이</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">상세 의뢰 내용</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              onBlur={() => handleBlur('content')}
              rows={5}
              placeholder="강의 대상, 인원, 구체적인 희망 내용 등을 적어주세요."
              className={inputClasses('content')}
            ></textarea>
            {touched.content && errors.content && (
              <p className="text-[11px] text-red-400 ml-1 font-bold">{errors.content}</p>
            )}
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{ backgroundColor: config.primaryColor }}
            >
              {status === 'submitting' ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  제출 중...
                </>
              ) : '신청서 제출하기'}
            </button>
            
            {(status === 'error' && !isFormValid()) && (
              <p className="text-center text-red-500 text-[11px] font-black uppercase tracking-widest animate-pulse">
                입력하신 내용에 오류가 있습니다.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default RequestForm;
