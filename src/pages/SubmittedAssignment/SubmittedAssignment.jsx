import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MarkAssignmentModal from './MarkAssignmentModal';
import { API_URL } from '../../api/config';

const SubmittedAssignments = () => {
    const [pendingAssignments, setPendingAssignments] = useState([]);

    const fetchAssignments = async () => {
        try {
            const response = await axios.get(`${API_URL}/myAssignment/filter`, {
                params: {
                    status: 'pending'
                },
                withCredentials: true,
            });

            setPendingAssignments(response.data);
        } catch (error) {
            console.error('Error fetching pending assignment', error);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, []); // Empty dependency array to run the effect once on component mount

    // console.log(pendingAssignments);


    return (
        <div className="min-h-screen bg-slate-50 py-16">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 text-center lg:text-left">
                        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                            Pending <span className="text-indigo-600">Evaluations</span>
                        </h2>
                        <p className="text-slate-500 text-lg">
                            Review and grade assignments submitted by your global study peers.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {pendingAssignments.length > 0 ? (
                            pendingAssignments.map(assignment => (
                                <MarkAssignmentModal key={assignment._id} assignment={assignment} />
                            ))
                        ) : (
                            <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-slate-300">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">All Caught Up!</h3>
                                <p className="text-slate-500">There are no pending assignments waiting for your evaluation.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmittedAssignments;
