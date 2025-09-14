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

    const creator = createdBy === "System" ? creatorId === "System" : exercise.createdBy === creatorId

    return (
        <>
            <div className="border border-[#282828]/10 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-[#282828]">{name}</h3>
                <h3 className="font-semibold text-[#282828]">{muscleGroup}</h3>
                <h3 className="font-semibold text-[#282828]">{unit}</h3>
                <h3 className="font-semibold text-[#282828]">{creator}</h3>


            </div>
        </>
    )

}