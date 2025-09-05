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
            <div className="bg-[#F5F5F7]">
                <div className="bg-[#F5F5F7] py-[72px] h-full">
                    <div className="flex flex-col">
                        <WelcomeHeader />
                        <MyClock />
                    </div>
                    <div className="grid md:grid-cols-3 my-8 mx-4 sm:mx-8 gap-8">
                        <div className="py-4 px-4 h-[500px] rounded-2xl bg-amber-400">
                            <h1>Exercise</h1>
                        </div>
                        <div className="py-4 px-4 h-[500px] rounded-2xl bg-amber-400">
                            <h1>Workout</h1>
                        </div>
                        <div className="py-4 px-4 h-[500px] rounded-2xl bg-amber-400">
                            <h1>Last Workout</h1>
                        </div>
                        <div className="py-4 px-4 h-[500px] rounded-2xl bg-amber-400">
                            <h1>Exercise</h1>
                        </div>
                    </div>

                    <div>

                    </div>

                </div>

            </div>
        </>
    )
}