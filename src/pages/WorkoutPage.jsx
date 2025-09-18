import React , {useState} from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import WorkoutSearch from '../components/WorkoutSearch'


export default function WorkoutPage() {

    const [query , setQuery ] = useState("")

    return (
        <>
            <Navbar />
            <Header
                image="/workout3.jpg"
                text='WORKOUT'
                titleColor='#F5F5F7'
            />
            <div className="bg-[#f5f5f7] flex flex-col h-screen ">
                <div className="flex flex-row px-2 justify-center gap-4 py-4 ">
                    <WorkoutSearch 
                        value = {query}
                        onChange = {setQuery}
                        className="pt-4"
                    />

                </div>
            </div>

        </>
    )
}
