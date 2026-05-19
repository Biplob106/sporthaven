import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;

let cachedToken = null;
let cachedExpiry = 0;

export async function getAuthToken() {
  if (cachedToken && Date.now() < cachedExpiry) {
    return cachedToken;
  }

  const base =
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";

  const res = await fetch(`${base}/api/auth/token`, {
    credentials: "include",
  });

  if (!res.ok) return null;
  const data = await res.json();
  cachedToken = data?.token || null;
  cachedExpiry = Date.now() + 5 * 60 * 1000;
  return cachedToken;
}

export function clearAuthToken() {
  cachedToken = null;
  cachedExpiry = 0;
}
