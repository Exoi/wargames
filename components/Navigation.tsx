"use client";

import { usePathname } from "next/navigation";
import { PillNav } from "./PillNav";

const items = [
  { href: "/", label: "Briefing" },
  { href: "/tactics", label: "Tactics" },
  { href: "/intel", label: "Intel" },
  { href: "https://discord.gg/aZMZSedmde", label: "Join Discord" },
  { href: "/enlist", label: "Sign up to newsletter" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[72px]">
      <PillNav
        logo="/pillnav-logo.png"
        logoAlt="War Games pill nav logo"
        items={items}
        activeHref={pathname}
        baseColor="transparent"
        pillColor="transparent"
        pillTextColor="#C8C8C8"
        hoveredPillTextColor="#F0F0F0"
        ease="power3.out"
        initialLoadAnimation
      />
    </header>
  );
}
