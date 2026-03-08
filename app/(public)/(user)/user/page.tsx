import { DashboardSection } from "@/modules/public/ui/sections/dashboard-section";
import { HydrateClient } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard manajemen sampah Robah",
};

export default async function Page() {
  return (
    <HydrateClient>
      <DashboardSection />
    </HydrateClient>
  );
}
