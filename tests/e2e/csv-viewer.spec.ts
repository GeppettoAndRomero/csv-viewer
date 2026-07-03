import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { waitReady, dropFile, openSampleCsv } from './_helpers';

/**
 * Records every request that leaves the local origin. The no-upload covenant:
 * viewing a file must trigger ZERO cross-origin requests.
 */
function trackExternal(page: Page): string[] {
  const external: string[] = [];
  page.on('request', (req) => {
    const url = req.url();
    if (
      !url.startsWith('http://localhost:4321') &&
      !url.startsWith('data:') &&
      !url.startsWith('blob:')
    ) {
      external.push(url);
    }
  });
  return external;
}

test.describe('CSV viewer', () => {
  test('renders the table with correct row/column counts and intact fields, with no upload', async ({
    page,
  }) => {
    const external = trackExternal(page);
    await page.goto('/csv-viewer/');
    await waitReady(page);
    await openSampleCsv(page);

    // 4 data rows, 4 columns (first row treated as header by default).
    await expect(page.getByTestId('row-count')).toHaveText('4');
    await expect(page.getByTestId('col-count')).toHaveText('4');

    // Header row is the first CSV row.
    await expect(page.getByRole('columnheader', { name: 'name', exact: true })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'city', exact: true })).toBeVisible();

    // Quoted field with an embedded comma is preserved as one cell.
    await expect(page.getByRole('cell', { name: 'Smith, John', exact: true })).toBeVisible();
    // Escaped quotes and a comma inside a quoted field survive parsing.
    await expect(
      page.getByRole('cell', { name: 'Likes "quotes", and commas', exact: true })
    ).toBeVisible();

    expect(external, `unexpected cross-origin requests: ${external.join(', ')}`).toHaveLength(0);
  });

  test('header toggle turns the first row back into data', async ({ page }) => {
    await page.goto('/csv-viewer/');
    await waitReady(page);
    await openSampleCsv(page);

    await expect(page.getByTestId('row-count')).toHaveText('4');
    await page.getByRole('checkbox').uncheck();
    // With no header, all 5 CSV rows are data rows; columns stay 4.
    await expect(page.getByTestId('row-count')).toHaveText('5');
    await expect(page.getByTestId('col-count')).toHaveText('4');
  });

  test('opens the table in a fullscreen dialog and Escape closes it and clears the file', async ({
    page,
  }) => {
    await page.goto('/csv-viewer/');
    await waitReady(page);
    await openSampleCsv(page);

    // The loaded table lives in a fullscreen dialog covering the viewport.
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const box = await dialog.boundingBox();
    const viewport = page.viewportSize()!;
    expect(box!.width).toBeCloseTo(viewport.width, 0);
    expect(box!.height).toBeCloseTo(viewport.height, 0);

    // Escape closes the dialog and returns to the empty (no-file) state.
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('csv-table')).toHaveCount(0);
    await expect(page.getByTestId('file-name')).toHaveCount(0);
  });

  test('the close button clears the loaded file', async ({ page }) => {
    await page.goto('/csv-viewer/');
    await waitReady(page);
    await openSampleCsv(page);

    await page.getByTestId('close-viewer').click();
    await expect(page.getByTestId('csv-table')).toHaveCount(0);
  });

  test('shows a localized error for an unsupported file type', async ({ page }) => {
    await page.goto('/csv-viewer/');
    await waitReady(page);
    await dropFile(page, { b64: btoa('not a csv'), name: 'photo.png', type: 'image/png' });

    const err = page.getByTestId('error');
    await expect(err).toBeVisible();
    await expect(err).toContainText('photo.png');
    await expect(page.getByTestId('csv-table')).toHaveCount(0);
  });

  test('shows an error for an empty file', async ({ page }) => {
    await page.goto('/csv-viewer/');
    await waitReady(page);
    await dropFile(page, { b64: '', name: 'empty.csv', type: 'text/csv' });

    await expect(page.getByTestId('error')).toBeVisible();
    await expect(page.getByTestId('error')).toContainText('empty.csv');
  });

  test('detects Shift_JIS encoding and decodes the text', async ({ page }) => {
    await page.goto('/csv-viewer/');
    await waitReady(page);
    // "col\n" (ASCII) + Shift_JIS bytes for 日本 + newline. The Shift_JIS bytes
    // are not valid UTF-8, so auto-detection must fall back to Shift_JIS.
    await page.evaluate(() => {
      const head = new TextEncoder().encode('col\n');
      const sjis = new Uint8Array([0x93, 0xfa, 0x96, 0x7b, 0x0a]);
      const bytes = new Uint8Array(head.length + sjis.length);
      bytes.set(head, 0);
      bytes.set(sjis, head.length);
      const file = new File([bytes], 'sjis.csv', { type: 'text/csv' });
      window.dispatchEvent(new CustomEvent('filesDropped', { detail: [file] }));
    });

    await page.getByTestId('csv-table').waitFor();
    await expect(page.getByTestId('encoding')).toContainText('Shift_JIS');
    await expect(page.getByRole('cell', { name: '日本', exact: true })).toBeVisible();
  });

  test('auto-detects a semicolon delimiter', async ({ page }) => {
    await page.goto('/csv-viewer/');
    await waitReady(page);
    await dropFile(page, {
      b64: btoa('a;b;c\n1;2;3\n4;5;6'),
      name: 'semi.csv',
      type: 'text/csv',
    });
    await page.getByTestId('csv-table').waitFor();
    await expect(page.getByTestId('col-count')).toHaveText('3');
    await expect(page.getByTestId('delimiter')).toContainText('Semicolon');
  });

  test('virtualizes a large file (renders only a window of rows)', async ({ page }) => {
    test.skip(
      test.info().project.name !== 'chromium',
      'windowed-rendering perf check (one engine is enough)'
    );
    await page.goto('/csv-viewer/');
    await waitReady(page);
    await page.evaluate(() => {
      let text = 'id,value\n';
      for (let i = 1; i <= 5000; i++) text += `${i},row-${i}\n`;
      const file = new File([new TextEncoder().encode(text)], 'big.csv', { type: 'text/csv' });
      window.dispatchEvent(new CustomEvent('filesDropped', { detail: [file] }));
    });
    await page.getByTestId('csv-table').waitFor();

    // All 5000 rows are counted...
    await expect(page.getByTestId('row-count')).toHaveText('5000');
    // ...but only a small window is actually in the DOM.
    const rendered = await page.locator('tr[data-row]').count();
    expect(rendered).toBeGreaterThan(0);
    expect(rendered).toBeLessThan(100);
  });

  test('the loaded table has no serious or critical axe violations', async ({ page }) => {
    test.skip(test.info().project.name !== 'chromium', 'axe runs on one engine');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/csv-viewer/');
    await waitReady(page);
    await openSampleCsv(page);

    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    const blocking = violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );
    expect(blocking.map((v) => `${v.id} (${v.impact})`)).toEqual([]);
  });
});
