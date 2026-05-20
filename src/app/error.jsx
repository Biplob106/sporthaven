"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
          <svg
            className="h-10 w-10 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-red-700 dark:text-red-400">
          Something broke
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          We hit an unexpected error.
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Don&apos;t worry — your booking data is safe. Try again, or head back
          to the home page.
        </p>

        {error?.message && (
          <p className="mt-4 break-words rounded-lg bg-red-50 px-4 py-2 text-xs text-red-700 dark:bg-red-950/30 dark:text-red-300">
            {error.message}
          </p>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-zinc-300 px-6 py-2.5 text-sm font-semibold text-zinc-800 transition hover:border-emerald-600 hover:text-emerald-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:text-emerald-400"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
