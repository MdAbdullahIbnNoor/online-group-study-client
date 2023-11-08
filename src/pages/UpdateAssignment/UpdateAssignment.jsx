import React from 'react';
import { useContext, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateAssignment = () => {
    const assignment = useLoaderData();
    const { user } = useContext(AuthContext);

    const { _id, title, description, marks, difficultyLevel, dueDate, photoURL, email } = assignment

    const [updateData, setUpdateData] = useState({
        title,
        description,
        marks,
        difficultyLevel,
        dueDate,
        photoURL,
        email // New field for photo URL
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateData({ ...updateData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(updateData);

        axios
            .put(`https://online-group-study-server-nu.vercel.app/assignment/update/${_id}`, updateData, {
                withCredentials: true, // Move withCredentials inside the request config
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Assignment Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                    });
                }
            })
            .catch((error) => {
                console.error('Error updating assignment:', error);
                // Handle errors, e.g., show an error message.
            });


    setUpdateData({
        title: '',
        description: '',
        marks: '',
        difficultyLevel: '',
        dueDate: '',
        photoURL: '',
    });
};

return (
    <div className="flex space-x-4">
        <div className="w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Create Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={updateData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        defaultValue={title}

                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={updateData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded h-24"
                    />
                </div>
                <div>
                    <label htmlFor="marks">Marks:</label>
                    <input
                        type="number"
                        id="marks"
                        name="marks"
                        value={updateData.marks}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        defaultValue={marks}
                    />
                </div>
                <div>
                    <label htmlFor="difficultyLevel">Difficulty Level:</label>
                    <select
                        id="difficultyLevel"
                        name="difficultyLevel"
                        value={updateData.difficultyLevel}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        defaultValue={difficultyLevel}
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="dueDate">Due Date:</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={updateData.dueDate}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        defaultValue={dueDate}
                    />
                </div>
                <div>
                    <label htmlFor="photoURL">Photo URL:</label>
                    <input
                        type="text"
                        id="photoURL"
                        name="photoURL"
                        value={updateData.photoURL}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        defaultValue={photoURL}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-center lg:w-full mx-auto"
                >
                    Update Assignment
                </button>
            </form>
        </div>
        <div className="w-1/2">
            {/* You can place your image here using an <img> tag */}
            <img
                src={photoURL}
                alt="Assignment Image"
                className="w-[700px] h-[700px] rounded object-contain "
            />
        </div>
    </div>
)
}

export default UpdateAssignment