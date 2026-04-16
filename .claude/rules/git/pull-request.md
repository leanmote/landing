---
description: Generate a pull request title and description in English, using the available branch, diff, and ticket context to produce clear reviewer-friendly content.
alwaysApply: false
---

# Rule: Pull Request

## Intent

When the user writes `pr`, `pull request`, or `merge request`, generate a clear and structured pull request title and description in English.

This rule is responsible for:

- generating a concise PR title
- generating a reviewer-friendly PR description
- summarizing what changed and why
- listing the most relevant technical changes
- including testing notes when relevant
- including the issue key when available

---

## Sources of Truth

Use the following sources when available:

1. the branch name
2. the staged or committed diff
3. the Jira ticket context, if available
4. the user’s direct request

Prefer repository context over assumptions.

Do not invent issue keys, branch names, or technical changes.

---

## PR Title Rules

The title must:

- be written in English
- be concise and specific
- reflect the main intent of the change
- be easy for reviewers to understand
- align with the actual scope of the branch or diff

Good examples:
- Add onboarding payload validation
- Fix parser fallback handling for missing fields
- Refactor event processing flow for clearer error handling

Avoid:
- update stuff
- fixes
- improvements
- several changes
- misc updates

---

## PR Description Structure

Use this structure:

```md
## Summary
Brief explanation of what this PR does and why.

## Main Changes
- ...
- ...
- ...

## Technical Notes
- ...
- ...

## Testing
- ...
- ...

## Issue
<ISSUE-KEY>
```

If a section is not relevant, omit it instead of filling it with vague text.

---

## Section Rules

### Summary

The summary should explain:

- what changed
- why it changed
- what outcome is expected

Keep it short and clear.

---

### Main Changes

Use bullet points to list the most important changes.

Focus on:
- behavior changes
- structural changes
- key implementation details
- anything a reviewer should notice

Do not dump the full diff.

---

### Technical Notes

Include only when useful.

Examples:
- compatibility notes
- migration notes
- assumptions
- edge cases
- follow-up work not covered here

If there are no relevant technical notes, omit this section.

---

### Testing

Mention:
- tests added or updated
- manual validation performed
- if no testing was done, state it clearly

Examples:
- Added unit tests for onboarding validation
- Manually verified fallback handling with missing optional fields
- No automated tests were added

---

### Issue

If the branch name or Jira context contains a valid issue key, include:

```text
RD-1605
```

Do not invent issue keys.

If there is no issue key, omit the section.

---

## Jira Behavior

If Jira context is available:

- read the ticket before generating the PR
- use the ticket as context for the PR title and summary
- keep the PR aligned with the ticket scope

If Jira context is not available:
- rely on the branch name, diff, and user request

---

## Behavior

When the user writes `pr`, `pull request`, or `merge request`:

1. Inspect the available context
2. Generate the PR title
3. Generate the PR description using the defined structure
4. Include the issue key only if it is clearly available
5. Return only the PR content unless the user asks for explanation

---

## Output Rules

If the user only asks for the PR content:

- return only the PR title and description
- do not include extra commentary unless requested

If the user confirms that the PR should be created:

- ask for the base branch
- generate the final `gh pr create` command

---

## Example

### Title
Add onboarding payload validation

### Description

```md
## Summary
Add validation for onboarding payloads before processing to improve input consistency and reduce parsing errors.

## Main Changes
- Validate required fields before payload processing
- Add fallback handling for optional attributes
- Improve error messages for invalid inputs
- Refactor parser flow to centralize validation behavior

## Technical Notes
- Validation now happens before parser normalization
- Existing consumers are not expected to change behavior for valid payloads

## Testing
- Added unit tests for required field validation
- Manually verified invalid payload scenarios

## Issue
RD-1605
```

---

## Base Branch Selection

Before creating the pull request, you must ask the user:

"Which branch do you want to open the PR against?"

Rules:

- do not assume the base branch
- do not default to `main` unless the user explicitly confirms
- wait for the user response before generating the final command

---

## PR Creation

After generating the PR title and description:

1. Ask the user:
   - "Do you want to create the pull request?"

2. If the user answers yes:
   - ask:
     "Which branch do you want to open the PR against?"

3. Once the base branch is provided, run:

```bash
gh pr create \
  --title "<generated_title>" \
  --body "<generated_description>" \
  --base <base-branch> \
  --head <current-branch>
```

### Rules:

- do not create the PR without knowing the base branch
- do not assume the base branch
use the current branch as head