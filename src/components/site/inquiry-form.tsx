import { useMemo, useState } from "react";
import { z } from "zod";
import { company } from "@/data/content";
import { describeRequest, useInquiryStore } from "@/lib/inquiry-store";

const schema = z.object({
  name: z.string().trim().min(2, "Bitte einen Namen angeben."),
  email: z.string().trim().email("Bitte eine gültige E-Mail-Adresse angeben."),
  topic: z.enum(["allgemein", "road", "gravel", "haendler", "presse"]),
  message: z.string().trim().min(12, "Bitte ein paar Sätze zur Anfrage schreiben."),
  website: z.string().optional(),
});

const topics = [
  { id: "allgemein", label: "Allgemein" },
  { id: "road", label: "Road" },
  { id: "gravel", label: "Gravel" },
  { id: "haendler", label: "Händler" },
  { id: "presse", label: "Presse" },
] as const;

export function InquiryForm({
  presetTopic = "allgemein",
  presetProduct,
}: {
  presetTopic?: (typeof topics)[number]["id"];
  presetProduct?: string;
}) {
  const items = useInquiryStore((state) => state.items);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<(typeof topics)[number]["id"]>(presetTopic);
  const [message, setMessage] = useState(
    presetProduct ? `Ich interessiere mich für ${presetProduct}.` : "",
  );
  const [website, setWebsite] = useState("");
  const [includeConfig, setIncludeConfig] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prepared, setPrepared] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const configBlock = useMemo(() => {
    if (!includeConfig || items.length === 0) return "";
    return items.map((item, index) => `${index + 1}. ${describeRequest(item)}`).join("\n");
  }, [includeConfig, items]);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setCopied(false);
    const parsed = schema.safeParse({ name, email, topic, message, website });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setPrepared(null);
      return;
    }
    setErrors({});
    if (parsed.data.website) {
      setPrepared("Anfrage verworfen.");
      return;
    }
    const topicLabel = topics.find((item) => item.id === parsed.data.topic)?.label ?? parsed.data.topic;
    const text = [
      "CUNUMA Anfrage",
      `Name: ${parsed.data.name}`,
      `E-Mail: ${parsed.data.email}`,
      `Thema: ${topicLabel}`,
      presetProduct ? `Produkt: ${presetProduct}` : "",
      "",
      parsed.data.message,
      configBlock ? `\nWunschkonfigurationen:\n${configBlock}` : "",
      "",
      "Hinweis: Diese Nachricht wurde nur im Browser zusammengestellt. Sie wurde nicht an einen Server gesendet.",
    ]
      .filter(Boolean)
      .join("\n");
    setPrepared(text);
  }

  async function copy() {
    if (!prepared) return;
    try {
      await navigator.clipboard.writeText(prepared);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          Name
          <input
            className="field mt-2"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name ? <span className="mt-2 block text-sm font-medium">{errors.name}</span> : null}
        </label>
        <label className="block text-sm">
          E-Mail
          <input
            className="field mt-2"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors.email ? <span className="mt-2 block text-sm font-medium">{errors.email}</span> : null}
        </label>
      </div>
      <fieldset>
        <legend className="text-sm">Thema</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {topics.map((item) => (
            <button
              key={item.id}
              type="button"
              className="choice choice-on-paper min-w-24"
              aria-pressed={topic === item.id}
              onClick={() => setTopic(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="block text-sm">
        Nachricht
        <textarea
          className="field mt-2 min-h-36"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        {errors.message ? <span className="mt-2 block text-sm font-medium">{errors.message}</span> : null}
      </label>
      {items.length > 0 ? (
        <label className="flex min-h-11 items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={includeConfig}
            onChange={(event) => setIncludeConfig(event.target.checked)}
          />
          {items.length} Wunschkonfiguration{items.length === 1 ? "" : "en"} anhängen
        </label>
      ) : null}
      <label className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn btn-dark">
          Anfrage vorbereiten
        </button>
      </div>
      <p className="text-sm leading-relaxed text-ink-soft">
        Es wird nichts übertragen. Die Kontaktadresse {company.email} ist noch ein Platzhalter, deshalb
        öffnet sich auch kein E-Mail-Programm mit einer echten Adresse.
      </p>
      {prepared ? (
        <div className="border border-line-soft p-4">
          <p className="eyebrow text-ink-soft">Vorbereitet, nicht gesendet</p>
          <textarea className="field mt-3 min-h-48" readOnly value={prepared} />
          <button type="button" className="btn btn-line-dark mt-3" onClick={() => void copy()}>
            {copied ? "Kopiert" : "Text kopieren"}
          </button>
        </div>
      ) : null}
    </form>
  );
}
