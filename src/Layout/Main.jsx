import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Shared/NavBar'
import Footer from '../Shared/Footer'
import QuickAssist from '../Shared/QuickAssist'

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="flex-grow">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <QuickAssist />
    </div>
  )
}

export default Main