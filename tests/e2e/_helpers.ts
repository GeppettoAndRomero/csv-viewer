import { type Page } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

/** The bundled sample CSV (4 columns, 4 data rows, quoted + comma-in-quote fields). */
export const SAMPLE_CSV_B64 = readFileSync(
  fileURLToPath(new URL('../fixtures/sample.csv', import.meta.url))
).toString('base64');

/** Wait until the island has hydrated and is ready to receive files. */
export async function waitReady(page: Page) {
  await page.waitForFunction(() => (window as Record<string, unknown>).__toolReady === true);
}

/** Feed a base64-encoded file through the same drop-zone path the UI uses. */
export async function dropFile(
  page: Page,
  opts: { b64: string; name: string; type: string }
) {
  await page.evaluate(({ b64, name, type }) => {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const file = new File([bytes], name, { type });
    window.dispatchEvent(new CustomEvent('filesDropped', { detail: [file] }));
  }, opts);
}

/** Open the bundled sample CSV and wait until the table is on screen. */
export async function openSampleCsv(page: Page) {
  await dropFile(page, { b64: SAMPLE_CSV_B64, name: 'sample.csv', type: 'text/csv' });
  await page.getByTestId('csv-table').waitFor();
}
