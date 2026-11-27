import { createFileRoute, Link } from "@tanstack/react-router";
import { company } from "@/data/content";
import { Pending } from "@/components/site/shell";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz — CUNUMA" },
      {
        name: "description",
        content:
          "Datenschutzhinweise für CUNUMA mit Platzhaltern. Der Text ist rechtlich zu prüfen und beschreibt den aktuellen, lokalen Formularbetrieb.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main id="inhalt" className="bg-paper text-ink">
      <article className="mx-auto max-w-3xl space-y-8 px-5 py-16 leading-relaxed">
        <div>
          <p className="eyebrow text-ink-soft">Rechtliches</p>
          <h1 className="mt-3 font-display text-5xl">Datenschutz</h1>
          <p className="mt-5 text-ink-soft">
            Entwurf zur Orientierung an der DSGVO. Er ist von einer rechtskundigen Person zu prüfen, bevor
            er als verbindliche Erklärung gilt. Platzhalter sind gekennzeichnet.
          </p>
        </div>
        <section>
          <h2 className="font-display text-3xl">Verantwortlicher</h2>
          <p className="mt-3 text-ink-soft">
            <Pending>{company.name}</Pending>, <Pending>{company.street}</Pending>,{" "}
            <Pending>{company.city}</Pending>, <Pending>{company.country}</Pending>. E-Mail:{" "}
            <Pending>{company.email}</Pending>.
          </p>
        </section>
        <section>
          <h2 className="font-display text-3xl">Hosting</h2>
          <p className="mt-3 text-ink-soft">
            Die Seite kann bei einem Hosting-Anbieter ausgeliefert werden. Anbieter, Serverstandort und ein
            Vertrag zur Auftragsverarbeitung sind noch einzutragen: <Pending>{company.hosting}</Pending>.
            Server-Logfiles des Hosts (IP-Adresse, Zeitpunkt, abgerufene Adresse, User-Agent) können je nach
            Anbieter anfallen. Speicherdauer: <Pending>[SPEICHERDAUER LOGS]</Pending>.
          </p>
        </section>
        <section>
          <h2 className="font-display text-3xl">Kontaktformular</h2>
          <p className="mt-3 text-ink-soft">
            Das Formular prüft Ihre Eingaben nur in Ihrem Browser und zeigt einen Text zum Kopieren. Name,
            E-Mail und Nachricht werden dabei nicht an einen Server von CUNUMA übertragen. Sobald ein
            Versand eingerichtet wird, ist der Dienst hier zu nennen: <Pending>{company.mailService}</Pending>
            . Rechtsgrundlage wäre dann in der Regel Art. 6 Abs. 1 lit. b oder lit. f DSGVO, je nach Anliegen.
          </p>
        </section>
        <section>
          <h2 className="font-display text-3xl">Lokale Speicherung</h2>
          <p className="mt-3 text-ink-soft">
            Im lokalen Speicher Ihres Browsers liegen zwei Dinge, wenn Sie sie auslösen: die Entscheidung zur
            Hinweisleiste (Schlüssel cunuma-consent) und Entwürfe Ihrer Wunschkonfiguration (Schlüssel
            cunuma-inquiry). Das sind keine Tracking-Cookies. Es ist kein Analyse- und kein Werbedienst
            geladen. Falls später einer hinzukommt: <Pending>{company.analytics}</Pending>.
          </p>
        </section>
        <section>
          <h2 className="font-display text-3xl">Schriften</h2>
          <p className="mt-3 text-ink-soft">
            Die Schriften werden mit der Website ausgeliefert. Es findet kein Aufruf bei einem externen
            Schriftanbieter statt.
          </p>
        </section>
        <section>
          <h2 className="font-display text-3xl">Ihre Rechte</h2>
          <p className="mt-3 text-ink-soft">
            Sie können Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch
            verlangen, soweit die Voraussetzungen vorliegen, und sich bei einer Aufsichtsbehörde beschweren:{" "}
            <Pending>{company.authority}</Pending>. Weil das Formular derzeit nichts übermittelt, liegen bei
            CUNUMA aus diesem Formular keine Anfragedaten vor.
          </p>
        </section>
        <section>
          <h2 className="font-display text-3xl">Stand</h2>
          <p className="mt-3 text-ink-soft">
            Textstand vor Einsetzen der echten Dienste. Siehe auch das <Link to="/impressum" className="underline">Impressum</Link>.
          </p>
        </section>
      </article>
    </main>
  );
}
