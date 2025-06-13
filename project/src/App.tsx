import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useGlobalStorage } from './hooks/useGlobalStorage';
import { initialData } from './data/initialData';
import { SiteContent } from './types';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import ShowcaseSection from './components/ShowcaseSection';
import CourseSection from './components/CourseSection';
import BrandsSection from './components/BrandsSection';
import FeaturesSection from './components/FeaturesSection';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';
import LoginModal from './components/LoginModal';

function App() {
  const [content, setContent, isLoading] = useGlobalStorage<SiteContent>('siteContent', initialData);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Admin credentials
  const ADMIN_EMAIL = 'bxatik2@gmail.com';
  const ADMIN_PASSWORD = 'Ax9090@#';

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Secret key combination: Ctrl + Shift + A
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        setShowAdminButton(true);
        setShowLoginModal(true);
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Apply theme colors to CSS variables
  useEffect(() => {
    if (content.themeColors) {
      const root = document.documentElement;
      Object.entries(content.themeColors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    }
  }, [content.themeColors]);

  // Apply font settings to CSS variables
  useEffect(() => {
    if (content.fontSettings) {
      const root = document.documentElement;
      const { headings, body, display } = content.fontSettings;
      
      // Apply fonts to CSS custom properties
      root.style.setProperty('--font-headings', `"${headings}", sans-serif`);
      root.style.setProperty('--font-body', `"${body}", sans-serif`);
      root.style.setProperty('--font-display', `"${display}", sans-serif`);
      
      // Apply to document body for immediate effect
      document.body.style.fontFamily = `"${body}", sans-serif`;
    }
  }, [content.fontSettings]);

  const handleLogin = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdminMode(true);
      return true;
    }
    return false;
  };

  const handleCloseAdmin = () => {
    setIsAdminMode(false);
  };

  const handleAdminToggle = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleContentUpdate = async (newContent: SiteContent) => {
    await setContent(newContent);
    console.log('🌍 Content updated globally - all users will see changes!');
  };

  // Show loading state while content is being loaded
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading website content...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: content.themeColors?.background || '#ffffff' }}
    >
      <Header 
        onAdminToggle={handleAdminToggle}
        isAdminMode={isAdminMode}
        showAdminButton={showAdminButton}
        themeColors={content.themeColors}
        headerSettings={content.headerSettings}
      />
      
      <main>
        <HeroSection hero={content.hero} themeColors={content.themeColors} />
        <StatsSection stats={content.stats} themeColors={content.themeColors} />
        <ShowcaseSection 
          courses={content.courses} 
          isVisible={content.showcaseSettings?.isVisible !== false}
          themeColors={content.themeColors}
        />
        <BrandsSection brands={content.brands} />
        <FeaturesSection features={content.features} themeColors={content.themeColors} />
        <PortfolioSection 
          portfolio={content.portfolio} 
          categories={content.categories} 
          content={content} 
        />
        <ContactSection contactInfo={content.contactInfo} themeColors={content.themeColors} />
      </main>

      <Footer content={content} />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* Admin Panel */}
      {isAdminMode && (
        <AdminPanel
          content={content}
          onUpdate={handleContentUpdate}
          onClose={handleCloseAdmin}
        />
      )}

      {/* Admin Access Instructions */}
      {showAdminButton && !isAdminMode && (
        <div className="fixed bottom-4 left-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm z-40">
          <h4 className="font-bold mb-2">Admin Panel Access</h4>
          <p className="text-sm mb-2">
            Press <kbd className="bg-blue-800 px-2 py-1 rounded text-xs">Ctrl + Shift + A</kbd> to access the admin panel.
          </p>
          <p className="text-xs opacity-90">
            Changes will be visible to ALL users worldwide! 🌍
          </p>
          <button
            onClick={() => setShowAdminButton(false)}
            className="absolute top-1 right-1 text-white hover:text-gray-300"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;