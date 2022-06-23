import React from 'react'
import Navbar from '../Navbar/Navbar'

function Userchats(props) {
  let curruser = props.userdata[0]

  return (
    <div>
      {props ? <div>
        <Navbar userdata={curruser} />
        <div>userchats</div>
      </div> :
        <div>
          <Navbar/>
          <div>You are not logged in</div>
          </div>}
    </div>
  )
}

export default Userchats