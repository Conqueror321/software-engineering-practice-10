# Read-only risk review (before source changes)

Review date: 10 November 2026, Asia/Almaty.
Baseline: git tag `practice09-baseline`, commit `fd0769d`.
This phase inspected source, documentation, existing tests and browser behavior.
No application source was edited during this phase. Generated build output and
local dependency links are ignored. Logs are fresh executions, not copied Practice 09 results.

## Proposed findings

1. **R1 / correctness:** `project/src/lib/availability.ts:isAvailable`, initial guards,
   compare numbers without checking `Number.isFinite(now)`. With start=100,
   end=200, now=NaN (or -Infinity), no bookings, the actual result is available.
   Impact: a broken clock bypasses AC1 past-time protection. Verify with a regression
   test asserting invalid_range for non-finite start/end/now. Reachability from
   the present UI is limited: NOW is a valid fixed constant.
2. **R2 / usability, reliability:** `project/src/App.tsx:handleCheck` and the first
   section use a click-only button; no form/onSubmit exists. Browser probe: focus
   end input, press Enter -> no status; clicking the button -> Available. Impact:
   keyboard submission has no feedback. Verify actual Enter in Chromium, then
   a form submission regression. Keyboard users can still Tab to and activate
   the button; this is not a claim that all keyboard access is broken.
3. **R3 / reliability:** `project/src/lib/*.test.ts` cover rules and presentation
   helpers but never mount App. AC6 stale-result clearing and live feedback can
   regress without a failing test. Verify by inspecting test imports and adding
   component regressions. Existing manual evidence does not replace an automated check.
4. **R4 / agent operations:** `project/AGENTS.md` lists scope and commands but has
   no explicit no-secrets/no-external-deployment rule or rule requiring review
   before merge. Impact: future agents have incomplete boundaries. Verify through
   a documentation-only checklist. No actual secret disclosure or unsafe deployment observed.
5. **R5 / maintainability:** baseline project has no standalone README; setup is
   in its parent Practice 09 README. A project-only checkout lacks setup, fixed
   clock explanation and evidence locations. Verify by listing files, then execute
   documented setup in a clean directory. Runtime impact is indirect.
6. **R6 / security, supply chain:** `project/package.json` and package-lock include
   Supabase though no source imports it. This expands installed dependency scope
   for a no-backend demo. Verify imports, dependency tree and an optional registry
   audit. This is plausible exposure, not evidence of an exploitable vulnerability;
   no vulnerability audit has been run and no CVE is claimed.
7. **R7 / correctness, reliability:** `project/src/lib/availability.ts` overlap loop
   ignores a booking with NaN boundaries because comparisons are false. Impact:
   future malformed imported data could appear conflict-free. Verify a direct probe.
   Current fixtures are valid, static and cannot be edited/imported in the UI.

## Challenged claims and scope

The seven findings are proposals until checked against evidence. Additional
claims to challenge: checking availability mutates/reorders bookings; booking
owner strings leak real personal data. Do not assume either is true.
Risks are evaluated for this fictional-room demo, not an imagined production service.
No login/database, booking creation, real data or external app deployment is permitted.
