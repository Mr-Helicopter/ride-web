import React from 'react';

export const FeatureStories: React.FC = () => {
  return (
    <div className="relative z-20 pointer-events-auto">
      {/* ------------------------------------------------------------- */}
      {/* FEATURE 1: WRONG BUS DETECTION                               */}
      {/* ------------------------------------------------------------- */}
      <section
        id="feature-wrong-bus"
        className="min-h-screen flex flex-col justify-center px-6 lg:px-16 py-28 relative bg-gradient-to-b from-black/90 via-black/70 to-black/90 text-white border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff453a]/15 border border-[#ff453a]/30">
              <span className="w-2 h-2 rounded-full bg-[#ff453a] animate-ping"></span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#ff453a]">
                GPS Telemetry Intelligence
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-['SF_Pro_Display'] leading-[1.05]">
              Boarded the wrong bus?
              <br />
              <span className="text-[#ff453a]">Ride alerts you instantly.</span>
            </h2>

            <p className="text-lg sm:text-xl text-neutral-300 max-w-lg leading-relaxed font-normal">
              Dubai&apos;s transit hubs are bustling. If you step onto <span className="text-white font-medium">Bus 84</span> instead of <span className="text-white font-medium">Bus 8</span> towards JBR, Ride detects route trajectory divergence within seconds and notifies you via Dynamic Island before you drift off course.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#ff453a]/40 transition-colors">
                <div className="text-2xl mb-2">⚡️</div>
                <h4 className="text-base font-semibold text-white mb-1">
                  Sub-second GPS Tracking
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Real-time sensor fusion compares heading and speed with active RTA schedules.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#ff453a]/40 transition-colors">
                <div className="text-2xl mb-2">🏝️</div>
                <h4 className="text-base font-semibold text-white mb-1">
                  Dynamic Island Expand
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Pops with high-priority visual guidance and single-tap next-stop correction.
                </p>
              </div>
            </div>

            {/* Live Status Simulation Tag */}
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              <p className="text-xs text-red-200 font-mono">
                Simulated alert: &quot;Wrong vehicle detected near Dubai Marina Tram • Deboard at next stop&quot;
              </p>
            </div>
          </div>

          {/* Right Spacer for 3D Model Dynamic Island Focus (desktop only) */}
          <div className="hidden lg:block lg:col-span-6 lg:min-h-[640px] pointer-events-none" />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FEATURE 2: DEBOARD SLEEP ALARM                               */}
      {/* ------------------------------------------------------------- */}
      <section
        id="feature-alarm"
        className="min-h-screen flex flex-col justify-center px-6 lg:px-16 py-28 relative bg-gradient-to-b from-black/90 via-[#121214]/80 to-black/90 text-white border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff9f0a]/15 border border-[#ff9f0a]/30">
              <span className="w-2 h-2 rounded-full bg-[#ff9f0a] animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#ff9f0a]">
                Smart Sleep Companion
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-['SF_Pro_Display'] leading-[1.05]">
              Sleep peacefully.
              <br />
              <span className="text-[#ff9f0a]">Wake up one stop before.</span>
            </h2>

            <p className="text-lg sm:text-xl text-neutral-300 max-w-lg leading-relaxed">
              Long day across town? Catch up on rest whether riding the Dubai Metro Red Line from Centrepoint to Expo 2020 or commuting along the Tram. Ride sounds a gentle wake-up chime and haptic pulse precisely one station before your stop.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#ff9f0a]/40 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#ff9f0a]/20 flex items-center justify-center text-[#ff9f0a] text-sm font-bold mb-3">
                  1
                </div>
                <h4 className="text-base font-semibold text-white mb-1">
                  Pre-Stop Geofence
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Calculates live train deceleration and station approach times to alert you accurately.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#ff9f0a]/40 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#ff9f0a]/20 flex items-center justify-center text-[#ff9f0a] text-sm font-bold mb-3">
                  2
                </div>
                <h4 className="text-base font-semibold text-white mb-1">
                  Headphone & Pocket Safe
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Bypasses Silent Mode for critical alarms with gentle, progressive volume escalation.
                </p>
              </div>
            </div>

            {/* Status note */}
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
              <p className="text-xs text-amber-200 font-mono">
                Active monitor: &quot;Approaching Financial Centre • Next stop: Burj Khalifa / Dubai Mall&quot;
              </p>
            </div>
          </div>

          {/* Right Spacer for 3D Phone Alarm View (desktop only) */}
          <div className="hidden lg:block lg:col-span-6 lg:min-h-[640px] pointer-events-none" />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FEATURE 3: FINAL TRIP SUMMARY (TL;DR)                         */}
      {/* ------------------------------------------------------------- */}
      <section
        id="feature-summary"
        className="min-h-screen flex flex-col justify-center px-6 lg:px-16 py-28 relative bg-gradient-to-b from-black/90 via-black/70 to-black/90 text-white border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left spacer for phone showcase angle (desktop only) */}
          <div className="hidden lg:block lg:col-span-6 order-2 lg:order-1 lg:min-h-[640px] pointer-events-none" />

          {/* Right Text Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#30d158]/15 border border-[#30d158]/30">
              <span className="w-2 h-2 rounded-full bg-[#30d158]"></span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#30d158]">
                Intelligent Trip Summary
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-['SF_Pro_Display'] leading-[1.05]">
              Your whole commute.
              <br />
              <span className="text-[#30d158]">Summarized in 3 sentences.</span>
            </h2>

            <p className="text-lg sm:text-xl text-neutral-300 max-w-lg leading-relaxed">
              No need to dig through transit receipts or check multiple Nol history logs. The moment your journey ends, Ride generates an AI-powered digest of your commute.
            </p>

            {/* TLDR Mockup Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs font-semibold text-[#30d158] uppercase tracking-wider">
                  Example Journey TL;DR
                </span>
                <span className="text-xs text-neutral-400">Arrived 10:15 AM</span>
              </div>
              <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                &ldquo;You traveled 18.4 km from Dubai Marina to Burj Khalifa in 34 mins via Dubai Tram and Metro Red Line. A seamless transfer occurred at DMCC Station with zero delays. You saved 3.2 kg CO₂ and AED 42 compared to driving.&rdquo;
              </p>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800/80 text-center">
                <div>
                  <div className="text-xs text-neutral-500 font-medium">FARE</div>
                  <div className="text-base font-bold text-white">AED 7.50</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 font-medium">TIME</div>
                  <div className="text-base font-bold text-[#2997ff]">34 min</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 font-medium">CO₂ SAVED</div>
                  <div className="text-base font-bold text-[#30d158]">3.2 kg</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
