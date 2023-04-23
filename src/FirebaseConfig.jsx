import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcpOf1HNXT-G4WqmbZBIEX9NTN5jUDLg0",
  authDomain: "markit-ams-app.firebaseapp.com",
  projectId: "markit-ams-app",
  storageBucket: "markit-ams-app.appspot.com",
  messagingSenderId: "7906200532",
  appId: "1:7906200532:web:2813d2a35429a47730e441",
  measurementId: "G-2WGGQFX68B"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app);