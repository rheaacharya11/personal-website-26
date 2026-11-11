export type TechProject = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  links?: { label: string; href: string }[];
};

export const techProjects: TechProject[] = [
  {
    slug: "swingy-monkey",
    title: "Swingy Monkey",
    tagline: "reinforcement learning-driven agent capable of playing FlappyBird",
    description: "A reinforcement learning-driven agent capable of playing FlappyBird.",
    year: "2024",
    links: [{ label: "github", href: "https://github.com/aannieliu/monkeymonkeygogogo" }],
  },
  {
    slug: "pixel",
    title: "Pixel",
    tagline: "interactive tile-matching game to teach people about color theory",
    description: "An interactive tile-matching game that teaches color theory through play.",
    year: "2024",
    links: [{ label: "play", href: "https://openprocessing.org/sketch/2472588/pc/SucuxV14" }],
  },
  {
    slug: "color-encodings-of-gender",
    title: "Color Encodings of Gender",
    tagline: "data visualization exploring how different news organizations encode gender",
    description: "A data visualization exploring how different news organizations encode gender through color.",
    year: "2024",
    links: [{ label: "view", href: "https://openprocessing.org/sketch/2418751/pc/GwHnWqM7" }],
  },
];
