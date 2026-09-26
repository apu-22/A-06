"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ planCount = 0, savedCount = 0 }) {
  const pathname = usePathname();

  const isWorkouts = pathname === "/" || pathname === "/workouts";
  const isMyPlan = pathname === "/my-plan" || pathname === "/plan";

  return (
    <header className="w-full bg-[#0a0a0a] border-b border-zinc-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
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

        {/* Center: Navigation Links */}
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
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              isMyPlan
                ? "bg-[#19270e] text-[#a3e635]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Plan & Saved Counters */}
        <div className="flex items-center gap-5 sm:gap-6">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#a3e635] text-black font-bold text-xs flex items-center justify-center">
              {planCount}
            </span>
          </Link>

          <Link
            href="/saved"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <span>Saved</span>
            <span className="w-5 h-5 rounded-full bg-[#1c1c1c] border border-zinc-700/80 text-zinc-300 text-xs font-semibold flex items-center justify-center">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}