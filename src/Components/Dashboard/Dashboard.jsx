import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Modal, Spinner } from '@/Components';
import Webcam from 'react-webcam';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '@/FirebaseConfig';
import { recognizeImage, sendImages } from '@/api';

export const Dashboard = () => {

    let [isEdit, setIsEdit] = useState(true)
    let [showPopup, setShowPopup] = useState(false)
    let [spin, setSpin] = useState(false)
    const [dataSet, setDataSet] = useState([]);

    let uniqueId = Math.floor(Math.random() * (100000000000 - 999999999999 + 1)) + 999999999999;

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
        setShowPopup(false)
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setSpin(true)
        try {
            data.userid = uniqueId
            // const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
            // const user = userCredential.user
            // data.timestamp = serverTimestamp()
            // await setDoc(doc(db, 'Maids', user.uid), data)
            data.images = dataSet
            const response = await fetch('http://192.168.10.2:5000/process-images', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            setSpin(false)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <Spinner isSpinner={spin} />
            <Modal
                open={showPopup}
                title="Scan Face"
                width="md:w-1/3"
                close={() => setShowPopup(false)}
            >
                <div>
                    <Webcam className='scale-x-[-1]' ref={webRef} />
                    <button onClick={() => makeDataset()} className="font-PoppinsRegular text-base bg-primary-2 text-white py-2 mt-2 w-full rounded" type="button">
                        Capture
                    </button>
                </div>
            </Modal>
            {/* <button onClick={() => recognize()} type='button' className="text-4xl text-black pt-[10vh]">s</button> */}
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
                                    <input {...register("password")} className="font-PoppinsRegular outline-none bg-zinc-100 w-full rounded p-2" placeholder="Password" type="password" />
                                </div>
                                <button onClick={() => setShowPopup(true)} type='button' className="bg-zinc-100 rounded p-2 px-4 flex justify-center">
                                    <img className="w-5" src={"/images/Camera.svg"} />
                                </button>
                                <div className="">
                                    <button onClick={handleSubmit(onSubmit)} className="font-PoppinsMedium bg-primary-2 text-white w-full rounded p-2 text-center" type="button">Register</button>
                                </div>

                            </form>
                        </div>
                }
            </div>
        </>
    )
}
