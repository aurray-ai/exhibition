"use client";

import Hero from "@/components/home/Hero";
import Introduction from "@/components/home/Introduction";
import ExhibitionHall from "@/components/home/ExhibitionHall";

export default function Home() {
  const handleEnter = () => {
    const intro = document.getElementById("introduction");
    if (intro) {
      intro.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Hero onEnter={handleEnter} />
      <Introduction />
      <ExhibitionHall />
    </>
  );
}
