import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/catalog";
import { techChapters } from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CUNUMA — Carbon-Laufräder für Road und Gravel" },
      {
        name: "description",
        content:
          "Premium-Auftritt für CUNUMA Road und CUNUMA Gravel. Konfigurator, Anfrage und ehrliche Platzhalter statt erfundener Technikdaten.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main id="inhalt">
      <section className="relative min-h-[88vh] overflow-hidden bg-ink">
        <img
          src="/images/hero.jpg"
          alt="Gestaltungsbild zweier Carbon-Laufräder im schwarzen Studio. Kein Serienfoto."
          width={1792}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/10" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 py-16">
          <p className="eyebrow reveal text-stone">Carbon wheelworks</p>
          <h1 className="reveal mt-4 max-w-3xl font-display text-5xl leading-none text-paper sm:text-7xl">
            Die Linie bleibt.
          </h1>
          <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-stone sm:text-lg">
            CUNUMA ist eine Premium-Marke für Carbon-Laufräder im Road- und Gravel-Bereich.
            International, reduziert, technisch ernst. Was nicht gemessen ist, steht hier nicht als Zahl.
          </p>
          <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/road" className="btn btn-light">
              Road
            </Link>
            <Link to="/gravel" className="btn btn-line-light">
              Gravel
            </Link>
            <Link to="/konfigurator" className="btn btn-line-light">
              Konfigurator
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl sm:grid-cols-3">
          {["Road", "Gravel", "Anfrage"].map((word) => (
            <p key={word} className="border-b border-line px-5 py-8 font-display text-3xl sm:border-b-0 sm:border-r sm:last:border-r-0">
              {word}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-ink-soft">Zwei Disziplinen</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">Road und Gravel.</h2>
            </div>
            <p className="hidden max-w-xs text-sm leading-relaxed text-ink-soft md:block">
              Je eine Linie. Keine Modellfamilie mit erfundenen Profilhöhen als eigene Produkte.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {([products.road, products.gravel] as const).map((product) => (
              <article key={product.slug} className="bg-ink text-paper">
                <Link to="/produkt/$slug" params={{ slug: product.slug }} className="block">
                  <img
                    src={product.cardImage.src}
                    alt={product.cardImage.alt}
                    width={product.cardImage.width}
                    height={product.cardImage.height}
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div className="px-5 py-6">
                    <p className="eyebrow text-stone">{product.eyebrow}</p>
                    <h3 className="mt-2 font-display text-3xl">{product.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone">{product.lead}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <img
          src="/images/weave.jpg"
          alt="Makro einer Carbon-Oberfläche, Materialstudie."
          width={1408}
          height={1408}
          className="h-full max-h-[80vh] w-full object-cover"
        />
        <div className="flex flex-col justify-center px-5 py-16 lg:px-16">
          <p className="eyebrow text-stone">Material</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">Carbon, noch ohne Datenblatt.</h2>
          <p className="mt-6 max-w-md leading-relaxed text-stone">
            Die Oberfläche darf zeigen, worauf die Marke zielt. Layup, Gewicht und Prüfung folgen erst,
            wenn sie bestätigt sind. Bis dahin bleibt die Technologie-Seite eine Haltung, kein Prospekt
            mit Laborwerten.
          </p>
          <Link to="/technologie" className="btn btn-line-light mt-8 self-start">
            Technologie
          </Link>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-4">
          {techChapters.map((chapter, index) => (
            <article key={chapter.id} className="border-b border-line px-5 py-10 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <p className="eyebrow text-stone">0{index + 1}</p>
              <h3 className="mt-4 font-display text-3xl">{chapter.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-stone">{chapter.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative min-h-[70vh]">
        <img
          src="/images/rider.jpg"
          alt="Editorial einer anonymen Fahrerin oder eines Fahrers von hinten, ohne Markenzeichen."
          width={1792}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end px-5 py-16">
          <blockquote className="max-w-xl">
            <p className="font-display text-4xl leading-tight text-paper">
              Kein Zitat eines Fahrers. Kein Testergebnis. Nur die Richtung.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-ink-soft">Konfigurator</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl sm:text-5xl">
              Wünsche sammeln. Nichts bezahlen.
            </h2>
            <p className="mt-4 max-w-lg text-ink-soft">
              Felgenhöhe, Oberfläche, Freilauf und Speichen sind Anfragefelder. Der Checkout bleibt
              geschlossen, bis Firmendaten und ein Zahlungsanbieter feststehen.
            </p>
          </div>
          <Link to="/konfigurator" className="btn btn-dark">
            Laufrad konfigurieren
          </Link>
        </div>
      </section>
    </main>
  );
}
