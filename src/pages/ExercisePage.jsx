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

            <div className="bg-[#f5f5f7] flex flex-col h-screen ">
                <div className="flex px-4 py-4 gap-[72px] shadow-sm border-1 text-2xl w-full justify-center">
                    <div className="flex flex-row flex-1 px-2 py-2 justify-center gap-[72px] h-full">
                        <h1>- ALL</h1>
                        <h1>-  CORE</h1>
                        <h1>- ARMS</h1>
                        <h1>- LEGS</h1>
                    </div>
                    <button type="submit" className="bg-[#282828] px-4 py-2 text-[#f5f5f7]"> + EXERCISE</button>
                </div>
                <div className="w-full h-full">
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