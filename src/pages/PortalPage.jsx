import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Store, HeartHandshake, Shield, Layers, HelpCircle } from 'lucide-react';
import { DB } from '../utils/database';

export default function PortalPage() {
  const [appType, setAppType] = useState('Vendor');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    offerings: '',
    experience: '',
    instagram: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    DB.saveApplication({
      type: appType,
      ...formData
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-teal-glow" />
          <span>Frequency Shift Labs · Partner Application</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold gold-gradient-text uppercase">
          Co-Create the Sensorium Sanctuary
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          We invite conscious artisans, organic elixir crafters, thought leaders, and holistic facilitators to join our September 19 gathering.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => { setAppType('Vendor'); setSubmitted(false); }}
          className={`flex items-center space-x-2 px-6 py-3.5 rounded-2xl border text-xs font-bold uppercase tracking-wider transition duration-300 ${
            appType === 'Vendor'
              ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-slate-950 border-gold-400 shadow-lg shadow-gold-500/20'
              : 'glass-card border-white/10 text-slate-300 hover:text-white'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Conscious Vendor</span>
        </button>

        <button
          onClick={() => { setAppType('Practitioner'); setSubmitted(false); }}
          className={`flex items-center space-x-2 px-6 py-3.5 rounded-2xl border text-xs font-bold uppercase tracking-wider transition duration-300 ${
            appType === 'Practitioner'
              ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 border-teal-300 shadow-lg shadow-teal-500/20'
              : 'glass-card border-white/10 text-slate-300 hover:text-white'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Facilitator / Panelist</span>
        </button>
      </div>

      {/* Application Form */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-gold-metallic/30 shadow-2xl">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-teal-500/20 border border-teal-400 flex items-center justify-center text-teal-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-100">
              Application Received
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Your application has been stored directly in our Sanctuary Lead CRM. Our partnership committee will review your profile and reach out via email/WhatsApp.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', contact: '', email: '', phone: '', offerings: '', experience: '', instagram: '' });
              }}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-slate-200 font-semibold tracking-wider uppercase transition"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gold-300 uppercase">
                  {appType === 'Vendor' ? 'Brand / Business Name' : 'Full Name & Title'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={appType === 'Vendor' ? 'e.g. Solaris Herbal Elixirs' : 'e.g. Dr. Maya Lin, Sound Healer'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#070C0F] border border-gold-metallic/20 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gold-300 uppercase">
                  Primary Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#070C0F] border border-gold-metallic/20 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gold-300 uppercase">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@brand.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#070C0F] border border-gold-metallic/20 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gold-300 uppercase">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#070C0F] border border-gold-metallic/20 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-400"
                />
              </div>

            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gold-300 uppercase">
                {appType === 'Vendor' ? 'Products / Offerings / Services' : 'Modality / Workshop Description'} *
              </label>
              <textarea
                rows={3}
                required
                placeholder={
                  appType === 'Vendor'
                    ? 'Describe your offerings (e.g. raw cacao, herbal tonics, crystals, biohacking gear, handmade apparel)...'
                    : 'Describe your workshop, modality, or keynote topic (e.g. 432Hz Sound Journey, Somatic Breathwork, Cold Plunge Protocol)...'
                }
                value={formData.offerings}
                onChange={(e) => setFormData({ ...formData, offerings: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#070C0F] border border-gold-metallic/20 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gold-300 uppercase">
                Instagram Profile / Website
              </label>
              <input
                type="text"
                placeholder="@yourhandle or https://..."
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#070C0F] border border-gold-metallic/20 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-slate-950 font-bold text-xs tracking-widest uppercase transition duration-300 shadow-xl shadow-gold-500/25 flex items-center justify-center space-x-2"
            >
              <span>Submit {appType} Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}
      </div>

    </div>
  );
}
