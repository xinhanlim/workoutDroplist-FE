import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'


export default function WorkoutPage() {
    return (
        <>
            <Navbar />
            <Header
                image="/workout3.jpg"
                text='WORKOUT'
                titleColor='#F5F5F7'
            />
        </>
    )
}