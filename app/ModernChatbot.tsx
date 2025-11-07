'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const API_URL = 'https://sys-multi-agents.onrender.com';

export default function ModernChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'bot',
      text: "🤖 Hi there! I'm your Club Hub AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToBottom(), [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const addBotMessage = (text: string) =>
    setMessages((prev: Message[]) => [...prev, { id: Date.now().toString(), type: 'bot', text, timestamp: new Date() }]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage: Message = { id: Date.now().toString(), type: 'user', text: input, timestamp: new Date() };
    setMessages((prev: Message[]) => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/agents/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
  "context": {},
  "query": userInput
}),
      });

      if (res.ok) {
        const data = await res.json();
        addBotMessage(data.response || 'Got your message! 😊');
      } else throw new Error();
    } catch {
      addBotMessage('⚠️ Sorry, I can’t reach the server right now. Please try again soon!');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center bg-gradient-to-br from-[#FF0000] via-[#00BF63] to-[#FFCC00] z-50"
        >
          <div className="text-3xl">🤖</div>
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white">
              {unreadCount}
            </div>
          )}
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[420px] max-w-[90vw] h-[680px] max-h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50 animate-fadeIn">
          <div className="flex-shrink-0 p-5 bg-gradient-to-r from-[#FF0000] via-[#00BF63] to-[#FFCC00] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 text-2xl">
                🤖
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Club Hub AI</h3>
                <p className="text-white/80 text-sm">Always here to help 💬</p>
              </div>
            </div>
            <button
            title='d'
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition"
            >
              <X className="text-white w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50 scrollbar-hide">
            {messages.map((msg: Message) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`px-4 py-3 rounded-2xl max-w-[80%] shadow ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#00BF63] text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 text-gray-400 items-center">
                <Loader2 className="w-4 h-4 animate-spin" /> Typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex-shrink-0 p-4 border-t bg-white flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:ring-2 focus:ring-[#00BF63] text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-10 h-10 bg-gradient-to-r from-[#FF0000] to-[#00BF63] rounded-full flex items-center justify-center text-white hover:scale-105 transition"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
