"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WorkoutContext } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan = [], saved = [] } = useContext(WorkoutContext);

  const isWorkouts = pathname === "/" || pathname === "/workouts";
  const isMyPlan =
    pathname === "/myplan";

  return (
    <header className="w-full bg-[#0a0a0a] border-b border-zinc-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="FITLOG Logo"
            width={28}
            height={28}
            className="object-contain"
            priority
          />
          <span className="text-white font-extrabold text-lg tracking-wider uppercase">
            FITLOG
          </span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              isWorkouts
                ? "bg-[#19270e] text-[#a3e635]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/myplan"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              isMyPlan
                ? "bg-[#19270e] text-[#a3e635]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-5 sm:gap-6">
          <Link
            href="/myplan"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#a3e635] text-black font-bold text-xs flex items-center justify-center">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/myplan"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <span>Saved</span>
            <span className="w-5 h-5 rounded-full bg-[#1c1c1c] border border-zinc-700/80 text-zinc-300 text-xs font-semibold flex items-center justify-center">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
