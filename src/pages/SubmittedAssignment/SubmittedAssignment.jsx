import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MarkAssignmentModal from './MarkAssignmentModal';

const SubmittedAssignments = () => {
    const [pendingAssignments, setPendingAssignments] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://online-group-study-server-nu.vercel.app/myAssignment/filter', {
                params: {
                    status: 'pending'
                },
                withCredentials: true,
            });

            const pending = response.data;
            setPendingAssignments(pending);
        } catch (error) {
            console.error('Error fetching pending assignment', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array to run the effect once on component mount

    // console.log(pendingAssignments);


    return (
        <div className='max-w-screen-2xl mx-auto my-20 '>
            <div className="flex flex-col max-w-5xl p-6 space-y-4 sm:p-10 mx-auto">
            <h2 className="text-3xl font-semibold mb-5 text-indigo-700">Submitted Assignments:</h2>
            <ul className="flex flex-col divide-y divide-gray-700">
                {
                    pendingAssignments.map(assignment => <MarkAssignmentModal key={assignment._id} assignment={assignment} />
                    )
                }
            </ul>

        </div>
        </div>
    );
};

export default SubmittedAssignments;
