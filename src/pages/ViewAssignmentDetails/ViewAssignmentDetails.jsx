import React from 'react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../api/config';

const ViewAssignmentDetails = () => {
    const { user } = useContext(AuthContext);
    const assignmentData = useLoaderData();

    const { _id, title, description, marks, difficultyLevel, dueDate, photoURL, email } = assignmentData;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pdfLink, setPdfLink] = useState(''); // Add pdfLink to the state
    const [additionalText, setAdditionalText] = useState(''); // Add additionalText to the state
    const [updateData, setUpdateData] = useState({
        title,
        description,
        marks,
        difficultyLevel,
        dueDate,
        photoURL,
        email,
        status: 'pending'
    });

    const submittedBy = user?.email || 'Unknown';

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Construct the assignmentData object with the updated fields
        const assignmentData = {
            ...updateData,
            pdfLink,
            additionalText,
            submittedBy,
        };

        console.log(assignmentData);

        try {
            const response = await axios.post(`${API_URL}/myAssignment`, assignmentData, {
                withCredentials: true
            }
            );
            // console.log('Assignment submitted successfully!', response.data);
            if (response.data.acknowledged) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Assignment Submitted Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool',
                });
            }
        } catch (error) {
            console.error('Error submitting assignment:', error);
        }


        setIsModalOpen(false);
    };


    return (
        <section className="bg-slate-50 min-h-screen py-16">
            <div className="container px-6 mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 lg:flex items-stretch">
                    {/* Left: Image side */}
                    <div className="lg:w-1/2 relative min-h-[400px]">
                        <img
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            src={assignmentData.photoURL || 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1974&auto=format&fit=crop'}
                            alt=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full border-2 border-white/50 overflow-hidden">
                                    <img src="https://ui-avatars.com/api/?name=Author&background=random" className="w-full h-full object-cover" />
                                </div>
                                <div className="text-white">
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-80">Created By</p>
                                    <p className="font-semibold">{assignmentData.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-6 left-6">
                            <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg ${difficultyLevel === 'easy' ? 'bg-emerald-500 text-white' :
                                difficultyLevel === 'medium' ? 'bg-amber-500 text-white' :
                                    'bg-rose-500 text-white'
                                }`}>
                                {difficultyLevel} Level
                            </span>
                        </div>
                    </div>

                    {/* Right: Content side */}
                    <div className="p-8 md:p-12 lg:w-1/2 flex flex-col justify-center">
                        <div className="max-w-xl mx-auto lg:ml-0">
                            <p className="text-indigo-600 font-bold uppercase tracking-[0.2em] text-xs mb-4">Assignment Overview</p>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                                {assignmentData.title}
                            </h1>
                            <div className="space-y-6 mb-10">
                                <div className="prose prose-slate text-slate-600">
                                    <p className="text-lg leading-relaxed">
                                        {assignmentData.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-5">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pass Marks</p>
                                        <p className="text-2xl font-black text-indigo-600">{assignmentData.marks}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-5">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
                                        <p className="text-xl font-bold text-slate-800">{assignmentData.dueDate}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="w-full btn-premium-primary text-lg py-4 shadow-xl shadow-indigo-200"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Take Assignment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                ariaHideApp={false}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-0 outline-none"
                overlayClassName="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[1000]"
            >
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                    <div className="bg-indigo-600 px-8 py-6 text-white text-center">
                        <h3 className="text-2xl font-bold">Start Working</h3>
                        <p className="text-indigo-100 text-sm mt-1">Submit your solution for {assignmentData.title}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="pdfLink" className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">
                                Solution PDF Link
                            </label>
                            <input
                                type="url"
                                id="pdfLink"
                                placeholder="https://example.com/your-work.pdf"
                                required
                                value={pdfLink}
                                onChange={(e) => setPdfLink(e.target.value)}
                                className="w-full premium-input focus:ring-4"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="additionalText" className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">
                                Notes for Reviewer
                            </label>
                            <textarea
                                id="additionalText"
                                placeholder="Explain your approach or provide additional context..."
                                value={additionalText}
                                onChange={(e) => setAdditionalText(e.target.value)}
                                className="w-full premium-input h-32 resize-none focus:ring-4"
                            ></textarea>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 btn-premium-outline !py-3"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-[2] btn-premium-primary !py-3 text-base"
                            >
                                Submit Work
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </section>
    );
};

export default ViewAssignmentDetails;
