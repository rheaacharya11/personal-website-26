import { workProjects } from "./projects";
import ExpandingGrid from "@/components/ExpandingGrid";
import Link from "next/link";

export const metadata = {
  title: "Work — Rhea Acharya",
};

const palette = [
  { bg: "#c8dff0", text: "#0a3055" }, // blue / navy
  { bg: "#0a3055", text: "#c8dff0" }, // navy / blue
  { bg: "#f5e87a", text: "#0a3055" }, // yellow / navy
  { bg: "#e05080", text: "#fff" },    // pink / white
  { bg: "#fce8ef", text: "#e05080" }, // blush / pink
];

export default function WorkPage() {
  const items = workProjects.map((project, i) => {
    const { bg, text } = palette[i % palette.length];
    return {
    id: project.slug,
    thumbnail: (
      <div
        className="aspect-square flex flex-col justify-between p-3"
        style={{ background: bg }}
      >
        <span className="font-mono text-[10px]" style={{ color: text, opacity: 0.6 }}>
          {String(i + 1).padStart(2, "0")}
        </span>
        <div>
          <p
            className="text-sm md:text-base leading-snug mb-0.5"
            style={{ fontFamily: "DaVinci, var(--font-serif)", fontWeight: 300, color: text }}
          >
            {project.title}
          </p>
          <span className="font-mono text-[10px]" style={{ color: text, opacity: 0.6 }}>
            {project.year}
          </span>
        </div>
      </div>
    ),
    expanded: (
      <div>
        <p className="font-mono text-xs mb-3" style={{ color: "var(--muted)" }}>
          {project.year} · {project.role}
        </p>
        <h2
          className="text-3xl md:text-4xl leading-tight mb-3"
          style={{ fontFamily: "DaVinci, var(--font-serif)", fontWeight: 300 }}
        >
          {project.title}
        </h2>
        <p
          className="text-lg italic mb-6"
          style={{ fontFamily: "DaVinci, var(--font-serif)", fontWeight: 300, color: "var(--muted)" }}
        >
          {project.tagline}
        </p>
        <div className="w-8 border-t border-current mb-6" style={{ color: "var(--border)" }} />
        <p className="leading-relaxed mb-8" style={{ fontSize: "0.9375rem" }}>
          {project.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5"
              style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
            >
              {tag}
            </span>
          ))}
          {project.links && project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs hover:underline underline-offset-4 ml-2"
            >
              {link.label} ↗
            </a>
          ))}
          <Link
            href={`/work/${project.slug}`}
            className="font-mono text-xs hover:underline underline-offset-4 ml-auto"
          >
            full case study →
          </Link>
        </div>
      </div>
    ),
  };});


  return <ExpandingGrid items={items} />;
}
