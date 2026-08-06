import type { ToolContent } from './types';

export const en: ToolContent = {
  htmlLang: 'en',

  meta: {
    title: 'CSV Viewer — Open CSV Files in Your Browser, No Upload | runlocally',
    description:
      'View CSV, TSV and delimited text files in your browser. The file is read on your device and never uploaded. Detects UTF-8 and Shift_JIS, auto-detects the delimiter, and handles large files. Open source, works offline.',
    ogTitle: 'CSV Viewer — Open CSV Files in Your Browser, No Upload',
    ogDescription:
      'Open and read CSV files in your browser. Nothing is uploaded. Encoding and delimiter detection, large files supported. Open source, works offline.',
  },

  hero: {
    h1: 'CSV Viewer',
    tagline:
      'Open and read CSV files in your browser, with encoding and delimiter detection. Nothing is uploaded.',
  },

  intro: {
    h2: 'Read CSV files in your browser',
    paras: [
      'This tool opens CSV, TSV and other delimited text files and shows them as a table. The file is read on your device, so you can inspect data without sending it to a server or installing anything.',
      'It detects the character encoding (UTF-8, with a Shift_JIS fallback for files exported from Japanese spreadsheets) and the delimiter (comma, tab or semicolon), and you can override either when the automatic choice is wrong. Large files are drawn a screen at a time, so a file with tens of thousands of rows stays responsive as you scroll.',
    ],
  },

  privacy: {
    h2: 'Why your file stays on your device',
    lead: 'Privacy here is structural, not a promise. There is no upload step because there is no server to send the file to:',
    points: [
      'The file is read and parsed entirely in your browser.',
      'The page is served as static files and makes no request that carries your data.',
      'The source is open and anyone can read it (MIT).',
      'It works offline, which is only possible because nothing leaves the device.',
    ],
    note: "If you want to check for yourself, open your browser's Network panel while you open a file — no request carries its contents.",
    sourceLinkText: 'Read the source.',
  },

  howto: {
    h2: 'How to use it',
    steps: [
      {
        h3: 'Open a file',
        p: 'Click to choose a CSV, TSV or TXT file, or drop it anywhere on the page. The file is read locally.',
      },
      {
        h3: 'Check encoding and delimiter',
        p: 'The detected encoding and delimiter are shown above the table. If text looks garbled or the columns are wrong, switch them by hand and the table re-reads the file.',
      },
      {
        h3: 'Read the table',
        p: 'Toggle whether the first row is a header, then scroll through the rows. Large files load a section at a time.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Is my file uploaded anywhere?',
      a: "No. The file is read and parsed entirely in your browser. There is no server component, so its contents have no path off your device. The source is open and you can confirm this in your browser's Network panel.",
    },
    {
      q: 'What file types can it open?',
      a: 'Comma-separated (.csv), tab-separated (.tsv) and plain text (.txt) files. The delimiter is detected automatically among comma, tab and semicolon, and you can also set it by hand.',
    },
    {
      q: 'My Japanese text shows as garbled characters. What can I do?',
      a: 'That usually means the file is encoded in Shift_JIS rather than UTF-8. The viewer tries UTF-8 first and falls back to Shift_JIS, but you can also set the encoding manually and the table re-reads the file with it.',
    },
    {
      q: 'Can it handle large files?',
      a: "Yes, within your device's memory. Only the rows currently on screen are drawn, so scrolling through a file with tens of thousands of rows stays responsive. Very large files are still bounded by available memory because everything runs locally.",
    },
    {
      q: 'Can I edit or save the file?',
      a: 'No. This is a viewer for reading and inspecting data; it does not modify the file or export a new one.',
    },
    {
      q: 'Does it work offline?',
      a: 'Yes. It is a PWA. After the first visit it is cached, so it opens without a network connection. You can also install it to your home screen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open source (MIT)',
    partOf: 'part of',
    brandTail: '— small tools that run locally on your device.',
    colophon:
      "Built and maintained by Geppetto. Some code is written with AI assistance; all review and decisions are the maintainer's.",
    securityText: 'Security',
  },

  related: {
    h2: 'Related tools',
    blogLinkText: 'Read the technical notes',
  },
};
