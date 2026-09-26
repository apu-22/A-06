"use client";

import React, { useContext } from 'react'
import { WorkoutContext } from '@/context/WorkoutContext'
import { toast } from 'react-toastify'

export default function SaveForLaterBtn({ workout }) {
    const { saved, setSaved } = useContext(WorkoutContext);
    const handleSaveForLater = () => {
        const isAlreadySaved = saved.some((item) => item.id === workout.id);
        if (isAlreadySaved) {
            toast.warning(`"${workout.name}" is already saved for later!`);
            return;
        }
        setSaved((prev) => [...prev, workout]);
        toast.info(`"${workout.name}" saved for later!`);
    };
    return (
        <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent hover:bg-zinc-800/80 border border-zinc-700/80 text-white font-bold text-sm transition-all duration-200 active:scale-95 cursor-pointer"
            onClick={()=>handleSaveForLater()}
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
    )
}
