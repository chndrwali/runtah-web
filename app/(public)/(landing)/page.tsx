import { Metadata } from "next";
import { LandingSection } from "@/modules/public/ui/sections/landing";

export const metadata: Metadata = {
  title: "Runtah - Bandung Bersih, Mulai dari Genggamanmu",
  description:
    "Wujudkan kota yang lebih hijau dengan klasifikasi sampah berbasis AI.",
};

export default async function HomePage() {
  return <LandingSection />;
}
