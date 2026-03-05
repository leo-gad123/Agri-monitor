import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const farmers = [
  {
    id: 1,
    name: "Jean Ndahimana",
    location: "Kigali",
    plantations: 3,
    healthy: 2,
    warnings: 1,
    critical: 0,
  },
  {
    id: 2,
    name: "Marie Uwase",
    location: "Northern Province",
    plantations: 5,
    healthy: 3,
    warnings: 1,
    critical: 1,
  },
  {
    id: 3,
    name: "Pierre Mukamana",
    location: "Southern Province",
    plantations: 2,
    healthy: 2,
    warnings: 0,
    critical: 0,
  },
  {
    id: 4,
    name: "Grace Ingabire",
    location: "Eastern Province",
    plantations: 4,
    healthy: 2,
    warnings: 2,
    critical: 0,
  },
  {
    id: 5,
    name: "James Uwimana",
    location: "Western Province",
    plantations: 6,
    healthy: 4,
    warnings: 1,
    critical: 1,
  },
];

export function FarmersTable() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Farmers Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-center">Plantations</TableHead>
              <TableHead className="text-center">Healthy</TableHead>
              <TableHead className="text-center">Warnings</TableHead>
              <TableHead className="text-center">Critical</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farmers.map((farmer) => (
              <TableRow key={farmer.id} className="hover:bg-accent/50">
                <TableCell className="font-medium">{farmer.name}</TableCell>
                <TableCell>{farmer.location}</TableCell>
                <TableCell className="text-center">
                  {farmer.plantations}
                </TableCell>
                <TableCell className="text-center">
                  <Badge className="bg-success text-success-foreground">
                    {farmer.healthy}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {farmer.warnings > 0 && (
                    <Badge className="bg-warning text-warning-foreground">
                      {farmer.warnings}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {farmer.critical > 0 && (
                    <Badge variant="destructive">{farmer.critical}</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
