import React, { useState } from 'react'
import { Link, useLocation } from 'wouter'
import useJwt from '../utils/UserStore'
import { toast } from 'react-toastify'

export default function Navbar() {

    const [location, setLocation] = useLocation();
    const { getJwt, clearJwt } = useJwt();
    const token = getJwt();
    const [isNavbarOpen, setNavbarOpen] = useState(false)
    // navbar so when login want the login/regiser button to dissappear
    // when profile page, login/register page dissappear, but with a hello id - tag to a jwt for security?
    //condition rendering vs state management?

    const isActive = (link) =>
        location === link ? "underline underline-offset-4 decoration-2 text-[#282828]" : "hover:underline underline-offset-4 text-[#282828]/80 hover:text-[#282828]"

    const handleLogout = () => {
        clearJwt(token),
            setLocation('/login')
        toast.info("You Have Logout Successfully")

    }

    return (
        <>
            <nav className="z-50 fixed top-0 left-0 flex w-screen items-center min-w-[360px] justify-between px-4 py-4 bg-[#F5F5F7] sm:px-8">
                <Link className="text-xl font-bold" href={token ? "/profile" : "/"} >WOUTG</Link>
                {/* Desktop */}
                {token ? (
                    <div className="hidden md:flex gap-8 items-center">
                            <Link className={`text-md ${isActive('/profile')}`} href="/profile">Overview</Link>
                            <Link className={`text-md ${isActive('/exercise')}`} href="/exercise">Exercise</Link>
                            <Link className={`text-md ${isActive('/workout')}`} href="/workout" >Workout</Link>
                            <button className=" gap-4 bg-[#282828]  hover:bg-[#4d4d4d] text-md text px-4 py-2" type="submit">
                                <Link href="/login" className="text-[#F5F5F7]" onClick={handleLogout}>Logout</Link>
                            </button>
                        </div>
                ) : (
                    <div className="hidden md:flex gap-4 bg-[#282828] hover:bg-[#4d4d4d] ">
                        <button className=" text-md text px-4 py-2" type="submit">
                            <Link href="/login" className="text-[#F5F5F7]">Login/Register</Link>
                        </button>
                    </div>
                )}
                {/* hamburger icon */}
                <button
                    className="md:hidden inline-flex items-center justify-center p-2 ring-1 ring-[#282828] text-[#282828]"
                    aria-expanded={isNavbarOpen}
                    onClick={() => {
                        setNavbarOpen(!isNavbarOpen)
                    }}>
                    {isNavbarOpen ? (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
                            <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
                            <path strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                        </svg>
                    )}

                </button>
            </nav>
            {isNavbarOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Dim background */}
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
                        onClick={() => setNavbarOpen(false)}
                        aria-hidden="true"
                    />
                    {/* Sheet under the navbar */}
                    <div className="absolute inset-x-0 top-0 bg-[#F5F5F7] shadow-sm">
                        {/* Spacer to avoid sitting under the fixed nav (h-14 = nav height) */}
                        <div className="h-screen items-center justify-center">
                            {token ? (
                                <>
                                    <div className="flex flex-col gap-12 items-center justify-center h-screen">
                                        <Link className={`text-md ${isActive('/profile')}`} href="/profile">Overview</Link>
                                        <Link className={`text-md ${isActive('/exercise')}`} href="/exercise">Exercise</Link>
                                        <Link className={`text-md ${isActive('/workout')}`} href="/workout" >Workout</Link>
                                        <button className=" gap-4 bg-[#282828]  hover:bg-[#4d4d4d] text-md text px-4 py-2" type="submit">
                                            <Link href="/login" className="text-[#F5F5F7]" onClick={handleLogout}>Logout</Link>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex gap-12 items-center justify-center h-screen ">
                                    <button className=" text-md text px-4 py-2 bg-[#282828]" type="submit">
                                        <Link href="/login" className="text-[#F5F5F7]">Login/Register</Link>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}