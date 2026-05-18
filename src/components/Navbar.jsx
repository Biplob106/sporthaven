"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/facilities", label: "All Facilities" },
];

const privateLinks = [
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/add-facility", label: "Add Facility" },
  { href: "/manage-facilities", label: "Manage My Facilities" },
];

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/70">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
            SH
          </span>
          <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            SportHaven
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {publicLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {isLoggedIn &&
            privateLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white ring-2 ring-transparent transition hover:ring-emerald-200 focus:outline-none focus:ring-emerald-300"
                aria-haspopup="menu"
                aria-expanded={profileOpen}
              >
                U
              </button>
              {profileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      Signed in
                    </p>
                    <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                      user@sporthaven.com
                    </p>
                  </div>
                  <ul className="py-1">
                    {privateLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setProfileOpen(false)}
                          className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full border-t border-zinc-200 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:border-zinc-800 dark:text-red-400 dark:hover:bg-red-950/40"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogin}
              className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Login
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-zinc-700 transition hover:bg-zinc-100 md:hidden dark:text-zinc-300 dark:hover:bg-zinc-900"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-6 w-6"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white md:hidden dark:border-zinc-800 dark:bg-black">
          <ul className="space-y-1 px-4 py-3">
            {publicLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {isLoggedIn &&
              privateLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
          <div className="border-t border-zinc-200 px-4 py-3 dark:border-zinc-800">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLogin}
                className="w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
