import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Public file URL. `/` in the preview, the repo subpath on GitHub Pages. */
export function asset(path: string) {
  if (!path || /^(https?:|data:|blob:)/.test(path)) return path;
  const base = import.meta.env.BASE_URL || "/";
  const rest = path.startsWith(base) ? path.slice(base.length) : path.replace(/^\//, "");
  return `${base}${rest}`;
}
