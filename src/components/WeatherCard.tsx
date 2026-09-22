import React, { useState } from 'react';
import { 
  CloudSun, 
  Sun, 
  CloudRain, 
  CloudFog, 
  CloudLightning, 
  Wind, 
  Droplets, 
  Thermometer, 
  Eye, 
  Compass, 
  ArrowUpRight, 
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { ParisWeatherData, TemperatureUnit } from '../types';
import TemperatureSparkline from './TemperatureSparkline';

interface WeatherCardProps {
  weather: ParisWeatherData;
  unit: TemperatureUnit;
  isSimulated: boolean;
  onOpenSimulator?: () => void;
}

export default function WeatherCard({ weather, unit, isSimulated, onOpenSimulator }: WeatherCardProps) {
  const { current, hourly, daily } = weather;
  const [selectedHourIndex, setSelectedHourIndex] = useState<number | null>(null);

  const formatTemp = (tempC: number) => {
    if (unit === 'fahrenheit') {
      const f = Math.round((tempC * 9) / 5 + 32);
      return `${f}°F`;
    }
    return `${Math.round(tempC)}°C`;
  };

  const getQuickFabricTag = (tempC: number) => {
    if (tempC >= 28) return 'Linen';
    if (tempC >= 21) return 'Cotton';
    if (tempC >= 15) return 'Trench';
    if (tempC >= 8) return 'Wool';
    return 'Melton';
  };

  const getWeatherIcon = (code: number, isDay: boolean = true, className: string = 'w-6 h-6') => {
    if (code === 0) return <Sun className={`${className} text-amber-500`} />;
    if ([1, 2].includes(code)) return <CloudSun className={`${className} text-amber-400`} />;
    if (code === 3) return <CloudSun className={`${className} text-stone-400`} />;
    if ([45, 48].includes(code)) return <CloudFog className={`${className} text-stone-400`} />;
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain className={`${className} text-sky-500`} />;
    if ([95, 96, 99].includes(code)) return <CloudLightning className={`${className} text-purple-600`} />;
    return <CloudSun className={`${className} text-amber-500`} />;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-200/90 bg-linear-to-br from-stone-900 via-stone-850 to-stone-900 p-6 text-stone-100 shadow-md">
      {/* Ambient background decoration subtle architectural silhouette */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

      {/* Top Banner: Location & Atmospheric Tag */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm font-semibold tracking-wider text-amber-300 uppercase">
              Île-de-France • Paris
            </span>
            {isSimulated && (
              <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-400/30">
                Simulated Condition
              </span>
            )}
          </div>
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
            Parisian Atmosphere & Meteorological State
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {onOpenSimulator && (
            <button
              onClick={onOpenSimulator}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                isSimulated
                  ? 'bg-amber-400 text-stone-900 shadow-xs'
                  : 'bg-stone-800/90 text-amber-200 border border-amber-400/40 hover:bg-stone-700'
              }`}
            >
              <span>⚙️</span>
              <span>{isSimulated ? 'Simulator Active' : 'Adjust in Simulator'}</span>
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1.5 rounded-xl bg-stone-800/80 px-3 py-1.5 text-xs text-stone-300 border border-stone-700/60">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Optimal Fabric Matrix: Active</span>
          </div>
        </div>
      </div>

      {/* Main Temperature Hero Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 py-6 items-center">
        {/* Big Temperature Gauge */}
        <div className="md:col-span-6 flex flex-col justify-center">
          <div className="flex items-baseline gap-4">
            <span className="font-serif text-6xl sm:text-7xl font-extrabold tracking-tighter text-white">
              {formatTemp(current.temperature)}
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-stone-400">Ressenti (Feels like)</span>
              <span className="text-xl font-bold text-amber-200">{formatTemp(current.apparentTemperature)}</span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-800 text-amber-400 border border-stone-700">
              {getWeatherIcon(current.weatherCode, current.isDay, 'w-5 h-5')}
            </div>
            <div>
              <div className="text-base font-semibold text-white">
                {current.condition.label}
              </div>
              <div className="text-xs text-stone-400 italic font-serif">
                "{current.condition.frenchLabel}"
              </div>
            </div>
          </div>
        </div>

        {/* 4 Micro Climate Indicators */}
        <div className="md:col-span-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-stone-800 bg-stone-850/70 p-3">
            <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
              <Droplets className="h-4 w-4 text-sky-400" />
              <span>Humidité (Humidity)</span>
            </div>
            <div className="text-lg font-bold text-white">{current.humidity}%</div>
            <div className="text-[11px] text-stone-400 mt-0.5">
              {current.humidity > 70 ? 'High moisture (Wear breathable natural fibers)' : 'Crisp & balanced'}
            </div>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-850/70 p-3">
            <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
              <Wind className="h-4 w-4 text-teal-400" />
              <span>Vent (Wind)</span>
            </div>
            <div className="text-lg font-bold text-white">{Math.round(current.windSpeed)} km/h</div>
            <div className="text-[11px] text-stone-400 mt-0.5">
              {current.windSpeed > 20 ? 'Brisk gusts along the Seine' : 'Gentle city breeze'}
            </div>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-850/70 p-3">
            <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
              <CloudRain className="h-4 w-4 text-indigo-400" />
              <span>Précipitations</span>
            </div>
            <div className="text-lg font-bold text-white">
              {daily?.[0]?.precipitationProbabilityMax ?? current.precipitation ?? 0}%
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">
              {(daily?.[0]?.precipitationProbabilityMax ?? 0) > 30 ? 'Gabardine trench recommended' : 'Dry conditions'}
            </div>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-850/70 p-3">
            <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
              <Sun className="h-4 w-4 text-amber-400" />
              <span>Indice UV</span>
            </div>
            <div className="text-lg font-bold text-white">
              {current.uvIndex ?? daily?.[0]?.uvIndexMax ?? 4.2} / 10
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">
              {(current.uvIndex ?? 4) >= 5 ? 'Silk foulard & sunglasses recommended' : 'Moderate exposure'}
            </div>
          </div>
        </div>
      </div>

      {/* 24-Hour Temperature Trajectory Sparkline */}
      {hourly && hourly.length > 0 && (
        <div className="relative z-10 mt-2 border-t border-stone-800/80 pt-4">
          <TemperatureSparkline
            hourly={hourly}
            unit={unit}
            formatTemp={formatTemp}
            currentTempC={current.temperature}
            isSimulated={isSimulated}
            selectedHourIndex={selectedHourIndex}
            onSelectHour={setSelectedHourIndex}
          />
        </div>
      )}

      {/* Hourly 24-Hour Synchronized Carousel */}
      {hourly && hourly.length > 0 && (
        <div className="relative z-10 mt-3">
          <div className="mb-2 flex items-center justify-between text-xs text-stone-400 font-medium">
            <span className="flex items-center gap-1.5">
              <span>Prévisions Détaillées (24-Hour Synchronized Feed)</span>
              <span className="rounded-full bg-stone-800 px-2 py-0.5 text-[10px] text-amber-300 font-mono">
                {Math.min(hourly.length, 24)}h Cycle
              </span>
            </span>
            <span className="text-[11px] text-stone-500 italic">Hover sparkline or click card to inspect →</span>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-700">
            {hourly.slice(0, 24).map((hour, idx) => {
              const isSelected = selectedHourIndex === idx;
              return (
                <div
                  key={idx}
                  onPointerEnter={() => setSelectedHourIndex(idx)}
                  onPointerLeave={() => setSelectedHourIndex(null)}
                  onClick={() => setSelectedHourIndex(idx === selectedHourIndex ? null : idx)}
                  className={`flex flex-col items-center justify-between min-w-[72px] rounded-xl border p-2 text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-400 bg-stone-800 ring-2 ring-amber-400/50 scale-105 shadow-md shadow-amber-500/10'
                      : 'border-stone-800/90 bg-stone-850/50 hover:bg-stone-800 hover:border-stone-700'
                  }`}
                >
                  <span className={`text-[11px] font-mono ${isSelected ? 'text-amber-300 font-bold' : 'text-stone-400'}`}>
                    {hour.time}
                  </span>
                  <div className="my-1.5">
                    {getWeatherIcon(hour.weatherCode, hour.hourNumber >= 7 && hour.hourNumber <= 21, 'w-4 h-4')}
                  </div>
                  <span className={`text-xs font-bold ${isSelected ? 'text-amber-200' : 'text-stone-100'}`}>
                    {formatTemp(hour.temperature)}
                  </span>
                  <span className="mt-1 rounded-sm bg-stone-900/80 px-1.5 py-0.5 text-[9px] font-semibold text-stone-300 border border-stone-800">
                    {getQuickFabricTag(hour.temperature)}
                  </span>
                  {hour.precipitationProbability > 0 && (
                    <span className="text-[10px] text-sky-400 mt-0.5 font-medium">
                      {hour.precipitationProbability}%
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7-Day Paris Weather Strip */}
      {daily && daily.length > 0 && (
        <div className="relative z-10 mt-4 border-t border-stone-800/80 pt-3.5">
          <div className="mb-2 text-xs font-medium text-stone-400">
            7-Day Parisian Temperature Trend
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {daily.map((day, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-2 text-center text-xs transition-colors ${
                  idx === 0
                    ? 'border-amber-500/40 bg-amber-500/10 text-white font-medium'
                    : 'border-stone-800/80 bg-stone-850/30 text-stone-300'
                }`}
              >
                <div className="text-[11px] font-semibold text-stone-400">{day.dayName}</div>
                <div className="my-1 flex justify-center">
                  {getWeatherIcon(day.weatherCode, true, 'w-4 h-4')}
                </div>
                <div className="text-xs font-bold text-white">
                  {formatTemp(day.tempMax)}
                </div>
                <div className="text-[10px] text-stone-400">
                  {formatTemp(day.tempMin)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
