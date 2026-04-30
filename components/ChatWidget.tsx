'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';

/** Expand icon */
function ExpandIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

/** Collapse icon */
function CollapseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3v3a2 2 0 0 1-2 2H3" /><path d="M21 8h-3a2 2 0 0 1-2-2V3" />
      <path d="M3 16h3a2 2 0 0 1 2 2v3" /><path d="M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-pcbot', handleOpen);
    return () => window.removeEventListener('open-pcbot', handleOpen);
  }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: '¡Hola! Soy PCBot, tu asesor personal de computadoras 🖥️\n\n¿Para qué vas a usar tu nueva PC y cuál es tu presupuesto aproximado en USD?',
      },
    ],
  });

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Detect when the model is actively calling the inventory tool
  const lastMsg = messages[messages.length - 1];
  const isCallingTool =
    isLoading &&
    lastMsg?.role === 'assistant' &&
    // @ts-ignore — toolInvocations exists at runtime in AI SDK 4.x
    (lastMsg?.toolInvocations?.length ?? 0) > 0 &&
    // @ts-ignore
    lastMsg?.toolInvocations?.some((t: any) => t.state === 'call' || t.state === 'partial-call');

  // Skip empty-content assistant messages (tool-call intermediates that caused blank bubbles)
  const visibleMessages = messages.filter((m) => m.content.trim() !== '');

  const panelStyle = isExpanded
    ? { width: 'min(620px, calc(100vw - 32px))', height: 'min(740px, calc(100vh - 100px))' }
    : { width: 'min(380px, calc(100vw - 32px))', height: '520px' };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div
          className="flex flex-col bg-gray-900 border border-gray-700/60 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out"
          style={panelStyle}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">PCBot</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-indigo-200 text-xs">Asesor en línea</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded((p) => !p)}
                className="text-white/70 hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10"
                title={isExpanded ? 'Reducir' : 'Expandir'}
              >
                {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-base"
                title="Cerrar"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">

            {/* Error banner */}
            {error && (
              <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-3 text-xs text-red-300 flex items-start gap-2">
                <span className="shrink-0">⚠️</span>
                <div>
                  <p className="font-semibold mb-1">Error de conexión</p>
                  <p className="text-red-400">{error.message}</p>
                  <button
                    onClick={() => reload()}
                    className="mt-2 text-indigo-300 hover:text-white underline text-xs"
                  >
                    Reintentar →
                  </button>
                </div>
              </div>
            )}

            {/* Visible messages only — empty-content messages filtered out */}
            {visibleMessages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && <span className="text-base mr-2 mt-1 shrink-0">🤖</span>}
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-gray-800 text-gray-100 rounded-bl-sm border border-gray-700/50'
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-sans">{m.content}</pre>
                </div>
                {m.role === 'user' && <span className="text-base ml-2 mt-1 shrink-0">👤</span>}
              </div>
            ))}

            {/* Loading indicator with tool-call awareness */}
            {isLoading && (
              <div className="flex justify-start">
                <span className="text-base mr-2 mt-1">🤖</span>
                <div className="bg-gray-800 border border-gray-700/50 rounded-2xl rounded-bl-sm px-4 py-3">
                  {isCallingTool ? (
                    <span className="text-xs text-indigo-300 animate-pulse">🔍 Consultando inventario...</span>
                  ) : (
                    <div className="flex gap-1.5 items-center">
                      {[0, 150, 300].map((delay) => (
                        <span
                          key={delay}
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2 px-3 py-3 border-t border-gray-700/60 bg-gray-900 shrink-0">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Escribí tu mensaje..."
              disabled={isLoading}
              autoComplete="off"
              className="flex-1 bg-gray-800 text-white text-sm rounded-xl px-3 py-2.5 border border-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 disabled:opacity-50 placeholder-gray-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            >
              ➤
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen((p) => !p)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gradient-to-br from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white'
        }`}
      >
        <span className="text-2xl">{isOpen ? '✕' : '💬'}</span>
      </button>

      {!isOpen && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-950 animate-pulse-slow" />
      )}
    </div>
  );
}
