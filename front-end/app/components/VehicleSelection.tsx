"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PurpleButton from "./Buttons";

type VehicleType =
  | "Motorbike"
  | "Probox/Sedan"
  | "Tuk-Tuk"
  | "Van"
  | "Lorry"
  | "Pickup Truck";

interface VehicleOption {
  name: VehicleType;
  icon: string;
  description: string;
  idealFor: string;
  tags: string[];
  recommended?: boolean;
}

interface VehicleSelectionProps {
  onSelect: (vehicle: VehicleType) => void;
  selectedDistance?: string;
  selectedItems?: string[];
  selectedRooms?: string[];
  selectedFurniture?: string[];
}

const allVehicles: VehicleOption[] = [
  {
    name: "Motorbike",
    icon: "🛵",
    description: "Small items, urgent documents, food",
    idealFor: "Small items, urgent documents, food",
    tags: ["Urban", "Perishable", "Express"],
  },
  {
    name: "Probox/Sedan",
    icon: "🚗",
    description: "Perishable items, small-medium deliveries",
    idealFor: "Perishable items, small-medium deliveries",
    tags: ["Affordable", "Fast", "Temperature-sensitive"],
  },
  {
    name: "Tuk-Tuk",
    icon: "🚙",
    description: "Medium packages, short distances, market supplies",
    idealFor: "Medium packages, short distances, market supplies",
    tags: ["Farmers", "Inner city", "Affordable"],
  },
  {
    name: "Van",
    icon: "🚐",
    description: "Electronics, medium furniture, B2B supply",
    idealFor: "Electronics, medium furniture, B2B supply",
    tags: ["Secure", "Lockable", "Fragile"],
  },
  {
    name: "Lorry",
    icon: "🚛",
    description: "Bulk construction, wholesale, relocation",
    idealFor: "Bulk construction, wholesale, relocation",
    tags: ["Heavy-duty", "Long-distance"],
  },
  {
    name: "Pickup Truck",
    icon: "🚚",
    description: "Construction, farm produce, mixed loads",
    idealFor: "Construction, farm produce, mixed loads",
    tags: ["Rural roads", "Durable items"],
  },
];

export default function VehicleSelection({
  onSelect,
  selectedDistance,
  selectedItems = [],
  selectedRooms = [],
  selectedFurniture = [],
}: VehicleSelectionProps) {
  const [selected, setSelected] = useState<VehicleType | null>(null);
  const [recommendedVehicles, setRecommendedVehicles] = useState<VehicleOption[]>([]);

  useEffect(() => {
    filterAndRecommendVehicles();
  }, [selectedDistance, selectedItems, selectedRooms, selectedFurniture]);

  const filterAndRecommendVehicles = () => {
    let filtered = [...allVehicles];
    
    // Base filtering by distance
    if (selectedDistance) {
      switch (selectedDistance) {
        case "Local":
          filtered = allVehicles.filter(v => 
            ["Motorbike", "Probox/Sedan", "Tuk-Tuk"].includes(v.name)
          );
          break;
        case "Regional":
          filtered = allVehicles.filter(v => 
            ["Probox/Sedan", "Van", "Pickup Truck"].includes(v.name)
          );
          break;
        case "Long-haul":
          filtered = allVehicles.filter(v => 
            ["Van", "Lorry", "Pickup Truck"].includes(v.name)
          );
          break;
      }
    }

    // Additional filtering based on items/rooms/furniture
    if (selectedItems.length > 0 || selectedRooms.length > 0 || selectedFurniture.length > 0) {
      const totalItems = selectedItems.length + selectedFurniture.length;
      const hasFragileItems = selectedItems.some(item => 
        item.toLowerCase().includes("fragile") || 
        item.toLowerCase().includes("electronics")
      );
      const hasPerishables = selectedItems.some(item => 
        item.toLowerCase().includes("food") || 
        item.toLowerCase().includes("perishable")
      );
      const hasBulkItems = selectedFurniture.some(item => 
        item.toLowerCase().includes("sofa") || 
        item.toLowerCase().includes("bed") ||
        item.toLowerCase().includes("wardrobe")
      );

      filtered = filtered.map(vehicle => {
        let recommended = false;
        
        // Logic for recommending vehicles
        if (hasPerishables && ["Probox/Sedan", "Motorbike"].includes(vehicle.name)) {
          recommended = true;
        }
        if (hasFragileItems && vehicle.name === "Van") {
          recommended = true;
        }
        if (hasBulkItems && ["Lorry", "Pickup Truck"].includes(vehicle.name)) {
          recommended = true;
        }
        if (totalItems > 5 && ["Van", "Lorry", "Pickup Truck"].includes(vehicle.name)) {
          recommended = true;
        }
        if (totalItems <= 2 && ["Motorbike", "Tuk-Tuk"].includes(vehicle.name)) {
          recommended = true;
        }

        return { ...vehicle, recommended };
      });
    }

    // Sort to show recommended vehicles first
    filtered.sort((a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0));
    setRecommendedVehicles(filtered);
  };

  const handleSelect = (vehicle: VehicleType) => {
    setSelected(vehicle);
    onSelect(vehicle);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-white text-center">
        Select Your Vehicle Type
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendedVehicles.map((vehicle) => (
          <motion.div
            key={vehicle.name}
            whileHover={{ scale: 1.03 }}
            className={`p-4 rounded-xl shadow-md cursor-pointer transition border-2 ${
              selected === vehicle.name
                ? "border-[#53104e] bg-white text-[#53104e]"
                : "bg-white text-[#53104e] border-transparent"
            }`}
            onClick={() => handleSelect(vehicle.name)}
          >
            <div className="flex justify-between items-center">
              <div className="text-2xl">{vehicle.icon}</div>
              {vehicle.recommended && (
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Recommended
                </span>
              )}
            </div>

            <h3 className="font-bold mt-2">{vehicle.name}</h3>
            <p className="text-sm">{vehicle.description}</p>

            <div className="mt-2 text-xs">
              <strong>Ideal For:</strong> {vehicle.idealFor}
            </div>

            <div className="flex flex-wrap gap-1 mt-2 text-xs">
              {vehicle.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-[#53104e] px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {selected && (
        <div className="text-center mt-4">
          <PurpleButton label="Continue" onClick={() => onSelect(selected)} />
        </div>
      )}
    </div>
  );
}