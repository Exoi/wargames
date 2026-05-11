"use client";

import Image from "next/image";
import { useState } from "react";
import { publicPath } from "@/lib/publicPath";

const maps = [
  {
    name: "Safehouse Raid",
    objective: "Rescue The Hostage",
    location: "Urban Edge",
    mode: "Secure",
    difficulty: "Veteran",
    estimatedTime: "15–20 Min",
    threatLevel: "High",
    coordinates: "32.5866° N, 74.0209° W",
    grid: "34S BR 2476 21",
    tip: "Secure the hostage, control interior choke points, and maintain extraction coverage on the eastern perimeter.",
  },
];

export function TacticsSelector() {
  const [active, setActive] = useState(maps[0]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="corner-brackets relative aspect-[16/10] overflow-hidden rounded-card border border-blood bg-void">
          <Image
            src={publicPath("/tactics-safehouse-map.png")}
            alt="Top-down safehouse tactical map with enemy zone, entry point, and extraction zone"
            fill
            sizes="(min-width: 1024px) calc(100vw - 424px), calc(100vw - 32px)"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.06),rgba(5,5,5,0.34))]" />
          <div className="absolute left-6 top-6 rounded-button border border-blood bg-void/70 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[#f1f4dc] backdrop-blur-sm">
            {active.name}
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {maps.map((map) => (
            <button
              key={map.name}
              type="button"
              onClick={() => setActive(map)}
              className={`rounded-card border p-4 text-left transition-all ${
                active.name === map.name ? "border-crimson bg-[rgba(204,0,0,0.1)]" : "border-carbon bg-gunmetal hover:border-blood"
              }`}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-dust">Map Preview</span>
              <span className="display-heading mt-2 block text-lg text-bone">{map.name}</span>
            </button>
          ))}
        </div>
      </div>

      <aside className="rounded-card border border-carbon bg-gunmetal p-6">
        <p className="terminal-label text-[#f1f4dc]">Operation Dossier</p>
        <h2 className="display-heading mt-4 text-3xl text-white">{active.name}</h2>
        <dl className="mt-6 grid gap-4 font-mono text-sm">
          <div className="flex justify-between gap-4 border-b border-carbon pb-3">
            <dt className="text-dust">OBJECTIVE</dt>
            <dd className="text-bone">{active.objective}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-carbon pb-3">
            <dt className="text-dust">LOCATION</dt>
            <dd className="text-bone">{active.location}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-carbon pb-3">
            <dt className="text-dust">MODE</dt>
            <dd className="text-bone">{active.mode}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-carbon pb-3">
            <dt className="text-dust">DIFFICULTY</dt>
            <dd className="font-semibold text-[#f1f4dc]">{active.difficulty}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-carbon pb-3">
            <dt className="text-dust">EST. TIME</dt>
            <dd className="text-bone">{active.estimatedTime}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-carbon pb-3">
            <dt className="text-dust">THREAT LEVEL</dt>
            <dd className="font-semibold text-[#f1f4dc]">{active.threatLevel}</dd>
          </div>
          <div className="grid gap-1 border-b border-carbon pb-3">
            <dt className="text-dust">COORDINATES</dt>
            <dd className="text-bone">{active.coordinates}</dd>
          </div>
          <div className="grid gap-1 border-b border-carbon pb-3">
            <dt className="text-dust">GRID</dt>
            <dd className="text-bone">{active.grid}</dd>
          </div>
        </dl>
        <div className="mt-8 border-l-4 border-blood bg-void p-4">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#f1f4dc]">Tactical Advantage</p>
          <p className="mt-3 text-sm leading-6 text-ash">{active.tip}</p>
        </div>
      </aside>
    </div>
  );
}
