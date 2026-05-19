export function LoadingView({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white p-16 dark:border-zinc-700 dark:bg-zinc-950">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      <p className="mt-3 text-sm text-zinc-500">{label}</p>
    </div>
  );
}

export function ErrorView({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
      <h3 className="text-base font-semibold text-red-800 dark:text-red-300">
        Something went wrong
      </h3>
      <p className="mt-1 text-sm text-red-700 dark:text-red-400">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyView({ title, message, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-16 text-center dark:border-zinc-700 dark:bg-zinc-950">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
