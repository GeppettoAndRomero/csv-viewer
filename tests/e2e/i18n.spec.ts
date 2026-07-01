import { test, expect } from '@playwright/test';
import { waitReady, openSampleCsv } from './_helpers';

// Content routing is engine-independent; one browser is enough.
test.describe('i18n', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'content routing (one engine)');
  });

  for (const loc of [
    { path: '/csv-viewer/', lang: 'en' },
    { path: '/csv-viewer/ja/', lang: 'ja' },
  ]) {
    test(`views a file on the ${loc.lang} route (#5)`, async ({ page }) => {
      await page.goto(loc.path);
      await waitReady(page);
      await openSampleCsv(page);
      await expect(page.getByTestId('row-count')).toHaveText('4');
    });
  }

  test('serves every locale with the correct <html lang>', async ({ page }) => {
    const expected: Array<[string, string]> = [
      ['/csv-viewer/', 'en'],
      ['/csv-viewer/ja/', 'ja'],
      ['/csv-viewer/zh/', 'zh-Hans'],
      ['/csv-viewer/de/', 'de'],
      ['/csv-viewer/es/', 'es'],
    ];
    for (const [path, lang] of expected) {
      await page.goto(path);
      expect(await page.getAttribute('html', 'lang'), `lang on ${path}`).toBe(lang);
    }
  });
});
