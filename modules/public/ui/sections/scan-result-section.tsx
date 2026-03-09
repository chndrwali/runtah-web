"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  ScanResultHeader,
  ScanImagePreview,
  ScanDetailCard,
  ScanTipsGrid,
  ScanSuccessModal,
} from "@/modules/public/ui/components/scan-result";

interface ScanResultSectionProps {
  id: string;
  show?: boolean;
}

export function ScanResultSection({ id, show = true }: ScanResultSectionProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const { data: scan, isLoading } = useQuery(
    trpc.trash.getScanById.queryOptions({ id }),
  );

  const [isModalDismissed, setIsModalDismissed] = useState(false);
  const showSuccessModal = scan?.status === "COMPLETED" && !isModalDismissed;

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-[calc(100vh-80px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-slate-500">Memuat hasil...</p>
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
        <p>Data scan tidak ditemukan.</p>
        <Button onClick={() => router.push("/user/ai")} className="mt-4">
          Kembali ke Scanner
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <ScanResultHeader />

      <div className="p-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          <ScanImagePreview
            imageUrl={scan.imageUrl}
            aiCategory={scan.aiCategory}
            createdAt={scan.createdAt}
          />
          <ScanDetailCard
            aiCategory={scan.aiCategory}
            aiAccuracy={scan.aiAccuracy}
            pointsEarned={scan.pointsEarned}
            finalWeight={scan.finalWeight}
          />
        </div>

        <ScanTipsGrid />
      </div>

      {show && (
        <ScanSuccessModal
          open={showSuccessModal}
          onOpenChange={(open) => {
            if (!open) setIsModalDismissed(true);
          }}
          category={scan.aiCategory}
          pointsEarned={
            scan.pointsEarned || Math.floor((scan.finalWeight || 0.1) * 100)
          }
        />
      )}
    </div>
  );
}
