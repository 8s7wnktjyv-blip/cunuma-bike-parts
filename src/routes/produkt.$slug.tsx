import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { InquiryForm } from "@/components/site/inquiry-form";
import { Pending } from "@/components/site/shell";
import { getProduct } from "@/data/catalog";
import { asset } from "@/lib/utils";

export const Route = createFileRoute("/produkt/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — CUNUMA` : "Produkt — CUNUMA" },
      {
        name: "description",
        content: loaderData?.lead ?? "Produktdetail eines CUNUMA-Laufrads.",
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const image = product.images[active] ?? product.images[0];

  return (
    <main id="inhalt">
      <div className="grid lg:grid-cols-2">
        <div className="bg-ink px-5 py-8 lg:px-10 lg:py-12">
          <p className="mb-4 text-xs text-stone">
            <Link to="/" className="hover:text-paper">
              CUNUMA
            </Link>
            <span aria-hidden="true"> / </span>
            <Link to={product.slug === "road" ? "/road" : "/gravel"} className="hover:text-paper">
              {product.eyebrow}
            </Link>
          </p>
          {image ? (
            <img
              src={asset(image.src)}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="aspect-[4/5] w-full object-cover"
            />
          ) : null}
          <div className="mt-3 grid grid-cols-4 gap-2">
            {product.images.map((item, index) => (
              <button
                key={item.src}
                type="button"
                className="min-h-11 border border-transparent aria-pressed:border-paper"
                aria-pressed={index === active}
                aria-label={`Bild ${index + 1} anzeigen`}
                onClick={() => setActive(index)}
              >
                <img src={asset(item.src)} alt="" width={item.width} height={item.height} className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-stone">
            Gestaltungsbild. Kein Serienfoto und keine bestätigte Produktspezifikation.
          </p>
        </div>
        <div className="bg-paper px-5 py-12 text-ink lg:px-14 lg:py-16">
          <p className="eyebrow text-ink-soft">{product.eyebrow}</p>
          <h1 className="mt-3 font-display text-5xl">{product.name}</h1>
          <p className="mt-5 max-w-md leading-relaxed text-ink-soft">{product.lead}</p>
          <p className="mt-6 text-sm">Preis: auf Anfrage. Keine Zahlung auf dieser Seite.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#anfrage" className="btn btn-dark">
              Anfragen
            </a>
            <Link to="/konfigurator" search={{ linie: product.slug }} className="btn btn-line-dark">
              Konfigurieren
            </Link>
          </div>
          <table className="mt-12 w-full text-left text-sm">
            <caption className="sr-only">Technische Angaben mit Kennzeichnung nicht bestätigter Werte</caption>
            <tbody>
              {product.specs.map((spec) => (
                <tr key={spec.label} className="border-t border-line-soft">
                  <th scope="row" className="w-2/5 py-4 pr-4 font-medium">
                    {spec.label}
                  </th>
                  <td className="py-4 text-ink-soft">
                    {spec.pending ? <Pending>{spec.value}</Pending> : spec.value}
                    {spec.note ? <span className="mt-1 block text-xs">{spec.note}</span> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-4xl">Über diese Linie</h2>
          </div>
          <div className="space-y-5 leading-relaxed text-ink-soft lg:col-span-8">
            {product.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <section id="anfrage" className="border-t border-line-soft bg-foam text-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-ink-soft">Anfrage</p>
            <h2 className="mt-3 font-display text-4xl">Interesse an {product.name}.</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Das Formular bereitet eine Nachricht vor. Es sendet sie nicht und löst keine Bestellung aus.
            </p>
          </div>
          <div className="lg:col-span-8">
            <InquiryForm
              presetTopic={product.slug}
              presetProduct={product.name}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
