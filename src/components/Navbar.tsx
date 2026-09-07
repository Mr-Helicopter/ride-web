import React, { useEffect, useState } from 'react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-white no-underline group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-8 h-8 rounded-full bg-[#0066cc] flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-lg tracking-tight text-white font-['SF_Pro_Display']">
              Ride
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase px-1.5 py-0.5 rounded bg-white/10 text-white/70 border border-white/10">
              Dubai
            </span>
          </div>
        </a>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          <button
            onClick={() => scrollTo('feature-wrong-bus')}
            className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer text-sm font-medium text-white/70 hover:text-white"
          >
            Wrong Bus Detection
          </button>
          <button
            onClick={() => scrollTo('feature-alarm')}
            className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer text-sm font-medium text-white/70 hover:text-white"
          >
            Deboard Alarm
          </button>
          <button
            onClick={() => scrollTo('feature-summary')}
            className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer text-sm font-medium text-white/70 hover:text-white"
          >
            Trip Summary
          </button>
          <button
            onClick={() => scrollTo('feature-network')}
            className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer text-sm font-medium text-white/70 hover:text-white"
          >
            Dubai Network
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('download');
            }}
            className="btn-primary text-xs tracking-tight shadow-md hover:shadow-blue-500/20"
          >
            <span>Get the App</span>
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};
