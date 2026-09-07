import React from 'react';

export const DubaiNetworkStats: React.FC = () => {
  const networkCards = [
    {
      mode: 'Dubai Metro',
      icon: '🚇',
      line: 'Red & Green Lines',
      color: '#e52421',
      stats: '53 Stations • 89.6 km',
      description:
        'World’s longest automated driverless metro network. Real-time platform crowd sensors and transfer pathfinding.',
    },
    {
      mode: 'Dubai Tram',
      icon: '🚊',
      line: 'Marina & JBR Loop',
      color: '#e87722',
      stats: '11 Stations • 14.5 km',
      description:
        'Street-level connectivity through JBR, Dubai Marina, and Palm Jumeirah monorail interchange.',
    },
    {
      mode: 'Public Buses',
      icon: '🚌',
      line: '170+ City Routes',
      color: '#0085ca',
      stats: '1,500+ Buses • 2,100 Stops',
      description:
        'Full feeder bus synchronization (F-routes) and intercity express routes across all 7 emirates.',
    },
    {
      mode: 'Marine Transport',
      icon: '⛴️',
      line: 'Dubai Creek & Ferry',
      color: '#00a3e0',
      stats: '44 Marine Stations',
      description:
        'Traditional Abras, modern water taxis, and Dubai Ferry routes along the Arabian Gulf coastline.',
    },
  ];

  return (
    <section
      id="feature-network"
      className="min-h-screen flex flex-col justify-center px-6 lg:px-16 py-28 relative bg-[#0b0c0e] text-white border-t border-white/10 z-20 pointer-events-auto"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066cc]/15 border border-[#0066cc]/30">
            <span className="w-2 h-2 rounded-full bg-[#0066cc]"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2997ff]">
              Dubai Transit Ecosystem
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-['SF_Pro_Display']">
            Built for the entire city.
          </h2>

          <p className="text-lg text-neutral-400 leading-relaxed">
            From the futuristic towers of Downtown Dubai to the tranquil beaches of JBR and historic alleys of Deira, Ride unites Dubai&apos;s multimodal transport into one cohesive experience.
          </p>
        </div>

        {/* Network Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {networkCards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{card.icon}</span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-md"
                    style={{
                      backgroundColor: `${card.color}20`,
                      color: card.color,
                      border: `1px solid ${card.color}40`,
                    }}
                  >
                    {card.line}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{card.mode}</h3>
                <div className="text-xs font-mono text-neutral-400 mb-3">{card.stats}</div>
                <p className="text-sm text-neutral-400 leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Nol Card Integration Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0066cc]/20 via-[#1c2237] to-neutral-900 border border-[#0066cc]/30 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💳</span>
              <h4 className="text-2xl font-bold text-white font-['SF_Pro_Display']">
                Smart Nol Card Auto-Sync
              </h4>
            </div>
            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl">
              Tap your physical Nol card to your iPhone back via NFC to instantly read your remaining balance, view live trip history, and calculate tier zone discounts automatically.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold text-white border border-white/15">
              Silver Nol
            </div>
            <div className="px-4 py-2 rounded-xl bg-amber-500/20 text-xs font-semibold text-amber-300 border border-amber-500/30">
              Gold Nol
            </div>
            <div className="px-4 py-2 rounded-xl bg-red-500/20 text-xs font-semibold text-red-300 border border-red-500/30">
              Red Ticket
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
