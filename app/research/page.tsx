import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { projects } from "./projects";

export const metadata = {
  title: "Research — Rhea Acharya",
};

export default function ResearchPage() {
  return (
    <PageLayout title="Research">
      <div className="max-w-2xl mx-auto">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/research/${project.slug}`}
            className="group flex items-baseline gap-4 py-5 transition-all"
          >
            <span
              className="shrink-0 text-sm group-hover:bg-[#f5e87a] transition-colors px-0.5"
              style={{ fontFamily: "DaVinci, var(--font-serif)", color: "var(--foreground)", fontWeight: 400, letterSpacing: "0.02em" }}
            >
              {project.title}
            </span>
            <span className="flex-1 border-b border-dashed" style={{ borderColor: "var(--border)", marginBottom: "0.2em" }} />
            <span
              className="shrink-0 text-sm italic group-hover:bg-[#f5e87a] transition-colors px-0.5"
              style={{ fontFamily: "DaVinci, var(--font-serif)", color: "var(--foreground)", letterSpacing: "0.03em" }}
            >
              {project.tagline}
            </span>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
