import Hero from "@/components/Hero";
import IntroBand from "@/components/IntroBand";
import { MiddayBand, MorningBand, NightBand } from "@/components/HomeBands";
import VoucherPromo from "@/components/VoucherPromo";
import VisitBand from "@/components/VisitBand";

// The page runs from morning to night: light plaster at the top, ink by the
// time you reach the bar.
export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroBand />
      <MorningBand />
      <MiddayBand />
      <NightBand />
      <VoucherPromo />
      <VisitBand />
    </>
  );
}
