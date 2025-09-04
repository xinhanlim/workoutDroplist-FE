import React, { useState, useEffect } from "react";

export default function MyClock() {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000); // update every second
        return () => clearInterval(interval);
    }, []);

    const formattedTime = value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const formattedDay = value.toLocaleDateString([], { weekday: "long"});
    const formattedDate = value.toLocaleDateString([], {year: "numeric",month: "short",day: "numeric"});

    return (
        <div className="flex flex-row pt-4 px-4 w-full justify-evenly lg:flex-col  sm:flex-1 sm:justify-start sm:gap-4 md:mt-4">
            <h1 className="text-[#282828] w-full px-1 text-center lg:text-right font-bold text-2xl md:text-2xl lg:text-4xl">{formattedTime},</h1>
            <h1 className="text-[#282828] w-full px-1 text-center lg:text-right font-bold text-2xl md:text-2xl  lg:text-4xl">{formattedDay},</h1>
            <h1 className="text-[#282828] w-full px-1 text-center lg:text-right font-bold text-2xl md:text-2xl  lg:text-4xl">{formattedDate}</h1>
            
        </div>
    );
}