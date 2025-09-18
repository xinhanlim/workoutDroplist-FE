import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import WorkoutSearch from '../components/WorkoutSearch'
import WorkoutCard from '../components/WorkoutCard'
import useJwt from '../utils/UserStore'
import axios from 'axios'


export default function WorkoutPage() {

    const [query, setQuery] = useState("");
    const [workout, setWorkout] = useState([]);
    const [exercises, setExercises] = useState([]);
    const { getJwt } = useJwt();

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
            console.log(token);
            const response = await axios.get(apiUrl + '/api/users/workout',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log(response.data)
            setWorkout(response.data);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        getExercise(), getWorkout()
    }, []);

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
                <div className="w-full h-full">
                    <div className="grid grid-cols-1 md:grid-cols-4 ">
                        {workout.map((w) => (
                            <WorkoutCard
                                key={w._id}
                                workout={w}
                                exercises={exercises}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}
