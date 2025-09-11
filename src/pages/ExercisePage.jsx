import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import useJwt from '../utils/UserStore'
import Header from '../components/Header'

export default function ExercisePage() {

    const [exercises, setExercises] = useState([])
    const { getJwt } = useJwt();


    // so i need to get the exercise from the database that the user create based on their id and the system created.
    const getExercise = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const token = getJwt();
            console.log(token);
            const response = await axios.get(apiUrl + '/api/users/exercise/',
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

    return (
        <>
            <Navbar />
            <Header
                image="/dumbbell.jpg"
                text='Exercise'
                titleColor='#F5F5F7'
            />

            <div className="flex flex-row h-[1000px]">
                <div className="bg-[#F5F5F7] w-[320px] drop-shadow-md h-full">
                    <ul>
                        <li>
                            <h1>Hello</h1>
                        </li>
                    </ul>
                </div>
                <div className="bg-[#F5F5F7] w-full h-full">
                    <ul className="">
                        {exercises.map((ex) => (
                            <li key={ex._id}>
                                {ex.name} <span className="text-sm text-gray-500">({ex.createdBy})</span>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>





        </>
    )
}