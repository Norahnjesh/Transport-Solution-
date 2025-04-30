"use client";

import { motion } from "framer-motion";

interface PurpleButtonProps {
  onClick: () => void;
  label: string;
  type?: "primary" | "secondary";
  className?: string;
}

export default function PurpleButton({
  onClick,
  label,
  type = "primary",
  className = "",
}: PurpleButtonProps) {
  const baseStyle =
    "px-6 py-2 rounded-full font-medium transition shadow text-sm";

  const colorStyle =
    type === "primary"
      ? "bg-[#53104e] text-white hover:bg-[#6f2a64]"
      : "bg-[#9B4D96] text-white hover:bg-[#b567ad]";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyle} ${colorStyle} ${className}`}
    >
      {label}
    </motion.button>
  );
}
