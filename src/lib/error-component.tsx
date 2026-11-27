import type { ErrorComponentProps } from "@tanstack/react-router";

const FALLBACK_MESSAGE = "Ein unerwarteter Fehler ist aufgetreten. Bitte laden Sie die Seite neu.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-6 text-center text-paper">
      <p className="eyebrow text-stone">CUNUMA</p>
      <h1 className="font-display text-4xl">Etwas ist schiefgelaufen.</h1>
      <p className="max-w-md text-sm break-words text-stone">{errorMessage(error)}</p>
    </main>
  );
}
