"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { slugifyJudet } from "@/lib/seo";

type County = {
  id: string;
  label: string;
  x: number;
  y: number;
};

// Same coordinate system as RomaniaMap (viewBox -10 -10 720 510)
const counties: County[] = [
  { id: "RO.BI", label: "București", x: 429, y: 404 },
  { id: "RO.AB", label: "Alba", x: 237, y: 233 },
  { id: "RO.AG", label: "Argeș", x: 339, y: 345 },
  { id: "RO.AR", label: "Arad", x: 110, y: 199 },
  { id: "RO.BC", label: "Bacău", x: 481, y: 198 },
  { id: "RO.BH", label: "Bihor", x: 141, y: 127 },
  { id: "RO.BN", label: "Bistrița-Năsăud", x: 319, y: 115 },
  { id: "RO.BR", label: "Brăila", x: 544, y: 333 },
  { id: "RO.BT", label: "Botoșani", x: 481, y: 45 },
  { id: "RO.BV", label: "Brașov", x: 377, y: 263 },
  { id: "RO.BZ", label: "Buzău", x: 478, y: 317 },
  { id: "RO.CJ", label: "Cluj", x: 240, y: 144 },
  { id: "RO.CL", label: "Călărași", x: 509, y: 420 },
  { id: "RO.CS", label: "Caraș-Severin", x: 124, y: 323 },
  { id: "RO.CT", label: "Constanța", x: 582, y: 425 },
  { id: "RO.CV", label: "Covasna", x: 422, y: 248 },
  { id: "RO.DB", label: "Dâmbovița", x: 393, y: 351 },
  { id: "RO.DJ", label: "Dolj", x: 235, y: 423 },
  { id: "RO.GJ", label: "Gorj", x: 213, y: 346 },
  { id: "RO.GL", label: "Galați", x: 553, y: 266 },
  { id: "RO.GR", label: "Giurgiu", x: 420, y: 437 },
  { id: "RO.HD", label: "Hunedoara", x: 199, y: 255 },
  { id: "RO.HR", label: "Harghita", x: 394, y: 174 },
  { id: "RO.IF", label: "Ilfov", x: 435, y: 398 },
  { id: "RO.IL", label: "Ialomița", x: 512, y: 388 },
  { id: "RO.IS", label: "Iași", x: 520, y: 114 },
  { id: "RO.MH", label: "Mehedinți", x: 177, y: 382 },
  { id: "RO.MM", label: "Maramureș", x: 282, y: 60 },
  { id: "RO.MS", label: "Mureș", x: 325, y: 177 },
  { id: "RO.NT", label: "Neamț", x: 458, y: 139 },
  { id: "RO.OT", label: "Olt", x: 299, y: 414 },
  { id: "RO.PH", label: "Prahova", x: 424, y: 333 },
  { id: "RO.SB", label: "Sibiu", x: 297, y: 252 },
  { id: "RO.SJ", label: "Sălaj", x: 221, y: 113 },
  { id: "RO.SM", label: "Satu Mare", x: 204, y: 53 },
  { id: "RO.SV", label: "Suceava", x: 412, y: 80 },
  { id: "RO.TL", label: "Tulcea", x: 636, y: 338 },
  { id: "RO.TM", label: "Timiș", x: 84, y: 260 },
  { id: "RO.TR", label: "Teleorman", x: 359, y: 442 },
  { id: "RO.VL", label: "Vâlcea", x: 279, y: 339 },
  { id: "RO.VN", label: "Vrancea", x: 496, y: 264 },
  { id: "RO.VS", label: "Vaslui", x: 551, y: 189 },
];

function getColor(count: number): string {
  if (count >= 100) return "#e8543e"; // orange-red
  if (count >= 50) return "#f2a93b"; // orange
  if (count >= 20) return "#f0c94a"; // yellow
  return "#7cb96f"; // green
}

function getRadius(count: number): number {
  const base = 4;
  const r = base + Math.sqrt(count) * 0.9;
  return Math.min(r, 15);
}

export function HartaCamine({ counts }: { counts: Record<string, number> }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const bubbles = useMemo(
    () =>
      counties
        .map((c) => ({ ...c, count: counts[c.label] || 0 }))
        .filter((c) => c.count > 0)
        .sort((a, b) => b.count - a.count),
    [counts]
  );

  return (
    <div className="relative w-full aspect-[16/11] max-w-4xl mx-auto">
      <Image
        src="/romania.svg"
        alt="Harta cămine de bătrâni România"
        fill
        className="absolute inset-0 w-full h-full object-contain"
        style={{ filter: "grayscale(0.2) opacity(0.85)" }}
        priority
      />

      <svg
        viewBox="-10 -10 720 510"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        {bubbles.map((c, i) => {
          const r = getRadius(c.count);
          const color = getColor(c.count);
          const isHovered = hovered === c.id;
          return (
            <Link
              key={c.id}
              href={`/judet/${slugifyJudet(c.label)}`}
              aria-label={`${c.count} cămine de bătrâni în ${c.label}`}
            >
              <g
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <motion.circle
                  cx={c.x}
                  cy={c.y}
                  r={r}
                  fill={color}
                  fillOpacity={isHovered ? 0.95 : 0.82}
                  stroke="#ffffff"
                  strokeWidth={2}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: isHovered ? 1.08 : 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.015 }}
                />
                <text
                  x={c.x}
                  y={c.y + r * 0.34}
                  fontSize={Math.max(r * 0.85, 8)}
                  fontWeight={800}
                  fill="#1a2332"
                  textAnchor="middle"
                  style={{ pointerEvents: "none" }}
                >
                  {c.count}
                </text>
                <text
                  x={c.x}
                  y={c.y + r + 8}
                  fontSize={6.5}
                  fontWeight={600}
                  fill="rgba(26, 35, 50, 0.75)"
                  textAnchor="middle"
                  style={{ pointerEvents: "none" }}
                >
                  {c.label}
                </text>
              </g>
            </Link>
          );
        })}
      </svg>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-navy-deep text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg pointer-events-none"
          >
            {counties.find((c) => c.id === hovered)?.label}:{" "}
            {counts[counties.find((c) => c.id === hovered)?.label || ""] || 0} cămine
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
