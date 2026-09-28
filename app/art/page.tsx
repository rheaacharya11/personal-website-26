import Image from "next/image";
import PageLayout from "@/components/PageLayout";

export const metadata = {
  title: "Art — Rhea Acharya",
};

const pieces: {
  title: string;
  description: string;
  year: string;
  href: string;
  image?: string;
}[] = [
  {
    title: "Piece One",
    description: "A short description of this work.",
    year: "2024",
    href: "#",
  },
  {
    title: "Piece Two",
    description: "A short description of this work.",
    year: "2023",
    href: "#",
  },
];

export default function ArtPage() {
  return (
    <PageLayout title="Art">
    <div className="space-y-16">
      <h2
        className="text-2xl italic"
        style={{ color: "var(--muted)" }}
      >
        art & visual work
      </h2>

      <div className="space-y-14">
        {pieces.map((piece) => (
          <a
            key={piece.title}
            href={piece.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            {piece.image ? (
              <div className="mb-4 w-full aspect-video relative overflow-hidden bg-gray-100">
                <Image
                  src={piece.image}
                  alt={piece.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="mb-4 w-full aspect-video bg-gray-100" />
            )}
            <div>
              <h3 className="uppercase text-base mb-1" style={{ fontFamily: "DaVinci, var(--font-serif)", fontWeight: 300, letterSpacing: "0.02em" }}>
                {piece.title}{" "}
                <span className="inline-block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </h3>
              <p className="text-sm leading-relaxed mb-1">{piece.description}</p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {piece.year}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
    </PageLayout>
  );
}
