import React from 'react';
import { Instagram, MessageCircle, Mail, MapPin, Heart, Sparkles, ExternalLink } from 'lucide-react';
import { SENSORIUM_DATA } from '../data/sensoriumData';

export default function Footer({ setView }) {
  return (
    <footer className="bg-[#030608] border-t border-gold-metallic/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <img 
                src="./assets/sensorium_logo.png" 
                alt="Sensorium" 
                className="w-10 h-10 rounded-full border border-gold-metallic/30"
              />
              <span className="font-serif text-lg font-bold gold-gradient-text tracking-widest">
                SENSORIUM
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {SENSORIUM_DATA.tagline}
            </p>
            <div className="text-[11px] text-teal-400 font-medium">
              A Frequency Shift Labs Experience · Delray Beach, FL
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <div className="font-serif text-sm font-semibold text-gold-metallic tracking-wider uppercase">
              Experience
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => { setView('home'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-teal-300 transition">
                  Overview & Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => { setView('landing'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-teal-300 transition">
                  Ancient Tools vs Modern Science
                </button>
              </li>
              <li>
                <button onClick={() => { setView('portal'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-teal-300 transition">
                  Vendor & Practitioner Portal
                </button>
              </li>
              <li>
                <button onClick={() => { setView('admin'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-teal-300 transition">
                  CRM & Portal Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Next Event Info */}
          <div className="space-y-3">
            <div className="font-serif text-sm font-semibold text-gold-metallic tracking-wider uppercase">
              Next Gathering
            </div>
            <div className="text-xs text-slate-300 font-medium">
              {SENSORIUM_DATA.nextEvent.date}
            </div>
            <div className="text-xs text-slate-400 flex items-start space-x-1.5">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>{SENSORIUM_DATA.nextEvent.venue} · {SENSORIUM_DATA.nextEvent.address}</span>
            </div>
            <a
              href={SENSORIUM_DATA.nextEvent.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-gold-400 hover:text-gold-300 font-semibold pt-1"
            >
              <span>RSVP on SweatPals</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Direct Community Channels */}
          <div className="space-y-3">
            <div className="font-serif text-sm font-semibold text-gold-metallic tracking-wider uppercase">
              Connect Directly
            </div>
            <div className="space-y-2">
              <a 
                href={SENSORIUM_DATA.nextEvent.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs text-slate-400 hover:text-teal-300 transition"
              >
                <Instagram className="w-4 h-4 text-teal-400" />
                <span>@sensorium_presents</span>
              </a>
              <a 
                href={SENSORIUM_DATA.nextEvent.whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs text-slate-400 hover:text-teal-300 transition"
              >
                <MessageCircle className="w-4 h-4 text-teal-400" />
                <span>Join WhatsApp Sanctuary</span>
              </a>
              <a 
                href={`mailto:${SENSORIUM_DATA.nextEvent.email}`}
                className="flex items-center space-x-2 text-xs text-slate-400 hover:text-teal-300 transition"
              >
                <Mail className="w-4 h-4 text-teal-400" />
                <span>{SENSORIUM_DATA.nextEvent.email}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 space-y-4 md:space-y-0">
          <div>
            © 2026 Frequency Shift Labs · SENSORIUM. All rights reserved.
          </div>
          <div className="flex items-center space-x-2">
            <span>Built with Sacred Flow</span>
            <Heart className="w-3 h-3 text-gold-metallic" />
            <span>for the Conscious Living Movement</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
