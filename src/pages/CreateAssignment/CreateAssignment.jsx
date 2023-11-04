import { useState } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateAssignment = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        marks: '',
        difficultyLevel: '',
        dueDate: new Date(),
        photoURL: '', // New field for photo URL
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, dueDate: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // try {
        //     const response = await axios.post('http://your-express-api-endpoint.com/create-assignment', formData);
        //     console.log('Assignment created:', response.data);
        //     // You can add logic for success message or redirection here.
        // } catch (error) {
        //     console.error('Error creating assignment:', error);
        //     // Handle errors, e.g., show an error message.
        // }
        setFormData({
            title: '',
            description: '',
            marks: '',
            difficultyLevel: '',
            dueDate: new Date(),
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
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
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
                            value={formData.marks}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="difficultyLevel">Difficulty Level:</label>
                        <select
                            id="difficultyLevel"
                            name="difficultyLevel"
                            value={formData.difficultyLevel}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dueDate">Due Date:</label>
                        <DatePicker
                            selected={formData.dueDate}
                            onChange={handleDateChange}
                            id="dueDate"
                            name="dueDate"
                            dateFormat="dd-MM-yyyy" // Set the date format
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="photoURL">Photo URL:</label>
                        <input
                            type="text"
                            id="photoURL"
                            name="photoURL"
                            value={formData.photoURL}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-center lg:w-full mx-auto"
                    >
                        Create Assignment
                    </button>
                </form>
            </div>
            <div className="w-1/2">
                {/* You can place your image here using an <img> tag */}
                <img
                    src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Assignment Image"
                    className="w-full h-full rounded object-contain "
                />
            </div>
        </div>
    );
};

export default CreateAssignment;