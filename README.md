# Software Engineering - Practice 10

**Dastan Karbuzov | 24B031050 | 10 November 2026**

Smart Campus risk review, agent-readiness audit and two controlled mitigations.

[Read the PDF report](report/Practice_10_Report.pdf) ·
[Editable report](report/Practice_10_Report.md) ·
[Risk register](report/risk-register.md) ·
[CSV register](report/risk-register.csv)

## Results

- Seven risks; nine challenged claims with confirmed, plausible/unverified or unsupported labels.
- Two fixes: invalid numeric dates/clock fail closed; Enter submits the existing form.
- 47/47 tests pass; typecheck, lint and build pass, including a clean locked installation.
- 5,610 finite-input decisions match the baseline; fixtures remain unchanged.
- 23 real browser assertions and six desktop/mobile screenshots.
- Original Practice 09 checkpoint: `practice09-baseline` (fd0769d), plus unchanged `before/`.
- AGENTS.md update is a validated, **unapplied proposal**, as required by Task 06.

## Run locally

Node.js 22.23.2 / npm 10.9.8 were used.

```sh
cd project
npm ci --ignore-scripts
npm test -- --reporter=verbose
npm run typecheck
npm run lint
npm run build
npm run dev -- --host 127.0.0.1 --port 5191 --strictPort
```

Open http://127.0.0.1:5191/ while running locally. The demo uses one fictional room
and a fixed local clock: **27 October 2026, 10:00**. It has no login, database,
real booking data or booking creation. See [project setup](project/README.md).

## Assignment traceability

| Task | Deliverable |
|---|---|
| 01 Baseline | `before/`, tag, `evidence/baseline-*.txt` |
| 02 Read-only review | [Initial review](evidence/01-read-only-review.md) |
| 03 Challenge AI findings | [Nine challenged claims](evidence/02-challenged-findings.md) |
| 04 Risk register | [Seven complete entries](report/risk-register.md) |
| 05 Agent readiness | [Justified Level 2 audit](evidence/03-agent-readiness.md) |
| 06 Agent playbook | [Audit](evidence/04-playbook-audit.md), [unapplied patch](patches/AGENTS.proposed.patch) |
| 07 Verification | `evidence/`, [browser results](evidence/ui-results.json), `screenshots/` |
| 08 Two mitigations | [Reviewed patch](patches/mitigations.patch), [scope and residual risk](evidence/05-mitigation-review.md) |
| 09 Background agent | [Written isolation and review plan](report/09-background-agent.md) |

The expanded suite was first executed on the original source: 6 failed / 41 passed;
then all 47 passed after the two-file patch. Original tests, fixture data, dependency
files, presentation helpers and AGENTS.md are unchanged. No new package is required.

## Verification evidence

Raw logs include baseline, red regressions, final checks, clean-install checks and
actual gstack browser commands. `evidence/compare-behavior.mjs` reproduces decision
comparison from this directory with Node 22:

```sh
node --experimental-strip-types evidence/compare-behavior.mjs
```

`evidence/check-ui.py` reproduces browser checks with both local servers running;
set BROWSE_BIN and BROWSE_STATE_FILE for your own gstack installation. Local paths
in captured logs describe the original execution machine, not setup requirements.

## Limits and AI disclosure

Prepared with Codex (GPT-6) and gstack browse. Source-based challenge and diff review
were performed by the agent, not claimed as independent student approval. The
student should inspect the submission. The level rubric is explicitly defined in
the audit because the photos did not provide definitions. No screen-reader,
Safari/Firefox, real-device, registry vulnerability audit or app deployment was run.
R6 is unverified supply-chain exposure; malformed future fixture validation (R7)
remains open. The background-agent exercise is a thought experiment, not an
actual run. GitHub source publication is the requested submission, not app hosting.
