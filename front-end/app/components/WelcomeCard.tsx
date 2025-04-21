"use client";

import { motion } from "framer-motion";

interface WelcomeCardProps {
  name: string;
  step: "initial" | "delivery" | "relocation";
  relocationType?: "home" | "office" | null;
  transportTypes?: string[];
  selectedRooms?: string[];
  roomCount?: number | null;
  floorFrom?: number | null;
  floorTo?: number | null;
  access?: string;
  selectedFurniture?: string[];
  selectedAppliances?: string[];
  notes?: string;
}

export default function WelcomeCard({
  name,
  step,
  relocationType,
  transportTypes = [],
  selectedRooms = [],
  roomCount = null,
  floorFrom = null,
  floorTo = null,
  access = "",
  selectedFurniture = [],
  selectedAppliances = [],
  notes = "",
}: WelcomeCardProps) {
  const showService = step !== "initial";
  const showTransportTypes = step === "delivery" && transportTypes.length > 0;
  const showRelocation = step === "relocation" && relocationType;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md rounded-xl p-4 text-center text-[#53104e] max-w-xl w-full"
    >
      <h2 className="text-xl font-bold">Welcome, {name} 👋</h2>

      {showService && (
        <p className="text-sm mt-2">
          <strong>Service Selected:</strong>{" "}
          {step === "delivery" ? "Delivery" : "Relocation"}
        </p>
      )}

      {showTransportTypes && (
        <p className="text-sm mt-1">
          <strong>Transport Type(s):</strong> {transportTypes.join(", ")}
        </p>
      )}

      {showRelocation && (
        <>
          <p className="text-sm mt-1">
            <strong>Relocation Type:</strong> {relocationType}
          </p>

          {selectedRooms.length > 0 && (
            <p className="text-sm mt-1">
              <strong>Room Types:</strong> {selectedRooms.join(", ")}
            </p>
          )}

          {roomCount !== null && (
            <p className="text-sm mt-1">
              <strong>Number of Rooms:</strong> {roomCount}
            </p>
          )}

          {(floorFrom !== null || floorTo !== null) && (
            <p className="text-sm mt-1">
              <strong>Floor:</strong>{" "}
              {floorFrom !== null ? `From ${floorFrom}` : ""}{" "}
              {floorTo !== null ? `to ${floorTo}` : ""}
            </p>
          )}

          {access && (
            <p className="text-sm mt-1">
              <strong>Access Method:</strong> {access}
            </p>
          )}

          {selectedFurniture.length > 0 && (
            <p className="text-sm mt-1">
              <strong>Furniture:</strong> {selectedFurniture.join(", ")}
            </p>
          )}

          {selectedAppliances.length > 0 && (
            <p className="text-sm mt-1">
              <strong>Appliances:</strong> {selectedAppliances.join(", ")}
            </p>
          )}

          {notes.trim() !== "" && (
            <p className="text-sm mt-1">
              <strong>Notes:</strong> {notes}
            </p>
          )}
        </>
      )}
    </motion.div>
  );
}
