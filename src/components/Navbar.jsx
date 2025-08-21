import React from 'react'
import { Link, useLocation } from 'wouter'


export default function Navbar() {
    return (
        <>
            <div className="fixed top-0 left-0 flex w-screen items-center justify-between px-4 py-4 bg-[#F5F5F7]">
                <div className="">
                    <h1 className="text-xl font-bold ">WOUTG</h1>
                </div>
                    <div className="flex gap-4 bg-[#007AFF] text-[#F5F5F7] rounded-lg ">
                        <button className=" text-md text px-4 py-2" type="submit">
                            <Link href="/api/users/login" className={`${location === '/api/users/login' ? 'active' : ''}`}>Login/Register</Link>
                        </button>
                    </div>
                </div>
        </>
    )
}