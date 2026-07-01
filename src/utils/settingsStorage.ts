/**
 * Persist viewer preferences in localStorage. Read defensively (SSR has no
 * localStorage; stored JSON may be stale or malformed) and always return a
 * normalized ViewerSettings.
 */

import { DEFAULT_SETTINGS, normalizeSettings, type ViewerSettings } from './settings';

const STORAGE_KEY = 'csv-viewer-settings';

export function loadSettings(): ViewerSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_SETTINGS;
    return normalizeSettings(JSON.parse(stored));
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: ViewerSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore quota / privacy-mode failures — persistence is best-effort.
  }
}
