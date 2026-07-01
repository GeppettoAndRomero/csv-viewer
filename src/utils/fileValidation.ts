/**
 * File-type validation for the CSV viewer.
 *
 * Accepts delimited-text files (.csv / .tsv / .txt). Validation returns a stable
 * machine `code` (not a message) so the UI can render the localized string for
 * the current locale — errors are surfaced through the island i18n table.
 */

/** Machine codes the UI maps to localized error strings. */
export type ValidationCode = 'wrongType';

export interface ValidationResult {
  valid: boolean;
  code?: ValidationCode;
}

export const ALLOWED_EXTENSIONS = ['.csv', '.tsv', '.txt'] as const;

// MIME types browsers commonly report for these files. The type is often empty
// or misreported (e.g. Excel-associated CSVs), so extension is authoritative and
// a non-empty MIME only needs to be one of these when the extension is missing.
const ALLOWED_MIME_TYPES = [
  'text/csv',
  'text/tab-separated-values',
  'text/plain',
  'application/csv',
  'application/vnd.ms-excel',
];

/** Lower-cased extension including the dot, or '' when the name has none. */
export function getExtension(fileName: string): string {
  const dot = fileName.lastIndexOf('.');
  return dot >= 0 ? fileName.slice(dot).toLowerCase() : '';
}

export function validateFileExtension(fileName: string): ValidationResult {
  const ext = getExtension(fileName);
  return (ALLOWED_EXTENSIONS as readonly string[]).includes(ext)
    ? { valid: true }
    : { valid: false, code: 'wrongType' };
}

/**
 * A file is accepted when its extension is allowed. When the extension is not
 * allowed we still accept it if the browser reported a delimited-text MIME type
 * (covers files with no/odd extension exported from spreadsheets).
 */
export function validateFile(file: File): ValidationResult {
  if (validateFileExtension(file.name).valid) {
    return { valid: true };
  }
  if (file.type && ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return { valid: true };
  }
  return { valid: false, code: 'wrongType' };
}
