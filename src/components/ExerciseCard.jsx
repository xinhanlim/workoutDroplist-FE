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

    const handleEdit = () => {
        onEdit(exercise)
    }

    const handleDelele = () => {
        onDelete(_id)
    }


    return (
        <>
            <div className="flex flex-col border border-[#282828] bg-white p-4 shadow-sm hover:shadow-md transition-shadow ">
                <h3 className="font-semibold py-2 text-[#282828]">Name: {name}</h3>
                <h3 className="font-semibold py-2 text-[#282828]">Muscle Group: {muscleGroup}</h3>
                <h3 className="font-semibold py-2 text-[#282828]">Units: {unit}</h3>
                <h3 className="font-semibold py-2 text-[#282828]/50">Created By: {creator}</h3>

                <div className="flex flex-row gap-4">
                    <button onClick={handleEdit}
                        className="flex-1 px-3 py-1.5 text-sm ring-1 ring-[#282828] bg-[#282828] text-[#F5F5F7] hover:bg-[#4d4d4d] transition-colors"
                        type="button" >Edit Exercise
                    </button>

                    <button onClick={handleDelele}
                        className="flex-1 px-3 py-1.5 text-sm ring-1 ring-[#282828] bg-[#F5F5F7] text-[#282828] hover:bg-[#4d4d4d] transition-colors"
                        type="button" >Delete Exercise
                    </button>

                </div>

            </div>
        </>
    )

}