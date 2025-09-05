import React from 'react';
import QuoteOfTheDay from './QuoteOfDay';
import useJwt from '../utils/UserStore'

export default function WelcomeHeader() {
    const { decodeJwtDisplayName } = useJwt();
    const displayName = decodeJwtDisplayName();
    return (
        <>
            <div className="py-4 px-4 mt-4 mx-4 sm:px-8">   
                <h1 className="text-5xl flex-1 font-bold text-[#282828]">- Hello {displayName}!</h1>
                <h1 className="text-5xl pt-2 text-gray-400 ">"<QuoteOfTheDay />"</h1>
            </div>
        </>
    )
}