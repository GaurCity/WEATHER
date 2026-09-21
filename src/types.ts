export type TemperatureUnit = 'celsius' | 'fahrenheit';

export type WeatherConditionKey =
  | 'clear_day'
  | 'clear_night'
  | 'few_clouds'
  | 'cloudy'
  | 'overcast'
  | 'drizzle'
  | 'rain'
  | 'heavy_rain'
  | 'thunderstorm'
  | 'snow'
  | 'fog'
  | 'windy'
  | 'heatwave';

export interface WeatherConditionInfo {
  key: WeatherConditionKey;
  label: string;
  frenchLabel: string;
  iconName: string;
  description: string;
  isRainy: boolean;
  isCold: boolean;
  isHot: boolean;
  isWindy: boolean;
}

export interface ParisWeatherData {
  current: {
    temperature: number; // In Celsius
    apparentTemperature: number;
    humidity: number;
    windSpeed: number; // km/h
    windDirection: number;
    cloudCover: number;
    precipitation: number;
    weatherCode: number;
    isDay: boolean;
    uvIndex?: number;
    condition: WeatherConditionInfo;
  };
  hourly: Array<{
    time: string; // e.g. "14:00"
    hourNumber: number;
    temperature: number;
    precipitationProbability: number;
    weatherCode: number;
    windSpeed: number;
    condition: WeatherConditionInfo;
  }>;
  daily: Array<{
    date: string;
    dayName: string;
    tempMax: number;
    tempMin: number;
    precipitationProbabilityMax: number;
    uvIndexMax: number;
    weatherCode: number;
    condition: WeatherConditionInfo;
  }>;
  source: 'live' | 'fallback' | 'simulated';
  lastUpdated: string;
}

export type OccasionType = 
  | 'flaneur' // Casual strolling & café
  | 'chic_evening' // Fine dining / Opera / Bistro
  | 'museum_walk' // Indoors + brisk outdoor walking
  | 'business_smart' // Parisian professional
  | 'seine_picnic' // Outdoors by the river
  | (string & {}); // Any custom user-entered occasion string

export type SilhouettePreference = 'fluid' | 'tailored' | 'casual';

export type SimpleFabricType = 
  | 'Cotton' 
  | 'Wool' 
  | 'Linen' 
  | 'Denim' 
  | 'Leather' 
  | 'Fleece' 
  | 'Silk' 
  | 'Other';

export interface UserClothingItem {
  id: string;
  name: string;
  category: 'Outerwear' | 'Top' | 'Bottom' | 'Footwear' | 'Accessory';
  fabric: SimpleFabricType;
  fabricDetail?: string; // e.g., "Heavy knit", "Light poplin", "100% Flax"
  warmthLevel: 'light' | 'medium' | 'heavy'; // light (>=20°C), medium (10-20°C), heavy (<10°C)
  isWaterResistant: boolean;
  isWindResistant: boolean;
  isBreathable: boolean;
  color?: string;
  notes?: string;
  createdAt: number;
}

export interface ClosetItemEvaluation {
  item: UserClothingItem;
  fitScore: number; // 0 to 100
  fitVerdict: 'Optimal Fit' | 'Great Fit' | 'Fair Fit' | 'Too Cold' | 'Too Warm' | 'Avoid (Rain/Wind)';
  fitReason: string;
}

export interface ClosetCategoryFit {
  category: 'Outerwear' | 'Top' | 'Bottom' | 'Footwear' | 'Accessory';
  selectedItem: UserClothingItem | null;
  fitScore: number;
  fitVerdict: string;
  whyBestFit: string;
  alternatives: ClosetItemEvaluation[];
}

export interface ClosetOutfitMatch {
  overallScore: number; // 0 to 100
  headline: string;
  summary: string;
  categories: ClosetCategoryFit[];
  wardrobeGaps: string[];
  totalUserItems: number;
}

export interface FabricItem {
  id: string;
  name: string;
  frenchName: string;
  fiberType: 'Cotton & Plant' | 'Wool & Animal' | 'Linen (Flax)' | 'Leather & Technical';
  typicalGsm: string;
  thermalInsulation: number; // 1 to 10
  breathability: number; // 1 to 10
  moistureManagement: number; // 1 to 10
  rainResistance: number; // 1 to 10
  windResistance: number; // 1 to 10
  minTempC: number;
  maxTempC: number;
  drapeAndFeel: string;
  whyWearInParis: string;
  avoidWhen: string;
  careTip: string;
  typicalGarments: string[];
}

export interface GarmentRecommendation {
  category: 'Outerwear' | 'Top' | 'Bottom' | 'Footwear' | 'Accessory';
  garmentName: string;
  frenchGarmentName: string;
  primaryFabric: string;
  fabricWeightGsm: string;
  fabricProperties: string[];
  whyThisFabric: string;
  stylingTip: string;
  iconType: string;
}

export interface OutfitRecommendation {
  headline: string;
  frenchHeadline: string;
  summary: string;
  overallComfortScore: number;
  temperatureTier: string;
  layeringStrategy: string;
  items: GarmentRecommendation[];
  fabricsToAvoid: Array<{
    fabric: string;
    reason: string;
  }>;
  parisianTouch: string;
  dayToNightAdvice: string;
  isCustomAi?: boolean;
}

