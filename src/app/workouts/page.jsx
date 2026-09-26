import WorkoutCard from "@/components/shared/workOutCard";

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

export default async function FitlogLibrary() {
  const fitlogLibrary = await getWorkoutCard();

  return (
    <section id="library" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 scroll-mt-20">
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
          <WorkoutCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}