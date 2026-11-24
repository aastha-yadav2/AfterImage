import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CaptureStoryPage } from './pages/CaptureStoryPage';
import { MissingQuestionsEnginePage } from './pages/MissingQuestionsEnginePage';
import { LivingArchivePage } from './pages/LivingArchivePage';
import { StoryDetailPage } from './pages/StoryDetailPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-charcoal-950 text-parchment-200">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/capture" element={<CaptureStoryPage />} />
            <Route path="/missing-questions" element={<MissingQuestionsEnginePage />} />
            <Route path="/archive" element={<LivingArchivePage />} />
            <Route path="/story/:id" element={<StoryDetailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
