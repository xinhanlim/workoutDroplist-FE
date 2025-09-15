import ExerciseEdit from './ExerciseEdit'
import { useState } from 'react'

export default function ExerciseCard({
    exercise,
    onEdit,
    onDelete,
}
) {

    const {name, muscleGroup, unit, difficulty, createdBy } = exercise;
    const isSystem = String(createdBy).toLowerCase() === 'system';
    const creator = isSystem ? "System" : "You"
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    const handleEdit = () => {
        setIsEdit(true)
    }

    const handleDelele = () => {
        setIsDelete(true)
    }


    return (
        <>
            <div className="flex flex-col border border-[#282828] bg-white p-4 shadow-sm hover:shadow-md transition-shadow ">
                <h3 className="font-semibold py-2 text-[#282828]">Name: {name}</h3>
                <h3 className="font-semibold py-2 text-[#282828]">Muscle Group: {muscleGroup}</h3>
                <h3 className="font-semibold py-2 text-[#282828]">Units: {unit}</h3>
                <h3 className="font-semibold py-2 text-[#282828]">Difficulty: {difficulty}</h3>
                <h3 className="font-semibold py-2 text-[#282828]/50">Created By: {creator}</h3>

                {!isSystem && (
                    <div className="flex flex-row gap-4">
                        <button onClick={handleEdit}
                            className="flex-1 px-3 py-1.5 text-sm ring-1 ring-[#282828] bg-[#282828] text-[#F5F5F7] hover:bg-[#4d4d4d] transition-colors"
                            type="button" >Edit Exercise
                        </button>

                        <button onClick={handleDelele}
                            className="flex-1 px-3 py-1.5 text-sm ring-1 ring-[#282828] bg-[#F5F5F7] text-[#282828] hover:bg-[#4d4d4d] transition-colors"
                            type="button" >Delete Exercise
                        </button>

                        <ExerciseEdit
                            open={isEdit}
                            exercise={exercise}                 
                            onClose={() => setIsEdit(false)}
                            onUpdated={(updated) =>{
                                onEdit(updated),
                                setIsEdit(false)
                            }}
                        />
                </div>
                )

                }


            </div>
        </>
    )

}