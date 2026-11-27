import { createFileRoute, Link } from "@tanstack/react-router";
import { paymentStatus } from "@/lib/commerce";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — CUNUMA" },
      {
        name: "description",
        content: "Der CUNUMA-Checkout ist vorbereitet und bewusst ohne Zahlung.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const payment = paymentStatus();
  return (
    <main id="inhalt" className="bg-paper text-ink">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <p className="eyebrow text-ink-soft">Checkout</p>
        <h1 className="mt-3 font-display text-5xl">Zahlung ist aus.</h1>
        <p className="mt-5 leading-relaxed text-ink-soft">{payment.reason}</p>
        <h2 className="mt-10 font-display text-3xl">Bevor ein Shop live geht</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-soft">
          {payment.missing.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-ink-soft">
          Es gibt kein Kartenformular und keinen Button, der eine Zahlung vortäuscht. Die Anfrage bleibt der
          Weg, bis Anbieter und Rechtstexte stehen.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/anfrage" className="btn btn-dark">
            Zurück zur Anfrage
          </Link>
          <Link to="/kontakt" className="btn btn-line-dark">
            Kontakt
          </Link>
        </div>
      </div>
    </main>
  );
}
