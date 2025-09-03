import React from 'react';
import Navbar from '../components/Navbar';
import useJwt from '../utils/UserStore'
import QuoteOfTheDay from '../components/QuoteOfDay';


//for profile page i will need to display the following things:
//last workout, ability to add exercises/workout/ calendar
//edit profile, edit exercises /workout , add to calendar
//delete account

export default function ProfilePage() {

    const { decodeJwtDisplayName } = useJwt();
    const displayName = decodeJwtDisplayName();
    return (
        <>
            <Navbar />
            <div className="bg-[#F5F5F7] h-screen">
                <div className="bg-[#F5F5F7] py-[72px] h-screen">
                    <div className="py-4 px-6 my-4 mx-4 min-w-[360px] max-w-[500px] min-h-[300px] max-h-[600px] border-2 rounded-lg border-gray-200 shadow-sm ">
                            <h1 className="text-4xl text-bold text-[#282828]">Hello {displayName}!</h1>
                            <h1 className="text-4xl pt-4 text-gray-400 ">"<QuoteOfTheDay />"</h1>



                    </div>

                </div>

            </div>
        </>
    )
}