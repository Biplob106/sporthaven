"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ErrorView, LoadingView } from "../../../components/StateViews";
import { Toast } from "../../../components/Toast";
import { api } from "../../../lib/api";
import { useSession } from "../../../lib/auth-client";
import {
  getFacilityImage,
  getFacilityPrice,
  getFacilitySport,
} from "../../../lib/facilityImage";

export default function FacilityDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [hours, setHours] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!sessionLoading && !session?.user) {
      router.replace(`/login?redirect=/facilities/${id}`);
    }
  }, [session, sessionLoading, router, id]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get(`/facilities/${id}`);
      setFacility(data);
      const slots = data?.available_slots || [];
      if (slots.length) setTimeSlot(slots[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) load();
  }, [id, load]);

  const pricePerHour = useMemo(() => getFacilityPrice(facility), [facility]);
  const totalPrice = useMemo(
    () => Number(pricePerHour) * Number(hours || 0),
    [pricePerHour, hours]
  );

  const handleBook = async (e) => {
    e.preventDefault();
    if (!bookingDate || !timeSlot || !hours) {
      setToast({ type: "error", message: "Please fill all booking fields." });
      return;
    }
    setSubmitting(true);
    setToast(null);
    try {
      await api.post("/bookings", {
        facility_id: id,
        booking_date: bookingDate,
        time_slot: timeSlot,
        hours: Number(hours),
        total_price: totalPrice,
      });
      setToast({
        type: "success",
        message: "Booking confirmed! Redirecting to My Bookings...",
      });
      setTimeout(() => router.push("/my-bookings"), 1200);
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <LoadingView label="Loading facility..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <ErrorView message={error} onRetry={load} />
        <div className="mt-6 text-center">
          <Link
            href="/facilities"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
          >
            ← Back to all facilities
          </Link>
        </div>
      </div>
    );
  }

  if (!facility) return null;

  const image = getFacilityImage(facility);
  const sport = getFacilitySport(facility);
  const slots = facility.available_slots || [];
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-zinc-50 dark:bg-black">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/" className="hover:text-emerald-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/facilities" className="hover:text-emerald-600">
              Facilities
            </Link>
            <span>/</span>
            <span className="truncate text-zinc-900 dark:text-zinc-200">
              {facility.name}
            </span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <div className="relative h-72 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 sm:h-96">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={facility.name}
                  className="h-full w-full object-cover"
                />
                {sport && (
                  <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white">
                    {sport}
                  </span>
                )}
              </div>

              <div className="p-6 sm:p-8">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {facility.name}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                  <svg
                    className="h-5 w-5"
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
                  {facility.location}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 border-y border-zinc-100 py-5 dark:border-zinc-900 sm:grid-cols-4">
                  <Stat label="Price" value={`৳${pricePerHour}/hr`} />
                  <Stat label="Capacity" value={facility.capacity || "—"} />
                  <Stat label="Sport" value={sport || "—"} />
                  <Stat
                    label="Bookings"
                    value={facility.booking_count ?? 0}
                  />
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    About this facility
                  </h2>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    {facility.description || "No description provided."}
                  </p>
                </div>

                {slots.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                      Available time slots
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {slots.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {Array.isArray(facility.amenities) &&
                  facility.amenities.length > 0 && (
                    <div className="mt-6">
                      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        Amenities
                      </h2>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {facility.amenities.map((a) => (
                          <span
                            key={a}
                            className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
                          >
                            ✓ {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                Book this facility
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Pick a date and time slot to reserve.
              </p>

              {toast && <div className="mt-4"><Toast {...toast} /></div>}

              <form onSubmit={handleBook} className="mt-5 space-y-4">
                <Field label="Facility">
                  <input
                    type="text"
                    value={facility.name}
                    readOnly
                    className={`${inputClass} cursor-not-allowed bg-zinc-50 dark:bg-zinc-900`}
                  />
                </Field>

                <Field label="Booking Date" required>
                  <input
                    type="date"
                    required
                    min={today}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Time Slot" required>
                  <select
                    required
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className={inputClass}
                  >
                    {slots.length === 0 && (
                      <option value="">No slots available</option>
                    )}
                    {slots.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Hours" required>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    required
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      ৳{pricePerHour} × {hours || 0} hrs
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-white">
                      ৳{totalPrice}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-zinc-200 pt-2 dark:border-zinc-800">
                    <span className="font-semibold text-zinc-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      ৳{totalPrice}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || slots.length === 0}
                  className="w-full rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  {submitting ? "Booking..." : "Confirm Booking"}
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100";

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </div>
      <div className="mt-1 text-base font-semibold text-zinc-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}
