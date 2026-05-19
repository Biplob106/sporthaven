"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";
import { EmptyView, ErrorView, LoadingView } from "../../components/StateViews";

export default function ManageFacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get("/facilities/mine");
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

  const toggleStatus = async (id, current) => {
    const next = current === "Active" ? "Inactive" : "Active";
    setBusyId(id);
    try {
      await api.patch(`/facilities/${id}`, { status: next });
      setFacilities((prev) =>
        prev.map((f) => ((f._id || f.id) === id ? { ...f, status: next } : f))
      );
    } catch (err) {
      alert(`Failed to update: ${err.message}`);
    } finally {
      setBusyId(null);
    }
  };

  const deleteFacility = async (id) => {
    setBusyId(id);
    try {
      await api.delete(`/facilities/${id}`);
      setFacilities((prev) => prev.filter((f) => (f._id || f.id) !== id));
      setConfirmDelete(null);
    } catch (err) {
      alert(`Failed to delete: ${err.message}`);
    } finally {
      setBusyId(null);
    }
  };

  const totalRevenue = facilities.reduce(
    (sum, f) => sum + (f.revenue || 0),
    0
  );
  const totalBookings = facilities.reduce(
    (sum, f) => sum + (f.bookings || 0),
    0
  );
  const activeCount = facilities.filter((f) => f.status === "Active").length;

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
                Edit details, toggle visibility, or remove facilities you
                manage.
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

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <KpiCard
              label="Total Facilities"
              value={facilities.length}
              hint={`${activeCount} active`}
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21"
                />
              }
            />
            <KpiCard
              label="Total Bookings"
              value={totalBookings}
              hint="All-time"
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              }
            />
            <KpiCard
              label="Total Revenue"
              value={`৳${totalRevenue.toLocaleString()}`}
              hint="All-time"
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-2.21 0-4-1.343-4-3s1.79-3 4-3 4 1.343 4 3"
                />
              }
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
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
              return (
                <div
                  key={id}
                  className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="flex flex-col gap-4 p-5 sm:flex-row">
                    <div className="h-32 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 sm:h-32 sm:w-48 sm:flex-shrink-0">
                      {f.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={f.image}
                          alt={f.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                              {f.name}
                            </h3>
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                f.status === "Active"
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                                  : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                              }`}
                            >
                              {f.status || "Active"}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            {f.sport} · {f.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-zinc-900 dark:text-white">
                            ৳{f.price}
                          </div>
                          <div className="text-xs text-zinc-500">per hour</div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <Metric label="Bookings" value={f.bookings ?? 0} />
                        <Metric
                          label="Revenue"
                          value={`৳${(f.revenue ?? 0).toLocaleString()}`}
                        />
                        <Metric
                          label="Avg / booking"
                          value={`৳${Math.round(
                            (f.revenue ?? 0) / Math.max(f.bookings ?? 0, 1)
                          )}`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2 border-t border-zinc-200 bg-zinc-50 px-5 py-3 dark:border-zinc-800 dark:bg-zinc-900/40">
                    <button
                      type="button"
                      disabled={busyId === id}
                      onClick={() => toggleStatus(id, f.status || "Active")}
                      className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    >
                      {(f.status || "Active") === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>
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
              This action cannot be undone. All upcoming bookings will be
              cancelled.
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

function KpiCard({ label, value, hint, icon }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {label}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
          >
            {icon}
          </svg>
        </span>
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
