import type { Metadata } from "next";
import { TacticsSelector } from "@/components/TacticsSelector";

export const metadata: Metadata = {
  title: "Tactics",
  description: "Study maps, modes, and tactical advantage notes before deployment.",
};

export default function TacticsPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      <section className="container-grid section-pad">
        <div className="mb-12 max-w-3xl">
          <p className="terminal-label text-crimson"></p>
          <h1 className="display-heading mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-none text-white">Tactics</h1>
          <p className="mt-5 text-lg leading-8 text-ash">
            Select a combat theater, read terrain constraints, and identify the advantage before entering the hot zone.
          </p>
        </div>
        <TacticsSelector />
      </section>
    </main>
  );
}
