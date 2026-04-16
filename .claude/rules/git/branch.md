---
description: Generate a branch name following conventional branch naming rules, including type prefixes and optional issue key inferred from context.

alwaysApply: false
---

# Rule: Branch

## Intent

When the user writes `branch` or `branches`, generate a branch name that follows repository conventions and is clear, consistent, and easy to understand.

This rule is responsible for:

- generating a properly structured branch name
- using standardized prefixes
- including an issue key when available
- ensuring naming consistency and readability

---

## Naming Convention

The branch name must follow this structure:

```text```
<type>/<ISSUE-KEY>-short-description
If no issue key is available:

<type>/short-description

---

## Language Rules
- use English for branch names
- keep naming consistent across the repository
- avoid mixing languages

---

## Prefix Types

Use standardized prefixes:

- feat/ → new functionality
- fix/ → bug fixes
- refactor/ → code restructuring without behavior change
- chore/ → maintenance, configuration, CI/CD
- docs/ → documentation only
- test/ → adding or improving tests

Always choose the most accurate type.

---

## Issue Key Rules

If an issue key is available (e.g. RD-1605, ENG-42, AI-77):

- include it after the prefix
- keep it uppercase
- do not modify its format

Example:

feat/RD-1605-add-onboarding-validation

If no issue key is provided:

- do not invent one
- generate the branch without it

Example:

feat/add-onboarding-validation

---

## Description Rules

The description must:

- be written in English
- be short and meaningful
- be written in kebab-case
- reflect the purpose of the branch
- avoid unnecessary words

--- 

## Good examples:

- add-onboarding-validation
- fix/parser-fallback-error
- refactor/event-processing-flow

---

## Avoid:

- stuff
- changes
- improvements
- misc
- test-thing

---

## Formatting Rules

- use lowercase for type and description
- use uppercase for issue key
- separate words with hyphens (-)
- do not use spaces or underscores
- keep the branch concise but descriptive

---

## Behavior

When the user writes `branch`:

1. First ask for the Jira ticket key, for example: `RD-1605`.
2. If Jira context is available, read the ticket before generating the branch name.
3. Use the Jira ticket as the primary source of truth to infer:
   - the most appropriate branch type
   - a short and meaningful description
   - the final branch name
4. Generate the branch name using the correct format.
5. Before creating the branch, ask the user to confirm the proposed branch name.
6. After confirmation, return the command to create the branch and switch to it.

If Jira context is not available, ask the user for enough context to infer the correct branch name.

If key information is still missing, ask for clarification before generating the final branch name.

---

## Branch Creation Flow

After the user confirms the branch name, use:

```bash```
git checkout -b <branch-name>

If the repository workflow requires creating it from a remote base branch, use the appropriate command only when that base branch is known.

---

### Output Rules

return only the branch name
do not include explanations unless the user asks for them
do not generate multiple options unless requested

---

## Examples

- feat/RD-1605-add-onboarding-validation
- fix/AI-42-parser-fallback-error
- refactor/event-processing-flow
- chore/update-ci-pipeline
- docs/update-api-documentation
- test/add-ingestion-service-tests