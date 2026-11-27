import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { previewPathRewrite } from "@/lib/preview-path-prefix";
import { routeTree } from "./routeTree.gen";

function pagesBasepath() {
  const base = import.meta.env.BASE_URL || "/";
  if (base === "/") return undefined;
  return base.replace(/\/$/, "");
}

export function getRouter() {
  return createRouter({
    routeTree,
    basepath: pagesBasepath(),
    rewrite: previewPathRewrite(),
    defaultErrorComponent: AppErrorComponent,
  });
}
