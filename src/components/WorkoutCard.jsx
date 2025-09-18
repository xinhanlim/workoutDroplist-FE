import ExerciseEdit from './ExerciseEdit'
import { useState } from 'react'
import { toast } from "react-toastify";


export default function WorkoutCard({
    workout,
    exercises,
    onEdit,
    onDelete,
}
) {

    const { date, notes, sets=[], createdBy } = workout;
    const isSystem = createdBy.toLowerCase() === 'system';
    const creator = isSystem ? "System" : "You"
    const formattedDate = date ? new Date(date).toLocaleString() : "—";

    return (
        <>
            <div className="flex flex-col border border-[#282828] bg-[#F5F5F7] p-4 shadow-sm hover:shadow-md transition-shadow gap-0 justify-between min-h-[426px] ">
                <div>
                <h3 className="font-semibold py-2 text-[#282828]">Date: {formattedDate}</h3>
                <h3 className="font-semibold py-2 text-[#282828]">Notes: {notes}</h3>
                <div className="font-semibold py-2 text-[#282828]">Sets: </div>
                {sets.length === 0 ? (
                    <div className="text-sm text-[#282828]/60">No sets</div>
                ) : (
                    <ul className="divide-y divide-[#282828]/10">
                        {sets.map((s) => (
                            <li key={s._id} className="py-2 text-sm flex flex-wrap gap-x-4 gap-y-2 ">
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
                        className="flex-1 px-3 py-1.5 text-sm ring-1 ring-[#282828] bg-[#282828] text-[#F5F5F7] hover:bg-[#4d4d4d] transition-colors"
                        type="button" >Edit Workout
                    </button>

                    <button
                        className="flex-1 px-3 py-1.5 text-sm ring-1 ring-[#282828] bg-[#F5F5F7] text-[#282828] hover:bg-[#4d4d4d] transition-colors"
                        type="button" >Delete Workout
                    </button>
                </div>
                </div>
            ):(
                <div>
                 <h3 className="font-semibold py-2 text-[#282828]/50">Created By: {creator}</h3>
                 <div className="flex flex-row py-6"></div>
                 </div>
            )}
        </div >
        </>
    )

}