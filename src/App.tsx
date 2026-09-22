import { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import WeatherSimulator from './components/WeatherSimulator';
import OutfitAdvisor from './components/OutfitAdvisor';
import MyClosetManager from './components/MyClosetManager';
import FabricGuide from './components/FabricGuide';
import AIStylistModal from './components/AIStylistModal';
import { generateParisOutfit } from './data/clothingRules';
import { 
  loadUserCloset, 
  saveUserCloset, 
  evaluateUserCloset, 
  DEFAULT_USER_CLOSET 
} from './data/userClosetData';
import { 
  ParisWeatherData, 
  TemperatureUnit, 
  WeatherConditionKey, 
  OccasionType, 
  OutfitRecommendation,
  WeatherConditionInfo,
  UserClothingItem
} from './types';

const CONDITION_MAP: Record<number, { key: WeatherConditionKey; label: string; frenchLabel: string; isRainy: boolean; isCold: boolean; isHot: boolean; isWindy: boolean }> = {
  0: { key: 'clear_day', label: 'Clear Blue Sky', frenchLabel: 'Ciel Dégagé', isRainy: false, isCold: false, isHot: false, isWindy: false },
  1: { key: 'few_clouds', label: 'Mainly Sunny', frenchLabel: 'Ensoleillé', isRainy: false, isCold: false, isHot: false, isWindy: false },
  2: { key: 'few_clouds', label: 'Partly Cloudy', frenchLabel: 'Éclaircies', isRainy: false, isCold: false, isHot: false, isWindy: false },
  3: { key: 'overcast', label: 'Overcast Haussmann Grey', frenchLabel: 'Ciel Couvert', isRainy: false, isCold: false, isHot: false, isWindy: false },
  45: { key: 'fog', label: 'Morning Seine Mist', frenchLabel: 'Brume Matinale', isRainy: false, isCold: true, isHot: false, isWindy: false },
  48: { key: 'fog', label: 'Dense Fog', frenchLabel: 'Brouillard Givrant', isRainy: false, isCold: true, isHot: false, isWindy: false },
  51: { key: 'drizzle', label: 'Light Parisian Drizzle', frenchLabel: 'Bruine Légère', isRainy: true, isCold: false, isHot: false, isWindy: false },
  53: { key: 'drizzle', label: 'Moderate Drizzle', frenchLabel: 'Bruine Continue', isRainy: true, isCold: false, isHot: false, isWindy: false },
  55: { key: 'drizzle', label: 'Dense Drizzle', frenchLabel: 'Bruine Dense', isRainy: true, isCold: false, isHot: false, isWindy: false },
  61: { key: 'rain', label: 'Light Rain Showers', frenchLabel: 'Pluie Fine', isRainy: true, isCold: false, isHot: false, isWindy: false },
  63: { key: 'rain', label: 'Moderate Rain', frenchLabel: 'Pluie Battante', isRainy: true, isCold: false, isHot: false, isWindy: false },
  65: { key: 'heavy_rain', label: 'Heavy Rainstorm', frenchLabel: 'Forte Averse', isRainy: true, isCold: false, isHot: false, isWindy: false },
  71: { key: 'snow', label: 'Light Parisian Snow', frenchLabel: 'Neige Légère', isRainy: false, isCold: true, isHot: false, isWindy: false },
  80: { key: 'rain', label: 'Passing Showers', frenchLabel: 'Averses Passagères', isRainy: true, isCold: false, isHot: false, isWindy: false },
  95: { key: 'thunderstorm', label: 'Summer Thunderstorm', frenchLabel: 'Orage d\'Été', isRainy: true, isCold: false, isHot: false, isWindy: true }
};

export default function App() {
  // Navigation & Display settings
  const [activeTab, setActiveTab] = useState<'advisor' | 'closet' | 'fabrics'>('advisor');
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  const [isSimulated, setIsSimulated] = useState<boolean>(false);
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('flaneur');
  const [isAIStylistOpen, setIsAIStylistOpen] = useState<boolean>(false);

  // User Closet State
  const [userCloset, setUserCloset] = useState<UserClothingItem[]>(() => loadUserCloset());

  // Weather data states
  const [liveWeather, setLiveWeather] = useState<ParisWeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(true);

  // Simulator controls
  const [simTempC, setSimTempC] = useState<number>(18);
  const [simConditionKey, setSimConditionKey] = useState<WeatherConditionKey>('few_clouds');
  const [simWindSpeed, setSimWindSpeed] = useState<number>(12);
  const [simHumidity, setSimHumidity] = useState<number>(58);

  // Custom AI Outfit override (if user consulted Gemini)
  const [customAIOutfit, setCustomAIOutfit] = useState<OutfitRecommendation | null>(null);

  // Fabric selection highlight in lab
  const [selectedFabricHighlight, setSelectedFabricHighlight] = useState<string | null>(null);

  // Save user closet on state change
  const handleAddOrUpdateClosetItem = (item: UserClothingItem) => {
    setUserCloset((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      let updated: UserClothingItem[];
      if (exists) {
        updated = prev.map((i) => (i.id === item.id ? item : i));
      } else {
        updated = [item, ...prev];
      }
      saveUserCloset(updated);
      return updated;
    });
  };

  const handleDeleteClosetItem = (id: string) => {
    setUserCloset((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      saveUserCloset(updated);
      return updated;
    });
  };

  const handleResetCloset = () => {
    setUserCloset(DEFAULT_USER_CLOSET);
    saveUserCloset(DEFAULT_USER_CLOSET);
  };

  // Fetch Live Weather from Server (with client-side Open-Meteo fallback for GitHub Pages)
  const fetchParisWeather = useCallback(async () => {
    setIsLoadingWeather(true);
    try {
      let raw: any = null;
      let source: 'live' | 'fallback' | 'simulated' = 'live';

      try {
        const response = await fetch('/api/weather/paris');
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const json = await response.json();
            if (json.success && json.data) {
              raw = json.data;
              source = json.source === 'fallback' ? 'fallback' : 'live';
            }
          }
        }
      } catch {
        // Server route not available (e.g., static GitHub Pages hosting)
      }

      // If backend route didn't return data (e.g. GitHub Pages), fetch directly from Open-Meteo CORS-enabled public endpoint
      if (!raw) {
        const openMeteoUrl = 'https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max&timezone=Europe%2FParis';
        const directRes = await fetch(openMeteoUrl);
        if (directRes.ok) {
          raw = await directRes.json();
          source = 'live';
        }
      }

      if (raw) {
        const weatherCode = raw.current?.weather_code ?? 1;
        const condMeta = CONDITION_MAP[weatherCode] || CONDITION_MAP[1];

        const conditionInfo: WeatherConditionInfo = {
          key: condMeta.key,
          label: condMeta.label,
          frenchLabel: condMeta.frenchLabel,
          iconName: condMeta.key,
          description: `Paris condition: ${condMeta.label}`,
          isRainy: condMeta.isRainy,
          isCold: condMeta.isCold,
          isHot: condMeta.isHot,
          isWindy: (raw.current?.wind_speed_10m ?? 10) > 20
        };

        // Format hourly
        const hourlyFormatted = (raw.hourly?.time || []).slice(0, 24).map((timeStr: string, idx: number) => {
          const code = raw.hourly?.weather_code?.[idx] ?? 1;
          const meta = CONDITION_MAP[code] || CONDITION_MAP[1];
          const hourNum = parseInt(timeStr.split(':')[0] || '12', 10);
          return {
            time: timeStr.includes('T') ? timeStr.split('T')[1].substring(0, 5) : timeStr,
            hourNumber: isNaN(hourNum) ? 12 : hourNum,
            temperature: raw.hourly?.temperature_2m?.[idx] ?? 18,
            precipitationProbability: raw.hourly?.precipitation_probability?.[idx] ?? 0,
            weatherCode: code,
            windSpeed: raw.hourly?.wind_speed_10m?.[idx] ?? 10,
            condition: {
              key: meta.key,
              label: meta.label,
              frenchLabel: meta.frenchLabel,
              iconName: meta.key,
              description: meta.label,
              isRainy: meta.isRainy,
              isCold: meta.isCold,
              isHot: meta.isHot,
              isWindy: false
            }
          };
        });

        // Format daily
        const dailyFormatted = (raw.daily?.time || []).slice(0, 7).map((dStr: string, idx: number) => {
          const code = raw.daily?.weather_code?.[idx] ?? 1;
          const meta = CONDITION_MAP[code] || CONDITION_MAP[1];
          let dayName = dStr;
          try {
            const dateObj = new Date(dStr);
            dayName = idx === 0 ? 'Today' : idx === 1 ? 'Tomorrow' : new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(dateObj);
          } catch {
            dayName = `Day ${idx + 1}`;
          }

          return {
            date: dStr,
            dayName,
            tempMax: raw.daily?.temperature_2m_max?.[idx] ?? 20,
            tempMin: raw.daily?.temperature_2m_min?.[idx] ?? 12,
            precipitationProbabilityMax: raw.daily?.precipitation_probability_max?.[idx] ?? 0,
            uvIndexMax: raw.daily?.uv_index_max?.[idx] ?? 4.0,
            weatherCode: code,
            condition: {
              key: meta.key,
              label: meta.label,
              frenchLabel: meta.frenchLabel,
              iconName: meta.key,
              description: meta.label,
              isRainy: meta.isRainy,
              isCold: meta.isCold,
              isHot: meta.isHot,
              isWindy: false
            }
          };
        });

        const weatherResult: ParisWeatherData = {
          current: {
            temperature: raw.current?.temperature_2m ?? 18.5,
            apparentTemperature: raw.current?.apparent_temperature ?? (raw.current?.temperature_2m ?? 18.5),
            humidity: raw.current?.relative_humidity_2m ?? 60,
            windSpeed: raw.current?.wind_speed_10m ?? 12,
            windDirection: raw.current?.wind_direction_10m ?? 210,
            cloudCover: raw.current?.cloud_cover ?? 30,
            precipitation: raw.current?.precipitation ?? 0,
            weatherCode,
            isDay: (raw.current?.is_day ?? 1) === 1,
            uvIndex: raw.daily?.uv_index_max?.[0] ?? 4.5,
            condition: conditionInfo
          },
          hourly: hourlyFormatted,
          daily: dailyFormatted,
          source: source || 'live',
          lastUpdated: new Date().toLocaleTimeString()
        };

        setLiveWeather(weatherResult);
        // Sync simulator defaults with live
        setSimTempC(Math.round(weatherResult.current.temperature));
        setSimConditionKey(weatherResult.current.condition.key);
        setSimWindSpeed(Math.round(weatherResult.current.windSpeed));
        setSimHumidity(weatherResult.current.humidity);
      }
    } catch (err) {
      console.error('Failed to fetch Paris weather:', err);
    } finally {
      setIsLoadingWeather(false);
    }
  }, []);

  useEffect(() => {
    fetchParisWeather();
  }, [fetchParisWeather]);

  // Determine active temperature & condition
  const activeTempC = isSimulated
    ? simTempC
    : liveWeather?.current?.temperature ?? 18;

  const activeConditionKey = isSimulated
    ? simConditionKey
    : liveWeather?.current?.condition?.key ?? 'few_clouds';

  const activeWindSpeed = isSimulated
    ? simWindSpeed
    : liveWeather?.current?.windSpeed ?? 12;

  const activeHumidity = isSimulated
    ? simHumidity
    : liveWeather?.current?.humidity ?? 60;

  // Active outfit calculation (uses deterministic French rule engine or custom AI override)
  const currentOutfit: OutfitRecommendation = customAIOutfit && !isSimulated
    ? customAIOutfit
    : generateParisOutfit(
        activeTempC,
        activeConditionKey,
        activeWindSpeed,
        activeHumidity,
        selectedOccasion
      );

  // Evaluate User's Personal Closet Match for Active Weather
  const closetMatch = useMemo(() => {
    return evaluateUserCloset(
      userCloset,
      activeTempC,
      activeConditionKey,
      activeWindSpeed,
      activeHumidity,
      selectedOccasion
    );
  }, [userCloset, activeTempC, activeConditionKey, activeWindSpeed, activeHumidity, selectedOccasion]);

  // Fabric lab jump
  const handleOpenFabricDetail = (fabricName: string) => {
    setSelectedFabricHighlight(fabricName);
    setActiveTab('fabrics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetToLive = () => {
    setIsSimulated(false);
    if (liveWeather) {
      setSimTempC(Math.round(liveWeather.current.temperature));
      setSimConditionKey(liveWeather.current.condition.key);
      setSimWindSpeed(Math.round(liveWeather.current.windSpeed));
      setSimHumidity(liveWeather.current.humidity);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100/60 font-sans text-stone-900 antialiased selection:bg-amber-200 selection:text-stone-900">
      {/* Navigation and Top Controls */}
      <Header
        unit={unit}
        onToggleUnit={() => setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'))}
        isSimulated={isSimulated}
        onToggleSimulated={(val) => {
          setIsSimulated(val);
          if (val) {
            setCustomAIOutfit(null);
            setActiveTab('advisor');
          }
        }}
        selectedOccasion={selectedOccasion}
        onSelectOccasion={(occ) => {
          setSelectedOccasion(occ);
          setCustomAIOutfit(null);
        }}
        onRefreshWeather={fetchParisWeather}
        isRefreshing={isLoadingWeather}
        onOpenAIStylist={() => setIsAIStylistOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        closetCount={userCloset.length}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Tab 1: Weather & Outfit Advisor */}
        {activeTab === 'advisor' && (
          <div className="space-y-6">
            {/* Top Weather Visual Card */}
            {liveWeather && (
              <WeatherCard
                weather={{
                  ...liveWeather,
                  current: {
                    ...liveWeather.current,
                    temperature: activeTempC,
                    apparentTemperature: activeTempC - (activeWindSpeed > 20 ? 1.5 : 0),
                    humidity: activeHumidity,
                    windSpeed: activeWindSpeed,
                    condition: {
                      ...liveWeather.current.condition,
                      key: activeConditionKey,
                      label: isSimulated ? `Simulated (${activeConditionKey.replace('_', ' ')})` : liveWeather.current.condition.label
                    }
                  },
                  hourly: isSimulated
                    ? (liveWeather.hourly || []).map((h) => {
                        const tempDelta = activeTempC - (liveWeather.current?.temperature ?? activeTempC);
                        return {
                          ...h,
                          temperature: Math.round((h.temperature + tempDelta) * 10) / 10
                        };
                      })
                    : liveWeather.hourly
                }}
                unit={unit}
                isSimulated={isSimulated}
                onOpenSimulator={() => {
                  setIsSimulated((prev) => !prev);
                  setActiveTab('advisor');
                }}
              />
            )}

            {/* Interactive Weather Simulator Panel (shown when simulator mode is on) */}
            {isSimulated && (
              <WeatherSimulator
                temperatureC={simTempC}
                onTemperatureChange={setSimTempC}
                conditionKey={simConditionKey}
                onConditionChange={setSimConditionKey}
                windSpeed={simWindSpeed}
                onWindSpeedChange={setSimWindSpeed}
                humidity={simHumidity}
                onHumidityChange={setSimHumidity}
                unit={unit}
                onResetToLive={handleResetToLive}
              />
            )}

            {/* Curated Outfit & User Closet Best Fit Breakdown */}
            <OutfitAdvisor
              outfit={currentOutfit}
              closetMatch={closetMatch}
              temperatureC={activeTempC}
              unit={unit}
              selectedOccasion={selectedOccasion}
              onSelectOccasion={(occ) => {
                setSelectedOccasion(occ);
                setCustomAIOutfit(null);
              }}
              onOpenFabricDetail={handleOpenFabricDetail}
              onNavigateToCloset={() => setActiveTab('closet')}
            />
          </div>
        )}

        {/* Tab 2: User's Personal Closet Manager */}
        {activeTab === 'closet' && (
          <MyClosetManager
            closet={userCloset}
            onAddOrUpdateItem={handleAddOrUpdateClosetItem}
            onDeleteItem={handleDeleteClosetItem}
            onResetCloset={handleResetCloset}
            temperatureC={activeTempC}
            conditionKey={activeConditionKey}
            windSpeed={activeWindSpeed}
            humidity={activeHumidity}
            selectedOccasion={selectedOccasion}
            onSelectOccasion={(occ) => {
              setSelectedOccasion(occ);
              setCustomAIOutfit(null);
            }}
            onSelectBestFitView={() => setActiveTab('advisor')}
          />
        )}

        {/* Tab 3: Simple Fabric Guide */}
        {activeTab === 'fabrics' && (
          <FabricGuide
            currentTempC={activeTempC}
            unit={unit}
            selectedFabricHighlight={selectedFabricHighlight}
          />
        )}
      </main>

      {/* AI Stylist Modal */}
      <AIStylistModal
        isOpen={isAIStylistOpen}
        onClose={() => setIsAIStylistOpen(false)}
        temperatureC={activeTempC}
        conditionLabel={activeConditionKey}
        humidity={activeHumidity}
        windSpeed={activeWindSpeed}
        unit={unit}
        onApplyAIOutfit={(aiOutfit) => {
          setCustomAIOutfit(aiOutfit);
          setActiveTab('advisor');
        }}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-stone-200 bg-white py-8 text-center text-xs text-stone-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="font-serif font-semibold text-stone-700">
            Paris Weather & Wardrobe Fit Engine • Simple Fabrics
          </p>
          <p className="text-stone-400">
            Evaluating everyday cotton, wool, linen, denim, and leather pieces against real-time Paris temperatures.
          </p>
        </div>
      </footer>
    </div>
  );
}
