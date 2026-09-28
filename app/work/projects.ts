export type WorkProject = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  links?: { label: string; href: string }[];
};

export const workProjects: WorkProject[] = [
  {
    slug: "project-one",
    title: "Project One",
    tagline: "A short tagline",
    description: "A short description of what this project is and what it does.",
    role: "Developer",
    year: "2024",
    tags: ["React", "TypeScript"],
    links: [],
  },
  {
    slug: "project-two",
    title: "Project Two",
    tagline: "A short tagline",
    description: "A short description of what this project does.",
    role: "Designer",
    year: "2024",
    tags: ["Figma", "Python"],
    links: [],
  },
  {
    slug: "project-three",
    title: "Project Three",
    tagline: "A short tagline",
    description: "A short description of what this project does.",
    role: "Research",
    year: "2023",
    tags: ["ML", "Python"],
    links: [],
  },
];
