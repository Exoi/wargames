import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Gamepad2, Monitor } from "lucide-react";
import { publicPath } from "@/lib/publicPath";

type Platform = {
  label: string;
  Icon?: LucideIcon;
  image?: string;
};

const platforms: Platform[] = [
  { label: "Windows PC", Icon: Monitor },
  { label: "Steam", image: publicPath("/steam-logo.png") },
  { label: "Console TBD", Icon: Gamepad2 },
];

export default function Home() {
  return (
    <main className="h-screen overflow-hidden">
      <section className="relative flex h-screen items-center justify-center overflow-hidden px-4 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(5,5,5,0.08),rgba(5,5,5,0.42))]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.32em] text-zinc-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Tactical Strategy. Real Consequences.
          </p>
          <h1 className="mt-5 flex justify-center">
            <span className="sr-only">War Games</span>
            <Image
              src={publicPath("/WARGAMES-transparent.png")}
              alt=""
              width={780}
              height={160}
              className="h-auto w-[min(86vw,780px)] drop-shadow-[0_8px_30px_rgba(0,0,0,0.85)]"
              priority
            />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-bone drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            A top-down 2.5D tactical strategy game about planning breaches, clearing rooms, rescuing hostages,
            and surviving high-risk close-quarters operations.
          </p>
          <div className="mt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">Playable on</p>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {platforms.map((platform) => (
                <div
                  key={platform.label}
                  className="flex min-w-[170px] items-center justify-center gap-2 border border-white/20 bg-black/45 px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.16em] text-white shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm"
                >
                  {platform.image ? (
                    <Image src={platform.image} alt="" width={16} height={16} className="h-4 w-4 object-contain invert" />
                  ) : platform.Icon ? (
                    <platform.Icon className="h-4 w-4 text-zinc-300" strokeWidth={1.8} aria-hidden="true" />
                  ) : null}
                  <span>{platform.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/enlist"
              className="min-w-[220px] rounded-button border border-white/20 bg-zinc-900/90 px-8 py-4 text-center font-mono text-xs uppercase tracking-[0.16em] text-white transition-all duration-300 ease-tactical hover:border-white/50 hover:bg-zinc-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
            >
              Sign Up To Newsletter
            </Link>
            <Link
              href="/team"
              className="min-w-[220px] rounded-button border border-white/20 bg-zinc-900/90 px-8 py-4 text-center font-mono text-xs uppercase tracking-[0.16em] text-white transition-all duration-300 ease-tactical hover:border-white/50 hover:bg-zinc-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
            >
              View Team
            </Link>
          </div>
        </div>
        <div className="absolute bottom-5 left-5 z-20">
          <Image
            src={publicPath("/pillnav-logo.png")}
            alt="War Games"
            width={96}
            height={96}
            className="h-24 w-24 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]"
            priority
          />
        </div>
      </section>
    </main>
  );
}
