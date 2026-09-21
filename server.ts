import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Open-Meteo Weather API for Paris (Lat: 48.8566, Lon: 2.3522)
app.get("/api/weather/paris", async (req, res) => {
  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max&timezone=Europe%2FParis";
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Open-Meteo responded with status: ${response.status}`);
    }
    const data = await response.json();
    return res.json({ success: true, data, source: "live" });
  } catch (error: any) {
    console.error("Error fetching Paris live weather:", error?.message);
    // Reliable fallback for Paris
    const fallbackData = {
      current: {
        temperature_2m: 18.5,
        apparent_temperature: 17.8,
        relative_humidity_2m: 62,
        is_day: 1,
        precipitation: 0.0,
        weather_code: 1, // Mainly clear
        cloud_cover: 25,
        wind_speed_10m: 12.4,
        wind_direction_10m: 230
      },
      hourly: {
        time: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
        temperature_2m: [14, 13, 13, 12, 12, 13, 15, 17, 19, 21, 22, 22, 21, 20, 19, 18, 17, 16, 15, 15, 14, 14, 13, 13],
        relative_humidity_2m: [75, 78, 80, 82, 80, 75, 68, 62, 55, 50, 48, 48, 52, 58, 64, 70, 72, 75, 78, 80, 80, 82, 82, 84],
        precipitation_probability: [0, 0, 0, 5, 5, 0, 0, 10, 10, 15, 10, 5, 0, 0, 0, 0, 0, 5, 5, 10, 10, 5, 0, 0],
        weather_code: [1, 1, 1, 2, 2, 1, 1, 2, 2, 3, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1],
        wind_speed_10m: [8, 7, 7, 6, 8, 10, 11, 13, 14, 15, 16, 15, 14, 12, 10, 9, 8, 8, 7, 7, 6, 6, 7, 8]
      },
      daily: {
        time: ["Today", "Tomorrow", "Wed", "Thu", "Fri", "Sat", "Sun"],
        weather_code: [1, 2, 3, 61, 2, 1, 0],
        temperature_2m_max: [22, 20, 18, 17, 19, 23, 24],
        temperature_2m_min: [12, 11, 10, 11, 10, 12, 13],
        precipitation_probability_max: [10, 25, 40, 70, 20, 5, 0],
        uv_index_max: [5.2, 4.8, 3.9, 2.5, 4.5, 6.0, 6.2]
      }
    };
    return res.json({ success: true, data: fallbackData, source: "fallback" });
  }
});

// Gemini-Powered Sartorial Stylist with Fabric Focus
app.post("/api/stylist/paris", async (req, res) => {
  try {
    const { temperature, condition, humidity, windSpeed, occasion, genderPreference, userQuery } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(200).json({
        success: false,
        isCustomAi: false,
        message: "Gemini API key is not configured in environment. Using smart deterministic Parisian sartorial engine.",
      });
    }

    const prompt = `You are a Parisian fashion consultant and wardrobe expert located in Paris.
A client needs an outfit recommendation for Paris weather with practical advice on everyday fabrics (keep fabrics simple and accessible: 100% Cotton, Wool, Pure Linen, Denim, Genuine Leather, Fleece, Silk).

Current Meteorological Data for Paris:
- Temperature: ${temperature}°C (${Math.round((temperature * 9/5) + 32)}°F)
- Sky / Weather condition: ${condition || 'Clear/Mild'}
- Relative Humidity: ${humidity || 60}%
- Wind Speed: ${windSpeed || 10} km/h
- Occasion / Activity: ${occasion || 'Casual Parisian Stroll / Café'}
- Style / Silhouette Preference: ${genderPreference || 'All / Fluid'}
${userQuery ? `- Client specific question/note: "${userQuery}"` : ''}

Provide a structured, chic, and accessible clothing recommendation in JSON format.
Focus on simple, everyday natural fabrics (Cotton, Wool, Linen, Denim, Leather, Fleece) for breathability, moisture absorption, temperature regulation, and classic Parisian comfort.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the head sartorial stylist and textile expert for Paris Weather & Fashion. You provide elegant, practical, and scientifically precise fabric and outfit breakdowns. Always respond strictly in valid JSON matching the schema.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING, description: "A stylish Parisian outfit title (e.g., 'Flâneur Chic in Poplin & Wool')" },
            summary: { type: Type.STRING, description: "1-2 sentence overview of the ensemble and why it matches current Paris weather" },
            overallComfortScore: { type: Type.NUMBER, description: "Score from 1 to 10 of how comfortable this is for the weather" },
            layeringStrategy: { type: Type.STRING, description: "Explanation of base, mid, and outer layers for Paris temperature fluctuations" },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING, description: "Outerwear, Top, Bottom, Footwear, or Accessory" },
                  garmentName: { type: Type.STRING, description: "Name of garment (e.g. Classic Trench Coat, Breton Striped Top, Pleated Trousers)" },
                  primaryFabric: { type: Type.STRING, description: "Main fabric name (e.g. 100% Normandy Linen, Cotton Gabardine, 18.5 Micron Merino Wool)" },
                  fabricWeightGsm: { type: Type.STRING, description: "Fabric weight (e.g. 180 GSM, 240 GSM, 450 GSM)" },
                  fabricProperties: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Key textile properties e.g. ['High Breathability', 'Natural Moisture Wicking', 'Water-Repellent DWR Finish']"
                  },
                  whyThisFabric: { type: Type.STRING, description: "Textile science reason why this fabric suits this specific temperature/condition" },
                  stylingTip: { type: Type.STRING, description: "Parisian aesthetic touch (e.g., 'Wear with unbuttoned collar', 'Tuck slightly into high-waist band')" }
                },
                required: ["category", "garmentName", "primaryFabric", "fabricProperties", "whyThisFabric", "stylingTip"]
              }
            },
            fabricsToAvoid: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  fabric: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ["fabric", "reason"]
              }
            },
            parisianTouch: { type: Type.STRING, description: "A quintessential French sartorial nuance for the day" },
            dayToNightAdvice: { type: Type.STRING, description: "How to transition this look from afternoon terrace to Parisian evening restaurant" }
          },
          required: ["headline", "summary", "overallComfortScore", "layeringStrategy", "items", "fabricsToAvoid", "parisianTouch", "dayToNightAdvice"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json({ success: true, isCustomAi: true, data: parsedData });
  } catch (err: any) {
    console.error("Gemini stylist error:", err?.message);
    return res.status(500).json({ success: false, error: err?.message });
  }
});

// Vite middleware & Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Paris Weather & Fabric Guide Server running on http://localhost:${PORT}`);
  });
}

startServer();
