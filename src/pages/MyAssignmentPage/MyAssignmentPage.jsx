import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { API_URL } from '../../api/config';

const MyAssignmentPage = () => {
    const { user } = useContext(AuthContext)
    const [myAssignmentData, setMyAssignmentData] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/myAssignment/filterbyemail`, {
                params: {
                    email: user?.email
                },
                withCredentials: true // Move withCredentials inside the request config
            });

            const filteredData = response.data;
            setMyAssignmentData(filteredData);
        } catch (error) {
            console.error('Error fetching pending assignment', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="min-h-screen bg-slate-50 py-16">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        My <span className="text-indigo-600">Submissions</span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        Track your progress and review feedback for all your submitted assignments in one place.
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-sm font-bold text-slate-700 uppercase tracking-wider">Assignment</th>
                                    <th className="px-8 py-6 text-sm font-bold text-slate-700 uppercase tracking-wider">Solution Link</th>
                                    <th className="px-8 py-6 text-sm font-bold text-slate-700 uppercase tracking-wider">Submitted On</th>
                                    <th className="px-8 py-6 text-sm font-bold text-slate-700 uppercase tracking-wider">Score</th>
                                    <th className="px-8 py-6 text-sm font-bold text-slate-700 uppercase tracking-wider">Status</th>
                                    <th className="px-8 py-6 text-sm font-bold text-slate-700 uppercase tracking-wider">Feedback</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {myAssignmentData.length > 0 ? (
                                    myAssignmentData.map((assignment) => (
                                        <tr key={assignment._id} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-8 py-6">
                                                <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{assignment.title}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <a
                                                    href={assignment.pdfLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                                >
                                                    View Document
                                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-sm text-slate-500 font-medium">{assignment.dueDate}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center">
                                                    <span className={`text-lg font-black ${assignment.markGiven ? 'text-emerald-600' : 'text-slate-300'}`}>
                                                        {assignment.markGiven || '--'}
                                                    </span>
                                                    <span className="text-xs text-slate-400 ml-1 font-bold">/ 100</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${assignment.status === 'completed'
                                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                    : 'bg-amber-50 text-amber-600 border border-amber-100'
                                                    }`}>
                                                    {assignment.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-sm text-slate-600 italic leading-relaxed">
                                                    {assignment.feedBack || "Waiting for evaluation..."}
                                                </p>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-20 text-center">
                                            <div className="max-w-xs mx-auto">
                                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-slate-900 font-bold mb-1">No Submissions Found</h3>
                                                <p className="text-slate-500 text-sm italic">You haven't submitted any assignments yet.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAssignmentPage;
