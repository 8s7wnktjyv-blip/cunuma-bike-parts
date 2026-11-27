import { createFileRoute } from "@tanstack/react-router";
import { company } from "@/data/content";
import { Pending } from "@/components/site/shell";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum — CUNUMA" },
      {
        name: "description",
        content:
          "Impressum von CUNUMA mit Platzhaltern. Die Angaben sind zu prüfen und ersetzen keine Rechtsberatung.",
      },
    ],
  }),
  component: Impressum,
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line-soft py-4">
      <dt className="text-sm text-ink-soft">{label}</dt>
      <dd className="mt-1">
        <Pending>{value}</Pending>
      </dd>
    </div>
  );
}

function Impressum() {
  return (
    <main id="inhalt" className="bg-paper text-ink">
      <article className="mx-auto max-w-3xl px-5 py-16">
        <p className="eyebrow text-ink-soft">Rechtliches</p>
        <h1 className="mt-3 font-display text-5xl">Impressum</h1>
        <p className="mt-5 leading-relaxed text-ink-soft">
          Struktur nach § 5 DDG (früher TMG) und § 18 Abs. 2 MStV. Alle eckigen Klammern sind
          Platzhalter. Dieses Impressum ist vor der Verwendung rechtlich zu prüfen und keine Beratung.
        </p>
        <h2 className="mt-10 font-display text-3xl">Anbieter</h2>
        <dl>
          <Row label="Name" value={company.name} />
          <Row label="Rechtsform" value={company.legalForm} />
          <Row label="Straße" value={company.street} />
          <Row label="Ort" value={company.city} />
          <Row label="Land" value={company.country} />
          <Row label="Vertreten durch" value={company.representative} />
          <Row label="Telefon" value={company.phone} />
          <Row label="E-Mail" value={company.email} />
        </dl>
        <h2 className="mt-10 font-display text-3xl">Register und Steuer</h2>
        <dl>
          <Row label="Registergericht" value={company.registerCourt} />
          <Row label="Registernummer" value={company.registerNumber} />
          <Row label="Umsatzsteuer-ID" value={company.vatId} />
        </dl>
        <h2 className="mt-10 font-display text-3xl">Inhaltlich verantwortlich</h2>
        <p className="mt-3">
          <Pending>{company.contentOwner}</Pending>
        </p>
        <p className="mt-2 text-ink-soft">Anschrift wie oben, sobald sie eingesetzt ist.</p>
        <h2 className="mt-10 font-display text-3xl">Hinweis</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Es besteht noch kein öffentlicher Online-Shop. Produktbilder sind Gestaltungsbilder. Technische
          Werte, die nicht bestätigt sind, werden nicht als Eigenschaften angeboten.
        </p>
      </article>
    </main>
  );
}
