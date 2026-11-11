import Image from "next/image";

export const metadata = {
  title: "Art — Rhea Acharya",
};

const pieces = [
  { id: "arch",     title: "arch",     year: "2025", image: "/art/arch.jpeg" },
  { id: "rug",      title: "rug",      year: "2025", image: "/art/rug.jpeg" },
  { id: "sf1",      title: "sf1",      year: "2024", image: "/art/sf1.jpeg" },
  { id: "lining",   title: "lining",   year: "2024", image: "/art/lining.jpeg" },
  { id: "nyc",      title: "nyc",      year: "2024", image: "/art/nyc.jpeg" },
  { id: "ribcage",  title: "ribcage",  year: "2024", image: "/art/ribcage.jpeg" },
  { id: "shrimp",   title: "shrimp",   year: "2024", image: "/art/shrimp.jpeg" },
  { id: "sunlight", title: "sunlight", year: "2024", image: "/art/sunlight.jpeg" },
  { id: "nz",       title: "nz",       year: "2024", image: "/art/nz.jpeg" },
  { id: "portugal", title: "portugal", year: "2024", image: "/art/portugal.jpeg" },
  { id: "maui",     title: "maui",     year: "2024", image: "/art/maui.png" },
  { id: "olivia",   title: "olivia",   year: "2024", image: "/art/olivia.jpeg" },
];

const palette = [
  { bg: "#fce8ef", text: "#e05080" },
  { bg: "#c8dff0", text: "#0a3055" },
  { bg: "#f5e87a", text: "#0a3055" },
  { bg: "#e05080", text: "#fff" },
  { bg: "#0a3055", text: "#c8dff0" },
];

export default function ArtPage() {
  return (
    <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto" style={{ gridAutoFlow: "row dense" }}>
      {pieces.map((piece, i) => {
        const { bg, text } = palette[i % palette.length];
        return (
          <div
            key={piece.id}
            className="aspect-square relative overflow-hidden flex flex-col justify-end"
            style={{ background: bg }}
          >
            {piece.image && (
              <Image src={piece.image} alt={piece.title} fill className="object-cover" />
            )}
          </div>
        );
      })}
    </div>
  );
}
