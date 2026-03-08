import { ScanAISection } from "@/modules/public/ui/sections/scan-ai-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scan AI",
  description: "",
};

export default function Page() {
  return <ScanAISection />;
}
