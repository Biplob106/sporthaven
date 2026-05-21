# 🏟️ SportHaven — Book Your Game

A full-stack **MERN** sports facility booking platform built with **Next.js 16** and **Better Auth**.
Discover and reserve turfs, courts, pools, and arenas near you in seconds.

---

## 🎯 Purpose

SportHaven solves the everyday hassle of booking a sports venue.
Instead of calling around turfs to find an open slot, players can:

- Browse a curated catalogue of facilities (football, cricket, badminton, basketball, tennis, swimming, and more)
- See real-time availability, capacity, and pricing
- Reserve a date and time slot with a single click
- Track and manage every booking from a personal dashboard

Facility owners can also list their own venues, manage them, and start receiving bookings — making SportHaven a true two-sided marketplace for amateur sports.

---

## 🌐 Live URLs

| | |
|---|---|
| **Frontend (this repo)** | https://sporthaven.vercel.app |
| **Backend (Express API)** | https://sporthaven-server.vercel.app |
| **Backend repo** | https://github.com/Biplob106/sporthaven-server |

---

## ✨ Features

### Public
- **Modern landing page** with a hero banner, featured facilities (loaded dynamically from MongoDB), how-it-works walkthrough, sport categories, and an owner CTA
- **Browse all facilities** with live search-by-name and filter-by-sport
- **Detail page per facility** with image, description, capacity, slots, amenities, and pricing

### Authenticated users
- **Email/Password auth** via Better Auth (with strict password rules: ≥6 chars, one upper, one lower)
- **Google OAuth** social login
- **Book a slot** — pick date, time slot, and hours; the total auto-calculates
- **My Bookings dashboard** — view every reservation grouped by status (pending / confirmed / completed / cancelled), with one-click cancel
- **List your own facility** — full form with sport type, location, image URL, price, capacity, slots, amenities

### Facility owners
- **Manage My Facilities** dashboard with KPIs (your facility count + total bookings)
- **Edit** and **Delete** any facility you own, guarded by a confirmation modal
- Ownership enforced on both the UI and the backend middleware

### Engineering / UX
- ⚡ **Next.js App Router** with server-rendered shells and client-rendered interactive views
- 🔐 **JWT auth** stored in HTTP-only cookies and verified server-side via JWKS on the Express API
- 🎨 **Theme toggle** (light / dark) with system-preference detection
- 💫 **Framer Motion** for entrance, stagger, and hover micro-animations
- 📱 Fully **responsive** (mobile, tablet, desktop)
- 🛡️ **Secrets in env vars** — MongoDB credentials and OAuth secrets never hard-coded
- 🚫 **No `alert()`** — every error and success message uses a custom Toast component
- 🧭 Custom **404 page** and **global error boundary**
- 🔄 No login-on-reload — private routes keep the session across refreshes

---

## 🧰 Tech Stack & NPM Packages Used

### Frontend (this repo)

| Package | Purpose |
|---|---|
| [`next`](https://www.npmjs.com/package/next) `16.2.6` | React framework — App Router, server components, image optimization |
| [`react`](https://www.npmjs.com/package/react) `19.2.4` | UI library |
| [`react-dom`](https://www.npmjs.com/package/react-dom) `19.2.4` | DOM renderer |
| [`better-auth`](https://www.npmjs.com/package/better-auth) `^1.6.11` | Email/password + Google OAuth, JWT issuance, session management |
| [`mongodb`](https://www.npmjs.com/package/mongodb) `^7.2.0` | MongoDB driver (used by Better Auth's adapter) |
| [`framer-motion`](https://www.npmjs.com/package/framer-motion) `^12.39.0` | Page and component animations |
| [`tailwindcss`](https://www.npmjs.com/package/tailwindcss) `^4` | Utility-first CSS |
| [`@tailwindcss/postcss`](https://www.npmjs.com/package/@tailwindcss/postcss) `^4` | PostCSS plugin for Tailwind v4 |
| [`babel-plugin-react-compiler`](https://www.npmjs.com/package/babel-plugin-react-compiler) `1.0.0` | React Compiler for memoization |
| [`eslint`](https://www.npmjs.com/package/eslint) `^9` | Linting |
| [`eslint-config-next`](https://www.npmjs.com/package/eslint-config-next) `16.2.6` | Next.js ESLint preset |

### Backend (sporthaven-server)

| Package | Purpose |
|---|---|
| `express` | REST API server |
| `cors` | Cross-origin allowlist for the frontend |
| `dotenv` | Loads `.env` in development |
| `jose` | JWT verification against Better Auth's JWKS |
| `jsonwebtoken` | Legacy token utilities |
| `mongodb` | MongoDB driver |

---



## 🚀 Run Locally

```bash
git clone https://github.com/Biplob106/sporthaven
git clone https://github.com/Biplob106/sporthaven-server

# 1. Backend
cd sporthaven-server
npm install
# create .env with MONGODB_URI and AUTH_BASE
npm run dev          # http://localhost:5000

# 2. Frontend
cd ../sporthaven
npm install
# create .env (see .env.example below)
npm run dev          # http://localhost:3000
```




## 📄 License

Built for the Programming Hero Assignment-9. © 2026 SportHaven.
