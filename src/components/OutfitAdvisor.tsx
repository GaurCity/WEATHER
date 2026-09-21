import React, { useState, useEffect } from 'react';
import { 
  Shirt, 
  Layers, 
  AlertTriangle, 
  Sparkles, 
  Feather, 
  ShieldAlert, 
  Moon, 
  CheckCircle2,
  Check,
  Plus,
  ArrowRightLeft,
  ChevronDown,
  UserCheck,
  RotateCcw,
  Droplets,
  Wind,
  Tag,
  CornerDownLeft,
  X
} from 'lucide-react';
import { 
  OutfitRecommendation, 
  TemperatureUnit, 
  ClosetOutfitMatch, 
  UserClothingItem,
  ClosetCategoryFit,
  OccasionType
} from '../types';

interface OutfitAdvisorProps {
  outfit: OutfitRecommendation;
  closetMatch: ClosetOutfitMatch;
  temperatureC: number;
  unit: TemperatureUnit;
  selectedOccasion: OccasionType;
  onSelectOccasion: (occasion: OccasionType) => void;
  onOpenFabricDetail: (fabricName: string) => void;
  onNavigateToCloset: () => void;
  onSwapCategoryItem?: (category: string, item: UserClothingItem) => void;
}

export default function OutfitAdvisor({
  outfit,
  closetMatch,
  temperatureC,
  unit,
  selectedOccasion,
  onSelectOccasion,
  onOpenFabricDetail,
  onNavigateToCloset,
  onSwapCategoryItem
}: OutfitAdvisorProps) {
  const [viewMode, setViewMode] = useState<'my_closet' | 'sartorial_guide'>('my_closet');
  const [openSwapCategory, setOpenSwapCategory] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState<string>(selectedOccasion || '');

  // Keep custom input in sync when selectedOccasion changes externally
  useEffect(() => {
    setCustomInput(selectedOccasion || '');
  }, [selectedOccasion]);

  const quickOccasionPresets: Array<{ id: string; label: string; icon: string }> = [
    { id: 'flaneur', label: 'Flâneur & Stroll', icon: '🚶‍♂️' },
    { id: 'chic_evening', label: 'Soirée & Bistro', icon: '🍷' },
    { id: 'museum_walk', label: 'Musée & Culture', icon: '🏛️' },
    { id: 'business_smart', label: 'Business & Office', icon: '💼' },
    { id: 'seine_picnic', label: 'Seine River Picnic', icon: '🧺' },
    { id: 'Cocktail Party & Rooftop', label: 'Cocktail Rooftop', icon: '🍸' },
    { id: 'Montmartre Steps & Photo Walk', label: 'Photo Walk & Steps', icon: '📸' },
    { id: 'Opera Garnier Evening', label: 'Opéra Gala', icon: '🎭' }
  ];

  const handleOccasionSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customInput.trim();
    if (trimmed.length > 0) {
      onSelectOccasion(trimmed);
    } else {
      onSelectOccasion('flaneur');
      setCustomInput('flaneur');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'outerwear':
        return <Layers className="w-4 h-4 text-amber-700" />;
      case 'top':
        return <Shirt className="w-4 h-4 text-indigo-700" />;
      case 'bottom':
        return <Feather className="w-4 h-4 text-emerald-700" />;
      case 'footwear':
        return <CheckCircle2 className="w-4 h-4 text-stone-700" />;
      case 'accessory':
        return <Sparkles className="w-4 h-4 text-rose-700" />;
      default:
        return <Shirt className="w-4 h-4 text-stone-700" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Occasion Selection & Input Bar */}
      <div id="occasion-input-card" className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Paris Occasion & Activity
                </span>
                <span className="rounded-full bg-stone-100 border border-stone-200 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                  Custom Input
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                Enter your exact Parisian occasion or plan (e.g. <em>"Dinner date in Le Marais"</em>, <em>"Louvre museum tour"</em>, <em>"Casual Seine stroll"</em>)
              </p>
            </div>

            {selectedOccasion && (
              <div className="flex items-center gap-1.5 self-start sm:self-center text-xs">
                <span className="text-stone-500">Active:</span>
                <span className="inline-flex items-center gap-1 font-semibold text-stone-900 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg">
                  <Tag className="w-3 h-3 text-amber-700" />
                  {selectedOccasion === 'flaneur'
                    ? 'Flâneur & Stroll'
                    : selectedOccasion === 'chic_evening'
                    ? 'Soirée & Bistro'
                    : selectedOccasion === 'museum_walk'
                    ? 'Musée & Culture'
                    : selectedOccasion === 'business_smart'
                    ? 'Business & Office'
                    : selectedOccasion === 'seine_picnic'
                    ? 'Seine River Picnic'
                    : selectedOccasion}
                </span>
              </div>
            )}
          </div>

          {/* User Input Form */}
          <form onSubmit={handleOccasionSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                id="input-user-occasion"
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Type your occasion... (e.g. Rooftop cocktail, Rainy afternoon café, Montmartre walk)"
                className="w-full rounded-xl border border-stone-300 bg-stone-50/60 pl-3.5 pr-8 py-2 text-sm text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all"
              />
              {customInput.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomInput('');
                    onSelectOccasion('flaneur');
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  title="Clear occasion"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              id="btn-apply-occasion"
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-stone-900 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-stone-800 transition-colors shrink-0 cursor-pointer"
            >
              <span>Apply</span>
              <CornerDownLeft className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </form>

          {/* Quick preset suggestions */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 text-xs">
            <span className="text-[11px] font-medium text-stone-500 shrink-0">Quick suggestions:</span>
            {quickOccasionPresets.map((preset) => {
              const isSelected = selectedOccasion === preset.id || selectedOccasion === preset.label;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setCustomInput(preset.id);
                    onSelectOccasion(preset.id);
                  }}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold'
                      : 'bg-stone-100 text-stone-700 border border-stone-200/80 hover:bg-stone-200/70 hover:text-stone-900'
                  }`}
                >
                  <span>{preset.icon}</span>
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mode Selector & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-amber-300">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Outfit Selection Engine
            </div>
            <div className="font-serif text-base font-bold text-stone-900">
              {viewMode === 'my_closet' ? 'Best Fit from Your Personal Closet' : 'General Sartorial Fabric Guide'}
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center rounded-xl bg-stone-100 p-1 text-xs font-semibold text-stone-700 border border-stone-200">
          <button
            id="btn-view-my-closet"
            onClick={() => setViewMode('my_closet')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              viewMode === 'my_closet'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>My Closet Best Fit ({closetMatch.overallScore}%)</span>
          </button>
          <button
            id="btn-view-sartorial-guide"
            onClick={() => setViewMode('sartorial_guide')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              viewMode === 'sartorial_guide'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Shirt className="h-3.5 w-3.5" />
            <span>Parisian Guide</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: USER CLOSET BEST FIT */}
      {viewMode === 'my_closet' && (
        <div className="space-y-6">
          {/* Main Hero Summary */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-stone-900 px-2.5 py-0.5 text-[11px] font-semibold text-amber-200">
                    {outfit.temperatureTier}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-300">
                    {closetMatch.overallScore}% Closet Weather Match
                  </span>
                </div>
                <h2 className="mt-1.5 font-serif text-2xl font-bold tracking-tight text-stone-900">
                  {closetMatch.headline}
                </h2>
                <p className="mt-1 text-sm text-stone-600">
                  {closetMatch.summary}
                </p>
              </div>

              <div className="flex items-center gap-3 bg-stone-50 rounded-xl p-3 border border-stone-200 shrink-0">
                <div className="text-right">
                  <div className="text-xs font-semibold text-stone-500">Closet Fit Score</div>
                  <div className="font-mono text-2xl font-extrabold text-stone-900">
                    {closetMatch.overallScore} <span className="text-xs font-normal text-stone-500">/ 100</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-300">
                  Ready
                </div>
              </div>
            </div>

            {/* Wardrobe Gaps & Alerts */}
            {closetMatch.wardrobeGaps.length > 0 && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-900">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-950">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span>Wardrobe Advisory for Today's Weather:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1 text-amber-900/90">
                  {closetMatch.wardrobeGaps.map((gap, idx) => (
                    <li key={idx}>{gap}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* User Closet Categories Best Fit Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <span>Selected Pieces from Your Wardrobe</span>
                <span className="text-xs font-sans font-normal text-stone-500">
                  (Cotton • Wool • Linen • Denim • Leather)
                </span>
              </h3>
              <button
                onClick={onNavigateToCloset}
                className="inline-flex items-center gap-1 text-xs font-bold text-stone-800 hover:text-amber-800 hover:underline"
              >
                <span>Manage / Add Items</span>
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {closetMatch.categories.map((catFit, idx) => {
                const item = catFit.selectedItem;
                const isSwapOpen = openSwapCategory === catFit.category;

                return (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs hover:shadow-xs transition-all"
                  >
                    <div>
                      {/* Header: Category & Fit score */}
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase tracking-wider">
                          {getCategoryIcon(catFit.category)}
                          <span>{catFit.category}</span>
                        </div>
                        {item && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-300">
                            {catFit.fitScore}% Match • {catFit.fitVerdict}
                          </span>
                        )}
                      </div>

                      {item ? (
                        <>
                          {/* Item Title */}
                          <h4 className="mt-3 font-serif text-lg font-bold text-stone-900">
                            {item.name}
                          </h4>

                          {/* Fabric & details */}
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            <button
                              onClick={() => onOpenFabricDetail(item.fabric)}
                              className="inline-flex items-center gap-1 rounded-md bg-stone-900 px-2.5 py-1 text-xs font-bold text-amber-200 hover:bg-stone-800 transition-colors"
                            >
                              <Feather className="h-3 w-3 text-amber-300" />
                              <span>{item.fabric}</span>
                            </button>
                            <span className="rounded-md bg-stone-100 border border-stone-200 px-2 py-0.5 text-[11px] font-medium text-stone-600 capitalize">
                              {item.warmthLevel} Warmth
                            </span>
                            {item.color && (
                              <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] text-stone-600">
                                {item.color}
                              </span>
                            )}
                            {item.isWaterResistant && (
                              <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-200">
                                Water-Resistant
                              </span>
                            )}
                          </div>

                          {/* WHY THIS IS YOUR BEST FIT EXPLANATION */}
                          <div className="mt-3.5 rounded-xl bg-stone-50 p-3 text-xs border border-stone-200">
                            <div className="font-bold text-stone-900 flex items-center gap-1.5 mb-1">
                              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                              <span>Why this is your best fit today:</span>
                            </div>
                            <p className="text-stone-700 leading-relaxed">
                              {catFit.whyBestFit}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="py-6 text-center">
                          <p className="text-xs text-stone-500 mb-2">
                            No {catFit.category.toLowerCase()} item in your closet yet.
                          </p>
                          <button
                            onClick={onNavigateToCloset}
                            className="rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                          >
                            + Add {catFit.category} Item
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Swap / Alternatives dropdown */}
                    {catFit.alternatives.length > 0 && (
                      <div className="mt-4 border-t border-dashed border-stone-200 pt-3">
                        <button
                          onClick={() => setOpenSwapCategory(isSwapOpen ? null : catFit.category)}
                          className="flex items-center justify-between w-full text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <ArrowRightLeft className="h-3 w-3 text-stone-500" />
                            <span>Swap with other {catFit.category.toLowerCase()} items ({catFit.alternatives.length})</span>
                          </span>
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isSwapOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isSwapOpen && (
                          <div className="mt-2 space-y-2 rounded-xl bg-stone-50 p-2.5 border border-stone-200 text-xs">
                            <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                              Other items in your closet:
                            </div>
                            {catFit.alternatives.map((alt) => (
                              <div
                                key={alt.item.id}
                                className="flex items-center justify-between gap-2 rounded-lg bg-white p-2 border border-stone-200"
                              >
                                <div>
                                  <div className="font-semibold text-stone-800">
                                    {alt.item.name} ({alt.item.fabric})
                                  </div>
                                  <div className="text-[11px] text-stone-500">
                                    {alt.fitReason}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="font-mono text-xs font-bold text-stone-600">
                                    {alt.fitScore}%
                                  </span>
                                  {onSwapCategoryItem && (
                                    <button
                                      onClick={() => {
                                        onSwapCategoryItem(catFit.category, alt.item);
                                        setOpenSwapCategory(null);
                                      }}
                                      className="rounded bg-stone-900 px-2 py-1 text-[10px] font-semibold text-white hover:bg-stone-800"
                                    >
                                      Select
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: PARIS SARTORIAL FABRIC GUIDE (CLEAN EVERYDAY FABRICS) */}
      {viewMode === 'sartorial_guide' && (
        <div className="space-y-6">
          {/* Outfit Hero Banner */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-stone-900 px-2.5 py-0.5 text-[11px] font-semibold text-amber-200">
                    {outfit.temperatureTier}
                  </span>
                  {outfit.isCustomAi && (
                    <span className="flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-900">
                      <Sparkles className="h-3 w-3 text-indigo-600" />
                      Gemini AI Tailored
                    </span>
                  )}
                </div>
                <h2 className="mt-1.5 font-serif text-2xl font-bold tracking-tight text-stone-900">
                  {outfit.headline}
                </h2>
                {outfit.frenchHeadline && (
                  <p className="font-serif italic text-sm text-stone-500">
                    "{outfit.frenchHeadline}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 bg-stone-50 rounded-xl p-3 border border-stone-200 shrink-0">
                <div className="text-right">
                  <div className="text-xs font-semibold text-stone-500">Comfort Score</div>
                  <div className="font-mono text-xl font-extrabold text-stone-900">
                    {outfit.overallComfortScore} <span className="text-xs font-normal text-stone-500">/ 10</span>
                  </div>
                </div>
                <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-300">
                  Chic
                </div>
              </div>
            </div>

            <p className="mt-3.5 text-sm leading-relaxed text-stone-700 font-sans">
              {outfit.summary}
            </p>

            {/* Layering Strategy Box */}
            {outfit.layeringStrategy && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-200 text-amber-900 mt-0.5">
                    <Layers className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                      Stratégie de Superposition (Layering Blueprint)
                    </h4>
                    <p className="mt-0.5 text-xs text-amber-900/90 leading-relaxed">
                      {outfit.layeringStrategy}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Garments with Simple Fabrics */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <span>The Curated Ensemble & Simple Fabric Compositions</span>
                <span className="text-xs font-sans font-normal text-stone-500">
                  ({outfit.items.length} Elements)
                </span>
              </h3>
              <span className="text-xs text-stone-500 font-medium">Click any fabric to inspect in lab</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {outfit.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs hover:shadow-xs transition-all"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase tracking-wider">
                        {getCategoryIcon(item.category)}
                        <span>{item.category}</span>
                      </div>
                      {item.frenchGarmentName && (
                        <span className="text-[11px] font-serif italic text-stone-400 truncate max-w-[180px]">
                          {item.frenchGarmentName}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="mt-2.5 font-serif text-base font-bold text-stone-900">
                      {item.garmentName}
                    </h4>

                    {/* SIMPLE FABRIC BADGE */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => onOpenFabricDetail(item.primaryFabric)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-2.5 py-1 text-xs font-semibold text-amber-200 hover:bg-stone-800 transition-colors"
                      >
                        <Feather className="h-3 w-3 text-amber-300" />
                        <span>{item.primaryFabric}</span>
                      </button>
                      {item.fabricWeightGsm && (
                        <span className="rounded-md bg-stone-100 border border-stone-200 px-2 py-0.5 text-[11px] font-mono text-stone-600">
                          {item.fabricWeightGsm}
                        </span>
                      )}
                    </div>

                    {/* Fabric Properties Tags */}
                    {item.fabricProperties && item.fabricProperties.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.fabricProperties.map((prop, pIdx) => (
                          <span
                            key={pIdx}
                            className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600"
                          >
                            • {prop}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Why This Fabric Works */}
                    <div className="mt-3 rounded-xl bg-stone-50 p-3 text-xs border border-stone-200">
                      <div className="font-semibold text-stone-900 flex items-center gap-1 mb-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Why This Fabric in Paris Weather:</span>
                      </div>
                      <p className="text-stone-700 leading-relaxed">
                        {item.whyThisFabric}
                      </p>
                    </div>
                  </div>

                  {/* Styling Tip */}
                  {item.stylingTip && (
                    <div className="mt-3 border-t border-dashed border-stone-200 pt-2.5 text-xs text-stone-500">
                      <span className="font-semibold text-stone-700">Le Style Parisien: </span>
                      <span className="italic">{item.stylingTip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Avoid Fabrics & Parisian Nuance Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fabrics to Avoid Box */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-900 uppercase tracking-wider mb-2.5">
            <ShieldAlert className="h-4 w-4 text-rose-600" />
            <span>Fabrics to Avoid for Today's Weather</span>
          </div>
          <div className="space-y-2.5">
            {outfit.fabricsToAvoid.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-rose-200/80 bg-white p-3 text-xs shadow-2xs">
                <div className="font-bold text-rose-900">{item.fabric}</div>
                <div className="text-rose-800/90 mt-0.5">{item.reason}</div>
              </div>
            ))}
          </div>
        </div>

        {/* The Parisian Touch & Day-to-Night Transition */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider mb-1.5">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span>La Touche Parisienne (The Everyday Styling Detail)</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              {outfit.parisianTouch}
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-900 text-stone-100 p-4 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">
              <Moon className="h-4 w-4 text-amber-300" />
              <span>Transition Jour & Soir (Day to Bistro Transition)</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              {outfit.dayToNightAdvice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
