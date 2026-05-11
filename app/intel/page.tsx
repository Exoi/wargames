import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Intel",
  description: "Patch notes, operation reports, maintenance windows, and command transmissions.",
};

const entries = [
  { id: "intel-slot-01", date: "", tag: "Patch Notes", title: "Game Update 0.001a", excerpt: "" },
  { id: "intel-slot-02", date: "", tag: "Operation Report", title: "", excerpt: "" },
  { id: "intel-slot-03", date: "", tag: "Maintenance Window", title: "", excerpt: "" },
  { id: "intel-slot-04", date: "", tag: "Announcement", title: "", excerpt: "" },
];

export default function IntelPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      <section className="container-grid section-pad">
        <div className="mb-14 max-w-3xl">
          <p className="terminal-label text-crimson"></p>
          <h1 className="display-heading mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-none text-white">Intel</h1>
          <p className="mt-5 text-lg leading-8 text-ash">
            Patch notes, operation reports, maintenance windows, and announcements.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl before:absolute before:left-1/2 before:top-0 before:hidden before:h-full before:w-px before:bg-carbon lg:before:block">
          {entries.map((entry, index) => (
            <article
              key={entry.id}
              className={`relative mb-8 min-h-56 rounded-card border border-carbon bg-gunmetal/70 p-6 transition-all hover:border-crimson hover:bg-carbon/80 lg:w-[calc(50%-32px)] ${
                index % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
              }`}
            >
              <span className="inline-flex min-h-6 min-w-20 rounded-full border border-dust/40 bg-carbon/50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
                {entry.tag}
              </span>
              <p className="mt-5 min-h-4 font-mono text-xs uppercase tracking-[0.18em] text-crimson">{entry.date}</p>
              <h2 className="display-heading mt-3 min-h-8 text-2xl text-white">{entry.title}</h2>
              <p className="mt-4 min-h-16 text-sm leading-7 text-ash">{entry.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
