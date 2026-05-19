"use client";

export function Toast({ type = "info", message }) {
  if (!message) return null;

  const styles = {
    success:
      "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
    error:
      "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300",
    info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-200",
  };

  return (
    <div
      className={`mb-4 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${styles[type]}`}
      role="alert"
    >
      <span className="font-medium">{message}</span>
    </div>
  );
}
