# Risk register

Scores are likelihood x impact, each on a 1-3 scale. Likelihood: 1 unlikely,
2 possible, 3 likely under the stated trigger. Impact: 1 minor inconvenience,
2 impaired feedback/workflow, 3 false safety decision or material scope breach.
These are reviewer judgments, not measured probabilities. R1 is scored for the
exported function receiving an invalid clock, not for an exploit in the present UI.
Owner names below are proposed project roles, not assignments to real people.

**Action priority:** 1. R1 (score 6, domain correctness; tie broken by impact).
2. R2 (score 6, repeatable keyboard failure). R3 is addressed by tests supporting
R2; R5 is addressed by required submission documentation. No unrelated source
refactor or dependency removal was made.

| ID | Category | Validation | Before L x I | Before | Residual L x I | Residual |
|---|---|---|---|---|---|---|
| R1 | Correctness | Confirmed | 2 x 3 | 6 | 1 x 3 | 3 |
| R2 | Usability / reliability | Confirmed | 3 x 2 | 6 | 1 x 2 | 2 |
| R3 | Reliability | Confirmed gap | 2 x 2 | 4 | 1 x 2 | 2 |
| R4 | Agent operations | Confirmed documentation gap | 1 x 3 | 3 | 1 x 3 | 3 |
| R5 | Maintainability | Confirmed documentation gap | 2 x 1 | 2 | 1 x 1 | 1 |
| R6 | Security / supply chain | Plausible / unverified | 1 x 2 | 2 | 1 x 2 | 2 |
| R7 | Correctness / reliability | Confirmed defensive gap; future reachability unverified | 1 x 2 | 2 | 1 x 2 | 2 |

## R1: Correctness

**Validation:** Confirmed

**Cause / event / consequence:** isAvailable has no finite-number guard; NaN/-Infinity now bypass past-time validation; invalid clock yields false availability.

**Affected component:** project/src/lib/availability.ts:isAvailable (baseline before/src/lib/availability.ts:32-38)

**Evidence:** evidence/claim-probes.txt; evidence/regression-before.txt; final-tests.txt

**Proposed mitigation:** Validate finite start/end/now before all comparisons; add nine invalid-value cases.

**Proposed owner:** Project maintainer

**Verification method:** 47-test suite and direct invalid-clock probe

**Residual assessment:** Mitigated; current UI clock was already valid; invalid booking fixtures are tracked separately in R7.


## R2: Usability / reliability

**Validation:** Confirmed

**Cause / event / consequence:** Click-only section has no form submission; pressing Enter in a date field produces no result.

**Affected component:** project/src/App.tsx:handleCheck and first section (baseline before/src/App.tsx:29,56,104)

**Evidence:** evidence/baseline-ui.txt; ui-commands.txt; regression-before.txt

**Proposed mitigation:** Use native form/onSubmit, prevent navigation and submit button; retain visual classes and feedback.

**Proposed owner:** Frontend maintainer

**Verification method:** Real Chromium Enter and click checks; App component submission tests

**Residual assessment:** Mitigated; screen-reader and non-Chromium testing remain unperformed.


## R3: Reliability

**Validation:** Confirmed gap

**Cause / event / consequence:** Baseline tests never mount App; changes can break AC6 stale-result clearing or status feedback without test failure.

**Affected component:** before/src/lib/availability.test.ts; before/src/lib/practice09.test.ts; project/src/App.tsx

**Evidence:** Baseline 26 tests; new project/src/App.test.tsx

**Proposed mitigation:** Add component checks for submission, all reason messages, stale feedback and displayed bookings.

**Proposed owner:** Test maintainer

**Verification method:** Run component suite; inspect browser evidence

**Residual assessment:** Partly mitigated as support for R2; no visual CI or multi-browser coverage.


## R4: Agent operations

**Validation:** Confirmed documentation gap

**Cause / event / consequence:** Playbook omits explicit no-secrets/no-external-deployment and merge review gates; an agent could exceed intended boundaries.

**Affected component:** project/AGENTS.md:Engineering rules and boundaries; Verification and reporting

**Evidence:** evidence/04-playbook-audit.md; patches/AGENTS.proposed.patch

**Proposed mitigation:** Review and approve the minimal proposed playbook patch; keep it unapplied until approval.

**Proposed owner:** Student / repository owner

**Verification method:** Compare playbook to course constraints; inspect proposed diff

**Residual assessment:** Open; no actual unsafe operation observed; approval has not been fabricated.


## R5: Maintainability

**Validation:** Confirmed documentation gap

**Cause / event / consequence:** The standalone baseline project lacks README/setup; a project-only copy loses parent setup instructions.

**Affected component:** before/ directory; Practice 09 parent README

**Evidence:** evidence/clean-install.txt and clean-*.txt; project/README.md

**Proposed mitigation:** Add standalone README with setup, fixtures, clock, ACs and evidence links.

**Proposed owner:** Documentation maintainer

**Verification method:** Clean npm ci, tests, typecheck, lint and build

**Residual assessment:** Mitigated by submission documentation; external toolchain versions still matter.


## R6: Security / supply chain

**Validation:** Plausible / unverified

**Cause / event / consequence:** Unused Supabase package expands installed dependency surface even though the demo has no backend. No exploit is established.

**Affected component:** project/package.json:dependencies and package-lock.json; no src imports

**Evidence:** evidence/claim-probes.txt; static source inspection

**Proposed mitigation:** In a separate reviewed change, assess removal and lockfile update; run an authorized registry audit.

**Proposed owner:** Dependency maintainer

**Verification method:** Inspect imports and dependency tree; run audit before claiming any advisory

**Residual assessment:** Open; no vulnerability audit run; no CVE or exfiltration claimed.


## R7: Correctness / reliability

**Validation:** Confirmed defensive gap; future reachability unverified

**Cause / event / consequence:** Overlap comparisons with NaN booking boundaries are false; future malformed imported data may hide a conflict.

**Affected component:** project/src/lib/availability.ts:booking overlap loop

**Evidence:** evidence/claim-probes.txt; project/src/data/campus.ts

**Proposed mitigation:** If editable/imported fixtures are later authorized, validate their boundaries before availability checks.

**Proposed owner:** Domain maintainer

**Verification method:** Malformed-fixture probe; schema tests for any future importer

**Residual assessment:** Open; current static fixtures are valid and there is no import/editor path.
