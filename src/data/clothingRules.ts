import { OutfitRecommendation, GarmentRecommendation, WeatherConditionKey, OccasionType } from '../types';

export interface WeatherClassification {
  tempTier: 'heatwave' | 'warm_summer' | 'mild_spring' | 'crisp_autumn' | 'chilly_winter' | 'freezing_winter';
  tierLabel: string;
  frenchTierLabel: string;
  isRainy: boolean;
  isWindy: boolean;
}

export function classifyParisWeather(
  temperatureC: number,
  conditionKey: WeatherConditionKey,
  windSpeedKmH: number
): WeatherClassification {
  const isRainy = conditionKey.includes('rain') || conditionKey.includes('drizzle') || conditionKey === 'thunderstorm';
  const isWindy = windSpeedKmH > 20 || conditionKey === 'windy';

  let tempTier: WeatherClassification['tempTier'] = 'mild_spring';
  let tierLabel = 'Mild Parisian Weather';
  let frenchTierLabel = 'Douceur Parisienne';

  if (temperatureC >= 28) {
    tempTier = 'heatwave';
    tierLabel = 'Summer Heatwave (Canicule)';
    frenchTierLabel = 'Canicule et Forte Chaleur';
  } else if (temperatureC >= 21) {
    tempTier = 'warm_summer';
    tierLabel = 'Warm & Sunny Summer';
    frenchTierLabel = 'Belle Journée Estivale';
  } else if (temperatureC >= 15) {
    tempTier = 'mild_spring';
    tierLabel = 'Mild Spring & Autumn';
    frenchTierLabel = 'Mi-Saison Tempérée';
  } else if (temperatureC >= 8) {
    tempTier = 'crisp_autumn';
    tierLabel = 'Crisp & Cool Weather';
    frenchTierLabel = 'Fraîcheur d\'Automne';
  } else if (temperatureC >= 2) {
    tempTier = 'chilly_winter';
    tierLabel = 'Chilly Winter';
    frenchTierLabel = 'Hiver Parisien Froid';
  } else {
    tempTier = 'freezing_winter';
    tierLabel = 'Freezing Cold & Frost';
    frenchTierLabel = 'Grand Froid & Gel';
  }

  return { tempTier, tierLabel, frenchTierLabel, isRainy, isWindy };
}

export function generateParisOutfit(
  temperatureC: number,
  conditionKey: WeatherConditionKey,
  windSpeedKmH: number,
  humidity: number = 60,
  occasion: OccasionType = 'flaneur'
): OutfitRecommendation {
  const classification = classifyParisWeather(temperatureC, conditionKey, windSpeedKmH);
  const { tempTier, isRainy, isWindy } = classification;

  let headline = '';
  let frenchHeadline = '';
  let summary = '';
  let layeringStrategy = '';
  let items: GarmentRecommendation[] = [];
  let fabricsToAvoid: Array<{ fabric: string; reason: string }> = [];
  let parisianTouch = '';
  let dayToNightAdvice = '';

  // 1. HEATWAVE (>= 28°C)
  if (tempTier === 'heatwave') {
    if (occasion === 'chic_evening') {
      headline = 'Evening Bistro: Crisp Linen-Cotton & Tailored Trousers';
      frenchHeadline = 'Soirée d\'Été: Chemise en Lin & Pantalon Fluide';
      summary = `At ${temperatureC}°C for an evening dinner or bistro, Parisian dress codes favour breathable elegance over casual shorts. Pure crisp linen button-downs, light tailored linen/cotton trousers, and leather loafers keep you sophisticated and cool.`;
      layeringStrategy = 'Single breathable tailored layer. Choose structured linen or lightweight cotton poplin with neat button closures.';
      
      items = [
        {
          category: 'Outerwear',
          garmentName: 'Lightweight Unstructured Linen Blazer',
          frenchGarmentName: 'Veste d\'Été Déstructurée en Lin',
          primaryFabric: '100% Pure Linen',
          fabricWeightGsm: '180 GSM (Featherweight)',
          fabricProperties: ['Maximum Airflow', 'Relaxed Tailoring', 'Quick Heat Release'],
          whyThisFabric: 'Unlined flax linen adds polished evening shape without trapping warmth on restaurant terraces.',
          stylingTip: 'Sleeves pushed up slightly, worn over a lightweight collared shirt.',
          iconType: 'coat'
        },
        {
          category: 'Top',
          garmentName: 'Crisp Button-Down Linen or Fine Cotton Shirt',
          frenchGarmentName: 'Chemise en Lin Habillée',
          primaryFabric: '100% Flax Linen or Cotton Voile',
          fabricWeightGsm: '140 - 160 GSM',
          fabricProperties: ['Absorbs Moisture', 'Crisp Collar', 'Non-Clingy Drape'],
          whyThisFabric: 'Linen fibers keep cool air circulating against the chest during warm evening dinners.',
          stylingTip: 'Top two buttons open, collar pressed neatly for Parisian bistro chic.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Tailored Linen-Cotton Pleated Trousers',
          frenchGarmentName: 'Pantalon Habillé en Lin & Coton',
          primaryFabric: '100% Linen or Light Cotton',
          fabricWeightGsm: '190 - 220 GSM',
          fabricProperties: ['Elegant Drape', 'Leg Air Circulation', 'Tailored Cut'],
          whyThisFabric: 'Long trousers are expected at refined Parisian dinner spots; loose-woven linen prevents overheating.',
          stylingTip: 'Tailored with a slight taper resting gracefully above loafers.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'Unlined Leather Penny Loafers',
          frenchGarmentName: 'Mocassins Souples en Cuir',
          primaryFabric: 'Supple Leather & Leather Sole',
          fabricWeightGsm: 'Lightweight Leather',
          fabricProperties: ['Breathable Leather', 'Evening Elegance', 'Flexible Sole'],
          whyThisFabric: 'Fine unlined leather breathes naturally and elevates evening attire above casual sneakers.',
          stylingTip: 'Worn with invisible no-show cotton socks.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Silk Pocket Square & Slim Leather Belt',
          frenchGarmentName: 'Pochette en Soie & Ceinture Fine en Cuir',
          primaryFabric: '100% Silk & Leather',
          fabricWeightGsm: 'Lightweight',
          fabricProperties: ['Polished Accent', 'Zero Added Bulk'],
          whyThisFabric: 'Silk adds refined color accent without adding thermal weight.',
          stylingTip: 'A minimalist watch and discreet leather belt.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Denim Shorts & Graphic Tees', reason: 'Too casual for Parisian evening dining and bistro reservations.' },
        { fabric: 'Polyester & Synthetics', reason: 'Causes intense sweating and odors under terrace heating or summer humidity.' }
      ];

      parisianTouch = 'Monochromatic summer tones (navy, ivory, olive) with polished leather loafers.';
      dayToNightAdvice = 'As terrace breezes pick up after 10 PM, slip on your unstructured linen blazer.';

    } else if (occasion === 'museum_walk') {
      headline = 'Museum & Galleries: Breathable Cotton & Gallery Walkers';
      frenchHeadline = 'Visite Musée: Coton Respirant & Marche Confortable';
      summary = `At ${temperatureC}°C, navigating large museum spaces like the Louvre or Orsay requires high breathability and supreme walking support across miles of hardwood and marble corridors.`;
      layeringStrategy = 'Packable Layering: Light breathable cotton polo/tee with a compact linen overshirt in a tote bag to adjust between sunny outdoor courtyards and air-conditioned exhibition halls.';

      items = [
        {
          category: 'Outerwear',
          garmentName: 'Packable Linen Overshirt (for AC Galleries)',
          frenchGarmentName: 'Surchemise Légère en Lin',
          primaryFabric: '100% Pure Linen',
          fabricWeightGsm: '160 GSM',
          fabricProperties: ['Lightweight AC Shield', 'Easy to Pack in Tote', 'Breathable'],
          whyThisFabric: 'Museum halls can feel chilly after walking in the sun; linen provides light coverage without bulk.',
          stylingTip: 'Roll up into your tote bag when exploring sunny sculpture gardens.',
          iconType: 'shirt'
        },
        {
          category: 'Top',
          garmentName: 'Breathable Knitted Cotton Polo or Soft Linen Tee',
          frenchGarmentName: 'Polo en Tricot de Coton Respirant',
          primaryFabric: '100% Combed Cotton / Linen',
          fabricWeightGsm: '150 GSM',
          fabricProperties: ['Soft Skin Contact', 'Natural Moisture Wicking', 'Gallery Appropriate'],
          whyThisFabric: 'Knitted cotton maintains sharp collar structure while keeping you cool during 3+ hours of standing.',
          stylingTip: 'Tucked neatly into cotton chinos with comfortable stretch.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Lightweight Cotton Stretch Chinos',
          frenchGarmentName: 'Pantalon Chino Léger en Coton',
          primaryFabric: '100% Cotton with Natural Stretch',
          fabricWeightGsm: '200 GSM',
          fabricProperties: ['Walking Flexibility', 'Breathable Weave', 'Respectful Gallery Attire'],
          whyThisFabric: 'Cotton twill breathes easily while offering knee mobility for gallery viewing and museum benches.',
          stylingTip: 'Cuffed cleanly at the ankle for good shoe clearance.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'Cushioned Leather Walking Sneakers',
          frenchGarmentName: 'Baskets en Cuir à Semelle Ergonomique',
          primaryFabric: 'Genuine Leather with EVA / Rubber Cushioning',
          fabricWeightGsm: 'Supportive Leather',
          fabricProperties: ['Arch Support', 'Shock Absorption on Marble', 'Breathable Lining'],
          whyThisFabric: 'Hard marble museum floors cause foot fatigue; cushioned leather sneakers prevent sore feet.',
          stylingTip: 'Clean minimalist white leather sneakers look chic and respectful in cultural venues.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Canvas Crossbody Bag & Hydration Bottle',
          frenchGarmentName: 'Sac Bandoulière en Toile de Coton',
          primaryFabric: 'Cotton Canvas',
          fabricWeightGsm: 'Durable Canvas',
          fabricProperties: ['Hands-Free Convenience', 'Secure Zipper for Metro'],
          whyThisFabric: 'Cotton canvas is lightweight and keeps your hands free for audio guides and photos.',
          stylingTip: 'Worn across the chest with zipper facing forward for metro safety.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Stiff Unbroken Shoes & High Heels', reason: 'Marble museum floors will cause severe foot pain within 45 minutes.' },
        { fabric: 'Heavy Synthetics', reason: 'Lacks ventilation during prolonged museum strolls.' }
      ];

      parisianTouch = 'A minimalist canvas exhibition tote bag and sleek tortoiseshell reading glasses.';
      dayToNightAdvice = 'Head straight from the galleries to a shaded courtyard café for a refreshing drink.';

    } else {
      // Flâneur (Everyday Stroll)
      headline = 'Airy Linen & Light Cotton (Flâneur Edition)';
      frenchHeadline = 'Lin Pur & Coton Léger Aérien';
      summary = `At ${temperatureC}°C, strolling through Parisian gardens and side streets is hot. Pure breathable linen and light cotton maximize airflow and evaporation as you walk.`;
      layeringStrategy = 'Single light layer. Carry a lightweight linen overshirt in a canvas tote for shaded rest stops.';
      
      items = [
        {
          category: 'Outerwear',
          garmentName: 'Light Linen Overshirt (Optional for Shade)',
          frenchGarmentName: 'Surchemise en Lin Léger',
          primaryFabric: '100% Linen',
          fabricWeightGsm: '160 GSM',
          fabricProperties: ['Ultra Breathable', 'Quick-Drying', 'Natural Airflow'],
          whyThisFabric: 'Linen flax fibers let breeze pass right through and dry quickly in the Parisian heat.',
          stylingTip: 'Leave unbuttoned or draped casually over shoulders when walking along the Seine.',
          iconType: 'shirt'
        },
        {
          category: 'Top',
          garmentName: 'Breathable Linen Shirt or Light Cotton Tee',
          frenchGarmentName: 'Chemise en Lin ou T-shirt en Coton',
          primaryFabric: '100% Linen or Light Cotton',
          fabricWeightGsm: '140 - 160 GSM',
          fabricProperties: ['Moisture Absorbing', 'Non-Clingy', 'Cool on Skin'],
          whyThisFabric: 'Linen and light cotton do not cling to skin and allow natural body heat to dissipate.',
          stylingTip: 'Relaxed fit with rolled sleeves for casual café terrace comfort.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Relaxed Linen Trousers or Cotton Chinos',
          frenchGarmentName: 'Pantalon en Lin Ample ou Chino Léger',
          primaryFabric: '100% Linen or Light Cotton',
          fabricWeightGsm: '180 - 200 GSM',
          fabricProperties: ['Air Circulation', 'Lightweight Drape', 'Natural Cooling'],
          whyThisFabric: 'Loose-cut linen lets air circulate around your legs during all-day walking.',
          stylingTip: 'Cropped just above the ankle with a simple leather belt.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'Canvas Cotton Sneakers or Leather Sandals',
          frenchGarmentName: 'Baskets en Toile de Coton ou Sandales en Cuir',
          primaryFabric: 'Cotton Canvas & Leather',
          fabricWeightGsm: 'Natural Materials',
          fabricProperties: ['Ventilated Canvas', 'Breathable Footbed'],
          whyThisFabric: 'Cotton canvas allows feet to breathe, preventing blisters during long summer strolls.',
          stylingTip: 'Wear with breathable no-show cotton socks.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Light Straw Hat & UV Sunglasses',
          frenchGarmentName: 'Chapeau en Paille & Lunettes de Soleil',
          primaryFabric: 'Natural Straw / Light Cotton',
          fabricWeightGsm: 'Lightweight',
          fabricProperties: ['Sun Protection', 'Head Ventilation'],
          whyThisFabric: 'Shades your face from the intense Parisian sun without trapping scalp heat.',
          stylingTip: 'Tortoiseshell sunglasses and a simple cotton canvas tote bag.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Polyester & Synthetic Blends', reason: 'Traps heat and sweat, creating uncomfortable dampness.' },
        { fabric: 'Heavy Denim', reason: 'Too thick and stiff in 28°C+ heat; restricts leg ventilation.' }
      ];

      parisianTouch = 'Naturally relaxed linen, sunglasses, and an iced espresso at a shaded sidewalk café.';
      dayToNightAdvice = 'Slip on the linen overshirt as evening settles over the Seine.';
    }
  }

  // 2. WARM SUMMER (21°C - 27°C)
  else if (tempTier === 'warm_summer') {
    if (occasion === 'chic_evening') {
      headline = 'Evening Bistro: Tailored Cotton Blazer & Crisp Oxford';
      frenchHeadline = 'Soirée Parisienne: Veste Coton Tailleur & Oxford';
      summary = `At ${temperatureC}°C for an evening at a wine bar or bistro, a structured cotton blazer over a crisp Oxford button-down with tailored cotton/wool trousers strikes the classic Parisian balance of relaxed elegance.`;
      layeringStrategy = 'Tailored 2-Piece: Fine cotton shirt base + unlined tailored cotton/wool jacket for outdoor tables after sunset.';

      items = [
        {
          category: 'Outerwear',
          garmentName: 'Tailored Cotton Twill Blazer or Navy Jacket',
          frenchGarmentName: 'Veste Tailleur en Coton ou Veste Bleu Marine',
          primaryFabric: '100% Cotton Twill',
          fabricWeightGsm: '240 - 280 GSM',
          fabricProperties: ['Structured Silhouette', 'Breathable Cotton Weave', 'Bistro Ready'],
          whyThisFabric: 'Cotton twill provides crisp jacket structure while staying comfortable in 22°C evening weather.',
          stylingTip: 'Wear unbuttoned over a clean collared shirt; navy or stone beige.',
          iconType: 'coat'
        },
        {
          category: 'Top',
          garmentName: 'Crisp Cotton Oxford Button-Down Shirt',
          frenchGarmentName: 'Chemise Oxford en Coton Classique',
          primaryFabric: '100% Combed Cotton Oxford',
          fabricWeightGsm: '140 - 160 GSM',
          fabricProperties: ['Crisp Collar', 'Breathable Basketweave', 'Polished Hand-Feel'],
          whyThisFabric: 'Oxford cotton cloth breathes easily, absorbs moisture, and holds its collar shape during dinner.',
          stylingTip: 'Neatly tucked into trousers with top button open.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Tailored Wool-Cotton Trousers or Dark Chinos',
          frenchGarmentName: 'Pantalon Tailleur en Coton Épais',
          primaryFabric: '100% Cotton Twill or Tropical Wool',
          fabricWeightGsm: '260 - 300 GSM',
          fabricProperties: ['Sharp Crease', 'Comfortable Stride', 'Refined Texture'],
          whyThisFabric: 'Tailored trousers bring refined evening structure compared to casual distressed jeans.',
          stylingTip: 'Tailored with no break or slight break over polished shoes.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'Polished Leather Derbies or Loafers',
          frenchGarmentName: 'Derbies en Cuir ou Mocassins Élégants',
          primaryFabric: 'Full Grain Leather & Rubber/Leather Sole',
          fabricWeightGsm: 'Leather',
          fabricProperties: ['Polished Luster', 'Comfortable Evening Wear', 'Cobblestone Grip'],
          whyThisFabric: 'Quality leather shoes are the defining hallmark of Parisian evening style.',
          stylingTip: 'Paired with fine dark cotton socks for evening bistros.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Printed Silk Foulard or Leather Belt',
          frenchGarmentName: 'Foulard en Soie Imprimée & Ceinture en Cuir',
          primaryFabric: '100% Silk / Genuine Leather',
          fabricWeightGsm: 'Lightweight',
          fabricProperties: ['Sophisticated Drape', 'Neck Breeze Shield'],
          whyThisFabric: 'Silk adds effortless Parisian refinement and shields against evening breezes.',
          stylingTip: 'Tucked neatly inside the shirt collar or looped loosely.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Athletic Sneakers & Hoodies', reason: 'Considered too informal for Parisian evening dining.' },
        { fabric: 'Heavy Wool Flannels', reason: 'Uncomfortably warm in 21-27°C indoor dining spaces.' }
      ];

      parisianTouch = 'A well-tailored dark navy jacket with a white Oxford shirt and leather derbies.';
      dayToNightAdvice = 'Fasten your jacket button when greeting the maître d\' and relaxing at your table.';

    } else if (occasion === 'museum_walk') {
      headline = 'Museum & Galleries: Cotton Cardigan & Flexible Chinos';
      frenchHeadline = 'Journée Musée: Gilet en Coton & Chino Confort';
      summary = `At ${temperatureC}°C, visiting indoor exhibitions requires layers you can easily unbutton when gallery rooms get warm, paired with reliable footwear for marble floors.`;
      layeringStrategy = 'Adaptive 2-Piece: Breathable cotton Breton or tee + button-up cotton cardigan or overshirt you can open or drape over your shoulders inside galleries.';

      items = [
        {
          category: 'Outerwear',
          garmentName: 'Button-Up Cotton Cardigan or Chore Jacket',
          frenchGarmentName: 'Veste de Travail en Coton ou Gilet Boutonné',
          primaryFabric: '100% Cotton Twill',
          fabricWeightGsm: '220 - 260 GSM',
          fabricProperties: ['Easy Button Control', 'Spacious Pockets', 'Breathable'],
          whyThisFabric: 'Cotton chore jacket offers large pockets for museum tickets and audio guides while remaining breathable.',
          stylingTip: 'Unbutton fully inside warm exhibition rooms.',
          iconType: 'coat'
        },
        {
          category: 'Top',
          garmentName: 'Heavyweight Cotton Breton Sailor Shirt',
          frenchGarmentName: 'Marinière Classique en Coton Épais',
          primaryFabric: '100% Knitted Combed Cotton',
          fabricWeightGsm: '200 - 240 GSM',
          fabricProperties: ['Soft Jersey Knit', 'Draft Resistant', 'Iconic French Style'],
          whyThisFabric: 'Dense knitted cotton prevents chills from AC drafts while feeling soft against skin all day.',
          stylingTip: 'Sleeves pushed up comfortably to the forearm.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Comfortable Cotton Chino Pants',
          frenchGarmentName: 'Pantalon Chino Souple en Coton',
          primaryFabric: '100% Cotton Twill',
          fabricWeightGsm: '260 GSM',
          fabricProperties: ['All-Day Flexibility', 'Breathable', 'Clean Silhouette'],
          whyThisFabric: 'Cotton twill gives effortless movement for climbing museum stairs and long viewing sessions.',
          stylingTip: 'Neat single cuff showing your clean sneakers.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'Cushioned White Leather Walking Sneakers',
          frenchGarmentName: 'Baskets Basses en Cuir Confortables',
          primaryFabric: 'Genuine Leather with Rubber Sole',
          fabricWeightGsm: 'Leather',
          fabricProperties: ['Footbed Cushioning', 'Breathable Leather Upper', 'Hard Surface Support'],
          whyThisFabric: 'Supports your arches through 8,000+ steps across hard gallery floors.',
          stylingTip: 'Keep clean with minimal logos for a smart look.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Cotton Canvas Shoulder Tote Bag',
          frenchGarmentName: 'Sac Cabas en Toile de Coton',
          primaryFabric: '100% Heavy Cotton Canvas',
          fabricWeightGsm: '300 GSM',
          fabricProperties: ['Lightweight Storage', 'Holds Guidebook & Water'],
          whyThisFabric: 'Sturdy cotton canvas carries exhibit pamphlets without straining your shoulders.',
          stylingTip: 'Over one shoulder with your notebook and pencil inside.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Heavy Knits & Fleece', reason: 'Causes intense sweating inside heated indoor museum wings.' },
        { fabric: 'Thin Flat Sandals', reason: 'Lacks the arch support required for hours of standing.' }
      ];

      parisianTouch = 'A classic striped Breton top, relaxed cotton chinos, and comfortable walking shoes.';
      dayToNightAdvice = 'After the museum, drop your canvas tote and stroll into a nearby café for wine and cheese.';

    } else {
      // Flâneur (Everyday Stroll)
      headline = 'Classic Cotton & Breathable Linen (Flâneur Edition)';
      frenchHeadline = 'Coton Confortable & Lin Élégant';
      summary = `At ${temperatureC}°C, Paris offers pleasant weather for walking in the gardens and sitting outdoors. Everyday cotton shirts, cotton chinos, and linen pieces are ideal.`;
      layeringStrategy = 'Two-piece styling. Wear a light cotton base with a cotton overshirt or light jacket handy for shaded streets or breeze.';

      items = [
        {
          category: 'Outerwear',
          garmentName: 'Light Cotton Jacket or Linen Overshirt',
          frenchGarmentName: 'Veste Légère en Coton ou Surchemise en Lin',
          primaryFabric: '100% Cotton or Linen',
          fabricWeightGsm: '200 - 240 GSM',
          fabricProperties: ['Light Wind Protection', 'Easy Layering', 'Breathable'],
          whyThisFabric: 'Cotton twill blocks light river breezes while remaining light enough to carry comfortably.',
          stylingTip: 'Wear open over a clean white cotton tee.',
          iconType: 'coat'
        },
        {
          category: 'Top',
          garmentName: 'Crisp Cotton Button-Down or Breton Cotton Top',
          frenchGarmentName: 'Chemise en Coton ou Marinière Classique',
          primaryFabric: '100% Cotton',
          fabricWeightGsm: '150 - 200 GSM',
          fabricProperties: ['Soft Skin Contact', 'All-Day Breathability', 'Sturdy Weave'],
          whyThisFabric: 'Pure cotton is soft, absorbs moisture reliably, and stays comfortable all day long.',
          stylingTip: 'Half-tucked into trousers with sleeves casually rolled up.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Straight-Leg Denim Jeans or Cotton Chinos',
          frenchGarmentName: 'Jean Droit en Coton Denim ou Pantalon Chino',
          primaryFabric: '100% Cotton / Cotton Denim',
          fabricWeightGsm: '240 - 300 GSM',
          fabricProperties: ['Durable', 'Flexible Walking Comfort', 'Breathable'],
          whyThisFabric: 'Mid-weight cotton and denim offer ideal structure and comfort for walking around Paris.',
          stylingTip: 'Neat single cuff resting right at the top of your shoes.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'White Leather Sneakers or Loafers',
          frenchGarmentName: 'Baskets en Cuir Blanc ou Mocassins',
          primaryFabric: 'Genuine Leather & Rubber Sole',
          fabricWeightGsm: 'Leather',
          fabricProperties: ['Durable Support', 'Breathable Leather Upper', 'Walking Grip'],
          whyThisFabric: 'Real leather breathes naturally and cushions footsteps across historic cobblestones.',
          stylingTip: 'Keep clean with a damp cloth for a sharp Parisian look.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Simple Silk Neck Scarf (Foulard)',
          frenchGarmentName: 'Petit Foulard en Soie',
          primaryFabric: '100% Silk',
          fabricWeightGsm: 'Lightweight',
          fabricProperties: ['Draft Protection', 'Lightweight Chic'],
          whyThisFabric: 'Light silk shields your neck from sudden river breezes without feeling heavy.',
          stylingTip: 'Knotted simply at the side of the collar.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Heavy Fleece & Thick Knits', reason: 'Too warm under afternoon sunshine in 22-26°C weather.' },
        { fabric: 'Synthetic Rubber Outerwear', reason: 'Traps sweat internally when walking.' }
      ];

      parisianTouch = 'Clean neutral palette (white, navy, beige) with a classic leather shoulder bag.';
      dayToNightAdvice = 'Button your cotton shirt and swap casual sneakers for leather shoes for dinner.';
    }
  }

  // 3. MILD SPRING & AUTUMN (15°C - 20°C)
  else if (tempTier === 'mild_spring') {
    if (occasion === 'chic_evening') {
      headline = 'Evening Bistro: Tailored Wool Blazer & Fine Merino Knit';
      frenchHeadline = 'Soirée Bistro: Blazer en Laine & Maille Mérinos';
      summary = `At ${temperatureC}°C, evening temperatures along the Seine drop quickly once the sun sets. A structured wool blazer, fine merino wool knit or crisp Oxford, tailored wool trousers, and polished Chelsea boots provide thermal comfort and elegance.`;
      layeringStrategy = 'Refined 3-Piece: Crisp cotton shirt or fine merino knit + structured wool blazer + optional wool scarf for the walk home.';

      items = [
        {
          category: 'Outerwear',
          garmentName: 'Structured Wool Blazer or Tailored Trench',
          frenchGarmentName: 'Blazer en Laine Peignée ou Trench Structuré',
          primaryFabric: '100% Worsted Wool / Dense Cotton',
          fabricWeightGsm: '320 - 360 GSM',
          fabricProperties: ['Wind Barrier', 'Structured Silhouette', 'Thermal Comfort'],
          whyThisFabric: 'Fine wool blocks chilly night drafts when seated outdoors on heated café terraces.',
          stylingTip: 'Buttoned at the middle button, paired with dark tailored trousers.',
          iconType: 'coat'
        },
        {
          category: 'Top',
          garmentName: 'Fine Merino Wool Knit or Oxford Shirt',
          frenchGarmentName: 'Pull en Laine Mérinos Fine ou Chemise Oxford',
          primaryFabric: '100% Extra-Fine Merino Wool',
          fabricWeightGsm: '190 - 220 GSM',
          fabricProperties: ['Thermal Regulation', 'Silky Hand-feel', 'Non-Bulky Layering'],
          whyThisFabric: 'Merino wool traps body warmth without adding bulk underneath a tailored blazer.',
          stylingTip: 'Crewneck framing a clean white collar or worn solo with tailored pants.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Tailored Wool Flannel Trousers',
          frenchGarmentName: 'Pantalon Habillé en Flanelle de Laine',
          primaryFabric: '100% Wool Flannel',
          fabricWeightGsm: '280 - 320 GSM',
          fabricProperties: ['Soft Warmth', 'Crisp Drape', 'Wind Protection'],
          whyThisFabric: 'Wool flannel keeps legs insulated against cool breezes while looking immaculate in bistros.',
          stylingTip: 'Tailored straight leg resting gracefully over boot shafts.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'Polished Leather Chelsea Boots or Derbies',
          frenchGarmentName: 'Bottines Chelsea en Cuir Ciré',
          primaryFabric: 'Full Grain Leather with Sturdy Sole',
          fabricWeightGsm: 'Leather',
          fabricProperties: ['Sleek Profile', 'Ankle Draft Protection', 'Pavement Grip'],
          whyThisFabric: 'Leather boots seal out sidewalk dampness and look sophisticated under dimmed restaurant lights.',
          stylingTip: 'Polished to a soft satin glow.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Fine Merino Wool Scarf & Leather Wallet',
          frenchGarmentName: 'Écharpe en Mérinos & Porte-Cartes en Cuir',
          primaryFabric: '100% Merino Wool',
          fabricWeightGsm: 'Lightweight',
          fabricProperties: ['Neck Warmth', 'Compact Drape'],
          whyThisFabric: 'Seals the collar against sudden Seine river chills as you leave the restaurant.',
          stylingTip: 'Draped symmetrically beneath the blazer lapels.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Casual Light Denim & Hoodies', reason: 'Too casual for Parisian evening wine bars and reservations.' },
        { fabric: 'Thin Summer Linens', reason: 'Lets chilly 15°C evening wind penetrate immediately.' }
      ];

      parisianTouch = 'A charcoal wool blazer, camel merino knit, and sleek Chelsea boots.';
      dayToNightAdvice = 'Leave your blazer draped over your chair back indoors, and button it up for the midnight walk home.';

    } else if (occasion === 'museum_walk') {
      headline = 'Museum & Galleries: Layered Cardigan & Walking Boots';
      frenchHeadline = 'Journée Musée: Gilet en Laine & Bottines de Marche';
      summary = `At ${temperatureC}°C, moving between breezy museum courtyards and temperature-controlled indoor galleries is best handled with an easy-to-remove cotton trench and a button-front wool cardigan.`;
      layeringStrategy = '3-Piece Gallery System: Cotton tee base + button-front wool cardigan (easy to unbutton indoors) + cotton trench coat (checked at the cloakroom).';

      items = [
        {
          category: 'Outerwear',
          garmentName: 'Cotton Gabardine Trench Coat (Check at Cloakroom)',
          frenchGarmentName: 'Trench-Coat en Coton (Vestiaire Musée)',
          primaryFabric: 'Dense Water-Repellent Cotton',
          fabricWeightGsm: '320 GSM',
          fabricProperties: ['Wind Barrier', 'Drizzle Proof', 'Light to Carry'],
          whyThisFabric: 'Sheds exterior rain and river wind while waiting in outdoor museum queues; easily checked inside.',
          stylingTip: 'Check at the vestiaire (cloakroom) upon arrival so you can explore unencumbered.',
          iconType: 'coat'
        },
        {
          category: 'Top',
          garmentName: 'Buttoned Wool Knit Cardigan or Sweater',
          frenchGarmentName: 'Gilet Boutonné en Laine',
          primaryFabric: '100% Wool',
          fabricWeightGsm: '220 - 260 GSM',
          fabricProperties: ['Instant Temperature Control', 'Breathable Warmth'],
          whyThisFabric: 'Buttons allow you to open the cardigan instantly if exhibition rooms become warm or crowded.',
          stylingTip: 'Layered over a soft cotton tee or light collared shirt.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Stretch Cotton Chino Trousers',
          frenchGarmentName: 'Pantalon Chino Confortable en Coton',
          primaryFabric: '100% Cotton Twill with Stretch',
          fabricWeightGsm: '280 GSM',
          fabricProperties: ['Flexible Stride', 'Breathable', 'Clean Finish'],
          whyThisFabric: 'Cotton twill offers continuous comfort for climbing museum stairwells and prolonged standing.',
          stylingTip: 'Straight fit with comfortable waistband for all-day mobility.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'Cushioned Leather Walking Boots or Shoes',
          frenchGarmentName: 'Chaussures de Marche en Cuir Souple',
          primaryFabric: 'Genuine Leather with Rubber Cushioning',
          fabricWeightGsm: 'Leather',
          fabricProperties: ['Shock Absorbent Sole', 'Arch Support for Hard Floors', 'Non-Slip'],
          whyThisFabric: 'Cushioned rubber soles isolate feet from hard stone and marble floors during 3+ hours of walking.',
          stylingTip: 'Worn with breathable wool-blend socks.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Compact Wool Scarf & Umbrella',
          frenchGarmentName: 'Écharpe Compacte en Laine & Parapluie',
          primaryFabric: '100% Wool',
          fabricWeightGsm: 'Medium',
          fabricProperties: ['Quick Neck Draft Protection', 'Packable in Bag'],
          whyThisFabric: 'Rolls up neatly inside your bag once indoors.',
          stylingTip: 'Tuck inside your tote bag when entering the gallery.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Heavy Unbreathable Parkas Indoors', reason: 'You will overheat quickly inside crowded gallery rooms.' },
        { fabric: 'Rigid Leather-Soled Dress Shoes', reason: 'Zero cushioning on hard marble museum floors.' }
      ];

      parisianTouch = 'A stylish wool cardigan over a clean Breton tee with a compact leather shoulder bag.';
      dayToNightAdvice = 'Collect your trench coat from the cloakroom and stroll through the Tuileries garden at dusk.';

    } else {
      // Flâneur (Everyday Stroll)
      headline = 'Cotton Trench Coat & Wool Knit Sweater (Flâneur Edition)';
      frenchHeadline = 'Trench en Coton & Pull en Laine';
      summary = `At ${temperatureC}°C, Paris weather is mild with occasional cool breezes and passing showers. A classic cotton trench coat over a comfortable wool knit sweater is the classic combination.`;
      layeringStrategy = '3-Layer Comfort: Light cotton tee base + wool sweater mid-layer + water-resistant cotton trench coat. Remove the sweater if indoor cafes get warm.';

      items = [
        {
          category: 'Outerwear',
          garmentName: 'Classic Cotton Gabardine Trench Coat',
          frenchGarmentName: 'Trench-Coat en Coton Déperlant',
          primaryFabric: 'Dense Water-Repellent Cotton',
          fabricWeightGsm: '300 - 350 GSM',
          fabricProperties: ['Wind Barrier', 'Water-Resistant Weave', 'Timeless Fit'],
          whyThisFabric: 'Tightly woven cotton twill sheds light Parisian drizzle and blocks Seine river wind.',
          stylingTip: 'Tie the belt casually at the waist or back rather than buckling rigidly.',
          iconType: 'coat'
        },
        {
          category: 'Top',
          garmentName: 'Crewneck Wool Knit Sweater',
          frenchGarmentName: 'Pull en Laine Col Rond',
          primaryFabric: '100% Wool (or Merino Wool)',
          fabricWeightGsm: '200 - 240 GSM',
          fabricProperties: ['Temperature Regulating', 'Naturally Odor Resistant', 'Soft Warmth'],
          whyThisFabric: 'Wool traps natural body warmth against cool breezes, yet breathes well when entering the Métro.',
          stylingTip: 'Layer over a collared cotton shirt or basic white tee.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Cotton Chinos or Dark Denim Jeans',
          frenchGarmentName: 'Pantalon Chino en Coton ou Jean Brut',
          primaryFabric: '100% Cotton Twill / Denim',
          fabricWeightGsm: '280 - 320 GSM',
          fabricProperties: ['Wind Resistant', 'Sturdy Shape', 'All-Day Walking'],
          whyThisFabric: 'Mid-weight cotton twill provides just enough warmth and wind protection at 17°C.',
          stylingTip: 'Straight clean fit with a slight break over your shoes.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'Leather Chelsea Boots or Derby Shoes',
          frenchGarmentName: 'Bottines Chelsea en Cuir',
          primaryFabric: 'Genuine Leather with Rubber Sole',
          fabricWeightGsm: 'Leather',
          fabricProperties: ['Water Repellent', 'Cobblestone Grip', 'All-Day Cushioning'],
          whyThisFabric: 'Leather shoes with rubber soles keep feet dry from damp sidewalks and support 10,000+ steps.',
          stylingTip: 'Pairs seamlessly from daytime gallery visits to evening dinners.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Light Wool Scarf & Compact Umbrella',
          frenchGarmentName: 'Écharpe Légère en Laine & Parapluie',
          primaryFabric: '100% Wool',
          fabricWeightGsm: 'Light-Medium',
          fabricProperties: ['Neck Draft Protection', 'Easy to Pack'],
          whyThisFabric: 'Wool scarf stops cold air at the neck when evening winds pick up.',
          stylingTip: 'Draped once over the shoulder under the trench coat lapels.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Cheap Non-Breathable Synthetics', reason: 'Causes overheating indoors while leaving you cold in wind.' },
        { fabric: 'Thin Summer Linen', reason: 'Too open-weave; lets in chilly autumn winds.' }
      ];

      parisianTouch = 'Collar of the trench popped slightly against the breeze, navy and camel tones.';
      dayToNightAdvice = 'Leave your trench coat unbuttoned upon entering the restaurant to show the clean wool knit underneath.';
    }
  }

  // 4. CRISP AUTUMN & COOL WEATHER (8°C - 14°C)
  else if (tempTier === 'crisp_autumn') {
    if (occasion === 'chic_evening') {
      headline = 'Evening Bistro: Tailored Wool Overcoat & Cashmere-Wool Turtleneck';
      frenchHeadline = 'Soirée Bistro: Manteau Drapé en Laine & Col Roulé';
      summary = `At ${temperatureC}°C in the evening, Parisian bistros call for rich thermal textures. A long tailored wool coat over a fine wool turtleneck, structured flannel trousers, and polished leather dress boots keep you warm and elegant.`;
      layeringStrategy = 'Sophisticated 3-Piece: Fine cotton undershirt + warm wool turtleneck + knee-length wool overcoat. Check your coat at the restaurant cloakroom.';

      items = [
        {
          category: 'Outerwear',
          garmentName: 'Tailored Wool Overcoat (Charcoal or Navy)',
          frenchGarmentName: 'Manteau Habillé en Laine Peignée',
          primaryFabric: '100% Heavy Wool',
          fabricWeightGsm: '500 - 550 GSM',
          fabricProperties: ['Deep Wind Blocking', 'Tailored Shoulder Structure', 'Thermal Warmth'],
          whyThisFabric: 'Dense wool stops biting Seine river winds while presenting an immaculate evening profile.',
          stylingTip: 'Knee length with clean lapels, worn unbuttoned upon stepping into the restaurant.',
          iconType: 'coat'
        },
        {
          category: 'Top',
          garmentName: 'Fine Wool Knit Turtleneck Sweater',
          frenchGarmentName: 'Pull en Laine Col Roulé Élégant',
          primaryFabric: '100% Wool / Merino',
          fabricWeightGsm: '280 - 320 GSM',
          fabricProperties: ['Neck Draft Protection', 'Thermal Air Pockets', 'Sleek Fit'],
          whyThisFabric: 'Turtleneck wool frames the jawline and provides continuous neck warmth without needing a bulky scarf indoors.',
          stylingTip: 'Fitted cleanly with no bunching under the coat.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Tailored Wool Flannel Trousers with Sharp Crease',
          frenchGarmentName: 'Pantalon en Flanelle de Laine à Pli',
          primaryFabric: '100% Wool Flannel',
          fabricWeightGsm: '340 - 380 GSM',
          fabricProperties: ['Brushed Thermal Softness', 'Wind Resistant', 'Classic Formal Drape'],
          whyThisFabric: 'Brushed wool flannel traps warm air between fibers, shielding your legs from the cold.',
          stylingTip: 'Tailored with a crisp center crease resting over boots.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'Polished Waterproof Leather Chelsea Boots',
          frenchGarmentName: 'Bottines Chelsea en Cuir Noir ou Havane',
          primaryFabric: 'Full Grain Leather with Dainite Rubber Sole',
          fabricWeightGsm: 'Thick Leather',
          fabricProperties: ['Wet Cobblestone Grip', 'Refined Profile', 'Thermal Ankle Coverage'],
          whyThisFabric: 'Rubber-studded leather soles keep you steady on wet cobblestones while looking sharp.',
          stylingTip: 'Polished clean before heading out.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Soft Wool/Silk Evening Scarf & Leather Gloves',
          frenchGarmentName: 'Écharpe Soie & Laine & Gants en Cuir',
          primaryFabric: 'Wool & Silk Blend / Leather',
          fabricWeightGsm: 'Medium',
          fabricProperties: ['Luxury Hand-Feel', 'Hand Warmth'],
          whyThisFabric: 'Leather gloves block freezing bridge winds; silk-wool scarf adds evening luxury.',
          stylingTip: 'Tucked neatly into coat lapels.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Casual Denim & Canvas Sneakers', reason: 'Look out of place in upscale bistros and will leave your feet cold on damp sidewalks.' },
        { fabric: 'Summer Linens & Poplins', reason: 'Zero heat retention in 10°C evening air.' }
      ];

      parisianTouch = 'Monochrome charcoal and black wool tailoring with polished leather boots and a subtle leather watch.';
      dayToNightAdvice = 'Hand your heavy wool coat to the vestiaire host, revealing your clean turtleneck sweater.';

    } else if (occasion === 'museum_walk') {
      headline = 'Museum & Galleries: Mid-Weight Wool Knit & Cloakroom Ready Coat';
      frenchHeadline = 'Visite Musée: Pull en Laine Respirant & Manteau Déposé';
      summary = `At ${temperatureC}°C, outdoor queueing is chilly while indoor museum rooms (Louvre, Orsay) are heated to 20°C. Wear a warm wool coat to check at the vestiaire, and a medium-weight wool knit you can comfortably wear indoors.`;
      layeringStrategy = 'Vestiaire System: Cotton undershirt + medium wool knit (keeps you comfortable indoors) + warm wool coat (checked at the cloakroom).';

      items = [
        {
          category: 'Outerwear',
          garmentName: 'Mid-Length Wool Overcoat (Check at Cloakroom)',
          frenchGarmentName: 'Manteau Chaud en Laine (Vestiaire)',
          primaryFabric: '100% Wool',
          fabricWeightGsm: '450 GSM',
          fabricProperties: ['Warm Outdoor Shield', 'Easy to Check Inside'],
          whyThisFabric: 'Keeps you warm in outdoor museum queues; easily handed to the cloakroom inside.',
          stylingTip: 'Use the cloakroom to keep hands and shoulders free for browsing.',
          iconType: 'coat'
        },
        {
          category: 'Top',
          garmentName: 'Breathable Medium Wool Crewneck or Cardigan',
          frenchGarmentName: 'Pull en Laine Mi-Épais Respirant',
          primaryFabric: '100% Pure Wool',
          fabricWeightGsm: '240 - 280 GSM',
          fabricProperties: ['Naturally Regulates Body Heat', 'Non-Overheating Indoors'],
          whyThisFabric: 'Wool naturally adapts to ambient temperature so you stay comfortable inside heated galleries.',
          stylingTip: 'Layer over a breathable cotton tee.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Heavy Cotton Corduroy or Wool Trousers',
          frenchGarmentName: 'Pantalon en Velours de Coton ou Laine',
          primaryFabric: '100% Cotton Corduroy / Wool',
          fabricWeightGsm: '320 GSM',
          fabricProperties: ['Soft Warmth', 'Comfortable Walking Flex', 'Textured Look'],
          whyThisFabric: 'Cotton corduroy traps warm air while providing plenty of give for walking miles in galleries.',
          stylingTip: 'Straight relaxed leg with supportive shoes.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'Cushioned Leather Walking Boots with Rubber Soles',
          frenchGarmentName: 'Bottines de Marche en Cuir Semelle Souple',
          primaryFabric: 'Supple Leather & Cushioned Rubber',
          fabricWeightGsm: 'Leather',
          fabricProperties: ['Arch Cushioning', 'Cold Stone Barrier', 'Non-Slip Grip'],
          whyThisFabric: 'Cushioned soles insulate feet from cold ground and prevent fatigue on hard museum floors.',
          stylingTip: 'Paired with thick wool socks for all-day comfort.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Warm Wool Beanie & Scarf',
          frenchGarmentName: 'Bonnet et Écharpe en Laine',
          primaryFabric: '100% Wool',
          fabricWeightGsm: 'Medium-Heavy',
          fabricProperties: ['Head & Neck Warmth', 'Easy to Pack in Bag'],
          whyThisFabric: 'Seals in body heat during breezy outdoor walks between exhibition wings.',
          stylingTip: 'Slip into your coat pockets upon entering the museum.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Heavy Non-Breathable Synthetic Ski Jackets', reason: 'Cumbersome to carry and causes overheating in galleries.' },
        { fabric: 'Unpadded Thin-Soled Shoes', reason: 'Causes foot fatigue after 2 hours on hard museum floors.' }
      ];

      parisianTouch = 'Rich corduroy trousers, a classic wool knit, and a compact leather exhibition bag.';
      dayToNightAdvice = 'After the museum closes, retrieve your wool coat and head across the bridge for an aperitif.';

    } else {
      // Flâneur (Everyday Stroll)
      headline = 'Tailored Wool Coat & Warm Wool Sweater (Flâneur Edition)';
      frenchHeadline = 'Manteau en Laine & Pull Épais';
      summary = `At ${temperatureC}°C, the crisp Parisian air requires warm, textured fabrics. A tailored wool overcoat, cozy wool knit sweater, and cotton corduroy or wool pants provide reliable warmth.`;
      layeringStrategy = 'The Warmth Trio: Long-sleeve cotton tee + warm wool knit sweater + wool overcoat. Wrap a wool scarf around your neck to seal out drafts.';

      items = [
        {
          category: 'Outerwear',
          garmentName: 'Tailored Wool Overcoat or Peacoat',
          frenchGarmentName: 'Manteau Droit en Laine Chaude',
          primaryFabric: '100% Wool (or Wool Blend)',
          fabricWeightGsm: '450 - 550 GSM',
          fabricProperties: ['Thermal Insulation', 'Wind Blocking', 'Structured Tailoring'],
          whyThisFabric: 'Dense wool stops cold winds along Boulevard Saint-Germain and holds warmth close to the body.',
          stylingTip: 'Knee-length coat in classic charcoal, navy, or camel.',
          iconType: 'coat'
        },
        {
          category: 'Top',
          garmentName: 'Warm Wool Knit Turtleneck or Crewneck',
          frenchGarmentName: 'Pull en Laine Col Roulé ou Col Rond',
          primaryFabric: '100% Wool',
          fabricWeightGsm: '260 - 320 GSM',
          fabricProperties: ['Core Body Warmth', 'Soft Hand-feel', 'Breathable Insulation'],
          whyThisFabric: 'Wool traps warm air pockets while letting moisture escape naturally.',
          stylingTip: 'A turtleneck frames the neck and removes the need for a bulky scarf indoors.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Wool Flannel Trousers or Heavy Cotton Corduroy',
          frenchGarmentName: 'Pantalon en Flanelle de Laine ou Velours de Coton',
          primaryFabric: '100% Wool or Heavy Cotton',
          fabricWeightGsm: '320 - 380 GSM',
          fabricProperties: ['Thermal Barrier', 'Soft Brushed Texture', 'Wind Resistant'],
          whyThisFabric: 'Brushed wool flannel and corduroy trap heat between fibers, keeping legs warm on breezy bridge walks.',
          stylingTip: 'Tailored with a straight leg and clean finish over boots.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'Waterproof Leather Boots with Rubber Lug Soles',
          frenchGarmentName: 'Bottines en Cuir Traité Semelle Crantée',
          primaryFabric: 'Genuine Leather with Sturdy Rubber Sole',
          fabricWeightGsm: 'Thick Leather',
          fabricProperties: ['Cold Ground Insulation', 'Wet Surface Grip', 'Water Repellent'],
          whyThisFabric: 'Thick rubber soles isolate feet from cold damp pavement, while leather keeps moisture out.',
          stylingTip: 'Wear with warm wool socks for comfortable all-day walking.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Wool Beanie & Warm Wool Scarf',
          frenchGarmentName: 'Bonnet et Écharpe en Laine',
          primaryFabric: '100% Wool',
          fabricWeightGsm: 'Medium-Heavy',
          fabricProperties: ['Head & Neck Heat Retention', 'Wind Shield'],
          whyThisFabric: 'Wool prevents body heat from escaping through exposed head and neck.',
          stylingTip: 'Wrap the scarf twice around the collar and tuck the ends into your coat.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Summer Linen', reason: 'Offers zero thermal warmth and allows cold wind to chill the skin.' },
        { fabric: 'Light Unlined Cotton Poplin', reason: 'Does not retain body heat in 10°C weather.' }
      ];

      parisianTouch = 'Rich textures: warm wool coat with soft wool knit and polished leather boots.';
      dayToNightAdvice = 'Unbutton your wool coat and drape your scarf loosely around your neck when seated inside the bistro.';
    }
  }

  // 5. CHILLY & FREEZING WINTER (< 8°C)
  else {
    if (occasion === 'chic_evening') {
      headline = 'Evening Bistro: Long Heavy Wool Overcoat & Tailored Flannel';
      frenchHeadline = 'Soirée d\'Hiver: Grand Manteau Laine & Flanelle Habillée';
      summary = `At ${temperatureC}°C in the winter evening, Paris is freezing with biting river gusts. A long structured wool overcoat, fine wool knit, tailored wool flannel trousers, and insulated leather boots ensure sophisticated dinner warmth.`;
      layeringStrategy = 'Winter Formal Layering: Cotton thermal base -> tailored wool sweater -> long tailored wool overcoat with leather dress gloves and cashmere scarf.';

      items = [
        {
          category: 'Outerwear',
          garmentName: 'Long Heavy Wool Overcoat (Felted Wool)',
          frenchGarmentName: 'Grand Manteau Long en Drap de Laine',
          primaryFabric: '100% Heavy Felted Wool',
          fabricWeightGsm: '600 - 700 GSM',
          fabricProperties: ['Complete Wind Barrier', 'Deep Thermal Shield', 'Formal Silhouette'],
          whyThisFabric: 'Dense felted wool stops freezing drafts when waiting for taxis or walking between dinner and cocktail bars.',
          stylingTip: 'Double-breasted or clean single-breasted, reaching past the knees.',
          iconType: 'coat'
        },
        {
          category: 'Top',
          garmentName: 'Tailored Wool Turtleneck or Fine Cashmere Knit',
          frenchGarmentName: 'Pull en Laine Col Roulé Habillé',
          primaryFabric: '100% Wool / Cashmere Blend',
          fabricWeightGsm: '320 - 380 GSM',
          fabricProperties: ['Maximum Core Warmth', 'Smooth Non-Bulky Fit'],
          whyThisFabric: 'High-density wool yarn insulates without adding sloppy bulk under your formal coat.',
          stylingTip: 'Worn with a clean undershirt.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Heavy Tailored Wool Flannel Trousers',
          frenchGarmentName: 'Pantalon Habillé en Laine Épaisse',
          primaryFabric: '100% Heavy Wool Flannel',
          fabricWeightGsm: '380 - 440 GSM',
          fabricProperties: ['Thermal Leg Protection', 'Wind Block', 'Sharp Formal Line'],
          whyThisFabric: 'Heavy wool flannel stops winter cold from chilling your legs while looking immaculate indoors.',
          stylingTip: 'Straight tailored leg over boot uppers.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'Insulated Leather Chelsea or Dress Boots',
          frenchGarmentName: 'Bottines en Cuir Doublé Semelle Crantée Discrète',
          primaryFabric: 'Treated Leather with Rubber Commando Sole',
          fabricWeightGsm: 'Heavy Leather',
          fabricProperties: ['Frost Protection', 'Cobblestone Grip', 'Refined Look'],
          whyThisFabric: 'Thick rubber soles isolate feet from freezing sidewalks while leather maintains sleek evening styling.',
          stylingTip: 'Paired with merino wool socks.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Leather Gloves (Wool Lined) & Cashmere Scarf',
          frenchGarmentName: 'Gants en Cuir Doublés & Écharpe Cachemire',
          primaryFabric: 'Leather & Wool / Cashmere',
          fabricWeightGsm: 'Heavyweight',
          fabricProperties: ['Hand Frost Defense', 'Luxury Collar Seal'],
          whyThisFabric: 'Leather blocks icy wind while soft wool lining traps finger warmth.',
          stylingTip: 'Double-wrapped closely around the collar.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Casual Unlined Denim & Sneakers', reason: 'Conducts freezing cold directly to legs and toes, and too informal for evening bistros.' },
        { fabric: 'Thin Cotton Base Layers Alone', reason: 'Zero heat retention below 6°C.' }
      ];

      parisianTouch = 'A grand navy or charcoal wool coat with leather gloves and polished boots.';
      dayToNightAdvice = 'Check your coat at the cloakroom upon arrival, relaxing in your cozy wool turtleneck.';

    } else if (occasion === 'museum_walk') {
      headline = 'Museum & Galleries: Heavy Coat (Check at Vestiaire) & Indoor Wool Layer';
      frenchHeadline = 'Visite Musée Hiver: Manteau au Vestiaire & Tricot Doux';
      summary = `At ${temperatureC}°C, the contrast between freezing outdoor queues and 21°C heated museum halls is stark. Wear a heavy wool coat to check at the cloakroom, and a comfortable wool knit over a cotton tee for gallery browsing.`;
      layeringStrategy = 'Museum Thermal Balance: Cotton tee base + comfortable medium wool knit (perfect for 21°C indoor halls) + heavy winter wool coat (handed to the cloakroom).';

      items = [
        {
          category: 'Outerwear',
          garmentName: 'Heavy Wool Winter Coat (Check at Cloakroom)',
          frenchGarmentName: 'Manteau d\'Hiver en Laine (Vestiaire)',
          primaryFabric: '100% Heavy Wool',
          fabricWeightGsm: '550 - 650 GSM',
          fabricProperties: ['Maximum Outdoor Frost Protection', 'Easy to Check at Vestiaire'],
          whyThisFabric: 'Protects from freezing outdoor winds in the Louvre courtyard; checked immediately inside.',
          stylingTip: 'Hang at the free museum vestiaire so you do not overheat while walking.',
          iconType: 'coat'
        },
        {
          category: 'Top',
          garmentName: 'Breathable Wool Knit Sweater or Cardigan',
          frenchGarmentName: 'Pull en Laine Doux & Respirant',
          primaryFabric: '100% Pure Wool',
          fabricWeightGsm: '280 - 320 GSM',
          fabricProperties: ['Moisture Regulating', 'Ideal for 21°C Indoor Heated Galleries'],
          whyThisFabric: 'Pure wool breathes naturally in heated galleries without trapping uncomfortable sweat.',
          stylingTip: 'Worn over a lightweight cotton crewneck tee.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Lined Cotton Pants or Wool Flannel Trousers',
          frenchGarmentName: 'Pantalon Doublé en Coton ou Flanelle',
          primaryFabric: '100% Wool Flannel or Lined Cotton',
          fabricWeightGsm: '360 GSM',
          fabricProperties: ['Leg Warmth', 'Comfortable Walking Flexibility'],
          whyThisFabric: 'Keeps legs warm during outdoor transit while breathing easily indoors during hours of standing.',
          stylingTip: 'Relaxed fit with supportive walking boots.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'Cushioned Leather Walking Boots with Rubber Lugs',
          frenchGarmentName: 'Bottines de Marche Chaudes en Cuir',
          primaryFabric: 'Treated Leather & Thick Rubber Sole',
          fabricWeightGsm: 'Thick Leather',
          fabricProperties: ['Cold Floor Barrier', 'Shock Absorption on Marble', 'Waterproof'],
          whyThisFabric: 'Thick rubber soles isolate feet from cold stone museum floors and prevent sore feet.',
          stylingTip: 'Worn with warm wool socks.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Warm Wool Beanie, Scarf & Gloves',
          frenchGarmentName: 'Bonnet, Écharpe & Gants en Laine',
          primaryFabric: '100% Wool',
          fabricWeightGsm: 'Heavyweight',
          fabricProperties: ['Frost Protection in Queues', 'Packable in Coat Pockets'],
          whyThisFabric: 'Essential for outdoor museum queues; pack inside coat pockets when checking at vestiaire.',
          stylingTip: 'Tuck into your checked coat pockets.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Heavy Ski Parkas Kept on Indoors', reason: 'You will quickly overheat and sweat inside heated exhibition rooms.' },
        { fabric: 'Thin Canvas Shoes', reason: 'Toes will freeze immediately on cold winter sidewalks.' }
      ];

      parisianTouch = 'A cozy wool knit over a crisp tee, textured wool trousers, and a leather museum tote.';
      dayToNightAdvice = 'Retrieve your coat from the vestiaire and walk across the Pont des Arts as the evening lights turn on.';

    } else {
      // Flâneur (Everyday Stroll)
      headline = 'Heavy Wool Overcoat & Chunky Wool Knit Layers (Flâneur Edition)';
      frenchHeadline = 'Grand Manteau en Laine Épaisse & Tricot Chaud';
      summary = `At ${temperatureC}°C, Paris is frosty with cold river winds. Heavy wool overcoats, thick wool knit sweaters, thermal cotton/wool base layers, and sturdy leather boots are essential.`;
      layeringStrategy = '4-Layer Winter Defense: 1. Cotton/wool thermal base layer -> 2. Thick wool sweater -> 3. Optional fleece/cardigan -> 4. Heavy wool overcoat. Seal with wool scarf and leather gloves.';

      items = [
        {
          category: 'Outerwear',
          garmentName: 'Heavy Wool Overcoat (Thick Felted Wool)',
          frenchGarmentName: 'Manteau Long en Laine Épaisse',
          primaryFabric: '100% Heavy Wool',
          fabricWeightGsm: '550 - 700 GSM',
          fabricProperties: ['Maximum Windproof Density', 'Deep Thermal Shield', 'Water Shedding'],
          whyThisFabric: 'Dense wool stops freezing winds along the Seine and keeps your core warm.',
          stylingTip: 'Button up fully and turn up the collar against frost.',
          iconType: 'coat'
        },
        {
          category: 'Top',
          garmentName: 'Chunky Wool Cable Knit or Turtleneck',
          frenchGarmentName: 'Gros Pull en Laine Tricotée',
          primaryFabric: '100% Wool',
          fabricWeightGsm: '350 - 450 GSM',
          fabricProperties: ['Heavy Thermal Air Pockets', 'Superior Body Warmth'],
          whyThisFabric: 'Thick wool yarn traps maximum body heat, keeping you toasty in near-freezing air.',
          stylingTip: 'Wear a long-sleeve cotton tee underneath as a comfortable skin base.',
          iconType: 'shirt'
        },
        {
          category: 'Bottom',
          garmentName: 'Heavy Wool Trousers or Lined Cotton Pants',
          frenchGarmentName: 'Pantalon en Laine Épaisse ou Coton Doublé',
          primaryFabric: '100% Wool or Heavy Cotton Twill',
          fabricWeightGsm: '360 - 420 GSM',
          fabricProperties: ['Blocks Cold Winds', 'Thermal Leg Protection'],
          whyThisFabric: 'Heavy wool trousers block biting drafts on outdoor benches and metro platforms.',
          stylingTip: 'Wear with long wool socks for complete leg warmth.',
          iconType: 'pants'
        },
        {
          category: 'Footwear',
          garmentName: 'Insulated Leather Boots with Non-Slip Rubber Lug Soles',
          frenchGarmentName: 'Bottines en Cuir Chaudes Semelle Crantée',
          primaryFabric: 'Treated Leather & Thick Rubber Sole',
          fabricWeightGsm: 'Heavy Leather',
          fabricProperties: ['Toe Frost Protection', 'Non-Slip Wet/Ice Grip', 'Waterproof'],
          whyThisFabric: 'Thick rubber lugs isolate feet from freezing cobblestones and prevent slipping.',
          stylingTip: 'Treated with water-resistant balm to protect against slush and winter rain.',
          iconType: 'shoes'
        },
        {
          category: 'Accessory',
          garmentName: 'Leather Gloves (Wool Lined) & Thick Wool Scarf',
          frenchGarmentName: 'Gants en Cuir Doublés Laine & Grande Écharpe',
          primaryFabric: 'Leather & Wool',
          fabricWeightGsm: 'Heavyweight',
          fabricProperties: ['Wind Block Leather', 'Wool Thermal Insulation'],
          whyThisFabric: 'Leather blocks freezing wind while soft wool lining keeps fingers warm.',
          stylingTip: 'Double wrap the scarf firmly around your collar.',
          iconType: 'accessory'
        }
      ];

      fabricsToAvoid = [
        { fabric: 'Standard Light Denim (Without Thermals)', reason: 'Conducts cold directly to your legs and chills quickly.' },
        { fabric: 'Thin Cotton Shirts alone', reason: 'Zero heat retention below 8°C.' }
      ];

      parisianTouch = 'A long dark wool coat, warm wool scarf, leather gloves, and a hot café crème.';
      dayToNightAdvice = 'Check your heavy wool coat at the cloakroom to enjoy dinner in your cozy wool sweater.';
    }
  }

  // Rain adjustments
  if (isRainy) {
    items = items.map(item => {
      if (item.category === 'Outerwear') {
        return {
          ...item,
          garmentName: occasion === 'chic_evening' 
            ? `Water-Resistant Belted Cotton Trench Coat` 
            : `Water-Resistant Cotton Trench or Rain Jacket`,
          frenchGarmentName: `Trench Déperlant en Coton Imperméabilisé`,
          primaryFabric: 'Dense Water-Repellent Cotton',
          fabricProperties: ['Water Repellent Finish', 'Wind Guard', 'Breathable'],
          whyThisFabric: `Crucial for Paris rain: tight cotton twill beads water away so you stay dry walking across wet cobblestones.`,
          stylingTip: `Pop the collar and carry a sturdy umbrella.`
        };
      }
      if (item.category === 'Footwear') {
        return {
          ...item,
          garmentName: occasion === 'chic_evening' 
            ? `Polished Waterproof Leather Chelsea Boots` 
            : `Waterproof Leather Boots (Rubber Grip Sole)`,
          frenchGarmentName: `Bottines en Cuir Traité Semelle Antidérapante`,
          stylingTip: `Rubber soles are essential to prevent slipping on wet, slick limestone sidewalks.`
        };
      }
      if (item.category === 'Accessory') {
        return {
          ...item,
          garmentName: `Wind-Resistant Umbrella & Wool Scarf`,
          frenchGarmentName: `Parapluie Anti-Vent & Écharpe en Laine`,
          whyThisFabric: 'Keeps rain off while wool scarf provides neck warmth in damp air.'
        };
      }
      return item;
    });

    fabricsToAvoid.unshift({
      fabric: 'Untreated Suede & Delicate Silk',
      reason: 'Raindrops will permanently spot raw suede and delicate untreated silk.'
    });
  }

  // Normalize custom occasion logic
  const occLower = (occasion || '').toLowerCase();
  const isCustomOccasion = !['flaneur', 'chic_evening', 'museum_walk', 'business_smart', 'seine_picnic'].includes(occasion);

  // If user entered a custom occasion, tailor headline and advice
  if (isCustomOccasion && occasion.trim().length > 0) {
    const formattedOcc = occasion.trim();
    headline = `${formattedOcc}: ${headline}`;
    frenchHeadline = `Pour "${formattedOcc}": ${frenchHeadline}`;
    summary = `Tailored for "${formattedOcc}" in Paris at ${temperatureC}°C: ${summary}`;
    
    if (occLower.includes('date') || occLower.includes('dinner') || occLower.includes('bar') || occLower.includes('opera') || occLower.includes('party') || occLower.includes('cocktail')) {
      parisianTouch = `Evening elegance for "${formattedOcc}": polished leather shoes, tailored lines, and subtle dark or neutral tones.`;
    } else if (occLower.includes('bike') || occLower.includes('run') || occLower.includes('walk') || occLower.includes('hike') || occLower.includes('tour')) {
      parisianTouch = `Mobility & comfort for "${formattedOcc}": breathable cotton base, flexible trousers, and supportive footwear.`;
    } else if (occLower.includes('work') || occLower.includes('meeting') || occLower.includes('interview') || occLower.includes('office')) {
      parisianTouch = `Professional chic for "${formattedOcc}": structured tailoring, crisp collar, and minimal clean accessories.`;
    }
  }

  // Wind adjustments
  if (isWindy) {
    headline += ' (Wind-Shielding Weaves)';
    layeringStrategy += ' Fasten outer layers securely; dense cotton twill, wool coats, or leather block gusts across bridges.';
  }

  return {
    headline,
    frenchHeadline,
    summary,
    overallComfortScore: 9.5,
    temperatureTier: classification.tierLabel,
    layeringStrategy,
    items,
    fabricsToAvoid,
    parisianTouch,
    dayToNightAdvice,
    isCustomAi: false
  };
}
