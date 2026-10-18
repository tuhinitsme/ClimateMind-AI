"use client";

import React from "react";

export default function EmergencyContacts({ hazardType, district }: { hazardType?: string; district?: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {/* Emergency Hotline Card */}
      <div className="bg-slate-900/80 border border-red-500/30 rounded-xl p-4 space-y-2 shadow-lg">
        <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
          <span>🚨</span> National Emergency
        </div>
        <p className="text-2xl font-extrabold text-white">999</p>
        <p className="text-xs text-slate-400">Police, Fire Service, and Ambulance dispatch across Bangladesh.</p>
      </div>

      {/* Meteorological Warning Card */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-xl p-4 space-y-2 shadow-lg">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <span>⚠️</span> BMD Weather Alert
        </div>
        <p className="text-lg font-bold text-white">Bangladesh Meteorological Dept</p>
        <p className="text-xs text-slate-400">Monitoring maritime ports & inland river ports for severe weather.</p>
      </div>

      {/* Local Shelter & Relief Card */}
      <div className="bg-slate-900/80 border border-emerald-500/30 rounded-xl p-4 space-y-2 shadow-lg">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <span>🛡️</span> Local Shelter Status
        </div>
        <p className="text-base font-bold text-white">{district ? `${district} Multi-Purpose Shelters` : "Upazila Shelters Active"}</p>
        <p className="text-xs text-slate-400">CPP (Cyclone Preparedness Programme) volunteers on standby.</p>
      </div>
    </div>
  );
}