"use client";

import Image from "next/image";

export default function Banner() {
    const handleScrollToLibrary = (e) => {
        e.preventDefault();
        const element = document.getElementById("library");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", "#library");
        }
    };
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            <div className="relative overflow-hidden rounded-3xl bg-[#111317] border border-zinc-800/80 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-8">
                    {/* left coloum */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
                        <span className="text-xs sm:text-sm font-bold tracking-widest text-[#a3e635] uppercase mb-4">
                            WORKOUT LIBRARY
                        </span>

                        <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-white uppercase leading-[1.08] mb-6">
                            TRAIN WITH INTENT. LOG EVERY SET.
                        </h1>

                        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                            into today&apos;s plan, and watch the week&apos;s work add up.
                        </p>
                        
                        <a
                            href="#library"
                            onClick={handleScrollToLibrary}
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lime-500/20 active:scale-95 cursor-pointer"
                        >
                            <span>BROWSE WORKOUTS</span>
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
                                    strokeWidth="2.5"
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </a>
                    </div>

                    {/* Right Column: Hero Image */}
                    <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
                        <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[440px] aspect-square flex items-center justify-center">
                            <Image
                                src="/banner.png"
                                alt="Gym Machine Trainer"
                                width={500}
                                height={500}
                                className="w-full h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}