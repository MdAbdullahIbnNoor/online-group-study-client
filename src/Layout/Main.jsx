import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Shared/NavBar'
import Footer from '../Shared/Footer'

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default Main