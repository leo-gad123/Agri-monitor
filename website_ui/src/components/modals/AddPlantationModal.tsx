import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddPlantationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (plantation: any) => void;
}

export function AddPlantationModal({
  open,
  onOpenChange,
  onAdd,
}: AddPlantationModalProps) {
  const [name, setName] = useState("");
  const [farmer, setFarmer] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlantation = {
      id: Date.now(),
      name,
      farmer,
      location,
      area: `${area} ha`,
      plantingDate,
      healthScore: 100,
      status: "healthy",
      totalScans: 0,
      diseaseDetected: 0,
    };
    onAdd(newPlantation);
    // Reset form
    setName("");
    setFarmer("");
    setLocation("");
    setArea("");
    setPlantingDate("");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Plantation</DialogTitle>
          <DialogDescription>
            Enter the details of the new plantation. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="farmer" className="text-right">
                Farmer
              </Label>
              <div className="col-span-3">
                <Input
                  id="farmer"
                  value={farmer}
                  onChange={(e) => setFarmer(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <div className="col-span-3">
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kigali City">Kigali City</SelectItem>
                    <SelectItem value="Musanze District">
                      Musanze District
                    </SelectItem>
                    <SelectItem value="Huye District">Huye District</SelectItem>
                    <SelectItem value="Rwamagana District">
                      Rwamagana District
                    </SelectItem>
                    <SelectItem value="Karongi District">
                      Karongi District
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="area" className="text-right">
                Area (ha)
              </Label>
              <div className="col-span-3">
                <Input
                  id="area"
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plantingDate" className="text-right">
                Planting Date
              </Label>
              <div className="col-span-3">
                <Input
                  id="plantingDate"
                  type="date"
                  value={plantingDate}
                  onChange={(e) => setPlantingDate(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Plantation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
