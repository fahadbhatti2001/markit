import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Modal } from '@/Components';
import Webcam from 'react-webcam';

export const Dashboard = () => {

    let [isEdit, setIsEdit] = useState(true)
    let [showPopup, setShowPopup] = useState(false)
    const [dataSet, setDataSet] = useState([]);

    const webRef = useRef(null);

    const makeDataset = () => {
        const newDataSet = [];
        for (let index = 0; index < 50; index++) {
            let capture = webRef.current.getScreenshot();
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;
                    data[i + 1] = avg;
                    data[i + 2] = avg;
                }

                ctx.putImageData(imageData, 0, 0);

                const dataUrl = canvas.toDataURL();
                const base64Data = dataUrl.replace(/^data:image\/(png|jpg);base64,/, '');
                newDataSet.push(base64Data);
                setDataSet(newDataSet);
            };
            img.src = capture;
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {

    }

    return (
        <>
            <Modal
                open={showPopup}
                title="Scan Face"
                width=""
                close={() => setShowPopup(false)}
            >
                <div>
                    <Webcam ref={webRef} />
                    <button onClick={() => makeDataset()} type="button">
                        Capture
                    </button>
                </div>
            </Modal>
            <div className="h-screen md:px-20 px-4 pt-[10vh]">
                <div className="py-4">
                    <h1 className="font-PoppinsRegular text-base">
                        Hi, Admin
                    </h1>
                    <h1 className="font-PoppinsSemiBold text-4xl">
                        Glad to see you!
                    </h1>
                </div>
                <div className="py-4 grid md:grid-cols-3 grid-cols-1 gap-4">
                    <div className="col-span-1 font-PoppinsMedium text-2xl text-primary-0 p-4 rounded-md bg-white flex justify-between items-center shadow">
                        <h1 className="">
                            Total Member
                        </h1>
                        <h1 className="">
                            0
                        </h1>
                    </div>
                    <div className="col-span-1 font-PoppinsMedium text-2xl text-primary-1 p-4 rounded-md bg-white flex justify-between items-center shadow">
                        <h1 className="">
                            Total Present
                        </h1>
                        <h1 className="">
                            0
                        </h1>
                    </div>
                    <div className="col-span-1 font-PoppinsMedium text-2xl text-primary-2 p-4 rounded-md bg-white flex justify-between items-center shadow">
                        <h1 className="">
                            Total Absent
                        </h1>
                        <h1 className="">
                            0
                        </h1>
                    </div>
                </div>
                {
                    isEdit ?
                        <div className="w-full bg-white rounded-md shadow">
                            <div className="p-4 border-b border-zinc-200 flex justify-between items-center">
                                <h1 className="font-PoppinsRegular text-base">
                                    Registed Members
                                </h1>
                                <button onClick={() => setIsEdit(false)} className="font-PoppinsRegular text-base bg-primary-2 text-white py-1 px-4 rounded" type="button">
                                    Add
                                </button>
                            </div>
                            <div className="h-60 overflow-auto w-full cst-scrollbar">
                                <div className="grid grid-cols-12 place-items-center gap-2 p-4"></div>
                            </div>
                        </div>
                        :
                        <div className="w-full bg-white rounded-md shadow">
                            <div className="p-4 border-b border-zinc-200 flex justify-between items-center">
                                <h1 className="font-PoppinsRegular text-base">
                                    Registed Members
                                </h1>
                                <button onClick={() => setIsEdit(true)} className="font-PoppinsRegular text-base bg-primary-2 text-white py-1 px-4 rounded" type="button">
                                    Back
                                </button>
                            </div>
                            <form className="h-60 overflow-auto w-full cst-scrollbar flex flex-col justify-between p-4">
                                <div className="flex gap-4">
                                    <input {...register("fname")} className="font-PoppinsRegular outline-none bg-zinc-100 w-full rounded p-2" placeholder="First Name" type="text" />
                                    <input {...register("lname")} className="font-PoppinsRegular outline-none bg-zinc-100 w-full rounded p-2" placeholder="Last Name" type="text" />
                                </div>
                                <div className="flex gap-4">
                                    <input {...register("email")} className="font-PoppinsRegular outline-none bg-zinc-100 w-full rounded p-2" placeholder="Email" type="email" />
                                    <button onClick={() => setShowPopup(true)} type='button' className="bg-zinc-100 rounded p-2 px-4 flex justify-center">
                                        <img className="w-5" src={"/images/Camera.svg"} />
                                    </button>
                                </div>
                                <div className="flex gap-4">
                                    <input {...register("userid")} className="font-PoppinsRegular outline-none bg-zinc-100 w-full rounded p-2" placeholder="User ID" type="text" />
                                    <input {...register("password")} className="font-PoppinsRegular outline-none bg-zinc-100 w-full rounded p-2" placeholder="Password" type="password" />
                                </div>
                                <div className="">
                                    <button className="font-PoppinsMedium bg-primary-2 text-white w-full rounded p-2 text-center" type="button">Register</button>
                                </div>

                            </form>
                        </div>
                }
            </div>
        </>
    )
}
