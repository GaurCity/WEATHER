import { useState, FormEvent } from 'react';
import { 
  UserClothingItem, 
  SimpleFabricType, 
  WeatherConditionKey,
  ClosetItemEvaluation,
  OccasionType
} from '../types';
import { evaluateItemFit, DEFAULT_USER_CLOSET } from '../data/userClosetData';
import { 
  Shirt, 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Check, 
  AlertTriangle, 
  Feather, 
  Droplets, 
  Wind, 
  RotateCcw,
  Search,
  Filter,
  CheckCircle2,
  X,
  Info
} from 'lucide-react';

interface MyClosetManagerProps {
  closet: UserClothingItem[];
  onAddOrUpdateItem: (item: UserClothingItem) => void;
  onDeleteItem: (id: string) => void;
  onResetCloset: () => void;
  temperatureC: number;
  conditionKey: WeatherConditionKey;
  windSpeed: number;
  humidity: number;
  selectedOccasion: OccasionType;
  onSelectOccasion: (occasion: OccasionType) => void;
  onSelectBestFitView: () => void;
}

const FABRIC_OPTIONS: SimpleFabricType[] = [
  'Cotton',
  'Wool',
  'Linen',
  'Denim',
  'Leather',
  'Fleece',
  'Silk',
  'Other'
];

export default function MyClosetManager({
  closet,
  onAddOrUpdateItem,
  onDeleteItem,
  onResetCloset,
  temperatureC,
  conditionKey,
  windSpeed,
  humidity,
  selectedOccasion,
  onSelectOccasion,
  onSelectBestFitView
}: MyClosetManagerProps) {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedFabricFilter, setSelectedFabricFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<UserClothingItem | null>(null);

  // Form states
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<UserClothingItem['category']>('Top');
  const [fabric, setFabric] = useState<SimpleFabricType>('Cotton');
  const [fabricDetail, setFabricDetail] = useState<string>('');
  const [warmthLevel, setWarmthLevel] = useState<UserClothingItem['warmthLevel']>('medium');
  const [isWaterResistant, setIsWaterResistant] = useState<boolean>(false);
  const [isWindResistant, setIsWindResistant] = useState<boolean>(false);
  const [isBreathable, setIsBreathable] = useState<boolean>(true);
  const [color, setColor] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const isRainy = conditionKey.includes('rain') || conditionKey.includes('drizzle') || conditionKey === 'thunderstorm';
  const isWindy = windSpeed > 20 || conditionKey === 'windy';

  const openAddForm = () => {
    setEditingItem(null);
    setName('');
    setCategory('Top');
    setFabric('Cotton');
    setFabricDetail('');
    setWarmthLevel('medium');
    setIsWaterResistant(false);
    setIsWindResistant(false);
    setIsBreathable(true);
    setColor('');
    setNotes('');
    setIsFormOpen(true);
  };

  const openEditForm = (item: UserClothingItem) => {
    setEditingItem(item);
    setName(item.name);
    setCategory(item.category);
    setFabric(item.fabric);
    setFabricDetail(item.fabricDetail || '');
    setWarmthLevel(item.warmthLevel);
    setIsWaterResistant(item.isWaterResistant);
    setIsWindResistant(item.isWindResistant);
    setIsBreathable(item.isBreathable);
    setColor(item.color || '');
    setNotes(item.notes || '');
    setIsFormOpen(true);
  };

  const handleSaveItem = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: UserClothingItem = {
      id: editingItem ? editingItem.id : `item-${Date.now()}`,
      name: name.trim(),
      category,
      fabric,
      fabricDetail: fabricDetail.trim() || undefined,
      warmthLevel,
      isWaterResistant,
      isWindResistant,
      isBreathable,
      color: color.trim() || undefined,
      notes: notes.trim() || undefined,
      createdAt: editingItem ? editingItem.createdAt : Date.now()
    };

    onAddOrUpdateItem(newItem);
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const filteredCloset = closet.filter((item) => {
    const matchCat = selectedCategoryFilter === 'All' || item.category === selectedCategoryFilter;
    const matchFab = selectedFabricFilter === 'All' || item.fabric === selectedFabricFilter;
    const matchSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.color && item.color.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchFab && matchSearch;
  });

  const getVerdictBadge = (evaluation: ClosetItemEvaluation) => {
    switch (evaluation.fitVerdict) {
      case 'Optimal Fit':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="h-3 w-3" />
            Optimal Fit ({evaluation.fitScore}%)
          </span>
        );
      case 'Great Fit':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900 border border-amber-300">
            <Check className="h-3 w-3" />
            Great Fit ({evaluation.fitScore}%)
          </span>
        );
      case 'Too Cold':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-sky-100 px-2 py-0.5 text-[11px] font-bold text-sky-800 border border-sky-300">
            Too Cold for {temperatureC}°C
          </span>
        );
      case 'Too Warm':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-orange-100 px-2 py-0.5 text-[11px] font-bold text-orange-900 border border-orange-300">
            Too Warm for {temperatureC}°C
          </span>
        );
      case 'Avoid (Rain/Wind)':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-rose-100 px-2 py-0.5 text-[11px] font-bold text-rose-800 border border-rose-300">
            Avoid in Rain/Wind
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-bold text-stone-700">
            Fair Fit ({evaluation.fitScore}%)
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-stone-900 px-2.5 py-0.5 text-[11px] font-semibold text-amber-200">
                Personal Wardrobe Manager
              </span>
              <span className="text-xs text-stone-500 font-mono">
                {closet.length} items in closet
              </span>
            </div>
            <h2 className="mt-1.5 font-serif text-2xl font-bold tracking-tight text-stone-900">
              My Paris Wardrobe & Custom Items
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Enter your own clothing items (Cotton, Wool, Linen, Denim, Leather, Fleece). The app evaluates your real items against live Paris weather and picks your best outfit fit.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-add-clothing-item"
              onClick={openAddForm}
              className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 transition-colors"
            >
              <Plus className="h-4 w-4 text-amber-300" />
              <span>Add Clothing Item</span>
            </button>
            <button
              onClick={onSelectBestFitView}
              className="flex items-center gap-1.5 rounded-lg bg-amber-100 border border-amber-300 px-3 py-2 text-xs font-bold text-amber-900 hover:bg-amber-200 transition-colors"
            >
              <Sparkles className="h-4 w-4 text-amber-700" />
              <span>See Best Fit for Today</span>
            </button>
          </div>
        </div>

        {/* Live Weather Readiness Summary */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-stone-50 p-3.5 border border-stone-200">
          <div className="flex items-center gap-2 text-xs text-stone-700">
            <Info className="h-4 w-4 text-amber-700 shrink-0" />
            <span>
              Target Weather: <strong>{temperatureC}°C</strong> ({isRainy ? 'Rainy' : 'Dry'}, Wind: {windSpeed} km/h). Scores tailored for{' '}
              <strong className="text-stone-900 bg-amber-100/60 px-1.5 py-0.5 rounded border border-amber-200">
                {selectedOccasion === 'chic_evening'
                  ? 'Soirée & Bistro'
                  : selectedOccasion === 'museum_walk'
                  ? 'Musée & Culture'
                  : selectedOccasion === 'business_smart'
                  ? 'Tailored Smart'
                  : selectedOccasion === 'seine_picnic'
                  ? 'Seine River Picnic'
                  : selectedOccasion === 'flaneur'
                  ? 'Flâneur & Stroll'
                  : selectedOccasion}
              </strong>.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 bg-stone-200/70 p-0.5 rounded-lg">
              {[
                { id: 'flaneur', label: 'Flâneur' },
                { id: 'chic_evening', label: 'Soirée' },
                { id: 'museum_walk', label: 'Musée' }
              ].map((occ) => (
                <button
                  key={occ.id}
                  onClick={() => onSelectOccasion(occ.id as any)}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded-md transition-all ${
                    selectedOccasion === occ.id
                      ? 'bg-stone-900 text-white font-bold'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  {occ.label}
                </button>
              ))}
            </div>

            <button
              onClick={onResetCloset}
              title="Reset to default classic wardrobe items"
              className="flex items-center gap-1 text-[11px] font-semibold text-stone-600 hover:text-stone-900 transition-colors ml-2"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-4 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {['All', 'Outerwear', 'Top', 'Bottom', 'Footwear', 'Accessory'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                  selectedCategoryFilter === cat
                    ? 'bg-stone-900 text-white font-semibold shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-56">
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-stone-400" />
              <input
                type="text"
                placeholder="Search items (e.g. wool, shirt)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-stone-50/70 pl-8 pr-3 py-1 text-xs focus:border-stone-400 focus:bg-white focus:outline-none"
              />
            </div>
            <select
              value={selectedFabricFilter}
              onChange={(e) => setSelectedFabricFilter(e.target.value)}
              className="rounded-lg border border-stone-200 bg-stone-50 px-2 py-1 text-xs font-medium text-stone-700 focus:outline-none"
            >
              <option value="All">All Fabrics</option>
              {FABRIC_OPTIONS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Closet Items Grid */}
      {filteredCloset.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <Shirt className="mx-auto h-10 w-10 text-stone-300 mb-2" />
          <h3 className="font-serif text-lg font-bold text-stone-800">No clothing items found</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto mt-1">
            {closet.length === 0
              ? 'Your closet is empty. Add your own items or load the classic Paris wardrobe basics.'
              : 'No items match your current filter or search query.'}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={openAddForm}
              className="rounded-lg bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
            >
              + Add First Item
            </button>
            <button
              onClick={onResetCloset}
              className="rounded-lg border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100"
            >
              Load Classic Basics
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCloset.map((item) => {
            const evaluation = evaluateItemFit(item, temperatureC, isRainy, isWindy, humidity, selectedOccasion);

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-4 shadow-2xs hover:shadow-xs transition-all"
              >
                <div>
                  {/* Category & Actions */}
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditForm(item)}
                        className="rounded-md p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-800 transition-colors"
                        title="Edit clothing item"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="rounded-md p-1 text-stone-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        title="Delete clothing item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="mt-2 font-serif text-base font-bold text-stone-900">
                    {item.name}
                  </h4>

                  {/* Fabric badge & Warmth */}
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="rounded-md bg-stone-900 px-2 py-0.5 text-xs font-semibold text-amber-200">
                      {item.fabric}
                    </span>
                    <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600 capitalize">
                      {item.warmthLevel} Warmth
                    </span>
                    {item.color && (
                      <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[11px] text-stone-500">
                        {item.color}
                      </span>
                    )}
                  </div>

                  {/* Fabric Detail / Notes */}
                  {(item.fabricDetail || item.notes) && (
                    <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                      {item.fabricDetail ? <strong>{item.fabricDetail} • </strong> : ''}
                      {item.notes}
                    </p>
                  )}

                  {/* Tags */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {item.isWaterResistant && (
                      <span className="flex items-center gap-0.5 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-200">
                        <Droplets className="h-2.5 w-2.5" /> Water-Resistant
                      </span>
                    )}
                    {item.isWindResistant && (
                      <span className="flex items-center gap-0.5 rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-semibold text-stone-700 border border-stone-200">
                        <Wind className="h-2.5 w-2.5" /> Wind-Resistant
                      </span>
                    )}
                    {item.isBreathable && (
                      <span className="flex items-center gap-0.5 rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                        <Feather className="h-2.5 w-2.5" /> Breathable
                      </span>
                    )}
                  </div>
                </div>

                {/* Weather Fit Evaluation Box */}
                <div className="mt-3.5 border-t border-stone-100 pt-3">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                      Today in Paris ({temperatureC}°C):
                    </span>
                    {getVerdictBadge(evaluation)}
                  </div>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    {evaluation.fitReason}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Item Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {editingItem ? 'Edit Clothing Item' : 'Add Clothing Item to Closet'}
                </h3>
                <p className="text-xs text-stone-500">
                  Keep fabrics simple: Cotton, Wool, Linen, Denim, Leather, Fleece, Silk
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="mt-4 space-y-4 text-xs">
              {/* Name */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Item Name: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navy Wool Crewneck Sweater, Pure Linen Shirt, White Cotton Tee"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 focus:border-stone-900 focus:outline-none"
                />
              </div>

              {/* Category & Fabric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Category: *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 focus:border-stone-900 focus:outline-none"
                  >
                    <option value="Outerwear">Outerwear (Coats, Jackets, Trench)</option>
                    <option value="Top">Top (Shirts, Sweaters, T-Shirts)</option>
                    <option value="Bottom">Bottom (Pants, Jeans, Skirts, Shorts)</option>
                    <option value="Footwear">Footwear (Boots, Sneakers, Shoes)</option>
                    <option value="Accessory">Accessory (Scarves, Hats, Gloves)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Simple Fabric: *
                  </label>
                  <select
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value as any)}
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 focus:border-stone-900 focus:outline-none font-bold"
                  >
                    {FABRIC_OPTIONS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fabric Detail & Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Fabric Type / Weight (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Combed Cotton, Heavy Knit, Flannel"
                    value={fabricDetail}
                    onChange={(e) => setFabricDetail(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 focus:border-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Color / Shade (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Navy Blue, Charcoal, Sand, White"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 focus:border-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Warmth Level */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1.5">
                  Warmth / Thickness Level:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'light', label: 'Light (Summer / 20°C+)', desc: 'Thin cotton, linen, silk' },
                    { id: 'medium', label: 'Medium (Spring/Fall / 10-20°C)', desc: 'Chinos, mid knit, denim' },
                    { id: 'heavy', label: 'Heavy (Winter / <10°C)', desc: 'Wool coat, thick knit, flannel' }
                  ].map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setWarmthLevel(w.id as any)}
                      className={`rounded-lg border p-2 text-left transition-all ${
                        warmthLevel === w.id
                          ? 'border-stone-900 bg-stone-900 text-white font-bold'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="font-semibold text-[11px]">{w.label}</div>
                      <div className={`text-[10px] mt-0.5 ${warmthLevel === w.id ? 'text-stone-300' : 'text-stone-500'}`}>
                        {w.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weather Properties Checkboxes */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Textile Properties:
                </label>
                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isWaterResistant}
                      onChange={(e) => setIsWaterResistant(e.target.checked)}
                      className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                    />
                    <span className="text-stone-700">Water-Resistant (Sheds Rain)</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isWindResistant}
                      onChange={(e) => setIsWindResistant(e.target.checked)}
                      className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                    />
                    <span className="text-stone-700">Wind-Resistant (Blocks Drafts)</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isBreathable}
                      onChange={(e) => setIsBreathable(e.target.checked)}
                      className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                    />
                    <span className="text-stone-700">Breathable & Airy</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Styling Notes / Fit Description (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g. Loose casual fit, fits nicely over t-shirts, comfortable for 15k steps"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 focus:border-stone-900 focus:outline-none"
                />
              </div>

              {/* Footer buttons */}
              <div className="flex items-center justify-end gap-2 border-t border-stone-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-lg border border-stone-300 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  {editingItem ? 'Save Changes' : 'Add to Closet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
