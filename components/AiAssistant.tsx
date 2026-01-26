
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage, SiteConfig } from '../types';

interface AiAssistantProps {
  config: SiteConfig;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message once
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'model', text: '안녕하세요! 예술꿈학교 AI 비서입니다. 어떤 도움이 필요하신가요?' }]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Create fresh instance per request to ensure latest API key is used
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `당신은 '예술꿈학교'의 친절한 상담사입니다. 
          사이트 정보: ${config.aboutText}
          예술교육 프로그램 안내를 전문으로 하며, 따뜻하고 예술적인 어조로 답변하세요. 
          답변은 한국어로 하세요.`,
        },
      });

      // Stream response from chat
      const result = await chat.sendMessageStream({ message: input });
      
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        const text = c.text; // Guideline: Use .text property, not .text()
        if (text) {
          fullText += text;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'model', text: fullText };
            return updated;
          });
        }
      }
    } catch (error: any) {
      console.error(error);
      
      // Handle missing API key or permission errors via AI Studio dialog
      if (error.message?.includes('Requested entity was not found')) {
        const hasKey = (window as any).aistudio?.hasSelectedApiKey ? await (window as any).aistudio.hasSelectedApiKey() : false;
        if (!hasKey && (window as any).aistudio?.openSelectKey) {
          if (window.confirm("AI 기능을 사용하려면 API 키 설정이 필요합니다. 설정 창을 여시겠습니까?")) {
            await (window as any).aistudio.openSelectKey();
            // Proceed assuming success per guidelines
            setMessages(prev => [...prev, { role: 'model', text: "API 키가 선택되었습니다. 다시 질문해 주세요." }]);
          }
        } else {
          setMessages(prev => [...prev, { role: 'model', text: "AI 서비스 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." }]);
        }
      } else {
        setMessages(prev => [...prev, { role: 'model', text: "죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요." }]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 group relative overflow-hidden"
        style={{ backgroundColor: config.primaryColor }}
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] glass border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="p-6 border-b border-white/5 flex items-center justify-between" style={{ backgroundColor: `${config.primaryColor}20` }}>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: config.primaryColor }} />
              <h4 className="font-black text-sm uppercase tracking-widest">Art Dream AI</h4>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-white text-black rounded-tr-none' 
                    : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                }`}>
                  {msg.text || (isTyping && i === messages.length - 1 ? '답변을 생성 중입니다...' : '')}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-black/40 border-t border-white/5">
            <div className="relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="궁금한 내용을 물어보세요..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pr-12 text-sm outline-none focus:border-purple-500 transition-all"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isTyping}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: config.primaryColor }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AiAssistant;