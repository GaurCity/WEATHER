import React, { useState, useRef, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Clock, 
  Shirt, 
  CloudRain, 
  Sun, 
  Moon, 
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';
import { TemperatureUnit, WeatherConditionInfo } from '../types';

export interface HourlyPoint {
  time: string;
  hourNumber: number;
  temperature: number;
  precipitationProbability: number;
  weatherCode: number;
  windSpeed?: number;
  condition: WeatherConditionInfo;
}

interface TemperatureSparklineProps {
  hourly: HourlyPoint[];
  unit: TemperatureUnit;
  formatTemp: (tempC: number) => string;
  currentTempC: number;
  isSimulated?: boolean;
  selectedHourIndex: number | null;
  onSelectHour: (index: number | null) => void;
}

export default function TemperatureSparkline({
  hourly,
  unit,
  formatTemp,
  currentTempC,
  isSimulated = false,
  selectedHourIndex,
  onSelectHour
}: TemperatureSparklineProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [internalHoverIndex, setInternalHoverIndex] = useState<number | null>(null);

  // Take up to 24 hours
  const data = useMemo(() => {
    if (!hourly || hourly.length === 0) return [];
    return hourly.slice(0, 24);
  }, [hourly]);

  const activeIndex = selectedHourIndex !== null ? selectedHourIndex : internalHoverIndex;

  // Temperature calculations
  const { minTemp, maxTemp, minPoint, maxPoint, tempDelta } = useMemo(() => {
    if (data.length === 0) {
      return { minTemp: 0, maxTemp: 0, minPoint: null, maxPoint: null, tempDelta: 0 };
    }
    let min = data[0].temperature;
    let max = data[0].temperature;
    let minIdx = 0;
    let maxIdx = 0;

    data.forEach((p, idx) => {
      if (p.temperature < min) {
        min = p.temperature;
        minIdx = idx;
      }
      if (p.temperature > max) {
        max = p.temperature;
        maxIdx = idx;
      }
    });

    return {
      minTemp: min,
      maxTemp: max,
      minPoint: { ...data[minIdx], index: minIdx },
      maxPoint: { ...data[maxIdx], index: maxIdx },
      tempDelta: Math.round((max - min) * 10) / 10
    };
  }, [data]);

  // Chart dimensions & coordinates
  const chartWidth = 820;
  const chartHeight = 160;
  const padLeft = 40;
  const padRight = 40;
  const padTop = 32;
  const padBottom = 34;

  const innerWidth = chartWidth - padLeft - padRight;
  const innerHeight = chartHeight - padTop - padBottom;

  // Visual temperature scale with buffer
  const yMin = minTemp - 1.2;
  const yMax = maxTemp + 1.8;
  const yRange = Math.max(yMax - yMin, 3);

  // Compute (x, y) for each point
  const points = useMemo(() => {
    if (data.length === 0) return [];
    return data.map((d, i) => {
      const x = padLeft + (i / Math.max(data.length - 1, 1)) * innerWidth;
      const normalizedY = (d.temperature - yMin) / yRange;
      const y = chartHeight - padBottom - normalizedY * innerHeight;
      return { x, y, data: d, index: i };
    });
  }, [data, innerWidth, innerHeight, yMin, yRange]);

  // Smooth Catmull-Rom to Cubic Bezier curve calculation
  const { pathD, areaD } = useMemo(() => {
    if (points.length < 2) return { pathD: '', areaD: '' };

    let pD = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      pD += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }

    const baselineY = chartHeight - padBottom + 10;
    const aD = `${pD} L ${points[points.length - 1].x.toFixed(1)},${baselineY} L ${points[0].x.toFixed(1)},${baselineY} Z`;

    return { pathD: pD, areaD: aD };
  }, [points]);

  // Interactive mouse/touch coordinate handler
  const handlePointer = (clientX: number) => {
    if (!svgRef.current || points.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const ratio = relX / rect.width;
    const index = Math.round(ratio * (points.length - 1));
    const clamped = Math.max(0, Math.min(points.length - 1, index));
    setInternalHoverIndex(clamped);
    onSelectHour(clamped);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    handlePointer(e.clientX);
  };

  const handlePointerLeave = () => {
    setInternalHoverIndex(null);
    onSelectHour(null);
  };

  // Outfit guidance helper per hour's temperature
  const getOutfitAdvice = (tempC: number, rainProb: number, hourNum: number) => {
    const isEvening = hourNum >= 19 || hourNum < 6;
    if (rainProb >= 40) {
      return {
        tag: 'Water-Resistant Essential',
        fabric: 'Gabardine & Sturdy Leather',
        advice: 'Rain expected. A water-repellent trench coat and closed leather footwear are paramount.',
        badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30'
      };
    }
    if (tempC >= 28) {
      return {
        tag: 'Canicule / Heatwave',
        fabric: 'Pure Linen & Open-Weave Cotton',
        advice: 'Intense heat: wear ultra-light linen or silk foulard; avoid unlined blazers and heavy denim.',
        badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30'
      };
    }
    if (tempC >= 21) {
      return {
        tag: 'Warm Parisian Day',
        fabric: 'Lightweight Cotton & Linen',
        advice: 'Breathable, relaxed tailoring. A crisp cotton shirt or fluid linen dress will stay fresh.',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      };
    }
    if (tempC >= 15) {
      return {
        tag: 'Classic Transitional (15–20°C)',
        fabric: 'Cotton Gabardine & Fine Merino',
        advice: isEvening 
          ? 'Evening drop: Classic trench coat over a fine knit or Breton tee; ideal for outdoor terraces.'
          : 'Quintessential Paris weather: Perfect for a light trench or unbuttoned overshirt.',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      };
    }
    if (tempC >= 8) {
      return {
        tag: 'Crisp & Cool (8–14°C)',
        fabric: 'Medium Wool Overcoat & Flannel',
        advice: 'Brisk Parisian air: Layer a wool overcoat, cashmere scarf, and leather Chelsea boots.',
        badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      };
    }
    return {
      tag: 'Chilly & Frost (<8°C)',
      fabric: 'Heavy Melton Wool & Thermal Layers',
      advice: 'Substantial winter warmth: Structured heavy wool overcoat, thick knitwear, and wool beanie.',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
    };
  };

  // Active highlighted hour data
  const highlightedPoint = activeIndex !== null && points[activeIndex] ? points[activeIndex] : null;
  const currentHourAdvice = highlightedPoint 
    ? getOutfitAdvice(highlightedPoint.data.temperature, highlightedPoint.data.precipitationProbability, highlightedPoint.data.hourNumber)
    : getOutfitAdvice(currentTempC, data[0]?.precipitationProbability ?? 0, data[0]?.hourNumber ?? 12);

  // Overall 24-hour outfit strategic summary
  const dailyStrategy = useMemo(() => {
    if (tempDelta >= 8) {
      return {
        type: 'high-swing',
        title: 'High Day-to-Night Thermal Swing',
        advice: `Noticeable ${tempDelta}°C variation over 24 hours (low of ${formatTemp(minTemp)} to peak of ${formatTemp(maxTemp)}). A modular Parisian layering strategy is essential: start with a breathable base and carry a packable trench coat or cardigan.`,
        badge: 'Layering Critical'
      };
    }
    if (minTemp < 10) {
      return {
        type: 'cool',
        title: 'Cool Parisian Air Expected',
        advice: `Temperatures drop to ${formatTemp(minTemp)}. Ensure your outerwear is structured with sufficient wool content or wind-resistance.`,
        badge: 'Outerwear Focus'
      };
    }
    if (maxTemp >= 24) {
      return {
        type: 'warm',
        title: 'Balmy Afternoon Peak',
        advice: `Warmer peak of ${formatTemp(maxTemp)}. Favor breathable natural plant fibers (linen, organic cotton) for afternoon walking.`,
        badge: 'Breathable Fibers'
      };
    }
    return {
      type: 'moderate',
      title: 'Stable Parisian Climate',
      advice: `Temperatures remain consistent (fluctuating by ${tempDelta}°C). A comfortable mid-weight ensemble with regular city walking footwear will keep you balanced.`,
      badge: 'Balanced Comfort'
    };
  }, [tempDelta, minTemp, maxTemp, formatTemp]);

  if (points.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-800/90 bg-stone-900/90 p-4 sm:p-5 text-stone-100 shadow-sm backdrop-blur-xs">
      {/* Sparkline Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <TrendingUp className="h-3.5 w-3.5" />
            </div>
            <span className="font-serif text-xs font-semibold uppercase tracking-wider text-amber-300">
              24-Hour Temperature Trajectory
            </span>
            <span className="rounded-full bg-stone-800 px-2 py-0.5 text-[10px] font-medium text-stone-300 border border-stone-700">
              Outfit Planning Sparkline
            </span>
          </div>
          <p className="mt-1 text-xs text-stone-400">
            Interactive timeline tracking temperature progression and optimal fabric transitions across Paris
          </p>
        </div>

        {/* 24h Thermal Metrics Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 rounded-xl border border-stone-800 bg-stone-850/80 px-2.5 py-1 text-stone-300">
            <span className="text-stone-400">Min:</span>
            <span className="font-mono font-bold text-sky-300">{formatTemp(minTemp)}</span>
            <span className="text-stone-500 text-[10px]">({minPoint?.time})</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-stone-800 bg-stone-850/80 px-2.5 py-1 text-stone-300">
            <span className="text-stone-400">Max:</span>
            <span className="font-mono font-bold text-amber-300">{formatTemp(maxTemp)}</span>
            <span className="text-stone-500 text-[10px]">({maxPoint?.time})</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 font-medium text-amber-300">
            <Layers className="h-3.5 w-3.5" />
            <span>Δ {tempDelta}°C Range</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Line Chart / Sparkline */}
      <div className="relative mt-3 select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-36 sm:h-44 overflow-visible cursor-crosshair"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <defs>
            {/* Ambient area gradient */}
            <linearGradient id="paris-temp-area-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.32" />
              <stop offset="50%" stopColor="#d97706" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0.0" />
            </linearGradient>

            {/* Glowing stroke gradient */}
            <linearGradient id="paris-temp-stroke-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            {/* Drop shadow for line curve */}
            <filter id="paris-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Background horizontal grid guides */}
          <line
            x1={padLeft}
            y1={padTop}
            x2={chartWidth - padRight}
            y2={padTop}
            stroke="#44403c"
            strokeDasharray="3 3"
            strokeWidth="0.8"
          />
          <line
            x1={padLeft}
            y1={chartHeight - padBottom}
            x2={chartWidth - padRight}
            y2={chartHeight - padBottom}
            stroke="#44403c"
            strokeDasharray="3 3"
            strokeWidth="0.8"
          />
          <line
            x1={padLeft}
            y1={(padTop + chartHeight - padBottom) / 2}
            x2={chartWidth - padRight}
            y2={(padTop + chartHeight - padBottom) / 2}
            stroke="#292524"
            strokeDasharray="2 4"
            strokeWidth="0.8"
          />

          {/* Area under curve */}
          <path d={areaD} fill="url(#paris-temp-area-gradient)" />

          {/* Smooth Temperature Line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#paris-temp-stroke-gradient)"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#paris-glow)"
          />

          {/* Min & Max Annotated Markers */}
          {minPoint && points[minPoint.index] && (
            <g transform={`translate(${points[minPoint.index].x}, ${points[minPoint.index].y})`}>
              <circle r="4" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
              <text
                x="0"
                y="16"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#7dd3fc"
                className="font-mono"
              >
                Min {formatTemp(minTemp)}
              </text>
            </g>
          )}

          {maxPoint && points[maxPoint.index] && (
            <g transform={`translate(${points[maxPoint.index].x}, ${points[maxPoint.index].y})`}>
              <circle r="4" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
              <text
                x="0"
                y="-10"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#fde68a"
                className="font-mono"
              >
                Max {formatTemp(maxTemp)}
              </text>
            </g>
          )}

          {/* Hover / Scrubbed Indicator */}
          {highlightedPoint && (
            <g>
              {/* Vertical scrub line */}
              <line
                x1={highlightedPoint.x}
                y1={padTop - 6}
                x2={highlightedPoint.x}
                y2={chartHeight - padBottom + 6}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Pulsing ring on curve */}
              <circle
                cx={highlightedPoint.x}
                cy={highlightedPoint.y}
                r="7"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                opacity="0.6"
              />
              <circle
                cx={highlightedPoint.x}
                cy={highlightedPoint.y}
                r="3.5"
                fill="#ffffff"
                stroke="#f59e0b"
                strokeWidth="2"
              />
            </g>
          )}

          {/* X-Axis Time Markers (Distributed evenly across the 24 hours) */}
          {points
            .filter((_, idx) => idx === 0 || idx % 4 === 0 || idx === points.length - 1)
            .map((p, idx) => (
              <g key={idx} transform={`translate(${p.x}, ${chartHeight - padBottom + 18})`}>
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#a8a29e"
                  className="font-mono"
                >
                  {p.data.time}
                </text>
              </g>
            ))}
        </svg>

        {/* Floating / Embedded Scrubbed Hour Banner */}
        <div className="mt-2 flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-xl border border-stone-800 bg-stone-850/90 p-3 text-xs shadow-inner">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-800 text-amber-300 border border-stone-700">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-white text-sm">
                  {highlightedPoint ? highlightedPoint.data.time : `Now (${data[0]?.time ?? 'Current'})`}
                </span>
                <span className="font-mono font-bold text-amber-300 text-sm">
                  {formatTemp(highlightedPoint ? highlightedPoint.data.temperature : currentTempC)}
                </span>
                {highlightedPoint?.data.precipitationProbability ? (
                  <span className="flex items-center gap-1 text-[11px] text-sky-400">
                    <CloudRain className="h-3 w-3" />
                    {highlightedPoint.data.precipitationProbability}% Rain
                  </span>
                ) : null}
                <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold border ${currentHourAdvice.badgeColor}`}>
                  {currentHourAdvice.tag}
                </span>
              </div>
              <p className="text-stone-300 mt-0.5">
                <strong className="text-white">Recommended Fabric:</strong> {currentHourAdvice.fabric}
              </p>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-2 md:border-t-0 md:pt-0 md:border-l md:pl-4 text-stone-300 max-w-md">
            <div className="flex items-center gap-1.5 text-stone-400 font-medium mb-0.5 text-[11px]">
              <Shirt className="h-3.5 w-3.5 text-amber-400" />
              <span>Sartorial Outfit Advice for this Hour:</span>
            </div>
            <p className="text-stone-200 italic font-serif leading-relaxed">
              "{currentHourAdvice.advice}"
            </p>
          </div>
        </div>

        {/* 24-Hour Strategy Callout */}
        <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-stone-300">
          <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-300">
                Parisian 24h Outfit Strategy: {dailyStrategy.title}
              </span>
              <span className="rounded-full bg-amber-400/20 px-2 py-0.2 text-[9px] font-bold uppercase tracking-wider text-amber-200 border border-amber-400/30">
                {dailyStrategy.badge}
              </span>
            </div>
            <p className="text-stone-300 leading-relaxed text-[11px]">
              {dailyStrategy.advice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
