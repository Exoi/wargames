const feed = [
  ["SERVER STATUS", "ONLINE"],
  ["ACTIVE OPERATIONS", "1,247"],
  ["CASUALTIES", "0.04%"],
  ["WEATHER", "CLEAR"],
  ["NEXT DEPLOYMENT", "14:00 UTC"],
  ["GRID", "R-17 / BLACKWATER"],
];

export function StatusTicker() {
  const items = [...feed, ...feed, ...feed];

  return (
    <section className="h-12 overflow-hidden border-y border-carbon bg-gunmetal" aria-label="Live operations status">
      <div className="flex h-full w-max items-center animate-[ticker_20s_linear_infinite] whitespace-nowrap font-mono text-xs uppercase tracking-[0.16em] text-ash">
        {items.map(([label, value], index) => (
          <span key={`${label}-${index}`} className="mx-8">
            {label}: <span className="text-crimson">{value}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
