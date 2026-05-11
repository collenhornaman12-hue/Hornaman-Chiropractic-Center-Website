# Handover Document — Hornaman Chiropractic Center Website

**Project:** Hornaman Chiropractic Center static website
**Repository:** collenhornaman12-hue/Site-Test
**Date:** 2026-05-08
**Session:** claude/hornaman-chiropractic-website-woJ6T

---

## Project Summary

Built a complete static marketing website for Hornaman Chiropractic Center located in Union City, Pennsylvania. The site is a single-page HTML/CSS/JS site with no backend or build tooling required.

---

## What Was Built

### Files

| File | Purpose |
|------|---------|
| `index.html` | Full single-page site markup |
| `style.css` | All styling, responsive layout |
| `script.js` | Smooth scroll + appointment form feedback |
| `CNAME` | Custom domain: `hornamanchiropracticcenter.com` |

### Page Sections

1. **Sticky header** — logo, nav links, "Book Appointment" CTA button
2. **Hero** — tagline "Feel Better. Move Better. Live Better." with Schedule CTA
3. **Services grid** — 6 cards: Spinal Adjustments, Muscle & Soft Tissue Therapy, Sports Injury Care, Family Chiropractic, Auto Accident Recovery, Wellness & Prevention
4. **About** — practice description + office hours table (Mon–Fri 9–6, Fri closes 4, Sat by appt, Sun closed)
5. **Contact** — phone/address + appointment request form (name, phone, email, reason for visit, notes)
6. **Footer** — copyright 2026

### Key Details

- **Phone:** (814) 438-7242 — wired to `tel:+18144387242` on both the contact info block and "Call to Book" button
- **Address:** Union City, Pennsylvania (no street address provided — placeholder only)
- **Email:** Not provided — placeholder text reads "Ask us about accepting new patients"
- **Color scheme:** Navy/blue `#1a5c8a` primary, `#0f3a57` dark variant
- **Responsive:** Mobile breakpoint at 768px, grid collapses to single column

---

## Current State

### Git Branches

| Branch | Status |
|--------|--------|
| `claude/hornaman-chiropractic-website-woJ6T` | All site files, pushed to origin |
| `main` | Exists on remote, contains only `CNAME` |

### Commits (feature branch)

```
9ab8e5a Create CNAME
72838dc Add phone number (814) 438-7242
283837a Add Hornaman Chiropractic Center website
```

### Deployment

- **Custom domain configured:** `hornamanchiropracticcenter.com` (via `CNAME` file on `main`)
- **GitHub Pages:** Not yet fully activated — user needs to go to **github.com/collenhornaman12-hue/Site-Test → Settings → Pages** and set source branch to `claude/hornaman-chiropractic-website-woJ6T`, path `/`
- **Expected live URL:** `https://hornamanchiropracticcenter.com` (once DNS and Pages are configured)

---

## Outstanding / Next Steps

- [ ] **Activate GitHub Pages** — repo owner must enable in Settings > Pages (see instructions above)
- [ ] **DNS** — point `hornamanchiropracticcenter.com` A/CNAME records to GitHub Pages IPs
- [ ] **Street address** — add physical address to the Contact section (`index.html:113`)
- [ ] **Email address** — replace placeholder at `index.html:115` when available
- [ ] **Appointment form backend** — currently shows a confirmation message only; no data is sent anywhere. Connect to a form service (e.g. Formspree, Netlify Forms) to capture submissions
- [ ] **Office hours verification** — hours in `index.html:95–102` were assumed; confirm with the practice
- [ ] **Photo/imagery** — hero is a CSS gradient; adding a real photo would improve first impressions
- [ ] **Google Maps embed** — could be added to the Contact section once street address is confirmed
- [ ] **SEO meta tags** — add `<meta name="description">` and Open Graph tags to `index.html`

---

## Technical Notes

- Pure static site — no framework, no build step, no dependencies
- To preview locally: open `index.html` in any browser, or run `python3 -m http.server 8080` from the project root
- Appointment form (`script.js:handleSubmit`) resets the form and shows a confirmation message; it does **not** POST anywhere
- The `main` branch on the remote only has the `CNAME` file — site files live only on the feature branch until merged
