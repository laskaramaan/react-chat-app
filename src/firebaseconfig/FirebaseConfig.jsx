// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0xcUJpcUMb92XIGQm4nU_mKaXzSght4k",
  authDomain: "chat-app-8e5d1.firebaseapp.com",
  projectId: "chat-app-8e5d1",
  storageBucket: "chat-app-8e5d1.appspot.com",
  messagingSenderId: "374418376190",
  appId: "1:374418376190:web:8fdbf511b526c6bad5acaf"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)