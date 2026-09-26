"use client";
import React, { useState, createContext } from "react";

export const WorkoutContext = createContext({});

export default function WorkoutProvider({children}) {
    const [plan, setPlan] = useState([]);
    const [saved, setSaved] = useState([]);
    
    const sharedData={
        plan,
        setPlan,
        saved,
        setSaved,
    }
    return (
        <WorkoutContext.Provider value={sharedData}>
            {children}
        </WorkoutContext.Provider>
    )
}