/**
 * CsvViewer — the tool's only non-frozen widget.
 *
 * Opens a CSV/TSV/TXT file chosen from the picker or dropped anywhere on the
 * page (via the frozen GlobalDropZone's `filesDropped` CustomEvent<File[]>) and
 * renders it as a table. Everything runs in the browser: the bytes are read with
 * File.arrayBuffer(), decoded (UTF-8 with a Shift_JIS fallback), parsed with
 * papaparse, and shown with windowed rendering so large files stay responsive.
 *
 * The island receives `locale` as a prop (present during SSR) and reads all
 * strings from the i18n table, so SSR and client render identically.
 */

import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import { AppCard } from './AppCard';
import { AppButton } from './AppButton';
import { ui } from '@/i18n/ui';
import { validateFile } from '@/utils/fileValidation';
import {
  detectEncoding,
  decodeBytes,
  parseDelimited,
  columnCount,
  type Encoding,
  type Delimiter,
} from '@/utils/csvParse';
import { computeWindow } from '@/utils/virtualWindow';
import {
  DEFAULT_SETTINGS,
  type ViewerSettings,
  type EncodingChoice,
  type DelimiterChoice,
} from '@/utils/settings';
import { loadSettings, saveSettings } from '@/utils/settingsStorage';

/** Fixed rendered row height (px). Must match the CSS on th/td. */
const ROW_HEIGHT = 34;
/** Below this row count everything is rendered; above it, only a window. */
const VIRTUALIZE_THRESHOLD = 200;

type ErrorCode = 'wrongType' | 'unreadable' | 'empty' | 'parseError';

interface ReadyState {
  fileName: string;
  rows: string[][];
  columns: number;
  encoding: Encoding;
  delimiter: string;
  errorCount: number;
}

interface CsvViewerProps {
  locale?: string;
}

export function CsvViewer({ locale = 'en' }: CsvViewerProps) {
  const t = (ui as any)[locale] ?? ui.en;

  // Overridable controls. Initialized from defaults so the first render matches
  // SSR; persisted preferences are loaded in an effect after mount.
  const [settings, setSettings] = useState<ViewerSettings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState<ReadyState | null>(null);
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null);
  const [errorName, setErrorName] = useState<string>('');

  // Raw bytes of the loaded file, kept so encoding/delimiter changes can
  // re-parse without re-reading the file.
  const bytesRef = useRef<Uint8Array | null>(null);
  const nameRef = useRef<string>('');
  const settingsRef = useRef<ViewerSettings>(settings);
  settingsRef.current = settings;

  // Virtualization state.
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(420);

  const finish = useCallback(() => {
    window.dispatchEvent(new CustomEvent('filesProcessed'));
  }, []);

  // Decode + parse already-read bytes with the given choices, then set state.
  const runParse = useCallback(
    async (bytes: Uint8Array, name: string, s: ViewerSettings) => {
      const encoding: Encoding =
        s.encoding === 'auto' ? detectEncoding(bytes) : s.encoding;
      const text = decodeBytes(bytes, encoding);
      if (text.trim() === '') {
        bytesRef.current = null;
        setReady(null);
        setErrorName(name);
        setErrorCode('empty');
        return;
      }
      const forced: Delimiter | undefined =
        s.delimiter === 'auto' ? undefined : s.delimiter;
      const outcome = await parseDelimited(text, forced);
      if (outcome.rows.length === 0) {
        bytesRef.current = null;
        setReady(null);
        setErrorName(name);
        setErrorCode('empty');
        return;
      }
      setErrorCode(null);
      setReady({
        fileName: name,
        rows: outcome.rows,
        columns: columnCount(outcome.rows),
        encoding,
        delimiter: outcome.delimiter,
        errorCount: outcome.errorCount,
      });
      // A fresh file starts scrolled to the top.
      setScrollTop(0);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    },
    [],
  );

  const handleFile = useCallback(
    async (file: File) => {
      const validation = validateFile(file);
      if (!validation.valid) {
        bytesRef.current = null;
        setReady(null);
        setErrorName(file.name);
        setErrorCode('wrongType');
        return;
      }
      let bytes: Uint8Array;
      try {
        bytes = new Uint8Array(await file.arrayBuffer());
      } catch {
        bytesRef.current = null;
        setReady(null);
        setErrorName(file.name);
        setErrorCode('unreadable');
        return;
      }
      if (bytes.length === 0) {
        bytesRef.current = null;
        setReady(null);
        setErrorName(file.name);
        setErrorCode('empty');
        return;
      }
      bytesRef.current = bytes;
      nameRef.current = file.name;
      try {
        await runParse(bytes, file.name, settingsRef.current);
      } catch {
        bytesRef.current = null;
        setReady(null);
        setErrorName(file.name);
        setErrorCode('parseError');
      }
    },
    [runParse],
  );

  const handleFiles = useCallback(
    async (files: File[]) => {
      // A viewer shows one file; take the first if several are dropped.
      if (files.length > 0) {
        await handleFile(files[0]);
      }
      finish();
    },
    [handleFile, finish],
  );

  // Load persisted preferences after mount (keeps SSR/client first render equal)
  // and signal E2E readiness.
  useEffect(() => {
    setSettings(loadSettings());
    (globalThis as Record<string, unknown>).__toolReady = true;
  }, []);

  // Persist preferences whenever they change.
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // Re-parse the loaded bytes when the encoding or delimiter override changes.
  // hasHeader is a display concern and never needs a re-parse.
  const encChoice = settings.encoding;
  const delimChoice = settings.delimiter;
  useEffect(() => {
    if (!bytesRef.current) return;
    void runParse(bytesRef.current, nameRef.current, settingsRef.current);
  }, [encChoice, delimChoice, runParse]);

  // Listen for files dropped/pasted anywhere on the page (GlobalDropZone).
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<File[]>).detail;
      void handleFiles(detail ?? []);
    };
    window.addEventListener('filesDropped', handler);
    return () => window.removeEventListener('filesDropped', handler);
  }, [handleFiles]);

  // Track the scroll viewport height for the windowing math.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const measure = () => setViewportHeight(el.clientHeight || 420);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ready !== null]);

  const onPick = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    void handleFiles(files);
    input.value = '';
  };

  const errorText = (code: ErrorCode): string => {
    switch (code) {
      case 'wrongType':
        return t.errWrongType.replace('{name}', errorName);
      case 'unreadable':
        return t.errUnreadable.replace('{name}', errorName);
      case 'empty':
        return t.errEmpty.replace('{name}', errorName);
      case 'parseError':
        return t.errParse.replace('{name}', errorName);
    }
  };

  const encodingLabel = (enc: Encoding): string =>
    enc === 'shift-jis' ? t.encShiftJis : t.encUtf8;

  const delimiterLabel = (d: string): string => {
    if (d === '\t') return t.delimTab;
    if (d === ';') return t.delimSemicolon;
    return t.delimComma;
  };

  // ---- Derived view model (only when ready) ----
  const headerCells = ready && settings.hasHeader ? ready.rows[0] : null;
  const dataRows =
    ready ? (settings.hasHeader ? ready.rows.slice(1) : ready.rows) : [];
  const columns = ready?.columns ?? 0;

  const virtualize = dataRows.length > VIRTUALIZE_THRESHOLD;
  const win = virtualize
    ? computeWindow({
        scrollTop,
        viewportHeight,
        rowHeight: ROW_HEIGHT,
        rowCount: dataRows.length,
      })
    : {
        startIndex: 0,
        endIndex: dataRows.length,
        topPad: 0,
        bottomPad: 0,
        totalHeight: dataRows.length * ROW_HEIGHT,
      };

  const visible = dataRows.slice(win.startIndex, win.endIndex);

  return (
    <div>
      <AppCard>
        <div style="margin-bottom: var(--space-4);">
          <h2 style="margin: 0 0 var(--space-1) 0; font-size: var(--fs-4); font-weight: 600;">
            {t.uploadHeading}
          </h2>
          <p style="margin: 0; font-size: var(--fs-2); color: var(--color-subtle);">
            {t.uploadSubtitle}
          </p>
        </div>

        <button
          type="button"
          class="csv-dropzone"
          onClick={() => document.getElementById('csv-file-input')?.click()}
        >
          <span class="csv-dropzone__icon" aria-hidden="true">
            📄
          </span>
          <span class="csv-dropzone__title">{t.dropClick}</span>
          <span class="csv-dropzone__hint">{t.dropOr}</span>
          <span class="csv-dropzone__hint">{t.dropSupported}</span>
        </button>
        <input
          id="csv-file-input"
          type="file"
          accept=".csv,.tsv,.txt,text/csv,text/tab-separated-values,text/plain"
          onChange={onPick}
          style="display: none;"
        />
      </AppCard>

      {errorCode && (
        <div class="csv-error" role="alert" data-testid="error">
          <span class="csv-error__icon" aria-hidden="true">
            ⚠
          </span>
          <span data-testid="error-message">{errorText(errorCode)}</span>
        </div>
      )}

      {ready && (
        <AppCard className="mt-6">
          <div class="csv-toolbar">
            <div class="csv-meta">
              <span class="csv-meta__file" title={ready.fileName} data-testid="file-name">
                {ready.fileName}
              </span>
              <span class="csv-meta__stat">
                {t.rowCount}: <strong data-testid="row-count" class="num">{String(dataRows.length)}</strong>
              </span>
              <span class="csv-meta__stat">
                {t.colCount}: <strong data-testid="col-count" class="num">{String(columns)}</strong>
              </span>
              <span class="csv-meta__stat" data-testid="encoding">
                {t.encodingLabel}: <strong>{encodingLabel(ready.encoding)}</strong>
              </span>
              <span class="csv-meta__stat" data-testid="delimiter">
                {t.delimiterLabel}: <strong>{delimiterLabel(ready.delimiter)}</strong>
              </span>
            </div>

            <div class="csv-controls">
              <div class="csv-control">
                <label class="csv-control__label" for="csv-encoding">
                  {t.encodingLabel}
                </label>
                <select
                  id="csv-encoding"
                  class="app-field__select"
                  value={settings.encoding}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      encoding: (e.currentTarget as HTMLSelectElement).value as EncodingChoice,
                    }))
                  }
                >
                  <option value="auto">{t.optAuto}</option>
                  <option value="utf-8">{t.encUtf8}</option>
                  <option value="shift-jis">{t.encShiftJis}</option>
                </select>
              </div>

              <div class="csv-control">
                <label class="csv-control__label" for="csv-delimiter">
                  {t.delimiterLabel}
                </label>
                <select
                  id="csv-delimiter"
                  class="app-field__select"
                  value={settings.delimiter}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      delimiter: (e.currentTarget as HTMLSelectElement).value as DelimiterChoice,
                    }))
                  }
                >
                  <option value="auto">{t.optAuto}</option>
                  <option value=",">{t.delimComma}</option>
                  <option value={'\t'}>{t.delimTab}</option>
                  <option value=";">{t.delimSemicolon}</option>
                </select>
              </div>

              <label class="csv-control__checkbox">
                <input
                  type="checkbox"
                  checked={settings.hasHeader}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      hasHeader: (e.currentTarget as HTMLInputElement).checked,
                    }))
                  }
                />
                <span>{t.headerToggle}</span>
              </label>
            </div>
          </div>

          <div
            class="csv-table-scroll"
            ref={scrollRef}
            role="region"
            aria-label={t.tableLabel}
            tabIndex={0}
            onScroll={(e) => setScrollTop((e.currentTarget as HTMLDivElement).scrollTop)}
          >
            <table class="csv-table" data-testid="csv-table">
              <thead>
                <tr>
                  <th class="csv-table__gutter" scope="col">
                    <span class="visually-hidden">{t.rowNumberHeader}</span>
                  </th>
                  {Array.from({ length: columns }).map((_, c) => (
                    <th key={c} scope="col">
                      {headerCells ? (headerCells[c] ?? '') : `${t.columnLabel} ${c + 1}`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {win.topPad > 0 && (
                  <tr aria-hidden="true" class="csv-table__spacer">
                    <td colSpan={columns + 1} style={{ height: `${win.topPad}px` }} />
                  </tr>
                )}
                {visible.map((row, i) => {
                  const rowIndex = win.startIndex + i;
                  return (
                    <tr key={rowIndex} data-row>
                      <th class="csv-table__gutter" scope="row">
                        {String(rowIndex + 1)}
                      </th>
                      {Array.from({ length: columns }).map((_, c) => (
                        <td key={c} title={row[c] ?? ''}>
                          {row[c] ?? ''}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                {win.bottomPad > 0 && (
                  <tr aria-hidden="true" class="csv-table__spacer">
                    <td colSpan={columns + 1} style={{ height: `${win.bottomPad}px` }} />
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div class="csv-actions">
            <AppButton
              variant="secondary"
              onClick={() => document.getElementById('csv-file-input')?.click()}
            >
              {t.loadAnother}
            </AppButton>
          </div>
        </AppCard>
      )}
    </div>
  );
}
