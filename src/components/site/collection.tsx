import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/catalog";
import { Pending } from "@/components/site/shell";

export function CollectionPage({ product }: { product: Product }) {
  return (
    <main id="inhalt">
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[70vh] bg-ink-2">
          <img
            src={product.cardImage.src}
            alt={product.cardImage.alt}
            width={product.cardImage.width}
            height={product.cardImage.height}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-end bg-ink px-5 py-16 lg:px-14">
          <p className="eyebrow text-stone">{product.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl text-paper sm:text-6xl">{product.name}</h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone">{product.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/produkt/$slug" params={{ slug: product.slug }} className="btn btn-light">
              Produkt ansehen
            </Link>
            <Link
              to="/konfigurator"
              search={{ linie: product.slug }}
              className="btn btn-line-light"
            >
              Konfigurieren
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-ink-soft">Linie</p>
            <h2 className="mt-3 font-display text-4xl">Eine Linie, keine erfundene Range.</h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-ink-soft lg:col-span-7">
            {product.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              Gewicht: <Pending>nicht veröffentlicht</Pending>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
