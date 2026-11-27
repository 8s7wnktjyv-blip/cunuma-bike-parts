import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/site/collection";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/gravel")({
  head: () => ({
    meta: [
      { title: "CUNUMA Gravel — Carbon-Laufräder" },
      {
        name: "description",
        content:
          "CUNUMA Gravel: die Linie abseits des Asphalts. Ohne bestätigte Maße, mit Anfrage und Konfigurator.",
      },
    ],
  }),
  component: () => <CollectionPage product={products.gravel} />,
});
