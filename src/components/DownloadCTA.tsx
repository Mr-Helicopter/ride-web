import React from 'react';

export const DownloadCTA: React.FC = () => {
  return (
    <section
      id="download"
      className="py-32 px-6 lg:px-16 bg-[#000000] text-white relative z-20 pointer-events-auto border-t border-white/10"
    >
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <div className="w-16 h-16 rounded-3xl bg-[#0066cc] mx-auto flex items-center justify-center shadow-2xl shadow-blue-500/40">
          <svg
            className="w-8 h-8 text-white"
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

        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-['SF_Pro_Display']">
            Experience the future of Dubai transit.
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto font-normal">
            Download Ride today. Free on the App Store and Google Play. Works across all Dubai buses, metros, trams, and ferries.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
          <button className="px-8 py-4 rounded-full bg-white text-black font-semibold text-base flex items-center gap-3 hover:bg-neutral-200 transition-all hover:scale-105 shadow-xl">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 0.6-2.65 1.35-.58.66-1.09 1.73-0.96 2.76 1 .08 2.07-.51 2.69-1.26z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold tracking-wider leading-none opacity-80">
                Download on the
              </div>
              <div className="text-base font-bold leading-tight">App Store</div>
            </div>
          </button>

          <button className="px-8 py-4 rounded-full bg-neutral-900 border border-neutral-700 text-white font-semibold text-base flex items-center gap-3 hover:bg-neutral-800 transition-all hover:scale-105 shadow-xl">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-.986V2.8a2.38 2.38 0 0 1 .609-.986zm11.235 11.238l2.58 2.58-12.023 6.942 9.443-9.522zm0-2.104L5.401 1.426l12.023 6.942-2.58 2.58zm1.488 1.052l3.44-1.986c.969-.56.969-1.468 0-2.028l-3.44-1.986-2.372 2.372 2.372 2.372z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold tracking-wider leading-none opacity-80">
                GET IT ON
              </div>
              <div className="text-base font-bold leading-tight">Google Play</div>
            </div>
          </button>
        </div>

        <div className="pt-8 flex flex-wrap justify-center items-center gap-8 text-xs text-neutral-500 font-medium">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            No Account Required
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            On-Device GPS Privacy
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Dubai RTA Compatible
          </span>
        </div>
      </div>
    </section>
  );
};
