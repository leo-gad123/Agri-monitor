import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Sprout, AlertTriangle } from "lucide-react";

interface DiseaseDetection {
  id: number;
  type: string;
  plantation: string;
  farmer: string;
  severity: string;
  detectedAt: string;
  confidence: number;
  recommendations: string[];
}

interface ViewDiseaseDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detection: DiseaseDetection | null;
}

export function ViewDiseaseDetailsModal({
  open,
  onOpenChange,
  detection,
}: ViewDiseaseDetailsModalProps) {
  if (!detection) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Disease Detection Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl">{detection.type}</CardTitle>
                  <p className="text-muted-foreground">
                    {detection.plantation}
                  </p>
                  <Badge
                    className={
                      detection.severity === "critical"
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-warning text-warning-foreground"
                    }
                  >
                    {detection.severity}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Sprout className="h-4 w-4" />
                    <span>{detection.farmer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{detection.plantation}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{detection.detectedAt}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Confidence: {detection.confidence}%</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="font-medium mb-2">Recommendations</h3>
                <ul className="space-y-2">
                  {detection.recommendations &&
                  detection.recommendations.length > 0 ? (
                    detection.recommendations.map((rec, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                        <span>{rec}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-muted-foreground">
                      No specific recommendations available
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>Take Action</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
