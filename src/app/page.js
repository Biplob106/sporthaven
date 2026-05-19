import Link from "next/link";
import FeaturedFacilities from "../components/FeaturedFacilities";

const popularSports = [
  {
    name: "Football",
    image:
      "https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=600&q=80",
    venues: 42,
  },
  {
    name: "Cricket",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80",
    venues: 18,
  },
  {
    name: "Badminton",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80",
    venues: 36,
  },
  {
    name: "Basketball",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80",
    venues: 24,
  },
  {
    name: "Tennis",
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80",
    venues: 15,
  },
  {
    name: "Swimming",
    image:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80",
    venues: 9,
  },
];

const steps = [
  {
    n: "01",
    title: "Find a Facility",
    desc: "Browse turfs, courts, pools, and more — filter by sport, location, or price.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.3-4.3M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"
      />
    ),
  },
  {
    n: "02",
    title: "Pick Your Slot",
    desc: "Choose a date, pick an available time slot, and lock in your reservation instantly.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
      />
    ),
  },
  {
    n: "03",
    title: "Play & Enjoy",
    desc: "Show up, play your match, and track every booking from My Bookings.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-800 to-zinc-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" aria-hidden />

        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-100 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            New venues added every week
          </span>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Book Your Game.{" "}
            <span className="text-emerald-400">Anytime, Anywhere.</span>
          </h1>

          <p className="max-w-2xl text-base text-zinc-200 sm:text-lg">
            SportHaven helps you discover and reserve sports facilities near
            you — turfs, courts, pools, and more. Skip the calls. Just play.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/facilities"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-400"
            >
              Explore Facilities
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link
              href="/add-facility"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              List Your Facility
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 sm:gap-12">
            <HeroStat value="500+" label="Facilities" />
            <HeroStat value="12k+" label="Bookings" />
            <HeroStat value="4.8★" label="User Rating" />
          </div>
        </div>
      </section>

      {/* Featured Facilities (dynamic) */}
      <FeaturedFacilities />

      {/* How It Works */}
      <section className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              How It Works
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Book in three simple steps
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">
              From discovery to game time in under a minute. No phone calls, no
              waiting around.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="group relative rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition hover:border-emerald-300 hover:bg-white hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-700 dark:hover:bg-zinc-950"
              >
                <span className="absolute right-5 top-5 text-5xl font-bold text-zinc-100 transition group-hover:text-emerald-100 dark:text-zinc-800">
                  {s.n}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                  >
                    {s.icon}
                  </svg>
                </span>
                <h3 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Sports */}
      <section className="bg-zinc-50 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                Categories
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                Popular Sports
              </h2>
              <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
                Whatever your game, we&apos;ve got a venue for it.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {popularSports.map((s) => (
              <Link
                key={s.name}
                href={`/facilities?sport=${encodeURIComponent(s.name)}`}
                className="group relative aspect-square overflow-hidden rounded-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-xs text-zinc-300">{s.venues} venues</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-emerald-700 p-8 sm:p-12">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Own a facility? Earn with SportHaven.
                </h2>
                <p className="mt-2 max-w-xl text-emerald-50">
                  List your turf, court, or pool in minutes and start receiving
                  bookings from thousands of players in your area.
                </p>
              </div>
              <Link
                href="/add-facility"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-base font-semibold text-emerald-700 shadow-lg transition hover:bg-emerald-50"
              >
                List Your Facility
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroStat({ value, label }) {
  return (
    <div>
      <div className="text-2xl font-bold text-white sm:text-3xl">{value}</div>
      <div className="text-xs uppercase tracking-wide text-emerald-200/80">
        {label}
      </div>
    </div>
  );
}
