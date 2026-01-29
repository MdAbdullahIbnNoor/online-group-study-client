import React from 'react';
import { useContext, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { API_URL } from '../../api/config';

const CreateAssignment = () => {
    const { user } = useContext(AuthContext)

    const email = user?.email || '';

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        marks: '',
        difficultyLevel: 'easy',
        dueDate: '',
        photoURL: '',
        email: email, // Set email with the value obtained above
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {

            const response = await axios.post(`${API_URL}/assignment`, formData, {
                withCredentials: true
            });
            console.log('Assignment created:', response.data);
            if (response.data.acknowledged) {
                Swal.fire({ // Display SweetAlert on success
                    title: 'Success!',
                    text: 'Your data has been inserted successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            }
            // You can add logic for success message or redirection here.
        } catch (error) {
            console.error('Error creating assignment:', error);
            // Handle errors, e.g., show an error message.
        }
        setFormData({
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
                    {/* Left: Illustration/Info */}
                    <div className="lg:w-2/5 bg-indigo-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-extrabold mb-6 leading-tight">Create a New Assignment</h2>
                            <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                                Inspire your peers by crafting engaging challenges. Fill in the details to set up a collaborative learning task for your study group.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span>Set due dates and marks</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <span>Define difficulty levels</span>
                                </div>
                            </div>
                        </div>

                        {/* Abstract shapes for design */}
                        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:w-3/5 p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Assignment Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g. Master React Hooks"
                                    value={formData.title}
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
                                    placeholder="100"
                                    value={formData.marks}
                                    onChange={handleChange}
                                    className="w-full premium-input"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Difficulty Level</label>
                                <select
                                    name="difficultyLevel"
                                    value={formData.difficultyLevel}
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
                                    value={formData.dueDate}
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
                                    placeholder="https://images.unsplash.com/..."
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    className="w-full premium-input"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Assignment Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Provide clear instructions for the assignment..."
                                    value={formData.description}
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
                                    Create Assignment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAssignment;