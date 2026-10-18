"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import HazardSelector, { HazardQuery } from "./components/HazardSelector";
import RiskMapCard from "./components/RiskMapCard";
import EmergencyContacts from "./components/EmergencyContacts";

export default function ClimateMindDashboard() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState<HazardQuery | null>(null);

  const handleAnalyzeHazard = async (query: HazardQuery) => {
    setCurrentQuery(query);
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.text);
      } else {
        setResponse(`Error: ${data.error || "Failed to fetch insight"}`);
      }
    } catch (err: any) {
      setResponse(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-green-950 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center space-y-3">
          <div className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs md:text-sm font-medium tracking-wide">
            Google Cloud AI Builder Cup 2026 Submission
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">
            ClimateMind AI 🌿
          </h1>
          <p className="text-emerald-300 font-medium text-xs md:text-sm tracking-widest uppercase">
            Predict. Prepare. Protect. (বাংলাদেশ জলবায়ু সহনশীলতা)
          </p>

          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Translating raw regional climate data into actionable localized safety guidance using Gemini AI.
          </p>
        </header>

        {/* Hazard Selector Module */}
        <HazardSelector onAnalyze={handleAnalyzeHazard} loading={loading} />

        {/* AI Markdown Response Area */}
        {response && (
          <div className="space-y-6">
            {/* GIS Telemetry Card */}
            <RiskMapCard query={currentQuery} />

            <div className="p-6 md:p-8 bg-slate-900/90 border border-emerald-500/30 rounded-2xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <span>🛡️</span> Localized Climate Resilience Report ({currentQuery?.district}, {currentQuery?.division})
                </h3>
              </div>
              <div className="prose prose-invert max-w-none text-slate-200 leading-relaxed space-y-3 text-sm md:text-base">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {response}
                </ReactMarkdown>
              </div>
            </div>

            {/* Emergency Contacts & Resources */}
            <EmergencyContacts hazardType={currentQuery?.hazardType} district={currentQuery?.district} />
          </div>
        )}

      </div>
    </main>
  );
}