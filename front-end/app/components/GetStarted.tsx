"use client";

import React from "react";

interface GetStartedButtonProps {
  onClick: () => void;
}

export default function GetStartedButton({ onClick }: GetStartedButtonProps) {
  return (
    <button
      onClick={onClick}
      className="mt-6 bg-[#53104e] hover:bg-[#D0ECEA] text-white font-medium px-6 py-2 rounded-full transition"
    >
      Get Started
    </button>
  );
}
