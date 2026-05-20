"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";
import {
  getFacilityImage,
  getFacilityPrice,
  getFacilitySport,
} from "../../lib/facilityImage";
import { EmptyView, ErrorView, LoadingView } from "../../components/StateViews";

const sports = [
  "All",
  "Football",
  "Badminton",
  "Cricket",
  "Basketball",
  "Tennis",
  "Swimming",
];

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState("All");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get("/facilities");
      setFacilities(Array.isArray(data) ? data : data.facilities || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    return facilities.filter((f) => {
      const matchesQuery =
        !query ||
        f.name?.toLowerCase().includes(query.toLowerCase()) ||
        f.location?.toLowerCase().includes(query.toLowerCase());
      const fSport = getFacilitySport(f).toLowerCase();
      const matchesSport = sport === "All" || fSport.includes(sport.toLowerCase());
      return matchesQuery && matchesSport;
    });
  }, [facilities, query, sport]);

  return (
    <div className="bg-zinc-50 dark:bg-black">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            All Facilities
          </h1>
          <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Browse and book top-rated sports venues near you. Filter by sport or
            search by name and location.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.3-4.3M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"
                />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or location"
                className="w-full rounded-full border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            >
              {sports.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingView label="Loading facilities..." />
        ) : error ? (
          <ErrorView message={error} onRetry={load} />
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Showing{" "}
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {filtered.length}
                </span>{" "}
                of {facilities.length} facilities
              </p>
            </div>

            {filtered.length === 0 ? (
              <EmptyView
                title="No facilities found"
                message="Try adjusting your search or filter."
              />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((f) => (
                  <FacilityCard key={f._id || f.id} facility={f} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function FacilityCard({ facility: f }) {
  const id = f._id || f.id;
  const image = getFacilityImage(f);
  const sport = getFacilitySport(f);
  const price = getFacilityPrice(f);
  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={f.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
          {sport}
        </span>
        {f.rating != null && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-zinc-900 backdrop-blur">
            <svg
              className="h-3.5 w-3.5 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.05 2.927c.3-.921 1.6-.921 1.9 0l1.7 5.236h5.5c.97 0 1.371 1.24.588 1.81l-4.45 3.234 1.7 5.236c.3.922-.755 1.688-1.54 1.118L10 16.327l-4.448 3.234c-.785.57-1.84-.196-1.54-1.118l1.7-5.236L1.262 9.973c-.783-.57-.382-1.81.588-1.81h5.5l1.7-5.236Z" />
            </svg>
            {f.rating}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {f.name}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          {f.location}
        </p>
        {Array.isArray(f.amenities) && f.amenities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {f.amenities.map((a) => (
              <span
                key={a}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {a}
              </span>
            ))}
          </div>
        )}
        <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-900">
          <div>
            <span className="text-xl font-bold text-zinc-900 dark:text-white">
              ৳{price}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {" "}
              / hour
            </span>
          </div>
          <Link
            href={`/facilities/${id}`}
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
