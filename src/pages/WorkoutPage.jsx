import React, { useState, useEffect, useMemo } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import WorkoutSearch from '../components/WorkoutSearch'
import WorkoutCard from '../components/WorkoutCard'
import useJwt from '../utils/UserStore'
import axios from 'axios'
import WorkoutDialog from '../components/WorkoutCreate'


export default function WorkoutPage() {

    const [query, setQuery] = useState("");
    const [workout, setWorkout] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const { getJwt } = useJwt();

    const handleEdit = (updated) => {
        setWorkout((prevArray) => (
            prevArray.map(w => (w._id === updated._id? { ...w, ...updated } : w))));
    };

    const getExercise = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const token = getJwt();
            const response = await axios.get(apiUrl + '/api/users/exercise',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setExercises(response.data);
        } catch (e) {
            console.error(e);
        }

    }
    const getWorkout = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const token = getJwt();
            const response = await axios.get(apiUrl + '/api/users/workout',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            setWorkout(response.data.sort((a, b) => {
                const createdSystem = String(a.createdBy).toLowerCase() === "system"
                const notSystem = String(b.createdBy).toLowerCase() === "system"
                if (createdSystem && !notSystem) return -1
                if (!createdSystem && notSystem) return 1
            })
            );
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        getExercise(), getWorkout()
    }, []);

    const q = query.trim().toLowerCase();
    const hasText = (t) => (t || "").toLowerCase().includes(q)

    const filterWorkout = workout.filter((w) => {
        const nameMatch = hasText(w.name);
        const notesMatch = hasText(w.notes);
        const setsMatch = Array.isArray(w.sets) && w.sets.some((s) => hasText(s.name));
        return nameMatch || notesMatch || setsMatch;
    })


    return (
        <>
            <Navbar />
            <Header
                image="/workout3.jpg"
                text='WORKOUT'
                titleColor='#F5F5F7'
            />
            <div className="bg-[#f5f5f7] flex flex-col h-screen ">
                <div className="flex flex-row px-2 justify-between gap-4 py-4 ">
                    <WorkoutSearch
                        value={query}
                        onChange={setQuery}
                    />
                    <button type="submit" className="bg-[#282828] px-4 py-2 text-sm md:text-lg text-[#f5f5f7] cursor-pointer hover:bg-[#4d4d4d]" onClick={() => setIsOpen(true)}>
                        + WORKOUT </button>
                </div>
                <div className="w-full">
                    {filterWorkout.length === 0 ? (
                        <div className="px-4 py-10 text-center text-[#282828]/70">
                            No workouts match “{query}”.
                        </div>) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                            {filterWorkout.map((w) => (
                                <WorkoutCard key={w._id} workout={w} exercises={exercises} onEdit={handleEdit}/>
                            ))}
                        </div>)}
                </div>
                {/* For + Modal Opening */}
                {isOpen && (
                    <WorkoutDialog
                        open={isOpen}
                        onClose={() => {
                            setIsOpen(false);
                            getWorkout();
                        }}
                        exercises={exercises}
                    />
                )}
            </div>

        </>
    )
}
