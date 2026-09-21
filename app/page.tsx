import Hero from "@/components/Hero";
import InfoStrip from "@/components/InfoStrip";
import AboutTeaser from "@/components/AboutTeaser";
import MenuPreview from "@/components/MenuPreview";
import DayRhythm from "@/components/DayRhythm";
import VoucherPromo from "@/components/VoucherPromo";
import LocationTeaser from "@/components/LocationTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InfoStrip />
      <AboutTeaser />
      <MenuPreview />
      <DayRhythm />
      <VoucherPromo />
      <LocationTeaser />
    </>
  );
}
