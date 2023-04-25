import React, { useState } from 'react';
import { UseUserAuth } from '@/Components';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

export const Login = () => {

    const [forgetEmail, setForgetEmail] = useState("")
    const [fotgetPassword, setForgetPassword] = useState(true)
    const { signIn, forgetPassword } = UseUserAuth()

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSignIn = async (data) => {
        try {
            await signIn(data.email, data.password)
            router.push("/admin")
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Wrong Credentials",
                toast: true,
                animation: true,
                position: "top",
                timer: 2000,
                iconColor: '#27272a',
                showCancelButton: false,
                showConfirmButton: false,
            });
        }
    }

    const forgetHandleSubmit = async (e) => {
        e.preventDefault()
        try {
            await forgetPassword(forgetEmail)
            setForgetPassword(true)
        } catch (error) {
            console.log("Error")
        }
    }

    return (
        <>
            <div className="grid grid-cols-2 place-content-center h-[80vh] lg:px-20 md:px-12 px-6">
                <div className="lg:col-span-1 col-span-2 flex flex-col justify-center items-center">
                    {
                        fotgetPassword ?
                            <div className="lg:w-3/4 w-full trhide">
                                <h1 className="font-PoppinsSemiBold text-4xl text-zinc-800 pb-2 lg:text-left text-center">
                                    Login
                                </h1>
                                <p className="font-PoppinsRegular text-xs text-zinc-800 pb-2 lg:text-left text-center">
                                    Enter your credentials to access your account
                                </p>
                                <div className="flex flex-col pt-4">
                                    <label htmlFor="email" className="font-PoppinsRegular text-sm text-zinc-800 pb-2 pl-1">Email</label>
                                    <input {...register("email", { required: true })} type="email" id="email" placeholder="Enter your email" className="font-PoppinsRegular text-base p-2 border border-gray-300 rounded shadow-sm mb-4 placeholder:text-xs placeholder:text-zinc-400 focus:outline-primary-0" />
                                    <label htmlFor="password" className="font-PoppinsRegular text-sm text-zinc-800 pb-2 pl-1">Password</label>
                                    <input {...register("password", { required: true })} type="password" id="password" placeholder="Enter your password" className="font-PoppinsRegular text-base p-2 border border-gray-300 rounded shadow-sm mb-4 placeholder:text-xs placeholder:text-zinc-400 focus:outline-primary-0" />
                                    <div className="flex justify-end py-2">
                                        <button onClick={() => setForgetPassword(false)} className="font-PoppinsRegular text-xs text-primary-0">
                                            Forget Password
                                        </button>
                                    </div>
                                    <button onClick={handleSubmit(onSignIn)} type="button" className="font-PoppinsRegular text-base p-2 bg-primary-0 text-white rounded shadow-sm mt-2">
                                        Login
                                    </button>
                                </div>
                            </div>
                            :
                            <div className="lg:w-3/4 w-full trshow">
                                <button onClick={() => setForgetPassword(true)} type="button" className="flex items-center gap-2 text-base text-primary-0 py-2">
                                    {/* <FontAwesomeIcon icon={faCircleLeft} /> */}
                                    <p className="">Back to Login</p>
                                </button>
                                <h1 className="font-PoppinsSemiBold text-4xl text-zinc-800 pb-2 lg:text-left text-center">
                                    Forget Password
                                </h1>
                                <p className="font-PoppinsRegular text-xs text-zinc-800 pb-2 lg:text-left text-center">
                                    Enter your email to reset your password
                                </p>
                                <div className="flex flex-col pt-4">
                                    <label htmlFor="email" className="font-PoppinsRegular text-sm text-zinc-800 pb-2 pl-1">Email</label>
                                    <input onChange={(e) => { setForgetEmail(e.target.value) }} type="email" id="email" placeholder="Enter your email" className="font-PoppinsRegular text-base p-2 border border-gray-300 rounded shadow-sm mb-4 placeholder:text-xs placeholder:text-zinc-400 focus:outline-primary-0" />
                                    <button type="button" onClick={forgetHandleSubmit} className="font-PoppinsRegular text-base p-2 bg-primary-0 text-white rounded shadow-sm mt-2">
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                    }
                </div>
                <div className="col-span-1 lg:flex hidden justify-center items-center">
                    <img src={"/images/VectorOne.svg"} />
                </div>
            </div>
        </>
    );
};