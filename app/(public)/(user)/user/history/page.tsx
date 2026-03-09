import { LIMIT_TABLE } from "@/lib/utils";
import { HistorySection } from "@/modules/public/ui/sections/history-section";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riwayat Transaksi & Scan",
  description:
    "Lihat riwayat lengkap klasifikasi sampah AI dan transaksi poin Anda di Robah.",
  openGraph: {
    title: "Riwayat Transaksi & Scan | Robah",
    description:
      "Lihat riwayat lengkap klasifikasi sampah AI dan transaksi poin Anda di Robah.",
  },
};

export default async function Page() {
  await Promise.all([
    prefetch(trpc.history.getAll.queryOptions({ page: 1, limit: LIMIT_TABLE })),
    prefetch(trpc.history.getStats.queryOptions()),
  ]);

  return (
    <HydrateClient>
      <HistorySection />
    </HydrateClient>
  );
}
