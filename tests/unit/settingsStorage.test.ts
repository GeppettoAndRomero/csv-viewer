// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { loadSettings, saveSettings } from '@/utils/settingsStorage';
import { DEFAULT_SETTINGS } from '@/utils/settings';

describe('settingsStorage', () => {
  beforeEach(() => localStorage.clear());

  it('returns the defaults when nothing is stored', () => {
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it('round-trips saved settings', () => {
    const s = { encoding: 'shift-jis' as const, delimiter: ';' as const, hasHeader: false };
    saveSettings(s);
    expect(loadSettings()).toEqual(s);
  });

  it('normalizes a stored partial over the defaults', () => {
    localStorage.setItem('csv-viewer-settings', JSON.stringify({ hasHeader: false }));
    const loaded = loadSettings();
    expect(loaded.hasHeader).toBe(false);
    expect(loaded.encoding).toBe(DEFAULT_SETTINGS.encoding);
    expect(loaded.delimiter).toBe(DEFAULT_SETTINGS.delimiter);
  });

  it('falls back to the defaults on malformed JSON', () => {
    localStorage.setItem('csv-viewer-settings', '{not valid json');
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it('drops invalid stored enum values', () => {
    localStorage.setItem('csv-viewer-settings', JSON.stringify({ encoding: 'utf-16' }));
    expect(loadSettings().encoding).toBe(DEFAULT_SETTINGS.encoding);
  });
});
