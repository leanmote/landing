---
description: Guide the merge flow between branches, requiring the user to explicitly define the merge direction before generating commands.

alwaysApply: false
---

# Rule: Merge

## Intent

When the user writes `merge`, guide the user through the correct merge flow between two branches.

This rule is responsible for:

- identifying the source branch and the target branch
- ensuring the merge direction is explicitly confirmed by the user
- generating the correct git commands in the proper order
- warning about possible merge conflicts
- avoiding unsafe assumptions about branch flow

---

## Required Input

Before generating any merge command, you must know:

1. the source branch
2. the target branch

The user must explicitly clarify the merge direction.

Examples:
- merge `feature/onboarding-validation` into `develop`
- merge `develop` into `main`

These are not interchangeable.

Do not assume merge direction.

---

## Required Clarification Behavior

If the user writes `merge` without enough information:

1. Ask which branch should be merged from
2. Ask which branch should be merged into

Use a clear prompt like:

- What is the source branch?
- What is the target branch?

Do not generate commands until both branches are confirmed.

---

## Merge Validation Rules

Before generating the merge flow:

- ensure both branch names are explicitly provided
- do not invent branch names
- do not infer merge direction from context alone
- keep the merge flow minimal and correct

If the user also wants to push the merge result, that should happen only after the merge step.

---

## Merge Strategy

Before generating the final merge commands, determine which merge strategy the user wants to use.

Supported strategies:

- standard merge
- squash merge

If the strategy is not specified, ask the user which one they want.

Do not assume the strategy by default unless the repository convention clearly defines it.

---

## Required Merge Flow

Once the source and target branches are confirmed, use:

```bash
git fetch origin
git checkout <target-branch>
git pull origin <target-branch>
git merge origin/<source-branch>
```

If the user wants to push after the merge, then append:

```bash
git push origin <target-branch>
```

---

## Optional Squash Merge

Use:

```bash
git checkout <target-branch>
git pull origin <target-branch>
git merge --squash <source-branch>
git commit -m "<merge-commit-message>"
```

If the user also wants to push after the squash merge:

git push origin <target-branch>

Rules for squash merge:

- explain that --squash combines the source branch changes into a single commit
- explain that it does not preserve the full merge commit history in the same way as a standard merge
- if a squash merge is selected, the final commit message must follow the rules defined in `commit.md`

---

## Optional Safer Merge Flow

If the repository prefers preserving explicit merge history, or if the user asks for it, use:

```bash
git checkout <target-branch>
git pull origin <target-branch>
git merge --no-ff <source-branch>
```

Use `--no-ff` only when appropriate.
Do not force it by default unless the repository convention requires it.

---

## Conflict Awareness

Always make the user aware that merge conflicts may happen if the branches diverged.

If merge conflicts occur:

1. Clearly tell the user which files are in conflict.
2. Explain what kind of conflict each file appears to have, based on the conflicting sections if that context is available.
3. Advise the user on how to resolve each conflict, instead of only telling them to resolve it manually.

When advising how to resolve conflicts:

- explain which change should likely be kept from each side, when that is clear from the context
- suggest combining both changes when they are compatible
- suggest rewriting the final block when both sides changed the same logic in incompatible ways
- point out possible risks, such as duplicated logic, lost validations, broken imports, or inconsistent naming
- recommend preserving the version that matches the most recent intended behavior, architecture, or ticket scope

Tell the user to look for Git conflict markers such as:

- `<<<<<<<`
- `=======`
- `>>>>>>>`

Explain that they should remove the markers and leave only the final resolved code.

Use this resolution flow:

```bash
git status
# inspect conflicted files
# resolve conflicts in each file
git add <resolved-files>
git commit
```

If context is available, provide conflict-specific guidance like:

- which imports should remain
- which function signature should be preserved
- whether both validations should be kept
- whether one branch introduced a refactor that should not be reverted
- whether the final code should merge both branches' changes

Always try to give practical advice for each conflicted file, not just generic instructions.

Do not over-explain unless the user asks for more detail, but always provide enough guidance so the user understands:

- which files conflicted
- what the conflict is about
- the best way to resolve it
- how to complete the merge after resolving the conflicts

---

## Behavior

When the user writes `merge`:

### If source branch or target branch is missing
- ask for both branches
- do not generate commands yet

### If merge strategy is missing
- ask whether they want:
  - a standard merge
  - a squash merge

### If source, target, and strategy are clear
- generate the commands in the correct order
- if the strategy is squash merge, include the final commit step
- if the user wants to push, append the push command

---

## Output Rules

- return only the commands unless the user asks for explanation
- if merge conflicts occur, explain the conflicted files and provide practical resolution guidance
- do not invent branch names
- do not assume merge direction
- do not include unnecessary steps
- keep the commands in the correct order

---

## Examples

### Example 1: standard merge

```bash
git checkout develop
git pull origin develop
git merge feat/RD-1605-onboarding-validation
```

### Example 2: squash merge

```bash
git checkout develop
git pull origin develop
git merge --squash feat/RD-1605-onboarding-validation
git commit -m "feat: add onboarding validation"
```

### Example 3: squash merge with push

```bash
git checkout main
git pull origin main
git merge --squash release/v1.2.0
git commit -m "chore: merge release v1.2.0 changes"
git push origin main
```