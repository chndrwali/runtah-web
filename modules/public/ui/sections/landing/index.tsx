import { FeaturesSection } from "./features-section";
import { HeroSection } from "./hero-section";
import { HowItWorkSection } from "./how-it-work-section";
import { TrashTypesSection } from "./trash-types-section";

export const LandingSection = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorkSection />
      <TrashTypesSection />
    </>
  );
};
