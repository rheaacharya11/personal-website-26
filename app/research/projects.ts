export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  venue: string;
  year: string;
  advisors?: string[];
  collaborators?: string[];
  status?: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "multi-persona-oracles",
    title: "Multi-Persona Oracles for Fair Classification",
    tagline: "senior thesis",
    description: "Supervised by Ariel Procaccia & ",
    venue: "Harvard University",
    year: "2025",
    advisors: ["Ariel Procaccia"],
    status: "Completed",
    links: [],
  },
   {
    slug: "transitivity",
    title: "Transitivity of Ambiguous Preferences ",
    tagline: "graph theory preference modeling for LLMs",
    description: "Investigating conformity bias in large language models and its implications for AI safety.",
    venue: "Harvard University",
    year: "2024",
    status: "Finished",
    links: [],
  },
  {
    slug: "uber-stable",
    title: "UberStable",
    tagline: "simulating driver-optimized matching algorithms",
    description: "Studying how iconography affects user comprehension and trust in AI-powered interfaces.",
    venue: "Harvard University",
    year: "2023",
    status: "In progress",
    links: [],
  },
  {
    slug: "rule-following-under-pressure",
    title: "Rule-Following Under Pressure in LLM Agents",
    tagline: "can agents convince each other to break the rules?",
    description: "LLM agents break a stated network policy far more often when acting through code than through a named tool, and operator personas and peer-agent testimony shift violation rates, in directions that differ across models.",
    venue: "NAACL",
    year: "2026",
    collaborators: ["Jessica Chen"],
    status: "Under review",
    links: [],
  },
  {
    slug: "predicting-recidivism",
    title: "Predicting Recidivism",
    tagline: "markov modeling & mental health",
    description: "",
    venue: "",
    year: "2022",
    links: [{ label: "pdf", href: "/predicting-recidivism.pdf" }],
  },
  {
    slug: "fake-it",
    title: "Fake It Till You Make It",
    tagline: "gendered effects of confidence in early education",
    description: "Investigating conformity bias in large language models and its implications for AI safety.",
    venue: "Harvard University",
    year: "2025",
    status: "In progress",
    links: [],
  },
];
