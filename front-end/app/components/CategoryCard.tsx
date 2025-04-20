"use client";

import { motion } from "framer-motion";
import { Leaf, Truck, HelpCircle } from "lucide-react";
import { ReactNode } from "react";
import { CategoryType } from "./categoryData"; // all the data codes in regards to categories will be stored here 
interface CategoryCardProps {
  type: CategoryType;
  title: string;
  onClick: () => void;
}

const icons: Record<CategoryType, ReactNode> = {
  perishable: <Leaf size={40} />,
  durable: <Truck size={40} />,
  unsure: <HelpCircle size={40} />,
};

export default function CategoryCard({
  type,
  title,
  onClick,
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl p-6 text-center space-y-4 transition"
    >
      <div className="text-purple-600 mx-auto">{icons[type]}</div>
      <h3 className="text-lg font-bold text-purple-800">{title}</h3>
    </motion.div>
  );
}
