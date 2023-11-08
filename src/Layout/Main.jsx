import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Shared/NavBar'
import Footer from '../Shared/Footer'

const Main = () => {
  return (
    <div className='mx-auto'>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default Main