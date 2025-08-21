import React from 'react'
import { Link, useLocation } from 'wouter'


export default function Navbar() {
    return (
        <>
            <div className="flex w-screen items-center justify-between px-4 py-2 bg-[#F5F5F7]">
                <div className="">
                    <h1 className="text-xl font-bold">WorkOutGamified</h1>
                </div>
                    <div className="flex gap-4 bg-[#007AFF] text-[#F5F5F7] rounded-lg ">
                        <button className=" text-md text px-4 py-2" type="submit">
                            <Link href="/login" className={`${location === '/login' ? 'active' : ''}`}>Login/Register</Link>
                        </button>
                    </div>
                </div>
        </>
    )
}