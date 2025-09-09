import Navbar from '../components/Navbar';
import WelcomeHeader from '../components/WelcomeHeader';
import MyClock from '../components/Clock';
import { useLocation } from 'wouter';
import NavCards from '../components/NavCards'


//for profile page i will need to display the following things:
//last workout, ability to add exercises/workout/ calendar
//edit profile, edit exercises /workout , add to calendar
//delete account

export default function ProfilePage() {

    const [location, setLocation] = useLocation();


    return (
        <>
            <Navbar />
            <div className="bg-[#F5F5F7] py-[72px] h-full">
                <div className="flex flex-col">
                    <WelcomeHeader />
                    <MyClock />
                </div>
                <div className="grid md:grid-cols-2 my-8 mx-0 sm:mx-8 lg:grid-cols-2 ">
                    <NavCards
                        title="Exercises"
                        href="/exercise"
                        image="/dumbbell.jpg"
                        titleColor ="#282828"/>
                    <NavCards
                        title="Workout"
                        href="/workout"
                        image="/workout3.jpg"
                        titleColor ="#F5F5F7" />

            
                </div>
            </div>
        </>
    )
}