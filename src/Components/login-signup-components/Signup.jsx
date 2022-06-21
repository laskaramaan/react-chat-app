import Navbar from '../Navbar/Navbar'
import './loginsignupform.css'

import { doc, setDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { storage,db } from '../../firebaseconfig/FirebaseConfig';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL,ref, uploadBytes } from 'firebase/storage';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'


function Signup() {
    const [email,setEmail] =useState();
    const [password, setPassword] =useState();
    const [dob, setDob] = useState();
    const [profilepic, setProfilepic] =useState();
    const [name, setName] =useState();

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const auth = getAuth();
    const navigate = useNavigate()

    const handleProductImg = (e) => {
        let selectedFile = e.target.files[0];

        if(selectedFile){
            setProfilepic(selectedFile)
        }
        else{
            setErrorMsg('please select your profile pic')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // User ko register karana hai, user ko authenticate kiya
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredenstials)=>{
            const user = userCredenstials.user;
            // profile image ka link generate kiya
            const storeageRef = ref(storage, 'profile-images/${Date.now()}')

            uploadBytes(storeageRef,profilepic).then(()=>{
                getDownloadURL(storeageRef).then(url=>{
                    addDoc(collection(db,'users'),{
                        email, password, dob, profimage: url,name, uid: user.uid

                    }).then(()=>{
                        setSuccessMsg('user added successully')
                        setTimeout(()=>{
                            navigate('/login');
                        },2000);
                    }).catch((error)=> {
                        // Pahele error msg aye phir 2 sec baad blank ho jaye
                        setErrorMsg(error.message);
                        setTimeout(()=>{
                            setErrorMsg('');
                        },2000);

                    })

                })
            })
            .catch((error)=> {console.log(error.message)})
        })
        .catch((error)=>{
            console.log(error.message)
             
            if(error.message == 'Firebase: Error (auth/invalid-email).'|| error.message == 'Firebase: Error (auth/admin-restricted-operation).'){
                setErrorMsg('Please fill all required fields')
            }
            if(error.message == 'Firebase: Error (auth/email-already-in-use).') {
                setErrorMsg('User already exists')
            }
            setTimeout(()=> {
                setErrorMsg('');
            },2000);


        })
    }
 


  return (
    
    <div>
        <Navbar/>
        <div className='form-outermost'>
            <h1>Signup</h1>
            <form className='form-inner'>
                {successMsg && <>
                    <div className='success-msg'>{successMsg}</div>
                </>}
                {errorMsg && <>
                    <div className='error-msg'>{errorMsg}</div>
                </>}
                <input onChange={(e)=>setEmail(e.target.value)} 
                type='email' placeholder='Email address'/>

                <input onChange={(e)=>setName(e.target.value)}
                type='text' placeholder='Your name' /> 

                <input onChange={(e)=>setDob(e.target.value)} 
                type='date' placeholder='Your DOB'/>

                <input onChange={handleProductImg} 
                type='file' accept='image/png, image/jpg, 
                image/jpeg' placeholder='your profile picture' />

                <input onChange={(e)=>setPassword(e.target.value)} 
                type='password' placeholder='password' />

                <button onClick={handleSubmit}>Submit</button>

            </form>

        </div>
    </div>
  )
}

export default Signup