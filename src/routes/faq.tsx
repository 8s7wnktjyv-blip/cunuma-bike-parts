import { createFileRoute, Link } from "@tanstack/react-router";
import { faqs } from "@/data/content";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — CUNUMA" },
      {
        name: "description",
        content:
          "Häufige Fragen zu Anfrage, fehlenden Maßangaben, Konfigurator, Cookies und den Gestaltungsbildern von CUNUMA.",
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <main id="inhalt" className="bg-paper text-ink">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <p className="eyebrow text-ink-soft">FAQ</p>
        <h1 className="mt-3 font-display text-5xl">Kurz und ohne Ausflucht.</h1>
        <div className="mt-10 divide-y divide-line-soft border-y border-line-soft">
          {faqs.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-lg">
                {item.q}
                <span aria-hidden="true" className="text-ink-soft group-open:hidden">
                  +
                </span>
                <span aria-hidden="true" className="hidden text-ink-soft group-open:inline">
                  –
                </span>
              </summary>
              <p className="pb-3 pt-2 leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
        <Link to="/kontakt" className="btn btn-dark mt-10">
          Eigene Frage
        </Link>
      </div>
    </main>
  );
}
