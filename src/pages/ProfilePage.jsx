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
                    <div className="grid md:grid-cols-2 my-8 mx-0 sm:mx-8 lg:grid-cols-3 ">
                        <div className="py-4 px-4 min-w-[375px] h-[500px] bg-amber-400">
                            <h1>Exercise</h1>
                        </div>
                        <div className="py-4 px-4 h-[500px] min-w-[375px] bg-amber-900">
                            <h1>Workout</h1>
                        </div>
                        <div className="py-4 px-4 h-[500px] min-w-[375px] bg-amber-600">
                            <h1>Last Workout</h1>
                        </div>
                        <div className="py-4 px-4 h-[500px] min-w-[375px] bg-amber-700">
                            <h1>Exercise</h1>
                        </div>
                        <div className="py-4 px-4 h-[500px] min-w-[375px] bg-amber-100">
                            <h1>Exercise</h1>
                        </div>
                        <div className="py-4 px-4 h-[500px] min-w-[375px] bg-amber-200">
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