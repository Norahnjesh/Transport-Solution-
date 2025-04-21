"use client";

import { motion } from "framer-motion";
import { Leaf, Truck, HelpCircle, Droplet, Home, Briefcase } from "lucide-react";
import { ReactNode } from "react";

// 👇 Generalized to include relocation types
export type CardType = "liquid" | "perishable" | "durable" | "unsure" | "home" | "office";

interface CategoryCardProps {
  iconKey: CardType;
  title: string;
  onClick: () => void;
  selected?: boolean;
}

// 👇 Icons for both delivery & relocation types
const icons: Record<CardType, ReactNode> = {
  perishable: <Leaf size={40} />,
  durable: <Truck size={40} />,
  unsure: <HelpCircle size={40} />,
  liquid: <Droplet size={40} />,
  home: <Home size={40} />,
  office: <Briefcase size={40} />,
};

export default function CategoryCard({
  iconKey,
  title,
  onClick,
  selected = false,
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      animate={{ scale: selected ? 1.1 : 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`cursor-pointer rounded-2xl shadow-md hover:shadow-xl p-6 text-center space-y-4 transition ${
        selected ? "bg-[#53104e] text-white" : "bg-white text-[#53104e]"
      }`}
    >
      <div className={`${selected ? "text-white" : "text-[#53104e]"} mx-auto`}>
        {icons[iconKey]}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
    </motion.div>
  );
}
