import React from 'react'
import {Link} from 'wouter'


export default function NavbarWithoutLogin() {
    return (
        <>
            <div className="fixed top-0 left-0 flex w-screen items-center min-h-[72px] justify-between px-4 py-4 bg-[#F5F5F7]">
                <div className="">
                    <Link href='/' className="text-xl font-bold">WOUTG</Link>
                </div>
            </div>
            </>
            )
}