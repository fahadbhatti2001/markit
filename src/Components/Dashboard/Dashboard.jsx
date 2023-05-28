import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Modal, Spinner } from '@/Components';
import Webcam from 'react-webcam';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '@/FirebaseConfig';

export const Dashboard = () => {

    let [isEdit, setIsEdit] = useState(true)
    let [showPopup, setShowPopup] = useState(false)
    let [spin, setSpin] = useState(false)
    const [dataSet, setDataSet] = useState([]);
    let [data, setData] = useState()
    const usersRef = collection(db, "User")
    
    const [presentData, setPresentData] = useState()
    const presentDataRef = collection(db, "getid")

    const getData = async () => {
        const userData = await getDocs(usersRef)
        setData(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        const presentData = await getDocs(presentDataRef)
        setPresentData(presentData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };

    let uniqueId = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;

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

    const [isDisplay, setIsDisplay] = useState("member")

    const setSection = (name) => {
        if(name == "present"){
            
        }
        setIsDisplay(name)
    }

    useEffect(() => {
        getData()
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setSpin(true)
        try {
            data.userid = uniqueId
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
            const user = userCredential.user
            data.timestamp = serverTimestamp()
            data.image = "https://firebasestorage.googleapis.com/v0/b/markit-ams-app.appspot.com/o/images%2Fprofile.jpg?alt=media&token=3e954106-214e-42a3-8520-69f44767134c"
            await setDoc(doc(db, 'User', user.uid), data)
            data.images = dataSet
            const response = await fetch('http://192.168.1.10:5000/process-images', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            setSpin(false)
            getData()
            setIsEdit(true)
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
            <div className="h-screen md:px-20 px-4 pt-[10vh]">
                <div className="py-4">
                    <h1 className="font-PoppinsRegular text-base">
                        Hi, Admin
                    </h1>
                    <h1 className="font-PoppinsSemiBold text-4xl">
                        Glad to see you!
                    </h1>
                </div>
                <div className="py-4 grid md:grid-cols-4 grid-cols-1 gap-4">
                    <button onClick={() => setSection("member")} type="button" className="col-span-1 font-PoppinsMedium text-2xl text-primary-0 p-4 rounded-md bg-white flex justify-between items-center shadow">
                        <h1 className="">
                            Member
                        </h1>
                        <h1 className="">
                            {data == undefined ? 0 : data.length }
                        </h1>
                    </button>
                    <button onClick={() => setSection("present")} type="button" className="col-span-1 font-PoppinsMedium text-2xl text-primary-1 p-4 rounded-md bg-white flex justify-between items-center shadow">
                        <h1 className="">
                            Present
                        </h1>
                        <h1 className="">
                            0
                        </h1>
                    </button>
                    <button onClick={() => setSection("absent")} type="button" className="col-span-1 font-PoppinsMedium text-2xl text-primary-2 p-4 rounded-md bg-white flex justify-between items-center shadow">
                        <h1 className="">
                            Absent
                        </h1>
                        <h1 className="">
                            0
                        </h1>
                    </button>
                    <button onClick={() => setSection("application")} type="button" className="col-span-1 font-PoppinsMedium text-2xl text-zinc-700 p-4 rounded-md bg-white flex justify-between items-center shadow">
                        <h1 className="">
                            Application
                        </h1>
                        <h1 className="">
                            0
                        </h1>
                    </button>
                </div>
                {
                    isDisplay == "member" ?
                        <>
                            {
                                isEdit ?
                                    <div className="w-full bg-white rounded-md shadow">
                                        <div className="p-4 border-b border-zinc-200 flex justify-between items-center">
                                            <h1 className="font-PoppinsSemiBold text-base">
                                                Registed Members
                                            </h1>
                                            <button onClick={() => setIsEdit(false)} className="font-PoppinsRegular text-base bg-primary-2 text-white py-1 px-4 rounded" type="button">
                                                Add
                                            </button>
                                        </div>
                                        <div className="h-60 overflow-auto w-full cst-scrollbar">
                                            <div className="flex gap-2 py-3 px-4 border-b">
                                                <h1 className="font-PoppinsSemiBold w-full">
                                                    Full Name
                                                </h1>
                                                <h1 className="font-PoppinsSemiBold w-full">
                                                    User ID
                                                </h1>
                                                <h1 className="font-PoppinsSemiBold w-full">
                                                    Email
                                                </h1>
                                            </div>
                                            {
                                                data == undefined ? null : data.map((e, i) => (
                                                    <div key={i} className="flex gap-2 py-3 px-4 border-b">
                                                        <h1 className="font-PoppinsRegular w-full">
                                                            {e.firstname} {e.lastname}
                                                        </h1>
                                                        <h1 className="font-PoppinsRegular w-full">
                                                            {e.userid}
                                                        </h1>
                                                        <h1 className="font-PoppinsRegular w-full">
                                                            {e.email}
                                                        </h1>
                                                    </div>
                                                ))
                                            }
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
                                            <div className="flex md:flex-nowrap flex-wrap gap-4">
                                                <input {...register("firstname")} className="font-PoppinsRegular outline-none bg-zinc-100 w-full rounded p-2" placeholder="First Name" type="text" />
                                                <input {...register("lastname")} className="font-PoppinsRegular outline-none bg-zinc-100 w-full rounded p-2" placeholder="Last Name" type="text" />
                                            </div>
                                            <div className="flex md:flex-nowrap flex-wrap gap-4">
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
                        </>
                        : isDisplay == "present" ?
                            <>
                                <div className="w-full bg-white rounded-md shadow">
                                    <div className="px-4 py-5 border-b border-zinc-200 flex justify-between items-center">
                                        <h1 className="font-PoppinsSemiBold text-base">
                                            Present Members
                                        </h1>
                                    </div>
                                    <div className="h-60 overflow-auto w-full cst-scrollbar">
                                        <div className="flex gap-2 py-3 px-4 border-b">
                                            <h1 className="font-PoppinsSemiBold w-full">
                                                Full Name
                                            </h1>
                                            <h1 className="font-PoppinsSemiBold w-full">
                                                User ID
                                            </h1>
                                            <h1 className="font-PoppinsSemiBold w-full">
                                                Email
                                            </h1>
                                        </div>
                                        {/* {
                                            data == undefined ? null : data.map((e, i) => (
                                                <div key={i} className="flex gap-2 py-3 px-4 border-b">
                                                    <h1 className="font-PoppinsRegular w-full">
                                                        {e.firstname} {e.lastname}
                                                    </h1>
                                                    <h1 className="font-PoppinsRegular w-full">
                                                        {e.userid}
                                                    </h1>
                                                    <h1 className="font-PoppinsRegular w-full">
                                                        {e.email}
                                                    </h1>
                                                </div>
                                            ))
                                        } */}
                                    </div>
                                </div>
                            </>
                            : isDisplay == "absent" ?
                                <>
                                    <div className="w-full bg-white rounded-md shadow">
                                        <div className="px-4 py-5 border-b border-zinc-200 flex justify-between items-center">
                                            <h1 className="font-PoppinsSemiBold text-base">
                                                Absent Members
                                            </h1>
                                        </div>
                                        <div className="h-60 overflow-auto w-full cst-scrollbar">
                                            <div className="flex gap-2 py-3 px-4 border-b">
                                                <h1 className="font-PoppinsSemiBold w-full">
                                                    Full Name
                                                </h1>
                                                <h1 className="font-PoppinsSemiBold w-full">
                                                    User ID
                                                </h1>
                                                <h1 className="font-PoppinsSemiBold w-full">
                                                    Email
                                                </h1>
                                            </div>
                                            {/* {
                                            data == undefined ? null : data.map((e, i) => (
                                                <div key={i} className="flex gap-2 py-3 px-4 border-b">
                                                    <h1 className="font-PoppinsRegular w-full">
                                                        {e.firstname} {e.lastname}
                                                    </h1>
                                                    <h1 className="font-PoppinsRegular w-full">
                                                        {e.userid}
                                                    </h1>
                                                    <h1 className="font-PoppinsRegular w-full">
                                                        {e.email}
                                                    </h1>
                                                </div>
                                            ))
                                        } */}
                                        </div>
                                    </div>
                                </>
                                : isDisplay == "application" ?
                                    <>
                                        <div className="w-full bg-white rounded-md shadow">
                                            <div className="px-4 py-5 border-b border-zinc-200 flex justify-between items-center">
                                                <h1 className="font-PoppinsSemiBold text-base">
                                                    Applications
                                                </h1>
                                            </div>
                                            <div className="h-60 overflow-auto w-full cst-scrollbar">
                                                <div className="flex gap-2 py-3 px-4 border-b">
                                                    <h1 className="font-PoppinsSemiBold w-full">
                                                        Full Name
                                                    </h1>
                                                    <h1 className="font-PoppinsSemiBold w-full">
                                                        User ID
                                                    </h1>
                                                    <h1 className="font-PoppinsSemiBold w-full">
                                                        Email
                                                    </h1>
                                                </div>
                                                {/* {
                                            data == undefined ? null : data.map((e, i) => (
                                                <div key={i} className="flex gap-2 py-3 px-4 border-b">
                                                    <h1 className="font-PoppinsRegular w-full">
                                                        {e.firstname} {e.lastname}
                                                    </h1>
                                                    <h1 className="font-PoppinsRegular w-full">
                                                        {e.userid}
                                                    </h1>
                                                    <h1 className="font-PoppinsRegular w-full">
                                                        {e.email}
                                                    </h1>
                                                </div>
                                            ))
                                        } */}
                                            </div>
                                        </div>
                                    </>
                                    : null
                }
            </div>
        </>
    )
}
