import React from 'react';
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {

    const { signInUser, signUpWithGoogle } = useContext(AuthContext);
    const naviGate = useNavigate();
    // console.log(signInUser);

    const handleLogin = e => {
        e.preventDefault();
        console.log("clicked");
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        signInUser(email, password)
            .then(res => {
                console.log(res.user)
                e.target.reset()
                toast.success("Login Successful");
                naviGate("/")

            }).catch(error => {
                console.log(error.message);
                toast.error("Invalid Email or Password")
            })

    }

    const handleGoogleSignUp = () => {
        signUpWithGoogle()
            .then(res => {
                console.log(res.user)
                toast.success("Login Successful");
                naviGate("/")
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-5xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
                {/* Left Side: Visual */}
                <div className="md:w-1/2 relative bg-indigo-600 p-12 text-white flex flex-col justify-between overflow-hidden">
                    <div className="relative z-10">
                        <Link to="/" className="inline-block mb-12">
                            <span className="text-2xl font-black tracking-tighter uppercase italic">StudyBridge</span>
                        </Link>
                        <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">Welcome Back to StudyBridge</h2>
                        <p className="text-indigo-100 text-lg leading-relaxed opacity-90">
                            Log in to access your study groups, assignments, and collaborative learning resources.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="flex -space-x-3 mb-4">
                            {[1, 2, 3, 4].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-10 h-10 rounded-full border-2 border-indigo-600" />
                            ))}
                            <div className="w-10 h-10 rounded-full bg-indigo-400 border-2 border-indigo-600 flex items-center justify-center text-xs font-bold">+2k</div>
                        </div>
                        <p className="text-sm font-medium text-indigo-100">Join 2,000+ students learning together.</p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500 rounded-full -ml-24 -mb-24 blur-3xl"></div>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
                    <div className="max-w-sm mx-auto w-full">
                        <div className="mb-10 text-center md:text-left">
                            <h3 className="text-3xl font-bold text-slate-900 mb-2">Sign In</h3>
                            <p className="text-slate-500">Enter your credentials to continue</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
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

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Password</label>
                                    <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider">Forgot?</a>
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full premium-input h-12"
                                />
                            </div>

                            <button className="w-full btn-premium-primary h-14 text-base font-bold shadow-xl shadow-indigo-100">
                                Sign In
                            </button>
                        </form>

                        <div className="my-8 flex items-center space-x-4">
                            <div className="flex-1 h-px bg-slate-100"></div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Or continue with</span>
                            <div className="flex-1 h-px bg-slate-100"></div>
                        </div>

                        <button
                            onClick={handleGoogleSignUp}
                            className="w-full h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center space-x-3 transition-all hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="font-bold text-slate-700">Google</span>
                        </button>

                        <p className="mt-10 text-center text-slate-500">
                            Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold hover:underline">Sign up for free</Link>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LoginPage;
