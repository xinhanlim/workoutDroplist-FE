import { useState } from 'react'
import { toast } from "react-toastify";
import WorkoutEdit from './WorkoutEdit';

export default function WorkoutCard({
    workout,
    exercises,
    onEdit,
    onDelete,
}
) {

    const { date, notes, sets = [], createdBy } = workout;
    const isSystem = createdBy.toLowerCase() === 'system';
    const creator = isSystem ? "System" : "You"
    const formattedDate = date ? new Date(date).toLocaleString() : "—";
    const [isEdit, setIsEdit] = useState(false)

    const handleEdit = () => {
        setIsEdit(true)
    }

    const handleDelele = async () => {
        toast.warn(
            <div>
                <p>Double Confirmation To Delete {name}? </p>
                <div className="flex mt-2 gap-4">
                    <button className=" bg-[#FF0000]/80 text-[#f5f5f7] w-[72px] hover:bg-[#FF0000]/90"
                        onClick={() => {
                            onDelete(workout._id);
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
        console.log("_id ?? : ", workout._id)
    }


    return (
        <>
            <div className="flex flex-col border border-[#282828] bg-[#F5F5F7] p-4 shadow-sm hover:shadow-md transition-shadow gap-0 justify-between min-h-[426px] min-w-[380px] ">
                <div>
                    <h3 className="font-semibold py-2 text-[#282828]">Date: {formattedDate}</h3>
                    <h3 className="font-semibold py-2 text-[#282828]">Notes: {notes}</h3>
                    <div className="font-semibold py-2 text-[#282828]">Sets: </div>
                    {sets.length === 0 ? (
                        <div className="text-sm text-[#282828]/60">No sets</div>
                    ) : (
                        <ul className="divide-y divide-[#282828]/10">
                            {sets.map((s, idx) => (
                                <li key={s._id || `${s.name ?? 'unnamed'}-${idx}`} className="py-2 text-sm flex flex-wrap gap-x-4 gap-y-2 ">
                                    <span><span className="text-[#282828]/60">Exercise: </span><b>{s.name}</b></span>
                                    <span><span className="text-[#282828]/60">Weight: </span> <b>{s.weight}</b></span>
                                    <span><span className="text-[#282828]/60">Reps: </span> <b>{s.reps}</b></span>
                                    <span><span className="text-[#282828]/60">RPE: </span> <b>{s.rpe}</b></span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {!isSystem ? (
                    <div>
                        <h3 className="font-semibold py-2 text-[#282828]/50">Created By: {creator}</h3>
                        <div className="flex flex-row gap-4 py-2">
                            <button
                                onClick={handleEdit}
                                className="flex-1 px-3 py-1.5 text-sm ring-1 ring-[#282828] bg-[#282828] text-[#F5F5F7] hover:bg-[#4d4d4d] transition-colors"
                                type="button" >Edit Workout
                            </button>

                            <button
                                onClick={handleDelele}
                                className="flex-1 px-3 py-1.5 text-sm ring-1 ring-[#282828] bg-[#F5F5F7] text-[#282828] hover:bg-[#4d4d4d] transition-colors"
                                type="button" >Delete Workout
                            </button>
                        </div>
                        <WorkoutEdit
                            open={isEdit}
                            workout={workout}
                            exercises={exercises}
                            onClose={() => setIsEdit(false)}
                            onUpdated={(updated) => {
                                onEdit(updated.result);
                                setIsEdit(false);
                            }}
                        />
                    </div>
                ) : (
                    <div>
                        <h3 className="font-semibold py-2 text-[#282828]/50">Created By: {creator}</h3>
                        <div className="flex flex-row py-6"></div>
                    </div>
                )}


            </div >
        </>
    )

}