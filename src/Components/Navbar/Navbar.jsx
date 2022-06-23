import React from 'react'
import mainlogo from '../assets/mainlogo.png'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../../firebaseconfig/FirebaseConfig'
import { signOut } from 'firebase/auth'
import Addicon from '../assets/addicon.png'

import { useState, useEffect } from 'react'
import { collection } from 'firebase/firestore'
import { docs, getDocs, query, where } from 'firebase/firestore'

function Navbar(props) {

  const navigate = useNavigate()

  const logoutuser = () => {
    signOut(auth).then(() => {
      setTimeout(() => {
        navigate('/login');

      }, 2000)
    }).catch((error) => {
      console.log(error.message)

    })
  }

  let curruser = props.userdata
  let message_icon = "https://flyclipart.com/thumb2/message-icons-42221.png"
  let home_icon ="data:image/png;base64,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"


  return (
    <div>
      <nav>
        <div className='left'>
          <img src={mainlogo} />

        </div>
        {curruser != undefined ?
          <div className='right'>

            <Link to={'/mainpage'}>
              <img src={home_icon} className='nav-profile-pic add-icon' />

            </Link>


            <Link to='/addpost'>
              <img src={Addicon} className='nav-profile-pic add-icon' />

            </Link>

            <Link to='/userchats'>
              <img src={message_icon} className='nav-profile-pic' />

            </Link>
            <Link to='/userprofile'>
              <img src={curruser.profimage} className='nav-profile-pic' />

            </Link>
            <button onClick={logoutuser}>Logout</button>
          </div>
          :
          <div className='right'>
            <Link to='/login'><button>Login</button></Link>
            <Link to='/signup'><button>Signup</button></Link>

          </div>
        }
      </nav>
      <hr />
    </div>
  )
}

export default Navbar