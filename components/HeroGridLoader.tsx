"use client";

import dynamic from "next/dynamic";

export const HeroGridLoader = dynamic(() => import("./HeroGrid").then((mod) => mod.HeroGrid), {
  ssr: false,
});
