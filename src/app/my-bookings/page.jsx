"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";
import { EmptyView, ErrorView, LoadingView } from "../../components/StateViews";

const tabs = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];

const statusStyles = {
  Confirmed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Completed:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("All");
  const [cancellingId, setCancellingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get("/bookings/mine");
      setBookings(Array.isArray(data) ? data : data.bookings || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const cancelBooking = async (id) => {
    setCancellingId(id);
    try {
      await api.patch(`/bookings/${id}/cancel`);
      setBookings((prev) =>
        prev.map((b) =>
          (b._id || b.id) === id ? { ...b, status: "Cancelled" } : b
        )
      );
    } catch (err) {
      alert(`Failed to cancel: ${err.message}`);
    } finally {
      setCancellingId(null);
    }
  };

  const filtered =
    tab === "All" ? bookings : bookings.filter((b) => b.status === tab);

  return (
    <div className="bg-zinc-50 dark:bg-black">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            My Bookings
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Track and manage all your upcoming and past sports facility
            bookings.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Total" value={bookings.length} accent="bg-zinc-900" />
            <Stat
              label="Confirmed"
              value={bookings.filter((b) => b.status === "Confirmed").length}
              accent="bg-emerald-600"
            />
            <Stat
              label="Pending"
              value={bookings.filter((b) => b.status === "Pending").length}
              accent="bg-amber-500"
            />
            <Stat
              label="Completed"
              value={bookings.filter((b) => b.status === "Completed").length}
              accent="bg-blue-600"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === t
                  ? "bg-emerald-600 text-white shadow"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingView label="Loading bookings..." />
        ) : error ? (
          <ErrorView message={error} onRetry={load} />
        ) : filtered.length === 0 ? (
          <EmptyView
            title="No bookings here"
            message="Bookings in this category will show up here."
          />
        ) : (
          <>
            <div className="hidden overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:block">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                <thead className="bg-zinc-50 dark:bg-zinc-900">
                  <tr>
                    <Th>Booking ID</Th>
                    <Th>Facility</Th>
                    <Th>Date & Time</Th>
                    <Th>Price</Th>
                    <Th>Status</Th>
                    <Th className="text-right">Action</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filtered.map((b) => {
                    const id = b._id || b.id;
                    return (
                      <tr
                        key={id}
                        className="transition hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                      >
                        <Td className="font-mono text-xs text-zinc-500">
                          {id}
                        </Td>
                        <Td>
                          <div className="font-semibold text-zinc-900 dark:text-white">
                            {b.facility?.name || b.facility}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            {b.sport || b.facility?.sport}
                          </div>
                        </Td>
                        <Td>
                          <div className="text-sm text-zinc-900 dark:text-zinc-100">
                            {b.date}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            {b.time}
                          </div>
                        </Td>
                        <Td className="font-semibold text-zinc-900 dark:text-white">
                          ৳{b.price}
                        </Td>
                        <Td>
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                              statusStyles[b.status] || ""
                            }`}
                          >
                            {b.status}
                          </span>
                        </Td>
                        <Td className="text-right">
                          {b.status === "Confirmed" ||
                          b.status === "Pending" ? (
                            <button
                              type="button"
                              disabled={cancellingId === id}
                              onClick={() => cancelBooking(id)}
                              className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
                            >
                              {cancellingId === id ? "..." : "Cancel"}
                            </button>
                          ) : (
                            <span className="text-xs text-zinc-400">—</span>
                          )}
                        </Td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 md:hidden">
              {filtered.map((b) => {
                const id = b._id || b.id;
                return (
                  <div
                    key={id}
                    className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-white">
                          {b.facility?.name || b.facility}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {b.sport || b.facility?.sport} · {id}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          statusStyles[b.status] || ""
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-xs text-zinc-500">Date</div>
                        <div className="text-zinc-900 dark:text-white">
                          {b.date}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500">Time</div>
                        <div className="text-zinc-900 dark:text-white">
                          {b.time}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-900">
                      <span className="font-bold text-zinc-900 dark:text-white">
                        ৳{b.price}
                      </span>
                      {b.status === "Confirmed" || b.status === "Pending" ? (
                        <button
                          type="button"
                          disabled={cancellingId === id}
                          onClick={() => cancelBooking(id)}
                          className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:text-red-400"
                        >
                          {cancellingId === id ? "..." : "Cancel"}
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${accent}`} />
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {label}
        </span>
      </div>
      <div className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 ${className}`}
    >
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return <td className={`px-6 py-4 align-top ${className}`}>{children}</td>;
}
