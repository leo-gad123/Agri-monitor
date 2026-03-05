import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, MapPin, Phone, Mail, Plus } from "lucide-react";
import { AddFarmerModal } from "@/components/modals/AddFarmerModal";
import { ViewFarmerDetailsModal } from "@/components/modals/ViewFarmerDetailsModal";

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
}

const initialFarmers = [
  {
    id: 1,
    name: "Jean Ndahimana",
    phone: "+250 788 123 456",
    email: "j.ndahimana@email.com",
    location: "Kigali",
    plantations: 3,
    totalArea: "12.5 ha",
    status: "active",
    lastScan: "2 hours ago",
  },
  {
    id: 2,
    name: "Marie Uwase",
    phone: "+250 785 234 567",
    email: "m.uwase@email.com",
    location: "Northern Province",
    plantations: 5,
    totalArea: "18.3 ha",
    status: "active",
    lastScan: "5 hours ago",
  },
  {
    id: 3,
    name: "Pierre Mukamana",
    phone: "+250 787 345 678",
    email: "p.mukamana@email.com",
    location: "Southern Province",
    plantations: 2,
    totalArea: "8.2 ha",
    status: "active",
    lastScan: "1 day ago",
  },
  {
    id: 4,
    name: "Grace Ingabire",
    phone: "+250 786 456 789",
    email: "g.ingabire@email.com",
    location: "Eastern Province",
    plantations: 4,
    totalArea: "15.7 ha",
    status: "active",
    lastScan: "3 hours ago",
  },
  {
    id: 5,
    name: "James Uwimana",
    phone: "+250 784 567 890",
    email: "j.uwimana@email.com",
    location: "Western Province",
    plantations: 6,
    totalArea: "22.1 ha",
    status: "active",
    lastScan: "30 mins ago",
  },
];

const Farmers = () => {
  const [farmers, setFarmers] = useState<Farmer[]>(initialFarmers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  const handleAddFarmer = (newFarmer: any) => {
    setFarmers([...farmers, newFarmer]);
  };

  const handleViewFarmer = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setIsViewModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Farmers</h1>
            <p className="text-muted-foreground">
              Manage and monitor all registered farmers
            </p>
          </div>
          <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Farmer
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search farmers by name, location, or phone..."
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-center">Plantations</TableHead>
                  <TableHead className="text-center">Total Area</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Last Scan</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {farmers.map((farmer) => (
                  <TableRow key={farmer.id} className="hover:bg-accent/50">
                    <TableCell className="font-medium">{farmer.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {farmer.phone}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {farmer.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {farmer.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {farmer.plantations}
                    </TableCell>
                    <TableCell className="text-center">
                      {farmer.totalArea}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-success text-success-foreground">
                        {farmer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {farmer.lastScan}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewFarmer(farmer)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <AddFarmerModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAdd={handleAddFarmer}
      />

      <ViewFarmerDetailsModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        farmer={selectedFarmer}
      />
    </DashboardLayout>
  );
};

export default Farmers;
