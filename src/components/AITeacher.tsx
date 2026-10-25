import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Lightbulb,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ChatMessage, Language, LearningLevel } from '../types';

export const AITeacher: React.FC = () => {
  const { preferredLanguage, setPreferredLanguage, currentLevel, setCurrentLevel } = useAuth();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content:
        preferredLanguage === 'hinglish'
          ? 'Namaste! Main hoon aapka C Tutor AI. Pointers, memory allocation, arrays, structs, ya compilation pipeline—kisi bhi topic par poochiye. Agar koi cheez pehli baar mein samajh na aaye, bejhijhak bolna; main bilkul naye example se samjhaunga!'
          : preferredLanguage === 'hi'
          ? 'नमस्ते! मैं आपका सी प्रोग्रामिंग शिक्षक हूँ। पॉइंटर्स, डायनेमिक मेमोरी या किसी भी जटिल विषय पर प्रश्न पूछें। यदि समझ न आए, तो निसंकोच कहें, मैं नए उदाहरण के साथ समझाऊंगा।'
          : "Hello! I am your C Tutor AI. Ask me anything about C programming—pointers, memory layout, functions, dynamic allocation, or debug questions. If you don't understand an explanation, just let me know and I'll explain using a completely different real-world analogy!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [lastSubmittedText, setLastSubmittedText] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const starterPrompts = [
    {
      label: 'Explain Pointers with a Real-Life Analogy',
      hinglish: 'Pointers ko ek realistic real-life analogy se samjhao',
    },
    {
      label: 'malloc vs calloc difference with memory visual',
      hinglish: 'malloc aur calloc mein exact kya difference hai memory layout ke hisab se?',
    },
    {
      label: 'Why does Segmentation Fault happen?',
      hinglish: 'Segmentation fault kyu hota hai aur usse kaise bachein?',
    },
    {
      label: 'Give me a practice C challenge on loops',
      hinglish: 'Mujhe ek tricky C practice question do loops aur conditions par',
    },
  ];

  const handleSend = async (messageToSend?: string) => {
    const text = (messageToSend || input).trim();
    if (!text || loading) return;

    setErrorMessage('');
    setLastSubmittedText(text);
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language: preferredLanguage,
          level: currentLevel,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        const assistantMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        setErrorMessage(data.error || 'Could not reach Gemini AI. Please check server logs.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Network error connecting to backend service.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setInput('');
    setErrorMessage('');
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content:
          preferredLanguage === 'hinglish'
            ? 'Chat reset ho gaya hai. Aap C programming ka koi bhi sawaal pooch sakte hain!'
            : preferredLanguage === 'hi'
            ? 'बातचीत रीसेट हो गई है। आप सी प्रोग्रामिंग का कोई भी प्रश्न पूछ सकते हैं!'
            : 'Conversation reset. What C programming concept would you like to explore?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const hasUserMessages = messages.some((m) => m.role === 'user');
  const showSuggestions = !hasUserMessages && input.trim() === '' && !loading;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
      {/* Teacher Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white">C Tutor AI Assistant</h2>
              <span className="text-[11px] text-cyan-400">Gemini 3.8 Flash</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Interactive low-level systems tutor with code tracing
            </p>
          </div>
        </div>

        {/* Level and Controls */}
        <div className="flex items-center gap-2">
          {/* Level Selector */}
          <select
            value={currentLevel}
            onChange={(e) => setCurrentLevel(e.target.value as LearningLevel)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="beginner">Beginner Level</option>
            <option value="intermediate">Intermediate Level</option>
            <option value="advanced">Advanced Level</option>
          </select>

          {/* Reset button */}
          <button
            onClick={handleClearChat}
            title="Clear Chat History"
            className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Messages Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  isUser
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800 border border-slate-700 text-cyan-400'
                }`}
              >
                {isUser ? 'You' : 'AI'}
              </div>

              <div
                className={`group relative rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-cyan-600 text-white rounded-tr-xs'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-xs whitespace-pre-line'
                }`}
              >
                {msg.content}

                <div className="flex items-center justify-between gap-3 mt-2 pt-1 border-t border-white/10 text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:text-white"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 max-w-xl">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-cyan-400">
              <Sparkles className="h-4 w-4 animate-spin text-cyan-400" />
            </div>
            <div className="rounded-2xl rounded-tl-xs bg-slate-950 border border-slate-800 px-4 py-3 text-xs text-slate-300 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
              <span>AI Teacher is writing an answer...</span>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-950/20 p-3 text-xs text-rose-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => handleSend(lastSubmittedText)}
              className="font-semibold text-rose-200 underline hover:text-white"
            >
              Retry
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Chips */}
      {showSuggestions && (
        <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/40">
          <div className="text-[11px] font-medium text-slate-400 mb-2 flex items-center gap-1.5">
            <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
            <span>Popular Student Questions:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {starterPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(preferredLanguage === 'hinglish' ? prompt.hinglish : prompt.label)}
                className="rounded-lg border border-slate-800 bg-slate-900/90 px-2.5 py-1 text-[11px] text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
              >
                {preferredLanguage === 'hinglish' ? prompt.hinglish : prompt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="p-3 md:p-4 border-t border-slate-800 bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              preferredLanguage === 'hinglish'
                ? "Kuch bhi poochiye... (jaise: 'pointers ka memory address example do')"
                : preferredLanguage === 'hi'
                ? "कोई भी प्रश्न पूछें..."
                : "Ask anything about C programming, pointers, memory, or syntax..."
            }
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs md:text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-40 transition-colors shadow-sm"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};
