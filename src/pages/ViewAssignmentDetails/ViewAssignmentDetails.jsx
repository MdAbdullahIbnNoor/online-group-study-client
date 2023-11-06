import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useLoaderData } from 'react-router-dom';

const ViewAssignmentDetails = ({ }) => {
    const { user } = useContext(AuthContext);
    const assignmentData = useLoaderData();

    const [pdfFile, setPdfFile] = useState(null);
    const [textInput, setTextInput] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
    };

    const handleTextChange = (e) => {
        setTextInput(e.target.value);
    };

    const handleSubmit = () => {
        // Handle the submission of assignment data, including PDF and text
        // You can use assignmentData, pdfFile, and textInput for submission
        console.log('Assignment Data:', assignmentData);
        console.log('PDF File:', pdfFile);
        console.log('Text Input:', textInput);

        // Add your logic to submit the data to the server here
    };

    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <img
                    className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
                    alt="Assignment"
                    src={assignmentData.photoURL || 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                />
                <div className="text-center lg:w-2/3 w-full">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        {assignmentData.title}
                    </h1>
                    <p className="mb-4 leading-relaxed">{assignmentData.description}</p>
                    <div className="mb-4">
                        <label className="text-gray-600">Marks:</label>
                        <p className="text-black">{assignmentData.marks}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-600">Due Date:</label>
                        <p className="text-black">{assignmentData.dueDate}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-600">Created by:</label>
                        <p className="text-black">{assignmentData.email}</p>
                    </div>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="bg-gray-200 text-gray-700 border-0 py-2 px-6 focus:outline-none rounded text-lg"
                    />
                    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Submit Text</h2>
                        <textarea
                            value={textInput}
                            onChange={handleTextChange}
                            placeholder="Enter your text here..."
                            rows="4"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <button
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-center w-full"
                            onClick={handleSubmit}
                        >
                            Submit Assignment
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ViewAssignmentDetails;
