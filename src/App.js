import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Components/login-signup-components/Signup';
import Login from './Components/login-signup-components/Login';
import Mainpage from './Components/Mainpage';
import Fof from './Components/Fof'
import Userchats from './Components/userprofile-chat/Userchats'
import Userprofile from './Components/userprofile-chat/Userprofile'


import { useState, useEffect } from 'react'
import { collection } from 'firebase/firestore'
import { db, auth } from './firebaseconfig/FirebaseConfig'
import { doc, getDocs, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import Addpost from './Components/posts/Addpost'
// import friendsprofile from './Components/Friendspofile/Friendsprofile'



function App() {
  const [user, setUser] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  function GetCurrentUser() {
    // useEffect is ek aisa hook hai jo apne aap call hojata hai jb hum page load krte hai
    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        // Agar user loggedin hai to user ka uid get karo
        if (userlogged) {
          const getUser = async () => {
            const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          };
          getUser();
        }
        else {
          setUser(null);
        }
      })
    }, [])
    return user
  }

  GetCurrentUser()

  // console.log(user)


  return (
    <div>
      {user ? <div>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />

            {/* props ka use ho rha hai yaha  */}
            <Route path='/mainpage' element={<Mainpage userdata={user} />} />
            <Route path='/' element={<Mainpage userdata={user} />} />
            <Route path='/userchats' element={<Userchats userdata={user} />} />
            <Route path='userprofile' element={<Userprofile userdata={user} />} />
            <Route path='/addpost' element={<Addpost userdata={user}/>}/>
            <Route path='/*' element={<Fof userdata={user} />} />
          </Routes>
        </BrowserRouter>


      </div> :
        <div>
          <BrowserRouter>
            <Routes>
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/*' element={<Login />} />
            </Routes>
          </BrowserRouter>
        </div>}
    </div>


  );
}

export default App;
