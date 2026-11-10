# Agent-readiness audit

## Working rubric

The photos ask for Level 1/2/3 but do not define the levels. For this report:
Level 1 = manual/fragile setup and weak checks; Level 2 = repeatable local setup,
automated checks, separated code and documented agent scope; Level 3 = Level 2
plus enforced remote checks, complete approved operational gates and sufficient
UI evidence to support bounded asynchronous work. This is an explicit working
rubric, not an invented official course definition.

**Baseline: Level 2, with gaps.** Pure rules, presentation and fixtures are split;
26 tests, typecheck, lint, production build and a committed lockfile work. Parent
README is accurate about its fixed demo and no publication, but project-only
README is absent. AGENTS.md specifies scope, commands and AC1-AC6, yet omits
secrets/deployment restrictions and merge approval. Baseline has no App-mounted
regressions or CI. Installed local dependencies alone are not a clean-setup proof.

**Final: strengthened Level 2.** Standalone README, 47 tests, reproducible clean
npm ci/checks, actual desktop/mobile Chromium evidence and a CI workflow are
provided. A workflow file alone does not prove a remote run passed; see the
GitHub run and evidence/remote-ci.txt when available. No automatic instruction
loading, autonomous acceptance or protected branch is claimed. AGENTS.md patch remains unapplied by design.

## Evidence checklist

| Area | Evidence | Limitation |
|---|---|---|
| README / setup | Root + project README; clean-install.txt | Tested on one macOS/Node 22.23.2 environment |
| Layout | src/lib, src/data, App | Small project, no architecture rewrite needed |
| Tests | baseline-tests.txt; final-tests.txt; clean-tests.txt | No full screen-reader/multi-browser suite |
| Static checks | baseline/final/clean typecheck and lint logs | tsc uses existing app configuration |
| Build | baseline/final/clean build logs and locked package tree | Build reproducibility means success, not cross-platform byte identity |
| Instructions | Explicitly read original AGENTS.md | No evidence of automatic agent discovery |
| Operational gates | Proposed patch and background-agent plan | Proposed patch unapproved/unapplied |
| CI | .github/workflows/verify.yml | Inspect the actual run, not just YAML |

Missing evidence: approved playbook update, enforced branch protection,
non-Chromium testing, screen-reader behavior,
registry vulnerability audit and a second OS. No deployment is required or performed.
