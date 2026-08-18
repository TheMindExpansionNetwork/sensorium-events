import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import PortalPage from './pages/PortalPage';
import AdminPage from './pages/AdminPage';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [currentView, setView] = useState('landing'); // Defaults to marketing campaign

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-[#05080A] light:bg-[#F8FAF9] text-slate-100 light:text-slate-900 font-sans selection:bg-teal-500/30 selection:text-gold-metallic transition-colors duration-300">
        {/* Universal Sticky Header with Theme Toggle */}
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
    </ThemeProvider>
  );
}
