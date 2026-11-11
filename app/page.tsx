
const socialLinks = [
  { label: "linkedin", href: "https://linkedin.com/in/rhea-acharya" },
  { label: "github", href: "https://github.com/rheaacharya11" },
  { label: "goodreads", href: "https://www.goodreads.com/crheativity" },
];

const excited = [
  "data modeling & visualization",
  "machine learning research",
  "architectural design",
  "economics theory",
  "existential philosophy",
  "creative nonfiction",
  "differential privacy",
  "urban planning & smart cities",
  "algorithmic fairness",
  "women in tech",
  "game theory"
];

const navy   = "#0a3055";
const blue   = "#c8dff0";
const pink   = "#e05080";
const yellow = "#f5e87a";

const highlight = {
  background: yellow,
  color: navy,
  padding: "1px 4px",
  display: "inline" as const,
};

export default function AboutPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[55%_45%]">

      {/* Blue intro block — col 1 row 1 on desktop, first on mobile */}
      <section
        className="w-[85%] md:w-full p-8 md:p-16 flex flex-col relative min-h-[360px] md:min-h-[500px]"
        style={{ color: navy }}
      >
        <div
          className="absolute inset-0 -z-10"
          style={{ background: blue }}
        />
        <p style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", lineHeight: 1.3, fontFamily: "DaVinci, var(--font-serif)", fontWeight: 300, letterSpacing: "0.02em" }}>
          With data and design, I make meaning of the world around us. By building products & writing stories, I imagine new ones. Welcome to my studio!
        </p>
        <div className="flex-1" />
        <nav className="flex flex-col gap-4" style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em" }}>
          <a href="/research" className="uppercase hover:opacity-60 transition-opacity">Research & Tech {">>>"}</a>
          <a href="/writing" className="uppercase hover:opacity-60 transition-opacity">Writing {">>>"}</a>
          <a href="/art" className="uppercase hover:opacity-60 transition-opacity">Art {">>>"}</a>
        </nav>
        <div className="flex-1" />
      </section>

      {/* Pink excited block — col-span-2 row 2 on desktop, between blue and CV on mobile */}
      <section
        className="-mt-16 p-8 text-left md:col-span-2 md:row-start-2 order-2 md:order-none w-[85%] ml-auto md:w-[70%] md:ml-[20%]"
        style={{
          background: pink,
          color: "#fff",
          mixBlendMode: "multiply",
        }}
      >
        <h2 className="text-xs tracking-widest uppercase mb-6 opacity-70" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
          CHAT WITH ME ABOUT
        </h2>
        <p className="leading-loose" style={{ fontFamily: "DaVinci, var(--font-serif)", fontWeight: 300, fontSize: "1.05rem", letterSpacing: "0.02em" }}>
          {excited.map((item, i) => (
            <span key={item}>
              <span className={i % 2 === 0 ? "font-medium uppercase text-sm tracking-wider" : "italic"}>
                {item}
              </span>
              {i < excited.length - 1 && (
                <span className="mx-2 opacity-50" style={{ fontFamily: "var(--font-serif)" }}>/</span>
              )}
            </span>
          ))}
        </p>
        <div className="mt-6 pt-6 border-t border-white/20 flex flex-wrap gap-x-6 gap-y-3 items-baseline" style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", letterSpacing: "0.08em" }}>
          <p className="uppercase opacity-70 font-semibold text-xs">Contact</p>
          <p className="font-medium">rhealacharya@gmail.com</p>
          <div className="flex gap-4 ml-auto">
            {socialLinks.map(({ label, href }, i) => (
              <span key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="uppercase opacity-80 hover:opacity-100 transition-opacity font-semibold text-xs tracking-widest">{label}</a>
                {i < socialLinks.length - 1 && <span className="ml-4 opacity-30">✦</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CV block — col 2 row 1 on desktop, last on mobile */}
      <section
        className="px-8 pt-6 pb-24 flex flex-col gap-8 order-last md:order-none md:row-start-1 md:col-start-2"
        style={{ color: navy }}
      >
        <div>
          <h2 className="text-xs tracking-widest uppercase mb-2 font-bold" style={{ fontFamily: "var(--font-sans)", color: "#0a3055" }}>
            <span style={highlight}>This year</span>
          </h2>
          <p className="leading-relaxed" style={{ fontFamily: "var(--font-source-serif)", fontSize: "0.875rem", color: "#3a6080" }}>
            Designing voice agents for healthcare & finance. HCI research on icons in AI <a href="https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity">interfaces</a>. Thinking about how to leverage statistics & the right data to create more representative world models for subjective use cases. AI safety research on conformity. Urging Congress to pass <a href="https://www.palantir.com/assets/xrfr7uokpv1b/1k59iN7rZtJhlRdsiloZgM/0148802926d620cb5f699800d8b37f2f/Protecting_American_Privacy_The_Urgent_Need_for_Congress_to_Act_Final.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity">better data protection laws</a> w/ Palantir Privacy team. Ran Jersey City Half Marathon.
          </p>
        </div>
        <div>
          <h2 className="text-xs tracking-widest uppercase mb-2 font-bold" style={{ fontFamily: "var(--font-sans)", color: "#0a3055" }}>
            <span style={highlight}>Past Lives</span>
          </h2>
          <p className="leading-relaxed" style={{ fontFamily: "var(--font-source-serif)", fontSize: "0.875rem", color: "#3a6080" }}>
            Studied math & computer science at Harvard <time className="text-xs font-medium tracking-wider" style={{ fontFamily: "var(--font-sans)", color: "#0a3055" }}>2021-25</time>.
            Quant Trader @ Virtu Financial <time className="text-xs font-medium tracking-wider" style={{ fontFamily: "var(--font-sans)", color: "#0a3055" }}>2023-24</time>.{" "}
            <a href="https://www.hbs.edu/mba/academic-experience/joint-degree-programs/undergraduate-technology-innovation-fellows-program/profiles/rhea-acharya" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity">Roberts Family Tech Innovation Fellow</a> <time className="text-xs font-medium tracking-wider" style={{ fontFamily: "var(--font-sans)", color: "#0a3055" }}>2024</time>.{" "}
            President of <a href="https://www.wecodeconference.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity">Harvard WECode</a> <time className="text-xs font-medium tracking-wider" style={{ fontFamily: "var(--font-sans)", color: "#0a3055" }}>2024</time>.
            Eliot House Stein Chair <time className="text-xs font-medium tracking-wider" style={{ fontFamily: "var(--font-sans)", color: "#0a3055" }}>2023-24</time>.{" "}
            Editor in Chief for HiLite newsmagazine <time className="text-xs font-medium tracking-wider" style={{ fontFamily: "var(--font-sans)", color: "#0a3055" }}>2021</time>.
            Math Prize for Girls Medalist <time className="text-xs font-medium tracking-wider" style={{ fontFamily: "var(--font-sans)", color: "#0a3055" }}>2018</time>.{" "}
          </p>
        </div>
      </section>

    </div>
  );
}
