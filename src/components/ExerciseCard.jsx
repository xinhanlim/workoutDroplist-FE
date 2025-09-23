import ExerciseEdit from './ExerciseEdit'
import { useState } from 'react'
import { toast } from "react-toastify";


export default function ExerciseCard({
    exercise,
    onEdit,
    onDelete,
}
) {

    const { name, muscleGroup, unit, difficulty, createdBy } = exercise;
    const isSystem = String(createdBy).toLowerCase() === 'system';
    const creator = isSystem ? "System" : "You"
    const [isEdit, setIsEdit] = useState(false)

    const handleEdit = () => {
        setIsEdit(true)
    }

    // here we dod this to create a toast box to ask for double confirmation. where the exercise._id is gotten from the exercisepage
    const handleDelele = async () => {
        toast.warn(
            <div>
                <p>Double Confirmation To Delete {name}? </p>
                <div className="flex mt-2 gap-4">
                    <button className=" bg-[#FF0000]/80 text-[#f5f5f7] w-[72px] hover:bg-[#FF0000]/90"
                        onClick={() => {
                            onDelete(exercise._id); 
                            toast.dismiss();
                        }}> Yes
                    </button>
                        <button
                            onClick={() => toast.dismiss()}
                            className="px-3 py-1 rounded bg-[#f5f5f7] text-[#282828]"
                        >
                            Cancel
                        </button>
                </div>
            </div>,
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
            }
        )
        console.log("_id ?? : " ,exercise._id)
    }


    return (
        <>
            <div className="flex flex-col border border-[#282828] bg-[#F5F5F7] p-4 shadow-sm hover:shadow-md transition-shadow min-h-[242px] ">
                <h3 className="font-semibold py-2 text-[#282828]">Name: {name}</h3>
                <h3 className="font-semibold py-2 text-[#282828]">Muscle Group: {muscleGroup}</h3>
                <h3 className="font-semibold py-2 text-[#282828]">Difficulty: {difficulty}</h3>
                <h3 className="font-semibold py-2 text-[#282828]/50">Created By: {creator}</h3>

                {!isSystem && (
                    <div className="flex flex-row gap-4 py-2">
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
                            onUpdated={(updated) => {
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