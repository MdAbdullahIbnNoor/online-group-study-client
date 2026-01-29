import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../api/config';

import Swal from 'sweetalert2';

const Assignments = () => {
  const allData = useLoaderData();
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState(allData);
  const [currentPage, setCurrentPage] = useState(1);
  const [assignmentsPerPage] = useState(6);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (id, email) => {
    if (email !== user?.email) {
      toast.warning('You are only allowed to delete your own assignments.');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_URL}/assignment/${id}`, { withCredentials: true })
          .then((response) => {
            if (response.data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your assignment has been deleted.',
                'success'
              );
              const filteredAssignment = assignments.filter((assignment) => assignment._id !== id);
              setAssignments(filteredAssignment);
            }
          })
          .catch((error) => {
            console.error('Error deleting the assignment:', error);
            toast.error('Failed to delete assignment');
          });
      }
    });
  };

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesDifficulty = selectedDifficulty ? assignment.difficultyLevel === selectedDifficulty : true;
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = filteredAssignments.slice(
    indexOfFirstAssignment,
    indexOfLastAssignment
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Explore <span className="text-indigo-600">Assignments</span></h1>
            <p className="text-slate-500 text-lg">Discover and manage collaborative tasks from your study group.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-80">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by title..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700 shadow-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className="flex items-center space-x-3 bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm w-full sm:w-auto">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Filter:</span>
              <select
                className="bg-transparent border-none text-sm font-black text-slate-900 focus:ring-0 cursor-pointer min-w-[120px]"
                value={selectedDifficulty}
                onChange={handleDifficultyChange}
              >
                <option value="">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {currentAssignments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentAssignments.map((assignment) => (
              <div
                key={assignment._id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={assignment.photoURL}
                    alt={assignment.title}
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg ${assignment.difficultyLevel === 'easy' ? 'bg-emerald-500 text-white' :
                      assignment.difficultyLevel === 'medium' ? 'bg-amber-500 text-white' :
                        'bg-rose-500 text-white'
                      }`}>
                      {assignment.difficultyLevel}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4 line-clamp-1">{assignment.title}</h2>

                  {user && (
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex space-x-2">
                        <Link to={`/assignment/${assignment._id}`} title="View Details">
                          <button className="p-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </Link>
                        <Link to={`/assignment/update/${assignment._id}`} title="Update Assignment">
                          <button className="p-2 text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </Link>
                      </div>
                      <button
                        onClick={() => handleDelete(assignment._id, assignment.email)}
                        className="p-2 text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-600 hover:text-white transition-colors duration-200"
                        title="Delete Assignment"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800">No assignments found</h3>
            <p className="text-slate-500">Try adjusting your filter or check back later.</p>
          </div>
        )}

        <div className="mt-12 flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(filteredAssignments.length / assignmentsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`w-10 h-10 flex items-center justify-center font-bold rounded-lg transition-all duration-200 ${currentPage === i + 1
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Assignments;
