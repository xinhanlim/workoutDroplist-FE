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
        <div className="flex flex-col items-end gap-1 max-[1655px]:flex-row max-[1623px]:items-center max-[1623px]:justify-end flex-1 min-w-[320px] px-4 pt-4">
            <h1 className="text-[#282828] w-full px-1 text-center 2xl:text-right font-bold text-xl md:text-2xl  lg:text-4xl">{formattedTime},</h1>
            <h1 className="text-[#282828] w-full px-1 text-center  2xl:text-right font-bold text-xl md:text-2xl  lg:text-4xl">{formattedDay},</h1>
            <h1 className="text-[#282828] w-full px-1 text-center 2xl:text-right  font-bold text-xl md:text-2xl  lg:text-4xl">{formattedDate}</h1>

        </div>
    );
}