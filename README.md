# csv-viewer

View CSV, TSV and delimited text files entirely in your browser. The file is read
on your device and never uploaded. Open source, works offline (PWA).

Part of [runlocally](https://runlocally.app) — small tools that run locally on your device.

## How it works

The file is read with `File.arrayBuffer()`, decoded (strict UTF-8, with a Shift_JIS
fallback for legacy Japanese exports — both via the browser-native `TextDecoder`),
and parsed with [papaparse](https://www.papaparse.com/). The delimiter is
auto-detected among comma, tab and semicolon. The whole pipeline runs client-side —
there is no server component, so your file has no path off your device.

Large files use windowed rendering: only the rows currently on screen are drawn, so
a file with tens of thousands of rows stays responsive as you scroll.

## Features

- Open CSV / TSV / TXT from a picker or by dropping it on the page
- Encoding detection (UTF-8 / Shift_JIS) with a manual override
- Delimiter detection (comma / tab / semicolon) with a manual override
- First-row-as-header toggle, row and column counts
- Windowed rendering for large files
- Works offline (PWA), installable

## Develop

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build to dist/
npm run test:unit
npm run test:e2e
```

Stack: Astro + Preact + TypeScript. Parsing uses papaparse (lazy-loaded on first open).

## Browser support

Works in current Chrome, Edge, Firefox and Safari. Encoding detection and decoding
use the browser-native `TextDecoder` (UTF-8 and Shift_JIS), which is available in all
modern browsers.

## License

[MIT](./LICENSE). Built and maintained by Geppetto. Some code is written with AI
assistance; all review and decisions are the maintainer's.
