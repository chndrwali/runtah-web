import { HydrateClient, prefetch } from "@/trpc/server";
import { PointsSection } from "@/modules/public/ui/sections/points-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redeem Point",
};

export default async function Page() {
  await prefetch;

  return (
    <HydrateClient>
      <PointsSection />
    </HydrateClient>
  );
}
