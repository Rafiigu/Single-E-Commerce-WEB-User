"use client";

import { ArrowLeft } from "lucide-react";

export const ArrowBackButton = () => {
  return (
    <button className="flex items-center justify-center">
      <ArrowLeft
        onClick={() => window.history.back()}
        className="cursor-pointer border-2 border-gray-300 px-2 py-1 mr-4 h-10 w-10"
      />
    </button>
  );
};
