import { describe, it, expect } from 'vitest';
import {
  detectEncoding,
  decodeBytes,
  parseDelimited,
  columnCount,
} from '@/utils/csvParse';

const utf8 = (s: string) => new TextEncoder().encode(s);

// Shift_JIS bytes for 「日本」 (0x93 0xFA 0x96 0x7B). 0x93 is not a valid UTF-8
// lead byte, so a strict UTF-8 decode of these bytes fails.
const SJIS_NIHON = new Uint8Array([0x93, 0xfa, 0x96, 0x7b]);

describe('detectEncoding', () => {
  it('detects valid UTF-8', () => {
    expect(detectEncoding(utf8('name,age\n山田,30\n'))).toBe('utf-8');
  });

  it('detects plain ASCII as UTF-8', () => {
    expect(detectEncoding(utf8('a,b,c\n1,2,3\n'))).toBe('utf-8');
  });

  it('falls back to Shift_JIS on invalid UTF-8', () => {
    expect(detectEncoding(SJIS_NIHON)).toBe('shift-jis');
  });
});

describe('decodeBytes', () => {
  it('round-trips UTF-8', () => {
    expect(decodeBytes(utf8('héllo,世界'), 'utf-8')).toBe('héllo,世界');
  });

  it('decodes Shift_JIS bytes to the right characters', () => {
    expect(decodeBytes(SJIS_NIHON, 'shift-jis')).toBe('日本');
  });
});

describe('parseDelimited', () => {
  it('parses a simple comma-separated matrix', async () => {
    const { rows, delimiter } = await parseDelimited('a,b,c\n1,2,3');
    expect(rows).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
    expect(delimiter).toBe(',');
  });

  it('preserves commas and escaped quotes inside quoted fields', async () => {
    const text = 'name,note\n"Smith, John","Likes ""quotes"", and commas"';
    const { rows } = await parseDelimited(text);
    expect(rows[1][0]).toBe('Smith, John');
    expect(rows[1][1]).toBe('Likes "quotes", and commas');
  });

  it('auto-detects a semicolon delimiter', async () => {
    const { rows, delimiter } = await parseDelimited('a;b;c\n1;2;3');
    expect(delimiter).toBe(';');
    expect(rows[0]).toEqual(['a', 'b', 'c']);
  });

  it('auto-detects a tab delimiter', async () => {
    const { rows, delimiter } = await parseDelimited('a\tb\tc\n1\t2\t3');
    expect(delimiter).toBe('\t');
    expect(rows[1]).toEqual(['1', '2', '3']);
  });

  it('honors a forced delimiter over auto-detection', async () => {
    // Semicolons dominate, but forcing comma keeps the row as one field.
    const { rows, delimiter } = await parseDelimited('a;b;c', ',');
    expect(delimiter).toBe(',');
    expect(rows[0]).toEqual(['a;b;c']);
  });

  it('skips fully empty lines', async () => {
    const { rows } = await parseDelimited('a,b\n\n1,2\n\n');
    expect(rows).toEqual([
      ['a', 'b'],
      ['1', '2'],
    ]);
  });
});

describe('columnCount', () => {
  it('returns the widest row length', () => {
    expect(columnCount([['a'], ['a', 'b', 'c'], ['a', 'b']])).toBe(3);
  });

  it('returns 0 for no rows', () => {
    expect(columnCount([])).toBe(0);
  });
});
