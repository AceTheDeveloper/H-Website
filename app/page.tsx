import Hero from "@/components/Hero";
import SupportsBand from "@/components/SupportsBand";
import DayTabs from "@/components/DayTabs";
import TeamBand from "@/components/TeamBand";
import VisitBand from "@/components/VisitBand";
import WelcomeAudio from "@/components/WelcomeAudio";

// The hero, what H supports, the story with a click through the day, the
// crew, and where to find us. Dishes and vouchers live on their own pages.
export default function HomePage() {
  return (
    <>
      <WelcomeAudio />
      <Hero />
      <SupportsBand />
      <DayTabs />
      <TeamBand />
      <VisitBand />
    </>
  );
}
