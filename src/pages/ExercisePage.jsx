import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import useJwt from '../utils/UserStore'
import Header from '../components/Header'
import ExerciseDialog from '../components/ExerciseDialog'

export default function ExercisePage() {

    // so i need to get the exercise from the database that the user create based on their id and the system created.

    const [exercises, setExercises] = useState([]);
    const [isActivitiesGroup, setActivitiesGroup] = useState('all');
    const [isOpen, setIsOpen] = useState(false);
    const { getJwt, decodeJwtId } = useJwt();
    const userId = decodeJwtId();

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
                <div className="flex px-4 py-4 gap-[72px] shadow-sm border-1 text-2xl w-full justify-center">
                    {/* EXERCISE TABS */}
                    <div className="flex flex-row flex-1 px-2 py-2 justify-center gap-[72px] h-full">
                        {groups.map(g =>
                            <button
                                key={g}
                                type="button"
                                onClick={() => setActivitiesGroup(g)}
                                className={
                                    isActivitiesGroup === g
                                        ? "font-bold text-[#282828] uppercase"
                                        : "text-gray-500 hover:text-[#111827] uppercase cursor-pointer"
                                }>- {g}
                            </button>
                        )}
                    </div>

                    {/* EXERCISE BUTTON */}
                    <button type="submit" className="bg-[#282828] px-4 py-2 text-[#f5f5f7] cursor-pointer hover:bg-[#4d4d4d]" onClick={() => setIsOpen(true)}>
                        + EXERCISE</button>
                </div>

                {/* Exercise Card Area */}
                <div className="w-full h-full">
                    <ul className="">
                        {filterGrps.map((ex) => (
                            <li key={ex._id}>
                                {ex.name} <span className="text-sm text-gray-500">({ex.createdBy})</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {isOpen && (
                    <ExerciseDialog
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        userId={userId}
                    />
                    )}


            </div>





        </>
    )
}