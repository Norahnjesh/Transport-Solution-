// components/WelcomeCard.tsx
import React from "react";
import { motion } from "framer-motion";

interface WelcomeCardProps {
  name: string;
  category: string;
}

export default function WelcomeCard({ name, category }: WelcomeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md rounded-xl p-4 text-center"
    >
      <h2 className="text-xl font-bold text-teal-800">Welcome, {name} 👋</h2>
      <p className="text-sm text-gray-600 mt-2">
        You selected: <span className="text-purple-600 font-medium">{category}</span> goods
      </p>
    </motion.div>
  );
}