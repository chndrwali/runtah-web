import { LandingSection } from "@/modules/public/ui/sections/landing";
import { BackToTop } from "@/components/custom/back-to-top";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robah - Solusi Cerdas Klasifikasi Sampah",
  description:
    "Mulai perjalanan peduli lingkunganmu dengan Robah. Scan sampah dengan AI, kumpulkan poin, dan tukarkan dengan hadiah menarik.",
  openGraph: {
    title: "Robah - Solusi Cerdas Klasifikasi Sampah",
    description:
      "Mulai perjalanan peduli lingkunganmu dengan Robah. Scan sampah dengan AI, kumpulkan poin, dan tukarkan dengan hadiah menarik.",
  },
};

export default async function HomePage() {
  return (
    <>
      <LandingSection />
      <BackToTop targetId="hero" threshold={500} />
    </>
  );
}
