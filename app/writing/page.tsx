import WritingList from "@/components/WritingList";

export const metadata = {
  title: "Writing — Rhea Acharya",
};

const sections = [
  {
    heading: "Personal Writing",
    color: "#0a3055",
    pieces: [
      { title: "An Inhabitable Archive", href: "https://www.thecrimson.com/article/2025/3/13/eliot-tunnels-endpaper/", date: "Mar 2025" },
      { title: "Rounding a Corner", href: "https://substack.com/home/post/p-154116167?source=queue&autoPlay=false", date: "Feb 2025" },
    ],
  },
  {
    heading: "Journalism",
    color: "#e05080",
    pieces: [
      { title: "Crimson Profile", href: "https://www.thecrimson.com/writer/1217337/Rhea_L._Acharya/", date: "2021–25" },
      { title: "HiLite Profile", href: "https://hilite.org/staff_name/rhea-acharya/", date: "2019–21" },
    ],
  },
];

export default function WritingPage() {
  return (
    <div className="max-w-3xl mx-auto px-8">
      {sections.length === 0 ? (
        <p className="italic" style={{ color: "var(--muted)" }}>Writing coming soon.</p>
      ) : (
        <WritingList sections={sections} />
      )}
    </div>
  );
}
