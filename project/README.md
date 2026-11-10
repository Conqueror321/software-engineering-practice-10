# Smart Campus Room Availability Checker

Practice 10 builds on the unchanged final Practice 09 project. One fictional room,
static fictional bookings, no login/database/backend or booking creation.

## Requirements and local setup

Node.js 22.23.2 and npm 10.9.8 were used for verification. From this directory:

```sh
npm ci --ignore-scripts
npm test -- --reporter=verbose
npm run typecheck
npm run lint
npm run build
npm run dev -- --host 127.0.0.1 --port 5191 --strictPort
```

Open http://127.0.0.1:5191/ while the local server runs. The clock is intentionally
fixed at **27 October 2026, 10:00 in the browser's local time zone**. It is not
real campus availability. Inputs and fixtures use the same local-time convention.
The default 10:30-11:00 interval is free; 11:00-11:15 overlaps; 12:00-14:00 is
exactly the permitted 120 minutes. Click the button or press Enter in a date field.
Changing either date or the block flag clears the old result. Checking never
modifies bookings. Empty or non-finite requested dates are rejected.

## Acceptance criteria

- AC1: reject start >= end and requests before the fixed NOW.
- AC2: reject more than 120 minutes; allow exactly 120 minutes.
- AC3: reject blocked rooms.
- AC4: reject strict overlaps; allow touching endpoints in both directions.
- AC5: preserve booking values, order and identities.
- AC6: preserve responsive desktop/mobile UI, reason messages, live feedback and stale-result clearing.

## Structure

- `src/lib/availability.ts`: pure availability rules and domain types.
- `src/lib/presentation.ts`: reason messages and local date formatting.
- `src/data/campus.ts`: the single room, clock and fictional fixtures.
- `src/App.tsx`: form, keyboard/click submission and status feedback.
- `src/lib/*.test.ts`, `src/App.test.tsx`: 47 tests in four files.
- `AGENTS.md`: original Practice 09 playbook, explicitly read during this work.

The repository root contains the report, seven-risk register, raw evidence,
unchanged `before/` snapshot and `practice09-baseline` git tag. The proposed
playbook update in `../patches/AGENTS.proposed.patch` is intentionally **unapplied**.
No new dependencies were introduced. The existing unused Supabase dependency
remains documented as residual supply-chain exposure, not a confirmed vulnerability.
