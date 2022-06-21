import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Components/login-signup-components/Signup';
import Login from './Components/login-signup-components/Login';
import Mainpage from './Components/Mainpage';

import {useState, useEffect} from 'react'
import {collection} from 'firebase/firestore'
import {db, auth} from './firebaseconfig/FirebaseConfig'
import {doc, getDocs, query, where} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'


function App() {
  const [user,setUser] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  function GetCurrentUser(){
    useEffect(()=>{
      auth.onAuthStateChanged(userlogged => {
        if(userlogged){
          


        }
      })
    })
  }


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/mainpage' element={<Mainpage/>} />
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
