import { useState } from 'react';
import { Sparkles, X, Send, Bot, Loader2, AlertCircle, Shirt, Feather } from 'lucide-react';
import { OutfitRecommendation, TemperatureUnit } from '../types';

interface AIStylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  temperatureC: number;
  conditionLabel: string;
  humidity: number;
  windSpeed: number;
  unit: TemperatureUnit;
  onApplyAIOutfit: (outfit: OutfitRecommendation) => void;
}

export default function AIStylistModal({
  isOpen,
  onClose,
  temperatureC,
  conditionLabel,
  humidity,
  windSpeed,
  unit,
  onApplyAIOutfit
}: AIStylistModalProps) {
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('Dinner & Seine River Walk in Saint-Germain');
  const [genderPref, setGenderPref] = useState<string>('Unisex / Fluid Minimalist');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickPrompts = [
    'Dinner cruise on the Seine with cool river breeze',
    'Walking 20,000 steps around Montmartre & Louvre',
    'Chic rooftop cocktail evening in Le Marais',
    'Rainy afternoon café reading & vintage bookshopping',
    'Formal business presentation in La Défense'
  ];

  const handleConsult = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/stylist/paris', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          temperature: temperatureC,
          condition: conditionLabel,
          humidity,
          windSpeed,
          occasion,
          genderPreference: genderPref,
          userQuery: userPrompt
        })
      });

      const result = await response.json();

      if (result.success && result.data) {
        onApplyAIOutfit({
          ...result.data,
          isCustomAi: true
        });
        onClose();
      } else {
        setErrorMsg(result.message || 'AI consultation could not complete. Please check the API key.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to connect to the Parisian stylist service.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-900 text-amber-300">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                AI Parisian Sartorial Stylist
              </h3>
              <p className="text-xs text-stone-500">
                Powered by Gemini 3.7 Flash & Le Marais textile intelligence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Weather Context */}
        <div className="mt-4 rounded-xl bg-stone-50 p-3 border border-stone-200 text-xs flex items-center justify-between">
          <span className="text-stone-600">Current Meteorological Context:</span>
          <span className="font-mono font-bold text-stone-900">
            Paris • {temperatureC}°C ({unit === 'fahrenheit' ? Math.round((temperatureC * 9) / 5 + 32) + '°F' : `${temperatureC}°C`}) • {conditionLabel}
          </span>
        </div>

        {/* Form Inputs */}
        <div className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Your Parisian Scenario / Itinerary:
            </label>
            <input
              type="text"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder="e.g. Gallery opening in Saint-Germain then late bistro"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none"
            />
          </div>

          {/* Quick Prompts */}
          <div>
            <span className="text-[10px] font-semibold uppercase text-stone-500 tracking-wider">
              Quick Scenarios:
            </span>
            <div className="mt-1 flex flex-wrap gap-1">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setOccasion(p)}
                  className="rounded-md border border-stone-200 bg-stone-50 px-2 py-1 text-[11px] text-stone-700 hover:bg-stone-100"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Specific Clothing / Fabric Inquiries or Constraints (Optional):
            </label>
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              rows={2}
              placeholder="e.g. I tend to get cold easily; make sure to suggest extra thermal base layers and windproof outerwear without looking bulky."
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:border-stone-900 focus:outline-none"
            />
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-800 border border-amber-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-2 border-t border-stone-100 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-stone-300 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConsult}
            disabled={isLoading}
            className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Consulting Parisian Stylist...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>Generate Tailored Fabric Blueprint</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
