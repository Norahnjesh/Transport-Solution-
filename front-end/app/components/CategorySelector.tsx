"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import Category from "./Category";
import { CategoryType, itemOptions } from "./categoryData";

interface CategorySelectorProps {
  onSelectItems: (items: string[]) => void;
}

const solidCategories: CategoryType[] = ["perishable", "durable", "unsure"];

export default function CategorySelector({ onSelectItems }: CategorySelectorProps) {
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);
  const [addingCategory, setAddingCategory] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const refs = useRef<Record<CategoryType, HTMLDivElement | null>>({
    perishable: null,
    durable: null,
    unsure: null,
    liquid: null, // just for type compatibility
  });

  const handleSelect = (type: CategoryType) => {
    if (!selectedCategories.includes(type)) {
      const updated = [...selectedCategories, type];
      setSelectedCategories(updated);
      setAddingCategory(false);
      setTimeout(() => {
        refs.current[type]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  };

  const handleChangeCategory = () => {
    setSelectedCategories([]);
    setAddingCategory(false);
    setSelectedItems([]);
    onSelectItems([]);
  };

  const handleAddAnother = () => {
    setAddingCategory(true);
  };

  const availableCategories = solidCategories.filter(
    (cat) => !selectedCategories.includes(cat)
  );

  const categoriesToRender =
    selectedCategories.length === 0 && !addingCategory
      ? solidCategories
      : addingCategory
      ? availableCategories
      : selectedCategories;

  return (
    <div className="flex flex-col items-center w-full gap-6">
      {/* Category Cards */}
      <div className="flex flex-wrap gap-6 justify-center w-full max-w-5xl">
        {categoriesToRender.map((type) => (
          <motion.div
            key={type}
            layout
            animate={{ scale: selectedCategories.includes(type) ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            className={`flex justify-center ${
              selectedCategories.includes(type)
                ? "w-full"
                : "w-full sm:w-[280px]"
            }`}
          >
            <CategoryCard
  iconKey={type}
  title={
    type === "perishable"
      ? "Perishable"
      : type === "durable"
      ? "Durable"
      : "Not Sure"
  }
  selected={selectedCategories.includes(type)}
  onClick={() => handleSelect(type)}
/>

          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      {selectedCategories.length > 0 && (
        <div className="flex gap-6 mt-2 flex-wrap justify-center">
          <button
            onClick={handleChangeCategory}
            className="text-sm text-white underline"
          >
            Change Category
          </button>
          {availableCategories.length > 0 && !addingCategory && (
            <button
              onClick={handleAddAnother}
              className="text-sm text-white underline"
            >
              Add Another Category
            </button>
          )}
        </div>
      )}

      {/* Category Item Lists */}
      {selectedCategories.map((category) => (
        <div
          key={category}
          ref={(el: HTMLDivElement | null) => {
            refs.current[category] = el;
          }}
          className="w-full flex justify-center"
        >
          <div className="w-full max-w-2xl">
            <Category
              title={category}
              items={itemOptions[category]}
              onSelect={(items: string[]) => {
                setSelectedItems(items);
                onSelectItems(items);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
