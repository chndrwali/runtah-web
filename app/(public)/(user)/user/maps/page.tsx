import { MapsSection } from "@/modules/public/ui/sections/maps-section";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peta Drop-off",
  description:
    "Cari lokasi titik kumpul dan drop-off sampah daur ulang terdekat di sekitarmu menggunakan Peta Robah.",
  openGraph: {
    title: "Peta Drop-off Sampah | Robah",
    description:
      "Cari lokasi titik kumpul dan drop-off sampah daur ulang terdekat di sekitarmu menggunakan Peta Robah.",
  },
};

export default async function Page() {
  await prefetch(trpc.auth.getCoordinates.queryOptions());
  return (
    <HydrateClient>
      <MapsSection />
    </HydrateClient>
  );
}
