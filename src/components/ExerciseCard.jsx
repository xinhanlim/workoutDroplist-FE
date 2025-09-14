import React from 'react';


export default function ExerciseCard({
    exercise,
    onEdit,
    onDelete,
}
){

    const { _id, name, muscleGroup, unit, createdBy } = exercise;

    return (
        <>
            <div className="border border-[#282828]/10 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-[#282828]">{_id}</h3>
                <h3 className="font-semibold text-[#282828]">{name}</h3>
                <h3 className="font-semibold text-[#282828]">{muscleGroup}</h3>
                <h3 className="font-semibold text-[#282828]">{unit}</h3>
                <p className="mt-2 text-xs text-gray-400">{createdBy}</p>

            </div>
            </>
        )

}