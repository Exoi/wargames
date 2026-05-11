import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-void px-6 pt-[72px] text-center">
      <section className="max-w-xl rounded-card border border-blood bg-gunmetal p-10">
        <p className="terminal-label text-crimson">404 / Dead Channel</p>
        <h1 className="display-heading mt-5 text-[clamp(2.5rem,8vw,5rem)] leading-none text-white">
          Signal Lost<span className="animate-[activePulse_1s_linear_infinite] text-crimson"> |</span>
        </h1>
        <p className="mt-5 text-ash">The requested transmission is outside command range. Return to base and re-establish uplink.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-button bg-crimson px-8 py-4 font-mono text-xs uppercase tracking-[0.16em] text-white transition-all hover:bg-tactical-red hover:shadow-[0_0_30px_rgba(255,26,26,0.3)]"
        >
          Return To Base
        </Link>
      </section>
    </main>
  );
}
