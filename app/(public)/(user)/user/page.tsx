import { DashboardSection } from "@/modules/public/ui/sections/dashboard-section";
import { HydrateClient, trpc, prefetch } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Pantau aktivitas daur ulang, perolehan poin, dan riwayat klasifikasi sampah menggunakan AI di dashboard Robah Anda.",
  openGraph: {
    title: "Dashboard | Robah",
    description:
      "Pantau aktivitas daur ulang, perolehan poin, dan riwayat klasifikasi sampah menggunakan AI di dashboard Robah Anda.",
  },
};

export default async function Page() {
  await Promise.all([
    prefetch(trpc.auth.getDashboardStats.queryOptions()),
    prefetch(
      trpc.history.getRecentActivities.queryOptions({
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
    ),
  ]);
  return (
    <HydrateClient>
      <DashboardSection />
    </HydrateClient>
  );
}
