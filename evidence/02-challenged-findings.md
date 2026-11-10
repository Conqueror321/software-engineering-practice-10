# Evidence-based challenge of AI findings

The proposed findings are checked against source code, executed probes and
recorded browser behavior.

| Claim | Category | Label after inspection | Evidence and uncertainty |
|---|---|---|---|
| R1 invalid clock can produce Available | Correctness | Confirmed | `claim-probes.txt` reproduces NaN/-Infinity; two red regressions returned Available. Current UI uses a valid fixed NOW. |
| R2 Enter in a time field gives no feedback | Usability/reliability | Confirmed | `baseline-ui.txt` records null status and zero forms after Enter; click then shows Available. Keyboard activation of the focused button already worked. |
| R3 AC6 has no component regression coverage | Reliability | Confirmed | Original two test files import rules/helpers, never App. 11 new component cases now cover submission, messages and clearing. |
| R4 playbook has incomplete operational boundaries | Agent operations | Confirmed gap | Explicit no-secrets/no-deployment and merge gate absent from original AGENTS.md; proposed patch is not applied. No unsafe action proved. |
| R5 standalone project setup is missing | Maintainability | Confirmed gap | No README in original project; parent Practice 09 README exists. This narrows the claim to a project-only copy. |
| R6 unused Supabase is exploitable | Security | Plausible / unverified only as dependency exposure | Package exists, src has no imports. No audit/CVE/exploit test run; an assertion of an actual vulnerability would be unsupported. |
| R7 malformed booking dates hide conflicts | Correctness/reliability | Confirmed function behavior; reachability unverified | NaN booking direct probe returns Available. Current static fixtures are valid; no import feature exists. |
| Availability checking mutates or reorders fixtures | Correctness | Unsupported | Copy-before-sort in App, read-only loop in isAvailable, frozen-fixture tests and 5,610 comparisons contradict the claim. |
| Owner labels expose real personal booking data | Privacy | Unsupported for this demo | Fixtures are fictional; no login, API calls, storage or real-user data path found. This is not a privacy certification for future deployments. |

The challenge spans correctness, usability, reliability, maintainability, security,
privacy and agent operations. Unsupported claims are not promoted to confirmed
risks. No unexecuted test is reported as passing.
