"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const backHref = pathname.startsWith("/research/") ? "/research" : "/";

  return (
    <header>
      <div className="max-w-6xl mx-auto px-8 pt-10 pb-2 flex items-center justify-between">
        {isHome ? (
          <div className="w-full text-center">
            <Link href="/">
              <span className="text-2xl italic" style={{ fontFamily: "DaVinci, var(--font-serif)", color: "#0a3055", fontWeight: 300, letterSpacing: "0.02em" }}>
                Rhea Acharya
              </span>
            </Link>
          </div>
        ) : (
          <>
            <Link
              href={backHref}
              className="hover:opacity-60 transition-opacity"
              style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", color: "var(--muted)" }}
            >
              ↩ BACK
            </Link>
            <Link href="/">
              <span className="text-2xl italic" style={{ fontFamily: "DaVinci, var(--font-serif)", color: "#0a3055", fontWeight: 300, letterSpacing: "0.02em" }}>
                Rhea Acharya
              </span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
