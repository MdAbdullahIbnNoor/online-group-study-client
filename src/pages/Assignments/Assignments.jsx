import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Assignments = () => {
  const allData = useLoaderData()
  const { user } = useContext(AuthContext)
  const [assignments, setAssignments] = useState(allData);
  const [currentPage, setCurrentPage] = useState(1);
  const [assignmentsPerPage] = useState(6);
  const [selectedDifficulty, setSelectedDifficulty] = useState(''); // Default: Show all assignments

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
    setCurrentPage(1); // Reset to the first page when difficulty level changes
  };

  const handleDelete = (id, email) => {
    const proceed = window.confirm('Are you sure you want to delete?');
    if (proceed && email === user?.email) {
      axios
        .delete(`https://online-group-study-server-nu.vercel.app/assignment/${id}`, { withCredentials: true })
        .then((response) => {
          console.log(response.data);
          if (response.data.deletedCount > 0) {
            toast.success("Assignment deleted successfully");
            const filteredAssignment = assignments.filter((assignment) => assignment._id !== id);
            setAssignments(filteredAssignment); // Update the assignments state
          }
        })
        .catch((error) => {
          console.error('Error deleting the assignment:', error);
        });
    } else if (email !== user?.email) {
      toast.warning('You are not allowed to delete this assignment');
    }
  }


  const filteredAssignments = selectedDifficulty
    ? assignments.filter((assignment) => assignment.difficultyLevel === selectedDifficulty)
    : assignments;

  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = filteredAssignments.slice(
    indexOfFirstAssignment,
    indexOfLastAssignment
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='mb-16'>
      <div className="flex justify-end items-center my-5 mx-60 m">
        <label className="mr-4 font-medium">Filter by Difficulty Level:</label>
        <select className='border-2 border-indigo-600 rounded-md' value={selectedDifficulty} onChange={handleDifficultyChange}>
          <option value="">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-40">
        {currentAssignments.map((assignment) => (
          <div
            key={assignment._id}
            className="bg-indigo-100 rounded-xl px-6 py-8 shadow-lg max-w-sm max-h-[400px]"
          >
            <img
              className="h-56 w-full object-cover mb-4"
              src={assignment.photoURL}
              alt={assignment.title}
            />
            <h2 className="text-lg font-semibold">{assignment.title}</h2>
            <p>Difficulty Level: <span className='font-bold text-indigo-700 uppercase '>{assignment.difficultyLevel}</span></p>
            {
              user && <div className="py-4">
                <Link to={`/assignment/${assignment._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    View
                  </button>
                </Link>
                <Link to={`/assignment/update/${assignment._id}`}>
                  <button className="bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Update
                  </button>
                </Link>
                <button onClick={() => handleDelete(assignment._id, assignment.email)} className="bg-red-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
                  Remove
                </button>
              </div>
            }
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(filteredAssignments.length / assignmentsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 mx-1 font-bold rounded-full ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-blue-200'
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Assignments;
