import React from 'react'
import mainlogo from '../assets/mainlogo.png'
import {Link} from 'react-router-dom'
import './Navbar.css'
import {useNavigate} from 'react-router-dom'
import {db, auth } from '../../firebaseconfig/FirebaseConfig'
import {signOut} from 'firebase/auth'

function Navbar(props) {

  const navigate =  useNavigate()

  const logoutuser =() => {
    signOut(auth).then(()=>{
      setTimeout(()=> {
        navigate('/login');

      }, 2000)
    }).catch((error)=> {
      console.log(error.message)

    })
  }

  let curruser = props.userdata
  let message_icon = "https://flyclipart.com/thumb2/message-icons-42221.png"



  return (
    <div>
        <nav>
            <div className='left'>
                <img src={mainlogo}/>

            </div>
            {curruser != undefined ? 
            <div className='right'>
            <Link to='/userchats'>
              <img src={message_icon} className='nav-profile-pic'/>

            </Link>
            <Link to='/userprofile'>
              <img src={curruser.profimage} className='nav-profile-pic' />

            </Link>
            </div>
            :
            <div className='right'>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/signup'><button>Signup</button></Link>

            </div>
            }
        </nav>
    </div>
  )
}

export default Navbar