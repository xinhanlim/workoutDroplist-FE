import React, { useState, useEffect } from "react";

export default function MyClock() {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000); // update every second
        return () => clearInterval(interval);
    }, []);

    const formattedTime = value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const formattedDay = value.toLocaleDateString([], { weekday: "long" });
    const formattedDate = value.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" });

    return (
        <div className="flex mx-4 px-4 pb-4 gap-10 justify-between sm:px-8 sm:justify-start">
            <h1 className="text-[#282828] font-bold text-xl lg:text-2xl">{formattedTime},</h1>
            <h1 className="text-[#282828] font-bold text-xl  lg:text-2xl">{formattedDay},</h1>
            <h1 className="text-[#282828] font-bold text-xl lg:text-2xl">{formattedDate}</h1>

        </div>
    );
}