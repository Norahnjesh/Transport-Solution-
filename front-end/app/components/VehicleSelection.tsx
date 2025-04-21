// components/VehicleSelection.tsx
"use client";

import { useState } from "react";
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
  tags: string[];
  recommended?: boolean;
}

const vehicles: VehicleOption[] = [
  {
    name: "Motorbike",
    icon: "🛵",
    description: "Small items, urgent documents, food",
    tags: ["Urban", "Perishable", "Express"],
  },
  {
    name: "Probox/Sedan",
    icon: "🚗",
    description: "Perishable items, small-medium deliveries",
    tags: ["Affordable", "Fast", "Temperature-sensitive"],
    recommended: true,
  },
  {
    name: "Tuk-Tuk",
    icon: "🚙",
    description: "Medium packages, short distances, market supplies",
    tags: ["Farmers", "Inner city", "Affordable"],
  },
  {
    name: "Van",
    icon: "🚐",
    description: "Electronics, medium furniture, B2B supply",
    tags: ["Secure", "Lockable", "Fragile"],
  },
  {
    name: "Lorry",
    icon: "🚛",
    description: "Bulk construction, wholesale, relocation",
    tags: ["Heavy-duty", "Long-distance"],
  },
  {
    name: "Pickup Truck",
    icon: "🚚",
    description: "Construction, farm produce, mixed loads",
    tags: ["Rural roads", "Durable items"],
  },
];

interface VehicleSelectionProps {
  onSelect: (vehicle: VehicleType) => void;
}

export default function VehicleSelection({ onSelect }: VehicleSelectionProps) {
  const [selected, setSelected] = useState<VehicleType | null>(null);

  const handleSelect = (vehicle: VehicleType) => {
    setSelected(vehicle);
    onSelect(vehicle);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl">
      <h2 className="text-xl font-bold text-white text-center">
        Select Your Vehicle Type
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vehicles.map((vehicle) => (
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
