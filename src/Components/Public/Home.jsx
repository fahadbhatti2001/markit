import React from 'react';

export const Home = () => {
    return (
        <>
            <div className="h-screen grid grid-cols-2">
                <div className="col-span-1 h-full flex justify-center items-center">
                    <h1 className="font-PoppinsBold text-7xl">
                        <span className="block"><span className="text-primary-0">let's</span> whip</span>
                        <span className="block">up <span className="text-primary-1 stroke-black">your</span></span>
                        <span className={"block text-primary-2"}>presence</span>
                    </h1>
                </div>
                <div className="col-span-1 h-full flex justify-center items-center">
                    <img src={"/images/VectorTwo.svg"} />
                </div>
            </div>
            <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#fff" d="M0,160L60,170.7C120,181,240,203,360,176C480,149,600,75,720,85.3C840,96,960,192,1080,218.7C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
                <div className="bg-white grid grid-cols-2 px-20">
                    <div className="col-span-1">
                        <img src={"/images/VectorThree.svg"} />
                    </div>
                    <div className="col-span-1 gap-2 flex flex-col justify-center items-center">
                        <h1 className="font-PoppinsSemiBold text-4xl text-center">
                            Trusted by <span className="text-primary-0">Thousands </span>Who <span className="text-primary-1">Choose</span> to Be <span className="text-primary-2">Productive</span>
                        </h1>
                        <div className="grid grid-cols-2">
                            <div className="col-span-1 p-6 w-full rounded-md text-center">
                                <h1 className="font-PoppinsBold text-6xl">
                                    100K+
                                </h1>
                                <p className="font-PoppinsMedium text-xl">
                                    Attendance Marked<br />Everyday
                                </p>
                            </div>
                            <div className="col-span-1 p-6 w-full rounded-md text-center">
                                <h1 className="font-PoppinsBold text-6xl">
                                    51K+
                                </h1>
                                <p className="font-PoppinsMedium text-xl">
                                    Productive <br />Users
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#fff" d="M0,160L60,170.7C120,181,240,203,360,176C480,149,600,75,720,85.3C840,96,960,192,1080,218.7C1200,245,1320,203,1380,181.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                </svg>
            </div>
            <div className="px-20 mb-20">
                <div className=" flex flex-col justify-center items-center gap-12">
                    <h1 className="font-PoppinsBold text-4xl text-center">
                        Features You Want
                    </h1>
                    <div className="grid grid-cols-4 gap-4 w-full">
                        <div className="bg-white col-span-1 p-6 shadow-md w-full rounded-md text-center flex flex-col justify-center items-center">
                            <img src={"/images/Attendance.svg"} className="bg-primary-2 w-20 h-20 p-4 rounded-full"/>
                            <p className="font-PoppinsBold text-xl my-4">
                                Attendance
                            </p>
                            <p className="font-PoppinsRegular text-base">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum facere beatae cumque, nam iure in, iusto dolores similique. 
                            </p>
                        </div>
                        <div className="bg-white col-span-1 p-6 shadow-md w-full rounded-md text-center flex flex-col justify-center items-center">
                            <img src={"/images/Reports.svg"} className="bg-primary-2 w-20 h-20 p-4 rounded-full"/>
                            <p className="font-PoppinsBold text-xl my-4">
                                Reports
                            </p>
                            <p className="font-PoppinsRegular text-base">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum facere beatae cumque, nam iure in, iusto dolores similique. 
                            </p>
                        </div>
                        <div className="bg-white col-span-1 p-6 shadow-md w-full rounded-md text-center flex flex-col justify-center items-center">
                            <img src={"/images/Activity.svg"} className="bg-primary-2 w-20 h-20 p-4 rounded-full"/>
                            <p className="font-PoppinsBold text-xl my-4">
                                Activity
                            </p>
                            <p className="font-PoppinsRegular text-base">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum facere beatae cumque, nam iure in, iusto dolores similique. 
                            </p>
                        </div>
                        <div className="bg-white col-span-1 p-6 shadow-md w-full rounded-md text-center flex flex-col justify-center items-center">
                            <img src={"/images/Tracking.svg"} className="bg-primary-2 w-20 h-20 p-4 rounded-full"/>
                            <p className="font-PoppinsBold text-xl my-4">
                                Tracking
                            </p>
                            <p className="font-PoppinsRegular text-base">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum facere beatae cumque, nam iure in, iusto dolores similique. 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 165.68">
                    <path className="fill-primary-3" d="M1000,0V165.68a1013.16,1013.16,0,0,0-500-131c-181.71,0-352.3,47.58-500,131V0Z" transform="translate(0 0)"></path>
                </svg>
                <div className="bg-white grid grid-cols-2 p-20">
                    <div className="col-span-1">
                        <img src={"/images/VectorFour.svg"} />
                    </div>
                    <div className="col-span-1 gap-2 flex flex-col justify-center">
                        <h1 className="font-PoppinsSemiBold text-4xl">
                            We Are Always There for You
                        </h1>
                        <div className="p-6 w-full rounded-md flex items-center gap-4">
                            <img src={"/images/Support.svg"} className="bg-primary-3 w-16 h-16 rounded-lg"/>
                            <div className="">
                                <p className="font-PoppinsSemiBold text-xl">
                                    24/7 support
                                </p>
                                <p className="font-PoppinsRegular text-base">
                                    Contact us anytime and anywhere
                                </p>
                            </div>
                        </div>
                        <div className="p-6 w-full rounded-md flex items-center gap-4">
                            <img src={"/images/Response.svg"} className="bg-primary-3 w-16 h-16 rounded-lg"/>
                            <div className="">
                                <p className="font-PoppinsSemiBold text-xl">
                                    1.5 hour
                                </p>
                                <p className="font-PoppinsRegular text-base">
                                    Average response time
                                </p>
                            </div>
                        </div>
                        <div className="p-6 w-full rounded-md flex items-center gap-4">
                            <img src={"/images/Happiness.svg"} className="bg-primary-3 w-16 h-16 rounded-lg"/>
                            <div className="">
                                <p className="font-PoppinsSemiBold text-xl">
                                    99%
                                </p>
                                <p className="font-PoppinsRegular text-base">
                                    Customer happiness rating
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 165.68">
                    <path className="fill-primary-3" d="M1000,0V165.68a1013.16,1013.16,0,0,0-500-131c-181.71,0-352.3,47.58-500,131V0Z" transform="translate(0 0)"></path>
                </svg> */}
            </div>
        </>
    );
};
