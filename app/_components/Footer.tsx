"use client";

import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={twMerge(
      "h-[100px] text-slate-300 py-4 flex flex-col justify-center items-center text-sm", 
      theme === "dark" ? "bg-slate-900" : "bg-slate-800"
    )}>
      <p className="">
        Copyright &copy; 2023 MakanNow.
      </p>
      <p>
        {/* Made by Wilson with ❤️ */}
      </p>
    </footer>
  );
};