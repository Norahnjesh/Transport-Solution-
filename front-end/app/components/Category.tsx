"use client";

import { useState } from "react";
import { ItemGroup } from "./categoryData";

interface CategoryProps {
  title: string;
  items: ItemGroup[] | string[];
  onSelect: (items: string[]) => void;
}

export default function Category({ title, items, onSelect }: CategoryProps) {
  const isGrouped = Array.isArray(items) && typeof items[0] === "object";
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [customItem, setCustomItem] = useState("");

  const handleToggle = (item: string) => {
    const updated = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];

    setSelectedItems(updated);
    onSelect(updated);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomItem(value);
    setSelectedItems([]); // reset pre-defined items
    onSelect(value ? [value] : []);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-center text-[#53104e]">
        What are you transporting under "{title}"?
      </h2>

      {isGrouped ? (
        (items as ItemGroup[]).map((group) => (
          <div key={group.label}>
            <h3 className="text-sm font-semibold text-[#53104e] mb-2">{group.label}</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {group.items.map((item) => (
                <button
                  key={item}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                    selectedItems.includes(item)
                      ? "bg-[#53104e] text-white border-[#53104e]"
                      : "bg-white text-[#53104e] border-purple-300 hover:bg-purple-100"
                  }`}
                  onClick={() => handleToggle(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-wrap gap-3 justify-center">
          {(items as string[]).map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                selectedItems.includes(item)
                  ? "bg-[#53104e] text-white border-[#53104e]"
                  : "bg-white text-[#53104e] border-purple-300 hover:bg-purple-100"
              }`}
              onClick={() => handleToggle(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-700 mb-1">Not seeing your item?</p>
        <input
          type="text"
          placeholder="Enter other item..."
          value={customItem}
          onChange={handleCustomChange}
          className="border border-purple-300 rounded-lg p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
        />
      </div>
    </div>
  );
}
