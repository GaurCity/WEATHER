import { useState } from 'react';
import { 
  Compass, 
  Search, 
  Sparkles, 
  Thermometer, 
  Droplets, 
  Wind, 
  Shield, 
  Info,
  Scale,
  Feather,
  Check,
  X
} from 'lucide-react';
import { PARIS_FABRICS, FABRIC_CATEGORIES } from '../data/fabricData';
import { FabricItem, TemperatureUnit } from '../types';

interface FabricGuideProps {
  currentTempC: number;
  unit: TemperatureUnit;
  selectedFabricHighlight?: string | null;
}

export default function FabricGuide({
  currentTempC,
  unit,
  selectedFabricHighlight
}: FabricGuideProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Fabrics');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFabricModal, setSelectedFabricModal] = useState<FabricItem | null>(null);

  // Comparator states
  const [compareFabricA, setCompareFabricA] = useState<FabricItem>(PARIS_FABRICS[0]); // Linen
  const [compareFabricB, setCompareFabricB] = useState<FabricItem>(PARIS_FABRICS[2]); // Merino

  const formatTempRange = (minC: number, maxC: number) => {
    if (unit === 'fahrenheit') {
      const minF = Math.round((minC * 9) / 5 + 32);
      const maxF = Math.round((maxC * 9) / 5 + 32);
      return `${minF}°F to ${maxF}°F`;
    }
    return `${minC}°C to ${maxC}°C`;
  };

  const filteredFabrics = PARIS_FABRICS.filter((fabric) => {
    const matchesCategory =
      selectedCategory === 'All Fabrics' || fabric.fiberType === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      fabric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.frenchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.whyWearInParis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.drapeAndFeel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getScoreBar = (score: number, max: number = 10, color: string = 'bg-stone-900') => (
    <div className="flex items-center gap-1.5 w-full">
      <div className="h-2 flex-1 rounded-full bg-stone-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${(score / max) * 100}%` }}
        />
      </div>
      <span className="font-mono text-[11px] font-bold text-stone-700 w-5 text-right">{score}</span>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900">
                Textile Science & Parisian Sartorial Standards
              </span>
            </div>
            <h2 className="mt-1.5 font-serif text-2xl font-bold tracking-tight text-stone-900">
              Le Fabric Compass & Material Science Lab
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Comprehensive index of natural, regenerated, and technical fabrics engineered for Parisian microclimates.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-stone-50 p-3 border border-stone-200 text-xs">
            <Thermometer className="h-4 w-4 text-amber-600" />
            <span>Current Paris Target: <strong>{currentTempC}°C</strong></span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-4 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {FABRIC_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white font-semibold shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search fibers (e.g. linen, cashmere, rain)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-stone-50/70 pl-9 pr-3 py-1.5 text-xs focus:border-stone-400 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Fabric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFabrics.map((fabric) => {
          const isCurrentlyOptimal =
            currentTempC >= fabric.minTempC && currentTempC <= fabric.maxTempC;

          return (
            <div
              key={fabric.id}
              onClick={() => setSelectedFabricModal(fabric)}
              className={`group flex flex-col justify-between rounded-2xl border p-5 bg-white shadow-2xs hover:shadow-md transition-all cursor-pointer ${
                isCurrentlyOptimal
                  ? 'border-amber-400/80 ring-2 ring-amber-400/20'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div>
                {/* Card Top: Fiber type and Optimal indicator */}
                <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                    {fabric.fiberType}
                  </span>
                  {isCurrentlyOptimal && (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      <Check className="h-3 w-3" />
                      Optimal Today
                    </span>
                  )}
                </div>

                <h3 className="mt-2.5 font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {fabric.name}
                </h3>
                <div className="text-xs font-serif italic text-stone-400">
                  {fabric.frenchName} • <span className="font-mono text-stone-600 font-sans">{fabric.typicalGsm}</span>
                </div>

                {/* Drape & Why in Paris */}
                <p className="mt-3 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {fabric.whyWearInParis}
                </p>

                {/* Score Meters */}
                <div className="mt-4 space-y-2 rounded-xl bg-stone-50/80 p-3 border border-stone-100">
                  <div>
                    <div className="flex justify-between text-[11px] text-stone-600 mb-0.5">
                      <span>Breathability (Aération)</span>
                    </div>
                    {getScoreBar(fabric.breathability, 10, 'bg-sky-600')}
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-stone-600 mb-0.5">
                      <span>Thermal Insulation (Chaleur)</span>
                    </div>
                    {getScoreBar(fabric.thermalInsulation, 10, 'bg-amber-600')}
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-stone-600 mb-0.5">
                      <span>Rain Resistance (Déperlance)</span>
                    </div>
                    {getScoreBar(fabric.rainResistance, 10, 'bg-indigo-600')}
                  </div>
                </div>
              </div>

              {/* Temperature Badge */}
              <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-xs text-stone-500">
                <span className="font-medium">Ideal Paris Range:</span>
                <span className="font-mono font-bold text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md">
                  {formatTempRange(fabric.minTempC, fabric.maxTempC)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-Side Fabric Comparator Lab */}
      <div className="rounded-2xl border border-stone-200 bg-stone-900 text-stone-100 p-6 shadow-md">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-stone-950 font-bold">
              <Scale className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white">
                Side-by-Side Textile Comparator
              </h3>
              <p className="text-xs text-stone-400">
                Compare fiber breathability, thermal mass, rain resistance, and Parisian pairing notes
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-stone-800 px-2.5 py-1 rounded-lg border border-stone-700">
            Material Science Matrix
          </span>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fabric A */}
          <div className="rounded-xl border border-stone-800 bg-stone-850 p-4">
            <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1.5 block">
              Fabric A (First Textile):
            </label>
            <select
              value={compareFabricA.id}
              onChange={(e) => {
                const found = PARIS_FABRICS.find((f) => f.id === e.target.value);
                if (found) setCompareFabricA(found);
              }}
              className="w-full rounded-lg border border-stone-700 bg-stone-800 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
            >
              {PARIS_FABRICS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.typicalGsm})
                </option>
              ))}
            </select>

            <div className="mt-4 space-y-3">
              <div>
                <div className="text-xs text-stone-400">French Nomenclature:</div>
                <div className="font-serif text-sm font-semibold text-amber-100">{compareFabricA.frenchName}</div>
              </div>
              <div>
                <div className="text-xs text-stone-400">Ideal Temp Range:</div>
                <div className="font-mono text-xs font-bold text-stone-200">
                  {formatTempRange(compareFabricA.minTempC, compareFabricA.maxTempC)}
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-stone-800">
                <div>
                  <div className="flex justify-between text-xs text-stone-300">
                    <span>Breathability</span>
                    <span className="font-mono font-bold text-sky-400">{compareFabricA.breathability} / 10</span>
                  </div>
                  {getScoreBar(compareFabricA.breathability, 10, 'bg-sky-400')}
                </div>
                <div>
                  <div className="flex justify-between text-xs text-stone-300">
                    <span>Thermal Insulation</span>
                    <span className="font-mono font-bold text-amber-400">{compareFabricA.thermalInsulation} / 10</span>
                  </div>
                  {getScoreBar(compareFabricA.thermalInsulation, 10, 'bg-amber-400')}
                </div>
                <div>
                  <div className="flex justify-between text-xs text-stone-300">
                    <span>Rain Resistance</span>
                    <span className="font-mono font-bold text-indigo-400">{compareFabricA.rainResistance} / 10</span>
                  </div>
                  {getScoreBar(compareFabricA.rainResistance, 10, 'bg-indigo-400')}
                </div>
              </div>
              <p className="text-xs text-stone-300 pt-2 border-t border-stone-800 leading-relaxed">
                <strong>Why in Paris:</strong> {compareFabricA.whyWearInParis}
              </p>
            </div>
          </div>

          {/* Fabric B */}
          <div className="rounded-xl border border-stone-800 bg-stone-850 p-4">
            <label className="text-xs font-semibold text-sky-300 uppercase tracking-wider mb-1.5 block">
              Fabric B (Second Textile):
            </label>
            <select
              value={compareFabricB.id}
              onChange={(e) => {
                const found = PARIS_FABRICS.find((f) => f.id === e.target.value);
                if (found) setCompareFabricB(found);
              }}
              className="w-full rounded-lg border border-stone-700 bg-stone-800 px-3 py-2 text-sm text-white focus:border-sky-400 focus:outline-none"
            >
              {PARIS_FABRICS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.typicalGsm})
                </option>
              ))}
            </select>

            <div className="mt-4 space-y-3">
              <div>
                <div className="text-xs text-stone-400">French Nomenclature:</div>
                <div className="font-serif text-sm font-semibold text-sky-100">{compareFabricB.frenchName}</div>
              </div>
              <div>
                <div className="text-xs text-stone-400">Ideal Temp Range:</div>
                <div className="font-mono text-xs font-bold text-stone-200">
                  {formatTempRange(compareFabricB.minTempC, compareFabricB.maxTempC)}
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-stone-800">
                <div>
                  <div className="flex justify-between text-xs text-stone-300">
                    <span>Breathability</span>
                    <span className="font-mono font-bold text-sky-400">{compareFabricB.breathability} / 10</span>
                  </div>
                  {getScoreBar(compareFabricB.breathability, 10, 'bg-sky-400')}
                </div>
                <div>
                  <div className="flex justify-between text-xs text-stone-300">
                    <span>Thermal Insulation</span>
                    <span className="font-mono font-bold text-amber-400">{compareFabricB.thermalInsulation} / 10</span>
                  </div>
                  {getScoreBar(compareFabricB.thermalInsulation, 10, 'bg-amber-400')}
                </div>
                <div>
                  <div className="flex justify-between text-xs text-stone-300">
                    <span>Rain Resistance</span>
                    <span className="font-mono font-bold text-indigo-400">{compareFabricB.rainResistance} / 10</span>
                  </div>
                  {getScoreBar(compareFabricB.rainResistance, 10, 'bg-indigo-400')}
                </div>
              </div>
              <p className="text-xs text-stone-300 pt-2 border-t border-stone-800 leading-relaxed">
                <strong>Why in Paris:</strong> {compareFabricB.whyWearInParis}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fabric Detail Modal */}
      {selectedFabricModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                  {selectedFabricModal.fiberType}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {selectedFabricModal.name}
                </h3>
                <div className="font-serif italic text-xs text-stone-500">
                  "{selectedFabricModal.frenchName}" • {selectedFabricModal.typicalGsm}
                </div>
              </div>
              <button
                onClick={() => setSelectedFabricModal(null)}
                className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs text-stone-700">
              <div>
                <div className="font-semibold text-stone-900">Hand-feel & Drape Profile:</div>
                <p className="mt-0.5 text-stone-600">{selectedFabricModal.drapeAndFeel}</p>
              </div>

              <div>
                <div className="font-semibold text-stone-900">Why It Excels in Paris:</div>
                <p className="mt-0.5 text-stone-600">{selectedFabricModal.whyWearInParis}</p>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 border border-amber-200">
                <div className="font-semibold text-amber-900">When to Avoid:</div>
                <p className="mt-0.5 text-amber-800">{selectedFabricModal.avoidWhen}</p>
              </div>

              <div>
                <div className="font-semibold text-stone-900">Parisian Garment Examples:</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedFabricModal.typicalGarments.map((g, idx) => (
                    <span key={idx} className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-700">
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-semibold text-stone-900">Textile Care Tip:</div>
                <p className="mt-0.5 text-stone-600">{selectedFabricModal.careTip}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedFabricModal(null)}
                className="rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
