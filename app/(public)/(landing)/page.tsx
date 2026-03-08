import { LandingSection } from "@/modules/public/ui/sections/landing";
import { BackToTop } from "@/components/custom/back-to-top";

export default async function HomePage() {
  return (
    <>
      <LandingSection />
      <BackToTop targetId="hero" threshold={500} />
    </>
  );
}
