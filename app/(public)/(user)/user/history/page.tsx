import { HistorySection } from "@/modules/public/ui/sections/history-section";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riwayat Transaksi & Scan",
};

export default async function Page() {
  await prefetch(trpc.history.getAll.queryOptions({ page: 1, limit: 10 }));

  return (
    <HydrateClient>
      <HistorySection />
    </HydrateClient>
  );
}
