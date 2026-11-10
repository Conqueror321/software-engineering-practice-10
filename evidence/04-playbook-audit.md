# Documentation-only agent playbook audit

Compared the original `project/AGENTS.md` and Practice 09 README against the
constraints on the Task 06 photo. This audit did not change application source
or the playbook. The separate two-risk mitigation is recorded elsewhere.

| Required constraint | Baseline finding | Proposed action |
|---|---|---|
| One fictional room | Explicit in Project and structure | Retain |
| No login/database | Explicit in Engineering rules | Retain |
| Preserve AC1-AC6 | All six written explicitly | Retain verbatim |
| No secrets | Missing explicit prohibition | Add rule against reading/publishing credentials or real data |
| No external deployments | Missing explicit prohibition | Add app deployment restriction, distinguish source submission |
| Tests before acceptance | Existing original-suite / all-checks rule | Retain; add evidence and failure gate |
| Review gates | Reporting exists, merge/approval gate incomplete | Require scope/diff review and owner approval before merge |
| Background work | No isolation/allowlist rules | Link report's branch isolation plan |

No conflicting baseline rule was found. The proposed patch adds only the missing
boundaries and acceptance gate. `patches/AGENTS.proposed.patch` is a real unified
diff, validated with `git apply --check`, and is **NOT applied**. The student's
approval has not been invented. Leaving it as a draft follows Task 06's explicit
request to draft first and wait before applying. It is not necessary to change
this file to deliver the two source fixes authorized by the user's request.
