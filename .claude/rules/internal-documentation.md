---
description: Keep internal documentation and rules updated whenever code is modified. Can also be triggered manually using `internal docs`.

alwaysApply: true
---

# Rule: Internal Documentation Sync

## Intent

Ensure that internal documentation and rules remain consistent with the system behavior.

This rule works in two modes:

1. Automatic → when Claude modifies code  
2. Manual → when the user writes `internal docs`

---

## Trigger Modes

### Automatic Trigger

This rule is automatically triggered when:

- code is created
- code is modified
- logic or behavior changes

This applies only when Claude is involved in the code change.

---

### Manual Trigger

If the user writes:

internal docs

Then:

- inspect recent code changes (commits, staged, working tree)
- detect documentation gaps
- update docs and rules accordingly

This is used when code was modified manually outside Claude.

---

## Non-Trigger Conditions

This rule must NOT be triggered for:

- documentation-only changes
- git operations (commit, push, merge)
- test execution

---

## Responsibilities

When triggered (automatic or manual), Claude must:

- update inline comments if needed
- ensure function and method behavior is clearly described
- keep naming aligned with intent
- update or create documentation if behavior changes
- update rules if development patterns or workflows change

If a module introduces:

- reusable patterns
- non-obvious business rules
- multi-step workflows

Then:

- create or update a dedicated document in `/docs/`

---

## Scope

This applies to:

- services
- controllers
- helpers
- domain logic
- integrations
- data onboarding flows
- validation logic

---

## Documentation Structure

Use:

- `/docs/` → system behavior, flows, decisions
- `/rules/` → how Claude operates and workflows

---

## Behavior

### Automatic Mode

When Claude modifies code:

1. understand the change
2. evaluate if documentation is affected
3. evaluate if rules are affected
4. update both if needed

---

### Manual Mode (`internal docs`)

1. inspect recent code changes
2. detect documentation gaps
3. update `/docs/` and `/rules/` if needed

---

## Output Rules

If documentation or rules are affected:

- include only the updated content

If not:

- do not mention documentation explicitly

---

## Summary

- code and documentation must evolve together
- automatic sync when Claude modifies code
- manual sync via `internal docs`