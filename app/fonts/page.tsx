import {
  Cormorant_Garamond,
  DM_Serif_Display,
  DM_Sans,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Lora,
  Inter,
  Playfair_Display,
  Abril_Fatface,
  Bodoni_Moda,
} from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "600"] });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300", "400"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["300", "400"] });
const lora = Lora({ subsets: ["latin"], weight: ["400", "600"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["900"], style: ["italic"] });
const abril = Abril_Fatface({ subsets: ["latin"], weight: "400" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["900"], style: ["italic"] });

const sampleBody = `I'm a designer, developer, and artist interested in the intersection of technology and creative expression. If any of this catches your eye, let's chat.`;

const options = [
  {
    label: "Option A — Playfair Display Black Italic (bold display, closest to Jenny Wen)",
    name: playfair.className,
    body: inter.className,
    nameStyle: { fontSize: "3rem" },
  },
  {
    label: "Option B — Abril Fatface (chunky, high contrast)",
    name: abril.className,
    body: inter.className,
    nameStyle: { fontSize: "3rem" },
  },
  {
    label: "Option C — Bodoni Moda Black Italic (elegant + bold)",
    name: bodoni.className,
    body: inter.className,
    nameStyle: { fontSize: "3rem" },
  },
  {
    label: "Option D — Cormorant Garamond (refined, editorial serif)",
    name: cormorant.className,
    body: cormorant.className,
    nameStyle: { fontSize: "2.8rem" },
  },
  {
    label: "Option E — DM Serif Display name + DM Sans body",
    name: dmSerif.className,
    body: dmSans.className,
    nameStyle: { fontSize: "2.5rem" },
  },
  {
    label: "Option F — Lora name + Inter body",
    name: lora.className,
    body: inter.className,
    nameStyle: { fontSize: "2.5rem" },
  },
  {
    label: "Option G — All Plus Jakarta Sans (clean sans)",
    name: jakarta.className,
    body: jakarta.className,
    nameStyle: { fontSize: "2.2rem" },
  },
  {
    label: "Option H — All JetBrains Mono (monospace)",
    name: jetbrains.className,
    body: jetbrains.className,
    nameStyle: { fontSize: "2.2rem" },
  },
];

export default function FontsPage() {
  return (
    <div className="space-y-16 text-[#111]">
      <p className="text-xs text-[#999] uppercase tracking-widest">Font preview — delete this page when done</p>
      {options.map((opt) => (
        <div key={opt.label} className="border-t border-gray-100 pt-10">
          <p className="text-xs text-[#999] mb-6">{opt.label}</p>
          <div className="flex flex-col gap-6">
            <div className={opt.name} style={{ lineHeight: 1.05, ...opt.nameStyle }}>
              Rhea<br />Acharya
            </div>
            <nav className={`flex flex-col gap-1 text-sm text-[#999] ${opt.body}`}>
              <span>~ about</span>
              <span>work</span>
              <span>art</span>
            </nav>
            <p className={`text-base leading-relaxed max-w-lg ${opt.body}`}>
              {sampleBody}
            </p>
            <ul className={`text-base leading-relaxed list-disc pl-5 space-y-1 ${opt.body}`}>
              <li>built something interesting here</li>
              <li>worked on something else here</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
