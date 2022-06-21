import React from 'react'
import Navbar from './Navbar/Navbar'


function Mainpage(props) {
  let curruser = props.userdata[0];
  // console.log(curruser)

  return (
    <div>
      {props ? <div>
        <Navbar userdata={curruser}/>
        <div>Mainpage</div>
      </div> : 
      <div>
        <Navbar/>
        <div>Mainpage</div>
      </div>
      }
    </div>
  )
}

export default Mainpage