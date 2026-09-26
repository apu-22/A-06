import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const getWorkoutById = async (id) => {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (data?.error) {
      return null;
    }
    return data;
  } catch (err) {
    console.error("Error fetching workout details:", err);
    return null;
  }
};

export async function generateMetadata({ params }) {
  const { cardID } = await params;
  const workout = await getWorkoutById(cardID);

  if (!workout) {
    return {
      title: "Workout Not Found - FITLOG",
    };
  }

  return {
    title: `${workout.name} - FITLOG`,
    description: workout.description,
  };
}

export default async function WorkoutDetailsPage({ params }) {
  const { cardID } = await params;
  const workout = await getWorkoutById(cardID);

  if (!workout) {
    notFound();
  }

  return (
    <div className="w-full min-h-[calc(100vh-140px)] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/*Workout Image */}
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>

          {/*Workout Details */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black uppercase tracking-tight text-white leading-tight mb-3">
              {workout.name}
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-5">
              {workout.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              {workout.muscleGroups?.map((group) => (
                <span
                  key={group}
                  className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#ccff00] text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            <div className="rounded-2xl bg-[#111317] border border-zinc-800/80 p-5 sm:p-6 mb-8 shadow-md">
              <div className="flex flex-col divide-y divide-zinc-800/70 text-sm">
                <div className="flex items-center justify-between py-2.5 first:pt-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    EQUIPMENT
                  </span>
                  <span className="font-medium text-white">
                    {workout.equipment}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    DIFFICULTY
                  </span>
                  <span className="font-medium text-white">
                    {workout.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    SETS
                  </span>
                  <span className="font-medium text-white">{workout.sets}</span>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    REPS
                  </span>
                  <span className="font-medium text-white">{workout.reps}</span>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    DURATION
                  </span>
                  <span className="font-medium text-white">
                    {workout.duration} min
                  </span>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    CALORIES
                  </span>
                  <span className="font-medium text-white">
                    {workout.caloriesBurned} kcal
                  </span>
                </div>

                <div className="flex items-center justify-between py-2.5 last:pb-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    RATING
                  </span>
                  <span className="font-medium text-white">{workout.rating}</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            {workout.instructions && workout.instructions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-base font-black tracking-wider text-white uppercase mb-4">
                  INSTRUCTIONS
                </h2>
                <ol className="list-decimal list-outside ml-5 space-y-2.5 text-zinc-300 text-sm leading-relaxed marker:text-zinc-500">
                  {workout.instructions.map((step, idx) => (
                    <li key={idx} className="pl-1">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold text-sm transition-all duration-200 shadow-md hover:shadow-lime-500/20 active:scale-95 cursor-pointer"
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Add to today&apos;s plan</span>
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent hover:bg-zinc-800/80 border border-zinc-700/80 text-white font-bold text-sm transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-zinc-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span>Save for later</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
