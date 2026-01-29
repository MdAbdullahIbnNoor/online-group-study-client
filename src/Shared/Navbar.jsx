import React from 'react';
import logo from './../assets/logo.png';
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { NavLink, useLocation } from "react-router-dom";
import defaultUser from "./../assets/avater.png";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    };

    const isTabActive = (path) => {
        return location.pathname === path;
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Assignments', path: '/assignment' },
        { name: 'Library', path: '/resources' },
    ];

    const authLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Create', path: '/createassignment' },
        { name: 'My Submissions', path: '/myAssignment' },
        { name: 'Evaluate', path: '/submittedAssignment' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="container px-4 py-3 mx-auto lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between w-full lg:w-auto">
                        <NavLink to="/" className="flex items-center space-x-2">
                            <img className="w-auto h-12 transition-transform duration-300 hover:scale-105" src={logo} alt="Logo" />
                            <span className="text-xl font-bold tracking-tight text-slate-800 hidden sm:block">StudyBridge</span>
                        </NavLink>

                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={toggleMenu}
                                type="button"
                                className="p-2 text-slate-600 transition-colors duration-200 rounded-lg hover:bg-slate-100 focus:outline-none"
                                aria-label="toggle menu"
                            >
                                {!isOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Desktop & Mobile Menu */}
                    <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen ? 'translate-x-0 opacity-100 top-16 shadow-lg border-b border-slate-200' : 'opacity-0 -translate-x-full hidden lg:flex'}`}>
                        <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-1">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${isTabActive(link.path) ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
                                >
                                    {link.name}
                                </NavLink>
                            ))}

                            {user?.email && authLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${isTabActive(link.path) ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
                                >
                                    {link.name}
                                </NavLink>
                            ))}

                            {!user && (
                                <NavLink
                                    to="/login"
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${isTabActive("/login") ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
                                >
                                    Log In
                                </NavLink>
                            )}
                        </div>

                        <div className="flex items-center mt-4 border-t border-slate-100 pt-4 lg:mt-0 lg:border-none lg:pt-0 lg:ml-6">
                            {user && (
                                <div className="flex items-center space-x-3">
                                    <div className="relative group">
                                        <div className="w-10 h-10 overflow-hidden border-2 border-indigo-100 rounded-full transition-all duration-300 group-hover:border-indigo-400">
                                            <img
                                                src={user?.photoURL ? user.photoURL : defaultUser}
                                                className="object-cover w-full h-full"
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="absolute right-0 top-12 hidden group-hover:block transition-all duration-200">
                                            <div className="bg-white border border-slate-200 rounded-lg shadow-xl p-3 min-w-[200px]">
                                                <p className="text-sm font-semibold text-slate-800">{user?.displayName}</p>
                                                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSignOut}
                                        className="btn-premium-outline !py-2 !px-4 hidden lg:inline-flex"
                                    >
                                        Logout
                                    </button>

                                    <button
                                        onClick={handleSignOut}
                                        className="lg:hidden text-sm font-medium text-red-600 hover:text-red-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
