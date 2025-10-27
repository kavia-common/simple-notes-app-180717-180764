"use client";

import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder = "Search notes..." }: Props) {
  return (
    <div className="relative w-full">
      <input
        className="ocean-input pl-9"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search notes"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
    </div>
  );
}
