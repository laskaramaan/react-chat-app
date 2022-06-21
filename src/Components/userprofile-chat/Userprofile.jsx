import React from 'react'
import './Userprofile.css'
import Navbar from '../Navbar/Navbar';

function Userprofile(props) {
  let curruser = props.userdata[0];
  // console.log(curruser)


  return (

    <div className='userprofile'>
      {props ? <div>
        <Navbar userdata={curruser} />
        <div className='section1'>
          <div className='let'>
            <img src={curruser.profimage} className='userprofile-image' />


          </div>
          <div className='right'>
            <h1>{curruser.name}</h1>
            <h2>{curruser.email}</h2>
          </div>
        </div>
        <div className='userpost-head'>
          <p>Your Posts</p>

        </div>
        <div className='section2'></div>

      </div> :
        <div>
          <Navbar/>
          <div>Not logged in</div>
          
          </div>}

    </div>
  )
}

export default Userprofile