import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PhoneScene } from './components/PhoneScene';
import { HeroSection } from './components/HeroSection';
import { FeatureStories } from './components/FeatureStories';
import { DubaiNetworkStats } from './components/DubaiNetworkStats';
import { DownloadCTA } from './components/DownloadCTA';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress across the feature story sections
      const totalScrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollableHeight > 0) {
        const currentScroll = window.scrollY;
        // Map scroll from 0 to feature story completion (~75% of total page height)
        const storyEndOffset = totalScrollableHeight * 0.75;
        const progress = Math.min(1, Math.max(0, currentScroll / storyEndOffset));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreClick = () => {
    const wrongBusEl = document.getElementById('feature-wrong-bus');
    if (wrongBusEl) {
      wrongBusEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f5f5f7] dark:bg-[#000000] text-[#1d1d1f] dark:text-white transition-colors duration-500 selection:bg-[#0066cc] selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="relative z-20">
        <div className="relative w-full">
          {/* Sticky Phone Scene */}
          <div className="sticky top-0 h-screen w-full pointer-events-none z-40">
            <PhoneScene scrollProgress={scrollProgress} />
          </div>
          
          {/* Content layered on top */}
          <div className="-mt-[100vh] relative z-10 pointer-events-none">
            <div className="pointer-events-auto">
              <HeroSection onExploreClick={handleExploreClick} />
              <FeatureStories />
            </div>
          </div>
        </div>

        <div className="relative z-20 bg-[#f5f5f7] dark:bg-[#000000]">
          <DubaiNetworkStats />
          <DownloadCTA />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
