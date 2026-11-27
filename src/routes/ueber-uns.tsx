import { createFileRoute, Link } from "@tanstack/react-router";
import { company } from "@/data/content";
import { Pending } from "@/components/site/shell";
import { asset } from "@/lib/utils";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über CUNUMA" },
      {
        name: "description",
        content:
          "CUNUMA ist eine Premium-Marke für Carbon-Laufräder. Firmensitz, Team und Fertigung werden ergänzt, sobald sie bestätigt sind.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main id="inhalt">
      <section className="bg-paper px-5 py-20 text-ink">
        <div className="mx-auto max-w-6xl">
          <img src={asset("/logo-dark.png")} alt="CUNUMA" width={1343} height={279} className="h-12 w-auto sm:h-16" />
          <h1 className="mt-10 max-w-3xl font-display text-5xl sm:text-6xl">Eine Marke, noch ohne Legende.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            CUNUMA steht für Carbon-Laufräder im Road- und Gravel-Bereich. Der Auftritt ist international,
            reduziert und auf Fahrer ausgerichtet, die das Detail ernst nehmen. Die Geschichte dahinter wird
            nicht erfunden.
          </p>
        </div>
      </section>
      <section className="grid lg:grid-cols-2">
        <img
          src={asset("/images/atelier.jpg")}
          alt="Stilles Arbeitsbild mit Carbonmaterial. Kein bestätigter Fertigungsstandort."
          width={1728}
          height={1152}
          className="h-full min-h-80 w-full object-cover"
        />
        <div className="flex flex-col justify-center px-5 py-16 lg:px-14">
          <h2 className="font-display text-4xl">Was feststeht</h2>
          <ul className="mt-6 space-y-4 text-stone">
            <li>Zwei Linien: CUNUMA Road und CUNUMA Gravel.</li>
            <li>Bestellung vorerst nur als Anfrage.</li>
            <li>Keine veröffentlichten Maße, Gewichte oder Zertifikate.</li>
            <li>Kein Zahlungsanbieter, kein vorgetäuschter Checkout.</li>
          </ul>
          <h2 className="mt-12 font-display text-4xl">Was noch fehlt</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-stone">Unternehmen</dt>
              <dd className="mt-1">
                <Pending>{company.name}</Pending>
              </dd>
            </div>
            <div>
              <dt className="text-stone">Sitz</dt>
              <dd className="mt-1">
                <Pending>{`${company.street}, ${company.city}`}</Pending>
              </dd>
            </div>
            <div>
              <dt className="text-stone">Fertigung und Team</dt>
              <dd className="mt-1">
                <Pending>nicht bestätigt</Pending>
              </dd>
            </div>
          </dl>
          <Link to="/kontakt" className="btn btn-line-light mt-10 self-start">
            Kontakt
          </Link>
        </div>
      </section>
    </main>
  );
}
