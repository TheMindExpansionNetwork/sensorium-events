import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import PortalPage from './pages/PortalPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [currentView, setView] = useState('landing'); // Defaults to marketing campaign

  return (
    <div className="min-h-screen flex flex-col bg-[#05080A] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-gold-metallic">
      {/* Universal Sticky Header */}
      <Header currentView={currentView} setView={setView} />

      {/* Dynamic View Body */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage setView={setView} />}
        {currentView === 'landing' && <LandingPage setView={setView} />}
        {currentView === 'portal' && <PortalPage setView={setView} />}
        {currentView === 'admin' && <AdminPage setView={setView} />}
      </main>

      {/* Universal Footer */}
      <Footer setView={setView} />

      {/* Autonomous Sensorium AI Concierge Chat Bot */}
      <ChatBot setView={setView} />
    </div>
  );
}
