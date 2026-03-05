import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { ViewDiseaseDetailsModal } from "@/components/modals/ViewDiseaseDetailsModal";

interface DiseaseDetection {
  id: number;
  type: string;
  plantation: string;
  farmer: string;
  severity: string;
  detectedAt: string;
  confidence: number;
  recommendations?: string[];
}

const weeklyData = [
  { day: "Mon", healthy: 45, earlyBlight: 8, lateBlight: 3 },
  { day: "Tue", healthy: 52, earlyBlight: 6, lateBlight: 2 },
  { day: "Wed", healthy: 48, earlyBlight: 10, lateBlight: 4 },
  { day: "Thu", healthy: 55, earlyBlight: 7, lateBlight: 2 },
  { day: "Fri", healthy: 61, earlyBlight: 5, lateBlight: 1 },
  { day: "Sat", healthy: 38, earlyBlight: 4, lateBlight: 2 },
  { day: "Sun", healthy: 42, earlyBlight: 6, lateBlight: 3 },
];

const trendData = [
  { month: "Jan", infections: 12 },
  { month: "Feb", infections: 18 },
  { month: "Mar", infections: 15 },
  { month: "Apr", infections: 22 },
  { month: "May", infections: 28 },
  { month: "Jun", infections: 19 },
];

const initialDetections: DiseaseDetection[] = [
  {
    id: 1,
    type: "Late Blight",
    plantation: "Plot A-19",
    farmer: "Grace Ingabire",
    severity: "critical",
    detectedAt: "2 mins ago",
    confidence: 94,
    recommendations: [
      "Apply copper-based fungicide immediately",
      "Remove and destroy infected plant material",
      "Improve air circulation around plants",
      "Avoid overhead irrigation",
    ],
  },
  {
    id: 2,
    type: "Early Blight",
    plantation: "Plot B-15",
    farmer: "Marie Uwase",
    severity: "warning",
    detectedAt: "15 mins ago",
    confidence: 87,
    recommendations: [
      "Apply fungicide treatment",
      "Remove lower leaves showing symptoms",
      "Mulch around plants to prevent soil splash",
      "Rotate crops next season",
    ],
  },
  {
    id: 3,
    type: "Late Blight",
    plantation: "Plot D-08",
    farmer: "Jean Ndahimana",
    severity: "critical",
    detectedAt: "1 hour ago",
    confidence: 91,
    recommendations: [
      "Apply systemic fungicide immediately",
      "Harvest healthy tubers if possible",
      "Destroy infected plant debris",
      "Disinfect tools and equipment",
    ],
  },
  {
    id: 4,
    type: "Early Blight",
    plantation: "Plot C-12",
    farmer: "Pierre Mukamana",
    severity: "warning",
    detectedAt: "2 hours ago",
    confidence: 83,
    recommendations: [
      "Apply chlorothalonil fungicide",
      "Improve drainage in the field",
      "Space plants properly for air circulation",
      "Apply balanced fertilizer",
    ],
  },
];

const DiseaseMonitor = () => {
  const [detections, setDetections] =
    useState<DiseaseDetection[]>(initialDetections);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDetection, setSelectedDetection] =
    useState<DiseaseDetection | null>(null);

  const handleViewDetection = (detection: DiseaseDetection) => {
    setSelectedDetection(detection);
    setIsViewModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Disease Monitor
            </h1>
            <p className="text-muted-foreground">
              Track and analyze potato disease detection across all plantations
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Early Blight Cases
              </CardTitle>
              <div className="p-2 rounded-lg bg-warning/10 text-warning">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">43</div>
              <p className="text-xs text-warning flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Late Blight Cases
              </CardTitle>
              <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">21</div>
              <p className="text-xs text-destructive flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Healthy Scans
              </CardTitle>
              <div className="p-2 rounded-lg bg-success/10 text-success">
                <TrendingDown className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +15% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
            <TabsTrigger value="trends">Long-term Trends</TabsTrigger>
            <TabsTrigger value="alerts">Recent Detections</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Disease Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="day" className="text-sm" />
                    <YAxis className="text-sm" />
                    <Tooltip />
                    <Bar
                      dataKey="healthy"
                      fill="hsl(var(--success))"
                      name="Healthy"
                    />
                    <Bar
                      dataKey="earlyBlight"
                      fill="hsl(var(--warning))"
                      name="Early Blight"
                    />
                    <Bar
                      dataKey="lateBlight"
                      fill="hsl(var(--destructive))"
                      name="Late Blight"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>6-Month Infection Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="month" className="text-sm" />
                    <YAxis className="text-sm" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="infections"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                      name="Total Infections"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Disease Detections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {detections.map((detection) => (
                    <div
                      key={detection.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => handleViewDetection(detection)}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <Badge
                            className={
                              detection.severity === "critical"
                                ? "bg-destructive text-destructive-foreground"
                                : "bg-warning text-warning-foreground"
                            }
                          >
                            {detection.type}
                          </Badge>
                          <span className="font-medium">
                            {detection.plantation}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {detection.farmer}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm font-medium">
                          Confidence: {detection.confidence}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {detection.detectedAt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ViewDiseaseDetailsModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        // @ts-ignore
        detection={selectedDetection}
      />
    </DashboardLayout>
  );
};

export default DiseaseMonitor;
