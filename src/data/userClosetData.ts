import { 
  UserClothingItem, 
  ClosetOutfitMatch, 
  ClosetCategoryFit, 
  ClosetItemEvaluation,
  WeatherConditionKey,
  OccasionType,
  SimpleFabricType
} from '../types';

export const DEFAULT_USER_CLOSET: UserClothingItem[] = [
  {
    id: 'item-1',
    name: 'Classic White Cotton T-Shirt',
    category: 'Top',
    fabric: 'Cotton',
    fabricDetail: '100% Combed Cotton (Lightweight)',
    warmthLevel: 'light',
    isWaterResistant: false,
    isWindResistant: false,
    isBreathable: true,
    color: 'White',
    notes: 'Breathable everyday staple for layering or warm days',
    createdAt: 1
  },
  {
    id: 'item-2',
    name: 'Striped Cotton Breton Shirt',
    category: 'Top',
    fabric: 'Cotton',
    fabricDetail: 'Heavyweight Knitted Cotton',
    warmthLevel: 'medium',
    isWaterResistant: false,
    isWindResistant: true,
    isBreathable: true,
    color: 'Navy & White',
    notes: 'Timeless French striped marinière',
    createdAt: 2
  },
  {
    id: 'item-3',
    name: 'Pure Flax Linen Shirt',
    category: 'Top',
    fabric: 'Linen',
    fabricDetail: '100% Breathable European Linen',
    warmthLevel: 'light',
    isWaterResistant: false,
    isWindResistant: false,
    isBreathable: true,
    color: 'Light Sky Blue',
    notes: 'Maximum cooling and airflow in hot sunshine',
    createdAt: 3
  },
  {
    id: 'item-4',
    name: 'Crewneck Wool Knit Sweater',
    category: 'Top',
    fabric: 'Wool',
    fabricDetail: '100% Wool (Medium Knit)',
    warmthLevel: 'medium',
    isWaterResistant: false,
    isWindResistant: true,
    isBreathable: true,
    color: 'Charcoal Grey',
    notes: 'Natural temperature regulator for cool spring and autumn',
    createdAt: 4
  },
  {
    id: 'item-5',
    name: 'Chunky Ribbed Wool Turtleneck',
    category: 'Top',
    fabric: 'Wool',
    fabricDetail: 'Heavy Wool Knit',
    warmthLevel: 'heavy',
    isWaterResistant: false,
    isWindResistant: true,
    isBreathable: true,
    color: 'Ecru Cream',
    notes: 'Deep thermal insulation for chilly winter walks',
    createdAt: 5
  },
  {
    id: 'item-6',
    name: 'Cotton Gabardine Trench Coat',
    category: 'Outerwear',
    fabric: 'Cotton',
    fabricDetail: 'Dense Water-Repellent Cotton Twill',
    warmthLevel: 'medium',
    isWaterResistant: true,
    isWindResistant: true,
    isBreathable: true,
    color: 'Classic Beige / Honey',
    notes: 'The ultimate Paris rain and wind shield for mild weather',
    createdAt: 6
  },
  {
    id: 'item-7',
    name: 'Tailored Wool Overcoat',
    category: 'Outerwear',
    fabric: 'Wool',
    fabricDetail: 'Dense Wool (Heavyweight)',
    warmthLevel: 'heavy',
    isWaterResistant: false,
    isWindResistant: true,
    isBreathable: true,
    color: 'Navy Blue',
    notes: 'Structured windproof coat for cool and frosty days',
    createdAt: 7
  },
  {
    id: 'item-8',
    name: 'Light Linen Overshirt',
    category: 'Outerwear',
    fabric: 'Linen',
    fabricDetail: 'Unlined 100% Linen',
    warmthLevel: 'light',
    isWaterResistant: false,
    isWindResistant: false,
    isBreathable: true,
    color: 'Olive Green',
    notes: 'Light layer for summer evenings on café terraces',
    createdAt: 8
  },
  {
    id: 'item-9',
    name: 'Classic Straight Denim Jeans',
    category: 'Bottom',
    fabric: 'Denim',
    fabricDetail: '100% Cotton Denim',
    warmthLevel: 'medium',
    isWaterResistant: false,
    isWindResistant: true,
    isBreathable: true,
    color: 'Dark Indigo',
    notes: 'Durable and versatile for everyday walking',
    createdAt: 9
  },
  {
    id: 'item-10',
    name: 'Pleated Linen Trousers',
    category: 'Bottom',
    fabric: 'Linen',
    fabricDetail: '100% Pure Woven Linen',
    warmthLevel: 'light',
    isWaterResistant: false,
    isWindResistant: false,
    isBreathable: true,
    color: 'Sand / Oatmeal',
    notes: 'Air circulation around legs on warm days',
    createdAt: 10
  },
  {
    id: 'item-11',
    name: 'Tailored Wool Flannel Pants',
    category: 'Bottom',
    fabric: 'Wool',
    fabricDetail: 'Brushed Wool Flannel',
    warmthLevel: 'heavy',
    isWaterResistant: false,
    isWindResistant: true,
    isBreathable: true,
    color: 'Medium Grey',
    notes: 'Traps body warmth against cold pavements',
    createdAt: 11
  },
  {
    id: 'item-12',
    name: 'Comfortable Cotton Chino Pants',
    category: 'Bottom',
    fabric: 'Cotton',
    fabricDetail: 'Mid-weight Cotton Twill',
    warmthLevel: 'medium',
    isWaterResistant: false,
    isWindResistant: false,
    isBreathable: true,
    color: 'British Khaki',
    notes: 'Balanced comfort for mild spring & autumn days',
    createdAt: 12
  },
  {
    id: 'item-13',
    name: 'Waterproof Leather Chelsea Boots',
    category: 'Footwear',
    fabric: 'Leather',
    fabricDetail: 'Treated Calfskin Leather with Rubber Grip Sole',
    warmthLevel: 'medium',
    isWaterResistant: true,
    isWindResistant: true,
    isBreathable: true,
    color: 'Dark Brown',
    notes: 'Keeps feet dry on wet cobblestones and damp sidewalks',
    createdAt: 13
  },
  {
    id: 'item-14',
    name: 'Low-Top Canvas Cotton Sneakers',
    category: 'Footwear',
    fabric: 'Cotton',
    fabricDetail: 'Organic Cotton Canvas & Rubber Sole',
    warmthLevel: 'light',
    isWaterResistant: false,
    isWindResistant: false,
    isBreathable: true,
    color: 'Off-White',
    notes: 'Lightweight and airy for dry sunny strolling',
    createdAt: 14
  },
  {
    id: 'item-15',
    name: 'Soft Wool Scarf',
    category: 'Accessory',
    fabric: 'Wool',
    fabricDetail: '100% Soft Lambswool',
    warmthLevel: 'heavy',
    isWaterResistant: false,
    isWindResistant: true,
    isBreathable: true,
    color: 'Camel Tan',
    notes: 'Essential neck draft seal for chilly river breezes',
    createdAt: 15
  },
  {
    id: 'item-16',
    name: 'Printed Silk Foulard',
    category: 'Accessory',
    fabric: 'Silk',
    fabricDetail: '100% Lightweight Silk',
    warmthLevel: 'light',
    isWaterResistant: false,
    isWindResistant: false,
    isBreathable: true,
    color: 'Navy & Gold Pattern',
    notes: 'Light neck sun and breeze cover with Parisian elegance',
    createdAt: 16
  }
];

const LOCAL_STORAGE_KEY = 'paris_weather_wardrobe_user_closet';

export function loadUserCloset(): UserClothingItem[] {
  if (typeof window === 'undefined') return DEFAULT_USER_CLOSET;
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading user closet from localStorage', e);
  }
  return DEFAULT_USER_CLOSET;
}

export function saveUserCloset(items: UserClothingItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Error saving user closet to localStorage', e);
  }
}

// Evaluate an individual clothing item against current Paris meteorological condition & occasion
export function evaluateItemFit(
  item: UserClothingItem,
  tempC: number,
  isRainy: boolean,
  isWindy: boolean,
  humidity: number = 60,
  occasion: OccasionType = 'flaneur'
): ClosetItemEvaluation {
  let score = 70; // baseline
  let reasons: string[] = [];
  let verdict: ClosetItemEvaluation['fitVerdict'] = 'Great Fit';

  // 1. Temperature vs Warmth Level matching
  if (tempC >= 23) {
    // Warm / Summer
    if (item.warmthLevel === 'light') {
      score += 20;
      reasons.push(`Lightweight construction prevents overheating in ${tempC}°C weather.`);
    } else if (item.warmthLevel === 'medium') {
      score -= 10;
      reasons.push(`Medium weight may feel slightly warm at ${tempC}°C.`);
    } else {
      score -= 40;
      reasons.push(`Heavy weight is much too warm for ${tempC}°C.`);
      verdict = 'Too Warm';
    }

    // Fabric bonus for warm weather
    if (item.fabric === 'Linen') {
      score += 10;
      reasons.push('Linen flax fibers provide maximum airflow and cooling.');
    } else if (item.fabric === 'Cotton' && item.isBreathable) {
      score += 5;
      reasons.push('Breathable cotton absorbs moisture comfortably.');
    } else if (item.fabric === 'Wool' && item.warmthLevel !== 'light') {
      score -= 15;
    }
  } else if (tempC >= 15 && tempC < 23) {
    // Mild Spring / Autumn
    if (item.warmthLevel === 'medium') {
      score += 20;
      reasons.push(`Balanced medium weight is ideal for mild ${tempC}°C Parisian air.`);
    } else if (item.warmthLevel === 'light') {
      score += 5;
      reasons.push(`Can work well as a base layer in ${tempC}°C.`);
    } else {
      score -= 15;
      reasons.push(`Heavy weight might feel overly warm unless sitting still.`);
    }

    if (item.fabric === 'Cotton' || item.fabric === 'Denim') {
      score += 5;
      reasons.push(`${item.fabric} offers dependable everyday comfort at ${tempC}°C.`);
    } else if (item.fabric === 'Wool' && item.warmthLevel === 'medium') {
      score += 8;
      reasons.push('Wool regulates body temperature effortlessly during transitional weather.');
    }
  } else if (tempC >= 7 && tempC < 15) {
    // Crisp / Cool
    if (item.warmthLevel === 'medium' || item.warmthLevel === 'heavy') {
      score += 20;
      reasons.push(`Provides the necessary thermal mass for crisp ${tempC}°C air.`);
    } else {
      score -= 30;
      reasons.push(`Lightweight material will leave you cold in ${tempC}°C temperatures.`);
      verdict = 'Too Cold';
    }

    if (item.fabric === 'Wool') {
      score += 10;
      reasons.push('Wool fibers trap warm air next to the body while stopping cool drafts.');
    } else if (item.fabric === 'Fleece') {
      score += 8;
      reasons.push('Fleece retains body warmth well.');
    } else if (item.fabric === 'Linen') {
      score -= 25;
      reasons.push('Linen breathes too open and allows cool winds directly to your skin.');
      verdict = 'Too Cold';
    }
  } else {
    // Freezing / Winter (< 7°C)
    if (item.warmthLevel === 'heavy') {
      score += 25;
      reasons.push(`Heavy insulating layer essential for frosty ${tempC}°C winter weather.`);
    } else if (item.warmthLevel === 'medium') {
      score -= 5;
      reasons.push(`Medium weight requires extra warm layers underneath.`);
    } else {
      score -= 50;
      reasons.push(`Much too light for near-freezing ${tempC}°C winter.`);
      verdict = 'Too Cold';
    }

    if (item.fabric === 'Wool') {
      score += 12;
      reasons.push('Dense wool is the gold standard for cold weather insulation.');
    } else if (item.fabric === 'Leather' && item.isWindResistant) {
      score += 8;
      reasons.push('Leather acts as a strong wind barrier.');
    } else if (item.fabric === 'Linen') {
      score -= 35;
      reasons.push('Linen offers zero cold protection.');
      verdict = 'Too Cold';
    }
  }

  // 2. Rain condition adjustments
  if (isRainy) {
    if (item.isWaterResistant) {
      score += 20;
      reasons.push('Water-resistant finish keeps you dry in Parisian rain.');
    } else if (item.category === 'Outerwear' || item.category === 'Footwear') {
      if (item.fabric === 'Linen' || (item.fabric === 'Cotton' && !item.isWaterResistant && item.category === 'Footwear')) {
        score -= 25;
        reasons.push('Non-waterproof fabric will absorb rainwater quickly.');
        verdict = 'Avoid (Rain/Wind)';
      } else {
        score -= 10;
        reasons.push('Recommend carrying an umbrella as this item is not water-resistant.');
      }
    }
  }

  // 3. Wind condition adjustments
  if (isWindy) {
    if (item.isWindResistant || item.fabric === 'Wool' || item.fabric === 'Leather' || item.fabric === 'Denim') {
      score += 8;
      reasons.push(`Tight ${item.fabric} weave shields against gusty winds.`);
    } else if (item.fabric === 'Linen') {
      score -= 10;
      reasons.push('Loose weave lets strong wind blow right through.');
    }
  }

  // 4. Occasion adjustments (both preset & custom user-entered occasions)
  const occLower = (occasion || '').toLowerCase().trim();

  const isEveningFormal = 
    occLower === 'chic_evening' || 
    occLower.includes('dinner') || 
    occLower.includes('bistro') || 
    occLower.includes('date') || 
    occLower.includes('opera') || 
    occLower.includes('cocktail') || 
    occLower.includes('party') || 
    occLower.includes('formal') || 
    occLower.includes('gala');

  const isMuseumOrCulture = 
    occLower === 'museum_walk' || 
    occLower.includes('museum') || 
    occLower.includes('musée') || 
    occLower.includes('louvre') || 
    occLower.includes('gallery') || 
    occLower.includes('exhibition') || 
    occLower.includes('indoor');

  const isWalkingOrActive = 
    occLower === 'flaneur' || 
    occLower.includes('walk') || 
    occLower.includes('stroll') || 
    occLower.includes('flâneur') || 
    occLower.includes('bike') || 
    occLower.includes('sightsee') || 
    occLower.includes('tour') || 
    occLower.includes('steps');

  const isBusinessSmart = 
    occLower === 'business_smart' || 
    occLower.includes('business') || 
    occLower.includes('work') || 
    occLower.includes('meeting') || 
    occLower.includes('office') || 
    occLower.includes('conference');

  if (isEveningFormal || isBusinessSmart) {
    // Tailored wool, leather shoes, trench, silk foulard, collared shirts
    const isTailoredOrRefined = 
      item.name.toLowerCase().includes('tailored') || 
      item.name.toLowerCase().includes('trench') || 
      item.name.toLowerCase().includes('chelsea') || 
      item.name.toLowerCase().includes('foulard') || 
      item.name.toLowerCase().includes('flannel') ||
      item.name.toLowerCase().includes('oxford') ||
      item.name.toLowerCase().includes('merino') ||
      item.fabric === 'Silk' ||
      (item.fabric === 'Leather' && item.category === 'Footwear');

    const isInformal = 
      item.name.toLowerCase().includes('t-shirt') || 
      item.name.toLowerCase().includes('canvas') || 
      item.name.toLowerCase().includes('hoodie') ||
      (item.fabric === 'Cotton' && item.category === 'Footwear');

    if (isTailoredOrRefined) {
      score += 15;
      reasons.unshift(`Ideal polished style for "${occasion || 'formal event'}".`);
    } else if (isInformal) {
      score -= 18;
      reasons.push(`More casual than typical etiquette for "${occasion || 'evening/formal event'}".`);
    }
  } else if (isMuseumOrCulture) {
    // Museum & gallery: cushioned walking footwear, unbuttonable/removable layers
    const isMuseumFriendly = 
      item.name.toLowerCase().includes('chino') || 
      item.name.toLowerCase().includes('breton') || 
      item.name.toLowerCase().includes('sneaker') ||
      item.name.toLowerCase().includes('trench') ||
      item.name.toLowerCase().includes('cardigan') ||
      (item.category === 'Top' && item.isBreathable);

    if (isMuseumFriendly) {
      score += 12;
      reasons.unshift(`Versatile comfort & layering for "${occasion || 'museum visit'}".`);
    }
  } else if (isWalkingOrActive) {
    // Relaxed walking comfort and classic street style
    const isWalkFriendly = 
      item.name.toLowerCase().includes('breton') || 
      item.name.toLowerCase().includes('denim') || 
      item.name.toLowerCase().includes('sneaker') ||
      item.name.toLowerCase().includes('chino') ||
      item.name.toLowerCase().includes('linen');

    if (isWalkFriendly) {
      score += 10;
      reasons.unshift(`Effortless walking mobility for "${occasion || 'strolling Paris'}".`);
    }
  } else if (occasion && occasion.trim().length > 0) {
    // Generic custom occasion boost for items with good breathable natural fibers
    if (item.fabric === 'Wool' || item.fabric === 'Cotton' || item.fabric === 'Linen') {
      score += 5;
      reasons.unshift(`Versatile natural fiber fit for "${occasion}".`);
    }
  }

  // Clamp score
  const finalScore = Math.max(10, Math.min(99, score));

  // Determine final verdict if not already overridden
  if (verdict !== 'Too Cold' && verdict !== 'Too Warm' && verdict !== 'Avoid (Rain/Wind)') {
    if (finalScore >= 88) verdict = 'Optimal Fit';
    else if (finalScore >= 75) verdict = 'Great Fit';
    else verdict = 'Fair Fit';
  }

  return {
    item,
    fitScore: finalScore,
    fitVerdict: verdict,
    fitReason: reasons.slice(0, 2).join(' ') || `${item.fabric} item suited for current weather.`
  };
}

// Evaluate entire closet to assemble the Best Fit Outfit from user items
export function evaluateUserCloset(
  closet: UserClothingItem[],
  tempC: number,
  conditionKey: WeatherConditionKey,
  windSpeedKmH: number,
  humidity: number = 60,
  occasion: OccasionType = 'flaneur'
): ClosetOutfitMatch {
  const isRainy = conditionKey.includes('rain') || conditionKey.includes('drizzle') || conditionKey === 'thunderstorm';
  const isWindy = windSpeedKmH > 20 || conditionKey === 'windy';

  const categories: Array<'Outerwear' | 'Top' | 'Bottom' | 'Footwear' | 'Accessory'> = [
    'Outerwear',
    'Top',
    'Bottom',
    'Footwear',
    'Accessory'
  ];

  const categoryFits: ClosetCategoryFit[] = [];
  const wardrobeGaps: string[] = [];

  let totalScoreSum = 0;
  let categoryCount = 0;

  for (const cat of categories) {
    const itemsInCat = closet.filter((it) => it.category === cat);

    if (itemsInCat.length === 0) {
      wardrobeGaps.push(`No ${cat.toLowerCase()} in your closet. Add one to complete your outfit.`);
      categoryFits.push({
        category: cat,
        selectedItem: null,
        fitScore: 0,
        fitVerdict: 'Missing in Closet',
        whyBestFit: `You have not added any ${cat.toLowerCase()} items yet. Enter your own clothing items to get a tailored selection.`,
        alternatives: []
      });
      continue;
    }

    // Evaluate each item with occasion
    const evaluated = itemsInCat.map((item) => evaluateItemFit(item, tempC, isRainy, isWindy, humidity, occasion));
    
    // Sort highest score first
    evaluated.sort((a, b) => b.fitScore - a.fitScore);

    const best = evaluated[0];
    const alts = evaluated.slice(1);

    // Build specific "Why this is your best fit" comparative explanation
    let whyBestFit = '';
    
    if (occasion === 'chic_evening' && (best.item.name.toLowerCase().includes('tailored') || best.item.name.toLowerCase().includes('chelsea') || best.item.fabric === 'Silk')) {
      whyBestFit = `Selected your "${best.item.name}" (${best.item.fabric}) for Soirée & Bistro elegance. Its refined tailoring meets Parisian evening standards while keeping you comfortable at ${tempC}°C.`;
    } else if (occasion === 'museum_walk' && (best.item.name.toLowerCase().includes('sneaker') || best.item.name.toLowerCase().includes('chino') || best.item.name.toLowerCase().includes('breton'))) {
      whyBestFit = `Selected your "${best.item.name}" (${best.item.fabric}) for Museum & Culture. Offers superior comfort for hours of standing and easy adaptability between outdoor air and indoor galleries.`;
    } else if (best.item.fabric === 'Wool') {
      if (tempC < 16) {
        whyBestFit = `Selected your "${best.item.name}" (${best.item.fabric}) because at ${tempC}°C, wool provides natural thermal insulation and traps warmth without causing overheating.`;
        if (alts.length > 0) {
          const second = alts[0];
          whyBestFit += ` Outperformed your "${second.item.name}" (${second.item.fabric}) which is less insulating.`;
        }
      } else {
        whyBestFit = `Your "${best.item.name}" (${best.item.fabric}) provides breathable warmth for the current ${tempC}°C temperature.`;
      }
    } else if (best.item.fabric === 'Linen') {
      whyBestFit = `Selected your "${best.item.name}" (${best.item.fabric}) because linen allows maximum air circulation and cooling in ${tempC}°C weather.`;
      if (alts.length > 0) {
        const second = alts[0];
        whyBestFit += ` Outperformed heavier items like your "${second.item.name}".`;
      }
    } else if (best.item.fabric === 'Cotton' || best.item.fabric === 'Denim') {
      whyBestFit = `Selected your "${best.item.name}" (${best.item.fabric}) for balanced, reliable comfort and breathability at ${tempC}°C.`;
      if (isRainy && best.item.isWaterResistant) {
        whyBestFit += ' Its water-resistant finish is crucial for today\'s rain.';
      }
    } else if (best.item.fabric === 'Leather') {
      whyBestFit = `Selected your "${best.item.name}" (${best.item.fabric}) because durable leather shields against wind and damp pavements while keeping feet comfortable.`;
    } else {
      whyBestFit = `Selected your "${best.item.name}" as the highest scoring match (${best.fitScore}%) for ${tempC}°C ${isRainy ? 'and rainy ' : ''}Parisian weather.`;
    }

    totalScoreSum += best.fitScore;
    categoryCount++;

    categoryFits.push({
      category: cat,
      selectedItem: best.item,
      fitScore: best.fitScore,
      fitVerdict: best.fitVerdict,
      whyBestFit,
      alternatives: alts
    });
  }

  // Check specific weather gap warnings
  if (isRainy) {
    const hasRainOuter = closet.some((i) => i.category === 'Outerwear' && i.isWaterResistant);
    const hasRainShoes = closet.some((i) => i.category === 'Footwear' && i.isWaterResistant);
    if (!hasRainOuter) {
      wardrobeGaps.push('Rain Alert: You do not have water-resistant outerwear in your closet. Consider adding a Cotton Gabardine Trench or rain jacket.');
    }
    if (!hasRainShoes) {
      wardrobeGaps.push('Wet Pavements: None of your shoes are marked water-resistant. Watch out for puddles on cobblestones.');
    }
  }

  if (tempC < 10) {
    const hasHeavyWool = closet.some((i) => i.fabric === 'Wool' && i.warmthLevel === 'heavy');
    if (!hasHeavyWool) {
      wardrobeGaps.push(`Cold Weather Alert: At ${tempC}°C, you might benefit from adding a heavy wool coat or thick wool knit sweater to your wardrobe.`);
    }
  }

  const overallScore = categoryCount > 0 ? Math.round(totalScoreSum / categoryCount) : 0;

  const occasionLabel = 
    occasion === 'chic_evening' ? 'Soirée & Bistro' :
    occasion === 'museum_walk' ? 'Musée & Culture' :
    occasion === 'flaneur' ? 'Flâneur & Stroll' :
    occasion === 'business_smart' ? 'Tailored Smart' :
    occasion === 'seine_picnic' ? 'Seine Picnic' :
    (occasion || 'Paris Stroll');

  let headline = `Best Fit for ${occasionLabel} (${overallScore}% Match)`;
  if (overallScore >= 90) {
    headline = `Perfect ${occasionLabel} Closet Match (${overallScore}%)`;
  } else if (overallScore >= 75) {
    headline = `Great ${occasionLabel} Outfit Fit (${overallScore}%)`;
  }

  const summary = `Based on your current Paris weather of ${tempC}°C (${isRainy ? 'Rainy' : 'Dry'}, Wind: ${windSpeedKmH} km/h) for ${occasionLabel}, the engine evaluated all ${closet.length} items in your personal wardrobe and selected the optimal ensemble for temperature balance, dress etiquette, and fabric comfort.`;

  return {
    overallScore,
    headline,
    summary,
    categories: categoryFits,
    wardrobeGaps,
    totalUserItems: closet.length
  };
}
