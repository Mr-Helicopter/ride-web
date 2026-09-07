export type ShowcaseState = 'hero' | 'wrong-bus' | 'alarm' | 'summary';

export interface ScreenRenderOptions {
  state: ShowcaseState;
  progress: number; // 0 to 1 within current section
  time: number;
}

export class PhoneScreenRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  public width = 1179;
  public height = 2556;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D canvas context');
    this.ctx = ctx;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public render(options: ScreenRenderOptions): void {
    const { state, progress, time } = options;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    // Apply screen clipping with rounded corners
    this.roundRect(ctx, 0, 0, w, h, 200);
    ctx.clip();

    // 1. Background (iOS dark theme)
    ctx.fillStyle = '#0f1015';
    ctx.fillRect(0, 0, w, h);

    // Render Dubai Map Base
    this.renderDubaiMap(ctx, w, h, state, progress, time);

    // Render Header & Dynamic Island
    this.renderDynamicIsland(ctx, w, h, state, progress, time);

    // Render Bottom App Navigation
    this.renderAppNavBar(ctx, w, h, state);

    // Render State-Specific Floating Overlays
    if (state === 'hero') {
      this.renderHeroUI(ctx, w, h, progress, time);
    } else if (state === 'wrong-bus') {
      this.renderWrongBusUI(ctx, w, h, progress, time);
    } else if (state === 'alarm') {
      this.renderAlarmUI(ctx, w, h, progress, time);
    } else if (state === 'summary') {
      this.renderSummaryUI(ctx, w, h, progress, time);
    }

    // Render Home Indicator
    this.renderHomeIndicator(ctx, w, h);

    ctx.restore();
  }

  private renderDubaiMap(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    state: ShowcaseState,
    progress: number,
    time: number
  ) {
    ctx.save();

    // Map Water (Arabian Gulf)
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, w, h);

    // Coastline polygon (Dubai shape)
    ctx.fillStyle = '#1a1f2c';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w * 0.35, 0);
    ctx.bezierCurveTo(w * 0.45, h * 0.3, w * 0.2, h * 0.6, w * 0.4, h);
    ctx.lineTo(w, h);
    ctx.lineTo(w, 0);
    ctx.closePath();
    ctx.fill();

    // Subtle grid lines (Road network)
    ctx.strokeStyle = '#272f42';
    ctx.lineWidth = 3;
    for (let y = 150; y < h; y += 120) {
      ctx.beginPath();
      ctx.moveTo(w * 0.25, y);
      ctx.lineTo(w, y + (y % 80) * 0.4);
      ctx.stroke();
    }
    for (let x = w * 0.3; x < w; x += 140) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 40, h);
      ctx.stroke();
    }

    // Sheikh Zayed Road (E11 Highway)
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(w * 0.38, 0);
    ctx.bezierCurveTo(w * 0.48, h * 0.4, w * 0.42, h * 0.7, w * 0.55, h);
    ctx.stroke();

    // Metro Red Line (Red #e52421)
    ctx.strokeStyle = '#e52421';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(w * 0.4, 0);
    ctx.bezierCurveTo(w * 0.5, h * 0.4, w * 0.44, h * 0.7, w * 0.57, h);
    ctx.stroke();

    // Dubai Tram Line (Orange #e87722)
    ctx.strokeStyle = '#e87722';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(w * 0.48, h * 0.78, 140, 0.4, 3.2);
    ctx.stroke();

    // Correct Planned Route (Blue #0085ca)
    ctx.strokeStyle = '#0066cc';
    ctx.lineWidth = 10;
    ctx.setLineDash([20, 10]);
    ctx.lineDashOffset = -time * 40;
    ctx.beginPath();
    ctx.moveTo(w * 0.52, h * 0.76); // Marina / JBR
    ctx.bezierCurveTo(w * 0.46, h * 0.55, w * 0.52, h * 0.4, w * 0.46, h * 0.3); // Burj Khalifa
    ctx.stroke();
    ctx.setLineDash([]);

    // Stations / Landmarks
    this.drawStationPin(ctx, w * 0.46, h * 0.3, 'Burj Khalifa / Dubai Mall', '#e52421', true);
    this.drawStationPin(ctx, w * 0.52, h * 0.76, 'Dubai Marina (DMCC)', '#e87722', false);
    this.drawStationPin(ctx, w * 0.48, h * 0.52, 'Mall of the Emirates', '#e52421', false);

    // If in wrong-bus state, draw diverging wrong GPS trail (Red dash)
    if (state === 'wrong-bus') {
      ctx.strokeStyle = '#ff453a';
      ctx.lineWidth = 10;
      ctx.setLineDash([16, 12]);
      ctx.lineDashOffset = -time * 50;
      ctx.beginPath();
      ctx.moveTo(w * 0.52, h * 0.76);
      ctx.bezierCurveTo(w * 0.65, h * 0.7, w * 0.72, h * 0.65, w * 0.8, h * 0.6);
      ctx.stroke();
      ctx.setLineDash([]);

      // Wrong user location dot
      const dotX = w * 0.52 + (w * 0.8 - w * 0.52) * 0.6;
      const dotY = h * 0.76 + (h * 0.6 - h * 0.76) * 0.6;
      this.drawPulsingDot(ctx, dotX, dotY, '#ff453a', time, 'Bus 84 (Heading Wrong Direction)');
    } else {
      // Normal live user location dot on planned route
      const dotX = w * 0.48;
      const dotY = h * 0.62;
      this.drawPulsingDot(ctx, dotX, dotY, '#0071e3', time, 'You are on Metro Red Line');
    }

    ctx.restore();
  }

  private drawStationPin(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    label: string,
    color: string,
    isDestination: boolean
  ) {
    ctx.save();
    // Outer glow
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, isDestination ? 18 : 12, 0, Math.PI * 2);
    ctx.fill();

    // White core
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, isDestination ? 9 : 6, 0, Math.PI * 2);
    ctx.fill();

    // Label pill
    ctx.font = '600 24px -apple-system, SF Pro Text, sans-serif';
    const textWidth = ctx.measureText(label).width;
    const padding = 16;
    const pillW = textWidth + padding * 2;
    const pillH = 46;
    const pillX = x - pillW / 2;
    const pillY = y - 64;

    ctx.fillStyle = 'rgba(22, 22, 24, 0.85)';
    this.roundRect(ctx, pillX, pillY, pillW, pillH, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, pillY + pillH / 2);

    ctx.restore();
  }

  private drawPulsingDot(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    time: number,
    label?: string
  ) {
    ctx.save();
    const pulse = (Math.sin(time * 4) + 1) / 2;
    const radius = 24 + pulse * 20;

    ctx.fillStyle = color + '44';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();

    if (label) {
      ctx.font = '700 22px -apple-system, SF Pro Text, sans-serif';
      const textW = ctx.measureText(label).width;
      const pX = x - textW / 2 - 14;
      const pY = y + 26;
      ctx.fillStyle = 'rgba(15, 16, 21, 0.9)';
      this.roundRect(ctx, pX, pY, textW + 28, 40, 12);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, pY + 20);
    }
    ctx.restore();
  }

  private renderDynamicIsland(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    state: ShowcaseState,
    progress: number,
    time: number
  ) {
    ctx.save();

    // iOS Status bar time and battery
    ctx.font = '600 36px -apple-system, SF Pro Text, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.fillText('9:41', 90, 88);

    // 5G & Battery icon mockup
    ctx.textAlign = 'right';
    ctx.fillText('5G  100%', w - 90, 88);

    // Dynamic Island Geometry
    const islandCenterX = w / 2;
    const islandCenterY = 82;

    if (state === 'wrong-bus') {
      // Expanded Dynamic Island Banner - pops open promptly
      const expandProgress = Math.min(1, Math.max(0, progress * 3.2));
      const islandW = 360 + expandProgress * 680;
      const islandH = 88 + expandProgress * 150;
      const islandX = islandCenterX - islandW / 2;
      const islandY = 46;

      // Glow border
      ctx.shadowColor = '#ff453a';
      ctx.shadowBlur = 28 * expandProgress;
      ctx.fillStyle = '#000000';
      this.roundRect(ctx, islandX, islandY, islandW, islandH, 50);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = `rgba(255, 69, 58, ${0.3 + 0.5 * expandProgress})`;
      ctx.lineWidth = 3;
      ctx.stroke();

      if (expandProgress > 0.12) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, (expandProgress - 0.12) / 0.28);

        // Warning Icon
        ctx.fillStyle = '#ff453a';
        ctx.beginPath();
        ctx.arc(islandX + 60, islandY + islandH / 2, 32, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = '800 32px -apple-system, SF Pro Display, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('!', islandX + 60, islandY + islandH / 2);

        // Alert title
        ctx.fillStyle = '#ff453a';
        ctx.font = '700 32px -apple-system, SF Pro Display, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Wrong Transit Detected', islandX + 115, islandY + 60);

        // Subtitle
        ctx.fillStyle = '#ffffff';
        ctx.font = '500 24px -apple-system, SF Pro Text, sans-serif';
        ctx.fillText('GPS mismatch: Boarded Bus 84 instead of Bus 8', islandX + 115, islandY + 105);

        ctx.fillStyle = '#8e8e93';
        ctx.font = '400 22px -apple-system, SF Pro Text, sans-serif';
        ctx.fillText('Deboard at next stop: Dubai Internet City', islandX + 115, islandY + 145);

        ctx.restore();
      }
    } else {
      // Standard Pill Dynamic Island
      const pillW = 340;
      const pillH = 84;
      ctx.fillStyle = '#000000';
      this.roundRect(ctx, islandCenterX - pillW / 2, 42, pillW, pillH, 42);
      ctx.fill();

      // Camera lens reflection
      ctx.fillStyle = '#1a1a24';
      ctx.beginPath();
      ctx.arc(islandCenterX + 95, islandCenterY, 18, 0, Math.PI * 2);
      ctx.fill();

      // Mini transit icon
      ctx.fillStyle = '#0066cc';
      ctx.beginPath();
      ctx.arc(islandCenterX - 95, islandCenterY, 14, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  private renderHeroUI(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    progress: number,
    time: number
  ) {
    ctx.save();
    // Top Search Bar
    const barW = w - 120;
    const barH = 100;
    const barX = 60;
    const barY = 170;

    ctx.fillStyle = 'rgba(30, 30, 35, 0.88)';
    this.roundRect(ctx, barX, barY, barW, barH, 28);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Search Icon & Text
    ctx.fillStyle = '#8e8e93';
    ctx.font = '500 32px -apple-system, SF Pro Text, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('🔍  Where to in Dubai? (Metro, Tram, Bus)', barX + 32, barY + barH / 2);

    // Ride Quick Sheet at bottom
    const sheetH = 680;
    const sheetY = h - sheetH - 120;
    ctx.fillStyle = 'rgba(20, 21, 26, 0.95)';
    this.roundRect(ctx, 40, sheetY, w - 80, sheetH, 44);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.stroke();

    // Sheet Grabber
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    this.roundRect(ctx, w / 2 - 50, sheetY + 18, 100, 8, 4);
    ctx.fill();

    // App Branding Header
    ctx.fillStyle = '#0066cc';
    ctx.font = '800 42px -apple-system, SF Pro Display, sans-serif';
    ctx.fillText('Ride Dubai Live', 80, sheetY + 80);

    ctx.fillStyle = '#8e8e93';
    ctx.font = '400 26px -apple-system, SF Pro Text, sans-serif';
    ctx.fillText('Intelligent transit guidance with Nol sync & live GPS', 80, sheetY + 125);

    // Fast Action Chips
    const chips = [
      { label: '🚇 Metro Red Line', color: '#e52421' },
      { label: '🚊 Dubai Tram', color: '#e87722' },
      { label: '🚌 Bus 8 to JBR', color: '#0085ca' }
    ];

    let chipX = 80;
    const chipY = sheetY + 175;
    chips.forEach(chip => {
      ctx.font = '600 26px -apple-system, SF Pro Text, sans-serif';
      const cW = ctx.measureText(chip.label).width + 44;
      ctx.fillStyle = 'rgba(40, 42, 50, 0.8)';
      this.roundRect(ctx, chipX, chipY, cW, 64, 20);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(chip.label, chipX + 22, chipY + 32);
      chipX += cW + 18;
    });

    // Active Route Card Inside Sheet
    const cardY = sheetY + 270;
    ctx.fillStyle = 'rgba(32, 34, 42, 0.9)';
    this.roundRect(ctx, 80, cardY, w - 160, 320, 28);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 102, 204, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#30d158';
    ctx.font = '700 24px -apple-system, SF Pro Display, sans-serif';
    ctx.fillText('● LIVE NAVIGATION ACTIVE', 115, cardY + 45);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 36px -apple-system, SF Pro Display, sans-serif';
    ctx.fillText('To Burj Khalifa / Dubai Mall', 115, cardY + 100);

    ctx.fillStyle = '#8e8e93';
    ctx.font = '400 26px -apple-system, SF Pro Text, sans-serif';
    ctx.fillText('Take Tram from Marina → Metro Red Line from DMCC', 115, cardY + 150);

    // ETA & Nol Cost
    ctx.fillStyle = '#2997ff';
    ctx.font = '800 48px -apple-system, SF Pro Display, sans-serif';
    ctx.fillText('34 min', 115, cardY + 230);

    ctx.fillStyle = '#8e8e93';
    ctx.font = '500 26px -apple-system, SF Pro Text, sans-serif';
    ctx.fillText('AED 7.50 • 1 Transfer', 290, cardY + 230);

    ctx.restore();
  }

  private renderWrongBusUI(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    progress: number,
    time: number
  ) {
    ctx.save();

    // GPS Deviation Card
    const cardW = w - 100;
    const cardH = 460;
    const cardX = 50;
    const cardY = h - cardH - 140;

    ctx.fillStyle = 'rgba(28, 14, 14, 0.95)';
    this.roundRect(ctx, cardX, cardY, cardW, cardH, 36);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 69, 58, 0.7)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Alert Header
    ctx.fillStyle = '#ff453a';
    ctx.font = '800 38px -apple-system, SF Pro Display, sans-serif';
    ctx.fillText('⚠️ Route Mismatch Alert', cardX + 40, cardY + 60);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 30px -apple-system, SF Pro Text, sans-serif';
    ctx.fillText('You boarded Bus 84 (Towards Al Khail)', cardX + 40, cardY + 120);

    ctx.fillStyle = '#8e8e93';
    ctx.font = '400 26px -apple-system, SF Pro Text, sans-serif';
    ctx.fillText('Your planned route required Bus 8 (Towards JBR).', cardX + 40, cardY + 165);
    ctx.fillText('Real-time GPS detected route divergence 200m ago.', cardX + 40, cardY + 205);

    // Correction Action Button
    ctx.fillStyle = '#ff453a';
    this.roundRect(ctx, cardX + 40, cardY + 260, cardW - 80, 84, 24);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 30px -apple-system, SF Pro Display, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Reroute from Next Stop', cardX + cardW / 2, cardY + 302);

    ctx.fillStyle = '#ff9f0a';
    ctx.font = '500 22px -apple-system, SF Pro Text, sans-serif';
    ctx.fillText('Next Stop: Dubai Internet City (in 1.2 km)', cardX + cardW / 2, cardY + 390);

    ctx.restore();
  }

  private renderAlarmUI(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    progress: number,
    time: number
  ) {
    ctx.save();

    // Dark backdrop overlay for modal emphasis
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fillRect(0, 0, w, h);

    // Wake Up Modal Card
    const modalW = w - 80;
    const modalH = 880;
    const modalX = 40;
    const modalY = (h - modalH) / 2 + 60;

    ctx.fillStyle = 'rgba(22, 24, 32, 0.96)';
    this.roundRect(ctx, modalX, modalY, modalW, modalH, 48);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 159, 10, 0.6)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Glowing Alarm Bell Icon
    const pulse = (Math.sin(time * 6) + 1) / 2;
    ctx.fillStyle = '#ff9f0a';
    ctx.beginPath();
    ctx.arc(w / 2, modalY + 130, 60 + pulse * 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.font = '800 56px -apple-system, SF Pro Display, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⏰', w / 2, modalY + 130);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 48px -apple-system, SF Pro Display, sans-serif';
    ctx.fillText('Wake Up!', w / 2, modalY + 250);

    ctx.fillStyle = '#ff9f0a';
    ctx.font = '700 32px -apple-system, SF Pro Display, sans-serif';
    ctx.fillText('1 Stop Before Your Destination', w / 2, modalY + 310);

    // Subtitle details
    ctx.fillStyle = '#e5e5ea';
    ctx.font = '400 28px -apple-system, SF Pro Text, sans-serif';
    ctx.fillText('Approaching: Financial Centre Station', w / 2, modalY + 380);
    ctx.fillText('Get ready to deboard for Burj Khalifa / Dubai Mall', w / 2, modalY + 425);

    // Countdown ring / pill
    ctx.fillStyle = 'rgba(255, 159, 10, 0.15)';
    this.roundRect(ctx, w / 2 - 200, modalY + 480, 400, 70, 24);
    ctx.fill();
    ctx.fillStyle = '#ff9f0a';
    ctx.font = '700 28px -apple-system, SF Pro Text, sans-serif';
    ctx.fillText('Deboarding in ~3 Minutes', w / 2, modalY + 515);

    // Primary Action Button ("I'm Awake")
    ctx.fillStyle = '#0066cc';
    this.roundRect(ctx, modalX + 50, modalY + 590, modalW - 100, 96, 30);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 34px -apple-system, SF Pro Display, sans-serif';
    ctx.fillText("I'm Awake & Ready", w / 2, modalY + 638);

    // Secondary Action ("Snooze 1 Min")
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    this.roundRect(ctx, modalX + 50, modalY + 710, modalW - 100, 84, 26);
    ctx.fill();

    ctx.fillStyle = '#8e8e93';
    ctx.font = '600 28px -apple-system, SF Pro Text, sans-serif';
    ctx.fillText('Snooze (1 Minute)', w / 2, modalY + 752);

    ctx.restore();
  }

  private renderSummaryUI(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    progress: number,
    time: number
  ) {
    ctx.save();

    // Final Trip Summary Card
    const cardW = w - 80;
    const cardH = 920;
    const cardX = 40;
    const cardY = (h - cardH) / 2 + 50;

    ctx.fillStyle = 'rgba(20, 22, 28, 0.97)';
    this.roundRect(ctx, cardX, cardY, cardW, cardH, 44);
    ctx.fill();
    ctx.strokeStyle = 'rgba(48, 209, 88, 0.5)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Destination Checkmark Icon
    ctx.fillStyle = '#30d158';
    ctx.beginPath();
    ctx.arc(w / 2, cardY + 90, 50, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 48px -apple-system, SF Pro Display, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✓', w / 2, cardY + 90);

    // Header
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 44px -apple-system, SF Pro Display, sans-serif';
    ctx.fillText('Trip Completed', w / 2, cardY + 180);

    ctx.fillStyle = '#30d158';
    ctx.font = '700 26px -apple-system, SF Pro Display, sans-serif';
    ctx.fillText('AI TRIP SUMMARY • TL;DR', w / 2, cardY + 230);

    // Summary Box
    const summaryBoxY = cardY + 280;
    ctx.fillStyle = 'rgba(35, 38, 48, 0.8)';
    this.roundRect(ctx, cardX + 40, summaryBoxY, cardW - 80, 240, 24);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '400 28px -apple-system, SF Pro Text, sans-serif';
    ctx.textAlign = 'left';
    const textLines = [
      'You traveled 18.4 km from Dubai Marina to Burj Khalifa in',
      '34 mins via Dubai Tram and Metro Red Line.',
      'A seamless transfer occurred at DMCC Station with zero delays.',
      'You saved 3.2 kg CO₂ and AED 42 compared to a taxi ride.'
    ];
    textLines.forEach((line, idx) => {
      ctx.fillText(line, cardX + 70, summaryBoxY + 50 + idx * 45);
    });

    // Metric Stats Grid (4 blocks)
    const gridY = summaryBoxY + 270;
    const statBoxW = (cardW - 110) / 2;
    const statBoxH = 130;

    const stats = [
      { label: 'TOTAL TIME', value: '34 min', color: '#2997ff' },
      { label: 'NOL FARE', value: 'AED 7.50', color: '#30d158' },
      { label: 'CO₂ SAVED', value: '3.2 kg', color: '#30d158' },
      { label: 'ON-TIME RATING', value: '100%', color: '#ff9f0a' }
    ];

    stats.forEach((st, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const bX = cardX + 40 + col * (statBoxW + 30);
      const bY = gridY + row * (statBoxH + 20);

      ctx.fillStyle = 'rgba(30, 32, 40, 0.9)';
      this.roundRect(ctx, bX, bY, statBoxW, statBoxH, 20);
      ctx.fill();

      ctx.fillStyle = '#8e8e93';
      ctx.font = '600 20px -apple-system, SF Pro Text, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(st.label, bX + 24, bY + 40);

      ctx.fillStyle = st.color;
      ctx.font = '800 36px -apple-system, SF Pro Display, sans-serif';
      ctx.fillText(st.value, bX + 24, bY + 88);
    });

    // Close Button
    ctx.fillStyle = '#0066cc';
    this.roundRect(ctx, cardX + 40, cardY + cardH - 120, cardW - 80, 80, 24);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 30px -apple-system, SF Pro Display, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Done', w / 2, cardY + cardH - 80);

    ctx.restore();
  }

  private renderAppNavBar(ctx: CanvasRenderingContext2D, w: number, h: number, state: ShowcaseState) {
    ctx.save();
    const navH = 110;
    const navY = h - navH;

    ctx.fillStyle = 'rgba(15, 16, 22, 0.95)';
    ctx.fillRect(0, navY, w, navH);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, navY);
    ctx.lineTo(w, navY);
    ctx.stroke();

    const items = [
      { label: 'Explore', icon: '🧭', active: state === 'hero' },
      { label: 'Lines', icon: '🚇', active: state === 'wrong-bus' },
      { label: 'Alerts', icon: '⏰', active: state === 'alarm' },
      { label: 'Saved', icon: '⭐', active: false },
      { label: 'Profile', icon: '👤', active: state === 'summary' }
    ];

    const itemW = w / items.length;
    items.forEach((item, idx) => {
      const centerX = idx * itemW + itemW / 2;
      ctx.font = '32px -apple-system, SF Pro Text, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.icon, centerX, navY + 42);

      ctx.font = item.active ? '700 20px -apple-system, SF Pro Text, sans-serif' : '500 20px -apple-system, SF Pro Text, sans-serif';
      ctx.fillStyle = item.active ? '#2997ff' : '#8e8e93';
      ctx.fillText(item.label, centerX, navY + 76);
    });

    ctx.restore();
  }

  private renderHomeIndicator(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    this.roundRect(ctx, w / 2 - 170, h - 22, 340, 10, 5);
    ctx.fill();
    ctx.restore();
  }

  private roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}
