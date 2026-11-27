import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { WheelVisual } from "@/components/site/wheel-visual";
import type { Discipline } from "@/data/catalog";
import {
  finishLabel,
  freehubLabel,
  rimHeights,
  spokeCounts,
  useInquiryStore,
  type Finish,
  type Freehub,
  type RimHeight,
  type SpokeCount,
} from "@/lib/inquiry-store";

type Search = { linie?: Discipline };

export const Route = createFileRoute("/konfigurator")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    linie: search.linie === "gravel" || search.linie === "road" ? search.linie : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Konfigurator — CUNUMA" },
      {
        name: "description",
        content:
          "Wunschkonfiguration für ein CUNUMA-Laufrad. Die Auswahl ist eine Anfrage, keine freigegebene Spezifikation und keine Bestellung.",
      },
    ],
  }),
  component: Configurator,
});

const finishes: Finish[] = ["matte", "gloss", "weave"];
const freehubs: Freehub[] = ["hg", "xdr", "n3w"];

function Configurator() {
  const search = Route.useSearch();
  const add = useInquiryStore((state) => state.add);
  const [discipline, setDiscipline] = useState<Discipline>(search.linie ?? "road");
  const [rimHeight, setRimHeight] = useState<RimHeight>(45);
  const [finish, setFinish] = useState<Finish>("matte");
  const [freehub, setFreehub] = useState<Freehub>("hg");
  const [spokes, setSpokes] = useState<SpokeCount>(24);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (search.linie) setDiscipline(search.linie);
  }, [search.linie]);

  function save() {
    add({ discipline, rimHeight, finish, freehub, spokes });
    setSaved(true);
  }

  return (
    <main id="inhalt" className="grid lg:grid-cols-2">
      <section className="flex flex-col justify-between bg-ink px-5 py-10 lg:min-h-[80vh] lg:px-12">
        <div>
          <p className="eyebrow text-stone">Konfigurator</p>
          <h1 className="mt-3 font-display text-5xl">Ein Wunsch, kein Maß.</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
            Die Zeichnung reagiert auf Ihre Auswahl. Sie ist schematisch. Keine Höhe, kein Freilauf und
            keine Speichenzahl ist damit als lieferbar oder vermessen bestätigt.
          </p>
        </div>
        <div className="mx-auto w-full max-w-md py-8">
          <WheelVisual id="config" rimHeight={rimHeight} spokes={spokes} finish={finish} />
        </div>
        <p className="text-sm text-stone">
          {discipline === "road" ? "CUNUMA Road" : "CUNUMA Gravel"} · Wunsch {rimHeight} mm ·{" "}
          {finishLabel[finish]} · {freehubLabel[freehub]} · {spokes} Speichen
        </p>
      </section>
      <section className="bg-ink-2 px-5 py-10 text-paper lg:px-12">
        <fieldset>
          <legend className="eyebrow text-stone">Linie</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(["road", "gravel"] as const).map((item) => (
              <button
                key={item}
                type="button"
                className="choice"
                aria-pressed={discipline === item}
                onClick={() => {
                  setDiscipline(item);
                  setSaved(false);
                }}
              >
                {item === "road" ? "Road" : "Gravel"}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-8">
          <legend className="eyebrow text-stone">Wunsch-Felgenhöhe</legend>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {rimHeights.map((item) => (
              <button
                key={item}
                type="button"
                className="choice tabular-nums"
                aria-pressed={rimHeight === item}
                onClick={() => {
                  setRimHeight(item);
                  setSaved(false);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-8">
          <legend className="eyebrow text-stone">Oberfläche, Wunsch</legend>
          <div className="mt-3 grid gap-2">
            {finishes.map((item) => (
              <button
                key={item}
                type="button"
                className="choice"
                aria-pressed={finish === item}
                onClick={() => {
                  setFinish(item);
                  setSaved(false);
                }}
              >
                {finishLabel[item]}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-8">
          <legend className="eyebrow text-stone">Freilauf, Wunsch</legend>
          <div className="mt-3 grid gap-2">
            {freehubs.map((item) => (
              <button
                key={item}
                type="button"
                className="choice"
                aria-pressed={freehub === item}
                onClick={() => {
                  setFreehub(item);
                  setSaved(false);
                }}
              >
                {freehubLabel[item]}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-8">
          <legend className="eyebrow text-stone">Speichen, Wunsch</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {spokeCounts.map((item) => (
              <button
                key={item}
                type="button"
                className="choice tabular-nums"
                aria-pressed={spokes === item}
                onClick={() => {
                  setSpokes(item);
                  setSaved(false);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>
        <p className="mt-8 text-sm leading-relaxed text-stone">
          Diese Kombination wird nur auf diesem Gerät in Ihrer Anfrage gespeichert. Es wird nichts bestellt
          und nichts bezahlt.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" className="btn btn-light" onClick={save}>
            In die Anfrage legen
          </button>
          <Link to="/anfrage" className="btn btn-line-light">
            Anfrage ansehen
          </Link>
        </div>
        {saved ? (
          <p className="mt-4 text-sm" role="status">
            Liegt in Ihrer Anfrage. Noch keine Bestellung.
          </p>
        ) : null}
      </section>
    </main>
  );
}
