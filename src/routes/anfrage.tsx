import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { describeRequest, useInquiryStore } from "@/lib/inquiry-store";

export const Route = createFileRoute("/anfrage")({
  head: () => ({
    meta: [
      { title: "Anfrage — CUNUMA" },
      {
        name: "description",
        content:
          "Ihre Wunschkonfigurationen für CUNUMA. Noch kein Warenkorb mit Zahlung.",
      },
    ],
  }),
  component: InquiryPage,
});

function InquiryPage() {
  const items = useInquiryStore((state) => state.items);
  const hydrated = useInquiryStore((state) => state.hydrated);
  const remove = useInquiryStore((state) => state.remove);
  const clear = useInquiryStore((state) => state.clear);

  useEffect(() => {
    void useInquiryStore.persist.rehydrate();
  }, []);

  return (
    <main id="inhalt" className="bg-paper text-ink">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <p className="eyebrow text-ink-soft">Anfrage</p>
        <h1 className="mt-3 font-display text-5xl">Ihre Wünsche.</h1>
        <p className="mt-4 text-ink-soft">
          Das ist die Vorlage für einen späteren Warenkorb. Positionen sind Konfigurationen, keine
          reservierte Ware. Der <Link to="/checkout" className="underline">Checkout</Link> nimmt keine
          Zahlung an.
        </p>
        {!hydrated ? <p className="mt-8 text-sm text-ink-soft">Wird gelesen …</p> : null}
        {hydrated && items.length === 0 ? (
          <div className="mt-10 border border-line-soft p-6">
            <p>Noch keine Konfiguration.</p>
            <Link to="/konfigurator" className="btn btn-dark mt-5">
              Konfigurator öffnen
            </Link>
          </div>
        ) : null}
        {hydrated && items.length > 0 ? (
          <ul className="mt-10 divide-y divide-line-soft border-y border-line-soft">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-relaxed">{describeRequest(item)}</p>
                <button type="button" className="btn btn-line-dark shrink-0" onClick={() => remove(item.id)}>
                  Entfernen
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        {hydrated && items.length > 0 ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/kontakt" className="btn btn-dark">
              Anfrage vorbereiten
            </Link>
            <button type="button" className="btn btn-line-dark" onClick={clear}>
              Liste leeren
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
