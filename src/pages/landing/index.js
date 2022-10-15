import React from 'react'
import Navbar from '../navbar/navbar'
import Welcome from './welcome.jpg'

function Landing() {
  return (
    <>
   <Navbar/>
   <div className =" d-flex justify-content center">
   <img  src={Welcome} alt="Welcome Image"/>
   </div>
   </>
  )
}

export default Landing

