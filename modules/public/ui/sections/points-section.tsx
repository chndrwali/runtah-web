import PageContainer from "@/components/custom/page-container";
import { PointsClient } from "../components/points/points-client";

export const PointsSection = () => {
  return (
    <PageContainer
      pageTitle="Tukar Poin"
      pageDescription="Tukarkan poin Anda dengan berbagai reward menarik"
      scrollable={true}
    >
      <div className="flex-1 flex flex-col -mx-4 -mb-4 md:-mx-6 md:-mb-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <PointsClient />
      </div>
    </PageContainer>
  );
};
