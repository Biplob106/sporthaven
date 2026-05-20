"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { EmptyView, ErrorView, LoadingView } from "../../components/StateViews";
import { Toast } from "../../components/Toast";
import { api } from "../../lib/api";
import { useSession } from "../../lib/auth-client";
import {
  getFacilityImage,
  getFacilityPrice,
  getFacilitySport,
} from "../../lib/facilityImage";

export default function ManageFacilitiesPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();
  const ownerEmail = session?.user?.email;

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!sessionLoading && !session?.user) {
      router.replace("/login?redirect=/manage-facilities");
    }
  }, [session, sessionLoading, router]);

  const load = useCallback(async () => {
    if (!ownerEmail) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.get(
        `/facilities?owner_email=${encodeURIComponent(ownerEmail)}`
      );
      setFacilities(Array.isArray(data) ? data : data.facilities || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [ownerEmail]);

  useEffect(() => {
    load();
  }, [load]);

  const deleteFacility = async (id) => {
    setBusyId(id);
    setToast(null);
    try {
      await api.delete(`/facilities/${id}`);
      setFacilities((prev) => prev.filter((f) => (f._id || f.id) !== id));
      setConfirmDelete(null);
      setToast({ type: "success", message: "Facility deleted." });
    } catch (err) {
      setToast({ type: "error", message: `Failed to delete: ${err.message}` });
    } finally {
      setBusyId(null);
    }
  };

  const totalBookings = facilities.reduce(
    (sum, f) => sum + (f.booking_count || 0),
    0
  );

  if (sessionLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <LoadingView label="Checking session..." />
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 dark:bg-black">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                Manage My Facilities
              </h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Edit details or remove facilities you own.
              </p>
            </div>
            <Link
              href="/add-facility"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Facility
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <KpiCard
              label="Total Facilities"
              value={facilities.length}
              hint="Owned by you"
            />
            <KpiCard
              label="Total Bookings"
              value={totalBookings}
              hint="Across all your facilities"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {toast && <Toast {...toast} />}

        {loading ? (
          <LoadingView label="Loading your facilities..." />
        ) : error ? (
          <ErrorView message={error} onRetry={load} />
        ) : facilities.length === 0 ? (
          <EmptyView
            title="No facilities yet"
            message="Add your first facility to start accepting bookings."
            action={
              <Link
                href="/add-facility"
                className="inline-block rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Add Facility
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {facilities.map((f) => {
              const id = f._id || f.id;
              const image = getFacilityImage(f);
              const sport = getFacilitySport(f);
              const price = getFacilityPrice(f);
              return (
                <div
                  key={id}
                  className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="flex flex-col gap-4 p-5 sm:flex-row">
                    <div className="h-32 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 sm:h-32 sm:w-48 sm:flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt={f.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                            {f.name}
                          </h3>
                          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            {sport} · {f.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-zinc-900 dark:text-white">
                            ৳{price}
                          </div>
                          <div className="text-xs text-zinc-500">per hour</div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <Metric label="Bookings" value={f.booking_count ?? 0} />
                        <Metric label="Capacity" value={f.capacity ?? "—"} />
                        <Metric
                          label="Slots"
                          value={(f.available_slots || []).length}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2 border-t border-zinc-200 bg-zinc-50 px-5 py-3 dark:border-zinc-800 dark:bg-zinc-900/40">
                    <Link
                      href={`/facilities/${id}`}
                      className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    >
                      View
                    </Link>
                    <Link
                      href={`/manage-facilities/${id}/edit`}
                      className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      disabled={busyId === id}
                      onClick={() => setConfirmDelete(id)}
                      className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setConfirmDelete(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-950"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Delete this facility?
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              This action cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                disabled={busyId === confirmDelete}
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-800 dark:text-zinc-300"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busyId === confirmDelete}
                onClick={() => deleteFacility(confirmDelete)}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {busyId === confirmDelete ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KpiCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </div>
      <div className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
        {value}
      </div>
      <div className="mt-0.5 text-xs text-zinc-500">{hint}</div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="text-sm font-semibold text-zinc-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}
