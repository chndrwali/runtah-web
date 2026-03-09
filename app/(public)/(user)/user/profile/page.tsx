import { ProfileSection } from "@/modules/public/ui/sections/profile-section";
import { HydrateClient, prefetch } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil User",
};

export default async function Page() {
  await prefetch;

  return (
    <HydrateClient>
      <ProfileSection />
    </HydrateClient>
  );
}
