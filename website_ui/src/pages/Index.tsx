import { Users, Sprout, Activity, AlertTriangle } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DiseaseChart } from "@/components/dashboard/DiseaseChart";
import { RecentScans } from "@/components/dashboard/RecentScans";
import { FarmersTable } from "@/components/dashboard/FarmersTable";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your potato plantations and disease detection
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Farmers"
            value={127}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Active Plantations"
            value={348}
            icon={Sprout}
            trend={{ value: 8, isPositive: true }}
            variant="success"
          />
          <StatsCard
            title="Scans Today"
            value={220}
            icon={Activity}
            trend={{ value: 23, isPositive: true }}
          />
          <StatsCard
            title="Critical Alerts"
            value={21}
            icon={AlertTriangle}
            trend={{ value: -15, isPositive: false }}
            variant="destructive"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DiseaseChart />
          <RecentScans />
        </div>

        <div className="grid gap-4">
          <FarmersTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
