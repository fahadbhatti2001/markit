import React, { useState } from 'react';
import { UseUserAuth } from '@/Components'
import Link from 'next/link';
import { useRouter } from 'next/router';

export const ProfileButton = () => {

    let { user, logOut } = UseUserAuth()

    let [panel, setPanel] = useState(false)

    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logOut();
            router.push8("/");
        } catch (error) {
            console.log("error");
        }
    };

    return (
        <div className="relative flex items-center">
            <button onClick={() => setPanel(!panel)} className="mx-4 border-2 border-primary-2 rounded-full" type="button">
                <img src={"/images/profile.jpg"} className="object-cover w-10 h-10 rounded-full bg-black" />
            </button>
            {
                panel ?
                    <div className="z-10 xl:w-[24vw] lg:w-[28vw] md:w-[32vw] sm:w-[40vw] w-[80vw] rounded-lg inline-block bg-white shadow absolute right-0 top-12">
                        <div className="flex items-center justify-between gap-4 p-4 border-b">
                            <div className="flex items-center gap-4">
                                <div className="text-left">
                                    <h1 className="font-PoppinsMedium text-primary-4 text-base">
                                        Admin
                                    </h1>
                                    <p className="font-PoppinsRegular text-primary-4 text-xs">
                                        admin@gmail.com
                                    </p>
                                </div>
                            </div>
                            <button onClick={handleLogout} type="button">
                                <img src={"/images/LogOut.svg"} className="w-5 h-5" />
                            </button>
                        </div>
                        <Link onClick={() => setPanel(!false)} href="/admin" className="flex items-center justify-between gap-4 px-4 py-3 border-t border-t-zinc-100 rounded-b-md hover:text-primary-0 transition ">
                            <div className="text-left">
                                <h1 className="font-PoppinsRegular text-primary-4 text-base">
                                    Dashboard
                                </h1>
                            </div>
                        </Link>
                        <Link onClick={() => setPanel(!false)} href="/map" className="flex items-center justify-between gap-4 px-4 py-3 border-t border-t-zinc-100 rounded-b-md hover:text-primary-0 transition ">
                            <div className="text-left">
                                <h1 className="font-PoppinsRegular text-primary-4 text-base">
                                    Set Map
                                </h1>
                            </div>
                        </Link>

                    </div>
                    :
                    null
            }
        </div>
    );
};
