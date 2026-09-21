import React, { useState, useEffect } from 'react';
import { Sparkles, SlidersHorizontal, SunMedium, Compass, Shirt, RefreshCw, Layers, Tag, CornerDownLeft, X } from 'lucide-react';
import { TemperatureUnit, OccasionType } from '../types';

interface HeaderProps {
  unit: TemperatureUnit;
  onToggleUnit: () => void;
  isSimulated: boolean;
  onToggleSimulated: (val: boolean) => void;
  selectedOccasion: OccasionType;
  onSelectOccasion: (occasion: OccasionType) => void;
  onRefreshWeather: () => void;
  isRefreshing: boolean;
  onOpenAIStylist: () => void;
  activeTab: 'advisor' | 'closet' | 'fabrics';
  setActiveTab: (tab: 'advisor' | 'closet' | 'fabrics') => void;
  closetCount: number;
}

export default function Header({
  unit,
  onToggleUnit,
  isSimulated,
  onToggleSimulated,
  selectedOccasion,
  onSelectOccasion,
  onRefreshWeather,
  isRefreshing,
  onOpenAIStylist,
  activeTab,
  setActiveTab,
  closetCount
}: HeaderProps) {
  const [parisTime, setParisTime] = useState<string>('');
  const [headerOccasionInput, setHeaderOccasionInput] = useState<string>(selectedOccasion || '');
  const [isEditingHeaderOccasion, setIsEditingHeaderOccasion] = useState<boolean>(false);

  useEffect(() => {
    setHeaderOccasionInput(selectedOccasion || '');
  }, [selectedOccasion]);

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Paris',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
        setParisTime(timeStr);
      } catch {
        setParisTime('Paris CET');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const occasions: Array<{ id: OccasionType; label: string; sub: string }> = [
    { id: 'flaneur', label: 'Flâneur & Café', sub: 'Casual Street Comfort' },
    { id: 'chic_evening', label: 'Soirée & Bistro', sub: 'Elevated Parisian Dinner' },
    { id: 'museum_walk', label: 'Musée & Louvre', sub: 'All-Day Layered Comfort' },
    { id: 'business_smart', label: 'Tailored Smart', sub: 'Haussmann Modern' }
  ];

  const handleHeaderSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = headerOccasionInput.trim();
    if (trimmed.length > 0) {
      onSelectOccasion(trimmed);
    } else {
      onSelectOccasion('flaneur');
      setHeaderOccasionInput('flaneur');
    }
    setIsEditingHeaderOccasion(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-md transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top brand & live status bar */}
        <div className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-amber-50 shadow-sm">
              <span className="font-serif text-lg font-bold tracking-tighter">75</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900">
                  Paris Weather & Wardrobe Guide
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/70 px-2 py-0.5 text-[11px] font-medium text-amber-900">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                  Paris, FR
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans flex items-center gap-2">
                <span>Heure de Paris: <strong className="font-mono text-stone-700">{parisTime || '14:30'} CET</strong></span>
                <span>•</span>
                <span>Simple Fabrics: Cotton, Wool, Linen, Denim, Leather</span>
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Live vs Simulator toggle */}
            <div className="flex items-center rounded-lg bg-stone-200/70 p-0.5 text-xs font-medium text-stone-700">
              <button
                id="btn-mode-live"
                onClick={() => onToggleSimulated(false)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 transition-all ${
                  !isSimulated
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <SunMedium className="h-3.5 w-3.5 text-amber-600" />
                <span>Live Paris</span>
              </button>
              <button
                id="btn-mode-simulator"
                onClick={() => onToggleSimulated(true)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 transition-all ${
                  isSimulated
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-stone-700" />
                <span>Weather Simulator</span>
              </button>
            </div>

            {/* Unit toggle */}
            <button
              id="btn-unit-toggle"
              onClick={onToggleUnit}
              title="Toggle Celsius / Fahrenheit"
              className="flex items-center justify-center rounded-lg border border-stone-300 bg-white px-2.5 py-1.5 text-xs font-bold text-stone-800 shadow-2xs hover:bg-stone-100 transition-colors"
            >
              {unit === 'celsius' ? '°C' : '°F'}
            </button>

            {/* Refresh Live Button */}
            {!isSimulated && (
              <button
                id="btn-refresh-weather"
                onClick={onRefreshWeather}
                disabled={isRefreshing}
                title="Refresh Live Paris Forecast"
                className="flex items-center justify-center rounded-lg border border-stone-300 bg-white p-1.5 text-stone-700 shadow-2xs hover:bg-stone-100 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-amber-600' : ''}`} />
              </button>
            )}

            {/* AI Stylist Consultation */}
            <button
              id="btn-open-ai-stylist"
              onClick={onOpenAIStylist}
              className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>AI Parisian Stylist</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs & Occasion Sub-bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
          {/* Main Views */}
          <nav className="flex items-center gap-1 overflow-x-auto py-1">
            <button
              id="tab-advisor"
              onClick={() => setActiveTab('advisor')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'advisor'
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
              }`}
            >
              <Shirt className="h-3.5 w-3.5" />
              <span>Paris Weather & Best Fit</span>
            </button>
            <button
              id="tab-closet"
              onClick={() => setActiveTab('closet')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'closet'
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>My Wardrobe Items</span>
              <span className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                activeTab === 'closet' ? 'bg-amber-300 text-stone-900' : 'bg-stone-200 text-stone-700'
              }`}>
                {closetCount}
              </span>
            </button>
            <button
              id="tab-fabrics"
              onClick={() => setActiveTab('fabrics')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'fabrics'
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Simple Fabric Guide</span>
            </button>
          </nav>

          {/* Occasion Switcher & Inline Input */}
          {activeTab === 'advisor' && (
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[11px] font-medium text-stone-600 uppercase tracking-wider mr-0.5 hidden md:inline">
                Occasion:
              </span>

              {isEditingHeaderOccasion ? (
                <form onSubmit={handleHeaderSubmit} className="flex items-center gap-1">
                  <input
                    id="input-header-occasion"
                    type="text"
                    autoFocus
                    value={headerOccasionInput}
                    onChange={(e) => setHeaderOccasionInput(e.target.value)}
                    placeholder="Enter custom occasion..."
                    className="rounded-lg border border-stone-400 bg-white px-2 py-0.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 w-44"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-stone-900 px-2 py-0.5 text-[11px] font-semibold text-white hover:bg-stone-800"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHeaderOccasionInput(selectedOccasion || '');
                      setIsEditingHeaderOccasion(false);
                    }}
                    className="p-0.5 text-stone-500 hover:text-stone-800"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-1">
                  {occasions.map((occ) => (
                    <button
                      key={occ.id}
                      id={`occasion-${occ.id}`}
                      onClick={() => onSelectOccasion(occ.id)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                        selectedOccasion === occ.id
                          ? 'bg-amber-800 text-amber-50 font-semibold shadow-2xs'
                          : 'bg-stone-200/80 text-stone-600 hover:bg-stone-300/80'
                      }`}
                    >
                      {occ.label}
                    </button>
                  ))}

                  {/* If custom occasion is active and not one of the preset 4 */}
                  {!['flaneur', 'chic_evening', 'museum_walk', 'business_smart'].includes(selectedOccasion) && selectedOccasion && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-800 text-amber-50 px-2.5 py-1 text-[11px] font-semibold shadow-2xs">
                      <Tag className="w-3 h-3 text-amber-300" />
                      <span>{selectedOccasion}</span>
                    </span>
                  )}

                  <button
                    id="btn-header-custom-occasion"
                    onClick={() => setIsEditingHeaderOccasion(true)}
                    className="rounded-full border border-stone-300 bg-white px-2 py-1 text-[11px] font-medium text-stone-700 hover:bg-stone-100 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Type a custom occasion"
                  >
                    <span>✏️ Type Occasion</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
