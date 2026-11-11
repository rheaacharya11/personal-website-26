"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "about" },
  { href: "/work", label: "work" },
  { href: "/art", label: "art" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-36 flex-shrink-0 pt-12 md:pt-16 pb-4 md:pb-0 px-6 md:px-0 font-mono">
      <nav>
        <ul className="flex flex-row md:flex-col gap-4 md:gap-1.5">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm"
                  style={{ color: isActive ? "var(--foreground)" : "var(--muted)" }}
                >
                  {isActive ? `~ ${label}` : label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
