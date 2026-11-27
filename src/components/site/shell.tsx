import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useInquiryStore } from "@/lib/inquiry-store";
import { cn, asset } from "@/lib/utils";

const NAV = [
  { to: "/road", label: "Road" },
  { to: "/gravel", label: "Gravel" },
  { to: "/technologie", label: "Technologie" },
  { to: "/ueber-uns", label: "Atelier" },
  { to: "/konfigurator", label: "Konfigurator" },
] as const;

export function SiteHeader() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const hydrated = useInquiryStore((state) => state.hydrated);
  const count = useInquiryStore((state) => state.items.length);

  useEffect(() => {
    void useInquiryStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink">
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-ink"
      >
        Zum Inhalt
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link to="/" className="flex items-center" aria-label="CUNUMA, Startseite">
          <img src={asset("/logo-light.png")} alt="" width={1343} height={279} className="h-7 w-auto sm:h-8" />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "text-sm text-stone transition-colors hover:text-paper",
                path === item.to && "text-paper",
              )}
              aria-current={path === item.to ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/anfrage" className="btn btn-line-light hidden sm:inline-flex" aria-label="Anfrage öffnen">
            Anfrage
            {hydrated && count > 0 ? <span className="tabular-nums">{count}</span> : null}
          </Link>
          <Link to="/kontakt" className="btn btn-light hidden sm:inline-flex">
            Kontakt
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-ink lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4" aria-label="Mobil">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex min-h-12 items-center border-b border-line text-paper"
                aria-current={path === item.to ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/anfrage" className="flex min-h-12 items-center border-b border-line">
              Anfrage{hydrated && count > 0 ? ` (${count})` : ""}
            </Link>
            <Link to="/kontakt" className="btn btn-light mt-4">
              Kontakt
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={asset("/logo-light.png")} alt="CUNUMA" width={1343} height={279} className="h-8 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
            Premium-Marke für Carbon-Laufräder im Road- und Gravel-Bereich. Was nicht bestätigt ist,
            steht nicht als Tatsache.
          </p>
        </div>
        <div>
          <p className="eyebrow text-stone">Linien</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/road" className="hover:text-paper text-stone">
                CUNUMA Road
              </Link>
            </li>
            <li>
              <Link to="/gravel" className="hover:text-paper text-stone">
                CUNUMA Gravel
              </Link>
            </li>
            <li>
              <Link to="/konfigurator" className="hover:text-paper text-stone">
                Konfigurator
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-stone">Haus</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/technologie" className="text-stone hover:text-paper">
                Technologie
              </Link>
            </li>
            <li>
              <Link to="/ueber-uns" className="text-stone hover:text-paper">
                Über CUNUMA
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-stone hover:text-paper">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/kontakt" className="text-stone hover:text-paper">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-stone">Rechtliches</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/impressum" className="text-stone hover:text-paper">
                Impressum
              </Link>
            </li>
            <li>
              <Link to="/datenschutz" className="text-stone hover:text-paper">
                Datenschutz
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="text-stone hover:text-paper">
                Checkout-Status
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-stone">
          © {new Date().getFullYear()} CUNUMA. Unternehmensdaten folgen. Kein Online-Zahlungsverkehr.
        </p>
      </div>
    </footer>
  );
}

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem("cunuma-consent")) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      window.localStorage.setItem("cunuma-consent", "essential");
    } catch {
      /* storage unavailable; hide for this view only */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line-soft bg-paper text-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow text-ink-soft">Hinweis</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Diese Website setzt keine Analyse- und keine Werbecookies. Im Browser bleiben nur diese
            Entscheidung und, falls Sie eine anlegen, Ihre Anfrage-Entwürfe. Details stehen in der{" "}
            <Link to="/datenschutz" className="underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
        <button type="button" className="btn btn-dark shrink-0" onClick={accept}>
          Verstanden
        </button>
      </div>
    </div>
  );
}

export function Pending({ children }: { children: string }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span>{children}</span>
      <span className="border border-current px-1.5 py-0.5 text-xs uppercase tracking-wider">
        Platzhalter
      </span>
    </span>
  );
}
