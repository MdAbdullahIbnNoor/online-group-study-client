import React from 'react';
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import image from "../../assets/signup.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { updateProfile } from 'firebase/auth';

const SignUp = () => {
  const [registerError, setRegisterError] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const passwordRegex = new RegExp('(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*\\(\\)_+{}\\[\\]:;<>,.?~\\-])(?=.{6,})')

  const navigate = useNavigate(null)

  const { createUser, user } = useContext(AuthContext)

  const handleRegister = e => {
    e.preventDefault()
    const name = e.target.name.value;
    const photo = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, email, password);
    const isValidPassword = passwordRegex.test(password);
    console.log(isValidPassword);

    if (!isValidPassword) {
      setRegisterError("Please include a valid password");
      toast.error("Please include a valid password");
      return;
    }

    setRegisterError('');
    setShowPassword(false)

    createUser(email, password)
      .then((userCredential) => {
        console.log(userCredential.user)

        toast.success("Account Created Successfully");
        navigate('/')
        updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photo
        }).then(() => { ({ ...user, displayName: name, photoURL: photo }) })
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setRegisterError(error.message);
        toast.error(registerError)
      })
  }

  return (
    <div className=' lg:mb-[200px] lg:mt-4 lg:min-h-[400px] lg:my-14 my-8'>
      <h2 className='text-3xl lg:text-5xl font-bold text-center mb-24 text-gray-700'>Please <span className='text-primary'>Register</span></h2>
      <div className='flex flex-col-reverse lg:flex-row items-center max-w-screen-2xl justify-around mx-auto'>
        <div className="flex flex-col w-96 lg:w-1/3 px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="self-center mb-5 lg:text-2xl text-gray-800 text-2xl dark:text-white font-semibold">
            Create a new account
          </div>
          <span className="justify-center text-center text-gray-500 flex-items-center dark:text-gray-400">
            Already have an account ?
            <Link to="/login" target="_blank" className="text-sm text-blue-500 underline hover:text-blue-700">
              Sign in
            </Link>
          </span>
          <div className="p-6 mt-8">
            <form onSubmit={handleRegister}>
              <div className="flex flex-col mb-2">
                <div className=" relative ">
                  <input
                    type="text"
                    id="create-account-pseudo"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="name"
                    placeholder="Name"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className=" relative ">
                  <input
                    type="text"
                    id="photoURL"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="photoURL"
                    placeholder="Photo URL"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className=" relative mb-2">
                  <input
                    type="Email"
                    id="create-account-email"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name='email'
                    placeholder="Email"
                    required
                  />
                </div>
                <div className=" relative mb-5">
                  <input
                    type={showPassword ? "type" : "password"}
                    id="create-account-email"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name='password'
                    placeholder="Password"
                    required
                  />
                  <span onClick={() => setShowPassword(!showPassword)} >
                    {
                      showPassword ? <AiFillEyeInvisible className="text-xl text-black relative left-64 lg:left-96 bottom-8"></AiFillEyeInvisible> :
                        <AiFillEye className="text-xl text-black relative left-64 lg:left-96 bottom-8"></AiFillEye>
                    }
                  </span>
                  <p className='text-white text-sm '>{registerError}</p>
                </div>
              </div>
              <div className="flex w-full my-4">
                <button
                  type="submit"
                  className="py-2 px-4 bg-primary hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  Login
                </button>
              </div>
            </form>

          </div>

        </div>
        <div>
          <img className='mx-auto w-3/5 lg:w-full mb-8 lg:mb-0' src={image} alt="" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
