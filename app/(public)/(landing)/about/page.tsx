import { BackToTop } from "@/components/custom/back-to-top";
import { AboutSection } from "@/modules/public/ui/sections/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
};

export default async function Page() {
  return (
    <>
      <AboutSection />
      <BackToTop targetId="about" threshold={500} />
    </>
  );
}
