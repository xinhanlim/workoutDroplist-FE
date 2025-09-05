import React from 'react';
import Navbar from '../components/Navbar';
import WelcomeHeader from '../components/WelcomeHeader';
import MyClock from '../components/Clock';


//for profile page i will need to display the following things:
//last workout, ability to add exercises/workout/ calendar
//edit profile, edit exercises /workout , add to calendar
//delete account

export default function ProfilePage() {


    return (
        <>
            <Navbar />
            <div className="bg-[#F5F5F7] h-screen">
                <div className="bg-[#F5F5F7] py-[72px] h-screen">
                    <div className="flex flex-wrap mx-auto ">
                        <WelcomeHeader />
                        <MyClock/>
                    </div>

                </div>

            </div>
        </>
    )
}