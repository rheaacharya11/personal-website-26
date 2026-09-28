"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer
      className="max-w-6xl mx-auto md:px-8 py-8 mt-16 flex flex-col sm:flex-row justify-between gap-2"
      style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--muted)", borderColor: "var(--border)" }}
    >
      <p>© {new Date().getFullYear()} Rhea Acharya · Made with ♥</p>
      {isHome && (
        <p>Home page design inspired by <a href="https://celine.gdn" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity underline underline-offset-2">Celine Nguyen</a></p>
      )}
    </footer>
  );
}
