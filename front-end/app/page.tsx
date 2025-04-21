"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeCard from "./components/WelcomeCard";
import CategorySelector from "./components/CategorySelector";
import Category from "./components/Category";
import PurpleButton from "./components/Buttons";
import CategoryCard from "./components/CategoryCard";
import {
  itemOptions,
  roomTypes,
  furnitureTypes,
  floorOptions,
  relocationNotePlaceholder,
  applianceOptions,
  accessOptions,
} from "./components/categoryData";

export default function HomePage() {
  const [userName] = useState("Norah");
  const [step, setStep] = useState<"initial" | "relocation" | "delivery">("initial");
  const [relocationType, setRelocationType] = useState<"office" | "home" | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<("solid" | "liquid")[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [animatingReset, setAnimatingReset] = useState(false);
  const selectionRef = useRef<HTMLDivElement | null>(null);

  // Relocation state
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>([]);
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);
  const [floorFrom, setFloorFrom] = useState<number | null>(null);
  const [floorTo, setFloorTo] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [accessOption, setAccessOption] = useState<string>("");
  const [roomCount, setRoomCount] = useState<number | null>(null);

  const handleTypeSelect = (type: "solid" | "liquid") => {
    if (!selectedTypes.includes(type)) {
      setSelectedTypes((prev) => [...prev, type]);
    }
  };

  const handleGoBack = () => {
    if (step === "delivery") {
      setAnimatingReset(true);
      setTimeout(() => {
        setSelectedTypes([]);
        setSelectedItems([]);
        setAnimatingReset(false);
        setStep("initial");
      }, 400);
    } else if (step === "relocation" && relocationType) {
      setRelocationType(null);
    } else {
      setStep("initial");
    }
  };

  const handleStart = () => {
    const hasRelocation =
      relocationType ||
      selectedRooms.length > 0 ||
      selectedFurniture.length > 0 ||
      selectedAppliances.length > 0 ||
      
      notes.length > 0;

    const hasDelivery = selectedItems.length > 0;

    if ((step === "relocation" && hasRelocation) || (step === "delivery" && hasDelivery)) {
      setShowModal(true);
    } else {
      alert("Please fill in at least one detail or select a category item.");
    }
  };

  const handleContinue = () => {
    alert("Continuing to the next step...");
    setShowModal(false);
  };

  const handleSkipRelocation = () => {
    setShowModal(true);
  };

  const unselectedTypes = ["solid", "liquid"].filter(
    (t) => !selectedTypes.includes(t as "solid" | "liquid")
  );

  useEffect(() => {
    if (selectedTypes.length > 0 && selectionRef.current) {
      selectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedTypes]);

  return (
    <main
      style={{ backgroundColor: "#006F6A" }}
      className="min-h-screen p-6 flex flex-col items-center justify-center gap-8 text-white"
    >
      <WelcomeCard
  name={userName}
  step={step}
  relocationType={relocationType}
  transportTypes={selectedTypes}
  selectedRooms={selectedRooms}
  floorFrom={floorFrom}
  floorTo={floorTo}
  access={accessOption}
  selectedAppliances={selectedAppliances}
  selectedFurniture={selectedFurniture}
  notes={notes}
/>

      {(step === "relocation" || step === "delivery") && (
        <PurpleButton label="Go Back" onClick={handleGoBack} type="secondary" />
      )}

      {step === "initial" && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-semibold">What service do you need?</p>
          <div className="flex gap-6 flex-wrap justify-center">
          <CategoryCard
  iconKey="durable" // Correct prop name
  title="🚚 Delivery"
  onClick={() => setStep("delivery")}
/>

<CategoryCard
  iconKey="home" // Correct icon for relocation
  title="🏠 Relocation"
  onClick={() => setStep("relocation")}
/>

          </div>
        </div>
      )}

      {step === "relocation" && !relocationType && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-semibold">Is it a home or office relocation?</p>
          <div className="flex gap-6 flex-wrap justify-center">
          <CategoryCard
  iconKey="home"
  title="🏡 Home"
  onClick={() => setRelocationType("home")}
/>

<CategoryCard
  iconKey="office"
  title="🏢 Office"
  onClick={() => setRelocationType("office")}
/>

          </div>
        </div>
      )}

      {step === "relocation" && relocationType && (
        <motion.div
          className="flex flex-col gap-4 mt-6 w-full max-w-xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-lg font-semibold capitalize">{relocationType} Relocation Details</h3>

          <div>
  <label className="block mb-1">Rooms involved:</label>
  <div className="flex flex-wrap gap-2">
    {roomTypes[relocationType].map((room) => (
      <PurpleButton
        key={room}
        label={room}
        type="secondary"
        onClick={() =>
          setSelectedRooms((prev) =>
            prev.includes(room)
              ? prev.filter((r) => r !== room)
              : [...prev, room]
          )
        }
      />
    ))}
  </div>
</div>


<div>
  <label className="block mb-1">Moving *from* floor:</label>
  <select
    value={floorFrom ?? ""}
    onChange={(e) => setFloorFrom(Number(e.target.value))}
    className="w-full rounded px-3 py-2 text-black"
  >
    <option value="" disabled>Select floor</option>
    {floorOptions.map((floor) => (
      <option key={floor} value={floor}>
        {floor}
      </option>
    ))}
  </select>
</div>

{/* Moving To Floor */}
<div>
  <label className="block mb-1">Moving *to* floor:</label>
  <select
    value={floorTo ?? ""}
    onChange={(e) => setFloorTo(Number(e.target.value))}
    className="w-full rounded px-3 py-2 text-black"
  >
    <option value="" disabled>Select floor</option>
    {floorOptions.map((floor) => (
      <option key={floor} value={floor}>
        {floor}
      </option>
    ))}
  </select>
</div>

          <div>
            <label className="block mb-1">Access method:</label>
            <div className="flex flex-wrap gap-2">
              {accessOptions.map((opt) => (
                <PurpleButton
                  key={opt}
                  label={opt}
                  type="secondary"
                  onClick={() => setAccessOption(opt)}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1">Furniture:</label>
            <div className="flex flex-wrap gap-2">
              {furnitureTypes[relocationType].map((item) => (
                <PurpleButton
                  key={item}
                  label={item}
                  type="secondary"
                  onClick={() =>
                    setSelectedFurniture((prev) =>
                      prev.includes(item)
                        ? prev.filter((i) => i !== item)
                        : [...prev, item]
                    )
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1">Appliances:</label>
            <div className="flex flex-wrap gap-2">
              {applianceOptions.map((app) => (
                <PurpleButton
                  key={app}
                  label={app}
                  type="secondary"
                  onClick={() =>
                    setSelectedAppliances((prev) =>
                      prev.includes(app)
                        ? prev.filter((a) => a !== app)
                        : [...prev, app]
                    )
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1">Other notes:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={relocationNotePlaceholder}
              className="w-full rounded px-3 py-2 text-black min-h-[100px]"
            />
          </div>

          <PurpleButton label="Skip" type="primary" onClick={handleSkipRelocation} />
        </motion.div>
      )}

      {step === "delivery" && (selectedTypes.length === 0 || unselectedTypes.length < 2) && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-semibold">
            {selectedTypes.length === 0 ? "What are you transporting?" : "Add another type to transport:"}
          </p>
          <div className="flex gap-6 flex-wrap justify-center">
            {unselectedTypes.includes("liquid") && (
              <CategoryCard
              iconKey="liquid" // 
              title="🧴 Liquids"
              onClick={() => handleTypeSelect("liquid")}
            />
            )}
            {unselectedTypes.includes("solid") && (
              <CategoryCard
              iconKey="durable" // ✅ instead of pretending this is "solid"
              title="📦 Solids"
              onClick={() => handleTypeSelect("solid")}
            />
            )}
          </div>
        </div>
      )}

      <AnimatePresence>
        {step === "delivery" && !animatingReset && (
          <motion.div
            ref={selectionRef}
            className="w-full flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {selectedTypes.includes("liquid") && (
              <Category
                title="Liquid Items"
                items={itemOptions.liquid}
                onSelect={(items) => setSelectedItems((prev) => [...prev, ...items])}
              />
            )}
            {selectedTypes.includes("solid") && (
              <CategorySelector onSelectItems={(items) => setSelectedItems((prev) => [...prev, ...items])} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {selectedItems.length > 0 && (
        <div className="flex flex-col items-center gap-2 max-w-xl mt-4 text-center">
          <h3 className="text-md font-semibold">You have selected:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {selectedItems.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="bg-[#F5E6F3] text-[#53104e] text-sm px-4 py-1 rounded-full border border-[#53104e]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {(step === "relocation" || step === "delivery") && (
        <PurpleButton label="Get Started" onClick={handleStart} />
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white text-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full text-center"
          >
            <h3 className="text-lg font-bold text-[#53104e] mb-4">Selected Goods</h3>
            <ul className="text-sm mb-4 space-y-1">
              {selectedItems.map((item, i) => <li key={`i-${i}`}>• {item}</li>)}
              {selectedRooms.map((room, i) => <li key={`r-${i}`}>• {room}</li>)}
              {selectedFurniture.map((item, i) => <li key={`f-${i}`}>• {item}</li>)}
              {selectedAppliances.map((app, i) => <li key={`a-${i}`}>• {app}</li>)}
              {(floorFrom !== null || floorTo !== null) && (
    <li>
      • Floor:{" "}
      {floorFrom !== null ? `From ${floorFrom}` : ""}{" "}
      {floorTo !== null ? `To ${floorTo}` : ""}
    </li>
  )}

              {accessOption && <li>• Access: {accessOption}</li>}
              {notes && <li>• Notes: {notes}</li>}
            </ul>

            <div className="flex justify-center gap-4">
              <PurpleButton label="Back" type="secondary" onClick={() => setShowModal(false)} />
              <PurpleButton label="Continue" type="primary" onClick={handleContinue} />
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
