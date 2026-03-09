import { ScanResultSection } from "@/modules/public/ui/sections/scan-result-section";
import { caller, HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const ai = await caller.trash.getScanById({ id });

    return {
      title: `Detail Transaksi ${ai.aiCategory}`,
      description: `Riwayat klasifikasi sampah ${ai.aiCategory}. Status: ${ai.status}`,
      openGraph: {
        title: `Detail Transaksi ${ai.aiCategory}`,
        description: `Riwayat klasifikasi sampah ${ai.aiCategory}. Status: ${ai.status}`,
        url: `/user/history/${id}`,
        images: ai.imageUrl ? [ai.imageUrl] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `Detail Transaksi ${ai.aiCategory}`,
        description: `Riwayat klasifikasi sampah ${ai.aiCategory}. Status: ${ai.status}`,
        images: ai.imageUrl ? [ai.imageUrl] : [],
      },
      alternates: {
        canonical: `/user/ai/${id}`,
      },
    };
  } catch {
    return {
      title: "Scan Not Found",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  await prefetch(trpc.trash.getScanById.queryOptions({ id }));

  return (
    <HydrateClient>
      <ScanResultSection id={id} show={false} />
    </HydrateClient>
  );
}
