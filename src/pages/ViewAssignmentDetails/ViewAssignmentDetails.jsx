import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';

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
            const response = await axios.post('http://localhost:5000/myAssignment', assignmentData);
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

        <section className="bg-white">
            <div className="container px-6 py-10 mx-auto">
                <div className="lg:-mx-6 lg:flex lg:items-center">
                    <img
                        className="object-contain object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]"
                        src={assignmentData.photoURL || 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                        alt=""
                    />

                    <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
                        <p className="text-xl font-semibold text-indigo-600 mb-5">Assignment On:</p>

                        <h1 className="text-3xl font-bold text-gray-800 lg:text-3xl lg:w-96">
                            {assignmentData.title}
                        </h1>

                        <p className="max-w-lg mt-6 text-gray-700 text-lg">
                            {assignmentData.description}
                        </p>
                        <p className="text-gray-800 font-medium mb-3">Due Date: <span className='ml-1'>{assignmentData.dueDate}</span></p>

                        <div className="mb-4">
                            <label className="text-gray-600">Created by:</label>
                            <p className="text-black">{assignmentData.email}</p>
                        </div>

                        <div className="flex-col items-center justify-between mt-2 lg:justify-start">
                            <button
                                className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 text-center w-3/4 mt-4"
                                onClick={() => setIsModalOpen(true)} // Use setIsModalOpen to open the modal
                            >
                                Take assignment
                            </button>

                            {/* Modal */}
                            <Modal
                                isOpen={isModalOpen}
                                onRequestClose={() => setIsModalOpen(false)}
                                ariaHideApp={false}
                                style={{
                                    overlay: {
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                        zIndex: 1000,
                                    },
                                    content: {
                                        width: 'auto',
                                        height: 400,
                                        maxWidth: 800,
                                        margin: '0 auto',
                                        padding: '24px',
                                        border: 'none',
                                        borderRadius: '8px',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
                                    },
                                }}
                            >
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="pdfLink" className="leading-7 text-sm text-gray-600">
                                            PDF Link
                                        </label>
                                        <input
                                            type="text"
                                            id="pdfLink"
                                            name="pdfLink"
                                            value={pdfLink}
                                            onChange={(e) => setPdfLink(e.target.value)}
                                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="additionalText" className="leading-7 text-sm text-gray-600">
                                            Message
                                        </label>
                                        <textarea
                                            id="additionalText"
                                            name="additionalText"
                                            value={additionalText}
                                            onChange={(e) => setAdditionalText(e.target.value)}
                                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                            data-gramm="false"
                                            wt-ignore-input="true"
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-4">
                                        Submit Assignment
                                    </button>
                                    <button className='btn btn-error text-white ml-4' onClick={() => setIsModalOpen(false)}>Close</button>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    );
};

export default ViewAssignmentDetails;
