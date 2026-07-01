import { describe, it, expect } from 'vitest';
import { DEFAULT_SETTINGS, normalizeSettings } from '@/utils/settings';

describe('normalizeSettings', () => {
  it('returns the defaults for empty / nullish input', () => {
    expect(normalizeSettings(undefined)).toEqual(DEFAULT_SETTINGS);
    expect(normalizeSettings(null)).toEqual(DEFAULT_SETTINGS);
    expect(normalizeSettings({})).toEqual(DEFAULT_SETTINGS);
  });

  it('keeps valid values', () => {
    expect(
      normalizeSettings({ encoding: 'shift-jis', delimiter: ';', hasHeader: false })
    ).toEqual({ encoding: 'shift-jis', delimiter: ';', hasHeader: false });
  });

  it('accepts the tab delimiter', () => {
    expect(normalizeSettings({ delimiter: '\t' }).delimiter).toBe('\t');
  });

  it('falls back to defaults for invalid enum values', () => {
    const s = normalizeSettings({ encoding: 'latin1', delimiter: '|', hasHeader: 'yes' });
    expect(s.encoding).toBe(DEFAULT_SETTINGS.encoding);
    expect(s.delimiter).toBe(DEFAULT_SETTINGS.delimiter);
    expect(s.hasHeader).toBe(DEFAULT_SETTINGS.hasHeader);
  });

  it('merges a partial object over the defaults', () => {
    const s = normalizeSettings({ hasHeader: false });
    expect(s.hasHeader).toBe(false);
    expect(s.encoding).toBe(DEFAULT_SETTINGS.encoding);
    expect(s.delimiter).toBe(DEFAULT_SETTINGS.delimiter);
  });
});
