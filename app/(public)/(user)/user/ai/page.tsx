import { ScanAISection } from "@/modules/public/ui/sections/scan-ai-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scan AI",
  description:
    "Gunakan teknologi AI Robah untuk mengklasifikasi jenis sampah secara instan dan akurat. Dapatkan poin untuk setiap sampah yang berhasil didaur ulang.",
  openGraph: {
    title: "Klasifikasi Scan AI | Robah",
    description:
      "Gunakan teknologi AI Robah untuk mengklasifikasi jenis sampah secara instan dan akurat. Dapatkan poin untuk setiap sampah yang berhasil didaur ulang.",
  },
};

export default function Page() {
  return <ScanAISection />;
}
