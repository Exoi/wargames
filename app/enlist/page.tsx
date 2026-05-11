import type { Metadata } from "next";
import { EnlistForm } from "@/components/EnlistForm";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Sign up for War Games updates, development notes, and future announcements.",
};

export default function EnlistPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      <section className="container-grid flex min-h-[calc(100vh-72px)] items-center justify-center py-16">
        <div className="w-full max-w-2xl">
          <EnlistForm />
        </div>
      </section>
    </main>
  );
}
