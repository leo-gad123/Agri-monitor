import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const recentScans = [
  {
    id: 1,
    farmer: "Jean Ndahimana",
    plantation: "Plot A-23",
    status: "healthy",
    time: "2 mins ago",
  },
  {
    id: 2,
    farmer: "Marie Uwase",
    plantation: "Plot B-15",
    status: "early_blight",
    time: "15 mins ago",
  },
  {
    id: 3,
    farmer: "Pierre Mukamana",
    plantation: "Plot C-08",
    status: "healthy",
    time: "32 mins ago",
  },
  {
    id: 4,
    farmer: "Grace Ingabire",
    plantation: "Plot A-19",
    status: "late_blight",
    time: "1 hour ago",
  },
  {
    id: 5,
    farmer: "James Uwimana",
    plantation: "Plot D-12",
    status: "healthy",
    time: "2 hours ago",
  },
  {
    id: 6,
    farmer: "Sarah Kamanzi",
    plantation: "Plot B-22",
    status: "early_blight",
    time: "3 hours ago",
  },
];

const statusConfig = {
  healthy: {
    label: "Healthy",
    variant: "default" as const,
    className: "bg-success text-success-foreground",
  },
  early_blight: {
    label: "Early Blight",
    variant: "default" as const,
    className: "bg-warning text-warning-foreground",
  },
  late_blight: {
    label: "Late Blight",
    variant: "destructive" as const,
    className: "bg-destructive text-destructive-foreground",
  },
};

export function RecentScans() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Recent Scans</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {recentScans.map((scan) => {
              const config =
                statusConfig[scan.status as keyof typeof statusConfig];
              return (
                <div
                  key={scan.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{scan.farmer}</p>
                    <p className="text-xs text-muted-foreground">
                      {scan.plantation}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={config.className}>{config.label}</Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {scan.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
