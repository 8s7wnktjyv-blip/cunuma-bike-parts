/**
 * Seam for a later shop.
 * Cart lines exist as inquiries. Checkout and payment stay disabled
 * until a provider, legal entity, tax setup and terms of sale exist.
 * Do not simulate a successful charge.
 */
export type PaymentReadiness = {
  enabled: false;
  provider: null;
  reason: string;
  missing: string[];
};

export function paymentStatus(): PaymentReadiness {
  return {
    enabled: false,
    provider: null,
    reason:
      "Kein Zahlungsanbieter ist verbunden. Es kann nichts bezahlt, reserviert oder als Bestellung bestätigt werden.",
    missing: [
      "Bestätigte Firmendaten und ladungsfähige Anschrift",
      "Allgemeine Geschäftsbedingungen und Widerrufsbelehrung",
      "Versandregeln und Liefergebiet",
      "Steuerliche Behandlung",
      "Konto bei einem Zahlungsanbieter",
    ],
  };
}
