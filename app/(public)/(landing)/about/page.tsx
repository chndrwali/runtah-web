import { AboutSection } from "@/modules/public/ui/sections/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
};

export default async function Page() {
  return <AboutSection />;
}
