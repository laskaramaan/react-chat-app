import React, {useState} from 'react'
import Navbar from '../Navbar/Navbar'
import './loginsignupform.css'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function Login() {

    const [email,setEmail] =useState();
    const [password, setPassword] =useState();
    const [name, setName] =useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const auth = getAuth();
    const navigate = useNavigate()


    const handleSubmit = (e)=> {
        e.preventDefault();

        signInWithEmailAndPassword(auth,email, password)
        .then((userCredentials)=> {
            // signed in
            const user =userCredentials.user;
            setSuccessMsg('Loggeed in successfully')
            setTimeout(()=> {
                navigate('/mainpage')
            },2000);
        })
        .catch((error)=>{
            const errorCode =error.code;
            const errorMessage = error.message;
            console.log(errorMessage)

            if(errorMessage == 'Firebase: Error (auth/wrong-password).'){
                setErrorMsg('Wrong Password')
            }
            if(errorMessage == 'Firebase: Error (auth/invalid-email).'){
                setErrorMsg('Invalid Email')
            }
            if(errorMessage == 'Firebase: Error (auth/user-not-found).'){
                setErrorMsg('User not registered')
            }
            if(errorMessage == 'Firebase: Error (auth/missing-email).' || errorMessage == 
            'Firebase: Error (auth/internal-error).' ){
                setErrorMsg('Fields cant be empty')
            }
            setTimeout(()=> {
                setErrorMsg('');

            }, 4000);
            

        })

    }



  return (
    <div>
        <Navbar/>
        <div className='form-outermost'>
            <h1>Login</h1>
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

               

                <input onChange={(e)=>setPassword(e.target.value)} 
                type='password' placeholder='password' />

                <button onClick={handleSubmit}>Submit</button>

            </form>

        </div>
    </div>
  )
}

export default Login