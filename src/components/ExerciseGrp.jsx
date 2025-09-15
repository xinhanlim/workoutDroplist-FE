import React, { Fragment } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

export default function ExerciseGrp({
    groups = ["All", "Core", "Arms", "Legs"],
    value,
    onChange,
    className = "", }) {

    return (
        <>
            <Listbox value={value} onChange={onChange} >
                <ListboxButton className={clsx(
                    'relative w-full bg-[#282828] py-2 pl-4 pr-10 text-left text-sm text-[#f5f5f7] uppercase ',
                    'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25 '
                )}>{value}
                <ChevronDownIcon
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#f5f5f7] "
                    aria-hidden="true"
                />
                </ListboxButton>
                <ListboxOptions anchor="bottom" transition  className={clsx(
                        'w-(--button-width) bg-[#282828] pl-4  py-4 [--anchor-gap:--spacing(1)] focus:outline-none uppercase space-y-8 scroll-py-2',
                        'transition duration-100 ease-in data-leave:data-closed:opacity-0'
                    )}>
                    {groups.map((g) => (
                        <ListboxOption key={g} value={g} className=" data-focus:underline bg-[#282828] text-[#f5f5f7] flex gap-4">
                            {g}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </>
    )


}

