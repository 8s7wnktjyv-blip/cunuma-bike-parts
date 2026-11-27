import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/site/collection";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/road")({
  head: () => ({
    meta: [
      { title: "CUNUMA Road — Carbon-Laufräder" },
      {
        name: "description",
        content:
          "CUNUMA Road: die Asphalt-Linie. Produktseite, Platzhalter für Maße und Anfrage ohne erfundene Gewichte.",
      },
    ],
  }),
  component: () => <CollectionPage product={products.road} />,
});
