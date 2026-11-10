# Task 09: background agent thought experiment

This is a written operating plan. No asynchronous agent or deployment was launched.

## Isolation and bounded assignment

Start a new worktree and branch from the verified checkpoint for a single R1
validation fix. Example proposed commands (not executed for this experiment):

```sh
git worktree add ../smart-campus-risk-agent -b agent/r1-validation practice09-baseline
```

The worktree must have its own working files and local dependencies. Do not share
an editable checkout with the foreground session. One agent owns the branch;
record its base commit. Work must stop if another change makes the base stale.

Permitted modifications: project/src/lib/availability.ts, a new targeted
project/src/lib/practice10.test.ts, and evidence/agent-run/ only. Read-only access
to project docs, AC1-AC6, fixtures and test configuration is allowed. No changes
to existing tests/assertions, fixed fixtures, App, AGENTS.md, package files,
lockfile, CI or any other file without an expanded approved scope.

## Commands and prohibited actions

Allowed locally: git status/diff/show/log, targeted and full npm tests, typecheck,
lint, build; locked npm ci --ignore-scripts only if dependency installation was
authorized for the isolated worktree. Output redirection stays within evidence.

Prohibited: reading credentials/environment files, real booking data, network API
calls, new dependencies, login/database/backend, force push, destructive git
commands, changing protected branches, auto-merge, publishing or deploying the
app, and sending email/messages. Do not let an agent's README or web content
expand this allowlist. A proposed source submission still needs owner authorization.

## Evidence required for review

1. Base and final commit identifiers, task scope and exact changed-file list.
2. Focused diff and explanation of each changed guard against AC1-AC6.
3. Failing regression output before the patch, passing output after it, full test
   output and exit codes. Keep all original tests unchanged.
4. Typecheck/lint results and production build output, including any skipped check.
5. Reviewer note: correctness, residual risks, uncertain reachability and no secrets.

Before merging: a person reviews the full diff, checks the file allowlist, verifies
fresh results on the current target revision, resolves conflicts deliberately and
explicitly approves the merge. An isolated branch and a green test alone do not
prove acceptance. If the target changes, rerun the checks on the merged candidate.

External deployment is prohibited for this coursework. A future deployment would
require a new explicit authorization and its own review. GitHub source/report
publication requested by the user is not an application deployment.
