import type { ToolContent } from './types';

// Español. Transcreación basada en el vocabulario que usan los visores de CSV y
// herramientas de datos en español, no traducción literal. Sin palabras
// publicitarias (fácil / rápido / al instante…); la privacidad se explica de
// forma estructural, no como promesa. Español pan-regional, registro «tú».

export const es: ToolContent = {
  htmlLang: 'es',

  meta: {
    title: 'Visor de CSV — abre archivos CSV en tu navegador, sin subir nada | runlocally',
    description:
      'Consulta archivos CSV, TSV y de texto delimitado en tu navegador. El archivo se lee en tu dispositivo y no se sube a ningún sitio. Detecta UTF-8 y Shift_JIS, detecta el delimitador automáticamente y admite archivos grandes. Código abierto, funciona sin conexión.',
    ogTitle: 'Visor de CSV — abre archivos CSV en tu navegador, sin subir nada',
    ogDescription:
      'Abre y consulta archivos CSV en tu navegador. No se sube nada. Detecta codificación y delimitador, admite archivos grandes. Código abierto, funciona sin conexión.',
  },

  hero: {
    h1: 'Visor de CSV',
    tagline:
      'Abre y consulta archivos CSV en tu navegador, con detección de codificación y delimitador. No se sube nada.',
  },

  intro: {
    h2: 'Consulta archivos CSV en tu navegador',
    paras: [
      'Esta herramienta abre archivos CSV, TSV y otros textos delimitados y los muestra como una tabla. El archivo se lee en tu dispositivo, así que puedes revisar los datos sin enviarlos a un servidor ni instalar nada.',
      'Detecta la codificación de caracteres (UTF-8, con Shift_JIS como respaldo para archivos exportados desde hojas de cálculo japonesas) y el delimitador (coma, tabulación o punto y coma). Si la detección automática no acierta, puedes cambiarla a mano. Los archivos grandes se dibujan pantalla a pantalla, de modo que un archivo con decenas de miles de filas se mantiene fluido al desplazarte.',
    ],
  },

  privacy: {
    h2: 'Por qué tu archivo no sale de tu dispositivo',
    lead: 'Aquí la privacidad es estructural, no una promesa. No hay un paso de subida porque no hay ningún servidor al que enviar el archivo:',
    points: [
      'El archivo se lee y se procesa por completo en tu navegador.',
      'La página se sirve como archivos estáticos y no envía ninguna petición con tus datos.',
      'El código es abierto y cualquiera puede leerlo (MIT).',
      'Funciona sin conexión, algo que solo es posible porque nada sale del dispositivo.',
    ],
    note: 'Si quieres comprobarlo tú mismo, abre el panel de Red de tu navegador mientras abres un archivo: ninguna petición lleva su contenido.',
    sourceLinkText: 'Leer el código fuente.',
  },

  howto: {
    h2: 'Cómo se usa',
    steps: [
      {
        h3: 'Abre un archivo',
        p: 'Haz clic para seleccionar un archivo CSV, TSV o TXT, o suéltalo en cualquier parte de la página. El archivo se lee de forma local.',
      },
      {
        h3: 'Revisa la codificación y el delimitador',
        p: 'La codificación y el delimitador detectados aparecen encima de la tabla. Si el texto se ve con caracteres extraños o las columnas no cuadran, cámbialos a mano y la tabla vuelve a leer el archivo.',
      },
      {
        h3: 'Consulta la tabla',
        p: 'Indica si la primera fila es un encabezado y desplázate por las filas. Los archivos grandes se cargan por partes.',
      },
    ],
  },

  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Se sube mi archivo a algún sitio?',
      a: 'No. El archivo se lee y se procesa por completo en tu navegador. No hay ningún componente de servidor, así que su contenido no tiene forma de salir del dispositivo. El código es abierto y puedes confirmarlo en el panel de Red de tu navegador.',
    },
    {
      q: '¿Qué tipos de archivo puede abrir?',
      a: 'Archivos separados por comas (.csv), por tabulaciones (.tsv) y de texto plano (.txt). El delimitador se detecta automáticamente entre coma, tabulación y punto y coma, y también puedes fijarlo a mano.',
    },
    {
      q: 'Mi texto en japonés se ve con caracteres extraños. ¿Qué puedo hacer?',
      a: 'Eso suele indicar que el archivo está codificado en Shift_JIS y no en UTF-8. El visor prueba primero UTF-8 y recurre a Shift_JIS, pero también puedes fijar la codificación a mano y la tabla vuelve a leer el archivo con ella.',
    },
    {
      q: '¿Admite archivos grandes?',
      a: 'Sí, dentro de la memoria de tu dispositivo. Solo se dibujan las filas visibles en pantalla, así que desplazarte por un archivo con decenas de miles de filas se mantiene fluido. Como todo se ejecuta de forma local, los archivos muy grandes siguen estando limitados por la memoria disponible.',
    },
    {
      q: '¿Puedo editar o guardar el archivo?',
      a: 'No. Es un visor para leer y revisar datos; no modifica el archivo ni exporta uno nuevo.',
    },
    {
      q: '¿Funciona sin conexión?',
      a: 'Sí. Es una PWA. Tras la primera visita queda guardada en la caché, de modo que se abre sin conexión a la red. También puedes instalarla en tu pantalla de inicio.',
    },
  ],

  footer: {
    openSourceLabel: 'Código abierto (MIT)',
    partOf: 'parte de',
    brandTail: '— pequeñas herramientas que funcionan localmente en tu dispositivo.',
    colophon:
      'Creado y mantenido por Geppetto. Parte del código se escribe con ayuda de IA; la revisión y las decisiones son del responsable del proyecto.',
    securityText: 'Seguridad',
  },

  related: {
    h2: 'Herramientas relacionadas',
    blogLinkText: 'Leer las notas técnicas',
  },
};
