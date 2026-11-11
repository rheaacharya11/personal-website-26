"use client";

import { useState } from "react";

type Piece = { title: string; href: string; date: string };
type Section = { heading: string; color: string; pieces: Piece[] };

const highlightStyle = {
  background: "linear-gradient(to bottom, transparent 50%, #f5e87a 50%, #f5e87a 80%, transparent 80%)",
};

export default function WritingList({ sections }: { sections: Section[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-10">
      {sections.map((section) => (
        <div key={section.heading}>
          <span
            className="text-xs tracking-widest uppercase font-normal block mb-2 -ml-4 md:-ml-6"
            style={{ fontFamily: "var(--font-sans)", color: section.color }}
          >
            {section.heading}
          </span>
          {section.pieces.map((piece, i) => {
            const key = `${section.heading}-${i}`;
            return (
              <a
                key={i}
                href={piece.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-baseline justify-between py-1.5 mx-[-0.5rem] px-[0.5rem]"
                style={{
                  fontFamily: "DaVinci, var(--font-serif)",
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                  fontSize: "1.05rem",
                  ...(hovered === key ? highlightStyle : {}),
                }}
                onMouseEnter={() => setHovered(key)}
                onMouseLeave={() => setHovered(null)}
              >
                <span>{piece.title}</span>
                <span className="flex-1 mx-3 border-b border-dotted border-current opacity-30" style={{ marginBottom: "0.25em" }} />
                <span className="text-xs shrink-0" style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>{piece.date}</span>
              </a>
            );
          })}
        </div>
      ))}
    </div>
  );
}
