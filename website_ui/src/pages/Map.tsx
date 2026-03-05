import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Filter, Layers } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  type: "farm" | "plantation" | "detection";
  status: "healthy" | "warning" | "critical";
  details: string;
}

const initialLocations: Location[] = [
  {
    id: 1,
    name: "Kigali Potato Farm",
    lat: -1.9441,
    lng: 30.0619,
    type: "farm",
    status: "healthy",
    details: "5 plantations, 18.2 ha",
  },
  {
    id: 2,
    name: "Northern Plantation",
    lat: -1.6572,
    lng: 30.072,
    type: "plantation",
    status: "warning",
    details: "Health score: 72%",
  },
  {
    id: 3,
    name: "Southern Field",
    lat: -2.4573,
    lng: 29.747,
    type: "plantation",
    status: "healthy",
    details: "Health score: 94%",
  },
  {
    id: 4,
    name: "Western Region Plot",
    lat: -2.0818,
    lng: 29.3164,
    type: "detection",
    status: "critical",
    details: "Late Blight detected",
  },
  {
    id: 5,
    name: "Eastern Province Farm",
    lat: -2.0981,
    lng: 30.7836,
    type: "farm",
    status: "healthy",
    details: "4 plantations, 15.7 ha",
  },
  {
    id: 6,
    name: "Rusizi Valley Plantation",
    lat: -2.4325,
    lng: 28.9135,
    type: "plantation",
    status: "warning",
    details: "Health score: 65%",
  },
  {
    id: 7,
    name: "Rubavu Highland Field",
    lat: -1.6676,
    lng: 29.3961,
    type: "detection",
    status: "critical",
    details: "Early Blight detected",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "bg-success";
    case "warning":
      return "bg-warning";
    case "critical":
      return "bg-destructive";
    default:
      return "bg-muted";
  }
};

const MapPage = () => {
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [filteredLocations, setFilteredLocations] =
    useState<Location[]>(initialLocations);
  const [filters, setFilters] = useState({
    farms: true,
    plantations: true,
    detections: true,
    healthy: true,
    warning: true,
    critical: true,
  });

  useEffect(() => {
    // Apply filters
    const filtered = locations.filter((location) => {
      // Type filters
      if (location.type === "farm" && !filters.farms) return false;
      if (location.type === "plantation" && !filters.plantations) return false;
      if (location.type === "detection" && !filters.detections) return false;

      // Status filters
      if (location.status === "healthy" && !filters.healthy) return false;
      if (location.status === "warning" && !filters.warning) return false;
      if (location.status === "critical" && !filters.critical) return false;

      return true;
    });

    setFilteredLocations(filtered);
  }, [filters, locations]);

  const toggleFilter = (filter: string) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter as keyof typeof filters],
    }));
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Map View</h1>
            <p className="text-muted-foreground">
              Visualize farm locations and disease detections
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Layers className="h-4 w-4 mr-2" />
              Layers
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Location Types</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Farms</span>
                      <Button
                        variant={filters.farms ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter("farms")}
                      >
                        {filters.farms ? "On" : "Off"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Plantations</span>
                      <Button
                        variant={filters.plantations ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter("plantations")}
                      >
                        {filters.plantations ? "On" : "Off"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Detections</span>
                      <Button
                        variant={filters.detections ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter("detections")}
                      >
                        {filters.detections ? "On" : "Off"}
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Healthy</span>
                      <Button
                        variant={filters.healthy ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter("healthy")}
                      >
                        {filters.healthy ? "On" : "Off"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Warning</span>
                      <Button
                        variant={filters.warning ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter("warning")}
                      >
                        {filters.warning ? "On" : "Off"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Critical</span>
                      <Button
                        variant={filters.critical ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter("critical")}
                      >
                        {filters.critical ? "On" : "Off"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span>Healthy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span>Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span>Critical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Farms</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Plantations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Detections</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Farm Locations</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px] w-full relative">
                  <MapContainer
                    center={[-1.9441, 30.0619]}
                    zoom={9}
                    style={{ height: "100%", width: "100%" }}
                    className="rounded-b-lg"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {filteredLocations.map((location) => (
                      <Marker
                        key={location.id}
                        position={[location.lat, location.lng]}
                      >
                        <Popup>
                          <div className="min-w-[200px]">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold">{location.name}</h3>
                              <Badge
                                className={getStatusColor(location.status)}
                              >
                                {location.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {location.details}
                            </p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                              {location.type === "detection" && (
                                <Button size="sm">Take Action</Button>
                              )}
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapPage;
