import React from 'react'
import Navbar from '../Navbar/Navbar'
import { doc, setDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { storage, db } from '../../firebaseconfig/FirebaseConfig'
import { collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

function Addpost(props) {

  let curruser = props.userdata[0]

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1 //months from 1-12
  var day = dateObj.getUTCDate()
  var year = dateObj.getUTCFullYear()
  var hours = dateObj.getHours()
  var mins = dateObj.getMinutes()
  var seconds = dateObj.getSeconds()

  // let newdate =  `${year}${month}${day}${hours}${mins}${seconds} `
  // console.log(newdate)

  const [description, setDescription] = useState();
  const [postpic, setPostpic] = useState();
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()
  const auth = getAuth();

  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];
    // console.log ( producttype.toUpperCase ( ) )
    if (selectedFile) {

      setPostpic(selectedFile);
      setErrorMsg(' ');
    }
    else {
      setErrorMsg(' please select your post');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = curruser;
    let newdate = `${year}${month}${day}${hours}${mins}${seconds}`

    // firebase storage ke andart posts naam ka folder bane jahape saare posts store honge
    const storageRef = ref(storage, 'posts/${newdate}')

    uploadBytes(storageRef, postpic)
      .then(() => {
        getDownloadURL(storageRef).then(url => {

          // Humne database ke andar ek collection(folder) banaya "posts" naam ka 
          // jis bhi user ne image daali uska email, descriptionm, name,profilepic,postpic,uid aur date humne le liya
          addDoc(collection(db, 'posts'), {
            email: user.email,description, name:user.name,profilepic: user.profimage,postpic:url,post_user_id:user.uid, date:parseInt(newdate)
          })
          .then(()=>{
            setSuccessMsg('posted successfully')
            setTimeout(()=> {
              setSuccessMsg('');
            },2000)
          }).catch((error)=> {
            setErrorMsg(error.message)
            setTimeout(()=> {
              setErrorMsg('');

            },2000)
          })

        })
      })
      .catch((error)=> {
        console.log(error.message)
      })
  }





  return (
    <div>
      {props ? <div>
        <Navbar userdata={curruser} />
        <div className='form-outermost'>
          <h1>Add post</h1>
          <form className='form-inner'>
            {successMsg && <>
              <div className='success-msg'>{successMsg}</div>
            </>}
            {
              errorMsg && <>
                <div className='error-msg'>{errorMsg}</div>
              </>
            }
            <input onChange={handleProductImg} type='file' accept='image/png, 
            image/jpg, image/jpeg' placeholder='choose a profile pic' />
            <input onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter Description' />

            <button onClick={handleSubmit}>Submit</button>


          </form>

        </div>
      </div> :
        <div>
          <Navbar />
          <div>Not logged in</div>
        </div>
      }
    </div>
  )
}

export default Addpost