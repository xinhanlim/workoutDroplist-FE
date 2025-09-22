import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";



export default function WorkoutSearch(
    { value,
        onChange,
    }
) {
    return (
        <>
            <div className="relative min-w-[240px] flex flex-1 pl-2">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-5 top-3 h-5 w-5 text-gray-500" />
                <input
                    type="search"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-10 py-2 border border-[#282828]
        
                    appearance-none
                    [&::-webkit-search-cancel-button]:appearance-none
                    [&::-webkit-search-decoration]:hidden
                    [&::-webkit-search-results-button]:hidden
                    [&::-webkit-search-results-decoration]:hidden"
                    placeholder="Search workouts…"
                />

                {value && (
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        aria-label="Clear search"
                        className="absolute right-2 top-2.5 h-5 w-5  text-[#282828]/70 cursor-pointer"
                    >
                        <XMarkIcon className="h-5 w-5 text-gray-600" />
                    </button>
                )}
            </div >
        </>
    )
}