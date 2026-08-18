import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User } from 'lucide-react';
import { SENSORIUM_DATA } from '../data/sensoriumData';
import { DB } from '../utils/database';

export default function ChatBot({ setView }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: '✦ Welcome to the Sensorium Sanctuary. I am your guide for Ancient Tools & Modern Science. How can I assist your journey today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Knowledge base matching logic
    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let reply = "";

      if (lower.includes('ticket') || lower.includes('cost') || lower.includes('rsvp') || lower.includes('price')) {
        reply = `The outdoor Conscious Community Marketplace is FREE & open to all from 5:00 PM – 9:30 PM. The Indoor Exclusive Workshops & Activations are ticketed ($0–sliding options on SweatPals). You can reserve directly here: ${SENSORIUM_DATA.nextEvent.ticketUrl}`;
      } else if (lower.includes('when') || lower.includes('date') || lower.includes('time') || lower.includes('schedule')) {
        reply = `Our featured gathering is on Saturday, September 19, 2026, from 4:00 PM to 11:00 PM EDT at Casa Mannabliss in Delray Beach, FL.`;
      } else if (lower.includes('where') || lower.includes('location') || lower.includes('venue')) {
        reply = `We gather at Casa Mannabliss, located at 2410 N Federal Hwy, Delray Beach, FL. It features a lush tropical outdoor market and indoor sanctuary suites.`;
      } else if (lower.includes('vendor') || lower.includes('sell') || lower.includes('booth')) {
        reply = `We welcome conscious vendors (elixirs, herbalism, biohacking tech, holistic crafts)! You can apply immediately through our Partner Portal. Would you like me to switch you to the Portal page?`;
      } else if (lower.includes('practitioner') || lower.includes('teach') || lower.includes('workshop') || lower.includes('panel')) {
        reply = `We invite breathwork facilitators, sound healers, neuro-scientists, and movement leaders! 48% of ticket revenue is distributed evenly among facilitators. Apply in our Partner Portal!`;
      } else if (lower.includes('ancient') || lower.includes('science') || lower.includes('theme')) {
        reply = `Our September 19 theme is 'Natural Biohacking vs. Technology Biohacking: Ancient Tools & Modern Science' — exploring how ancestral breath, sound, and plants unite with frequency tech, infrared, and modern neuroscience.`;
      } else {
        reply = `Thank you for connecting with the Sensorium resonance. Whether you are seeking tickets, wanting to facilitate a workshop, or joining our vendor market, you can explore our portals or join our WhatsApp community at ${SENSORIUM_DATA.nextEvent.whatsappUrl}!`;
      }

      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      setIsTyping(false);
      DB.logEvent('bot_interaction', { query: userMsg });
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); DB.logEvent('bot_opened'); }}
          className="relative group p-4 rounded-full bg-gradient-to-r from-teal-500 via-gold-500 to-teal-400 text-slate-950 shadow-2xl shadow-teal-500/30 hover:scale-105 transition duration-300 flex items-center justify-center border border-white/20"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold-400 to-teal-400 opacity-70 blur group-hover:opacity-100 transition animate-pulse"></div>
          <div className="relative flex items-center space-x-2 font-bold text-xs uppercase tracking-wider">
            <Bot className="w-5 h-5 text-slate-950" />
            <span className="hidden sm:inline">Ask Sensorium AI</span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-2xl bg-[#080D11] light:bg-white border border-gold-metallic/30 light:border-amber-700/30 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0C151B] to-[#080D11] light:from-slate-100 light:to-slate-50 border-b border-gold-metallic/20 light:border-amber-700/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-teal-glow light:text-teal-700" />
              </div>
              <div>
                <div className="font-serif text-sm font-bold gold-gradient-text tracking-wider">
                  Sensorium Guide
                </div>
                <div className="text-[10px] text-teal-300 light:text-teal-700 font-medium">
                  Autonomous Conscious Concierge
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 light:text-slate-600 hover:text-slate-100 light:hover:text-slate-900 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-teal-600/30 border border-teal-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-teal-300 light:text-teal-700" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-slate-950 font-medium rounded-tr-none shadow-md'
                      : 'bg-[#101A20] light:bg-slate-100 border border-gold-metallic/15 light:border-slate-200 text-slate-200 light:text-slate-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
                {m.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-gold-400 light:text-amber-700" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-400 light:text-slate-500 text-[11px] italic">
                <Bot className="w-4 h-4 text-teal-400 animate-spin" />
                <span>Sensorium resonance channeling...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 bg-[#05080A] light:bg-slate-50 border-t border-white/5 light:border-slate-200 flex gap-1.5 overflow-x-auto text-[10px] text-slate-400 no-scrollbar">
            <button 
              onClick={() => setInput("How do I get tickets?")}
              className="px-2.5 py-1 rounded-full bg-white/5 light:bg-slate-200 hover:bg-gold-500/20 hover:text-gold-300 light:hover:text-amber-800 border border-white/5 light:border-slate-300 whitespace-nowrap text-slate-300 light:text-slate-700 font-medium"
            >
              🎟️ Tickets
            </button>
            <button 
              onClick={() => setInput("How to apply as a vendor?")}
              className="px-2.5 py-1 rounded-full bg-white/5 light:bg-slate-200 hover:bg-teal-500/20 hover:text-teal-300 light:hover:text-teal-800 border border-white/5 light:border-slate-300 whitespace-nowrap text-slate-300 light:text-slate-700 font-medium"
            >
              🌿 Vendor
            </button>
            <button 
              onClick={() => setInput("Tell me about Ancient vs Modern Science")}
              className="px-2.5 py-1 rounded-full bg-white/5 light:bg-slate-200 hover:bg-teal-500/20 hover:text-teal-300 light:hover:text-teal-800 border border-white/5 light:border-slate-300 whitespace-nowrap text-slate-300 light:text-slate-700 font-medium"
            >
              🧬 Theme Info
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-[#0C151B] light:bg-slate-100 border-t border-gold-metallic/20 light:border-amber-700/20 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about the event..."
              className="flex-1 bg-[#060A0D] light:bg-white border border-gold-metallic/20 light:border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-100 light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:border-teal-400"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-gold-metallic hover:bg-gold-400 text-slate-950 transition shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
