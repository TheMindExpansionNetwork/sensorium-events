import React, { useState } from 'react';
import { Sparkles, Calendar, Users, Shield, ArrowRight, Menu, X, ExternalLink } from 'lucide-react';
import { SENSORIUM_DATA } from '../data/sensoriumData';

export default function Header({ currentView, setView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#05080A]/90 backdrop-blur-md border-b border-gold-metallic/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => { setView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold-metallic/40 group-hover:border-teal-glow transition duration-300">
              <img 
                src="./assets/sensorium_logo.png" 
                alt="Sensorium Sacred Emblem" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div>
              <div className="font-serif tracking-[0.25em] text-xl font-bold gold-gradient-text uppercase">
                {SENSORIUM_DATA.name}
              </div>
              <div className="text-[10px] tracking-widest text-teal-300 font-medium uppercase -mt-0.5">
                Conscious Events
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => { setView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className={`text-sm font-medium tracking-wider transition ${
                currentView === 'home' ? 'text-gold-400 font-semibold border-b-2 border-gold-400 pb-1' : 'text-slate-300 hover:text-teal-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => { setView('landing'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className={`text-sm font-medium tracking-wider transition ${
                currentView === 'landing' ? 'text-gold-400 font-semibold border-b-2 border-gold-400 pb-1' : 'text-slate-300 hover:text-teal-300'
              }`}
            >
              Event Campaign (Sep 19)
            </button>
            <button
              onClick={() => { setView('portal'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className={`text-sm font-medium tracking-wider transition ${
                currentView === 'portal' ? 'text-gold-400 font-semibold border-b-2 border-gold-400 pb-1' : 'text-slate-300 hover:text-teal-300'
              }`}
            >
              Partner Portal
            </button>
            <button
              onClick={() => { setView('admin'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className={`text-sm font-medium tracking-wider transition flex items-center space-x-1 ${
                currentView === 'admin' ? 'text-teal-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={SENSORIUM_DATA.nextEvent.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-slate-950 font-semibold text-xs tracking-wider uppercase transition duration-300 shadow-lg shadow-gold-500/20 flex items-center space-x-2"
            >
              <span>Get Tickets</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-gold-400 p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gold-metallic/10 space-y-3">
            <button
              onClick={() => { setView('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-sm text-slate-200 hover:text-gold-400"
            >
              Overview
            </button>
            <button
              onClick={() => { setView('landing'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-sm text-slate-200 hover:text-gold-400"
            >
              Sep 19 Campaign
            </button>
            <button
              onClick={() => { setView('portal'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-sm text-slate-200 hover:text-gold-400"
            >
              Partner Application Portal
            </button>
            <button
              onClick={() => { setView('admin'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-slate-200"
            >
              Admin Lead CRM
            </button>
            <div className="pt-2">
              <a
                href={SENSORIUM_DATA.nextEvent.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-4 py-2.5 rounded-lg bg-gold-metallic text-slate-950 font-bold text-xs uppercase"
              >
                Get Tickets & RSVP
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
