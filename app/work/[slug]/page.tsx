import { notFound } from "next/navigation";
import { workProjects } from "../projects";

export function generateStaticParams() {
  return workProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);
  return { title: project ? `${project.title} — Rhea Acharya` : "Work" };
}

export default async function WorkProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="max-w-lg mx-auto px-6">
      <p className="text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>
        {project.role} · {project.year}
      </p>
      <h1 className="mb-1 leading-snug" style={{ fontFamily: "DaVinci, var(--font-serif)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "var(--foreground)", letterSpacing: "0.02em" }}>
        {project.title}
      </h1>
      {project.tagline && (
        <p className="italic mb-6 text-base" style={{ fontFamily: "DaVinci, var(--font-serif)", fontWeight: 300, fontStyle: "italic", color: "var(--muted)", letterSpacing: "0.03em" }}>
          {project.tagline}
        </p>
      )}

      <hr style={{ borderColor: "var(--border)" }} />

      <div className="mt-8 space-y-5 leading-relaxed text-sm" style={{ fontFamily: "var(--font-sans)", color: "var(--foreground)" }}>
        <p>{project.description}</p>
      </div>

      <div className="mt-10 pt-6 border-t space-y-2" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>
          <span className="uppercase tracking-widest">Role</span> — {project.role}
        </p>
        {project.tags.length > 0 && (
          <p className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>
            <span className="uppercase tracking-widest">Stack</span> — {project.tags.join(", ")}
          </p>
        )}
      </div>

      {project.links?.length ? (
        <div className="mt-6 flex gap-4">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest underline underline-offset-4 hover:opacity-60 transition-opacity"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
