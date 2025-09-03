import React from 'react';
import Navbar from '../components/Navbar';
import useJwt from '../utils/UserStore'


//for profile page i will need to display the following things:
//last workout, ability to add exercises/workout/ calendar
//edit profile, edit exercises /workout , add to calendar
//delete account

export default function ProfilePage(){

    const { decodeJwtDisplayName }  = useJwt();
    const displayName = decodeJwtDisplayName();
    return (
        <>
        <Navbar/>
        <div className="bg-[#F5F5F7] h-screen">
            <div className="bg-[#F5F5F7] ">
                <h1 className=" py-[72px]">Hello {displayName}</h1>
            </div>
        
        </div>
        </>
    )
}