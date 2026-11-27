import { createFileRoute } from "@tanstack/react-router";
import { InquiryForm } from "@/components/site/inquiry-form";
import { Pending } from "@/components/site/shell";
import { company } from "@/data/content";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — CUNUMA" },
      {
        name: "description",
        content:
          "Anfrage an CUNUMA vorbereiten. Das Formular sendet noch nichts, weil die Kontaktadresse ein Platzhalter ist.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <main id="inhalt" className="bg-paper text-ink">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-ink-soft">Kontakt</p>
          <h1 className="mt-3 font-display text-5xl">Schreiben Sie uns.</h1>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Produktfragen, Händler und Presse laufen über dieselbe Vorbereitung. Eine echte Adresse wird
            eingesetzt, sobald sie vorliegt.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="text-ink-soft">E-Mail</dt>
              <dd className="mt-1">
                <Pending>{company.email}</Pending>
              </dd>
            </div>
            <div>
              <dt className="text-ink-soft">Telefon</dt>
              <dd className="mt-1">
                <Pending>{company.phone}</Pending>
              </dd>
            </div>
            <div>
              <dt className="text-ink-soft">Anschrift</dt>
              <dd className="mt-1">
                <Pending>{company.name}</Pending>
                <span className="mt-1 block">
                  <Pending>{company.street}</Pending>
                </span>
                <span className="mt-1 block">
                  <Pending>{company.city}</Pending>
                </span>
              </dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-8">
          <InquiryForm />
        </div>
      </div>
    </main>
  );
}
