import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import AboutTeaser from "@/components/AboutTeaser";
import MenuPreview from "@/components/MenuPreview";
import DayRhythm from "@/components/DayRhythm";
import VoucherPromo from "@/components/VoucherPromo";
import LocationTeaser from "@/components/LocationTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <AboutTeaser />
      <MenuPreview />
      <DayRhythm />
      <VoucherPromo />
      <LocationTeaser />
    </>
  );
}
