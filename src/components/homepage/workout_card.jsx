import Image from "next/image";

const getWorkoutCard = async () => {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching fitlog library:", err);
    return [];
  }
};

export default async function WorkoutCard() {
  const fitlogLibrary = await getWorkoutCard();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
          THE LIBRARY
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Grid of Workout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fitlogLibrary.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl bg-[#111317] border border-zinc-800/80 overflow-hidden hover:border-zinc-700/90 transition-all duration-300 flex flex-col shadow-lg"
          >
            {/* Exercise Image */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>

            {/* Card Content */}
            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
              <div>
                {/* Muscle Group Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {item.muscleGroups?.map((group) => (
                    <span
                      key={group}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#ccff00] text-black"
                    >
                      {group}
                    </span>
                  ))}
                </div>

                {/* Exercise Title */}
                <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight leading-snug line-clamp-1 group-hover:text-[#ccff00] transition-colors">
                  {item.name}
                </h3>

                {/* Equipment Subtitle */}
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 mb-4 line-clamp-1">
                  {item.equipment}
                </p>
              </div>

              {/* Bottom Metadata (Duration, Calories, Rating) */}
              <div className="border-t border-zinc-800/80 pt-3.5 flex items-center gap-5 text-xs sm:text-sm text-zinc-400 font-medium">
                {/* Duration */}
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-zinc-400"
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
                  <span>{item.duration} min</span>
                </div>

                {/* Calories */}
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-zinc-400"
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                  <span>{item.caloriesBurned} kcal</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-zinc-400"
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
                  <span>{item.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}