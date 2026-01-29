import React from 'react';
import { useContext, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_URL } from '../../api/config';

const UpdateAssignment = () => {
    const assignment = useLoaderData();
    const { user } = useContext(AuthContext);

    const { _id, title, description, marks, difficultyLevel, dueDate, photoURL, email } = assignment

    const [updateData, setUpdateData] = useState({
        title,
        description,
        marks,
        difficultyLevel,
        dueDate,
        photoURL,
        email // New field for photo URL
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateData({ ...updateData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(updateData);

        axios
            .put(`${API_URL}/assignment/update/${_id}`, updateData, {
                withCredentials: true, // Move withCredentials inside the request config
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Assignment Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                    });
                }
            })
            .catch((error) => {
                console.error('Error updating assignment:', error);
                // Handle errors, e.g., show an error message.
            });


        setUpdateData({
            title: '',
            description: '',
            marks: '',
            difficultyLevel: '',
            dueDate: '',
            photoURL: '',
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-16 flex items-center justify-center">
            <div className="container max-w-6xl mx-auto px-6">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
                    {/* Left Side: Illustration/Context */}
                    <div className="lg:w-2/5 bg-indigo-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-extrabold mb-6 leading-tight">Revise Your Task</h2>
                            <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                                Need to adjust the scope or clarify instructions? Keep your assignment up to date to ensure the best learning experience for your peers.
                            </p>

                            <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                                <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-4">You're editing:</h3>
                                <p className="text-xl font-bold line-clamp-2">{title}</p>
                            </div>
                        </div>

                        {/* Abstract shapes for design */}
                        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:w-3/5 p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Assignment Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={updateData.title}
                                    onChange={handleChange}
                                    className="w-full premium-input"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Total Marks</label>
                                <input
                                    type="number"
                                    name="marks"
                                    value={updateData.marks}
                                    onChange={handleChange}
                                    className="w-full premium-input"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Difficulty Level</label>
                                <select
                                    name="difficultyLevel"
                                    value={updateData.difficultyLevel}
                                    onChange={handleChange}
                                    className="w-full premium-input appearance-none"
                                    required
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Due Date</label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={updateData.dueDate}
                                    onChange={handleChange}
                                    className="w-full premium-input"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Cover Photo URL</label>
                                <input
                                    type="url"
                                    name="photoURL"
                                    value={updateData.photoURL}
                                    onChange={handleChange}
                                    className="w-full premium-input"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Assignment Description</label>
                                <textarea
                                    name="description"
                                    value={updateData.description}
                                    onChange={handleChange}
                                    className="w-full premium-input h-32 resize-none"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 pt-4">
                                <button
                                    type="submit"
                                    className="w-full btn-premium-primary text-lg py-4 shadow-xl shadow-indigo-100"
                                >
                                    Update Assignment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateAssignment