import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b0c0e] text-neutral-500 text-xs border-t border-white/10 py-16 px-6 lg:px-16 z-20 relative pointer-events-auto">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Disclaimers & Notes */}
        <div className="space-y-3 leading-relaxed border-b border-white/10 pb-8 text-[11px] text-neutral-500">
          <p>
            1. GPS Wrong Transit Detection relies on device location services and real-time open schedule feeds. Cellular or satellite reception inside underground metro tunnels may rely on station WiFi positioning beacons.
          </p>
          <p>
            2. Nol card balance synchronization requires an NFC-enabled iPhone (iPhone 7 or newer) or Android smartphone running the latest Ride application release.
          </p>
          <p>
            3. Dubai Metro, Dubai Tram, and Dubai Bus are registered trademarks and services operated under Dubai Roads and Transport Authority (RTA). Ride is an independent navigation platform optimized for Dubai transit commuters.
          </p>
        </div>

        {/* Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#0066cc] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
            <span className="text-white font-medium">Ride Dubai</span>
            <span className="text-neutral-600">|</span>
            <span>Copyright © 2026 Ride Inc. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <a href="#transit-data" className="hover:text-white transition-colors">
              Transit Data API
            </a>
            <a href="#support" className="hover:text-white transition-colors">
              Help Center
            </a>
            <span className="text-neutral-400 font-arabic">United Arab Emirates (English / العربية)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
