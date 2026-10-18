---
name: safe-csv-export
description: Encode CSV fields with quoting and spreadsheet formula-prefix neutralization. Use when exporting untrusted text to spreadsheet-readable CSV.
---

# safe-csv-export

Encode CSV fields with quoting and spreadsheet formula-prefix neutralization.

## Workflow

1. Confirm the input contract and exclusions below before transforming user data.
2. Import the named exports from `scripts/csv.mjs`. Node.js 22+; no npm dependencies. Browser use requires a modern ES module runtime.
3. Run `node --test tests/run.mjs` from this skill folder. The tests contain concrete inputs, expected outputs and rejection cases.
4. Integrate the pure function into the caller. Surface thrown errors as an invalid input result; do not replace failure with empty success.
5. Preserve the original data and inspect a representative output before adding writes or exports.

## Contract and limits

All values are scalar. Negative numbers are intentionally escaped too, preserving text rather than numeric typing. A leading apostrophe changes the exported value; application behavior varies, so validate in the target spreadsheet application. This is not HTML escaping or a general injection sanitizer.

## Verification

Run `node --test tests/run.mjs` after copying this folder into an agent's skill directory. Keep `scripts/` and `tests/` together; there are no references to a private source repository. The assertions in `tests/run.mjs` are executable usage examples.
