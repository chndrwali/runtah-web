import { ProfileSection } from "@/modules/public/ui/sections/profile-section";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil User",
};

export default async function Page() {
  await prefetch(trpc.auth.getProfile.queryOptions());

  return (
    <HydrateClient>
      <ProfileSection />
    </HydrateClient>
  );
}
