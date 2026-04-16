---
description: Review the staged changes before creating a commit, so potential issues can be detected and fixed before the commit is generated.

alwaysApply: false
---

# Rule: Pre-Commit Review

## Intent

When the user requests a commit flow, perform a pre-commit review before generating the final commit message.

This rule is responsible for:

- reviewing the staged changes before commit
- identifying possible issues early
- improving code quality before the changes are committed
- helping the user catch problems before opening a PR

---

## Source of Truth

Use only:

1. the staged diff
2. the current branch name when relevant for context

Do not review:
- unstaged changes
- untracked files unless they are explicitly staged
- unrelated repository areas outside the staged diff

---

## Review Goals

Before allowing the commit flow to continue, review the staged changes for:

- logic errors
- edge cases
- inconsistent naming
- duplicated logic
- unnecessary complexity
- poor readability
- missing validation
- possible regressions
- architecture inconsistencies
- test gaps when relevant

---

## Review Style

The review must be:

- concise
- practical
- focused on actionable findings
- based only on the staged diff

Do not invent issues that are not supported by the staged changes.

If no relevant issues are found, say so clearly.

---

## Output Format

Use this structure:

### Review Result
- approved
or
- changes suggested

### Findings
- <finding 1>
- <finding 2>

### Recommendation
- proceed to commit
or
- fix the issues before committing

---

## Behavior

When the user starts a commit flow:

1. First apply this pre-commit review rule
2. Review the staged diff
3. If issues are found:
   - show them clearly
   - recommend fixing them before committing
4. If no relevant issues are found:
   - approve the changes
   - allow the flow to continue to `commit.md`

---

### Post-Review Interaction

If the review finds issues and the commit flow is stopped:

You must guide the user by asking what they want to do next.

Use a clear interaction like:

- Fix the issues and review again
- Proceed with the commit anyway

---

### Behavior

If the user chooses to fix:

1. Ask the user to update the changes
2. Then instruct the user to type `again` once the changes are ready
3. When the user writes `again`:
   - re-run the pre-commit review using the updated staged diff
4. If approved:
   - continue with the commit flow
5. If issues remain:
   - show findings again
   - ask again what they want to do

If the user chooses to proceed anyway:

1. Continue with the commit flow
2. Clearly display the previous review findings before committing
3. Do not block the commit

---

### Important

Do not require the user to remember specific commands like "review again" or "commit anyway".

Always guide the next step explicitly after showing the review results.

---

## Integration with Commit Rule

This rule should run before `commit.md`.

The expected flow is:

1. pre-commit review
2. commit flow, load `commit.md`
3. ask whether the user wants to push
4. if yes, load `push.md`

---

## Output Rules

- do not generate the commit message inside this rule
- do not generate push commands inside this rule
- do not modify the review scope beyond the staged diff
- keep the review useful and short