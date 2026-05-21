"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";
import {
  getFacilityImage,
  getFacilityPrice,
  getFacilitySport,
} from "../lib/facilityImage";
import { StaggerGroup, StaggerItem } from "./Motion";
import { ErrorView, LoadingView } from "./StateViews";

export default function FeaturedFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get("/facilities");
      const list = Array.isArray(data)
        ? data
        : data.data || data.facilities || [];
      setFacilities(list.slice(0, 6));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section className="bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              Featured
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Top-rated Facilities
            </h2>
            <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
              Hand-picked venues loved by the SportHaven community. Reserve a
              slot in seconds.
            </p>
          </div>
          <Link
            href="/facilities"
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:border-emerald-600 hover:text-emerald-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:text-emerald-400"
          >
            View All →
          </Link>
        </div>

        <div className="mt-10">
          {loading ? (
            <LoadingView label="Loading featured facilities..." />
          ) : error ? (
            <ErrorView message={error} onRetry={load} />
          ) : facilities.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-16 text-center dark:border-zinc-700 dark:bg-zinc-950">
              <p className="text-zinc-600 dark:text-zinc-400">
                No facilities available yet. Check back soon!
              </p>
            </div>
          ) : (
            <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {facilities.map((f) => (
                <StaggerItem key={f._id || f.id}>
                  <FacilityCard facility={f} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </div>
    </section>
  );
}

function FacilityCard({ facility: f }) {
  const id = f._id || f.id;
  const price = getFacilityPrice(f);
  const sport = getFacilitySport(f);
  const image = getFacilityImage(f);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={f.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {sport && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
            {sport}
          </span>
        )}
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
      <div className="flex flex-1 flex-col p-5">
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
        <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-900">
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
