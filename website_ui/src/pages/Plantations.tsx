import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Plus, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AddPlantationModal } from "@/components/modals/AddPlantationModal";
import { ViewPlantationDetailsModal } from "@/components/modals/ViewPlantationDetailsModal";

interface Plantation {
  id: number;
  name: string;
  farmer: string;
  location: string;
  area: string;
  plantingDate: string;
  healthScore: number;
  status: string;
  totalScans: number;
  diseaseDetected: number;
}

const initialPlantations = [
  {
    id: 1,
    name: "Plot A-23",
    farmer: "Jean Ndahimana",
    location: "Kigali City",
    area: "4.2 ha",
    plantingDate: "2024-01-15",
    healthScore: 92,
    status: "healthy",
    totalScans: 45,
    diseaseDetected: 2,
  },
  {
    id: 2,
    name: "Plot B-15",
    farmer: "Marie Uwase",
    location: "Musanze District",
    area: "3.8 ha",
    plantingDate: "2024-01-20",
    healthScore: 68,
    status: "warning",
    totalScans: 38,
    diseaseDetected: 12,
  },
  {
    id: 3,
    name: "Plot C-08",
    farmer: "Pierre Mukamana",
    location: "Huye District",
    area: "5.1 ha",
    plantingDate: "2024-01-10",
    healthScore: 95,
    status: "healthy",
    totalScans: 52,
    diseaseDetected: 1,
  },
  {
    id: 4,
    name: "Plot A-19",
    farmer: "Grace Ingabire",
    location: "Rwamagana District",
    area: "3.5 ha",
    plantingDate: "2024-02-01",
    healthScore: 45,
    status: "critical",
    totalScans: 41,
    diseaseDetected: 18,
  },
  {
    id: 5,
    name: "Plot D-12",
    farmer: "James Uwimana",
    location: "Karongi District",
    area: "6.3 ha",
    plantingDate: "2024-01-05",
    healthScore: 88,
    status: "healthy",
    totalScans: 67,
    diseaseDetected: 5,
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "healthy":
      return {
        variant: "default" as const,
        className: "bg-success text-success-foreground",
      };
    case "warning":
      return {
        variant: "default" as const,
        className: "bg-warning text-warning-foreground",
      };
    case "critical":
      return { variant: "destructive" as const };
    default:
      return { variant: "default" as const, className: "" };
  }
};

const Plantations = () => {
  const [plantations, setPlantations] =
    useState<Plantation[]>(initialPlantations);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPlantation, setSelectedPlantation] =
    useState<Plantation | null>(null);

  const handleAddPlantation = (newPlantation: any) => {
    setPlantations([...plantations, newPlantation]);
  };

  const handleViewPlantation = (plantation: Plantation) => {
    setSelectedPlantation(plantation);
    setIsViewModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Plantations</h1>
            <p className="text-muted-foreground">
              Monitor all potato plantations and their health status
            </p>
          </div>
          <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Plantation
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search plantations by name, farmer, or location..."
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {plantations.map((plantation) => {
                const statusConfig = getStatusConfig(plantation.status);
                return (
                  <Card
                    key={plantation.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">
                            {plantation.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {plantation.farmer}
                          </p>
                        </div>
                        <Badge className={statusConfig.className}>
                          {plantation.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Health Score
                          </span>
                          <span className="font-medium">
                            {plantation.healthScore}%
                          </span>
                        </div>
                        <Progress
                          value={plantation.healthScore}
                          className="h-2"
                        />
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {plantation.location}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Planted:{" "}
                          {new Date(
                            plantation.plantingDate
                          ).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <TrendingUp className="h-3 w-3" />
                          Area: {plantation.area}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border flex items-center justify-between text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Scans</p>
                          <p className="font-medium">{plantation.totalScans}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">
                            Disease Detected
                          </p>
                          <p className="font-medium text-destructive">
                            {plantation.diseaseDetected}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        size="sm"
                        onClick={() => handleViewPlantation(plantation)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <AddPlantationModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAdd={handleAddPlantation}
      />

      <ViewPlantationDetailsModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        plantation={selectedPlantation}
      />
    </DashboardLayout>
  );
};

export default Plantations;
