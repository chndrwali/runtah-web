import { DashboardStats } from "@/modules/public/ui/components/dashboard/dashboard-stats";
import { DashboardCTA } from "@/modules/public/ui/components/dashboard/dashboard-cta";
import { DashboardActivity } from "@/modules/public/ui/components/dashboard/dashboard-activity";

export const DashboardSection = () => {
  return (
    <section className="flex flex-1 flex-col space-y-4 p-4 md:px-6">
      <DashboardStats />
      <DashboardCTA />
      <DashboardActivity />
    </section>
  );
};
