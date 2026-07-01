/**
 * Viewer preferences.
 *
 * These are the overridable controls the user sees. `encoding` / `delimiter`
 * default to 'auto' (detected per file); a persisted 'auto' is therefore always
 * safe across different files. `hasHeader` is a display preference.
 */

export type EncodingChoice = 'auto' | 'utf-8' | 'shift-jis';
export type DelimiterChoice = 'auto' | ',' | '\t' | ';';

export interface ViewerSettings {
  encoding: EncodingChoice;
  delimiter: DelimiterChoice;
  hasHeader: boolean;
}

export const DEFAULT_SETTINGS: ViewerSettings = {
  encoding: 'auto',
  delimiter: 'auto',
  hasHeader: true,
};

const ENCODINGS: EncodingChoice[] = ['auto', 'utf-8', 'shift-jis'];
const DELIMITERS: DelimiterChoice[] = ['auto', ',', '\t', ';'];

/**
 * Coerce arbitrary input (e.g. parsed localStorage JSON) into a valid
 * ViewerSettings, falling back to defaults for any missing/invalid field. This
 * keeps stored preferences forward-compatible and never yields an invalid enum.
 */
export function normalizeSettings(input: unknown): ViewerSettings {
  const raw = (input ?? {}) as Partial<Record<keyof ViewerSettings, unknown>>;
  return {
    encoding: ENCODINGS.includes(raw.encoding as EncodingChoice)
      ? (raw.encoding as EncodingChoice)
      : DEFAULT_SETTINGS.encoding,
    delimiter: DELIMITERS.includes(raw.delimiter as DelimiterChoice)
      ? (raw.delimiter as DelimiterChoice)
      : DEFAULT_SETTINGS.delimiter,
    hasHeader:
      typeof raw.hasHeader === 'boolean' ? raw.hasHeader : DEFAULT_SETTINGS.hasHeader,
  };
}
