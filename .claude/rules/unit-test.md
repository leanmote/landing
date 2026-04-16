---
description: Review the current changes and generate unit tests when the user writes `test`, using the available code changes and Jira context as the source of truth.

alwaysApply: false
---

# Rule: Testing

## Intent

When the user writes `test`, review the current changes and generate the necessary unit tests.

This rule is responsible for:

- analyzing the current code changes
- reading the Jira ticket if it is available
- reviewing the changes from a testing perspective
- deciding whether unit tests are needed
- generating unit tests only when they add real value

---

## Sources of Truth

Use the following sources when available:

1. the current code changes
2. the staged diff or working diff
3. the Jira ticket context
4. the existing repository testing style

Prefer the actual code changes over assumptions.

Do not invent scenarios that are not supported by the current code or ticket context.

Prefer staged diff. If not available, fallback to working files or user-provided context.

---

## Fallback for Code Detection

If no staged or tracked changes are found:

- inspect untracked files
- detect if they contain executable code (e.g. .php, .py, .ts)
- if so, treat them as candidate changes

---

## Primary Goal

The goal is not to generate tests automatically in every case.

The goal is to:

- understand what changed
- review whether the change should be covered by unit tests
- generate unit tests only if they are necessary or clearly valuable

---

## Review Before Test Generation

Before generating tests, perform a short testing-focused code review.

Review the changes for:

- new logic that is not covered
- validation rules
- branching behavior
- fallback behavior
- edge cases
- regressions
- helper or service logic that should be verified
- configuration-related logic that may need coverage

If the change is trivial or does not justify tests, say so clearly.

---

## Jira Context

If Jira context is available:

- read the ticket before generating tests
- use the ticket to understand the intended behavior
- align the test coverage with the ticket scope

If Jira context is not available:
- rely on the code changes only

Do not invent Jira details.

---

## When Unit Tests Are Needed

Generate unit tests when the changes include things like:

- new business logic
- new validation logic
- new conditional behavior
- new fallback paths
- bug fixes that could regress
- service methods with deterministic behavior
- helpers or utilities with clear input/output behavior

Do not generate unit tests when the changes are only:

- formatting
- comments
- documentation
- simple renames with no behavioral impact
- configuration-only changes that do not introduce logic worth testing

---

## Framework Rules

Follow the framework already used in the repository.

### PHP

If the repository uses PHP and CodeIgniter:

- use PHPUnit
- use CIUnitTestCase when it matches the existing style
- follow the current test naming and structure

### Python

If the repository uses Python:

- use pytest
- use unittest.mock when mocking is needed
- use moto for AWS-related mocks when relevant

Do not introduce a framework that is not already part of the repository context.

---

## Test Generation Rules

When tests are needed:

- generate only unit tests
- keep them simple and readable
- cover the most important behavior first
- include edge cases only when they add real value
- follow the existing repository style
- avoid unnecessary abstraction
- do not generate integration or e2e tests unless explicitly requested

---

## Test Design Principles

Generated tests should:

- validate one behavior per test when possible
- use clear and explicit assertions
- have descriptive names
- focus on the changed logic
- remain easy to maintain

---

## Behavior

When the user writes `test`:

1. Inspect the current code changes
2. Read the Jira ticket if available
3. Perform a brief testing-focused code review
4. Decide whether unit tests are necessary
5. If unit tests are needed:
   - generate them following the repository conventions
6. If unit tests are not needed:
   - clearly say that no unit tests are necessary for the current change

---

## File Creation Behavior

When unit tests are needed:

1. Determine the correct test file path based on the repository structure

2. If the test file does not exist yet:
   - create the file automatically
   - write the full test content into that file

3. If the test file already exists:
   - update the file with the new test methods

4. Always confirm the final file path to the user

---

## File Write Rules

If the assistant has permission to modify files in the workspace:

- create the test file directly
- write the generated content into it
- do NOT only return commands or instructions

Example confirmation:

- Created `tests/unit/CalculateDiscountedPriceTest.php`

---

### Output Format

If creating a new test file, return:

- the file path
- the file creation command
- the full file content

Example:

```text
File: tests/CalculateDiscountedPriceTest.php
mkdir -p tests
touch tests/CalculateDiscountedPriceTest.php
```

<?php

final class CalculateDiscountedPriceTest extends CIUnitTestCase
{
    // ...
}

If updating an existing test file, return:

- the file path
- the exact methods to add or modify

Do not generate tests without also indicating where they should be created.

---

## Output Rules

If tests are needed:

- create or update the test file directly
- confirm the file path
- do not return shell commands unless explicitly requested

If tests are not needed:

- clearly explain why unit tests are not necessary

Do not:

- claim tests were executed
- claim coverage results
- generate unnecessary tests
- generate integration or e2e tests
