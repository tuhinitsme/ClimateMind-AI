"use client";

import React, { useState, useEffect } from "react";

export interface HazardQuery {
  division: string;
  district: string;
  hazardType: "Cyclone" | "Flood" | "Flash Flood" | "Heatwave" | "Salinity";
  language: "bn" | "en";
}

interface Props {
  onAnalyze: (query: HazardQuery) => void;
  loading: boolean;
}

const BANGLA_DIVISIONS = [
  {
    name: "Chattogram",
    districts: ["Cox's Bazar", "Chattogram", "Feni", "Noakhali", "Lakshmipur", "Chandpur", "Comilla", "Khagrachhari", "Rangamati", "Bandarban", "Brahmanbaria"],
  },
  {
    name: "Dhaka",
    districts: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Faridpur", "Manikganj", "Munshiganj", "Narsingdi", "Rajbari", "Shariatpur", "Gopalganj", "Kishoreganj", "Madaripur"],
  },
  {
    name: "Sylhet",
    districts: ["Sylhet", "Sunamganj", "Habiganj", "Moulvibazar"],
  },
  {
    name: "Rangpur",
    districts: ["Kurigram", "Rangpur", "Gaibandha", "Nilphamari", "Dinajpur", "Lalmonirhat", "Panchagarh", "Thakurgaon"],
  },
  {
    name: "Barishal",
    districts: ["Barishal", "Bhola", "Patuakhali", "Barguna", "Pirojpur", "Jhalokati"],
  },
  {
    name: "Khulna",
    districts: ["Satkhira", "Khulna", "Bagerhat", "Jessore", "Jhenaidah", "Magura", "Narail", "Kushtia", "Chuadanga", "Meherpur"],
  },
  {
    name: "Rajshahi",
    districts: ["Rajshahi", "Bogra", "Pabna", "Sirajganj", "Naogaon", "Natore", "Chapai Nawabganj", "Joypurhat"],
  },
  {
    name: "Mymensingh",
    districts: ["Mymensingh", "Netrokona", "Jamalpur", "Sherpur"],
  },
];

export default function HazardSelector({ onAnalyze, loading }: Props) {
  const [selectedDivision, setSelectedDivision] = useState("Chattogram");
  const [selectedDistrict, setSelectedDistrict] = useState("Cox's Bazar");
  const [hazardType, setHazardType] = useState<HazardQuery["hazardType"]>("Cyclone");
  const [language, setLanguage] = useState<"bn" | "en">("bn");

  // Keep district list in sync whenever Division changes
  const activeDivisionObj = BANGLA_DIVISIONS.find((d) => d.name === selectedDivision);
  const currentDistricts = activeDivisionObj ? activeDivisionObj.districts : [];

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDivision = e.target.value;
    setSelectedDivision(newDivision);
    const divObj = BANGLA_DIVISIONS.find((d) => d.name === newDivision);
    if (divObj && divObj.districts.length > 0) {
      setSelectedDistrict(divObj.districts[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze({
      division: selectedDivision,
      district: selectedDistrict,
      hazardType,
      language,
    });
  };

  return (
    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-3 gap-3">
        <h2 className="text-base sm:text-lg font-bold text-emerald-400 flex items-center gap-2">
          📍 Select Location & Hazard / স্থান ও দুর্যোগ নির্বাচন
        </h2>
        {/* Language Toggle */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setLanguage("bn")}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              language === "bn"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            বাংলা
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              language === "en"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            English
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Division Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Division / বিভাগ
          </label>
          <select
            value={selectedDivision}
            onChange={handleDivisionChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-sm cursor-pointer"
          >
            {BANGLA_DIVISIONS.map((div) => (
              <option key={div.name} value={div.name}>
                {div.name}
              </option>
            ))}
          </select>
        </div>

        {/* District Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            District / জেলা ({currentDistricts.length})
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-sm cursor-pointer"
          >
            {currentDistricts.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Hazard Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Climate Hazard / দুর্যোগ
          </label>
          <select
            value={hazardType}
            onChange={(e) =>
              setHazardType(e.target.value as HazardQuery["hazardType"])
            }
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-sm cursor-pointer"
          >
            <option value="Cyclone">🌀 Cyclone / ঘূর্ণিবাতাস</option>
            <option value="Flood">🌊 River Flood / নদী বন্যা</option>
            <option value="Flash Flood">⚡ Flash Flood / আকস্মিক বন্যা</option>
            <option value="Heatwave">☀️ Heatwave / তীব্র তাপদাহ</option>
            <option value="Salinity">🧂 Salinity / লবণাক্ততা</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-950/50 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? "Generating Regional Advisory..." : "⚡ Generate Climate Resilience Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}