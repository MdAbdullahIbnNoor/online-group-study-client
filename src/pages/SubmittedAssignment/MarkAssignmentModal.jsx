// MarkAssignmentModal.js
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';



Modal.setAppElement('#root'); // Specify the root element for accessibility

const MarkAssignmentModal = ({ assignment, handleDelete }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:5000/myAssignment/markUpdate/${assignment._id}`, {
        status: 'completed',
        markGiven: marks,
        feedBack: feedback
      });
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

    closeModal();
  };

  return (
    <div>
      <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
        <div className="flex w-full space-x-2 sm:space-x-4">
          <img className="flex-shrink-0 object-cover w-20 h-20 rounded outline-none sm:w-32 sm:h-32" src={assignment.photoURL} alt="Polaroid camera" />
          <div className="flex flex-col justify-between w-full pb-4">
            <div className="flex justify-between w-full pb-2 space-x-2">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold leadi sm:pr-8">{assignment.title}</h3>
                <p className="text-sm ">PDF: {assignment.pdfLink}</p>
                <p className="text-sm ">Submitted By: {assignment.submittedBy}</p>
              </div>
              <div className="text-right">
                <button
                  className="btn-sm btn-primary rounded-lg text-white font-medium"
                  onClick={openModal}
                >
                  Give Mark
                </button>
              </div>
            </div>
            <div className="flex text-sm divide-x">
              <button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
                <span onClick={() => handleDelete(assignment._id, assignment.email)} className='btn btn-xs btn-error text-white'>Remove</span>
              </button>
            </div>
          </div>
        </div>
      </li>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Mark Assignment Modal"
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>

          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
            <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white text-center mb-5" id="modal-title">
              Mark Assignment
            </h3>
            <p className="mt-2 text-sm text-indigo-200 font-bold">PDF Link: {assignment.pdfLink}</p>
            <p className="mt-2 text-sm text-indigo-300">Statement: {assignment.additionalText}</p>

            <form className="mt-4" onSubmit={handleSubmit}>
              <label htmlFor="marks" className="text-sm text-gray-700 dark:text-gray-200">
                Marks:
              </label>
              <input
                type="number"
                id="marks"
                limit={assignment.marks}
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />

              <label htmlFor="feedback" className="text-sm text-gray-700 dark:text-gray-200">
                Feedback:
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />

              <div className="mt-4">
                <button
                  className="w-full px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                  Submit
                </button>
              </div>
            </form>

            <button
              onClick={closeModal}
              className="mt-4 w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MarkAssignmentModal;
