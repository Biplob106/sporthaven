"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ErrorView, LoadingView } from "../../../../components/StateViews";
import { Toast } from "../../../../components/Toast";
import { api } from "../../../../lib/api";
import { useSession } from "../../../../lib/auth-client";

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

export default function EditFacilityPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!sessionLoading && !session?.user) {
      router.replace(`/login?redirect=/manage-facilities/${id}/edit`);
    }
  }, [session, sessionLoading, router, id]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get(`/facilities/${id}`);
      setForm({
        name: data.name || "",
        facility_type: data.facility_type || data.sport || "",
        location: data.location || "",
        price_per_hour: data.price_per_hour ?? data.price ?? "",
        capacity: data.capacity ?? "",
        description: data.description || "",
        image: data.image || "",
        available_slots: (data.available_slots || []).join(", "),
        owner_email: data.owner_email || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) load();
  }, [id, load]);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setToast(null);
    try {
      const payload = {
        name: form.name,
        facility_type: form.facility_type,
        location: form.location,
        price_per_hour: Number(form.price_per_hour),
        capacity: form.capacity ? Number(form.capacity) : undefined,
        description: form.description,
        image: form.image || undefined,
        available_slots: form.available_slots
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      await api.patch(`/facilities/${id}`, payload);
      setToast({ type: "success", message: "Facility updated. Redirecting..." });
      setTimeout(() => router.push("/manage-facilities"), 1200);
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <LoadingView label="Loading facility..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <ErrorView message={error} onRetry={load} />
      </div>
    );
  }

  if (!form) return null;

  // Ownership guard (UI level — backend enforces too)
  if (
    session?.user?.email &&
    form.owner_email &&
    form.owner_email !== session.user.email
  ) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">
            Not your facility
          </h2>
          <p className="mt-1 text-sm text-red-700 dark:text-red-400">
            You can only edit facilities you own.
          </p>
          <Link
            href="/manage-facilities"
            className="mt-4 inline-block rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Back to my facilities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 dark:bg-black">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Edit Facility
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Update the details of <span className="font-semibold">{form.name}</span>.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {toast && <Toast {...toast} />}

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
            <Field label="Facility Name" required>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Sport Type" required>
              <select
                required
                value={form.facility_type}
                onChange={(e) => update("facility_type", e.target.value)}
                className={inputClass}
              >
                <option value="">Select sport</option>
                {sports.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
                {form.facility_type &&
                  !sports.includes(form.facility_type) && (
                    <option value={form.facility_type}>
                      {form.facility_type}
                    </option>
                  )}
              </select>
            </Field>

            <Field label="Location" required className="sm:col-span-2">
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Price per Hour (৳)" required>
              <input
                type="number"
                min="0"
                required
                value={form.price_per_hour}
                onChange={(e) => update("price_per_hour", e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Capacity (people)">
              <input
                type="number"
                min="1"
                value={form.capacity}
                onChange={(e) => update("capacity", e.target.value)}
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

            <Field
              label="Available Time Slots (comma separated)"
              className="sm:col-span-2"
            >
              <input
                type="text"
                value={form.available_slots}
                onChange={(e) => update("available_slots", e.target.value)}
                placeholder="8AM-10AM, 4PM-6PM, 7PM-9PM"
                className={inputClass}
              />
            </Field>

            <Field label="Description" className="sm:col-span-2">
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            <Link
              href="/manage-facilities"
              className="rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save Changes"}
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
