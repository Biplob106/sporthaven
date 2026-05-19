"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, signUp } from "../../lib/auth-client";
import { Toast } from "../../components/Toast";

const passwordRules = [
  { label: "At least 6 characters", test: (p) => p.length >= 6 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
];

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const passwordValid = passwordRules.every((r) => r.test(form.password));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!passwordValid) {
      setError("Password does not meet the required rules.");
      return;
    }

    setSubmitting(true);
    const { error } = await signUp.email({
      email: form.email,
      password: form.password,
      name: form.name,
      image: form.photoURL || undefined,
      photoURL: form.photoURL || undefined,
    });

    if (error) {
      setError(error.message || "Registration failed. Please try again.");
      setSubmitting(false);
      return;
    }

    setSuccess("Account created! Redirecting to login...");
    setTimeout(() => router.push("/login"), 1500);
  };

  const handleGoogle = async () => {
    setError(null);
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 font-bold text-white">
              SH
            </span>
            <span className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              SportHaven
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Join SportHaven to book venues and list your own.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <Toast type="error" message={error} />
          <Toast type="success" message={success} />

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Name
              </span>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your full name"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email
              </span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Photo URL
              </span>
              <input
                type="url"
                value={form.photoURL}
                onChange={(e) => update("photoURL", e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </span>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="••••••••"
                className={inputClass}
              />
              {form.password.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {passwordRules.map((r) => {
                    const ok = r.test(form.password);
                    return (
                      <li
                        key={r.label}
                        className={`flex items-center gap-1.5 text-xs ${
                          ok
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-zinc-500"
                        }`}
                      >
                        <span>{ok ? "✓" : "○"}</span>
                        {r.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </label>

            <button
              type="submit"
              disabled={submitting || !passwordValid}
              className="w-full rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {submitting ? "Creating account..." : "Register"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-zinc-400">
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            <span>OR</span>
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100";

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8a12 12 0 1 1 0-24c3 0 5.7 1.1 7.8 3l5.7-5.7A20 20 0 1 0 24 44c11 0 20-9 20-20 0-1.2-.1-2.4-.4-3.5Z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8A12 12 0 0 1 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7A20 20 0 0 0 6.3 14.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3A12 12 0 0 1 12.7 28l-6.6 5.1A20 20 0 0 0 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4 5.5l6.3 5.3c-.4.4 6.7-4.8 6.7-14.8 0-1.2-.1-2.4-.4-3.5Z"
      />
    </svg>
  );
}
