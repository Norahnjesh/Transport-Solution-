"use client";

import { motion } from "framer-motion";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = "Go Back" }: BackButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className="text-sm text-[#53104e] underline font-medium mt-2"
    >
      ⬅️ {label}
    </motion.button>
  );
}
