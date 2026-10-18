import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing in backend environment variables." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const body = await req.json();

    let promptText = "";

    if (body.division && body.district && body.hazardType) {
      const { division, district, hazardType, language } = body;
      const isBn = language === "bn";

      promptText = `
You are ClimateMind AI, a climate resilience specialist for Bangladesh.
Provide a localized safety report for:
Location: ${district} District, ${division} Division, Bangladesh.
Climate Hazard: ${hazardType}

Language Requirement: ${isBn ? "Respond ENTIRELY in clear Bengali (বাংলা)." : "Respond in English."}

Include the following structured Markdown sections:
1. ### ${isBn ? "ঝুঁকি ও বর্তমান পরিস্থিতি" : "Current Risk Assessment"}
2. ### ${isBn ? "জরুরি পদক্ষেপ ও পূর্বপ্রস্তুতি" : "Immediate Action Plan"}
3. ### ${isBn ? "আশ্রয়কেন্দ্র ও জরুরি যোগাযোগ" : "Evacuation & Emergency Guidance"}
4. ### ${isBn ? "দীর্ঘমেয়াদী সহনশীলতা পরামর্শ" : "Long-Term Resilience Strategy"}
      `;
    } else {
      promptText = body.prompt || "Provide a climate resilience insight for Bangladesh.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate report" },
      { status: 500 }
    );
  }
}