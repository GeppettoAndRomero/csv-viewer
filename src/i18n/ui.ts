/**
 * Interactive-island strings, per locale. Separate from page-level content
 * (`en.ts` / `ja.ts` …): this is the text the Preact islands render.
 *
 * IMPORTANT: islands receive `locale` as a PROP (present during SSR) and never
 * read it from `document`. SSR and client render the same string, so there is no
 * hydration mismatch.
 *
 * Interpolated strings carry `{name}` / `{count}` templates; the island does
 * `.replace('{name}', x)`.
 */
export const ui = {
  en: {
    // CsvViewer — open / dropzone
    uploadHeading: 'Open a file',
    uploadSubtitle: 'Choose a CSV, TSV or TXT file. It is read on your device.',
    dropClick: 'Click to choose a file',
    dropOr: 'or drop it anywhere on the page',
    dropSupported: 'Supported: CSV, TSV, TXT',

    // CsvViewer — table meta / controls
    rowCount: 'Rows',
    colCount: 'Columns',
    encodingLabel: 'Encoding',
    delimiterLabel: 'Delimiter',
    headerToggle: 'First row is a header',
    optAuto: 'Auto',
    encUtf8: 'UTF-8',
    encShiftJis: 'Shift_JIS',
    delimComma: 'Comma',
    delimTab: 'Tab',
    delimSemicolon: 'Semicolon',
    rowNumberHeader: 'Row number',
    columnLabel: 'Column',
    loadAnother: 'Open another file',
    tableLabel: 'CSV data',

    // CsvViewer — error states
    errWrongType: '{name} is not a supported file. Choose a CSV, TSV or TXT file.',
    errUnreadable: 'The file {name} could not be read. Please try again.',
    errEmpty: 'The file {name} is empty — there is nothing to show.',
    errParse:
      'The file {name} could not be read as a table. Check the delimiter and encoding.',

    // GlobalDropZone
    dzProcessing: 'Opening {count} file(s)…',
    dzPleaseWait: 'Please wait',
    dzDropTitle: 'Drop a file to view',
    dzDropSub: 'CSV, TSV and TXT files can be viewed',

    // InstallPrompt
    installHeading: 'Install app',
    installBody: 'Add to your home screen for quick access.',
    install: 'Install',
    later: 'Later',

    // ThemeToggle
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    themeLabel: 'Theme',

    // shared
    required: 'Required',
    close: 'Close',
  },
  ja: {
    // CsvViewer — open / dropzone
    uploadHeading: 'ファイルを開く',
    uploadSubtitle: 'CSV / TSV / TXT ファイルを選んでください。ファイルは端末内で読み込まれます。',
    dropClick: 'クリックしてファイルを選択',
    dropOr: 'またはページ上にドロップ',
    dropSupported: '対応形式: CSV, TSV, TXT',

    // CsvViewer — table meta / controls
    rowCount: '行数',
    colCount: '列数',
    encodingLabel: '文字コード',
    delimiterLabel: '区切り文字',
    headerToggle: '1 行目を見出しにする',
    optAuto: '自動',
    encUtf8: 'UTF-8',
    encShiftJis: 'Shift_JIS',
    delimComma: 'カンマ',
    delimTab: 'タブ',
    delimSemicolon: 'セミコロン',
    rowNumberHeader: '行番号',
    columnLabel: '列',
    loadAnother: '別のファイルを開く',
    tableLabel: 'CSV データ',

    // CsvViewer — error states
    errWrongType: '{name} は対応していない形式です。CSV / TSV / TXT ファイルを選んでください。',
    errUnreadable: 'ファイル {name} を読み込めませんでした。もう一度お試しください。',
    errEmpty: 'ファイル {name} は空です。表示する内容がありません。',
    errParse: 'ファイル {name} を表として読み込めませんでした。区切り文字と文字コードをご確認ください。',

    // GlobalDropZone
    dzProcessing: '{count} 件のファイルを開いています…',
    dzPleaseWait: 'お待ちください',
    dzDropTitle: 'ドロップで表示',
    dzDropSub: 'CSV・TSV・TXT ファイルを表示できます',

    // InstallPrompt
    installHeading: 'アプリを追加',
    installBody: 'ホーム画面に追加すると、すぐに開けます。',
    install: '追加',
    later: 'あとで',

    // ThemeToggle
    themeToLight: 'ライトモードに切り替え',
    themeToDark: 'ダークモードに切り替え',
    themeLabel: 'テーマ',

    // shared
    required: '必須',
    close: '閉じる',
  },
  zh: {
    // CsvViewer — open / dropzone
    uploadHeading: '打开文件',
    uploadSubtitle: '选择 CSV / TSV / TXT 文件。文件在你的设备上读取。',
    dropClick: '点击选择文件',
    dropOr: '或把文件拖到页面任意位置',
    dropSupported: '支持格式：CSV、TSV、TXT',

    // CsvViewer — table meta / controls
    rowCount: '行数',
    colCount: '列数',
    encodingLabel: '字符编码',
    delimiterLabel: '分隔符',
    headerToggle: '将第一行作为表头',
    optAuto: '自动',
    encUtf8: 'UTF-8',
    encShiftJis: 'Shift_JIS',
    delimComma: '逗号',
    delimTab: '制表符',
    delimSemicolon: '分号',
    rowNumberHeader: '行号',
    columnLabel: '列',
    loadAnother: '打开其他文件',
    tableLabel: 'CSV 数据',

    // CsvViewer — error states
    errWrongType: '{name} 不是受支持的文件。请选择 CSV、TSV 或 TXT 文件。',
    errUnreadable: '无法读取文件 {name}。请重试。',
    errEmpty: '文件 {name} 为空，没有可显示的内容。',
    errParse: '无法将文件 {name} 解析为表格。请检查分隔符和字符编码。',

    // GlobalDropZone
    dzProcessing: '正在打开 {count} 个文件…',
    dzPleaseWait: '请稍候',
    dzDropTitle: '拖放即可查看',
    dzDropSub: '可以查看 CSV、TSV、TXT 文件',

    // InstallPrompt
    installHeading: '安装应用',
    installBody: '添加到主屏幕，方便随时打开。',
    install: '安装',
    later: '以后再说',

    // ThemeToggle
    themeToLight: '切换到浅色模式',
    themeToDark: '切换到深色模式',
    themeLabel: '主题',

    // shared
    required: '必填',
    close: '关闭',
  },
  de: {
    // CsvViewer — open / dropzone
    uploadHeading: 'Datei öffnen',
    uploadSubtitle: 'Wähle eine CSV-, TSV- oder TXT-Datei. Sie wird auf deinem Gerät gelesen.',
    dropClick: 'Zum Auswählen klicken',
    dropOr: 'oder Datei irgendwo auf die Seite ziehen',
    dropSupported: 'Unterstützt: CSV, TSV, TXT',

    // CsvViewer — table meta / controls
    rowCount: 'Zeilen',
    colCount: 'Spalten',
    encodingLabel: 'Zeichenkodierung',
    delimiterLabel: 'Trennzeichen',
    headerToggle: 'Erste Zeile ist eine Kopfzeile',
    optAuto: 'Automatisch',
    encUtf8: 'UTF-8',
    encShiftJis: 'Shift_JIS',
    delimComma: 'Komma',
    delimTab: 'Tabulator',
    delimSemicolon: 'Semikolon',
    rowNumberHeader: 'Zeilennummer',
    columnLabel: 'Spalte',
    loadAnother: 'Andere Datei öffnen',
    tableLabel: 'CSV-Daten',

    // CsvViewer — error states
    errWrongType: '{name} ist kein unterstütztes Format. Wähle eine CSV-, TSV- oder TXT-Datei.',
    errUnreadable: 'Die Datei {name} konnte nicht gelesen werden. Bitte versuche es erneut.',
    errEmpty: 'Die Datei {name} ist leer – es gibt nichts anzuzeigen.',
    errParse:
      'Die Datei {name} konnte nicht als Tabelle gelesen werden. Prüfe Trennzeichen und Zeichenkodierung.',

    // GlobalDropZone
    dzProcessing: '{count} Datei(en) werden geöffnet …',
    dzPleaseWait: 'Bitte warten',
    dzDropTitle: 'Datei zum Ansehen ablegen',
    dzDropSub: 'CSV-, TSV- und TXT-Dateien können angezeigt werden',

    // InstallPrompt
    installHeading: 'App installieren',
    installBody: 'Zum Startbildschirm hinzufügen, um es direkt zu öffnen.',
    install: 'Installieren',
    later: 'Später',

    // ThemeToggle
    themeToLight: 'Zum hellen Modus wechseln',
    themeToDark: 'Zum dunklen Modus wechseln',
    themeLabel: 'Design',

    // shared
    required: 'Erforderlich',
    close: 'Schließen',
  },
  es: {
    // CsvViewer — open / dropzone
    uploadHeading: 'Abrir un archivo',
    uploadSubtitle: 'Elige un archivo CSV, TSV o TXT. Se lee en tu dispositivo.',
    dropClick: 'Haz clic para elegir un archivo',
    dropOr: 'o suéltalo en cualquier parte de la página',
    dropSupported: 'Compatibles: CSV, TSV, TXT',

    // CsvViewer — table meta / controls
    rowCount: 'Filas',
    colCount: 'Columnas',
    encodingLabel: 'Codificación',
    delimiterLabel: 'Delimitador',
    headerToggle: 'La primera fila es un encabezado',
    optAuto: 'Automático',
    encUtf8: 'UTF-8',
    encShiftJis: 'Shift_JIS',
    delimComma: 'Coma',
    delimTab: 'Tabulación',
    delimSemicolon: 'Punto y coma',
    rowNumberHeader: 'Número de fila',
    columnLabel: 'Columna',
    loadAnother: 'Abrir otro archivo',
    tableLabel: 'Datos CSV',

    // CsvViewer — error states
    errWrongType: '{name} no es un archivo compatible. Elige un archivo CSV, TSV o TXT.',
    errUnreadable: 'No se pudo leer el archivo {name}. Inténtalo de nuevo.',
    errEmpty: 'El archivo {name} está vacío: no hay nada que mostrar.',
    errParse:
      'No se pudo leer el archivo {name} como tabla. Revisa el delimitador y la codificación.',

    // GlobalDropZone
    dzProcessing: 'Abriendo {count} archivo(s)…',
    dzPleaseWait: 'Espera un momento',
    dzDropTitle: 'Suelta un archivo para verlo',
    dzDropSub: 'Se pueden ver archivos CSV, TSV y TXT',

    // InstallPrompt
    installHeading: 'Instalar la app',
    installBody: 'Añádela a tu pantalla de inicio para tenerla siempre a mano.',
    install: 'Instalar',
    later: 'Más tarde',

    // ThemeToggle
    themeToLight: 'Cambiar al modo claro',
    themeToDark: 'Cambiar al modo oscuro',
    themeLabel: 'Tema',

    // shared
    required: 'Obligatorio',
    close: 'Cerrar',
  },
} as const;

export type UiStrings = (typeof ui)['en'];
