"use client";

import { useState } from "react";
import { CategoryType, itemOptions } from "./components/categoryData";
import CategoryCard from "./components/CategoryCard";
import Category from "./components/Category";
import WelcomeCard from "./components/WelcomeCard";
import { motion } from "framer-motion";

export default function HomePage() {
  const [userName] = useState("Norah");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleStart = () => {
    if (selectedItems.length > 0) {
      setShowModal(true);
    } else if (selectedCategory) {
      alert(`Please select at least one item under "${selectedCategory}"`);
    } else {
      alert("Please select a category first.");
    }
  };

  const handleContinue = () => {
    // You can replace this with routing logic like `router.push("/next-page")`
    alert("Continuing to the next step...");
    setShowModal(false);
  };

  return (
    <main
      style={{ backgroundColor: "#006F6A" }}
      className="min-h-screen p-6 flex flex-col items-center justify-center gap-8 text-white"
    >
      {/* 👋 Welcome message */}
      <WelcomeCard name={userName} category={selectedCategory ?? "None"} />

      {/* 🗂 Category selection cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl w-full">
        <CategoryCard
          type="perishable"
          title="Perishable"
          onClick={() => {
            setSelectedCategory("perishable");
            setSelectedItems([]);
          }}
        />
        <CategoryCard
          type="durable"
          title="Durable"
          onClick={() => {
            setSelectedCategory("durable");
            setSelectedItems([]);
          }}
        />
        <CategoryCard
          type="unsure"
          title="Not Sure"
          onClick={() => {
            setSelectedCategory("unsure");
            setSelectedItems([]);
          }}
        />
      </div>

      {/* ✅ Tag selection and selected pills */}
      {selectedCategory && (
        <>
          <Category
            title={selectedCategory}
            items={itemOptions[selectedCategory]}
            onSelect={(items) => setSelectedItems(items)}
          />

          {Array.isArray(selectedItems) && selectedItems.length > 0 && (
            <div className="flex flex-wrap gap-2 max-w-xl justify-center mt-4">
              {selectedItems.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="bg-purple-100 text-purple-800 text-sm px-4 py-1 rounded-full border border-purple-300"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </>
      )}

      {/* 🚀 Get Started Button */}
      <button
        onClick={handleStart}
        className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full transition"
      >
        Get Started
      </button>

      {/* ✨ Modal with Back & Continue */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white text-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full text-center"
          >
            <h3 className="text-lg font-bold text-purple-700 mb-4">Selected Goods</h3>
            <ul className="text-sm mb-4 space-y-1">
              {selectedItems.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm"
              >
                Back
              </button>
              <button
                onClick={handleContinue}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
