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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
        {/* Left Side: Form */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
              <p className="text-slate-500">Join our community of lifelong learners</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full premium-input h-12"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Photo URL</label>
                <input
                  name="photoURL"
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full premium-input h-12"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full premium-input h-12"
                />
              </div>

              <div className="space-y-2 relative">
                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="w-full premium-input h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 font-medium px-1">
                  Must be 6+ chars, 1 uppercase, 1 number, 1 special char.
                </p>
              </div>

              {registerError && (
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold">
                  {registerError}
                </div>
              )}

              <button className="w-full btn-premium-primary h-14 text-base font-bold shadow-xl shadow-indigo-100 mt-4 text-white">
                Create Account
              </button>
            </form>

            <p className="mt-8 text-center text-slate-500">
              Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>

        {/* Right Side: Visual/Feature */}
        <div className="lg:w-1/2 relative bg-indigo-600 p-12 text-white flex flex-col justify-center overflow-hidden order-1 lg:order-2">
          <div className="relative z-10 max-w-sm mx-auto text-center lg:text-left">
            <h3 className="text-4xl font-extrabold mb-6 leading-tight">Elevate Your Study Experience</h3>
            <p className="text-indigo-100 text-lg mb-8 opacity-90">
              Connect with friends, share knowledge, and track your progress together.
            </p>

            <div className="space-y-6">
              {[
                { title: "Group Synergy", desc: "Work together on complex problems." },
                { title: "Global Reach", desc: "Connect with students worldwide." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex-shrink-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-indigo-300 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-indigo-100 opacity-80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full -ml-40 -mt-40 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500 rounded-full -mr-32 -mb-32 blur-3xl"></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
