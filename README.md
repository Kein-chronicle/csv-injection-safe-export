# csv-injection-safe-export

**Encode CSV that is safe to open in Excel and Sheets: quoting plus neutralization of formula prefixes (=, +, -, @, tab, CR, LF).**

[![test](https://github.com/Kein-chronicle/csv-injection-safe-export/actions/workflows/test.yml/badge.svg)](https://github.com/Kein-chronicle/csv-injection-safe-export/actions/workflows/test.yml) ![license](https://img.shields.io/badge/license-MIT-blue.svg) ![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)

## Why

A cell that starts with `=`, `+`, `-` or `@` can run as a formula when the file is opened in a spreadsheet. Untrusted text in an export is the usual way that happens. This encoder quotes every field and prefixes dangerous values with an apostrophe, including after leading whitespace.

## Install

**As a Claude Code skill** (Claude uses it when the task matches the skill description):

```sh
git clone https://github.com/Kein-chronicle/csv-injection-safe-export.git ~/.claude/skills/safe-csv-export
```

For a single project, clone into `<project>/.claude/skills/safe-csv-export` instead, then start a new Claude Code session.

**As a library** (Node.js 22+, no dependencies):

```sh
npm install github:Kein-chronicle/csv-injection-safe-export
```

or copy the one file you need: `scripts/csv.mjs` is self-contained.

**Requires:** Node.js 22+.

## Quick start

Run the quickstart:

```console
$ node examples/quickstart.mjs
"name","note"
"alice","'=HYPERLINK(""http://example.invalid"",""click"")"
"bob","said ""hi"", then left"
"carol","'-5"
"dave","line one
line two"
---
"'@SUM(A1:A9)"
reject: CSV values must be scalar
```

The output above is real: it is produced by the files in `examples/`.

## API

```js
import { toCsv, csvCell } from 'csv-injection-safe-export';

toCsv([['name', 'note'], ['alice', '=HYPERLINK("http://example.invalid","click")']], { bom: true });
csvCell('@SUM(A1:A9)');   // "'@SUM(A1:A9)"
```

Values must be scalars; objects throw `TypeError`. Rows are joined with CRLF; `bom` (default `true`) prepends a UTF-8 byte-order mark so Excel reads non-ASCII text.

## Limits

- Negative numbers are escaped too (kept as text), so the exported value gains a leading apostrophe. Check the behavior in your target spreadsheet app.
- This is CSV formula neutralization, not HTML escaping or a general sanitizer.

## Related projects

These solve neighbouring problems; use them when they fit better.

- **OWASP "CSV Injection" guidance**: the threat description
- **Papa Parse `unparse` with `escapeFormulae`**: a full CSV library with the same mitigation

## More from the same collection

Small, tested tools that grew out of running AI agents and game/app pipelines for months:

- [**pdf-page-range-parser**](https://github.com/Kein-chronicle/pdf-page-range-parser): Parse "1-3, 5, 8-" page selections into exact ranges without silently sorting or deduplicating, and reject anything ambiguous.
- [**pdf-annotation-rotation**](https://github.com/Kein-chronicle/pdf-annotation-rotation): Rotate PDF/canvas annotations (boxes, lines, ink, source masks) a quarter turn in display coordinates, without mutating the input.
- [**pdf-text-position-table-extract**](https://github.com/Kein-chronicle/pdf-text-position-table-extract): Rebuild a rectangular table from positioned text fragments (x, baseline, size, text), keeping empty cells in place.

## Development

```sh
node --test tests/run.mjs
```

The tests include inputs that are supposed to be rejected, so a green run also shows the checks can fail. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).

If this saved you a debugging session, a star helps other people find it. Bug reports and failing test cases are even better.

<sub>Keywords: csv, csv-injection, formula-injection, security, javascript, esm, excel, zero-dependencies</sub>
