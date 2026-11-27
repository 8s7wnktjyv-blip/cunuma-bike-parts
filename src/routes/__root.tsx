import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { CookieNotice, SiteFooter, SiteHeader } from "@/components/site/shell";
import appCss from "../styles.css?url";

const TITLE = "CUNUMA — Carbon-Laufräder";
const DESCRIPTION =
  "CUNUMA ist eine Premium-Marke für Carbon-Laufräder im Road- und Gravel-Bereich. Anfrage statt erfundenen Maßangaben.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#0c0c0c" },
      { name: "robots", content: "index,follow" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: Root,
  notFoundComponent: NotFound,
});

function Root() {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <SiteHeader />
          <Outlet />
          <SiteFooter />
          <CookieNotice />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main id="inhalt" className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5 py-24">
      <p className="eyebrow text-stone">404</p>
      <h1 className="mt-4 font-display text-5xl">Diese Seite gibt es nicht.</h1>
      <p className="mt-5 max-w-md text-stone">
        Der Pfad führt ins Leere. Zurück zur Linie, oder direkt in die Anfrage.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="btn btn-light">
          Startseite
        </Link>
        <Link to="/road" className="btn btn-line-light">
          Road
        </Link>
      </div>
    </main>
  );
}
