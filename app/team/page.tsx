import type { Metadata } from "next";
import Link from "next/link";
import canadaFlag from "../../flags/Flag-of-Canada.webp";
import unitedStatesFlag from "../../flags/Flag-of-United-States.webp";
import { ProfileCard } from "@/components/ProfileCard";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the War Games development team, staff team, content creators, and contributors.",
};

const defaultAvatarUrl = "/profile-card-default-avatar.png";
const profileGradient = "linear-gradient(145deg, rgba(82,82,91,0.34) 0%, rgba(24,24,27,0.82) 58%, rgba(5,5,5,0.96) 100%)";

const developmentTeam = [
  {
    name: "Zee",
    title: "Founder / Developer",
    handle: "simplifiedchaos",
    status: "Active",
    flags: [{ src: canadaFlag.src, alt: "Canada flag", label: "Canada" }],
  },
  {
    name: "Exoi",
    title: "Co-Founder / Developer",
    handle: "ex_oi",
    status: "Active",
    flags: [{ src: unitedStatesFlag.src, alt: "United States flag", label: "United States" }],
  },
];

const teamSections = [
  {
    title: "Staff Team",
    description: "Community moderators, support staff, event coordinators, and operational helpers will be listed here.",
    members: [
      {
        name: "TBD",
        title: "Community Moderator",
        handle: "pending",
        status: "",
      },
      {
        name: "TBD",
        title: "Support Staff",
        handle: "pending",
        status: "",
      },
      {
        name: "TBD",
        title: "Event Coordinator",
        handle: "pending",
        status: "",
      },
    ],
  },
  {
    title: "Content Creators",
    description: "Creators, streamers, video editors, and media partners connected to War Games will be added here.",
    members: [
      {
        name: "TBD",
        title: "Content Creator",
        handle: "pending",
        status: "",
      },
      {
        name: "TBD",
        title: "Streamer",
        handle: "pending",
        status: "",
      },
      {
        name: "TBD",
        title: "Media Partner",
        handle: "pending",
        status: "",
      },
    ],
  },
  {
    title: "Contributors",
    description: "Open roles, collaborators, advisors, testers, and other professional contributors will be announced here.",
    members: [
      {
        name: "Sensual",
        title: "Translator / Voice Actor",
        handle: "senssyy",
        status: "Active",
        flags: [
          { alt: "Netherlands flag", label: "Netherlands", colors: ["#ae1c28", "#ffffff", "#21468b"] },
          { alt: "Germany flag", label: "Germany", colors: ["#000000", "#dd0000", "#ffce00"] },
        ],
      },
      {
        name: "TBD",
        title: "Advisor",
        handle: "pending",
        status: "",
      },
      {
        name: "TBD",
        title: "Playtester",
        handle: "pending",
        status: "",
      },
    ],
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen">
      <section className="container-grid py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-zinc-300">War Games Personnel</p>
          <h1 className="display-heading mt-5 text-[clamp(3.2rem,9vw,7rem)] leading-[0.9] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.85)]">
            Team Roster
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-bone">
            A dedicated space for the people building, supporting, creating, and shaping War Games.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-button border border-white/20 bg-zinc-900/90 px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-white transition-all duration-300 ease-tactical hover:border-white/50 hover:bg-zinc-700"
          >
            Return To Briefing
          </Link>
        </div>

        <section className="mt-16">
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-400">Development Team</p>
            <h2 className="display-heading mt-2 text-4xl text-white">Owners & Developers</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {developmentTeam.map((member) => (
              <ProfileCard
                key={`${member.handle}-${member.title}`}
                {...member}
                avatarUrl={defaultAvatarUrl}
                iconUrl="/profile-card-pattern.svg"
                contactText="Contact me"
                contactHref={`https://discord.com/users/${member.handle}`}
                innerGradient={profileGradient}
              />
            ))}
          </div>
        </section>

        <div className="mt-20 grid gap-16">
          {teamSections.map((section) => (
            <section key={section.title}>
              <div className="mb-8">
                <h2 className="display-heading mt-2 text-4xl text-white">{section.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-ash">{section.description}</p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {section.members.map((member) => (
                  <ProfileCard
                    key={`${section.title}-${member.title}`}
                    {...member}
                    avatarUrl={defaultAvatarUrl}
                    iconUrl="/profile-card-pattern.svg"
                    contactText="Contact Me"
                    innerGradient={profileGradient}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
