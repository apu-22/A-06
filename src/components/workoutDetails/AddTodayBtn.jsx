"use client";

import React, { useContext } from 'react'
import { WorkoutContext } from '@/context/WorkoutContext'

export default function AddTodayBtn({ workout }) {

    const AddTodayProvider = useContext(WorkoutContext)
    const { plan, setPlan } = AddTodayProvider;

    const handleAddTodayPlan = () => {
        setPlan((prev) => [...prev, workout]);
    };

    return (
        <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold text-sm transition-all duration-200 shadow-md hover:shadow-lime-500/20 active:scale-95 cursor-pointer"
            onClick={()=>handleAddTodayPlan()}
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
    )
}