import Link from "next/link";
import { workProjects } from "./projects";

export const metadata = {
  title: "Work — Rhea Acharya",
};

export default function WorkPage() {
  return (
    <div className="space-y-14">
      {workProjects.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="group block"
        >
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-lg group-hover:underline underline-offset-4" style={{ fontFamily: "DaVinci, var(--font-serif)", fontWeight: 300, letterSpacing: "0.02em" }}>
              {project.title} <span className="inline-block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
            </h2>
            <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{project.year}</span>
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
            {project.description}
          </p>
          <div className="flex gap-3">
            <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{project.role}</span>
            {project.tags.map(t => (
              <span key={t} className="font-mono text-xs" style={{ color: "var(--muted)" }}>· {t}</span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
