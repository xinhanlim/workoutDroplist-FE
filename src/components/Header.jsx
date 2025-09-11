import React from 'react'


export default function Header({image, text, titleColor}) {

    return (
        <>
            <div className="relative pt-[72px] min-w-[375px] overflow-hidden border-[#282828] ">
                <img src={image} alt={text} className="absolute z-10 inset-0 w-full h-full object-cover" />
                <div className="absolute z-20 inset-0 bg-[#282828]/50 pointer-events-none"></div>
                <div className="relative z-30 py-8 flex justify-center items-center sm:py-10">
                    <h1 className={`px-4 py-4 font-bold tracking-tighter text-7xl sm:text-9xl ${titleColor}`} style={{ color: titleColor }}>{text}</h1>
                </div>
            </div>
        </>
    )
}