"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../lib/api";

const sports = [
  "Football",
  "Cricket",
  "Badminton",
  "Basketball",
  "Tennis",
  "Swimming",
  "Volleyball",
  "Table Tennis",
];

const amenityOptions = [
  "Parking",
  "Locker Room",
  "Shower",
  "Floodlights",
  "AC",
  "Cafeteria",
  "First Aid",
  "Equipment Rental",
];

const initialForm = {
  name: "",
  sport: "",
  location: "",
  price: "",
  capacity: "",
  description: "",
  image: "",
  amenities: [],
};

export default function AddFacilityPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAmenity = (a) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter((x) => x !== a)
        : [...prev.amenities, a],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        capacity: form.capacity ? Number(form.capacity) : undefined,
      };
      await api.post("/facilities", payload);
      setSuccess(true);
      setForm(initialForm);
      setTimeout(() => router.push("/manage-facilities"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-black">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            List a New Facility
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Fill in the details below to make your sports facility bookable on
            SportHaven.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
            <svg
              className="h-5 w-5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
            Facility created! Redirecting...
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Basic Information
            </h2>
            <p className="text-sm text-zinc-500">
              Tell us about your facility.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
            <Field label="Facility Name" required>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g. Emerald Turf Arena"
                className={inputClass}
              />
            </Field>

            <Field label="Sport Type" required>
              <select
                required
                value={form.sport}
                onChange={(e) => update("sport", e.target.value)}
                className={inputClass}
              >
                <option value="">Select sport</option>
                {sports.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Location" required className="sm:col-span-2">
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="Area, City"
                className={inputClass}
              />
            </Field>

            <Field label="Price per Hour (৳)" required>
              <input
                type="number"
                min="0"
                required
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                placeholder="1200"
                className={inputClass}
              />
            </Field>

            <Field label="Capacity (people)">
              <input
                type="number"
                min="1"
                value={form.capacity}
                onChange={(e) => update("capacity", e.target.value)}
                placeholder="22"
                className={inputClass}
              />
            </Field>

            <Field label="Image URL" className="sm:col-span-2">
              <input
                type="url"
                value={form.image}
                onChange={(e) => update("image", e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
            </Field>

            <Field label="Description" className="sm:col-span-2">
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describe the facility, surface type, lighting, surrounding amenities..."
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>

          <div className="border-t border-zinc-200 px-6 py-5 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Amenities
            </h2>
            <p className="text-sm text-zinc-500">
              Select all that apply to your facility.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {amenityOptions.map((a) => {
                const active = form.amenities.includes(a);
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                    }`}
                  >
                    {active ? "✓ " : "+ "}
                    {a}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            <button
              type="button"
              onClick={() => setForm(initialForm)}
              disabled={submitting}
              className="rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {submitting ? "Publishing..." : "Publish Facility"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100";

function Field({ label, required, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}
