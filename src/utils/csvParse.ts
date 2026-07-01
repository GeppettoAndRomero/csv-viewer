/**
 * CSV parsing + character-encoding detection.
 *
 * All of this runs in the browser on bytes already in memory — nothing is sent
 * anywhere. `detectEncoding` / `decodeBytes` use the browser-native TextDecoder
 * (no library). `parseDelimited` lazily loads papaparse (MIT) so the parser stays
 * off the initial load path and only ships when a file is actually opened.
 */

/** Character encodings the viewer can decode. Both are TextDecoder-native. */
export type Encoding = 'utf-8' | 'shift-jis';

/** Delimiters the viewer detects / lets the user pick. */
export const DELIMITERS = [',', '\t', ';'] as const;
export type Delimiter = (typeof DELIMITERS)[number];

/**
 * Decode bytes as strict UTF-8, falling back to Shift_JIS.
 *
 * A file that is valid UTF-8 decodes as UTF-8; otherwise the strict (`fatal`)
 * decode throws and we treat it as Shift_JIS — the common case for legacy
 * Japanese CSVs exported from Excel. Both decoders are built into the browser.
 */
export function detectEncoding(bytes: Uint8Array): Encoding {
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return 'utf-8';
  } catch {
    return 'shift-jis';
  }
}

/**
 * Decode bytes with the given encoding. UTF-8 strips a leading BOM (TextDecoder
 * does this for 'utf-8'). Shift_JIS is decoded leniently (unmappable bytes
 * become U+FFFD) so a viewer never hard-fails on a stray byte.
 */
export function decodeBytes(bytes: Uint8Array, encoding: Encoding): string {
  return new TextDecoder(encoding).decode(bytes);
}

export interface ParseOutcome {
  /** Rows as arrays of string cells (header row, if any, is index 0). */
  rows: string[][];
  /** The delimiter papaparse used (detected, or the one we forced). */
  delimiter: string;
  /** Number of papaparse errors (non-fatal; a viewer still shows the rows). */
  errorCount: number;
}

/**
 * Parse delimited text into a matrix of string cells. `delimiter` may be a
 * specific character (comma/tab/semicolon) to force it, or undefined to let
 * papaparse auto-detect among {@link DELIMITERS}.
 *
 * The header row is NOT consumed here (`header: false`) — the UI decides whether
 * row 0 is a header, so toggling that never needs a re-parse.
 */
export async function parseDelimited(
  text: string,
  delimiter?: Delimiter,
): Promise<ParseOutcome> {
  const Papa = (await import('papaparse')).default;
  const result = Papa.parse<string[]>(text, {
    header: false,
    skipEmptyLines: 'greedy',
    delimiter: delimiter ?? '',
    delimitersToGuess: [...DELIMITERS],
  });
  const rows = (result.data as string[][]).filter((r) => Array.isArray(r));
  return {
    rows,
    delimiter: result.meta?.delimiter ?? delimiter ?? ',',
    errorCount: result.errors?.length ?? 0,
  };
}

/** The widest row's cell count — the table's column count. */
export function columnCount(rows: string[][]): number {
  return rows.reduce((max, r) => Math.max(max, r.length), 0);
}
