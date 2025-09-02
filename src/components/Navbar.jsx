import React from 'react'
import { Link, useLocation } from 'wouter'
import useJwt from '../utils/UserStore'
import { toast } from 'react-toastify'


export default function Navbar() {

    const [location, setLocation] = useLocation();
    const { getJwt, clearJwt } = useJwt();
    const jwt = getJwt();
    // navbar so when login want the login/regiser button to dissappear
    // when profile page, login/register page dissappear, but with a hello id - tag to a jwt for security?
    //condition rendering vs state management?

    const handleLogout = () => {
        clearJwt(),
            setLocation('/')
            toast.info("You Have Logout Successfully")
    }

    return (
        <>
            {jwt ? (
                <div className="fixed top-0 left-0 flex w-screen items-center justify-between px-4 py-4 bg-[#F5F5F7]">
                    <h1 className="text-xl font-bold "><Link href="/">WOUTG</Link></h1>
                    <div className="flex gap-4 bg-[#282828] rounded-lg hover:bg-[#4d4d4d] ">
                        <button className=" text-md text px-4 py-2" type="submit">
                            <Link href="/api/users/login" className="text-[#F5F5F7]" onClick={handleLogout}>Logout</Link>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="fixed top-0 left-0 flex w-screen items-center justify-between px-4 py-4 bg-[#F5F5F7]">
                    <h1 className="text-xl font-bold "><Link href="/">WOUTG</Link ></h1 >
                    <div className="flex gap-4 bg-[#282828] rounded-lg hover:bg-[#4d4d4d] ">
                        <button className=" text-md text px-4 py-2" type="submit">
                            <Link href="/api/users/login" className="text-[#F5F5F7]">Login/Register</Link>
                        </button>
                    </div>
                </div >
            )
            }
        </>
    )
}