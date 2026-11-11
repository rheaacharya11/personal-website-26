import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { renderMarkdown } from "@/lib/markdown";
import { projects } from "../projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? `${project.title} — Rhea Acharya` : "Research" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const filePath = path.join(process.cwd(), "content/research", `${slug}.md`);
  let contentHtml = "";
  try {
    const raw = await fs.readFile(filePath, "utf8");
    contentHtml = await renderMarkdown(raw);
  } catch {
    // no markdown file yet
  }

  return (
    <div className="max-w-lg mx-auto px-6">
      <h1 className="mb-1 leading-snug" style={{ fontFamily: "DaVinci, var(--font-serif)", fontSize: "1.4rem", fontWeight: 400, fontStyle: "italic", color: "var(--foreground)" }}>
        {project.title}
      </h1>
      <hr className="mb-6" style={{ borderColor: "var(--border)" }} />
      <div
        className="research-body leading-relaxed max-w-none [&_p]:mb-5"
        style={{ fontFamily: "var(--font-source-serif)", fontSize: "0.875rem", color: "var(--foreground)" }}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
