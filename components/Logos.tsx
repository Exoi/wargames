export function UnitInsignia({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label="War Games unit insignia"
    >
      <path d="M6 6h11l7 28 8-28h9l8 28 7-28h11L53 58H42l-6-22-7 22H18L6 6Z" fill="currentColor" />
      <path d="M24 38h16v8l-8 6-8-6v-8Z" fill="#050505" />
    </svg>
  );
}

export function WarGamesWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="display-heading inline-flex items-center gap-3 text-white">
      <span className="text-[1.55rem] leading-none tracking-[0.12em]">
        {compact ? "WG" : "WAR GAMES"}
      </span>
    </span>
  );
}

export function CommandRoundel({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label="War Games command roundel"
    >
      <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M18 17h8l4 20 5-20h7l5 20 4-20h8L51 48h-9l-4-15-5 15h-9L18 17Z" fill="currentColor" />
      <path d="M27 43h10v5l-5 4-5-4v-5Z" fill="#050505" />
    </svg>
  );
}
