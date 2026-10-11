import Hero from "@/components/Hero";
import SupportsBand from "@/components/SupportsBand";
import DayTabs from "@/components/DayTabs";
import VisitBand from "@/components/VisitBand";

// The hero, what H supports, the story with a click through the day, and
// where to find us. Dishes and vouchers live on their own pages.
export default function HomePage() {
  return (
    <>
      <Hero />
      <SupportsBand />
      <DayTabs />
      <VisitBand />
    </>
  );
}
