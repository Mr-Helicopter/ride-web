import React from 'react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-24 pb-16 z-20 pointer-events-auto">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Copy Container */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6 text-left">
          {/* Eyebrow Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-pulse"></span>
            <span className="text-[12px] font-semibold tracking-wider uppercase text-neutral-800 dark:text-neutral-200">
              Dubai Public Transport Reimagined
            </span>
          </div>

          {/* Main Hero Display Headline */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#1d1d1f] dark:text-white font-['SF_Pro_Display'] leading-[0.95]">
            Ride
          </h1>

          {/* Subtitle */}
          <p className="text-2xl sm:text-3xl font-normal text-[#86868b] dark:text-[#a1a1a6] max-w-xl font-['SF_Pro_Display'] leading-snug">
            Public transport made easier.
          </p>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed">
            The intelligent navigation companion designed specifically for Dubai&apos;s Metro, Tram, and Bus network. Real-time GPS detection, automatic wake-up alarms, and instant AI trip summaries.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#download"
              className="btn-primary px-7 py-3.5 text-base font-medium shadow-lg shadow-blue-500/20"
            >
              <span>Download for iOS</span>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </a>

            <button
              onClick={onExploreClick}
              className="btn-secondary px-6 py-3.5 text-base font-medium flex items-center gap-2 hover:bg-black/10 dark:hover:bg-white/15 dark:text-white dark:border-white/20 transition-all"
            >
              <span>Scroll to Explore</span>
              <span className="text-lg">↓</span>
            </button>
          </div>

          {/* Transit Badges */}
          <div className="pt-8 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Connected with
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#e52421]/10 text-[#e52421] border border-[#e52421]/20">
                🚇 Metro Red & Green
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#e87722]/10 text-[#e87722] border border-[#e87722]/20">
                🚊 Dubai Tram
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/20">
                🚌 1,500+ Buses
              </span>
            </div>
          </div>
        </div>

        {/* Right 3D Model Placeholder spacer for layout balance */}
        <div className="lg:col-span-6 min-h-[380px] lg:min-h-[600px] pointer-events-none flex items-center justify-center">
          {/* Space occupied by 3D Three.js canvas in background */}
        </div>
      </div>
    </section>
  );
};
