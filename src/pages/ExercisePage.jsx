import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

export default function ExercisePage() {

    const [exercises,setExercises] = useState([])


    // so i need to get the exercise from the database that the user create based on their id and the system created.
    const getExercise = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const token = localStorage.getItem('jwt');
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
    useEffect(()=>{
        getExercise()
    },[])

    return (
        <>
            <Navbar />
            <div className="bg-[#F5F5F7] py-[72px] h-full">
                    <ul className="">
                        {exercises.map((ex) => (
                            <li key={ex._id}>
                                {ex.name} <span className="text-sm text-gray-500">({ex.createdBy})</span>
                            </li>
                        ))}
                    </ul>
                
            </div>



        </>
    )
}