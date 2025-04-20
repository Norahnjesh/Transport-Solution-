"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryProps {
  title: string;
  items: string[];
  onSelect: (items: string[]) => void;
}

export default function Category({ title, items, onSelect }: CategoryProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [customItem, setCustomItem] = useState("");

  const handleToggle = (item: string) => {
    const isSelected = selectedItems.includes(item);
    const updated = isSelected
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];

    setSelectedItems(updated);
    setCustomItem(""); // Clear "other" input if tag selected
    onSelect(updated); // ✅ Pass array to parent
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomItem(value);
    setSelectedItems([]); // Clear tag selections
    onSelect([value]); // ✅ wrap string in an array
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 mt-6 w-full max-w-xl">
      <h2 className="text-xl font-bold text-center text-purple-800">
        What are you transporting under "{title}"?
      </h2>

      <AnimatePresence>
        <motion.div
          layout
          className="flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {items.map((item, idx) => (
            <motion.button
              key={idx}
              layout
              whileTap={{ scale: 0.95 }}
              onClick={() => handleToggle(item)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                selectedItems.includes(item)
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-purple-700 border-purple-300 hover:bg-purple-100"
              }`}
            >
              {item}
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Custom Input for Other Items */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-700 mb-1">Not seeing your item?</p>
        <input
          type="text"
          placeholder="Enter other item..."
          value={customItem}
          onChange={handleCustomChange}
          className="border border-purple-300 rounded-lg p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>
  );
}
