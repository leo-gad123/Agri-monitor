import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Sprout, TrendingUp, Scan } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
  notes?: string;
}

interface ViewPlantationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plantation: Plantation | null;
}

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

export function ViewPlantationDetailsModal({
  open,
  onOpenChange,
  plantation,
}: ViewPlantationDetailsModalProps) {
  if (!plantation) return null;

  const statusConfig = getStatusConfig(plantation.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Plantation Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl">{plantation.name}</CardTitle>
                  <p className="text-muted-foreground">{plantation.farmer}</p>
                  <Badge className={statusConfig.className}>
                    {plantation.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Health Score</span>
                  <span className="font-medium">{plantation.healthScore}%</span>
                </div>
                <Progress value={plantation.healthScore} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{plantation.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(plantation.plantingDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>Area: {plantation.area}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Scan className="h-4 w-4" />
                    <span>Total Scans: {plantation.totalScans}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Disease Detected
                  </p>
                  <p className="text-2xl font-bold text-destructive">
                    {plantation.diseaseDetected}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>Edit Plantation</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
