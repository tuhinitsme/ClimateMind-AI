"use client";

import React from "react";
import { HazardQuery } from "./HazardSelector";

interface Props {
  query: HazardQuery | null;
}

export default function RiskMapCard({ query }: Props) {
  if (!query) return null;

  // Simulated telemetry data based on hazard type for demo impact
  const getTelemetry = () => {
    switch (query.hazardType) {
      case "Cyclone":
        return { metric: "Wind Velocity", value: "145 km/h", status: "Severe Danger (Signal 7)", color: "text-red-400 border-red-500/30 bg-red-950/20" };
      case "Flood":
      case "Flash Flood":
        return { metric: "Water Level / Danger Mark", value: "+1.2m above danger level", status: "Critical Overflow", color: "text-orange-400 border-orange-500/30 bg-orange-950/20" };
      case "Heatwave":
        return { metric: "Feels-Like Temperature", value: "42°C - 45°C", status: "Extreme Heat Alert", color: "text-amber-400 border-amber-500/30 bg-amber-950/20" };
      default:
        return { metric: "Soil Salinity Index", value: "12.4 dS/m", status: "High Salinity Intrusion", color: "text-yellow-400 border-yellow-500/30 bg-yellow-950/20" };
    }
  };

  const tele = getTelemetry();

  return (
    <div className={`border rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-4 ${tele.color}`}>
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <h4 className="font-bold text-sm tracking-wider uppercase flex items-center gap-2">
          <span>📡</span> GIS & Telemetry Risk Matrix — {query.district}, {query.division}
        </h4>
        <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-xs font-semibold">
          Live Feed Active 🟢
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <p className="text-xs text-slate-400">Selected Hazard</p>
          <p className="text-lg font-extrabold text-white mt-1">{query.hazardType}</p>
        </div>
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <p className="text-xs text-slate-400">{tele.metric}</p>
          <p className="text-lg font-extrabold text-white mt-1">{tele.value}</p>
        </div>
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <p className="text-xs text-slate-400">Threat Status</p>
          <p className="text-sm font-bold mt-1 text-emerald-300">{tele.status}</p>
        </div>
      </div>
    </div>
  );
}