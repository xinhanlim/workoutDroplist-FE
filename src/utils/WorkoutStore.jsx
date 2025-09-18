import { atom, useAtom } from 'jotai'
import useJwt from './UserStore'
import { toast } from 'react-toastify'
import axios from 'axios'

const initialWorkout = []
export const workoutAtom = atom(initialWorkout)

export const useWorkout = () => {
    const [workout, setWorkout] = useAtom(workoutAtom)
    const { getJwt } = useJwt();

    const getAllWorkout = async () => {
        try {
            const jwt = getJwt();
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.get(apiUrl +
                '/api/users/workout'
                , {
                    headers: { Authorization: `Bearer ${jwt}` }
                })
        }catch(e){
            console.log(e)
        }
    setWorkout(response.data)
    }

    const createWorkout = async () => {
        try{
            const jwt = getJwt();
           const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(apiUrl +
                '/api/users/workout/new'
                , {
                    headers: { Authorization: `Bearer ${jwt}` }
                })

        }catch(e){
            console.log(e)
        }
    }

    const updateWorkout = async () => {
        try{

        }catch(e){
            console.log(e)
        }
    }

    const deleteWorkout = async () => {
        try{

        }catch(e){
            console.log(e)
        }
    }

    return { getAllWorkout, createWorkout, updateWorkout, deleteWorkout }
}

