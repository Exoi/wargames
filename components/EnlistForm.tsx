"use client";

import { useState } from "react";

export function EnlistForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="font-sans flex min-h-[420px] w-full items-center justify-center">
        <div className="mx-5 w-full max-w-[640px] rounded-card border border-white/15 bg-neutral-500/20 p-8 text-bone shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
          <h1 className="text-center font-serif text-5xl font-bold">Subscribed.</h1>
          <p className="mt-2 text-center">You are signed up for War Games news and updates.</p>
          <button
            className="mt-10 w-full border-2 border-solid border-white/70 bg-white/15 px-5 py-3 text-white transition-colors hover:bg-white/25"
            onClick={() => setSubmitted(false)}
            type="button"
          >
            Edit Signup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans flex min-h-[420px] w-full items-center justify-center">
      <div className="mx-5 w-full max-w-[640px] rounded-card border border-white/15 bg-neutral-500/20 p-8 text-bone shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <h1 className="text-center font-serif text-5xl font-bold">Newsletter.</h1>
        <p className="mt-2 text-center">Stay up to date with our development and updates.</p>
        <form
          method="post"
          className="relative my-10 flex items-center"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            className="w-full rounded-none border-2 border-solid border-white/70 bg-transparent py-3 pl-5 pr-28 text-white outline-none placeholder:text-white/50"
          />
          <button type="submit" className="absolute right-0 flex h-full cursor-pointer items-center bg-white/15 px-5 text-white transition-colors hover:bg-white/25">
            Subscribe
          </button>
        </form>
        <p className="text-center">*your email is safe with us, we don&apos;t spam</p>
      </div>
    </div>
  );
}
