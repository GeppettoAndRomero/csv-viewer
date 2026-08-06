import type { ToolContent } from './types';

// Deutsch. Keine Wort-für-Wort-Übersetzung, sondern Transkreation auf Basis der
// Begriffe und Wendungen, die deutschsprachige CSV-Viewer / Datenwerkzeuge
// tatsächlich verwenden. Keine Werbefloskeln (einfach / schnell / im Nu) —
// Datenschutz wird strukturell begründet, nicht versprochen. Register: „du“.

export const de: ToolContent = {
  htmlLang: 'de',

  meta: {
    title: 'CSV-Viewer — CSV-Dateien im Browser öffnen, ohne Upload | runlocally',
    description:
      'CSV-, TSV- und getrennte Textdateien im Browser ansehen. Die Datei wird auf deinem Gerät gelesen und nicht hochgeladen. Erkennt UTF-8 und Shift_JIS, erkennt das Trennzeichen automatisch und kommt mit großen Dateien zurecht. Open Source, offline nutzbar.',
    ogTitle: 'CSV-Viewer — CSV-Dateien im Browser öffnen, ohne Upload',
    ogDescription:
      'CSV-Dateien im Browser öffnen und ansehen. Nichts wird hochgeladen. Erkennt Kodierung und Trennzeichen, große Dateien möglich. Open Source, offline nutzbar.',
  },

  hero: {
    h1: 'CSV-Viewer',
    tagline:
      'CSV-Dateien im Browser öffnen und ansehen – mit Erkennung von Kodierung und Trennzeichen. Nichts wird hochgeladen.',
  },

  intro: {
    h2: 'CSV-Dateien im Browser ansehen',
    paras: [
      'Dieses Tool öffnet CSV-, TSV- und andere getrennte Textdateien und zeigt sie als Tabelle. Die Datei wird auf deinem Gerät gelesen, sodass du Daten prüfen kannst, ohne sie an einen Server zu senden oder etwas zu installieren.',
      'Es erkennt die Zeichenkodierung (UTF-8, mit Shift_JIS als Rückfall für Dateien aus japanischen Tabellenprogrammen) und das Trennzeichen (Komma, Tabulator oder Semikolon). Passt die automatische Wahl nicht, kannst du sie von Hand ändern. Große Dateien werden bildschirmweise gezeichnet, sodass eine Datei mit Zehntausenden Zeilen beim Scrollen flüssig bleibt.',
    ],
  },

  privacy: {
    h2: 'Warum deine Datei auf dem Gerät bleibt',
    lead: 'Datenschutz ist hier strukturell, kein Versprechen. Es gibt keinen Upload-Schritt, weil es keinen Server gibt, an den die Datei gesendet werden könnte:',
    points: [
      'Die Datei wird vollständig in deinem Browser gelesen und ausgewertet.',
      'Die Seite wird als statische Dateien ausgeliefert und sendet keine Anfrage mit deinen Daten.',
      'Der Quellcode ist offen und kann von allen eingesehen werden (MIT).',
      'Die Seite funktioniert offline – was nur möglich ist, weil nichts das Gerät verlässt.',
    ],
    note: 'Wenn du es selbst prüfen willst, öffne beim Öffnen einer Datei das Netzwerk-Panel deines Browsers – keine Anfrage trägt ihren Inhalt.',
    sourceLinkText: 'Quellcode ansehen.',
  },

  howto: {
    h2: 'So funktioniert es',
    steps: [
      {
        h3: 'Datei öffnen',
        p: 'Klicke, um eine CSV-, TSV- oder TXT-Datei auszuwählen, oder ziehe sie irgendwo auf die Seite. Die Datei wird lokal gelesen.',
      },
      {
        h3: 'Kodierung und Trennzeichen prüfen',
        p: 'Erkannte Kodierung und Trennzeichen stehen über der Tabelle. Wirkt Text verstümmelt oder stimmen die Spalten nicht, ändere sie von Hand – die Tabelle liest die Datei neu ein.',
      },
      {
        h3: 'Tabelle ansehen',
        p: 'Lege fest, ob die erste Zeile eine Kopfzeile ist, und scrolle durch die Zeilen. Große Dateien werden abschnittsweise geladen.',
      },
    ],
  },

  faqHeading: 'Häufige Fragen',
  faq: [
    {
      q: 'Wird meine Datei irgendwohin hochgeladen?',
      a: 'Nein. Die Datei wird vollständig in deinem Browser gelesen und ausgewertet. Es gibt keine Serverkomponente, also gibt es für ihren Inhalt keinen Weg vom Gerät. Der Quellcode ist offen und du kannst das im Netzwerk-Panel deines Browsers nachprüfen.',
    },
    {
      q: 'Welche Dateitypen lassen sich öffnen?',
      a: 'Komma-getrennte (.csv), Tabulator-getrennte (.tsv) und reine Textdateien (.txt). Das Trennzeichen wird automatisch unter Komma, Tabulator und Semikolon erkannt und lässt sich auch von Hand setzen.',
    },
    {
      q: 'Mein japanischer Text erscheint als wirre Zeichen. Was kann ich tun?',
      a: 'Das bedeutet meist, dass die Datei in Shift_JIS statt in UTF-8 kodiert ist. Der Viewer versucht zuerst UTF-8 und fällt auf Shift_JIS zurück; du kannst die Kodierung aber auch manuell setzen, dann liest die Tabelle die Datei damit neu ein.',
    },
    {
      q: 'Kommt es mit großen Dateien zurecht?',
      a: 'Ja, im Rahmen des Arbeitsspeichers deines Geräts. Es werden nur die gerade sichtbaren Zeilen gezeichnet, sodass das Scrollen durch eine Datei mit Zehntausenden Zeilen flüssig bleibt. Da alles lokal läuft, sind sehr große Dateien weiterhin durch den verfügbaren Speicher begrenzt.',
    },
    {
      q: 'Kann ich die Datei bearbeiten oder speichern?',
      a: 'Nein. Dies ist ein Viewer zum Lesen und Prüfen von Daten; er verändert die Datei nicht und exportiert keine neue.',
    },
    {
      q: 'Funktioniert es offline?',
      a: 'Ja. Das Tool ist eine PWA. Nach dem ersten Besuch wird es zwischengespeichert, sodass es ohne Netzwerkverbindung öffnet. Du kannst es auch zum Startbildschirm hinzufügen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open Source (MIT)',
    partOf: 'Teil von',
    brandTail: '— kleine Tools, die lokal auf deinem Gerät laufen.',
    colophon:
      'Erstellt und gepflegt von Geppetto. Ein Teil des Codes entsteht mit KI-Unterstützung; Prüfung und Entscheidungen liegen beim Maintainer.',
    securityText: 'Sicherheit',
  },

  related: {
    h2: 'Ähnliche Tools',
    blogLinkText: 'Technische Hintergründe lesen',
  },
};
