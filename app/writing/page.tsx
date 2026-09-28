import PageLayout from "@/components/PageLayout";

export const metadata = {
  title: "Writing — Rhea Acharya",
};

const pieces: {
  title: string;
  description: string;
  publication: string;
  year: string;
  href: string;
}[] = [];

export default function WritingPage() {
  return (
    <PageLayout title="Writing">
    <div className="space-y-14">
      {pieces.length === 0 ? (
        <p className="italic" style={{ color: "var(--muted)" }}>Writing coming soon.</p>
      ) : (
        pieces.map((piece) => (
          <a
            key={piece.title}
            href={piece.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="flex items-baseline justify-between mb-2">
              <h2 className="text-lg group-hover:underline underline-offset-4" style={{ fontFamily: "DaVinci, var(--font-serif)", fontWeight: 300, letterSpacing: "0.02em" }}>
                {piece.title} <span className="inline-block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </h2>
              <span className="font-mono text-xs ml-4 shrink-0" style={{ color: "var(--muted)" }}>{piece.year}</span>
            </div>
            <p className="text-sm leading-relaxed mb-1" style={{ color: "var(--muted)" }}>
              {piece.description}
            </p>
            <p className="font-mono text-xs" style={{ color: "var(--muted)" }}>{piece.publication}</p>
          </a>
        ))
      )}
    </div>
    </PageLayout>
  );
}
