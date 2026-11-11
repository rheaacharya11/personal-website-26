import { projects } from "./projects";
import { techProjects } from "./tech-projects";
import ExpandingGrid from "@/components/ExpandingGrid";
import { promises as fs } from "fs";
import path from "path";
import { renderMarkdown } from "@/lib/markdown";

export const metadata = {
  title: "Research & Tech — Rhea Acharya",
};

const techPalette = [
  { bg: "#e05080", text: "#fff" },
  { bg: "#c8dff0", text: "#0a3055" },
  { bg: "#f5e87a", text: "#0a3055" },
];

const palette = [
  { bg: "#0a3055", text: "#c8dff0" },
  { bg: "#c8dff0", text: "#0a3055" },
  { bg: "#fce8ef", text: "#e05080" },
  { bg: "#f5e87a", text: "#0a3055", accentBg: "#f0e9b5", accentText: "#0a3055" },
  { bg: "#e05080", text: "#fff",    accentBg: "#f2bfcc", accentText: "#111111" },
];

export default async function ResearchPage() {
  const items = await Promise.all(
    projects.map(async (project, i) => {
      const { bg, text, accentBg, accentText } = palette[i % palette.length] as typeof palette[0] & { accentBg?: string; accentText?: string };

      const filePath = path.join(process.cwd(), "content/research", `${project.slug}.md`);
      let contentHtml = "";
      try {
        const raw = await fs.readFile(filePath, "utf8");
        contentHtml = await renderMarkdown(raw);
      } catch {
        // no markdown file yet
      }

      return {
        id: project.slug,
        thumbnail: (
          <div
            key={project.slug + "-thumb"}
            className="aspect-square flex flex-col justify-between p-3"
            style={{ background: bg }}
          >
            <span className="font-mono text-xs" style={{ color: text, opacity: 0.6 }}>
              {project.year}
            </span>
            <div>
              <p
                className="text-sm md:text-base leading-snug mb-1"
                style={{ fontFamily: "DaVinci, var(--font-serif)", fontWeight: 300, color: text }}
              >
                {project.title}
              </p>
              <p
                className="font-mono text-[10px] leading-tight"
                style={{ color: text, opacity: 0.6 }}
              >
                {project.tagline}
              </p>
            </div>
          </div>
        ),
        thumbnailCollapsed: (
          <div
            key={project.slug + "-thumb-collapsed"}
            className="aspect-square flex flex-col justify-between p-2"
            style={{ background: bg }}
          >
            <span className="font-mono text-[9px]" style={{ color: text, opacity: 0.5 }}>
              {project.year}
            </span>
            <p
              className="text-sm leading-tight"
              style={{ fontFamily: "DaVinci, var(--font-serif)", fontWeight: 300, color: text }}
            >
              {project.title}
            </p>
          </div>
        ),
        expandedHeader: (
          <h1
            key={project.slug + "-header"}
            className="mb-1 leading-snug"
            style={{
              fontFamily: "DaVinci, var(--font-serif)",
              fontSize: "1.1rem",
              fontWeight: 300,
              fontStyle: "normal",
              color: "var(--foreground)",
            }}
          >
            {project.title}
          </h1>
        ),
        expandedBody: (
          <div key={project.slug + "-body"} style={{ "--article-accent-bg": accentBg ?? bg, "--article-accent-text": accentText ?? text } as React.CSSProperties}>
            {contentHtml ? (
              <div
                className="research-body leading-relaxed [&_p]:mb-5"
                style={{
                  fontFamily: "var(--font-dm), sans-serif",
                  fontSize: "0.875rem",
                  color: "var(--foreground)",
                }}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            ) : (
              <div style={{ fontFamily: "var(--font-source-serif)", fontSize: "0.875rem", color: "var(--muted)" }}>
                <p className="mb-4 italic">{project.tagline}</p>
                <p className="mb-4">{project.description}</p>
                {project.advisors && project.advisors.length > 0 && (
                  <p className="font-mono text-xs mt-6" style={{ color: "var(--muted)" }}>
                    Advised by {project.advisors.join(", ")}
                  </p>
                )}
                <p className="font-mono text-xs mt-2" style={{ color: "var(--muted)" }}>
                  {project.venue} · {project.year}
                  {project.status && ` · ${project.status}`}
                </p>
              </div>
            )}
          </div>
        ),
      };
    })
  );

  return (
    <>
      <ExpandingGrid items={items} title="Research" />
      <div className="max-w-3xl mx-auto px-4 md:px-0 mt-16">
        <h1
          className="text-xs tracking-widest uppercase font-normal mb-6"
          style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
        >
          Tech
        </h1>
        <div className="grid grid-cols-3 gap-3 mx-auto" style={{ maxWidth: "42rem" }}>
          {techProjects.map((project, i) => {
            const { bg, text } = techPalette[i % techPalette.length];
            const href = project.links?.[0]?.href;
            return (
              <a
                key={project.slug}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square flex flex-col justify-between p-3 hover:opacity-80 transition-opacity"
                style={{ background: bg, display: "flex" }}
              >
                <span className="font-mono text-xs" style={{ color: text, opacity: 0.6 }}>
                  {project.year}
                </span>
                <div>
                  <p
                    className="text-sm md:text-base leading-snug mb-1"
                    style={{ fontFamily: "DaVinci, var(--font-serif)", fontWeight: 300, color: text }}
                  >
                    {project.title}
                  </p>
                  <p className="font-mono text-[10px] leading-tight" style={{ color: text, opacity: 0.6 }}>
                    {project.tagline}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
