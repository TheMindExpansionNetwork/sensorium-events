import React, { useState } from 'react';
import { Calendar, MapPin, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SENSORIUM_DATA } from '../data/sensoriumData';
import { DB } from '../utils/database';

export default function HomePage({ setView }) {
  const [leadEmail, setLeadEmail] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadEmail) return;
    DB.saveLead({ name: leadName || 'Conscious Explorer', email: leadEmail, interest: 'Newsletter & Updates' });
    setLeadSubmitted(true);
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12">
        
        {/* Background Ambient Aura */}
        <div className="absolute inset-0 z-0 opacity-40 light:opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-metallic/15 blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-teal-glow/15 blur-[140px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          
          {/* Sacred Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-card border border-gold-metallic/40 text-xs tracking-widest text-gold-300 light:text-amber-800 uppercase font-medium shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-teal-glow light:text-teal-600 animate-pulse" />
            <span>Frequency Shift Labs Presents</span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black tracking-wider uppercase">
              <span className="gold-gradient-text">SENSORIUM</span>
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-teal-300 light:text-teal-700 font-semibold tracking-[0.2em] uppercase">
              {SENSORIUM_DATA.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 light:text-slate-700 leading-relaxed font-normal">
            {SENSORIUM_DATA.description}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={SENSORIUM_DATA.nextEvent.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-slate-950 font-bold text-sm tracking-widest uppercase transition duration-300 shadow-xl shadow-gold-500/25 flex items-center justify-center space-x-2"
            >
              <span>Explore Sep 19 Gathering</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => { setView('portal'); window.scrollTo({top:0, behavior:'smooth'}); }}
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-card border border-teal-400/40 hover:border-teal-glow text-teal-300 light:text-teal-800 hover:text-white light:hover:text-teal-950 font-semibold text-sm tracking-widest uppercase transition duration-300"
            >
              Apply as Vendor / Facilitator
            </button>
          </div>

          {/* Location & Time Snippet */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 light:text-slate-600 font-medium">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gold-400 light:text-amber-700" />
              <span>Saturday, September 19, 2026 · 4PM–11PM</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-teal-400 light:text-teal-700" />
              <span>Casa Mannabliss · Delray Beach, FL</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4 CORE PILLARS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <div className="text-xs font-semibold text-teal-400 light:text-teal-700 tracking-widest uppercase">
            The Living Foundation
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-gradient-text uppercase">
            Four Pillars of Sensorium
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SENSORIUM_DATA.pillars.map((p, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl space-y-4 hover:scale-[1.02] transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/20 to-teal-500/20 border border-gold-metallic/30 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-gold-400 light:text-amber-700" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-100 light:text-slate-900">
                {p.title}
              </h3>
              <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed font-normal">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2026 EVENT CALENDAR TIMELINE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <div className="text-xs font-semibold text-gold-400 light:text-amber-700 tracking-widest uppercase">
            2026 Continuum
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-gradient-text uppercase">
            Monthly Gathering Series
          </h2>
        </div>

        <div className="space-y-6">
          {SENSORIUM_DATA.schedule.map((item, idx) => (
            <div 
              key={idx}
              className={`p-6 sm:p-8 rounded-2xl glass-card border transition duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                item.status === 'Register Now' 
                  ? 'border-gold-metallic/50 shadow-2xl shadow-gold-500/10' 
                  : 'border-white/10 light:border-slate-300 opacity-80'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-teal-500/20 text-teal-300 light:text-teal-800 border border-teal-500/30">
                    {item.date}
                  </span>
                  <span className="text-xs text-gold-400 light:text-amber-700 font-semibold">
                    {item.edition}
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-100 light:text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600">
                  {item.subtitle}
                </p>
              </div>

              <div className="shrink-0">
                {item.status === 'Register Now' ? (
                  <button
                    onClick={() => { setView('landing'); window.scrollTo({top:0, behavior:'smooth'}); }}
                    className="px-6 py-3 rounded-full bg-gold-metallic hover:bg-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition duration-300 shadow-md flex items-center space-x-2"
                  >
                    <span>View Campaign</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs text-slate-400 light:text-slate-600 font-medium px-4 py-2 rounded-full border border-white/10 light:border-slate-300">
                    Completed · Recorded
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EQUITABLE PROCEEDS SPLIT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-gold-metallic/30 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-teal-400 light:text-teal-700 tracking-widest uppercase">
              Radical Transparency
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text uppercase">
              "Your Energy Flows Where Your Money Goes"
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 font-normal">
              All revenue is purposefully transparent so you know exactly how every ticket and vendor contribution supports practitioners and local impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Ticket Split */}
            <div className="space-y-4 p-6 rounded-2xl bg-[#060B0E] light:bg-slate-50 border border-gold-metallic/20 light:border-amber-700/20">
              <div className="font-serif text-base font-bold text-gold-300 light:text-amber-800 flex items-center justify-between">
                <span>Ticket Revenue Distribution</span>
                <span className="text-xs font-sans text-teal-400 light:text-teal-700 font-semibold">Practitioners First</span>
              </div>
              <div className="space-y-3">
                {SENSORIUM_DATA.revenueSplit.tickets.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs pb-2 border-b border-white/5 light:border-slate-200">
                    <div>
                      <div className="text-slate-200 light:text-slate-800 font-medium">{t.label}</div>
                      <div className="text-[11px] text-slate-400 light:text-slate-500">{t.desc}</div>
                    </div>
                    <div className="font-bold text-gold-400 light:text-amber-700 text-sm">{t.pct}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendor Split */}
            <div className="space-y-4 p-6 rounded-2xl bg-[#060B0E] light:bg-slate-50 border border-teal-500/20 light:border-teal-700/20">
              <div className="font-serif text-base font-bold text-teal-300 light:text-teal-800 flex items-center justify-between">
                <span>Vendor &amp; Sponsorship Split</span>
                <span className="text-xs font-sans text-gold-400 light:text-amber-700 font-semibold">Sustainable Ecosystem</span>
              </div>
              <div className="space-y-3">
                {SENSORIUM_DATA.revenueSplit.vendors.map((v, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs pb-2 border-b border-white/5 light:border-slate-200">
                    <div>
                      <div className="text-slate-200 light:text-slate-800 font-medium">{v.label}</div>
                      <div className="text-[11px] text-slate-400 light:text-slate-500">{v.desc}</div>
                    </div>
                    <div className="font-bold text-teal-400 light:text-teal-700 text-sm">{v.pct}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* LEAD CAPTURE NEWSLETTER */}
      <section className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <div className="w-12 h-12 mx-auto rounded-full bg-gold-500/20 border border-gold-metallic/40 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-gold-metallic light:text-amber-700" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 light:text-slate-900 uppercase">
            Join the Sanctuary Frequency
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 font-normal">
            Receive monthly integration guides, early workshop reservations, and conscious community briefs.
          </p>
        </div>

        {leadSubmitted ? (
          <div className="p-4 rounded-xl bg-teal-500/20 border border-teal-400 text-teal-300 light:text-teal-800 text-xs font-semibold flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>You have entered the frequency. Check your inbox soon!</span>
          </div>
        ) : (
          <form onSubmit={handleLeadSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full bg-[#0E161C] light:bg-white border border-gold-metallic/20 light:border-slate-300 text-xs text-slate-100 light:text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-400"
            />
            <input
              type="email"
              required
              placeholder="Your Email"
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full bg-[#0E161C] light:bg-white border border-gold-metallic/20 light:border-slate-300 text-xs text-slate-100 light:text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-400"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-gold-metallic hover:bg-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>

    </div>
  );
}
