import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Calendar, Sprout } from "lucide-react";

interface Farmer {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
  plantations: number;
  totalArea: string;
  status: string;
  lastScan: string;
  notes?: string;
}

interface ViewFarmerDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  farmer: Farmer | null;
}

export function ViewFarmerDetailsModal({
  open,
  onOpenChange,
  farmer,
}: ViewFarmerDetailsModalProps) {
  if (!farmer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Farmer Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl">{farmer.name}</CardTitle>
                  <Badge className="bg-success text-success-foreground">
                    {farmer.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{farmer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{farmer.email}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{farmer.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last scan: {farmer.lastScan}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Plantations</p>
                  <p className="text-2xl font-bold">{farmer.plantations}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Area</p>
                  <p className="text-2xl font-bold">{farmer.totalArea}</p>
                </div>
              </div>

              {farmer.notes && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Notes</p>
                  <p className="text-sm">{farmer.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>Edit Farmer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
