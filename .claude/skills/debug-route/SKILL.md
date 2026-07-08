---
name: debug-route
description: Instrument a Next.js API route with diagnostic logging and verbose error responses to debug a production failure (5xx, wrong behavior) on Cloudflare Pages, deploy it, and revert the instrumentation once the bug is found. Use when a deployed API route fails and the cause isn't visible locally.
argument-hint: <route path, e.g. app/api/admin/confirm/route.ts> [symptom]
---

# Debug-route: instrument, deploy, diagnose, revert

Production API routes on this site run on Cloudflare Pages edge runtime, where
failures are opaque (bare 502s, no stack traces). This skill wraps one route in
diagnostics, ships it, and — once the cause is identified — restores clean code.
The goal is to converge in ONE instrumented deploy, not a guess-per-deploy loop.

## Constraints of this codebase (learned the hard way)

- `export const runtime = "edge"` must appear at the very top, before imports —
  wrong ordering has caused 502s before the handler even runs.
- Edge runtime: no Node APIs. Raw `fetch` only (Supabase REST, Cal.com API).
- The only visibility into a failing request is what the route RETURNS —
  `console.log` on Cloudflare is easy to miss, so put diagnostics in the
  response body too.
- Deploys come only from `main`; every iteration costs a full Cloudflare build.
  Instrument everything plausibly relevant in one pass.

## Steps

1. **Read the route** and restate the symptom (status code, when it happens,
   what the client shows). If the user gave an error body, parse it first —
   the answer may already be there, needing no instrumentation at all.
2. **Snapshot the clean version** so revert is trivial:
   copy the file to the scratchpad directory before editing.
3. **Instrument in one pass**, all of:
   - Top-level `try/catch` around the whole handler; the catch returns
     `{ error: "handler crashed", message: String(err) }` with status 500.
   - Env-var presence check for every `process.env.*` the route uses, returning
     which one is missing by name (never its value).
   - Log + echo the parsed request body fields (ids only — no PHI: never echo
     patient names, emails, DOBs, or notes).
   - For every outbound `fetch`: on non-ok, return
     `{ upstreamStatus, upstreamBody: await res.text(), urlTried }` so the
     upstream's real error message reaches the dashboard.
4. **Ship it** using the `/ship` skill (push via GitHub MCP to `main`,
   hard-sync local).
5. **Tell the user exactly what to do**: which action to trigger, and that the
   error shown in the UI/response will now contain the real upstream error.
   If the failure is reproducible with `curl` (no auth cookie needed), test it
   directly instead of waiting for the user.
6. **Diagnose from the diagnostic output** the user (or curl) brings back.
   Fix the actual bug.
7. **Revert the instrumentation**: restore clean code (from the snapshot, plus
   the real fix), keep the top-level try/catch and env checks if they're cheap,
   drop raw-body echoes and debug rows. Ship again. Never leave debug row
   inserts or payload dumps in production — they've polluted the
   `patient_intake` table before.

## Anti-patterns to refuse

- Stripping the route to a bare echo as a first move — instrument the full
  logic instead; a stripped route proves routing works but costs two extra
  deploys.
- Changing auth methods / API versions speculatively per deploy. Get the
  upstream error body FIRST, then change the one thing it names.
- Leaving `console.log(JSON.stringify(fullBody))` of patient data in the
  webhook or routes after debugging ends.
