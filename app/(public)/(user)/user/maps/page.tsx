import { MapsSection } from "@/modules/public/ui/sections/maps-section";
import { HydrateClient, prefetch } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peta Drop-off",
};

export default async function Page() {
  await prefetch;
  return (
    <HydrateClient>
      <MapsSection />
    </HydrateClient>
  );
}
