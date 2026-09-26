"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function WorkoutList({ items, activeTab, onToggleDone, onRemove }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          className="rounded-2xl bg-[#111317] border border-zinc-800/80 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-zinc-700/80 transition-all shadow-md group"
        >
          <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
            <div className="relative w-24 sm:w-32 h-16 sm:h-20 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name || "Workout"}
                  fill
                  sizes="128px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                  No image
                </div>
              )}
            </div>

            {/* Workout Info */}
            <div>
              <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight leading-snug group-hover:text-[#ccff00] transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5 mb-2">
                {item.equipment || "Bodyweight"}
              </p>

              {/* Metadata Icons Row */}
              <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium">
                {/* Duration */}
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{item.duration || 0} min</span>
                </div>

                {/* Calories */}
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                  </svg>
                  <span>{item.caloriesBurned || 0} kcal</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  <span>{item.rating || 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800/60">
            <Link
              href={`/workouts/${item.id}`}
              className="rounded-xl border border-zinc-700/80 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800/80 transition-colors"
            >
              View Details
            </Link>

            {/* Mark as Done*/}
            {activeTab === "today" && (
              <button
                type="button"
                onClick={() => onToggleDone(item.id, index)}
                className={`rounded-xl px-4 py-2 text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95 ${
                  item.done
                    ? "bg-zinc-800 text-zinc-300 border border-zinc-700"
                    : "bg-[#ccff00] hover:bg-[#b5e600] text-black"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{item.done ? "Done" : "Mark as Done"}</span>
              </button>
            )}

            {/* Remove Button  */}
            <button
              type="button"
              onClick={() => onRemove(item.id, index)}
              className="text-zinc-500 hover:text-red-400 p-2 rounded-lg transition-colors cursor-pointer hover:bg-red-500/10"
              title="Remove"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
