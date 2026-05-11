"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

export function TacticalCard({
  title,
  body,
  data,
  children,
}: {
  title: string;
  body: string;
  data: string;
  children: ReactNode;
}) {
  const [flash, setFlash] = useState(false);

  return (
    <motion.button
      type="button"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      onClick={() => {
        setFlash(true);
        window.setTimeout(() => setFlash(false), 200);
      }}
      className={`scanline group flex min-h-[400px] w-full flex-col overflow-hidden rounded-card border bg-gunmetal text-left transition-all duration-300 ease-tactical hover:border-crimson hover:bg-carbon hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${
        flash ? "bg-[rgba(204,0,0,0.2)]" : "border-carbon"
      }`}
    >
      <span className="h-0.5 w-full bg-crimson transition-all duration-300 group-hover:h-1" />
      <span className="grid min-h-[42%] place-items-center border-b border-carbon p-8 text-crimson" aria-hidden="true">
        {children}
      </span>
      <span className="flex flex-1 flex-col p-7">
        <span className="display-heading text-xl text-bone">{title}</span>
        <span className="mt-4 line-clamp-3 text-sm leading-6 text-ash">{body}</span>
        <span className="mt-auto border-t border-carbon pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-dust transition-colors group-hover:text-crimson">
          {data}
        </span>
      </span>
    </motion.button>
  );
}

export function CrosshairIcon({ linked = false }: { linked?: boolean }) {
  return (
    <svg viewBox="0 0 160 120" className="h-28 w-36" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
      <circle cx={linked ? 54 : 80} cy="60" r="28" />
      <path d={linked ? "M54 20v18M54 82v18M14 60h18M76 60h18" : "M80 16v24M80 80v24M36 60h24M100 60h24"} />
      {linked ? (
        <>
          <circle cx="106" cy="60" r="28" />
          <path d="M106 20v18M106 82v18M66 60h80M80 40l-12-12M80 80l-12 12" />
        </>
      ) : null}
    </svg>
  );
}

export function RadarIcon() {
  return (
    <svg viewBox="0 0 160 120" className="h-28 w-36" fill="none" stroke="currentColor" strokeWidth="4">
      <circle cx="80" cy="62" r="42" opacity="0.7" />
      <circle cx="80" cy="62" r="22" opacity="0.45" />
      <path d="M80 62 125 24" />
      <path d="M38 88c18 24 64 24 84 0" opacity="0.65" />
      <path d="M20 104h120" />
    </svg>
  );
}
