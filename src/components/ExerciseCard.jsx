import React from 'react';
import useJwt from '../utils/UserStore'

export default function ExerciseCard({
    exercise,
    creatorId,
    onEdit,
    onDelete,
    }
) {

    const { _id, name, muscleGroup, unit, createdBy } = exercise;

    let creator = createdBy !== "System" ? creatorId = "You" : "System"

    return (
        <>
            <div className="border border-[#282828]/10 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-[#282828]">Name: {name}</h3>
                <h3 className="font-semibold text-[#282828]">Muscle Group: {muscleGroup}</h3>
                <h3 className="font-semibold text-[#282828]">Units: {unit}</h3>
                <h3 className="font-semibold text-[#282828]/50">Created By: {creator}</h3>


            </div>
        </>
    )

}