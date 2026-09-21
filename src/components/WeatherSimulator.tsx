import React from 'react';
import { 
  Sliders, 
  Sun, 
  CloudSun, 
  CloudRain, 
  CloudFog, 
  Wind, 
  Flame, 
  Snowflake,
  RotateCcw,
  Minus,
  Plus,
  Sparkles,
  Info
} from 'lucide-react';
import { WeatherConditionKey, TemperatureUnit } from '../types';

interface WeatherSimulatorProps {
  temperatureC: number;
  onTemperatureChange: (temp: number) => void;
  conditionKey: WeatherConditionKey;
  onConditionChange: (key: WeatherConditionKey) => void;
  windSpeed: number;
  onWindSpeedChange: (speed: number) => void;
  humidity: number;
  onHumidityChange: (hum: number) => void;
  unit: TemperatureUnit;
  onResetToLive: () => void;
}

export default function WeatherSimulator({
  temperatureC,
  onTemperatureChange,
  conditionKey,
  onConditionChange,
  windSpeed,
  onWindSpeedChange,
  humidity,
  onHumidityChange,
  unit,
  onResetToLive
}: WeatherSimulatorProps) {
  const presets = [
    { label: 'Frosty Winter (-2°C)', temp: -2, condition: 'snow' as WeatherConditionKey, wind: 22, hum: 80, icon: <Snowflake className="w-3.5 h-3.5 text-sky-500" /> },
    { label: 'Crisp Autumn (9°C)', temp: 9, condition: 'cloudy' as WeatherConditionKey, wind: 15, hum: 70, icon: <CloudSun className="w-3.5 h-3.5 text-stone-600" /> },
    { label: 'Classic Paris Rain (13°C)', temp: 13, condition: 'rain' as WeatherConditionKey, wind: 18, hum: 88, icon: <CloudRain className="w-3.5 h-3.5 text-sky-600" /> },
    { label: 'Quintessential Spring (18°C)', temp: 18, condition: 'clear_day' as WeatherConditionKey, wind: 10, hum: 55, icon: <Sun className="w-3.5 h-3.5 text-amber-500" /> },
    { label: 'Balmy Summer (25°C)', temp: 25, condition: 'clear_day' as WeatherConditionKey, wind: 8, hum: 50, icon: <Sun className="w-3.5 h-3.5 text-amber-600" /> },
    { label: 'Canicule Heatwave (34°C)', temp: 34, condition: 'heatwave' as WeatherConditionKey, wind: 6, hum: 42, icon: <Flame className="w-3.5 h-3.5 text-red-500" /> },
  ];

  const conditionOptions: Array<{ key: WeatherConditionKey; label: string; icon: React.ReactNode }> = [
    { key: 'clear_day', label: 'Clear Sun', icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { key: 'few_clouds', label: 'Partly Cloudy', icon: <CloudSun className="w-4 h-4 text-amber-400" /> },
    { key: 'overcast', label: 'Overcast Grey', icon: <CloudFog className="w-4 h-4 text-stone-500" /> },
    { key: 'drizzle', label: 'Parisian Drizzle', icon: <CloudRain className="w-4 h-4 text-sky-400" /> },
    { key: 'rain', label: 'Rainy Showers', icon: <CloudRain className="w-4 h-4 text-sky-600" /> },
    { key: 'windy', label: 'Brisk Seine Wind', icon: <Wind className="w-4 h-4 text-teal-600" /> },
    { key: 'snow', label: 'Winter Frost & Snow', icon: <Snowflake className="w-4 h-4 text-sky-400" /> },
    { key: 'heatwave', label: 'Heatwave', icon: <Flame className="w-4 h-4 text-red-500" /> }
  ];

  const displayTemp = unit === 'fahrenheit' ? Math.round((temperatureC * 9) / 5 + 32) : temperatureC;
  const unitSymbol = unit === 'fahrenheit' ? '°F' : '°C';

  // Determine current tier description
  const getTierInfo = (temp: number) => {
    if (temp >= 28) {
      return {
        name: 'Canicule / Heatwave (≥28°C)',
        fabrics: 'Linen, Open-weave Cotton, Silk',
        avoid: 'Heavy wool, denim jackets, leather',
        badgeColor: 'bg-red-100 text-red-800 border-red-200'
      };
    }
    if (temp >= 21) {
      return {
        name: 'Warm Parisian Summer (21–27°C)',
        fabrics: 'Lightweight Cotton, Linen, Silk Foulard',
        avoid: 'Heavy knits, shearling, thermal boots',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
      };
    }
    if (temp >= 15) {
      return {
        name: 'Mild Spring & Autumn (15–20°C)',
        fabrics: 'Cotton Gabardine Trench, Breton Stripe Cotton, Fine Merino Wool',
        avoid: 'Heavy down parkas, thin beachwear',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
      };
    }
    if (temp >= 8) {
      return {
        name: 'Crisp Autumn / Cool Weather (8–14°C)',
        fabrics: 'Medium Wool Overcoats, Wool Flannel, Selvedge Denim, Leather Boots',
        avoid: 'Pure linen, unlined jackets, open canvas shoes',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
      };
    }
    if (temp >= 2) {
      return {
        name: 'Chilly Parisian Winter (2–7°C)',
        fabrics: 'Heavy Wool Meltons, Cashmere Scarves, Flannel Trousers, Thermal Underlayers',
        avoid: 'Exposed ankles, cotton hoodies in rain, unlined footwear',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200'
      };
    }
    return {
      name: 'Freezing Cold & Frost (<2°C)',
      fabrics: 'Heavy Wool Overcoat, Wool-Cashmere Knitwear, Shearling & Leather, Wool Beanie',
      avoid: 'Cotton outerwear, single thin layers',
      badgeColor: 'bg-slate-200 text-slate-800 border-slate-300'
    };
  };

  const tierInfo = getTierInfo(temperatureC);

  return (
    <div id="paris-weather-simulator" className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-900 text-amber-300 shadow-2xs">
            <Sliders className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-base font-bold text-stone-900">
                Interactive Paris Weather Simulator
              </h3>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${tierInfo.badgeColor}`}>
                {tierInfo.name}
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Adjust temperature, rain, or wind to observe instant clothing fabric adaptations
            </p>
          </div>
        </div>

        <button
          id="btn-simulator-reset-live"
          onClick={onResetToLive}
          className="flex items-center gap-1.5 rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset to Live Paris</span>
        </button>
      </div>

      {/* Quick Scenario Presets */}
      <div className="mt-3.5">
        <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
          Parisian Seasonal Presets:
        </span>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              id={`preset-btn-${idx}`}
              onClick={() => {
                onTemperatureChange(preset.temp);
                onConditionChange(preset.condition);
                onWindSpeedChange(preset.wind);
                onHumidityChange(preset.hum);
              }}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                Math.abs(temperatureC - preset.temp) < 1 && conditionKey === preset.condition
                  ? 'bg-stone-900 text-white shadow-xs font-semibold ring-1 ring-stone-900'
                  : 'border border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {preset.icon}
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Controls Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Temperature Slider with +/- Buttons */}
        <div className="md:col-span-6 rounded-xl border border-stone-200 bg-stone-50/70 p-3.5">
          <div className="flex items-center justify-between text-xs font-medium text-stone-700 mb-1.5">
            <span>Air Temperature (Température)</span>
            <div className="flex items-center gap-1.5">
              <button
                id="btn-temp-minus"
                onClick={() => onTemperatureChange(Math.max(-10, temperatureC - 1))}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 transition-colors"
                title="Decrease 1°C"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="font-mono text-sm font-bold text-stone-900 bg-white px-2.5 py-0.5 rounded-md border border-stone-200 shadow-2xs">
                {displayTemp} {unitSymbol} ({temperatureC}°C)
              </span>
              <button
                id="btn-temp-plus"
                onClick={() => onTemperatureChange(Math.min(40, temperatureC + 1))}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 transition-colors"
                title="Increase 1°C"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
          <input
            id="slider-temperature"
            type="range"
            min="-10"
            max="40"
            step="1"
            value={temperatureC}
            onChange={(e) => onTemperatureChange(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
          />
          <div className="flex justify-between text-[10px] text-stone-600 mt-1 font-mono">
            <span>-10°C (Frost)</span>
            <span>10°C (Crisp)</span>
            <span>20°C (Mild)</span>
            <span>30°C (Summer)</span>
            <span>40°C (Heatwave)</span>
          </div>
        </div>

        {/* Wind & Humidity Sliders */}
        <div className="md:col-span-6 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3">
            <div className="flex items-center justify-between text-xs font-medium text-stone-700 mb-1">
              <span className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-teal-600" />
                <span>Wind</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onWindSpeedChange(Math.max(0, windSpeed - 2))}
                  className="h-5 w-5 flex items-center justify-center rounded border border-stone-300 bg-white text-stone-700 hover:bg-stone-100"
                >
                  <Minus className="h-2.5 w-2.5" />
                </button>
                <span className="font-mono font-bold text-stone-900 min-w-[42px] text-center">{windSpeed} km/h</span>
                <button
                  onClick={() => onWindSpeedChange(Math.min(50, windSpeed + 2))}
                  className="h-5 w-5 flex items-center justify-center rounded border border-stone-300 bg-white text-stone-700 hover:bg-stone-100"
                >
                  <Plus className="h-2.5 w-2.5" />
                </button>
              </div>
            </div>
            <input
              id="slider-wind"
              type="range"
              min="0"
              max="50"
              step="2"
              value={windSpeed}
              onChange={(e) => onWindSpeedChange(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
            />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3">
            <div className="flex items-center justify-between text-xs font-medium text-stone-700 mb-1">
              <span className="flex items-center gap-1">
                <CloudRain className="w-3.5 h-3.5 text-sky-600" />
                <span>Humidity</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onHumidityChange(Math.max(20, humidity - 5))}
                  className="h-5 w-5 flex items-center justify-center rounded border border-stone-300 bg-white text-stone-700 hover:bg-stone-100"
                >
                  <Minus className="h-2.5 w-2.5" />
                </button>
                <span className="font-mono font-bold text-stone-900 min-w-[34px] text-center">{humidity}%</span>
                <button
                  onClick={() => onHumidityChange(Math.min(100, humidity + 5))}
                  className="h-5 w-5 flex items-center justify-center rounded border border-stone-300 bg-white text-stone-700 hover:bg-stone-100"
                >
                  <Plus className="h-2.5 w-2.5" />
                </button>
              </div>
            </div>
            <input
              id="slider-humidity"
              type="range"
              min="20"
              max="100"
              step="5"
              value={humidity}
              onChange={(e) => onHumidityChange(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-sky-700"
            />
          </div>
        </div>
      </div>

      {/* Atmospheric Condition Selector Pills */}
      <div className="mt-3.5">
        <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
          Sky / Atmospheric Conditions:
        </span>
        <div className="mt-1.5 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {conditionOptions.map((opt) => (
            <button
              key={opt.key}
              id={`condition-opt-${opt.key}`}
              onClick={() => onConditionChange(opt.key)}
              className={`flex items-center gap-2 rounded-lg border p-2 text-xs font-medium transition-all cursor-pointer ${
                conditionKey === opt.key
                  ? 'border-stone-900 bg-stone-900 text-white shadow-xs font-semibold'
                  : 'border-stone-200 bg-stone-50/60 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {opt.icon}
              <span className="truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Real-Time Fabric Matrix Helper Callout */}
      <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl bg-amber-50/80 border border-amber-200/70 p-2.5 text-xs text-amber-950">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-700 shrink-0" />
          <span>
            <strong>Optimal Fabrics for {temperatureC}°C:</strong> {tierInfo.fabrics}
          </span>
        </div>
        <div className="text-[11px] text-amber-800 sm:text-right font-medium">
          Avoid: <span className="line-through">{tierInfo.avoid}</span>
        </div>
      </div>
    </div>
  );
}
