export interface Reflection {
  id: string;
  name: string;
  text: string;
  date: string;
  createdAt: string;
}

export const seedReflections: Omit<Reflection, "id" | "createdAt">[] = [
  {
    name: "Anonymous",
    text: "This reminded me of losing my mother. The Reliquary piece — I stood before it for ten minutes.",
    date: "March 2025",
  },
  {
    name: "Anonymous",
    text: "I cried during Reliquary. I've never seen grief represented this way — tender without being sentimental.",
    date: "March 2025",
  },
  {
    name: "Anonymous",
    text: "The Door to Nowhere is exactly how I felt after my divorce. Thank you for making the invisible visible.",
    date: "April 2025",
  },
  {
    name: "Anonymous",
    text: "I've never been to an exhibition that felt like a conversation. This website carries that same intimacy.",
    date: "April 2025",
  },
  {
    name: "Anonymous",
    text: "The Bubble of Home brought me back to my grandmother's kitchen. The smoke, the amber light — I could smell it.",
    date: "May 2025",
  },
];
