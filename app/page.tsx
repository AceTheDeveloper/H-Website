import Hero from "@/components/Hero";
import DayTabs from "@/components/DayTabs";
import VisitBand from "@/components/VisitBand";

// Three screens at most: the hero, the story with a click through the day,
// and where to find us. Dishes and vouchers live on their own pages.
export default function HomePage() {
  return (
    <>
      <Hero />
      <DayTabs />
      <VisitBand />
    </>
  );
}
