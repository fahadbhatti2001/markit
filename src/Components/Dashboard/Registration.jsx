import React, { useEffect, useState } from 'react';
import { Header } from '@/Components';
import { db, auth, storage } from '@/FirebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const Registration = () => {

    let [isImage, setIsImage] = useState(null)

    let [inputData, setInputData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        image: "",
        userid: "",
        password: "",
    })

    let imageName = new Date().getTime()

    const { email, password } = inputData

    const createUsers = async () => {

        try {
            const imageRef = ref(storage, `images/${imageName}`)
            uploadBytes(imageRef, isImage).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async url => {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                    const user = userCredential.user

                    const inputDataCopy = { ...inputData }
                    inputDataCopy.timestamp = serverTimestamp()
                    inputDataCopy.image = url

                    await setDoc(doc(db, 'User', user.uid), inputDataCopy)
                })
            })
        }
        catch (error) {
            console.log("Error")
        }

    }

    function fieldsHandler(e) {
        let ele = e.target.name
        setInputData({ ...inputData, [ele]: e.target.value });
    }

    function imageFieldsHandler(e) {
        setIsImage(e.target.files[0]);
    }

    const [users, setUsers] = useState([])
    const userCollect = collection(db, "User")

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollect)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };
        getUsers()
    }, [])

    return (
        <>
            <Header position="static" />

            <div className="h-[90vh] px-20">

                <div className="grid grid-cols-12 w-full mb-2 gap-2">
                    <div className="col-span-12 bg-white rounded-md shadow">
                        <div className="h-[8vh] px-4 border-b flex items-center">
                            <h1 className="font-PoppinsRegular text-base">
                                Registed Students
                            </h1>
                        </div>
                        <div className="h-[30vh] overflow-auto w-full cst-scrollbar">

                            {
                                users.map((e, i) => (
                                    <div key={i} className="grid grid-cols-12 place-items-center gap-2 p-4 border-t">
                                        <div className="col-span-2">
                                            <img src={e.image} className="object-cover w-10 h-10 rounded-full border-2 border-primary-0" />
                                        </div>
                                        <h1 className="col-span-4 font-PoppinsRegular w-full">
                                            {e.firstname} {e.lastname}
                                        </h1>
                                        <h1 className="col-span-6 font-PoppinsRegular w-full">
                                            {e.email}
                                        </h1>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-span-12 bg-white rounded-md shadow">
                        <div className="h-[8vh] px-4 border-b flex items-center">
                            <h1 className="font-PoppinsRegular text-base">
                                Register Students
                            </h1>
                        </div>
                        <form className="h-[34vh] flex flex-col justify-between overflow-auto w-full cst-scrollbar p-4">
                            <div className="flex gap-4">
                                <input name="firstname" onChange={fieldsHandler} className="font-PoppinsRegular outline-none bg-zinc-100 w-full rounded p-2" placeholder="First Name" type="text" />
                                <input name="lastname" onChange={fieldsHandler} className="font-PoppinsRegular outline-none bg-zinc-100 w-full rounded p-2" placeholder="Last Name" type="text" />
                            </div>
                            <div className="flex gap-4">
                                <input name="email" onChange={fieldsHandler} className="font-PoppinsRegular outline-none bg-zinc-100 w-full rounded p-2" placeholder="Email" type="email" />
                                <label htmlFor="image" className="font-PoppinsRegular outline-none bg-zinc-100 rounded p-2 px-4 flex justify-center">
                                    <img className="w-5" src={"/images/Camera.svg"} />
                                </label>
                                <input id="image" name="image" onChange={imageFieldsHandler} type="file" />
                            </div>
                            <div className="flex gap-4">
                                <input name="userid" onChange={fieldsHandler} className="font-PoppinsRegular outline-none bg-zinc-100 w-full rounded p-2" placeholder="User ID" type="text" />
                                <input name="password" onChange={fieldsHandler} className="font-PoppinsRegular outline-none bg-zinc-100 w-full rounded p-2" placeholder="Password" type="password" />
                            </div>
                            <div className="">
                                <button onClick={createUsers} className="font-PoppinsMedium bg-primary-2 text-white w-full rounded p-2 text-center" type="button">Register</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>

        </>
    )
}
