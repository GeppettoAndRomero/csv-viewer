import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  output: 'static',
  // slug-first 名前空間: ツールを runlocally.app/csv-viewer/ 配下に「物理配置」する
  // （src/pages/csv-viewer/ + public/csv-viewer/）。base は使わない（base は URL に
  // prefix を付けるが dist を入れ子化せず、ルート配信の Pages と不整合になるため）。
  // バンドルアセットも /csv-viewer/_assets/ に隔離し hub/他ツールと無衝突にする。
  build: {
    inlineStylesheets: 'auto',
    assets: 'csv-viewer/_assets',
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['preact', 'preact/hooks'],
            // CSV parsing (papaparse, MIT) is loaded on demand when a file is
            // opened; keep it in its own chunk so it stays off the initial path.
            'papaparse': ['papaparse']
          }
        }
      }
    }
  },
  compressHTML: true,
  scopedStyleStrategy: 'class'
});
