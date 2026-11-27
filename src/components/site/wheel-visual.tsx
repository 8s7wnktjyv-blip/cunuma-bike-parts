import type { Finish, RimHeight, SpokeCount } from "@/lib/inquiry-store";

const depthFor: Record<RimHeight, number> = {
  35: 16,
  45: 26,
  55: 36,
  65: 46,
};

export function WheelVisual({
  rimHeight,
  spokes,
  finish,
  id,
}: {
  rimHeight: RimHeight;
  spokes: SpokeCount;
  finish: Finish;
  id: string;
}) {
  const depth = depthFor[rimHeight];
  const outer = 168;
  const inner = outer - depth;
  const mid = (outer + inner) / 2;
  const lines = Array.from({ length: spokes }, (_, index) => {
    const angle = (Math.PI * 2 * index) / spokes - Math.PI / 2;
    return {
      x: 200 + Math.cos(angle) * (inner - 8),
      y: 200 + Math.sin(angle) * (inner - 8),
    };
  });
  const rimFill = finish === "gloss" ? `url(#${id}-gloss)` : finish === "weave" ? `url(#${id}-weave)` : "currentColor";

  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Schematisches Laufrad. Keine maßhaltige Zeichnung und keine bestätigte Spezifikation."
      className="h-auto w-full text-paper"
    >
      <defs>
        <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="0.48" stopColor="currentColor" stopOpacity="1" />
          <stop offset="0.62" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.9" />
        </linearGradient>
        <pattern
          id={`${id}-weave`}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(32)"
        >
          <rect width="7" height="7" fill="currentColor" />
          <line x1="0" y1="0" x2="0" y2="7" stroke="#0c0c0c" strokeWidth="1.4" opacity="0.45" />
        </pattern>
      </defs>
      <circle cx="200" cy="200" r="186" fill="none" stroke="currentColor" strokeWidth="11" opacity="0.88" />
      <g className="spin-slow">
        <circle
          cx="200"
          cy="200"
          r={mid}
          fill="none"
          stroke={rimFill}
          strokeWidth={depth}
          opacity={finish === "matte" ? 0.92 : 1}
        />
        {lines.map((line, index) => (
          <line
            key={index}
            x1="200"
            y1="200"
            x2={line.x}
            y2={line.y}
            stroke="currentColor"
            strokeWidth="0.7"
            opacity="0.8"
          />
        ))}
        <circle cx="200" cy="200" r="46" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
        <circle cx="200" cy="200" r="15" fill="currentColor" />
        <circle cx="200" cy="200" r="5" fill="#0c0c0c" />
      </g>
    </svg>
  );
}
