import { ScanResultSection } from "@/modules/public/ui/sections/scan-result-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hasil Klasifikasi AI | Robah",
  description: "Hasil scan kategori sampah dari AI",
};

export default function Page({ params }: { params: { id: string } }) {
  return <ScanResultSection id={params.id} />;
}
