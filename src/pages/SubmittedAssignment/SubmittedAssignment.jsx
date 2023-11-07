// SubmittedAssignmentsList.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import MarkAssignmentModal from './MarkAssignmentModal';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmittedAssignments = () => {
    const { user } = useContext(AuthContext);
    const [pendingAssignments, setPendingAssignments] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/myAssignment/filter', {
                params: {
                    status: 'pending'
                }
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

    const handleDelete = (id, email) => {
        const proceed = window.confirm('Are you sure you want to delete?');
        if (proceed && email === user?.email) {
            axios
                .delete(`http://localhost:5000/myAssignment/${id}`)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.deletedCount > 0) {
                        toast.success("Assignment deleted successfully")
                        const filteredAssignment = pendingAssignments.filter((assignment) => assignment._id !== id);
                        setPendingAssignments(filteredAssignment);
                    }
                })
                .catch((error) => {
                    console.error('Error deleting the booking:', error);
                });
        }
        else if (email !== user?.email) {
            toast.warning('You are not allowed to delete this assignment')
        }
    }

    return (
        <div className="flex flex-col max-w-5xl p-6 space-y-4 sm:p-10 mx-auto">
            <h2 className="text-3xl font-semibold mb-5 text-indigo-700">Submitted Assignments:</h2>
            <ul className="flex flex-col divide-y divide-gray-700">
                {
                    pendingAssignments.map(assignment => <MarkAssignmentModal key={assignment._id} assignment={assignment} handleDelete={handleDelete} />
                    )
                }
            </ul>
            <ToastContainer />
        </div>
    );
};

export default SubmittedAssignments;
