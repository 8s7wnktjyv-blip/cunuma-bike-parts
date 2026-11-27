export type Discipline = "road" | "gravel";

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Spec = {
  label: string;
  value: string;
  pending: boolean;
  note?: string;
};

export type Product = {
  slug: Discipline;
  name: string;
  eyebrow: string;
  lead: string;
  paragraphs: string[];
  cardImage: GalleryImage;
  images: GalleryImage[];
  specs: Spec[];
};

const pending = "Platzhalter — nicht bestätigt";

function baseSpecs(extra: Spec[]): Spec[] {
  return [
    { label: "Felgenhöhe", value: pending, pending: true },
    { label: "Innenbreite", value: pending, pending: true },
    { label: "Außenbreite", value: pending, pending: true },
    ...extra,
    {
      label: "Nabe",
      value: pending,
      pending: true,
      note: "Hersteller, Modell und Einbaumaß sind nicht bestätigt.",
    },
    {
      label: "Speichen",
      value: pending,
      pending: true,
      note: "Anzahl, Material, Form und Einspeichung sind nicht bestätigt.",
    },
    {
      label: "Kompatibilität",
      value: pending,
      pending: true,
      note: "Freilauf, Bremsscheibenaufnahme und Reifenfreigabe stehen aus.",
    },
    {
      label: "Gewicht",
      value: "Nicht veröffentlicht",
      pending: true,
      note: "Es liegt kein bestätigter Gewichtswert vor. Deshalb steht hier keine Zahl.",
    },
    {
      label: "Zertifizierungen",
      value: "Keine angegeben",
      pending: true,
      note: "Es werden keine Prüfsiegel, Testergebnisse oder Normen beansprucht.",
    },
    { label: "Preis", value: "Auf Anfrage", pending: false },
  ];
}

export const products: Record<Discipline, Product> = {
  road: {
    slug: "road",
    name: "CUNUMA Road",
    eyebrow: "Road",
    lead: "Die Road-Linie für Asphalt. Reduziert im Auftritt, ernst in der Absicht — und ohne erfundene Maßangaben.",
    paragraphs: [
      "CUNUMA Road ist als Carbon-Laufrad für Rennradfahrer angelegt, die eine klare Form und eine ruhige Anmutung suchen. Die Linie ist freigegeben. Die messbaren Werte sind es nicht.",
      "Felgenhöhe, Maulweite, Nabe, Speichen und Gewicht werden erst veröffentlicht, wenn sie bestätigt sind. Bis dahin bleibt die Produktdatei ehrlich: Was fehlt, ist als Platzhalter markiert.",
      "Bestellt wird auf Anfrage. Ein Warenkorb mit Zahlung ist vorbereitet, aber nicht aktiv. Es wird nichts abgebucht und keine Lieferzusage aus einer Konfiguration abgeleitet.",
    ],
    cardImage: {
      src: "/images/road.jpg",
      alt: "Gestaltungsbild eines tiefen Carbon-Laufrads im Studio. Kein Serienfoto von CUNUMA Road.",
      width: 1200,
      height: 1600,
    },
    images: [
      {
        src: "/images/road.jpg",
        alt: "Gestaltungsbild eines tiefen Carbon-Laufrads, Dreiviertelansicht, dunkler Hintergrund.",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/hero.jpg",
        alt: "Gestaltungsbild zweier Carbon-Laufräder im schwarzen Studio.",
        width: 1792,
        height: 1008,
      },
      {
        src: "/images/weave.jpg",
        alt: "Makro einer Carbonfaser-Oberfläche. Materialstudie, keine freigegebene Layup-Angabe.",
        width: 1408,
        height: 1408,
      },
      {
        src: "/images/hub.jpg",
        alt: "Nahaufnahme einer Nabenflansch-Studie. Kein bestätigter Nabenhersteller.",
        width: 1408,
        height: 1408,
      },
    ],
    specs: baseSpecs([
      {
        label: "Einsatz",
        value: "Road, Anfrage",
        pending: false,
        note: "Disziplin ist Positionierung, keine geprüfte Einsatzfreigabe.",
      },
    ]),
  },
  gravel: {
    slug: "gravel",
    name: "CUNUMA Gravel",
    eyebrow: "Gravel",
    lead: "Die Gravel-Linie für Fahrer, die abseits der Ideallinie unterwegs sind — ohne laute Versprechen.",
    paragraphs: [
      "CUNUMA Gravel ist als Carbon-Laufrad für Gravel und lange Tage auf wechselndem Belag gedacht. Die Bildsprache zeigt die Richtung. Sie ist kein Nachweis eines Serienrads.",
      "Reifenfreiheit, Felgenbreite und Nabenstandard werden nicht geschätzt. Solange keine Freigabe vorliegt, bleiben diese Felder Platzhalter.",
      "Eine Wunschkonfiguration können Sie in die Anfrage legen. Sie ist ein Brief an die Marke, keine Bestellung und keine Bestätigung der Lieferbarkeit.",
    ],
    cardImage: {
      src: "/images/gravel.jpg",
      alt: "Gestaltungsbild eines Carbon-Laufrads mit etwas breiterer Bereifung. Kein Serienfoto von CUNUMA Gravel.",
      width: 1200,
      height: 1600,
    },
    images: [
      {
        src: "/images/gravel.jpg",
        alt: "Gestaltungsbild eines Gravel-Laufrads im Studio, Dreiviertelansicht.",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/gravel-still.jpg",
        alt: "Gestaltungsbild eines Laufrads an hellem Stein, Tageslicht.",
        width: 1792,
        height: 1008,
      },
      {
        src: "/images/weave.jpg",
        alt: "Makro einer Carbonfaser-Oberfläche. Materialstudie, keine freigegebene Layup-Angabe.",
        width: 1408,
        height: 1408,
      },
      {
        src: "/images/hub.jpg",
        alt: "Nahaufnahme einer Nabenflansch-Studie. Kein bestätigter Nabenhersteller.",
        width: 1408,
        height: 1408,
      },
    ],
    specs: baseSpecs([
      {
        label: "Einsatz",
        value: "Gravel, Anfrage",
        pending: false,
        note: "Disziplin ist Positionierung, keine geprüfte Einsatzfreigabe.",
      },
    ]),
  },
};

export function getProduct(slug: string): Product | undefined {
  if (slug === "road" || slug === "gravel") return products[slug];
  return undefined;
}

export const disciplines: Discipline[] = ["road", "gravel"];
