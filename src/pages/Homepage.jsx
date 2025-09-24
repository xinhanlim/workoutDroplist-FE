import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'wouter'
import QuoteOfTheDay from '../components/QuoteOfDay';

export default function Homepage() {
    return (
        <>
            <Navbar />
            <div className="fixed inset-0 z-10 overflow-hidden bg-[#F5F5F7]">
                <img src="/heroimgtogether.png" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none select-none pointer-events-none scale-[1.8]"></img>
                <div className="absolute inset-0 bg-[#282828]/25 backdrop-blur-[1px]"/>
                <div className="z-10 min-h-screen flex flex-col items-center justify-center space-y-5">
                    <h1 className="w-full px-5 mt-14 text-6xl text-balance break-words md:text-[260px] font-extrabold tracking-tight text-[#F5F5F7] drop-shadow-lg text-start md:text-center"> WORKOUT DROPLIST</h1>
                    <h1 className="w-full px-5 text-2xl text-balance break-words md:text-2xl font-extrabold tracking-tight text-[#F5F5F7]/80 drop-shadow-lg text-start md:text-center"><QuoteOfTheDay/></h1>
                    <div className="relative z-10 py-8">
                        <button className="text-md text px-4 py-3 bg-[#F5F5F7]" type="submit">
                            <Link href="/login" className="text-[#282828] font-bold ">START TODAY </Link>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}