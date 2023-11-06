import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Shared/NavBar'

const Main = () => {
  return (
    <div className='max-w-screen-2xl mx-auto'>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default Main