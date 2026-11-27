import { createFileRoute, Link } from "@tanstack/react-router";
import { techChapters } from "@/data/content";

export const Route = createFileRoute("/technologie")({
  head: () => ({
    meta: [
      { title: "Technologie — CUNUMA" },
      {
        name: "description",
        content:
          "Wie CUNUMA über Felge, Carbon, Nabe und Passung spricht: ohne erfundene Maße, Gewichte oder Zertifikate.",
      },
    ],
  }),
  component: Technology,
});

function Technology() {
  return (
    <main id="inhalt">
      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow text-stone">Technologie</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl sm:text-6xl">Haltung, kein Datenblatt.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone">
          Eine Laufradmarke schuldet Zahlen, wenn sie sie hat. CUNUMA hat sie noch nicht freigegeben.
          Diese Seite beschreibt, welche Angaben später hier stehen — und welche Behauptungen bewusst fehlen.
        </p>
      </section>
      <section className="grid lg:grid-cols-2">
        <img
          src="/images/hub.jpg"
          alt="Nahaufnahme einer Nabenstudie. Kein bestätigtes Serienbauteil."
          width={1408}
          height={1408}
          className="h-full max-h-[80vh] w-full object-cover"
        />
        <img
          src="/images/weave.jpg"
          alt="Makro einer Carbon-Oberfläche. Keine Layup-Angabe."
          width={1408}
          height={1408}
          className="h-full max-h-[80vh] w-full object-cover"
        />
      </section>
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <ol className="grid gap-12 lg:grid-cols-2">
            {techChapters.map((chapter, index) => (
              <li key={chapter.id} className="border-t border-line-soft pt-6">
                <p className="eyebrow text-ink-soft">0{index + 1}</p>
                <h2 className="mt-3 font-display text-4xl">{chapter.title}</h2>
                <p className="mt-4 leading-relaxed text-ink-soft">{chapter.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16 border border-line-soft p-6 sm:p-10">
            <h2 className="font-display text-3xl">Was hier nicht steht</h2>
            <ul className="mt-5 space-y-3 text-ink-soft">
              <li>Kein Gewicht, weil keiner bestätigt ist.</li>
              <li>Keine Windkanal-, Labor- oder Vergleichswerte.</li>
              <li>Keine Zertifizierung, kein Prüfsiegel, keine Norm.</li>
              <li>Kein Herstellungsort und kein Nabenlieferant.</li>
              <li>Keine Aussage, dass eine Wunschhöhe im Konfigurator lieferbar ist.</li>
            </ul>
          </div>
          <Link to="/konfigurator" className="btn btn-dark mt-10">
            Zum Konfigurator
          </Link>
        </div>
      </section>
    </main>
  );
}
