import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [assignmentsPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order

  useEffect(() => {
    axios.get('http://localhost:5000/assignment').then((response) => {
      setAssignments(response.data);
    });
  }, []);

  const toggleSortOrder = () => {
    // Toggle sorting order
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedAssignments = [...assignments].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.marks - b.marks;
    } else {
      return assignments;
    }
  });

  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = sortedAssignments.slice(
    indexOfFirstAssignment,
    indexOfLastAssignment
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex justify-between items-center my-5 mx-40">
        <button
          onClick={toggleSortOrder}
          className="px-4 py-2 mx-1 font-bold rounded-full bg-blue-500 text-white"
        >
          Sort by Marks {sortOrder === 'asc' ? '( Ascending )' : ''}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-40">
        {currentAssignments.map((assignment) => (
          <div
            key={assignment._id}
            className="bg-indigo-100 rounded-xl px-6 py-8 shadow-lg max-w-sm max-h-[420px]"
          >
            <img
              className="h-56 w-full object-cover mb-4"
              src={assignment.photoURL}
              alt={assignment.title}
            />
            <h2 className="text-lg font-semibold">{assignment.title}</h2>
            <p>Marks: {assignment.marks}</p>
            <p>Difficulty Level: {assignment.difficultyLevel}</p>
            <div className="py-4">
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
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(sortedAssignments.length / assignmentsPerPage) }, (_, i) => (
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
    </div>
  );
};

export default Assignments;
