const blue = "#c8dff0";
const navy = "#0a3055";

export default function PageLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div>
      {/* Horizontal color block */}
      <div
        className="mb-10 py-4 text-center"
        style={{ background: blue }}
      >
        <span
          className="text-xs font-bold tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-sans)", color: navy }}
        >
          {title}
        </span>
      </div>

      {/* Page content */}
      <div>{children}</div>
    </div>
  );
}
