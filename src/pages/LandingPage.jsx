import React, { useState } from 'react';
import { Calendar, MapPin, Sparkles, ExternalLink, MessageCircle, Check } from 'lucide-react';
import { SENSORIUM_DATA } from '../data/sensoriumData';
import { DB } from '../utils/database';

export default function LandingPage({ setView }) {
  const [ticketInterestEmail, setTicketInterestEmail] = useState('');
  const [ticketInterestName, setTicketInterestName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleTicketLead = (e) => {
    e.preventDefault();
    if (!ticketInterestEmail) return;
    DB.saveLead({
      name: ticketInterestName || 'Event Attendee',
      email: ticketInterestEmail,
      interest: 'Sep 19 Ticket Direct Lead'
    });
    setSubmitted(true);
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* CAMPAIGN HERO BANNER */}
      <section className="relative pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Visual Poster Frame Showcase */}
        <div className="relative rounded-3xl overflow-hidden border border-gold-metallic/40 shadow-2xl glass-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Content / Narrative */}
            <div className="p-8 sm:p-12 lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 light:text-teal-800 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-teal-glow light:text-teal-600" />
                <span>Featured Campaign · September 19, 2026</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-100 light:text-slate-900 uppercase leading-tight">
                  <span className="gold-gradient-text">Ancient Tools</span>
                  <br />
                  <span className="text-slate-200 light:text-slate-800 text-2xl sm:text-4xl">&amp; Modern Science</span>
                </h1>
                <p className="text-xs sm:text-sm text-teal-300 light:text-teal-700 font-semibold tracking-widest uppercase">
                  Natural Biohacking vs. Technology Biohacking
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 leading-relaxed font-normal">
                Where the spiritual meets the clinical. Explore the synthesis of ancestral breathwork, somatic movement, plant medicine, and sacred sound with frontier frequency technologies, cold therapy, and neuroscience.
              </p>

              {/* Event Quick Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#060C10] light:bg-slate-50 border border-gold-metallic/20 light:border-amber-700/20 space-y-1">
                  <div className="text-[10px] text-slate-400 light:text-slate-500 uppercase font-semibold">Date &amp; Time</div>
                  <div className="text-xs text-gold-300 light:text-amber-800 font-semibold">Saturday, Sep 19, 2026</div>
                  <div className="text-[11px] text-slate-400 light:text-slate-600">5:00 PM – 11:00 PM EDT</div>
                </div>

                <div className="p-4 rounded-xl bg-[#060C10] light:bg-slate-50 border border-teal-500/20 light:border-teal-700/20 space-y-1">
                  <div className="text-[10px] text-slate-400 light:text-slate-500 uppercase font-semibold">Location</div>
                  <div className="text-xs text-teal-300 light:text-teal-800 font-semibold">Casa Mannabliss Sanctuary</div>
                  <div className="text-[11px] text-slate-400 light:text-slate-600">2410 N Federal Hwy, Delray Beach</div>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <a
                  href={SENSORIUM_DATA.nextEvent.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-slate-950 font-bold text-xs tracking-widest uppercase transition duration-300 shadow-xl shadow-gold-500/20 flex items-center justify-center space-x-2"
                >
                  <span>Get SweatPals Tickets</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                
                <a
                  href={SENSORIUM_DATA.nextEvent.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full glass-card border border-teal-400/40 text-teal-300 light:text-teal-800 hover:text-white light:hover:text-teal-950 font-semibold text-xs tracking-widest uppercase transition flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4 text-teal-400 light:text-teal-600" />
                  <span>Join Chat Group</span>
                </a>
              </div>

            </div>

            {/* Right Artwork Showcase */}
            <div className="p-6 lg:p-10 lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-gold-metallic/30 shadow-2xl">
                <img 
                  src="./assets/poster_ancient_vs_modern.png" 
                  alt="Ancient Tools vs Modern Science" 
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080A] via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gold-metallic text-slate-950">
                    Official Campaign Artwork
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* TWO IMMERSIVE ZONES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-semibold text-teal-400 light:text-teal-700 tracking-widest uppercase">
            Experience Format
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-gradient-text uppercase">
            Two Containers of Transformation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Outdoor Market */}
          <div className="glass-card p-8 rounded-3xl border border-teal-500/30 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
            
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 light:text-teal-800 text-[10px] font-bold uppercase tracking-wider">
                Open to the Public · Free Entry
              </span>
              <span className="text-xs text-slate-400 light:text-slate-600 font-medium">5:00 PM – 9:30 PM</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-slate-100 light:text-slate-900">
              Outdoor Conscious Marketplace
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 leading-relaxed font-normal">
              Vibrant open-air sanctuary featuring botanical elixir bars, organic food trucks, artisanal crafts, interactive holistic vendor booths, and live acoustic frequencies under the Delray sky.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-400 light:text-slate-600">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-teal-400 light:text-teal-600" />
                <span>Adaptogenic Tonics &amp; Raw Cacao Alchemy</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-teal-400 light:text-teal-600" />
                <span>Handcrafted Crystals &amp; Sacred Geometry Art</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-teal-400 light:text-teal-600" />
                <span>Community Networking &amp; Frequency Exchange</span>
              </li>
            </ul>
          </div>

          {/* Indoor Activations */}
          <div className="glass-card p-8 rounded-3xl border border-gold-metallic/40 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl"></div>

            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 light:text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                Exclusive Ticketed Access
              </span>
              <span className="text-xs text-slate-400 light:text-slate-600 font-medium">5:00 PM – 11:00 PM</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-slate-100 light:text-slate-900">
              Indoor Sanctuary Workshops &amp; Panel
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 leading-relaxed font-normal">
              Deep immersive journey with live podcast discussions, multi-sensory breathwork journeys, sound frequency baths, cold plunges, and modern biohacking telemetry.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-400 light:text-slate-600">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-gold-400 light:text-amber-700" />
                <span>Keynote Live Podcast: Natural vs Tech Biohacking</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-gold-400 light:text-amber-700" />
                <span>432Hz Vibroacoustic Sound Healing Journey</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-gold-400 light:text-amber-700" />
                <span>Cold Plunge &amp; Cellular Activation Protocol</span>
              </li>
            </ul>
          </div>

        </div>

      </section>

      {/* MARKETING FRAME ASSET SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-semibold text-gold-metallic light:text-amber-700 tracking-widest uppercase">
            Visual Identity
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-gradient-text uppercase">
            Campaign Frame Assets
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 max-w-xl mx-auto">
            These frame variations are designed as social overlays and media assets for partner co-branding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card p-4 rounded-2xl border border-gold-metallic/20 space-y-3">
            <div className="aspect-square rounded-xl overflow-hidden border border-white/10 light:border-slate-200">
              <img src="./assets/frame_dual.png" alt="Dual Split Frame" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <div className="font-serif text-sm font-bold text-slate-200 light:text-slate-800">Variation 1: Dual Synthesis Frame</div>
              <div className="text-[11px] text-teal-400 light:text-teal-700 font-semibold">1:1 Square Overlay</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-gold-metallic/20 space-y-3">
            <div className="aspect-square rounded-xl overflow-hidden border border-white/10 light:border-slate-200">
              <img src="./assets/frame_portal.png" alt="Portal Arch Frame" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <div className="font-serif text-sm font-bold text-slate-200 light:text-slate-800">Variation 2: Bio-Digital Portal</div>
              <div className="text-[11px] text-teal-400 light:text-teal-700 font-semibold">1:1 Ceremonial Arch</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-gold-metallic/20 space-y-3">
            <div className="aspect-square rounded-xl overflow-hidden border border-white/10 light:border-slate-200">
              <img src="./assets/frame_vertical.png" alt="Vertical Story Frame" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <div className="font-serif text-sm font-bold text-slate-200 light:text-slate-800">Variation 3: Vertical Story Frame</div>
              <div className="text-[11px] text-teal-400 light:text-teal-700 font-semibold">9:16 Social Story Asset</div>
            </div>
          </div>

        </div>

      </section>

      {/* LEAD CONVERSION FOOTER BOX */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-gold-metallic/50 text-center space-y-6 shadow-2xl">
          
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold gold-gradient-text uppercase">
              Secure Your Place in the Sanctuary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 max-w-lg mx-auto font-normal">
              Spaces for the indoor workshops and immersive panels are limited to maintain the intimacy and integrity of the container.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={SENSORIUM_DATA.nextEvent.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-slate-950 font-bold text-xs uppercase tracking-widest transition duration-300 shadow-xl shadow-gold-500/25 flex items-center justify-center space-x-2"
            >
              <span>Get Tickets via SweatPals</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
