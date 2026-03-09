import { ProfileSection } from "@/modules/public/ui/sections/profile-section";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil User",
  description:
    "Kelola informasi akun, target daur ulang, dan pengaturan profil Robah Anda.",
  openGraph: {
    title: "Profil User | Robah",
    description:
      "Kelola informasi akun, target daur ulang, dan pengaturan profil Robah Anda.",
  },
};

export default async function Page() {
  await prefetch(trpc.auth.getProfile.queryOptions());

  return (
    <HydrateClient>
      <ProfileSection />
    </HydrateClient>
  );
}
