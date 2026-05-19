import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/facilities", label: "All Facilities" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/add-facility", label: "List Your Facility" },
];

const sportsLinks = [
  "Football",
  "Cricket",
  "Badminton",
  "Basketball",
  "Tennis",
  "Swimming",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 font-bold text-white">
                SH
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">
                SportHaven
              </span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              Book the best sports facilities near you — turfs, courts, pools,
              and more. Play more, stress less.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialIcon label="Facebook" href="https://facebook.com">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
              </SocialIcon>
              <SocialIcon label="Instagram" href="https://instagram.com">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 0 1-1.38-.9 3.71 3.71 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.8c-3.15 0-3.5.01-4.74.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.27.83-.39.39-.63.76-.83 1.27-.15.39-.33.97-.38 2.04C2.78 8.5 2.77 8.85 2.77 12s.01 3.5.07 4.74c.05 1.07.23 1.65.38 2.04.2.51.44.88.83 1.27.39.39.76.63 1.27.83.39.15.97.33 2.04.38 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.27-.83.39-.39.63-.76.83-1.27.15-.39.33-.97.38-2.04.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.07-.23-1.65-.38-2.04a3.07 3.07 0 0 0-.83-1.27 3.07 3.07 0 0 0-1.27-.83c-.39-.15-.97-.33-2.04-.38-1.24-.06-1.59-.07-4.74-.07Zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96Zm0 8.21a3.23 3.23 0 1 0 0-6.46 3.23 3.23 0 0 0 0 6.46Zm6.34-8.4a1.16 1.16 0 1 1-2.33 0 1.16 1.16 0 0 1 2.33 0Z" />
              </SocialIcon>
              <SocialIcon label="X" href="https://x.com">
                <path d="M18.244 2H21l-6.52 7.45L22 22h-6.79l-4.78-6.24L4.8 22H2.04l6.99-7.99L2 2h6.91l4.33 5.74L18.244 2Zm-2.38 18.4h1.62L8.21 3.51H6.47l9.4 16.89Z" />
              </SocialIcon>
              <SocialIcon label="YouTube" href="https://youtube.com">
                <path d="M23.5 6.5a3 3 0 0 0-2.1-2.12C19.5 4 12 4 12 4s-7.5 0-9.4.38A3 3 0 0 0 .5 6.5 31.4 31.4 0 0 0 .12 12 31.4 31.4 0 0 0 .5 17.5a3 3 0 0 0 2.1 2.12C4.5 20 12 20 12 20s7.5 0 9.4-.38a3 3 0 0 0 2.1-2.12A31.4 31.4 0 0 0 23.88 12a31.4 31.4 0 0 0-.38-5.5ZM9.75 15.5v-7l6.25 3.5-6.25 3.5Z" />
              </SocialIcon>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-zinc-400 transition hover:text-emerald-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Sports
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {sportsLinks.map((s) => (
                <li key={s}>
                  <Link
                    href={`/facilities?sport=${encodeURIComponent(s)}`}
                    className="text-zinc-400 transition hover:text-emerald-400"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <ContactSvg>
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
                </ContactSvg>
                <span>House 12, Road 5, Banani, Dhaka 1213</span>
              </li>
              <li className="flex items-start gap-2">
                <ContactSvg>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.37a1.13 1.13 0 0 0-.86-1.09l-4.42-1.1a1.13 1.13 0 0 0-1.18.42l-.97 1.29a13.5 13.5 0 0 1-6.36-6.36l1.3-.97a1.13 1.13 0 0 0 .42-1.18l-1.1-4.42a1.13 1.13 0 0 0-1.1-.86H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </ContactSvg>
                <a
                  href="tel:+8801700000000"
                  className="hover:text-emerald-400"
                >
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-start gap-2">
                <ContactSvg>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </ContactSvg>
                <a
                  href="mailto:hello@sporthaven.com"
                  className="hover:text-emerald-400"
                >
                  hello@sporthaven.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} SportHaven. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-emerald-400">
              Privacy
            </Link>
            <Link href="#" className="hover:text-emerald-400">
              Terms
            </Link>
            <Link href="#" className="hover:text-emerald-400">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition hover:bg-emerald-600 hover:text-white"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        {children}
      </svg>
    </a>
  );
}

function ContactSvg({ children }) {
  return (
    <svg
      className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
    >
      {children}
    </svg>
  );
}
