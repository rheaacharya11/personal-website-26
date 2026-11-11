import Image from "next/image";
import ArtGrid, { ArtShape } from "@/components/ArtGrid";

export const metadata = {
  title: "Art — Rhea Acharya",
};

const pieces: {
  id: string;
  title: string;
  description: string;
  year: string;
  medium?: string;
  shape: ArtShape;
  href: string;
  image?: string;
}[] = [
  { id: "untitled-i",    title: "Untitled I",    description: "Add description.", year: "2025", medium: "Oil on canvas", shape: "landscape", href: "#", image: "/art/arch.jpeg" },
  { id: "untitled-ii",   title: "Untitled II",   description: "Add description.", year: "2025", medium: "Watercolor",    shape: "portrait",  href: "#", image: "/art/rug.jpeg" },
  { id: "untitled-iii",  title: "Untitled III",  description: "Add description.", year: "2024", medium: "Charcoal",      shape: "square",    href: "#", image: "/art/sf.jpeg" },
  { id: "untitled-iv",   title: "Untitled IV",   description: "Add description.", year: "2024", medium: "Digital",       shape: "portrait",  href: "#", image: "/art/sf1.jpeg" },
  { id: "untitled-v",    title: "Untitled V",    description: "Add description.", year: "2024", medium: "Ink",           shape: "landscape", href: "#" },
  { id: "untitled-vi",   title: "Untitled VI",   description: "Add description.", year: "2023", medium: "Gouache",       shape: "square",    href: "#" },
  { id: "untitled-vii",  title: "Untitled VII",  description: "Add description.", year: "2023", medium: "Acrylic",       shape: "portrait",  href: "#" },
  { id: "untitled-viii", title: "Untitled VIII", description: "Add description.", year: "2022", medium: "Pencil",        shape: "landscape", href: "#" },
  { id: "untitled-ix",   title: "Untitled IX",   description: "Add description.", year: "2022", medium: "Mixed media",   shape: "square",    href: "#" },
];

const palette = [
  { bg: "#fce8ef", text: "#e05080" },
  { bg: "#c8dff0", text: "#0a3055" },
  { bg: "#f5e87a", text: "#0a3055" },
  { bg: "#e05080", text: "#fff" },
  { bg: "#0a3055", text: "#c8dff0" },
];

function ExpandedContent({ piece, bg, text }: { piece: typeof pieces[0]; bg: string; text: string }) {
  const info = (
    <div className="flex flex-col justify-between p-4 h-full" style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
      <div>
        <h2
          className="text-base leading-snug mb-1"
          style={{ fontFamily: "DaVinci, var(--font-serif)", fontWeight: 300 }}
        >
          {piece.title}
        </h2>
        <p className="font-mono text-xs mb-3" style={{ color: "var(--muted)" }}>{piece.year}</p>
        <p className="text-xs leading-relaxed" style={{ color: "var(--foreground)" }}>{piece.description}</p>
      </div>
      <div>
        {piece.medium && (
          <p className="font-mono text-[10px] uppercase tracking-widest mb-1 mt-3" style={{ color: "var(--muted)" }}>
            {piece.medium}
          </p>
        )}
        {piece.href !== "#" && (
          <a href={piece.href} target="_blank" rel="noopener noreferrer" className="font-mono text-xs hover:underline underline-offset-4">
            view ↗
          </a>
        )}
      </div>
    </div>
  );

  const image = (
    <div className="relative w-full h-full" style={{ background: bg }}>
      {piece.image && <Image src={piece.image} alt={piece.title} fill className="object-cover" />}
    </div>
  );

  if (piece.shape === "portrait") {
    // Tall: image top, info bottom
    return (
      <div className="w-full h-full grid grid-rows-2">
        {image}
        {info}
      </div>
    );
  }

  if (piece.shape === "landscape") {
    // Wide: image left, info right
    return (
      <div className="w-full h-full grid grid-cols-2">
        {image}
        {info}
      </div>
    );
  }

  // Square (2×2): image top-left + top-right, info spans bottom
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-2">
      <div className="col-span-2 relative" style={{ background: bg }}>
        {piece.image && <Image src={piece.image} alt={piece.title} fill className="object-cover" />}
      </div>
      <div className="col-span-2">
        {info}
      </div>
    </div>
  );
}

export default function ArtPage() {
  const items = pieces.map((piece, i) => {
    const { bg, text } = palette[i % palette.length];
    return {
      id: piece.id,
      shape: piece.shape,
      thumbnail: (
        <div className="aspect-square relative overflow-hidden flex flex-col justify-end" style={{ background: bg }}>
          {piece.image && <Image src={piece.image} alt={piece.title} fill className="object-cover" />}
          <div className="relative z-10 px-3 py-2" style={{ background: piece.image ? "rgba(0,0,0,0.3)" : "transparent" }}>
            <p className="text-sm leading-snug truncate" style={{ fontFamily: "DaVinci, var(--font-serif)", fontWeight: 300, color: piece.image ? "#fff" : text }}>
              {piece.title}
            </p>
            <p className="font-mono text-xs" style={{ color: piece.image ? "rgba(255,255,255,0.7)" : text, opacity: piece.image ? 1 : 0.6 }}>
              {piece.year}
            </p>
          </div>
        </div>
      ),
      expanded: <ExpandedContent piece={piece} bg={bg} text={text} />,
    };
  });

  return <ArtGrid items={items} />;
}
