"use client";

import { motion } from "framer-motion";

interface WelcomeCardProps {
  name: string;
  step: "initial" | "relocation" | "delivery" | "pickUpDropOff" | "vehicleSelection";
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
  // New props for tracking progress
  selectedItems?: string[];
  pickUpLocation?: string;
  dropOffLocation?: string;
  preferredPickUpTime?: string;
  disposalDistance?: string;
  selectedVehicle?: string | null;
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
  selectedItems = [],
  pickUpLocation = "",
  dropOffLocation = "",
  preferredPickUpTime = "",
  disposalDistance = "",
  selectedVehicle = null,
}: WelcomeCardProps) {
  const showService = step !== "initial";
  const showTransportTypes = step === "delivery" && transportTypes.length > 0;
  const showRelocation = step === "relocation" && relocationType;
  const showItems = selectedItems.length > 0;
  const showLocations = step === "pickUpDropOff" || step === "vehicleSelection";
  const showVehicle = step === "vehicleSelection" && selectedVehicle;

  // Helper function to format date for better readability
  const formatDateTime = (dateTimeStr: string): string => {
    if (!dateTimeStr) return "";
    try {
      const date = new Date(dateTimeStr);
      return date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    } catch (e) {
      return dateTimeStr;
    }
  };

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

      {showItems && (
        <div className="mt-2">
          <p className="text-sm font-semibold">Selected Items:</p>
          <div className="flex flex-wrap justify-center gap-1 mt-1">
            {selectedItems.slice(0, 5).map((item, idx) => (
              <span
                key={idx}
                className="bg-[#F5E6F3] text-xs px-2 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
            {selectedItems.length > 5 && (
              <span className="text-xs font-medium">
                +{selectedItems.length - 5} more
              </span>
            )}
          </div>
        </div>
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

      {showLocations && (
        <div className="mt-2 border-t border-[#53104e]/20 pt-2">
          <div className="flex flex-col gap-1">
            {pickUpLocation && (
              <p className="text-sm">
                <strong>Pick-Up:</strong> {pickUpLocation}
              </p>
            )}
            {dropOffLocation && (
              <p className="text-sm">
                <strong>Drop-Off:</strong> {dropOffLocation}
              </p>
            )}
            {preferredPickUpTime && (
              <p className="text-sm">
                <strong>Scheduled:</strong> {formatDateTime(preferredPickUpTime)}
              </p>
            )}
            {disposalDistance && (
              <p className="text-sm">
                <strong>Trip Type:</strong> {disposalDistance}
              </p>
            )}
          </div>
        </div>
      )}

      {showVehicle && (
        <div className="mt-2 border-t border-[#53104e]/20 pt-2">
          <p className="text-sm font-semibold">
            <strong>Selected Vehicle:</strong> {selectedVehicle}
          </p>
        </div>
      )}
    </motion.div>
  );
}