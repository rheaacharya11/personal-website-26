"use client";

import { useState, useEffect } from "react";

type GridItem = {
  id: string;
  href?: string;
  thumbnail: React.ReactNode;
  thumbnailCollapsed?: React.ReactNode;
  expanded?: React.ReactNode;
  expandedHeader?: React.ReactNode;
  expandedBody?: React.ReactNode;
};

export default function ExpandingGrid({ items, title }: { items: GridItem[]; title?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openIndex = openId !== null ? items.findIndex((i) => i.id === openId) : -1;
  const isOpen = openIndex >= 0;

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenId(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0">
    {title && !isOpen && (
      <h1
        className="text-xs tracking-widest uppercase font-normal mb-6"
        style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
      >
        {title}
      </h1>
    )}
    <div className="flex gap-10 items-start">
      {/* Grid — snaps to single column when panel is open, hidden on mobile when open */}
      <div
        className={`flex-shrink-0 grid gap-3 justify-items-center research-grid${isOpen ? " hidden md:grid" : ""}`}
        style={{
          gridTemplateColumns: isOpen ? "1fr" : "repeat(3, 1fr)",
          width: isOpen ? "150px" : "100%",
          maxWidth: isOpen ? "150px" : "42rem",
          margin: isOpen ? "0" : "0 auto",
          transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1), margin 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {items.map((item) =>
          item.href ? (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full cursor-pointer aspect-square overflow-hidden hover:opacity-80 transition-opacity"
            >
              {item.thumbnail}
            </a>
          ) : (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className="block text-left w-full cursor-pointer aspect-square overflow-hidden"
              style={{
                outline: openId === item.id ? "2px solid var(--foreground)" : "2px solid transparent",
                outlineOffset: "2px",
                border: "none",
                background: "none",
                padding: 0,
              }}
            >
              {isOpen && item.thumbnailCollapsed ? item.thumbnailCollapsed : item.thumbnail}
            </button>
          )
        )}
      </div>

      {/* Side panel — slides in from right */}
      {isOpen && (
        <div
          className="flex-1 min-w-0 border-l pl-8 side-panel"
          style={{ borderColor: "var(--border)" }}
        >
          <div style={{ maxWidth: "32rem" }}>
            {items[openIndex].expandedHeader ? (
              <>
                {items[openIndex].expandedHeader}
                <div className="flex-1 mb-6 mt-2" style={{ height: "1px", background: "var(--border)" }} />
                {items[openIndex].expandedBody}
              </>
            ) : (
              items[openIndex].expanded
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
