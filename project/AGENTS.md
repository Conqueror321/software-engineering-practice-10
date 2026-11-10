# Smart Campus - Practice 09

## Project and structure
One fictional room and one fixed local demo clock. React/TypeScript/Vite.
- src/lib/availability.ts: pure rules and domain types; no UI dependencies.
- src/lib/presentation.ts: messages, display and input date formatting.
- src/data/campus.ts: room name, fixed current time, fictional bookings.
- src/App.tsx: existing responsive form and feedback.
- src/lib/*.test.ts: regression and presentation checks.

## Acceptance contract
AC1: reject start >= end and requests before the fixed NOW.
AC2: reject duration > 120 minutes; allow exactly 120 minutes.
AC3: reject blocked rooms.
AC4: reject strict overlaps; allow touching endpoints in either direction.
AC5: never mutate booking data or reorder input fixtures.
AC6: preserve desktop/mobile UI, clear reason messages, live feedback and stale-result clearing.

## Engineering rules and boundaries
Use the existing repaired Practice 08 source. Keep pure functions and minimal edits.
Use at most two justified patterns. No Adapter for consistent {start,end} data.
No Strategy for a single policy. No Singleton, Factory or class hierarchy.
No backend, database, login, real bookings, booking creation or new policy.
Keep every original test and assertion. Preserve the fixed date and booking values.

## Commands (Node 22.23.2)
npm ci --ignore-scripts
npm test -- --reporter=verbose
npm run typecheck
npm run lint
npm run build
npm run dev -- --host 127.0.0.1

## Verification and reporting
Run the original suite before changes; run all checks after changes.
Check desktop 1440x1000 and mobile 390x844 with real browser screenshots.
Record exact output, changed files and limitations. Do not invent Bolt responses,
publication, independent experiments, automatic instruction loading or test results.
Read this file explicitly before editing; do not assume any agent automatically loads it.
