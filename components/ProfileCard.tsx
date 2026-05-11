"use client";

import Image from "next/image";
import { CSSProperties, PointerEvent, useCallback, useMemo, useRef } from "react";

const DEFAULT_INNER_GRADIENT = "linear-gradient(145deg, rgba(82,82,91,0.34) 0%, rgba(24,24,27,0.76) 56%, rgba(5,5,5,0.96) 100%)";

type ProfileCardProps = {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  flags?: {
    src?: string;
    alt: string;
    label?: string;
    colors?: string[];
  }[];
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  miniAvatarUrl?: string;
  name: string;
  title: string;
  handle: string;
  status?: string;
  contactText?: string;
  contactHref?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
};

type ProfileCardStyle = CSSProperties & {
  "--icon": string;
  "--grain": string;
  "--inner-gradient": string;
  "--behind-glow-color": string;
  "--behind-glow-size": string;
};

const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);
const round = (value: number, precision = 3) => Number.parseFloat(value.toFixed(precision));
const adjust = (value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

export function ProfileCard({
  avatarUrl,
  iconUrl,
  grainUrl,
  flags = [],
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor = "rgba(148, 163, 184, 0.26)",
  behindGlowSize = "42%",
  className = "",
  enableTilt = true,
  miniAvatarUrl,
  name,
  title,
  handle,
  status = "Active",
  contactText = "View Dossier",
  contactHref,
  showUserInfo = true,
  onContactClick,
}: ProfileCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const resolvedMiniAvatarUrl = miniAvatarUrl || avatarUrl;
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const cardStyle = useMemo<ProfileCardStyle>(
    () => ({
      "--icon": iconUrl ? `url(${iconUrl})` : "none",
      "--grain": grainUrl ? `url(${grainUrl})` : "none",
      "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
      "--behind-glow-color": behindGlowColor,
      "--behind-glow-size": behindGlowSize,
    }),
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize],
  );

  const setPointerVars = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    const shell = shellRef.current;
    if (!wrap || !shell || !enableTilt) return;

    const rect = shell.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const percentX = clamp((100 / (rect.width || 1)) * x);
    const percentY = clamp((100 / (rect.height || 1)) * y);
    const centerX = percentX - 50;
    const centerY = percentY - 50;

    wrap.style.setProperty("--pointer-x", `${percentX}%`);
    wrap.style.setProperty("--pointer-y", `${percentY}%`);
    wrap.style.setProperty("--background-x", `${adjust(percentX, 0, 100, 35, 65)}%`);
    wrap.style.setProperty("--background-y", `${adjust(percentY, 0, 100, 35, 65)}%`);
    wrap.style.setProperty("--pointer-from-center", `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`);
    wrap.style.setProperty("--pointer-from-top", `${percentY / 100}`);
    wrap.style.setProperty("--pointer-from-left", `${percentX / 100}`);
    wrap.style.setProperty("--rotate-x", `${round(-(centerX / 6))}deg`);
    wrap.style.setProperty("--rotate-y", `${round(centerY / 5)}deg`);
  }, [enableTilt]);

  const resetPointerVars = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap || !enableTilt) return;

    wrap.style.setProperty("--pointer-x", "50%");
    wrap.style.setProperty("--pointer-y", "50%");
    wrap.style.setProperty("--background-x", "50%");
    wrap.style.setProperty("--background-y", "50%");
    wrap.style.setProperty("--pointer-from-center", "0");
    wrap.style.setProperty("--pointer-from-top", "0.5");
    wrap.style.setProperty("--pointer-from-left", "0.5");
    wrap.style.setProperty("--rotate-x", "0deg");
    wrap.style.setProperty("--rotate-y", "0deg");
  }, [enableTilt]);

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className}`.trim()}
      style={cardStyle}
      onPointerEnter={setPointerVars}
      onPointerMove={setPointerVars}
      onPointerLeave={resetPointerVars}
    >
      {behindGlowEnabled ? <div className="pc-behind" /> : null}
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card" aria-label={`${name}, ${title}`}>
          <div className="pc-inside">
            <div className="pc-shine" />
            <div className="pc-glare" />
            <div className="pc-content pc-avatar-content">
              {avatarUrl ? <Image className="avatar" src={avatarUrl} alt={`${name} avatar`} width={512} height={640} unoptimized /> : null}
              {showUserInfo ? (
                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-mini-avatar">
                      {resolvedMiniAvatarUrl ? (
                        <Image src={resolvedMiniAvatarUrl} alt="" width={96} height={96} unoptimized />
                      ) : (
                        <span aria-hidden="true">{initials}</span>
                      )}
                    </div>
                    <div className="pc-user-text">
                      <div className="pc-handle">@{handle}</div>
                      <div className="pc-status">{status}</div>
                    </div>
                  </div>
                  {contactHref ? (
                    <a className="pc-contact-btn" href={contactHref} target="_blank" rel="noreferrer" aria-label={`Contact ${name} on Discord`}>
                      {contactText}
                    </a>
                  ) : (
                    <button className="pc-contact-btn" onClick={onContactClick} type="button" aria-label={`Open dossier for ${name}`}>
                      {contactText}
                    </button>
                  )}
                </div>
              ) : null}
            </div>
            <div className="pc-content">
              <div className="pc-details">
                <h3>{name}</h3>
                <p>{title}</p>
                {flags.length > 0 ? (
                  <div className="pc-flags" aria-label={`${name} flags`}>
                    {flags.map((flag) => {
                      const flagLabel = flag.label ?? flag.alt.replace(/\s+flag$/i, "");

                      return (
                        <span className="pc-flag" key={`${name}-${flag.alt}`} title={flagLabel} data-label={flagLabel}>
                          <span
                            className="pc-flag-art"
                            style={
                              flag.colors
                                ? { background: `linear-gradient(180deg, ${flag.colors.map((color, index) => `${color} ${(index / flag.colors!.length) * 100}% ${((index + 1) / flag.colors!.length) * 100}%`).join(", ")})` }
                                : undefined
                            }
                          >
                            {flag.src ? <Image src={flag.src} alt={flag.alt} width={48} height={32} unoptimized /> : <span className="sr-only">{flag.alt}</span>}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
