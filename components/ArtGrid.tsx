"use client";

import { useState, useEffect } from "react";

export type ArtShape = "square" | "portrait" | "landscape";

type ArtItem = {
  id: string;
  shape: ArtShape;
  thumbnail: React.ReactNode;
  expanded: React.ReactNode;
};

const spanFor = (shape: ArtShape) => ({
  gridColumn: shape === "portrait" ? "span 1" : "span 2",
  gridRow: shape === "landscape" ? "span 1" : "span 2",
});

export default function ArtGrid({ items }: { items: ArtItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenId(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <div
      className="grid grid-cols-3 gap-3 max-w-2xl mx-auto"
      style={{ gridAutoFlow: "row dense" }}
    >
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
            className="block text-left cursor-pointer w-full"
            style={{
              ...(isOpen ? spanFor(item.shape) : { gridColumn: "span 1", gridRow: "span 1" }),
              border: "none",
              background: "none",
              padding: 0,
              outline: "none",
            }}
          >
            {isOpen ? (
              <div className="w-full h-full art-expand">
                {item.expanded}
              </div>
            ) : (
              <div className="w-full aspect-square">
                {item.thumbnail}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
