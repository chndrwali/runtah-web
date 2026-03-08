import PageContainer from "@/components/custom/page-container";
import { HistoryClient } from "../components/history/history-client";

export const HistorySection = () => {
  return (
    <PageContainer
      pageTitle="Riwayat Transaksi & Scan"
      pageDescription="Catat pergerakan dan kontribusi pelestarian lingkungan Anda"
      scrollable={false}
    >
      <div className="flex-1 flex flex-col -mx-4 -mb-4 md:-mx-6 md:-mb-6 border-t border-slate-200 dark:border-slate-800">
        <HistoryClient />
      </div>
    </PageContainer>
  );
};
