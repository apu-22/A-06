"use client";

import { WorkoutContext } from "@/context/WorkoutContext";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import WorkoutList from "@/components/myplan/WorkoutList";
import { toast } from "react-toastify";

export default function MyplanPage() {
  const [activeTab, setActiveTab] = useState("today"); // "today" | "saved"
  const [sortBy, setSortBy] = useState("duration");
  const [loading, setLoading] = useState(true);

  const { plan = [], setPlan, saved = [], setSaved } = useContext(WorkoutContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Active items based on current tab
  const rawItems = activeTab === "today" ? plan : saved;

  // Live metrics summary calculated based on active tab
  const totalExercises = rawItems.length;
  const totalMinutes = rawItems.reduce(
    (acc, curr) => acc + (Number(curr.duration) || 0),
    0
  );
  const totalCalories = rawItems.reduce(
    (acc, curr) => acc + (Number(curr.caloriesBurned) || 0),
    0
  );

  // Sorting
  const items = [...rawItems].sort((a, b) => {
    if (sortBy === "duration") {
      return (Number(b.duration) || 0) - (Number(a.duration) || 0);
    }
    if (sortBy === "calories") {
      return (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0);
    }
    if (sortBy === "rating") {
      return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    }
    return 0;
  });

  // Action handlers
  const handleRemove = (id, index) => {
    const targetItem = rawItems.find((item, i) => item.id === id || i === index);
    const itemName = targetItem?.name || "Workout";

    if (activeTab === "today") {
      setPlan((prev) => prev.filter((item, i) => item.id !== id && i !== index));
      toast.info(`"${itemName}" removed from Today's Plan`);
    } else {
      setSaved((prev) => prev.filter((item, i) => item.id !== id && i !== index));
      toast.info(`"${itemName}" removed from Saved workouts`);
    }
  };

  const handleToggleDone = (id, index) => {
    let nowDone = false;
    let workoutName = "Workout";

    setPlan((prev) =>
      prev.map((item, i) => {
        if (item.id === id || i === index) {
          nowDone = !item.done;
          workoutName = item.name || workoutName;
          return { ...item, done: nowDone };
        }
        return item;
      })
    );

    if (nowDone) {
      toast.success(`"${workoutName}" marked as done! 🎉`);
    } else {
      toast.info(`"${workoutName}" marked as not done`);
    }
  };

  return (
    <main className="w-full min-h-[calc(100vh-140px)] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase mb-2">
            MY PLAN
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics Summary Row  */}
        <div className="rounded-2xl bg-[#111317] border border-zinc-800/80 p-6 sm:p-8 mb-8 shadow-xl">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-zinc-400 mb-1">
                Exercises
              </p>
              <p className="text-4xl sm:text-5xl font-black text-[#a3e635]">
                {totalExercises}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm font-semibold text-zinc-400 mb-1">
                Minutes
              </p>
              <p className="text-4xl sm:text-5xl font-black text-white">
                {totalMinutes}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm font-semibold text-zinc-400 mb-1">
                Calories
              </p>
              <p className="text-4xl sm:text-5xl font-black text-white">
                {totalCalories}
              </p>
            </div>
          </div>
        </div>

        {/* Filter & Controls Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          {/* Segmented Tabs (Today's Plan / Saved) */}
          <div className="rounded-xl bg-[#111317] border border-zinc-800/80 p-1 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "today"
                  ? "bg-[#1c222b] text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "saved"
                  ? "bg-[#1c222b] text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-zinc-400 font-medium">
              Sort By
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-xl bg-[#111317] border border-zinc-800 pl-3.5 pr-8 py-2 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-zinc-600 cursor-pointer"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-zinc-400">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area*/}
        {loading ? (
          <div className="w-full py-24 text-center text-zinc-400 text-sm font-medium">
            Loading workouts…
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-800/80 py-20 sm:py-28 px-6 text-center flex flex-col items-center justify-center my-6 bg-[#0d0f12]/40">
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-2">
              NOTHING HERE YET
            </h2>
            <p className="text-zinc-400 text-sm mb-6 max-w-sm">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          /* Workout Cards List Component */
          <WorkoutList
            items={items}
            activeTab={activeTab}
            onToggleDone={handleToggleDone}
            onRemove={handleRemove}
          />
        )}
      </div>
    </main>
  );
}