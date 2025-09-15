import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import useJwt from '../utils/UserStore'
import Header from '../components/Header'
import ExerciseDialog from '../components/ExerciseDialog'
import ExerciseCard from '../components/ExerciseCard'
import ExerciseGrp from '../components/ExerciseGrp'


export default function ExercisePage({ onEdit }) {

    // so i need to get the exercise from the database that the user create based on their id and the system created.

    const [exercises, setExercises] = useState([]);
    const [isActivitiesGroup, setActivitiesGroup] = useState('all');
    const [isOpen, setIsOpen] = useState(false);
    const { getJwt } = useJwt();

    const handleEdit = (updated) => {
        setExercises((prevArray) => (
            prevArray.map((p) => (p._id === updated._id ? { ...p, ...updated } : p)
            )
        ))
    }

    // API to get the exercise created by system and based on user JWT.
    const getExercise = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const token = getJwt();
            console.log(token);
            const response = await axios.get(apiUrl + '/api/users/exercise',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setExercises(response.data);
            console.log(response);
        } catch (e) {
            console.error(e);
        }

    }

    useEffect(() => {
        getExercise()
    }, [])



    // For filteration tabs
    const groups = ['all', 'core', 'arms', 'legs'];
    // for exercise cards
    const filterGrps = isActivitiesGroup === 'all' ? exercises : exercises.filter(ex => (ex.muscleGroup || "").toLowerCase() === isActivitiesGroup);

    return (
        <>
            <Navbar />
            <Header
                image="/dumbbell.jpg"
                text='Exercise'
                titleColor='#F5F5F7'
            />
            <div className="bg-[#f5f5f7] flex flex-col h-screen ">
                {/* Exercise Tabs 'ALL'，'CORE','ARMS',‘LEGS' + ADD EXERCISE BUTTON */}

                <div className="flex px-4 py-4 gap-4 shadow-sm border text-2xl w-full justify-between ring-1">
                    {/* EXERCISE TABS */}
                    <div className="flex flex-row px-2 justify-center gap-4 ">
                        <ExerciseGrp
                            groups={groups}
                            value={isActivitiesGroup}
                            onChange={setActivitiesGroup}
                            className="px-4 py-2"
                        />
                    </div>


                    {/* EXERCISE BUTTON */}
                    <button type="submit" className="bg-[#282828] px-4 py-2 text-sm md:text-lg text-[#f5f5f7] cursor-pointer hover:bg-[#4d4d4d]" onClick={() => setIsOpen(true)}>
                        + EXERCISE </button>
                </div>

                {/* Exercise Card Area */}
                <div className="w-full h-full">
                    <div className="grid grid-cols-1 md:grid-cols-4 border ">
                        {filterGrps.map((fg) => (
                            <ExerciseCard
                                key={fg._id}
                                exercise={fg}
                                onEdit={handleEdit}
                            />
                        ))}

                    </div>
                    {filterGrps.length === 0 && (
                        <div className="p-8 text-center text-[#282828]/50">No exercises in this group yet.</div>
                    )}
                </div>

                {/* For + Modal Opening */}
                {isOpen && (
                    <ExerciseDialog
                        open={isOpen}
                        onClose={() => {
                            setIsOpen(false);
                            getExercise();
                        }
                        }
                    />
                )}
            </div>





        </>
    )
}