import { BackToTop } from "@/components/custom/back-to-top";
import { AboutSection } from "@/modules/public/ui/sections/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Pelajari lebih lanjut tentang misi Robah dalam mewujudkan pengelolaan sampah yang lebih baik melalui teknologi AI yang inovatif.",
  openGraph: {
    title: "Tentang Kami | Robah",
    description:
      "Pelajari lebih lanjut tentang misi Robah dalam mewujudkan pengelolaan sampah yang lebih baik melalui teknologi AI yang inovatif.",
  },
};

export default async function Page() {
  return (
    <>
      <AboutSection />
      <BackToTop targetId="about" threshold={500} />
    </>
  );
}
